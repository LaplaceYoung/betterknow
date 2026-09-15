# 5.2 The Definite Integral

Title: 5.2 The Definite Integral
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/5-2-the-definite-integral
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 5.2 The Definite Integral

## 5.2   The Definite Integral

### Learning Objectives

- 5.2.1 State the definition of the definite integral.
- 5.2.2 Explain the terms integrand, limits of integration, and variable of integration.
- 5.2.3 Explain when a function is integrable.
- 5.2.4 Describe the relationship between the definite integral and net area.
- 5.2.5 Use geometry and the properties of definite integrals to evaluate them.
- 5.2.6 Calculate the average value of a function.

In the preceding section we defined the area under a curve in terms of Riemann sums:

$$A = \underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{f\left( x_{i}^{*} \right)\text{Δ}x}}.$$

However, this definition came with restrictions. We required $f(x)$ to be continuous and nonnegative. Unfortunately, real-world problems don't always meet these restrictions. In this section, we look at how to apply the concept of the area under the curve to a broader set of functions through the use of the definite integral.

### Definition and Notation

The definite integral generalizes the concept of the area under a curve. We lift the requirements that $f(x)$ be continuous and nonnegative, and define the definite integral as follows.

### Definition

If $f(x)$ is a function defined on an interval $\left\lbrack {a,b} \right\rbrack,$ the definite integral of *f* from *a* to *b* is given by

$${\int_{a}^{b}{f(x)dx}} = \underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{f\left( x_{i}^{*} \right)\text{Δ}x}},$$

(5.8)

provided the limit exists. If this limit exists, the function $f(x)$ is said to be integrable on $\left\lbrack {a,b} \right\rbrack,$ or is an integrable function.

The integral symbol in the previous definition should look familiar. We have seen similar notation in the chapter on Applications of Derivatives, where we used the indefinite integral symbol (without the *a* and *b* above and below) to represent an antiderivative. Although the notation for indefinite integrals may look similar to the notation for a definite integral, they are not the same. A definite integral is a number. An indefinite integral is a family of functions. Later in this chapter we examine how these concepts are related. However, close attention should always be paid to notation so we know whether we're working with a definite integral or an indefinite integral.

Integral notation goes back to the late seventeenth century and is one of the contributions of Gottfried Wilhelm Leibniz, who is often considered to be the codiscoverer of calculus, along with Isaac Newton. The integration symbol ∫ is an elongated S, suggesting sigma or summation. On a definite integral, above and below the summation symbol are the boundaries of the interval, $\left\lbrack {a,b} \right\rbrack.$ The numbers *a* and *b* are *x*-values and are called the limits of integration; specifically, *a* is the lower limit and *b* is the upper limit. To clarify, we are using the word *limit* in two different ways in the context of the definite integral. First, we talk about the limit of a sum as $n\rightarrow\infty.$ Second, the boundaries of the region are called the *limits of integration*.

We call the function $f(x)$ the integrand, and the *dx* indicates that $f(x)$ is a function with respect to *x*, called the variable of integration. Note that, like the index in a sum, the variable of integration is a dummy variable, and has no impact on the computation of the integral. We could use any variable we like as the variable of integration:

$${\int_{a}^{b}{f(x)dx}} = {\int_{a}^{b}{f(t)dt}} = {\int_{a}^{b}{f(u)du}}$$

### Theorem 5.1

#### Continuous Functions Are Integrable

If $f(x)$ is continuous on $\left\lbrack {a,b} \right\rbrack,$ then *f* is integrable on $\left\lbrack {a,b} \right\rbrack.$

Functions that are not continuous on $\left\lbrack {a,b} \right\rbrack$ may still be integrable, depending on the nature of the discontinuities. For example, functions continuous on a closed interval, apart from a finite number of jump discontinuities, are integrable.

It is also worth noting here that we have retained the use of a regular partition in the Riemann sums. This restriction is not strictly necessary. Any partition can be used to form a Riemann sum. However, if a nonregular partition is used to define the definite integral, it is not sufficient to take the limit as the number of subintervals goes to infinity. Instead, we must take the limit as the width of the largest subinterval goes to zero. This introduces a little more complex notation in our limits and makes the calculations more difficult without really gaining much additional insight, so we stick with regular partitions for the Riemann sums.

### Example  5.7

#### Evaluating an Integral Using the Definition

Use the definition of the definite integral to evaluate ${\int_{0}^{2}{x^{2}dx}}.$ Use a right-endpoint approximation to generate the Riemann sum.

#### Solution

We first want to set up a Riemann sum. Based on the limits of integration, we have $a = 0$ and $b = 2.$ For $i = 0,1,2\text{,…,}\ n,$ let $P = \left\{ x_{i} \right\}$ be a regular partition of $\left\lbrack {0,2} \right\rbrack.$ Then

$$\text{Δ}x = \frac{b - a}{n} = \frac{2}{n}.$$

Since we are using a right-endpoint approximation to generate Riemann sums, for each *i*, we need to calculate the function value at the right endpoint of the interval $\left\lbrack {x_{i - 1},x_{i}} \right\rbrack.$ The right endpoint of the interval is $x_{i},$ and since *P* is a regular partition,

$$x_{i} = x_{0} + i\text{Δ}x = 0 + i\left\lbrack \frac{2}{n} \right\rbrack = \frac{2i}{n}.$$

Thus, the function value at the right endpoint of the interval is

$$f\left( x_{i} \right) = x_{i}^{2} = \left( \frac{2i}{n} \right)^{2} = \frac{4i^{2}}{n^{2}}.$$

Then the Riemann sum takes the form

$${\sum\limits_{i = 1}^{n}{f\left( x_{i} \right)\text{Δ}x}} = {\sum\limits_{i = 1}^{n}{\left( \frac{4i^{2}}{n^{2}} \right)\frac{2}{n}}} = {\sum\limits_{i = 1}^{n}\frac{8i^{2}}{n^{3}}} = \frac{8}{n^{3}}{\sum\limits_{i = 1}^{n}i^{2}}.$$

Using the summation formula for ${\sum\limits_{i = 1}^{n}i^{2}},$ we have

$$\begin{array}{cl}
{\sum\limits_{i = 1}^{n}{f\left( x_{i} \right)\text{Δ}x}} & {= \frac{8}{n^{3}}{\sum\limits_{i = 1}^{n}i^{2}}} \\
 & \\
 & \\
 & \\
 & {= \frac{8}{n^{3}}\left\lbrack \frac{n\left( {n + 1} \right)\left( {2n + 1} \right)}{6} \right\rbrack} \\
 & {= \frac{8}{n^{3}}\left\lbrack \frac{2n^{3} + 3n^{2} + n}{6} \right\rbrack} \\
 & {= \frac{16n^{3} + 24n^{2} + 8n}{6n^{3}}} \\
 & {= \frac{8}{3} + \frac{4}{n} + \frac{8}{6n^{2}}.}
\end{array}$$

Now, to calculate the definite integral, we need to take the limit as $n\rightarrow\infty.$ We get

$$\begin{array}{cl}
{\int_{0}^{2}{x^{2}dx}} & {= \underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{f\left( x_{i} \right)\text{Δ}x}}} \\
 & \\
 & \\
 & {= \underset{n\rightarrow\infty}{\text{lim}}\left( {\frac{8}{3} + \frac{4}{n} + \frac{8}{6n^{2}}} \right)} \\
 & {= \underset{n\rightarrow\infty}{\text{lim}}\left( \frac{8}{3} \right) + \underset{n\rightarrow\infty}{\text{lim}}\left( \frac{4}{n} \right) + \underset{n\rightarrow\infty}{\text{lim}}\left( \frac{8}{6n^{2}} \right)} \\
 & {= \frac{8}{3} + 0 + 0 = \frac{8}{3}.}
\end{array}$$

### Checkpoint 5.7

Use the definition of the definite integral to evaluate ${\int_{0}^{3}{\left( {2x - 1} \right)dx}}.$ Use a right-endpoint approximation to generate the Riemann sum.

### Evaluating Definite Integrals

Evaluating definite integrals this way can be quite tedious because of the complexity of the calculations. Later in this chapter we develop techniques for evaluating definite integrals *without* taking limits of Riemann sums. However, for now, we can rely on the fact that definite integrals represent the area under the curve, and we can evaluate definite integrals by using geometric formulas to calculate that area. We do this to confirm that definite integrals do, indeed, represent areas, so we can then discuss what to do in the case of a curve of a function dropping below the *x*-axis.

### Example  5.8

#### Using Geometric Formulas to Calculate Definite Integrals

Use the formula for the area of a circle to evaluate ${\int_{3}^{6}{\sqrt{9 - \left( {x - 3} \right)^{2}}dx}}.$

#### Solution

The function describes a semicircle with radius 3. To find

$${\int_{3}^{6}{\sqrt{9 - \left( {x - 3} \right)^{2}}dx}},$$

we want to find the area under the curve over the interval $\left\lbrack {3,6} \right\rbrack.$ The formula for the area of a circle is $A = \pi r^{2}.$ The area of a semicircle is just one-half the area of a circle, or $A = \left( \frac{1}{2} \right)\pi r^{2}.$ The shaded area in Figure 5.16 covers one-half of the semicircle, or $A = \left( \frac{1}{4} \right)\pi r^{2}.$ Thus,

$$\begin{array}{cl}
 & \\
 & \\
{\int_{3}^{6}\sqrt{9 - \left( {x - 3} \right)^{2}}} & {= \frac{1}{4}\pi(3)^{2}} \\
 & {= \frac{9}{4}\pi} \\
 & {\approx 7.069.}
\end{array}$$

*Figure 5.16* The value of the integral of the function f ( x ) over the interval [3, 6] is the area of the shaded region. (Alt: A graph of a semi circle in quadrant one over the interval [0,6] with center at (3,0). The area under the curve over the interval [3,6] is shaded in blue.)

### Checkpoint 5.8

Use the formula for the area of a trapezoid to evaluate ${\int_{2}^{4}{\left( {2x + 3} \right)dx}}.$

### Area and the Definite Integral

When we defined the definite integral, we lifted the requirement that $f(x)$ be nonnegative. But how do we interpret "the area under the curve" when $f(x)$ is negative?

#### Net Signed Area

Let us return to the Riemann sum. Consider, for example, the function $f(x) = 2 - 2x^{2}$ (shown in Figure 5.17) on the interval $\left\lbrack {0,2} \right\rbrack.$ Use $n = 8$ and choose $\left\{ x_{i}^{*}\text{\}} \right.$ as the left endpoint of each interval. Construct a rectangle on each subinterval of height $f\left( x_{i}^{*} \right)$ and width Δ*x*. When $f\left( x_{i}^{*} \right)$ is positive, the product $f\left( x_{i}^{*} \right)\text{Δ}x$ represents the area of the rectangle, as before. When $f\left( x_{i}^{*} \right)$ is negative, however, the product $f\left( x_{i}^{*} \right)\text{Δ}x$ represents the *negative* of the area of the rectangle. The Riemann sum then becomes

$${\sum\limits_{i = 1}^{8}{f\left( x_{i}^{*} \right)\text{Δ}x}} = \left( {\text{Area of rectangles above the}\ x\text{-axis}} \right) - \left( {\text{Area of rectangles below the}\ x\text{-axis}} \right)$$

*Figure 5.17* For a function that is partly negative, the Riemann sum is the area of the rectangles above the x -axis less the area of the rectangles below the x -axis. (Alt: A graph of a downward opening parabola over [-1, 2] with vertex at (0,2) and x-intercepts at (-1,0) and (1,0). Eight rectangles are drawn evenly over [0,2] with heights determined by the value of the function at the left endpoints of each.)

Taking the limit as $n\rightarrow\infty,$ the Riemann sum approaches the area between the curve above the *x*-axis and the *x*-axis, less the area between the curve below the *x*-axis and the *x*-axis, as shown in Figure 5.18. Then,

$$\begin{array}{cl}
{\int_{0}^{2}{f(x)dx}} & {= \underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{f\left( c_{i} \right)\text{Δ}x}}} \\
 & {= A_{1} - A_{2}.}
\end{array}$$

The quantity $A_{1} - A_{2}$ is called the net signed area.

*Figure 5.18* In the limit, the definite integral equals area A 1 less area A 2 , or the net signed area. (Alt: A graph of a downward opening parabola over [-2, 2] with vertex at (0,2) and x-intercepts at (-1,0) and (1,0). The area in quadrant one under the curve is shaded blue and labeled A1. The area in quadrant four above the curve and to the left of x=2 is shaded blue and labeled A2.)

Notice that net signed area can be positive, negative, or zero. If the area above the *x*-axis is larger, the net signed area is positive. If the area below the *x*-axis is larger, the net signed area is negative. If the areas above and below the *x*-axis are equal, the net signed area is zero.

### Example  5.9

#### Finding the Net Signed Area

Find the net signed area between the curve of the function $f(x) = 2x$ and the *x*-axis over the interval $\left\lbrack {-3,3} \right\rbrack.$

#### Solution

The function produces a straight line that forms two triangles: one from $x = -3$ to $x = 0$ and the other from $x = 0$ to $x = 3$ (Figure 5.19). Using the geometric formula for the area of a triangle, $A = \frac{1}{2}bh,$ the area of triangle *A*~1~, above the axis, is

$$A_{1} = \frac{1}{2}3(6) = 9,$$

where 3 is the base and $2(3) = 6$ is the height. The area of triangle *A*~2~, below the axis, is

$$A_{2} = \frac{1}{2}(3)(6) = 9,$$

where 3 is the base and 6 is the height. Thus, the net area is

$${\int_{-3}^{3}{2xdx}} = A_{1} - A_{2} = 9 - 9 = 0.$$

*Figure 5.19* The area above the curve and below the x -axis equals the area below the curve and above the x -axis. (Alt: A graph of an increasing line over [-6, 6] going through the origin and (-3, -6) and (3,6). The area under the line in quadrant one over [0,3] is shaded blue and labeled A1, and the area above the line in quadrant three over [-3,0] is shaded blue and labeled A2.)

#### Analysis

If *A*~1~ is the area above the *x*-axis and *A*~2~ is the area below the *x*-axis, then the net area is $A_{1} - A_{2}.$ Since the areas of the two triangles are equal, the net area is zero.

### Checkpoint 5.9

Find the net signed area of $f(x) = x - 2$ over the interval $\left\lbrack {0,6} \right\rbrack,$ illustrated in the following image.

*(Figure omitted; see the source book.)* (Alt: A graph of an increasing line going through (-2,-4), (0,-2), (2,0), (4,2) and (6,4). The area above the curve in quadrant four is shaded blue and labeled A2, and the area under the curve and to the left of x=6 in quadrant one is shaded and labeled A1.)

#### Total Area

One application of the definite integral is finding displacement when given a velocity function. If $v(t)$ represents the velocity of an object as a function of time, then the area under the curve tells us how far the object is from its original position. This is a very important application of the definite integral, and we examine it in more detail later in the chapter. For now, we're just going to look at some basics to get a feel for how this works by studying constant velocities.

When velocity is a constant, the area under the curve is just velocity times time. This idea is already very familiar. If a car travels away from its starting position in a straight line at a speed of 70 mph for 2 hours, then it is 140 mi away from its original position (Figure 5.20). Using integral notation, we have

$${\int_{0}^{2}{70dt}} = 140.$$

*Figure 5.20* The area under the curve v ( t ) = 70 tells us how far the car is from its starting point at a given time. (Alt: A graph in quadrant 1 with the x-axis labeled as t (hours) and y-axis labeled as v (mi/hr). The area under the line v(t) = 70 is shaded blue over [0,2].)

In the context of displacement, net signed area allows us to take direction into account. If a car travels straight north at a speed of 60 mph for 2 hours, it is 120 mi north of its starting position. If the car then turns around and travels south at a speed of 40 mph for 3 hours, it will be back at it starting position (Figure 5.21). Again, using integral notation, we have

$$\begin{array}{cl}
{{\int_{0}^{2}{60dt}} + {\int_{2}^{5}{-40dt}}} & {= 120 - 120} \\
 & {= 0.}
\end{array}$$

In this case the displacement is zero.

*Figure 5.21* The area above the axis and the area below the axis are equal, so the net signed area is zero. (Alt: A graph in quadrants one and four with the x-axis labeled as t (hours) and the y axis labeled as v (mi/hr). The first part of the graph is the line v(t) = 60 over [0,2], and the area under the line in quadrant one is shaded. The second part of the graph is the line v(t) = -40 over [2,5], and the area above the line in quadrant four is shaded.)

Suppose we want to know how far the car travels overall, regardless of direction. In this case, we want to know the area between the curve and the *x*-axis, regardless of whether that area is above or below the axis. This is called the total area.

Graphically, it is easiest to think of calculating total area by adding the areas above the axis and the areas below the axis (rather than subtracting the areas below the axis, as we did with net signed area). To accomplish this mathematically, we use the absolute value function. Thus, the total distance traveled by the car is

$$\begin{array}{cl}
{{\int_{0}^{2}{|60|dt}} + {\int_{2}^{5}{|-40|dt}}} & {= {\int_{0}^{2}{60dt}} + {\int_{2}^{5}{40dt}}} \\
 & {= 120 + 120} \\
 & {= 240.}
\end{array}$$

Bringing these ideas together formally, we state the following definitions.

### Definition

Let $f(x)$ be an integrable function defined on an interval $\left\lbrack {a,b} \right\rbrack.$ Let *A*~1~ represent the area between $f(x)$ and the *x*-axis that lies *above* the axis and let *A*~2~ represent the area between $f(x)$ and the *x*-axis that lies *below* the axis. Then, the **net signed area** between $f(x)$ and the *x*-axis is given by

$${\int_{a}^{b}{f(x)dx}} = A_{1} - A_{2}.$$

The **total area** between $f(x)$ and the *x*-axis is given by

$$\int_{a}^{b}\left| {f(x)} \right|dx = A_{1} + A_{2}.$$

### Example  5.10

#### Finding the Total Area

Find the total area between $f(x) = x - 2$ and the *x*-axis over the interval $\left\lbrack {0,6} \right\rbrack.$

#### Solution

Calculate the *x*-intercept as $\left( {2,0} \right)$ (set $y = 0,$ solve for *x*). To find the total area, take the area below the *x*-axis over the subinterval $\left\lbrack {0,2} \right\rbrack$ and add it to the area above the *x*-axis on the subinterval $\left\lbrack {2,6} \right\rbrack$ (Figure 5.22).

*Figure 5.22* The total area between the line and the x-axis over [0, 6] is A 2 plus A 1 . (Alt: A graph of a increasing line f(x) = x-2 going through the points (-2,-4), (0,2), (2,0), (4,2), and (6,4). The area under the line in quadrant one and to the left of the line x=6 is shaded and labeled A1. The area above the line in quadrant four is shaded and labeled A2.)

We have

$${\int_{0}^{6}{\left| \left( {x - 2} \right) \right|dx}} = A_{2} + A_{1}.$$

Then, using the formula for the area of a triangle, we obtain

$$A_{2} = \frac{1}{2}bh = \frac{1}{2} \cdot 2 \cdot 2 = 2$$

$$A_{1} = \frac{1}{2}bh = \frac{1}{2} \cdot 4 \cdot 4 = 8.$$

The total area, then, is

$$A_{1} + A_{2} = 8 + 2 = 10.$$

### Checkpoint 5.10

Find the total area between the function $f(x) = 2x$ and the *x*-axis over the interval $\left\lbrack {-3,3} \right\rbrack.$

### Properties of the Definite Integral

The properties of indefinite integrals apply to definite integrals as well. Definite integrals also have properties that relate to the limits of integration. These properties, along with the rules of integration that we examine later in this chapter, help us manipulate expressions to evaluate definite integrals.

### Rule: Properties of the Definite Integral

1.  \

    ::::
    $$\int_{a}^{a}{f(x)dx = 0}$$

    ::: os-equation-number
    (5.9)
    :::
    ::::

    \
    If the limits of integration are the same, the integral is just a line and contains no area.
2.  \

    ::::
    $${\int_{b}^{a}{f(x)dx}} = \text{−}{\int_{a}^{b}{f(x)dx}}$$

    ::: os-equation-number
    (5.10)
    :::
    ::::

    \
    If the limits are reversed, then place a negative sign in front of the integral.
3.  \

    ::::
    $${\int_{a}^{b}{\left\lbrack {f(x) + g(x)} \right\rbrack dx}} = {\int_{a}^{b}{f(x)dx}} + {\int_{a}^{b}{g(x)dx}}$$

    ::: os-equation-number
    (5.11)
    :::
    ::::

    \
    The integral of a sum is the sum of the integrals.
4.  \

    ::::
    $$\int_{a}^{b}{\left\lbrack {f(x) - g(x)} \right\rbrack dx = {\int_{a}^{b}{f(x)dx - {\int_{a}^{b}{g(x)dx}}}}}$$

    ::: os-equation-number
    (5.12)
    :::
    ::::

    \
    The integral of a difference is the difference of the integrals.
5.  \

    ::::
    $${\int_{a}^{b}{cf(x)dx}} = c{\int_{a}^{b}{f{(x)dx}}}$$

    ::: os-equation-number
    (5.13)
    :::
    ::::

    \
    for constant *c*. The integral of the product of a constant and a function is equal to the constant multiplied by the integral of the function.
6.  \

    ::::
    $${\int_{a}^{b}{f(x)dx}} = {\int_{a}^{c}{f(x)dx}} + {\int_{c}^{b}{f(x)dx}}$$

    ::: os-equation-number
    (5.14)
    :::
    ::::

    \
    Although this formula normally applies when *c* is between *a* and *b*, the formula holds for all values of *a*, *b*, and *c*, provided $f(x)$ is integrable on the largest interval.

### Example  5.11

#### Using the Properties of the Definite Integral

Use the properties of the definite integral to express the definite integral of $f(x) = -3x^{3} + 2x + 2$ over the interval $\left\lbrack {-2,1} \right\rbrack$ as the sum of three definite integrals.

#### Solution

Using integral notation, we have ${\int_{-2}^{1}{\left( {-3x^{3} + 2x + 2} \right)dx}}.$ We apply properties 3. and 5. to get

$$\begin{array}{cl}
{\int_{-2}^{1}{\left( {-3x^{3} + 2x + 2} \right)dx}} & {= {\int_{-2}^{1}{-3x^{3}dx}} + {\int_{-2}^{1}{2xdx}} + {\int_{-2}^{1}{2dx}}} \\
 & {= -3{\int_{-2}^{1}{x^{3}dx}} + 2{\int_{-2}^{1}{xdx}} + {\int_{-2}^{1}{2dx}}.}
\end{array}$$

### Checkpoint 5.11

Use the properties of the definite integral to express the definite integral of $f(x) = 6x^{3} - 4x^{2} + 2x - 3$ over the interval $\left\lbrack {1,3} \right\rbrack$ as the sum of four definite integrals.

### Example  5.12

#### Using the Properties of the Definite Integral

If it is known that ${\int_{0}^{8}{f(x)dx}} = 10$ and ${\int_{0}^{5}{f(x)dx}} = 5,$ find the value of ${\int_{5}^{8}{f(x)dx}}.$

#### Solution

By property 6.,

$${\int_{a}^{b}{f(x)dx}} = {\int_{a}^{c}{f(x)dx}} + {\int_{c}^{b}{f(x)dx}}.$$

Thus,

$$\begin{array}{cll}
{\int_{0}^{8}{f(x)dx}} & = & {{\int_{0}^{5}{f(x)dx}} + {\int_{5}^{8}{f(x)dx}}} \\
10 & = & {5 + {\int_{5}^{8}{f(x)dx}}} \\
5 & = & {{\int_{5}^{8}{f(x)dx}}.}
\end{array}$$

### Checkpoint 5.12

If it is known that ${\int_{1}^{5}{f(x)dx}} = -3$ and ${\int_{2}^{5}{f(x)dx}} = 4,$ find the value of ${\int_{1}^{2}{f(x)dx}}.$

#### Comparison Properties of Integrals

A picture can sometimes tell us more about a function than the results of computations. Comparing functions by their graphs as well as by their algebraic expressions can often give new insight into the process of integration. Intuitively, we might say that if a function $f(x)$ is above another function $g(x),$ then the area between $f(x)$ and the *x*-axis is greater than the area between $g(x)$ and the *x*-axis. This is true depending on the interval over which the comparison is made. The properties of definite integrals are valid whether $a < b,a = b,$ or $a > b.$ The following properties, however, concern only the case $a \leq b,$ and are used when we want to compare the sizes of integrals.

### Theorem 5.2

#### Comparison Theorem

i.  If $f(x) \geq 0$ for $a \leq x \leq b,$ then\

    :::
    $${\int_{a}^{b}{f(x)dx}} \geq 0.$$
    :::
ii. If $f(x) \geq g(x)$ for $a \leq x \leq b,$ then\

    :::
    $${\int_{a}^{b}{f(x)dx}} \geq {\int_{a}^{b}{g(x)dx}}.$$
    :::
iii. If *m* and *M* are constants such that $m \leq f(x) \leq M$ for $a \leq x \leq b,$ then\

     :::
     $$\begin{array}{cl}
     {m\left( {b - a} \right)} & {\leq {\int_{a}^{b}{f(x)dx}}} \\
      & {\leq M\left( {b - a} \right).}
     \end{array}$$
     :::

### Example  5.13

#### Comparing Two Functions over a Given Interval

Compare $f(x) = \sqrt{1 + x^{2}}$ and $g(x) = \sqrt{1 + x}$ over the interval $\left\lbrack {0,1} \right\rbrack.$

#### Solution

Graphing these functions is necessary to understand how they compare over the interval $\left\lbrack {0,1} \right\rbrack.$ Initially, when graphed on a graphing calculator, $f(x)$ appears to be above $g(x)$ everywhere. However, on the interval $\left\lbrack {0,1} \right\rbrack,$ the graphs appear to be on top of each other. We need to zoom in to see that, on the interval $\left\lbrack {0,1} \right\rbrack,g(x)$ is above $f(x).$ The two functions intersect at $x = 0$ and $x = 1$ (Figure 5.23).

*Figure 5.23* (a) The function f ( x ) appears above the function g ( x ) except over the interval [0, 1] (b) Viewing the same graph with a greater zoom shows this more clearly. (Alt: A graph of the function f(x) = sqrt(1 + x^2) in red and g(x) = sqrt(1 + x) in blue over [-2, 3]. The function f(x) appears above g(x) except over the interval [0,1]. A second, zoomed-in graph shows this interval more clearly.)

We can see from the graph that over the interval $\left\lbrack {0,1} \right\rbrack,g(x) \geq f(x).$ Comparing the integrals over the specified interval $\left\lbrack {0,1} \right\rbrack,$ we also see that ${\int_{0}^{1}{g(x)dx}} \geq {\int_{0}^{1}{f(x)dx}}$ (Figure 5.24). The thin, red-shaded area shows just how much difference there is between these two integrals over the interval $\left\lbrack {0,1} \right\rbrack.$

*Figure 5.24* (a) The graph shows that over the interval [0, 1], g ( x ) ≥ f ( x ), where equality holds only at the endpoints of the interval. (b) Viewing the same graph with a greater zoom shows this more clearly. (Alt: A graph showing the functions f(x) = sqrt(1 + x^2) and g(x) = sqrt(1 + x) over [-3, 3]. The area under g(x) in quadrant one over [0,1] is shaded. The area under g(x) and f(x) is included in this shaded area. The second, zoomed-in graph shows more clearly that equality between the functions only holds at the endpoints.)

### Average Value of a Function

We often need to find the average of a set of numbers, such as an average test grade. Suppose you received the following test scores in your algebra class: 89, 90, 56, 78, 100, and 69. Your semester grade is your average of test scores and you want to know what grade to expect. We can find the average by adding all the scores and dividing by the number of scores. In this case, there are six test scores. Thus,

$$\frac{89 + 90 + 56 + 78 + 100 + 69}{6} = \frac{482}{6} \approx 80.33.$$

Therefore, your average test grade is approximately 80.33, which translates to a B− at most schools.

Suppose, however, that we have a function $v(t)$ that gives us the speed of an object at any time *t*, and we want to find the object's average speed. The function $v(t)$ takes on an infinite number of values, so we can't use the process just described. Fortunately, we can use a definite integral to find the average value of a function such as this.

Let $f(x)$ be continuous over the interval $\left\lbrack {a,b} \right\rbrack$ and let $\left\lbrack {a,b} \right\rbrack$ be divided into *n* subintervals of width $\text{Δ}x = {{(b - a)}\text{/}{n.}}$ Choose a representative $x_{i}^{*}$ in each subinterval and calculate $f\left( x_{i}^{*} \right)$ for $i = 1,2\text{,…,}\ n.$ In other words, consider each $f\left( x_{i}^{*} \right)$ as a sampling of the function over each subinterval. The average value of the function may then be approximated as

$$\frac{f\left( x_{1}^{*} \right) + f\left( x_{2}^{*} \right) + \text{⋯} + f\left( x_{n}^{*} \right)}{n},$$

which is basically the same expression used to calculate the average of discrete values.

But we know $\text{Δ}x = \frac{b - a}{n},$ so $n = \frac{b - a}{\text{Δ}x},$ and we get

$$\frac{f\left( x_{1}^{*} \right) + f\left( x_{2}^{*} \right) + \text{⋯} + f\left( x_{n}^{*} \right)}{n} = \frac{f\left( x_{1}^{*} \right) + f\left( x_{2}^{*} \right) + \text{⋯} + f\left( x_{n}^{*} \right)}{\frac{\left( {b - a} \right)}{\text{Δ}x}}.$$

Following through with the algebra, the numerator is a sum that is represented as ${\sum\limits_{i = 1}^{n}{f\left( x_{i}^{*} \right)}},$ and we are dividing by a fraction. To divide by a fraction, invert the denominator and multiply. Thus, an approximate value for the average value of the function is given by

$$\begin{array}{cl}
\frac{\sum\limits_{i = 1}^{n}{f\left( x_{i}^{*} \right)}}{\frac{\left( {b - a} \right)}{\text{Δ}x}} & {= \left( \frac{\text{Δ}x}{b - a} \right){\sum\limits_{i = 1}^{n}{f\left( x_{i}^{*} \right)}}} \\
 & \\
 & {= \left( \frac{1}{b - a} \right){\sum\limits_{i = 1}^{n}{f\left( x_{i}^{*} \right)\text{Δ}x}}.}
\end{array}$$

This is a Riemann sum. Then, to get the *exact* average value, take the limit as *n* goes to infinity. Thus, the average value of a function is given by

$$\frac{1}{b - a}\underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{f\left( x_{i} \right)\text{Δ}x}} = \frac{1}{b - a}{\int_{a}^{b}{f(x)dx}}.$$

### Definition

Let $f(x)$ be continuous over the interval $\left\lbrack {a,b} \right\rbrack.$ Then, the average value of the function $f(x)$ (or *f*~ave~) on $\left\lbrack {a,b} \right\rbrack$ is given by

$$f_{\text{ave}} = \frac{1}{b - a}{\int_{a}^{b}{f(x)dx}}.$$

### Example  5.14

#### Finding the Average Value of a Linear Function

Find the average value of $f(x) = x + 1$ over the interval $\left\lbrack {0,5} \right\rbrack.$

#### Solution

First, graph the function on the stated interval, as shown in Figure 5.25.

*Figure 5.25* The graph shows the area under the function f ( x ) = x + 1 over [0, 5]. (Alt: A graph in quadrant one showing the shaded area under the function f(x) = x + 1 over [0,5].)

The region is a trapezoid lying on its side, so we can use the area formula for a trapezoid $A = \frac{1}{2}h\left( {a + b} \right),$ where *h* represents height, and *a* and *b* represent the two parallel sides. Then,

$$\begin{array}{cl}
{{\int_{0}^{5}x} + 1dx} & {= \frac{1}{2}h\left( {a + b} \right)} \\
 & {= \frac{1}{2} \cdot 5 \cdot \left( {1 + 6} \right)} \\
 & {= \frac{35}{2}.}
\end{array}$$

Thus the average value of the function is

$$\frac{1}{5 - 0}{\int_{0}^{5}x} + 1dx = \frac{1}{5} \cdot \frac{35}{2} = \frac{7}{2}.$$

### Checkpoint 5.13

Find the average value of $f(x) = 6 - 2x$ over the interval $\left\lbrack {0,3} \right\rbrack.$

### Section 5.2 Exercises

In the following exercises, express the limits as integrals.

$\underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{\left( x_{i}^{*} \right)\text{Δ}x}}$ over $\left\lbrack {1,3} \right\rbrack$

61.

$\underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{\left( {5\left( x_{i}^{*} \right)^{2} - 3\left( x_{i}^{*} \right)^{3}} \right)\text{Δ}x}}$ over $\left\lbrack {0,2} \right\rbrack$

$\underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{\text{sin}^{2}\left( {2\pi x_{i}^{*}} \right)\text{Δ}x}}$ over $\left\lbrack {0,1} \right\rbrack$

63.

$\underset{n\rightarrow\infty}{\text{lim}}{\sum\limits_{i = 1}^{n}{\text{cos}^{2}\left( {2\pi x_{i}^{*}} \right)\text{Δ}x}}$ over $\left\lbrack {0,1} \right\rbrack$

In the following exercises, given *L~n~* or *R~n~* as indicated, express their limits as $n\rightarrow\infty$ as definite integrals, identifying the correct intervals.

$L_{n} = \frac{1}{n}{\sum\limits_{i = 1}^{n}\frac{i - 1}{n}}$

65.

$R_{n} = \frac{1}{n}{\sum\limits_{i = 1}^{n}\frac{i}{n}}$

$L_{n} = \frac{2}{n}{\sum\limits_{i = 1}^{n}\left( {1 + 2\frac{i - 1}{n}} \right)}$

67.

$R_{n} = \frac{3}{n}{\sum\limits_{i = 1}^{n}\left( {3 + 3\frac{i}{n}} \right)}$

$L_{n} = \frac{2\pi}{n}{\sum\limits_{i = 1}^{n}{2\pi\frac{i - 1}{n}\text{cos}\left( {2\pi\frac{i - 1}{n}} \right)}}$

69.

$R_{n} = \frac{1}{n}{\sum\limits_{i = 1}^{n}{\left( {1 + \frac{i}{n}} \right)\text{log}\left( \left( {1 + \frac{i}{n}} \right)^{2} \right)}}$

In the following exercises, evaluate the integrals of the functions graphed using the formulas for areas of triangles and circles, and subtracting the areas below the *x*-axis.

![A graph containing the upper half of three circles on the x axis. The first has center at (1,0) and radius one. It corresponds to the function sqrt(2x -- x\^2) over \[0,2\]. The second has center at (4,0) and radius two. It corresponds to the function sqrt(-12 + 8x -- x\^2) over \[2,6\]. The last has center at (9,0) and radius three. It corresponds to the function sqrt(-72 + 18x -- x\^2) over \[6,12\]. All three semi circles are shaded -- the area under the curve and above the x axis.](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/17bb01a52d1a454faa2f538de2cf5e4bf7edae22)

71.

![A graph of three isosceles triangles corresponding to the functions 1 - \|x-1\| over \[0,2\], 2 - \|x-4\| over \[2,4\], and 3 - \|x-9\| over \[6,12\]. The first triangle has endpoints at (0,0), (2,0), and (1,1). The second triangle has endpoints at (2,0), (6,0), and (4,2). The last has endpoints at (6,0), (12,0), and (9,3). All three are shaded.](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/26aaa7baaaacad4d9d7e9ee988cf134f860613f6)

![A graph with three parts. The first is the upper half of a circle with center at (1, 0) and radius 1, which corresponds to the function sqrt(2x -- x\^2) over \[0,2\]. The second is a triangle with endpoints at (2, 0), (6, 0), and (4, -2), which corresponds to the function \|x-4\| - 2 over \[2, 6\]. The last is the upper half of a circle with center at (9, 0) and radius 3, which corresponds to the function sqrt(-72 + 18x -- x\^2) over \[6,12\]. All three are shaded.](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/0c003905e237449cca9303ce2e0e2abb097e04dc)

73.

![A graph of three shaded triangles. The first has endpoints at (0, 0), (2, 0), and (1, 1) and corresponds to the function 1 - \|x-1\| over \[0, 2\]. The second has endpoints at (2, 0), (6, 0), and (4, -2) and corresponds to the function \|x-4\| - 2 over \[2, 6\]. The third has endpoints at (6, 0), (12, 0), and (9, 3) and corresponds to the function 3 - \|x-9\| over \[6, 12\].](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/955b3f280636b9b3eec7dc84f84f8e1639834a94)

![A graph with three shaded parts. The first is the upper half of a circle with center at (1, 0) and radius one. It corresponds to the function sqrt(2x -- x\^2) over \[0, 2\]. The second is the lower half of a circle with center at (4, 0) and radius two, which corresponds to the function -sqrt(-12 + 8x -- x\^2) over \[2, 6\]. The last is the upper half of a circle with center at (9, 0) and radius three. It corresponds to the function sqrt(-72 + 18x -- x\^2) over \[6, 12\].](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/c3d07b1b42b6444204d5fb881f5d5c6843b775b0)

75.

![A graph with three shaded parts. The first is a triangle with endpoints at (0, 0), (2, 0), and (1, 1), which corresponds to the function 1 - \|x-1\| over \[0, 2\] in quadrant 1. The second is the lower half of a circle with center at (4, 0) and radius two, which corresponds to the function --sqrt(-12 + 8x -- x\^2) over \[2, 6\]. The last is a triangle with endpoints at (6, 0), (12, 0), and (9, 3), which corresponds to the function 3 - \|x-9\| over \[6, 12\].](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/42515305a7d5eb75beff71a7967c021f87741d45)

In the following exercises, evaluate the integral using area formulas.

$\int_{0}^{3}{\left( {3 - x} \right)dx}$

77.

$\int_{2}^{3}{\left( {3 - x} \right)dx}$

$\int_{-3}^{3}{\left( {3 - |x|} \right)dx}$

79.

$\int_{0}^{6}{\left( {3 - \left| {x - 3} \right|} \right)dx}$

$\int_{-2}^{2}{\sqrt{4 - x^{2}}dx}$

81.

$\int_{1}^{5}{\sqrt{4 - \left( {x - 3} \right)^{2}}dx}$

$\int_{0}^{12}{\sqrt{36 - \left( {x - 6} \right)^{2}}dx}$

83.

$\int_{-2}^{3}{\left( {3 - |x|} \right)dx}$

In the following exercises, use averages of values at the left (*L*) and right (*R*) endpoints to compute the integrals of the piecewise linear functions with graphs that pass through the given list of points over the indicated intervals.

$\left\{ {\left( {0,0} \right),\left( {2,1} \right),\left( {4,3} \right),\left( {5,0} \right),\left( {6,0} \right),\left( {8,3} \right)} \right\}$ over $\left\lbrack {0,8} \right\rbrack$

85.

$\left\{ {\left( {0,2} \right),\left( {1,0} \right),\left( {3,5} \right),\left( {5,5} \right),\left( {6,2} \right),\left( {8,0} \right)} \right\}$ over $\left\lbrack {0,8} \right\rbrack$

$\left\{ {\left( {-4,-4} \right),\left( {-2,0} \right),\left( {0,-2} \right),\left( {3,3} \right),\left( {4,3} \right)} \right\}$ over $\left\lbrack {-4,4} \right\rbrack$

87.

$\left\{ {\left( {-4,0} \right),\left( {-2,2} \right),\left( {0,0} \right),\left( {1,2} \right),\left( {3,2} \right),\left( {4,0} \right)} \right\}$ over $\left\lbrack {-4,4} \right\rbrack$

Suppose that ${\int_{0}^{4}{f(x)dx}} = 5$ and ${\int_{0}^{2}{f(x)dx}} = -3,$ and ${\int_{0}^{4}{g(x)dx}} = -1$ and ${\int_{0}^{2}{g(x)dx}} = 2.$ In the following exercises, compute the integrals.

$\int_{0}^{4}{\left( {f(x) + g(x)} \right)dx}$

89.

$\int_{2}^{4}{\left( {f(x) + g(x)} \right)dx}$

$\int_{0}^{2}{\left( {f(x) - g(x)} \right)dx}$

91.

$\int_{2}^{4}{\left( {f(x) - g(x)} \right)dx}$

$\int_{0}^{2}{\left( {3f(x) - 4g(x)} \right)dx}$

93.

$\int_{2}^{4}{\left( {4f(x) - 3g(x)} \right)dx}$

In the following exercises, use the identity ${\int_{\text{−}A}^{A}{f(x)dx}} = {\int_{\text{−}A}^{0}{f(x)dx}} + {\int_{0}^{A}{f(x)dx}}$ to compute the integrals.

$\int_{\text{−}\pi}^{\pi}{\frac{\text{sin}\mspace{2mu} t}{1 + t^{2}}dt}$ $\text{(}Hint\text{:}\ \text{sin}\left( {\text{−}t} \right) = \text{−}\text{sin}{(t)\text{)}}$

95.

$\int_{\text{−}\sqrt{\pi}}^{\sqrt{\pi}}{\frac{t}{1 + \text{cos}\mspace{2mu} t}dt}$

In the following exercises, find the net signed area between $f(x)$ and the x-axis.

$\int_{1}^{3}{\left( {2 - x} \right)dx}$ (*Hint:* Look at the graph of *f*.)

97.

$\int_{2}^{4}{\left( {x - 3} \right)^{3}dx}$ (*Hint:* Look at the graph of *f*.)

In the following exercises, given that ${\int_{0}^{1}{xdx}} = \frac{1}{2},{\int_{0}^{1}{x^{2}dx}} = \frac{1}{3},$ and ${\int_{0}^{1}{x^{3}dx}} = \frac{1}{4},$ compute the integrals.

$\int_{0}^{1}{\left( {1 + x + x^{2} + x^{3}} \right)dx}$

99.

$\int_{0}^{1}{\left( {1 - x + x^{2} - x^{3}} \right)dx}$

$\int_{0}^{1}{\left( {1 - x} \right)^{2}dx}$

101.

$\int_{0}^{1}{\left( {1 - 2x} \right)^{3}dx}$

$\int_{0}^{1}{\left( {6x - \frac{4}{3}x^{2}} \right)dx}$

103.

$\int_{0}^{1}{\left( {7 - 5x^{3}} \right)dx}$

In the following exercises, use the comparison theorem.

Show that ${\int_{0}^{3}{\left( {x^{2} - 6x + 9} \right)dx}} \geq 0.$

105.

Show that ${\int_{-2}^{3}{\left( {x - 3} \right)\left( {x + 2} \right)dx}} \leq 0.$

Show that ${\int_{0}^{1}{\sqrt{1 + x^{3}}dx}} \leq {\int_{0}^{1}{\sqrt{1 + x^{2}}dx}}.$

107.

Show that ${\int_{1}^{2}{\sqrt{1 + x}dx}} \leq {\int_{1}^{2}{\sqrt{1 + x^{2}}dx}}.$

Show that ${\int_{0}^{\pi\text{/}2}{\text{sin}\mspace{2mu} tdt}} \geq \frac{\pi}{4}.$ $\text{(}Hint\text{:}\ \text{sin}\mspace{2mu} t \geq \frac{2t}{\pi}$ over $\left\lbrack {0,\frac{\pi}{2}} \right\rbrack\text{)}$

109.

Show that ${\int_{\text{−}\pi\text{/}4}^{\pi\text{/}4}{\text{cos}\mspace{2mu} tdt}} \geq \pi\sqrt{2}\text{/}4.$

In the following exercises, find the average value *f*~ave~ of *f* between *a* and *b*, and find a point *c*, where $f(c) = f_{\text{ave}}.$

$f(x) = x^{2},a = -1,b = 1$

111.

$f(x) = x^{5},a = -1,b = 1$

$f(x) = \sqrt{4 - x^{2}},a = 0,b = 2$

113.

$f(x) = \left( {3 - |x|} \right),a = -3,b = 3$

$f(x) = \text{sin}\mspace{2mu} x,a = 0,b = 2\pi$

115.

$f(x) = \text{cos}\mspace{2mu} x,a = 0,b = 2\pi$

In the following exercises, approximate the average value using Riemann sums *L*~100~ and *R*~100~. How does your answer compare with the exact given answer?

**\[T\]** $y = \text{ln}(x)$ over the interval $\left\lbrack {1,4} \right\rbrack;$ the exact solution is $\frac{\text{ln}(256)}{3} - 3.$

117.

**\[T\]** $y = e^{x\text{/}2}$ over the interval $\left\lbrack {0,1} \right\rbrack;$ the exact solution is $2\left( {\sqrt{e} - 1} \right).$

**\[T\]** $y = \text{tan}\mspace{2mu} x$ over the interval $\left\lbrack {0,\frac{\pi}{4}} \right\rbrack;$ the exact solution is $\frac{2\mspace{2mu}\text{ln}(2)}{\pi}.$

119.

**\[T\]** $y = \frac{x + 1}{\sqrt{4 - x^{2}}}$ over the interval $\left\lbrack {-1,1} \right\rbrack;$ the exact solution is $\frac{\pi}{6}.$

In the following exercises, compute the average value using the left Riemann sums *L~N~* for $N = 1,10,100.$ How does the accuracy compare with the given exact value?

**\[T\]** $y = x^{2} - 4$ over the interval $\left\lbrack {0,2} \right\rbrack;$ the exact solution is $- \frac{8}{3}.$

121.

**\[T\]** $y = xe^{x^{2}}$ over the interval $\left\lbrack {0,2} \right\rbrack;$ the exact solution is $\frac{1}{4}\left( {e^{4} - 1} \right).$

**\[T\]** $y = \left( \frac{1}{2} \right)^{x}$ over the interval $\left\lbrack {0,4} \right\rbrack;$ the exact solution is $\frac{15}{64\mspace{2mu}\text{ln}(2)}.$

123.

**\[T\]** $y = x\mspace{2mu}\text{sin}\left( x^{2} \right)$ over the interval $\left\lbrack {\text{−}\pi,0} \right\rbrack;$ the exact solution is $\frac{\text{cos}\left( \pi^{2} \right) - 1}{2\pi}.$

Suppose that $A = {\int_{0}^{2\pi}{\text{sin}^{2}tdt}}$ and $B = {\int_{0}^{2\pi}{\text{cos}^{2}tdt}}.$ Show that $A + B = 2\pi$ and $A = B\text{.}$

125.

Suppose that $A = {\int_{\text{−}\pi\text{/}4}^{\pi\text{/}4}{\text{sec}^{2}tdt}} = \pi$ and $B = {\int_{\text{−}\pi\text{/}4}^{\pi\text{/}4}{\text{tan}^{2}tdt}}.$ Show that $A - B = \frac{\pi}{2}.$

Show that the average value of $\text{sin}^{2}t$ over $\left\lbrack {0,2\pi} \right\rbrack$ is equal to 1/2 Without further calculation, determine whether the average value of $\text{sin}^{2}t$ over $\left\lbrack {0,\pi} \right\rbrack$ is also equal to 1/2.

127.

Show that the average value of $\text{cos}^{2}t$ over $\left\lbrack {0,2\pi} \right\rbrack$ is equal to $1\text{/}2.$ Without further calculation, determine whether the average value of $\text{cos}^{2}(t)$ over $\left\lbrack {0,\pi} \right\rbrack$ is also equal to $1\text{/}2.$

Explain why the graphs of a quadratic function (parabola) $p(x)$ and a linear function $\ell(x)$ can intersect in at most two points. Suppose that $p(a) = \ell(a)$ and $p(b) = \ell(b),$ and that ${\int_{a}^{b}{p(t)dt}} > {\int_{a}^{b}{\ell(t)dt}}.$ Explain why ${\int_{c}^{d}{p(t)}} > {\int_{c}^{d}{\ell(t)dt}}$ whenever $a \leq c < d \leq b.$

129.

Suppose that parabola $p(x) = ax^{2} + bx + c$ opens downward $(a < 0)$ and has a vertex of $y = \frac{\text{−}b}{2a} > 0.$ For which interval $\left\lbrack {A,B} \right\rbrack$ is $\int_{A}^{B}{\left( {ax^{2} + bx + c} \right)dx}$ as large as possible?

Suppose $\left\lbrack {a,b} \right\rbrack$ can be subdivided into subintervals $a = a_{0} < a_{1} < a_{2} < \text{⋯} < a_{N} = b$ such that either $f \geq 0$ over $\left\lbrack {a_{i - 1},a_{i}} \right\rbrack$ or $f \leq 0$ over $\left\lbrack {a_{i - 1},a_{i}} \right\rbrack.$ Set $A_{i} = {\int_{a_{i - 1}}^{a_{i}}{f(t)dt}}.$

a.  Explain why ${\int_{a}^{b}{f(t)dt}} = A_{1} + A_{2} + \text{⋯} + A_{N}.$
b.  Then, explain why $\left| {\int_{a}^{b}{f(t)dt}} \right| \leq {\int_{a}^{b}{\left| {f(t)} \right|dt}}.$

131.

Suppose *f* and *g* are continuous functions such that ${\int_{c}^{d}{f(t)dt}} \leq {\int_{c}^{d}{g(t)dt}}$ for every subinterval $\left\lbrack {c,d} \right\rbrack$ of $\left\lbrack {a,b} \right\rbrack.$ Explain why $f(x) \leq g(x)$ for all values of *x*.

Suppose the average value of *f* over $\left\lbrack {a,b} \right\rbrack$ is 1 and the average value of *f* over $\left\lbrack {b,c} \right\rbrack$ is 1 where $a < c < b.$ Show that the average value of *f* over $\left\lbrack {a,c} \right\rbrack$ is also 1.

133.

Suppose that $\left\lbrack {a,b} \right\rbrack$ can be partitioned. taking $a = a_{0} < a_{1} < \text{⋯} < a_{N} = b$ such that the average value of *f* over each subinterval $\left\lbrack {a_{i - 1},a_{i}} \right\rbrack = 1$ is equal to 1 for each $i = 1\text{,…,}\ N.$ Explain why the average value of *f* over $\left\lbrack {a,b} \right\rbrack$ is also equal to 1.

Suppose that for each *i* such that $1 \leq i \leq N$ one has ${\int_{i - 1}^{i}{f(t)dt}} = i.$ Show that ${\int_{0}^{N}{f(t)dt}} = \frac{N\left( {N + 1} \right)}{2}.$

135.

Suppose that for each *i* such that $1 \leq i \leq N$ one has ${\int_{i - 1}^{i}{f(t)dt}} = i^{2}.$ Show that ${\int_{0}^{N}{f(t)dt}} = \frac{N\left( {N + 1} \right)\left( {2N + 1} \right)}{6}.$

**\[T\]** Compute the left and right Riemann sums *L*~10~ and *R*~10~ and their average $\frac{L_{10} + R_{10}}{2}$ for $f(t) = t^{2}$ over $\left\lbrack {0,1} \right\rbrack.$ Given that ${\int_{0}^{1}{t^{2}dt}} = 0.\overset{–}{33},$ to how many decimal places is $\frac{L_{10} + R_{10}}{2}$ accurate?

137.

**\[T\]** Compute the left and right Riemann sums, *L*~10~ and *R*~10~, and their average $\frac{L_{10} + R_{10}}{2}$ for $f(t) = \left( {4 - t^{2}} \right)$ over $\left\lbrack {1,2} \right\rbrack.$ Given that ${\int_{1}^{2}{\left( {4 - t^{2}} \right)dt}} = 1.\overset{–}{66},$ to how many decimal places is $\frac{L_{10} + R_{10}}{2}$ accurate?

If ${\int_{1}^{5}{\sqrt{1 + t^{4}}dt}} = 41.7133...,$ what is ${\int_{1}^{5}{\sqrt{1 + u^{4}}du}}?$

139.

Estimate $\int_{0}^{1}{tdt}$ using the left and right endpoint sums, each with a single rectangle. How does the average of these left and right endpoint sums compare with the actual value ${\int_{0}^{1}{tdt}}?$

Estimate $\int_{0}^{1}{tdt}$ by comparison with the area of a single rectangle with height equal to the value of *t* at the midpoint $t = \frac{1}{2}.$ How does this midpoint estimate compare with the actual value ${\int_{0}^{1}{tdt}}?$

141.

From the graph of $\text{sin}\left( {2\pi x} \right)$ shown:

a.  Explain why ${\int_{0}^{1}{\text{sin}\left( {2\pi t} \right)dt}} = 0.$
b.  Explain why, in general, ${\int_{a}^{a + 1}{\text{sin}\left( {2\pi t} \right)dt}} = 0$ for any value of *a*.\

    ![A graph of the function f(x) = sin(2pi\*x) over \[0, 2\]. The function is shaded over \[.7, 1\] above the curve and below to x axis, over \[1,1.5\] under the curve and above the x axis, and over \[1.5, 1.7\] above the curve and under the x axis. The graph is antisymmetric with respect o t = ½ over \[0,1\].](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/1924c50523ef858ded0955ff101e46ed9d92fd14)

If *f* is 1-periodic $\left( f\left( {t + 1} \right) = f(t) \right),$ odd, and integrable over $\left\lbrack {0,1} \right\rbrack,$ is it always true that ${\int_{0}^{1}{f(t)dt}} = 0?$

143.

If *f* is 1-periodic and ${\int_{0}^{1}{f(t)dt}} = A,$ is it necessarily true that ${\int_{a}^{1 + a}{f(t)dt}} = A$ for all *A*?
