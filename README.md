# Bezier-Curves

Bezier curves can interestingly be defined recursively as points which travel on lines between points in equal time. Connecting the final point gives the curve.
This is an attempt to program a Bezier curve animation as per their points travelling in equal time definition.

Two red points travel along the line segments between the three original white points. And then another point travels across the line connecting red points. All points travel their distances in equal time. This process of drawing points travelling on lines would recursively occur till we end up with one point. This last point traces the Bezier curve. 
I find this definition beautiful.

![](giff.gif)
