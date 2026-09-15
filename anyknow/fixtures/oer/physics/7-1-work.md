# 7.1 Work

Title: 7.1 Work
Book: University Physics Volume 1
Authors: William Moebs, Samuel J. Ling, Jeff Sanny
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/university-physics-volume-1/pages/7-1-work
Access for free at: https://openstax.org/books/university-physics-volume-1/pages/1-introduction
Course-aliases: 大学物理, University Physics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 7.1 Work

## 7.1   Work

### Learning Objectives

By the end of this section, you will be able to:

- Represent the work done by any force
- Evaluate the work done for various forces

In physics, work is done on an object when energy is transferred to the object. In other words, work is done when a force acts on something that undergoes a displacement from one position to another. Forces can vary as a function of position, and displacements can be along various paths between two points. We first define the increment of work *dW* done by a force $\overset{\rightarrow}{\mathbf{F}}$ acting through an infinitesimal displacement $d\mathbf{\overset{\rightarrow}{r}}$ as the dot product of these two vectors:

$$dW = \overset{\rightarrow}{\mathbf{F}} \cdot d\mathbf{\overset{\rightarrow}{r}} = \left| \overset{\rightarrow}{\mathbf{F}} \right|\left| {d\mathbf{\overset{\rightarrow}{r}}} \right|\text{cos}\ \theta.$$

(7.1)

Then, we can add up the contributions for infinitesimal displacements, along a path between two positions, to get the total work.

### Work Done by a Force

The work done by a force is the integral of the force with respect to displacement along the path of the displacement:

$$W_{AB} = {\int\limits_{\text{path}\ AB}{\mathbf{\overset{\rightarrow}{F}} \cdot d\mathbf{\overset{\rightarrow}{r}}}}.$$

(7.2)

The vectors involved in the definition of the work done by a force acting on a particle are illustrated in Figure 7.2. While in general, Equation 7.2 requires mathematics beyond the scope of this text, in many simple situations this integral becomes a familiar integral in one variable. We will examine several such examples and restrict our discussion to these cases.

*Figure 7.2* Vectors used to define work. The force acting on a particle and its infinitesimal displacement are shown at one point along the path between A and B . The infinitesimal work is the dot product of these two vectors; the total work is the integral of the dot product along the path. (Alt: A curved path connecting two points, A and B, is shown. The vector d r is a small displacement tangent to the path. The force F is a vector at the location of the displacement d r, at an angle theta to d r.)

We choose to express the dot product in terms of the magnitudes of the vectors and the cosine of the angle between them, because the meaning of the dot product for work can be put into words more directly in terms of magnitudes and angles. We could equally well have expressed the dot product in terms of the various components introduced in Vectors. In two dimensions, these were the *x*- and *y*-components in Cartesian coordinates, or the *r*- and $\varphi$-components in polar coordinates; in three dimensions, it was just *x*-, *y*-, and *z*-components. Which choice is more convenient depends on the situation. In words, you can express Equation 7.1 for the work done by a force acting over a displacement as a product of one component acting parallel to the other component. From the properties of vectors, it doesn't matter if you take the component of the force parallel to the displacement or the component of the displacement parallel to the force---you get the same result either way.

Recall that the magnitude of a force times the cosine of the angle the force makes with a given direction is the component of the force in the given direction. The components of a vector can be positive, negative, or zero, depending on whether the angle between the vector and the component-direction is between $0\text{°}$ and $90\text{°}$ or $90\text{°}$ and $180\text{°}$, or is equal to $90\text{°}$. As a result, the work done by a force can be positive, negative, or zero, depending on whether the force is generally in the direction of the displacement, generally opposite to the displacement, or perpendicular to the displacement. The maximum work is done by a given force when it is along the direction of the displacement ($\text{cos}\ \theta = \pm 1$), and zero work is done when the force is perpendicular to the displacement ($\text{cos}\ \theta = 0$).

The units of work are units of force multiplied by units of length, which in the SI system is newtons times meters, $\text{N} \cdot \text{m.}$ This combination is called a joule, for historical reasons that we will mention later, and is abbreviated as J. In the English system, still used in the United States, the unit of force is the pound (lb) and the unit of distance is the foot (ft), so the unit of work is the foot-pound $(\text{ft} \cdot \text{lb})\text{.}$

### Work Done by Constant Forces and Contact Forces

The simplest work to evaluate is that done by a force that is constant in magnitude and direction. In this case, we can factor out the force; the remaining integral is just the total displacement, which only depends on the end points *A* and *B*, but not on the path between them:

$$W_{AB} = \overset{\rightarrow}{\mathbf{F}} \cdot {\int_{A}^{B}{d\mathbf{\overset{\rightarrow}{r}}}} = \overset{\rightarrow}{\mathbf{F}} \cdot \left( {\mathbf{\overset{\rightarrow}{r}}_{B} - \mathbf{\overset{\rightarrow}{r}}_{A}} \right) = \left| \overset{\rightarrow}{\mathbf{F}} \right|\left| {\mathbf{\overset{\rightarrow}{r}}_{B} - \mathbf{\overset{\rightarrow}{r}}_{A}} \right|\text{cos}\ \theta\mspace{9mu}\text{(constant force).}$$

Figure 7.3(a) shows a person exerting a constant force $\overset{\rightarrow}{\mathbf{F}}$ along the handle of a lawn mower, which makes an angle $\theta$ with the horizontal. The horizontal displacement of the lawn mower, over which the force acts, is $\overset{\rightarrow}{\mathbf{d}}.$ The work done on the lawn mower is$W = \overset{\rightarrow}{\mathbf{F}} \cdot \overset{\rightarrow}{\mathbf{d}} = Fd\ \text{cos}\ \theta$, which the figure also illustrates as the horizontal component of the force times the magnitude of the displacement.

*Figure 7.3* Work done by a constant force. (a) A person pushes a lawn mower with a constant force. The component of the force parallel to the displacement is the work done, as shown in the equation in the figure. (b) A person holds a briefcase. No work is done because the displacement is zero. (c) The person in (b) walks horizontally while holding the briefcase. No work is done because cos θ is zero. (Alt: Figure a shows a person pushing a lawn mower with a constant force. The displacement is a horizontal vector d pointing to the right. The force F is a vector pointing down and to the right, along the handle of the lawn mower, at an angle theta below the horizontal. The component of the force parallel to the displacement is F cosine theta. The equation W equals F d cosine theta is shown in the figure. Figure b shows a person holding a briefcase. The force F is upward. The displacement is zero. Figure c shows the person in b walking horizontally while holding the briefcase. The force F is upward, as in b. The displacement d is horizontal to the right. Theta equals ninety degrees and cosine theta equals zero.)

Figure 7.3(b) shows a person holding a briefcase. The person must exert an upward force, equal in magnitude to the weight of the briefcase, but this force does no work, because the displacement over which it acts is zero.

In Figure 7.3(c), where the person in (b) is walking horizontally with constant speed, the work done by the person on the briefcase is still zero, but now because the angle between the force exerted and the displacement is $90\text{°}$ ($\overset{\rightarrow}{\mathbf{F}}$ perpendicular to $\overset{\rightarrow}{\mathbf{d}}$) and $\text{cos}\ 90\text{°} = 0$.

### Example  7.1

#### Calculating the Work You Do to Push a Lawn Mower

How much work is done on the lawn mower by the person in Figure 7.3(a) if he exerts a constant force of 75.0 N at an angle $35\text{°}$ below the horizontal and pushes the mower 25.0 m on level ground?

#### Strategy

We can solve this problem by substituting the given values into the definition of work done on an object by a constant force, stated in the equation $W = Fd\ \text{cos}\ \theta$. The force, angle, and displacement are given, so that only the work *W* is unknown.

#### Solution

The equation for the work is

$$W = Fd\ \text{cos}\ \theta.$$

Substituting the known values gives

$$W = (75.0\ \text{N})(25.0\ \text{m})\text{cos}(35.0\text{°}) = 1.54\  \times \ 10^{3}\ \text{J}\text{.}$$

#### Significance

Even though one and a half kilojoules may seem like a lot of work, we will see in Potential Energy and Conservation of Energy that it's only about as much work as you could do by burning one sixth of a gram of fat.

When you mow the grass, other forces act on the lawn mower besides the force you exert---namely, the contact force of the ground and the gravitational force of Earth. Let's consider the work done by these forces in general. For an object moving on a surface, the displacement $d\overset{\rightarrow}{\mathbf{r}}$ is tangent to the surface. The part of the contact force on the object that is perpendicular to the surface is the normal force $\mathbf{\overset{\rightarrow}{N}}.$ Since the cosine of the angle between the normal and the tangent to a surface is zero, we have

$$dW_{\text{N}} = \mathbf{\overset{\rightarrow}{N}} \cdot d\mathbf{\overset{\rightarrow}{r}} = 0.$$

The normal force never does work under these circumstances. (Note that if the displacement $d\mathbf{\overset{\rightarrow}{r}}$ did have a relative component perpendicular to the surface, the object would either leave the surface or break through it, and there would no longer be any normal contact force. However, if the object is more than a particle, and has an internal structure, the normal contact force can do work on it, for example, by displacing it or deforming its shape. This will be mentioned in the next chapter.)

The part of the contact force on the object that is parallel to the surface is friction, $\mathbf{\overset{\rightarrow}{f}}.$ For this object sliding along the surface, kinetic friction $\mathbf{\overset{\rightarrow}{f}}_{\text{k}}$ is opposite to $d\mathbf{\overset{\rightarrow}{r}},$ relative to the surface, so the work done by kinetic friction is negative. If the magnitude of $\mathbf{\overset{\rightarrow}{f}}_{\text{k}}$ is constant (as it would be if all the other forces on the object were constant), then the work done by friction is

$$W_{\text{fr}} = {\int_{A}^{B}\mathbf{\overset{\rightarrow}{f}}_{k}} \cdot d\mathbf{\overset{\rightarrow}{r}} = \text{−}f_{k}{\int_{A}^{B}\left| {dr} \right|} = \text{−}f_{k}\left| l_{AB} \right|,$$

(7.3)

$\left| l_{AB} \right|$ is the path length on the surface. The force of static friction does no work in the reference frame between two surfaces because there is never displacement between the surfaces. As an external force, static friction can do work. Static friction can keep someone from sliding off a sled when the sled is moving and perform positive work on the person. If you're driving your car at the speed limit on a straight, level stretch of highway, the negative work done by air resistance is balanced by the positive work done by the static friction of the road on the drive wheels. You can pull the rug out from under an object in such a way that it slides backward relative to the rug, but forward relative to the floor. In this case, kinetic friction exerted by the rug on the object could be in the same direction as the displacement of the object, relative to the floor, and do positive work. The bottom line is that you need to analyze each particular case to determine the work done by the forces, whether positive, negative or zero.

### Example  7.2

#### Moving a Couch

You decide to move your couch to a new position on your horizontal living room floor. The normal force on the couch is 1 kN and the coefficient of friction is 0.6. (a) You first push the couch 3 m parallel to a wall and then 1 m perpendicular to the wall (*A* to *B* in Figure 7.4). How much work is done by the frictional force? (b) You don't like the new position, so you move the couch straight back to its original position (*B* to *A* in Figure 7.4). What was the total work done against friction moving the couch away from its original position and back again?

*Figure 7.4* Top view of paths for moving a couch. (Alt: Points A and B are connected by a segment to the right, length 3 m, and a vertical segment up of length 1 m. These segments are path a, shown in blue. A and B are also connected by a straight segment, shown in orange as path b. the segments of path a form the sides of a right triangle, and path b is the hypotenuse of the triangle.)

#### Strategy

The magnitude of the force of kinetic friction on the couch is constant, equal to the coefficient of friction times the normal force, $f_{K} = \mu_{K}N$. Therefore, the work done by it is $W_{\text{fr}} = \text{−}f_{K}d$, where *d* is the path length traversed. The segments of the paths are the sides of a right triangle, so the path lengths are easily calculated. In part (b), you can use the fact that the work done against a force is the negative of the work done by the force.

#### Solution

a.  The work done by friction i

    :::
    $$W = - (0.6)\left( {1\ \text{kN}} \right)\left( {3\ \text{m}\  + 1\ \text{m}} \right) = - 2.4\ \text{kJ}\text{.}$$
    :::
b.  The length of the path along the hypotenuse is $\sqrt{10}\ \text{m}$, so the total work done against friction is

    :::
    $$W = (0.6)\left( {1\ \text{kN}} \right)(3\ \text{m}\  + 1\ \text{m}\  + \sqrt{10}\ \text{m}) = 4.3\ \text{kJ}\text{.}$$
    :::

#### Significance

The total path over which the work of friction was evaluated began and ended at the same point (it was a closed path), so that the total displacement of the couch was zero. However, the total work was not zero. The reason is that forces like friction are classified as nonconservative forces, or dissipative forces, as we discuss in the next chapter.

### Check Your Understanding  7.1

Can kinetic friction ever be a constant force for all paths?

The other force on the lawn mower mentioned above was Earth's gravitational force, or the weight of the mower. Near the surface of Earth, the gravitational force on an object of mass *m* has a constant magnitude, *mg*, and constant direction, vertically down. Therefore, the work done by gravity on an object is the dot product of its weight and its displacement. In many cases, it is convenient to express the dot product for gravitational work in terms of the *x*-, *y*-, and *z*-components of the vectors. A typical coordinate system has the *x*-axis horizontal and the *y*-axis vertically up. Then the gravitational force is $\text{−}mg\hat{\mathbf{j}},$ so the work done by gravity, over any path from *A* to *B*, is

$$W_{\text{grav},AB} = \text{−}mg\hat{\mathbf{j}} \cdot (\mathbf{\overset{\rightarrow}{r}}_{B} - \mathbf{\overset{\rightarrow}{r}}_{A}) = \text{−}mg\left( {y_{B} - y_{A}} \right).$$

(7.4)

The work done by a constant force of gravity on an object depends only on the object's weight and the difference in height through which the object is displaced. Gravity does negative work on an object that moves upward ($y_{B} > y_{A}$), or, in other words, you must do positive work against gravity to lift an object upward. Alternately, gravity does positive work on an object that moves downward ($y_{B} < y_{A}$), or you do negative work against gravity to "lift" an object downward, controlling its descent so it doesn't drop to the ground. ("Lift" is used as opposed to "drop".)

### Example  7.3

#### Shelving a Book

You lift an oversized library book, weighing 20 N, 1 m vertically down from a shelf, and carry it 3 m horizontally to a table (Figure 7.5). (a) How much work does gravity do on the book? (b) When you're finished, you move the book in a straight line back to its original place on the shelf. What was the total work done against gravity, moving the book away from its original position on the shelf and back again?

*Figure 7.5* Side view of the paths for moving a book to and from a shelf. (Alt: Point A is at a shelf at the top of a bookcase. Point B is a location on a table, to the right of the bookcase. The vertical distance from the shelf to the level of the table is 1 m, and the horizontal distance from the bookcase to the table is 3 m. Path a is a straight line from the shelf down 1 m. Path b is a horizontal segment from the bookcase to the table, and then diagonally up and to the left to the shelf.)

#### Strategy

We have just seen that the work done by a constant force of gravity depends only on the weight of the object moved and the difference in height for the path taken, $W_{AB} = \text{−}mg\left( {y_{B} - y_{A}} \right)$. We can evaluate the difference in height to answer (a) and (b).

#### Solution

a.  Since the book starts on the shelf and is lifted down $y_{B} - y_{A} = \text{−}1\ \text{m}$, we have

    :::
    $$W = \text{−}(20\ \text{N})( - 1\ \text{m}) = 20\ \text{J}\text{.}$$
    :::
b.  There is zero difference in height for any path that begins and ends at the same place on the shelf, so $W = 0.$

#### Significance

Gravity does positive work (20 J) when the book moves down from the shelf. The gravitational force between two objects is an attractive force, which does positive work when the objects get closer together. Gravity does zero work (0 J) when the book moves horizontally from the shelf to the table and negative work (−20 J) when the book moves from the table back to the shelf. The total work done by gravity is zero $\lbrack 20\ \text{J} + 0\ \text{J} + \left( {\text{−}20\ \text{J}} \right) = 0\rbrack.$ Unlike friction or other dissipative forces, described in Example 7.2, the total work done against gravity, over any closed path, is zero. Positive work is done against gravity on the upward parts of a closed path, but an equal amount of negative work is done against gravity on the downward parts. In other words, work done *against* gravity, lifting an object *up*, is "given back" when the object comes back down. Forces like gravity (those that do zero work over any closed path) are classified as conservative forces and play an important role in physics.

### Check Your Understanding  7.2

Can Earth's gravity ever be a constant force for all paths?

### Work Done by Forces that Vary

In general, forces may vary in magnitude and direction at points in space, and paths between two points may be curved. The infinitesimal work done by a variable force can be expressed in terms of the components of the force and the displacement along the path,

$$dW = F_{x}dx + F_{y}dy + F_{z}dz.$$

Here, the components of the force are functions of position along the path, and the displacements depend on the equations of the path. (Although we chose to illustrate *dW* in Cartesian coordinates, other coordinates are better suited to some situations.) Equation 7.2 defines the total work as a line integral, or the limit of a sum of infinitesimal amounts of work. The physical concept of work is straightforward: you calculate the work for tiny displacements and add them up. Sometimes the mathematics can seem complicated, but the following example demonstrates how cleanly they can operate.

### Example  7.4

#### Work Done by a Variable Force over a Curved Path

An object moves along a parabolic path $y = (0.5\ \text{m}^{-1})x^{2}$ from the origin $A = (0,0)$ to the point $B = (2\ \text{m,}\ 2\ \text{m})$ under the action of a force $\mathbf{\overset{\rightarrow}{F}} = (5\ \text{N/m})y\mathbf{\hat{i}} + (10\ \text{N/m})x\mathbf{\hat{j}}$ (Figure 7.6). Calculate the work done.

*Figure 7.6* The parabolic path of a particle acted on by a given force. (Alt: A graph of y in meters versus x in meters is shown. A parabolic path labeled as y of x starts at 0, 0 and curves up and to the right. The point (2, 2) is on the parabola. Vector F of x, y is shown at a point between the origin and coordinate 2, 2. Vector F points to the right and up, at some angle to the curve y of x.)

#### Strategy

The components of the force are given functions of *x* and *y*. We can use the equation of the path to express *y* and *dy* in terms of *x* and *dx*; namely,

$$y = (0.5\ \text{m}^{-1})x^{2}\ \text{and}\ dy = 2(0.5\ \text{m}^{-1})xdx.$$

Then, the integral for the work is just a definite integral of a function of *x*.

#### Solution

The infinitesimal element of work is

$$\begin{array}{cl}
{dW} & {= F_{x}dx + F_{y}dy = (5\ \text{N/m})ydx + (10\ \text{N/m})xdy} \\
 & {= (5\ \text{N/m})(0.5\ \text{m}^{\text{−}1})x^{2}dx + (10\ \text{N/m})2(0.5\ \text{m}^{\text{−}1})x^{2}dx = (12.5\ \text{N/m}^{2})x^{2}dx.}
\end{array}$$

The integral of $x^{2}$ is $x^{3}\text{/}3,$ so

$$W = {\int_{0}^{2\ \text{m}}{(12.5\ \text{N/m}^{2})x^{2}dx}} = (12.5\ \text{N/m}^{2})\left. \frac{x^{3}}{3} \right|_{0}^{2\ \text{m}} = (12.5\ \text{N/m}^{2})\left( \frac{8\text{m}^{3}}{3} \right) = 33.3\ \text{J}\text{.}$$

#### Significance

This integral was not hard to do. You can follow the same steps, as in this example, to calculate line integrals representing work for more complicated forces and paths. In this example, everything was given in terms of *x*- and *y*-components, which are easiest to use in evaluating the work in this case. In other situations, magnitudes and angles might be easier.

### Check Your Understanding  7.3

Find the work done by the same force in Example 7.4 over a cubic path, $y = (0.25\ \text{m}^{\text{−2}})x^{3}$, between the same points $A = (0,0)$ and $B = (2\ \text{m,}\ 2\ \text{m})\text{.}$

One very important and widely applicable variable force is the force exerted by a perfectly elastic spring, which satisfies Hooke's law $\mathbf{\overset{\rightarrow}{F}} = \text{−}k\text{Δ}\mathbf{\overset{\rightarrow}{x}},$ where *k* is the spring constant, and $\text{Δ}\mathbf{\overset{\rightarrow}{x}} = \mathbf{\overset{\rightarrow}{x}} - \mathbf{\overset{\rightarrow}{x}}_{\text{eq}}$ is the displacement from the spring's unstretched (equilibrium) position (Newton's Laws of Motion). Note that the unstretched position is only the same as the equilibrium position if no other forces are acting (or, if they are, they cancel one another). Forces between molecules, or in any system undergoing small displacements from a stable equilibrium, behave approximately like a spring force.

To calculate the work done by a spring force, we can choose the *x*-axis along the length of the spring, in the direction of increasing length, as in Figure 7.7, with the origin at the equilibrium position $x_{\text{eq}} = 0.$ (Then positive *x* corresponds to a stretch and negative *x* to a compression.) With this choice of coordinates, the spring force has only an *x*-component,$F_{x} = \text{−}kx$, and the work done when *x* changes from $x_{A}$ to $x_{B}$ is

$$W_{\text{spring},AB} = {\int_{A}^{B}{F_{x}dx =}} - k{\int_{A}^{B}{xdx}} = \text{−}k\left. \frac{x^{2}}{2} \right|_{A}^{B} = - \frac{1}{2}k\left( {x_{B}^{2} - x_{A}^{2}} \right).$$

(7.5)

*Figure 7.7* (a) The spring exerts no force at its equilibrium position. The spring exerts a force in the opposite direction to (b) an extension or stretch, and (c) a compression. (Alt: A horizontal spring whose left end is attached to a wall is shown in three different states. In all the diagrams, the displacement x is measured as the displacement to the right of the right end of the spring from its equilibrium location. In figure a, the spring is relaxed and the right end is at x = 0. In figure b, the spring is stretched. The right end of the spring is a vector delta x to the right of x = 0 and feels a leftward force F equals minus k times the vector delta x. In figure c, the spring is compressed. The right end of the spring is a vector delta x to the left of x = 0 and feels a rightward force F equals minus k times the vector delta x.)

Notice that $W_{AB}$ depends only on the starting and ending points, *A* and *B*, and is independent of the actual path between them, as long as it starts at *A* and ends at *B.* That is, the actual path could involve going back and forth before ending.

Another interesting thing to notice about Equation 7.5 is that, for this one-dimensional case, you can readily see the correspondence between the work done by a force and the area under the curve of the force versus its displacement. Recall that, in general, a one-dimensional integral is the limit of the sum of infinitesimals,$f(x)dx$, representing the area of strips, as shown in Figure 7.8. In Equation 7.5, since $F = \text{−}kx$ is a straight line with slope $\text{−}k$, when plotted versus *x*, the "area" under the line is just an algebraic combination of triangular "areas," where "areas" above the *x*-axis are positive and those below are negative, as shown in Figure 7.9. The magnitude of one of these "areas" is just one-half the triangle's base, along the *x*-axis, times the triangle's height, along the force axis. (There are quotation marks around "area" because this base-height product has the units of work, rather than square meters.)

*Figure 7.8* A curve of f(x) versus x showing the area of an infinitesimal strip, f(x)dx , and the sum of such areas, which is the integral of f(x) from x 1 to x 2 . (Alt: A graph of a generic function f of x is shown. The area within a narrow vertical strip of width dx and extending from the x axis up to the function f (x) is highlighted. The area f(x) curve and the x axis from x = x sub 1 to x = x sub 2 is shaded. The shaded area is the sum of the strip areas.)

*Figure 7.9* Curve of the spring force f ( x ) = − k x versus x , showing areas under the line, between x A and x B , for both positive and negative values of x A . When x A is negative, the total area under the curve for the integral in Equation 7.5 is the sum of positive and negative triangular areas. When x A is positive, the total area under the curve is the difference between two negative triangles. (Alt: A linear function f(x) = -k x is plotted, with the x range extending from some x value to some positive x value. The graph is a straight line with negative slope crossing through the origin. The area under the curve to the left of the origin from –x sub A to the origin (where x is negative and f(x) is positive) is shaded in red and is a positive area. Two negative areas are shaded in gray. From the origin to some positive x sub A is a triangular area below the x axis shaded in light gray. From x sub A to a larger x sub B is a trapezoid below the x axis shaded in dark gray.)

### Example  7.5

#### Work Done by a Spring Force

A perfectly elastic spring requires 0.54 J of work to stretch 6 cm from its equilibrium position, as in Figure 7.7(b). (a) What is its spring constant *k*? (b) How much work is required to stretch it an additional 6 cm?

#### Strategy

Work "required" means work done against the spring force, which is the negative of the work in Equation 7.5, that is

$$W = \frac{1}{2}k(x_{B}^{2} - x_{A}^{2}).$$

For part (a), $x_{A} = 0$ and $x_{B} = 6\text{cm}$; for part (b), $x_{A} = 6\text{cm}$ and $x_{B} = 12\text{cm}$. In part (a), the work is given and you can solve for the spring constant; in part (b), you can use the value of *k*, from part (a), to solve for the work.

#### Solution

a.  $W = 0.54\ \text{J} = \frac{1}{2}k\lbrack{(6\ \text{cm})}^{2} - 0\rbrack$, so $k = 3\ \text{N/cm}\text{.}$
b.  $W = \frac{1}{2}(3\ \text{N/cm})\lbrack{(12\ \text{cm})}^{2} - {(6\ \text{cm})}^{2}\rbrack = 1.62\ \text{J}.$

#### Significance

Since the work done by a spring force is independent of the path, you only needed to calculate the difference in the quantity $½kx^{2}$ at the end points. Notice that the work required to stretch the spring from 0 to 12 cm is four times that required to stretch it from 0 to 6 cm, because that work depends on the square of the amount of stretch from equilibrium, $½kx^{2}$. In this circumstance, the work to stretch the spring from 0 to 12 cm is also equal to the work for a composite path from 0 to 6 cm followed by an additional stretch from 6 cm to 12 cm. Therefore, $4W(0\ \text{cm}\ \text{to}\ 6\ \text{cm}) = W(0\ \text{cm}\ \text{to}\ 6\ \text{cm}) + W(6\ \text{cm}\ \text{to}\ 12\ \text{cm})$, or $W(6\ \text{cm}\ \text{to}\ 12\ \text{cm}) = 3W(0\ \text{cm}\ \text{to}\ 6\ \text{cm})$, as we found above.

### Check Your Understanding  7.4

The spring in Example 7.5 is compressed 6 cm from its equilibrium length. (a) Does the spring force do positive or negative work and (b) what is the magnitude?
