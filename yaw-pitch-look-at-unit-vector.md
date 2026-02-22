# Yaw & Pitch angles to compute the look at vector

So, first start of with the fact that we are looking down -z axis.

The right axis is y axis.

The up axis is y axis.

Imagine the unit circle, where we are lying on the -z axis, so length of cos lies down the -z axis.

The x axis coordinate matches the sin of the triangle side length.

As we change the angle that lies along -z axis, this is us looking left and right.

Therefore, length of triangle is on z and x axis:

z component: $cos(yaw)$

x component: $sin(yaw)$

Now imagine, that the point $(cos(yaw), sin(yaw))$ needs to move up along y axis, what happens?

Both components x and z shrink, and the higher that point goes, the more x and z shrink.

Source: <https://www.desmos.com/3d/q35p9tcge7>

Below is latex extracted from the desmos demo.

```math
a_{yaw}=0.73
a_{pitch}=0.73

v_{z}=-\cos\left(a_{yaw}\right)\cos\left(a_{pitch}\right)
v_{y}=\sin\left(a_{pitch}\right)
v_{x}=\sin\left(a_{yaw}\right)\cos\left(a_{pitch}\right)

p_{z}=\left(0,\ 0,\ v_{z}\right)
p_{x}=\left(v_{x},\ 0,\ 0\right)
p_{y}=\left(0,\ v_{y},\ 0\right)

\operatorname{vector}\left(p_{x},\ \left(p_{x}.x,\ p_{y}.y,\ p_{z}.z\right)\right)
\operatorname{vector}\left(p_{z},\ \left(p_{x}.x,\ p_{y}.y,\ p_{z}.z\right)\right)
\operatorname{vector}\left(p_{y},\ \left(p_{x}.x,\ p_{y}.y,\ p_{z}.z\right)\right)

\left(v_{x},\ v_{y},\ v_{z}\right)
```
