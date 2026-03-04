# tranpose_inverse_of_model_matrix_for_normals

> **Random Seed:** `4a2f46e79be70f11d4f050a846ad18b2`

$$
O_{inverse}\left(M_{a}\right)=O_{multiplyScalar}\left(\left[M_{a}\left[4\right],-M_{a}\left[2\right],-M_{a}\left[3\right],M_{a}\left[1\right]\right],\frac{1}{M_{a}\left[1\right]M_{a}\left[4\right]-M_{a}\left[2\right]M_{a}\left[3\right]}\right)
$$

$$
O_{multiplyScalar}\left(M_{a},v\right)=\left[M_{a}\left[1\right]v,\ M_{a}\left[2\right]v,M_{a}\left[3\right]v,M_{a}\left[4\right]v\right]
$$

$$
O_{multiply}\left(M_{a},V_{a}\right)=\left[M_{a}\left[1\right]V_{a}\left[1\right]+M_{a}\left[2\right]V_{a}\left[2\right],M_{a}\left[3\right]V_{a}\left[1\right]+M_{a}\left[4\right]V_{a}\left[2\right]\right]
$$

$$
O_{multiplyMat}\left(M_{a},M_{b}\right)=\left[M_{a}\left[1\right]M_{b}\left[1\right]+M_{a}\left[2\right]M_{b}\left[3\right],M_{a}\left[1\right]M_{b}\left[2\right]+M_{a}\left[2\right]M_{b}\left[4\right],M_{a}\left[3\right]M_{b}\left[1\right]+M_{a}\left[4\right]M_{b}\left[3\right],M_{a}\left[3\right]M_{b}\left[2\right]+M_{a}\left[4\right]M_{b}\left[4\right]\right]
$$

$$
O_{transpose}\left(M_{a}\right)=\left[M_{a}\left[1\right],M_{a}\left[3\right],M_{a}\left[2\right],M_{a}\left[4\right]\right]
$$

$$
O_{vecToPoint}\left(V_{a}\right)=\left(V_{a}\left[1\right],V_{a}\left[2\right]\right)
$$

$$
M_{s}\left(V_{a}\right)=\left[V_{a}\left[1\right],0,0,V_{a}\left[2\right]\right]
$$

$$
V_{angle}=-4.908738521234052
$$

The scale deforms the line, and hence affects the normal. Therefore, simply applying the model matrix to the normal, will not yield perpendicular normal.

$$
m_{s}=M_{s}\left(\left[2,1\right]\right)
$$

$$
m_{m}=O_{multiplyMat}\left(m_{r},m_{s}\right)
$$

$$
v_{a}=\left[\cos\left(\frac{\pi}{\left(4\right)}\right),\sin\left(\frac{\pi}{4}\right)\right]
$$

$$
v_{r}=O_{multiply}\left(m_{m},v_{a}\right)
$$

$$
v_{ri}=O_{multiply}\left(O_{inverse}\left(m_{m}\right),v_{a}\right)
$$

$$
v_{rti}=O_{multiply}\left(O_{transpose}\left(O_{inverse}\left(m_{m}\right)\right),v_{a}\right)
$$

$$
O_{line}\left(t,\ P_{a},P_{b}\right)=P_{a}+t\left(P_{b}-P_{a}\right)
$$

The line must not be perfectly vertical or horizontal to make this test work. For some reason, horizontal line keeps perpendicular normal regardless of the scaling factor.

$$
P_{begin}=\left[1,1\right]
$$

$$
P_{end}=\left[2,2\right]
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{begin}\right),O_{vecToPoint}\left(P_{end}\right)\right)
$$

$$
P_{normalBegin}=\left[0,0\right]
$$

$$
P_{normalEnd}=\left[-1,1\right]
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{normalBegin}\right),O_{vecToPoint}\left(P_{normalEnd}\right)\right)
$$

$$
P_{normalOffsetW}=\left[P_{begin}\left[1\right]+\frac{P_{end}\left[1\right]-P_{begin}\left[1\right]}{2},P_{end}\left[2\right]+\frac{P_{end}\left[2\right]-P_{begin}\left[2\right]}{2}\right]
$$

$$
P_{normalOffset}=\frac{P_{begin}+P_{end}}{2}
$$

$$
P_{normalOnLineBegin}=P_{normalBegin}+P_{normalOffset}
$$

$$
P_{normalOnLineEnd}=P_{normalEnd}+P_{normalOffset}
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{normalOnLineBegin}\right),O_{vecToPoint}\left(P_{normalOnLineEnd}\right)\right)
$$

$$
P_{aLine}=O_{multiply}\left(m_{m},P_{begin}\right)
$$

$$
P_{bLine}=O_{multiply}\left(m_{m},P_{end}\right)
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{aLine}\right),O_{vecToPoint}\left(P_{bLine}\right)\right)
$$

$$
P_{center}=\frac{P_{aLine}+P_{bLine}}{2}
$$

$$
P_{aNormal}=O_{multiply}\left(m_{m},P_{normalOnLineBegin}\right)
$$

$$
P_{bNormal}=O_{multiply}\left(m_{m},P_{normalOnLineEnd}\right)
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{aNormal}\right),O_{vecToPoint}\left(P_{bNormal}\right)\right)
$$

$$
P_{cNormal}=O_{multiply}\left(O_{transpose}\left(O_{inverse}\left(m_{m}\right)\right),P_{normalOnLineBegin}\right)
$$

$$
P_{dNormal}=O_{multiply}\left(O_{transpose}\left(O_{inverse}\left(m_{m}\right)\right),P_{normalOnLineEnd}\right)
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{cNormal}\right),O_{vecToPoint}\left(P_{dNormal}\right)\right)
$$

The problem is as follows: I think that the matrix can preserve either the position or direction. Our choice preserves direction, so the position is mangled in the process. One solution is to get the distance from the center (anchor) and offset the direction vector (for vizualistic purposes). However, slightly cleaner is to keep center position and move it with model matrix at all times, and use it as an anchor.

$$
P_{distance}=P_{cNormal}-P_{center}
$$

$$
P_{eNormal}=P_{cNormal}-P_{distance}
$$

$$
P_{fNormal}=P_{dNormal}-P_{distance}
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{eNormal}\right),O_{vecToPoint}\left(P_{fNormal}\right)\right)
$$

$$
P_{normalBadBegin}=O_{multiply}\left(m_{m},P_{normalBegin}\right)
$$

$$
P_{normalBadEnd}=O_{multiply}\left(m_{m},P_{normalEnd}\right)
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{normalBadBegin}\right),O_{vecToPoint}\left(P_{normalBadEnd}\right)\right)
$$

$$
P_{normalGoodBegin}=O_{multiply}\left(O_{transpose}\left(O_{inverse}\left(m_{m}\right)\right),P_{normalBegin}\right)
$$

$$
P_{normalGoodEnd}=O_{multiply}\left(O_{transpose}\left(O_{inverse}\left(m_{m}\right)\right),P_{normalEnd}\right)
$$

$$
O_{line}\left(t,O_{vecToPoint}\left(P_{normalGoodBegin}\right),O_{vecToPoint}\left(P_{normalGoodEnd}\right)\right)
$$
