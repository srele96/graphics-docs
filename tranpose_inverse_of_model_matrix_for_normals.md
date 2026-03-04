# Transpose & inverse of model matrix for normals

This document discusses the math and reasons behind `tranpose(inverse(mode)) * normal` in glsl shaders.

Desmos demo: <https://www.desmos.com/calculator/usaasi5pim>

## Explanation

I wanted to understand the reason for using transpose(inverse(model)) \* normal

This approach with points in 2d space completely fails to visualize it

We need:

- A matrix `model` which ROTATE & SCALE
- A surface (a line for example) which gets ROTATED & SCALED
- A normal (on the surface) which remains perpendicular to the surface (a line for example) after application of the ROTATE & SCALE to the line
- A normal vector (separate) from the surface
- A normal vector after only inverse(model)
- A normal vector after transpose(inverse(model))
- We must keep in mind that the position of the vertex from which a normal is perpendicular, is NOT the same position as the normal position
  - Why?
  - Imagine a horizontal line, begin=3,3 end = 7,7 and assume vertex 5,5 is the position of perpendicular normal to the line. The normal is a vertical unit vector pointing alongside +y axis. The normal vector would be drawn begin=5,5 end=5,6. However, this normal, unit vector, can be drawn as: begin=0,0 end=0,1. To me, it has happened many times to be trying to understand why a direction vector (such as a normal direction vector) points in a certain direction. A proper setup is essential to understand why a normal, which is supposed to be perpendicular, points into a given direction. Otherwise, I would spend time figuring out if the math is wrong or i am missing a component in the experiment.

Anyway, let us proceed. Imagine the following, a scaling takes place on our horizontal line. If we scale all y components alongside y by 2, the line will lie horizontally on y=6. This shouldn't affect the rotation? Or rather, it will? I am not sure I fully understand it either, that's why I need a better experiment setup.

The problem occurs, if we scale only one of the components, it will warp the shape. In the case of a horizontal line, it'll either move it vertically or horizontally.

I think an additional good experiment would be in desmos 3d. We draw a plane, and in the center, a normal vector. We apply the model matrix ROTATION + SCALE to the plane. What happens to the normal? We then apply ROTATION + SCALE to a normal. What happens to the normal? We then apply inverse (ROTATION + SCALE) to normal. What happens to the normal? We then apply transpose(inverse(ROTATION + SCALE)) to normal. What happens to the normal?

One of the quirks I see is we need two components of understanding, visual and mathematical.

## Correctly broken normal

The following sample, demonstrates a broken normal, due to the scaling factor in the model matrix.

<https://www.desmos.com/calculator/lpbz2vvco3>

We had to make the line non-vertical and non-horizontal to break the normal's perpendicularity.

## Successfully corrected normal

In the demo below, after applying the `transpose(inverse())` operation, we get a normal with a good direction.

However, the normal does not follow the line properly, it seems that transpose(inverse()) does not handle that, as well, but that should be fine? I think.

<https://www.desmos.com/calculator/sksnomszkg>

## Final result

Our final result renders mangled normals, and correct normals.

There are a few comments that explain why the things are the way they are.

<https://www.desmos.com/calculator/qrp4qugsmd>

## Notes (not to get lost)

_The scale deforms the line, and hence affects the normal. Therefore, simply applying the model matrix to the normal, will not yield perpendicular normal._

_The line must not be perfectly vertical or horizontal to make this test work. For some reason, horizontal line keeps perpendicular normal regardless of the scaling factor._

_The problem is as follows: I think that the matrix can preserve either the position or direction. Our choice preserves direction, so the position is mangled in the process. One solution is to get the distance from the center (anchor) and offset the direction vector (for vizualistic purposes). However, slightly cleaner is to keep center position and move it with model matrix at all times, and use it as an anchor._

## Math source

In case desmos samples disappear, the math is in this document: [desmos/tranpose_inverse_of_model_matrix_for_normals.md](./desmos/tranpose_inverse_of_model_matrix_for_normals.md)
