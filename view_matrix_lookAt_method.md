# View matrix lookAt method

<https://www.desmos.com/3d/dontpst5ej>

<https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/lookat-function/framing-lookat-function.html>

Mainly, for myself, the concept consists of a few parts:

Internal implementation:

- Create unit vectors: UP, RIGHT, FORWARD

These unit vectors are used to derive the lookAt matrix.

The externally provided information consists of:

- Position in the world (eye)
- The looking direction (target)
- The up vector (never changes, i think?)

I don't understand the matrix intricacies yet, but: The matrix stores rotation and translation information.

The translation information (i think) is stored using dot product. The other information is taken from the inputs: UP, RIGHT, FORWARD.
