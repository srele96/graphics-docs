# Projection frustum creation process

The pyramid happens, because the creation starts from a point $(0,0,0)$.

From $(0,0,0)$ draw a line shooting straight down the $-z$ axis.

The length of the line is $NEAR$ point, lying at $(0,0,-NEAR)$.

Then, take an angle, $FOV$. We want to go $UP$ by the $FOV/2$ because from $NEAR$ point we go UP by $FOV/2$ and $DOWN$ by $FOV/2$.

Then, we go $UP$ by $FOV/2$, but how much? We need to compute where is our $UP$ point $(0,UP,-NEAR)$. This makes a right triangle.

$(0,0,0), (0,0,-NEAR), (0,UP,-NEAR)$ - (focus only on $y,z$ axes for now)

If we knew $NEAR/UP$ we could compute $UP$. But we know it, its rate of change, `RISE OVER RUN` or $UP/NEAR$. Tangent of an angle gives a rate of change.

$UP/NEAR=tan(FOV/2)$ _**we compute only upper half**_.

Solve for: $UP = NEAR * tan(FOV/2)$.

From this, we know the height of our frustum: $HEIGHT=2*UP$

For now, our frustum is flat, but we know the top and bottom coordinates: $(0,UP,-NEAR)$, $(0,-UP,-NEAR)$

Now, we need width? Ok, aspect ratio formula is: $ASPECT=WIDTH/HEIGHT$, solve for $WIDTH$

$WIDTH=ASPECT*HEIGHT$

Now, given inout: $NEAR$, $FOV$, $ASPECT$ we can compute the pyramid.

$WIDTH=ASPECT*HEIGHT$

$HEIGHT=2*UP$

Substitute $UP$

$HEIGHT=2*NEAR*tan(FOV/2)$

To create a square at $NEAR$ point $(0,0,-NEAR)$ we need $UP,DOWN,LEFT,RIGHT$

$UP=HEIGHT/2$

$DOWN=-HEIGHT/2$

$LEFT=-WIDTH/2$

$RIGHT=WIDTH/2$

Now, given we started creation from $(0,0,0)$ and we found: `UpLeft`, `UpRight`, `DownLeft`, `DownRight`, and $(0,0,0)$ we have a pyramid from $(0,0,0)$ to $(0,0,-near)$

To compute points at $(0,0,-FAR)$ you repeat the steps, and you will find that 4 rays, shooting out of $(0,0,0)$ through $(UP, LEFT, -NEAR)$ and other 3, will also shoot through 4 points that create square at $(0,0-far)$.

Computation of the $(x',y',-near)$ is a separate topic: Project an arbitrary $(x,y,z)$ point to the screen rectangle at $(0,0,-near)$.

And sorry, i used word "square", but aspect ratio controls if its a square or rectangle.

Btw, i created demos example, maybe it helps you: <https://www.desmos.com/3d/wlka3uz6q7>

Btw, Gemini was really good helping me understand how the frustum works, and where the math is derived from
