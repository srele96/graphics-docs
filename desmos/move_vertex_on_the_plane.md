# move_vertex_on_the_plane

> **Random Seed:** `251623bef56723e6e51226965c9c8db7`

$$
P=\left(0,0,0\right)
$$

$$
v_{u}=\left(4,0,0\right)
$$

$$
v_{v}=\left(0,4,0\right)
$$

$$
H\left(u,v\right)=\cos\left(\pi u\right)^{3}
$$

$$
S\left(a,b\right)=P+av_{u}+bv_{v}+\left(0,0,H\left(a,b\right)\right)
$$

$$
S\left(u,v\right)
$$

$$
v_{yaw}=\frac{\pi}{4}
$$

$$
v_{pitch}=\frac{\pi}{4}
$$

$$
q=\left(\sin\left(v_{ang}\right),\cos\left(v_{ang}\right),0\right)
$$

$$
w=\left(\sin\left(v_{ang}+\frac{\pi}{2}\right),\cos\left(v_{ang}+\frac{\pi}{2}\right),0\right)
$$

$$
k=S\left(a,b\right)
$$

$$
o_{dot}\left(v_{a},v_{b}\right)=v_{a}.x\cdot v_{b}.x+v_{a}.y\cdot v_{b}.y+v_{a}.z\cdot v_{b}.z
$$

$$
o_{normalize}\left(v\right)=\frac{v}{\left|v\right|}
$$

$$
v_{uNorm}=o_{normalize}\left(v_{u}\right)
$$

$$
v_{vNorm}=o_{normalize}\left(v_{v}\right)
$$

$$
w_{a}=i\cdot o_{dot}\left(v_{uNorm},q\right)+j\cdot o_{dot}\left(v_{uNorm},w\right)
$$

$$
w_{b}=i\cdot o_{dot}\left(v_{vNorm},w\right)+j\cdot o_{dot}\left(v_{vNorm},q\right)
$$

Initially i thought that maybe, maybe, MAYBE, a point that moves on the plane and follows plane trajectory is somehow constrained by some function, or something.

No.

The function which produced plane, is called, with input, but to produce a single vertex. That vertex is surely going to be on top of the plane.

However, to change the axis movement of the vertex, we actually need to define axes to be moved along.

In this case, we introduced 2 perpendicular direction vectors. They are our new axes.

We compute the angle between our desired direction vector axes, and the direction vectors for the sides of the plane.

Essentially, allows us to compute movement alongside new 2 vectors, and get coordinates relative to the axes used previously... I think...

$$
S\left(w_{a},w_{b}\right)
$$
