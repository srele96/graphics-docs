# Architecture

An experimental architecture diagrams for rendering.

## One pass rendering

```mermaid
classDiagram
    direction LR

    class GameLogic {
        <<Client>>
        +update()
        +extract_render_state()
    }

    class RenderQueue {
        <<Command Buffer>>
        -std::vector~RenderItem~ items
        +push_back(item)
        +sort_by_shader()
        +clear()
    }

    class RenderItem {
        <<Command>>
        +Mesh* mesh
        +ShaderProgram* program
        +mat4 transform
        +vec3 color
    }

    class Renderer {
        <<Invoker>>
        +render(RenderQueue)
    }

    class Mesh {
        <<Receiver State>>
        -GLuint vao, vbo, ebo
        +bind()
    }

    class ShaderProgram {
        <<Receiver State>>
        -GLuint id
        +use()
        +set_uniforms()
    }

    class Shader {
        -GLuint id
        -GLenum type
        +compile()
    }

    %% Relationships
    GameLogic --> RenderItem : "1. Creates"
    GameLogic --> RenderQueue : "2. Pushes to"
    RenderQueue o-- RenderItem : "Stores"

    Renderer --> RenderQueue : "3. Sorts & Consumes"
    Renderer ..> RenderItem : "4. Executes OpenGL calls for"

    RenderItem --> Mesh : "Points to"
    RenderItem --> ShaderProgram : "Points to"

    ShaderProgram *-- Shader : "Composed of (Vert/Frag)"
```

### How this maps to the Command Pattern

While a traditional Gang of Four Command Pattern uses a virtual `execute()` method on a base class, graphics programming modifies this slightly for performance (to keep data contiguous in memory with `std::vector`).

1. **The Client (`GameLogic`):** Instead of calling `glDrawElements` directly, it packages all the information needed to draw an object into a `RenderItem` struct.
2. **The Command (`RenderItem`):** This is a purely data-driven command. It says, "I need _this_ mesh drawn with _this_ shader at _this_ location."
3. **The Invoker (`Renderer`):** It takes the `RenderQueue` (a buffer of commands). Crucially, because the commands are just data, the Invoker can **sort them** before executing them, which is how you save performance by minimizing shader swaps.
4. **The Receivers (`Mesh` & `ShaderProgram`):** These hold the actual OpenGL IDs. The Renderer extracts these pointers from the Command and executes the raw state changes (`glBindVertexArray`, `glUseProgram`).

## Include multi pass rendering

```mermaid
classDiagram
    direction LR

    class GameLogic {
        <<Client>>
        +update()
        +build_render_passes()
    }

    class RenderPass {
        <<Config>>
        +String name
        +RenderQueue queue
        +Framebuffer* targetTarget  %% Null = Screen
        +ShaderProgram* overrideShader %% Null = Use Item's Shader
    }

    class RenderQueue {
        <<Command Buffer>>
        -std::vector~RenderItem~ items
        +push_back(item)
        +sort_by_shader()
        +clear()
    }

    class RenderItem {
        <<Command>>
        +Mesh* mesh
        +ShaderProgram* program
        +mat4 transform
        +Texture* shadowMap
    }

    class Renderer {
        <<Invoker>>
        +execute(RenderPass)
    }

    class Framebuffer {
        <<Receiver State>>
        -GLuint fbo_id
        +bind()
        +unbind()
    }

    class Texture {
        <<Receiver State>>
        -GLuint tex_id
        +bind(texture_unit)
    }

    class Mesh {
        <<Receiver State>>
        -GLuint vao, vbo, ebo
        +bind()
    }

    class ShaderProgram {
        <<Receiver State>>
        -GLuint id
        +use()
        +set_uniforms()
    }

    %% Relationships
    GameLogic --> RenderPass : "1. Configures (Shadow Pass & Main Pass)"
    RenderPass *-- RenderQueue : "Contains"
    RenderPass --> Framebuffer : "Points to Output Target"
    RenderPass --> ShaderProgram : "Points to Override Shader"

    Renderer --> RenderPass : "2. Executes"
    Renderer ..> Framebuffer : "3. Binds Target FBO"
    Renderer ..> RenderItem : "4. Executes OpenGL calls for"

    RenderQueue o-- RenderItem : "Stores"
    RenderItem --> Mesh : "Points to"
    RenderItem --> ShaderProgram : "Points to"
    RenderItem --> Texture : "Reads from (for Shadow Calc)"

    Framebuffer *-- Texture : "Writes Depth to Attachment"
```

### What changed and why

1. **The `RenderPass` Class:** This is the most crucial addition. Instead of passing a raw `RenderQueue` to the Renderer, `GameLogic` now passes a `RenderPass`.
   - **Pass 1 (Shadows):** `targetTarget` is set to your Shadow Map FBO. `overrideShader` is set to your simple depth-calculation shader.
   - **Pass 2 (Main Screen):** `targetTarget` is null (draws to screen). `overrideShader` is null (tells the Renderer to use the specific `ShaderProgram` attached to each `RenderItem`).
2. **`Framebuffer` and `Texture` Classes:** These represent your new GPU resources. The Shadow Pass writes depth data into the `Framebuffer`, which is physically stored in a `Texture`.
3. **The Loopback:** Notice how the `Framebuffer` writes to a `Texture`, and the `RenderItem` (during the Main Pass) reads from that exact same `Texture` to calculate whether a pixel is in shadow.

## Process scene graph before assembling a render queue

```mermaid
classDiagram
    direction LR

    %% --- LOGICAL WORLD (CPU & Math) ---
    class GameLogic {
        <<Client>>
        +SceneGraph scene
        +update_physics()
        +build_render_pipeline()
    }

    class SceneGraph {
        <<Logical Hierarchy>>
        +SceneNode root
        +update_world_transforms()
        +extract_to_queue(RenderQueue, isShadowPass)
    }

    class SceneNode {
        <<Tree Node>>
        +mat4 local_transform
        +mat4 world_transform
        +Mesh* mesh
        +Material* material
        +List~SceneNode~ children
        +update_transform(parent_mat)
    }

    %% --- THE BRIDGE ---
    class RenderItem {
        <<Command>>
        +Mesh* mesh
        +ShaderProgram* program
        +mat4 world_transform
    }

    %% --- GPU WORLD (OpenGL) ---
    class RenderPass {
        <<Config>>
        +RenderQueue queue
        +Framebuffer* target
        +ShaderProgram* overrideShader
    }

    class Renderer {
        <<Invoker>>
        +execute_pipeline(List~RenderPass~)
    }

    %% Relationships
    GameLogic *-- SceneGraph : "1. Owns & Updates"
    SceneGraph *-- SceneNode : "2. Contains"
    SceneNode o-- SceneNode : "Parent/Child"

    GameLogic --> RenderPass : "3. Configures Passes"
    GameLogic ..> SceneGraph : "4. Requests Extraction"

    SceneGraph ..> SceneNode : "5. Traverses Tree"
    SceneNode --> RenderItem : "6. Spawns (if has mesh)"
    RenderItem --> RenderPass : "7. Pushed into Queue"

    Renderer --> RenderPass : "8. Consumes & Draws"
```
