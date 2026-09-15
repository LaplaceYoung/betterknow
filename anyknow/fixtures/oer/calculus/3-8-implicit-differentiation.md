# 3.8 Implicit Differentiation

Title: 3.8 Implicit Differentiation
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/3-8-implicit-differentiation
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 3.8 Implicit Differentiation

### Learning Objectives

- 3.8.1 Find the derivative of a complicated function by using implicit differentiation.

- 3.8.2 Use implicit differentiation to determine the equation of a tangent line.

We have already studied how to find equations of tangent lines to functions and the rate of change of a function at a specific point. In all these cases we had the explicit equation for the function and differentiated these functions explicitly. Suppose instead that we want to determine the equation of a tangent line to an arbitrary curve or the rate of change of an arbitrary curve at a point. In this section, we solve these problems by finding the derivatives of functions that define $y$ implicitly in terms of $x.$

### Implicit Differentiation

In most discussions of math, if the dependent variable $y$ is a function of the independent variable $x,$ we express *y* in terms of $x.$ If this is the case, we say that $y$ is an explicit function of $x.$ For example, when we write the equation $y={x}^{2}+1,$ we are defining *y* explicitly in terms of $x.$ On the other hand, if the relationship between the function $y$ and the variable $x$ is expressed by an equation where $y$ is not expressed entirely in terms of $x,$ we say that the equation defines *y* implicitly in terms of $x.$ For example, the equation $y-{x}^{2}=1$ defines the function $y={x}^{2}+1$ implicitly.

Implicit differentiation allows us to find slopes of tangents to curves that are clearly not functions (they fail the vertical line test). We are using the idea that portions of $y$ are functions that satisfy the given equation, but that $y$ is not actually a function of $x.$

In general, an equation defines a function implicitly if the function satisfies that equation. An equation may define many different functions implicitly. For example, the functions

$y=\sqrt{25-{x}^{2}}, y=-\sqrt{25-{x}^{2}},$ and  which are illustrated in Figure 3.30, are just three of the many functions defined implicitly by the equation ${x}^{2}+{y}^{2}=25.$

*Figure 3.30 The equation ${x}^{2}+{y}^{2}=25$ defines many functions implicitly.* (Alt: The circle with radius 5 and center at the origin is graphed fully in one picture. Then, only its segments in quadrants I and II are graphed. Then, only its segments in quadrants III and IV are graphed. Lastly, only its segments in quadrants II and IV are graphed.)

If we want to find the slope of the line tangent to the graph of ${x}^{2}+{y}^{2}=25$ at the point $(3,4),$ we could evaluate the derivative of the function $y=\sqrt{25-{x}^{2}}$ at $x=3.$ On the other hand, if we want the slope of the tangent line at the point $(3,−4),$ we could use the derivative of $y=-\sqrt{25-{x}^{2}}.$ However, it is not always easy to solve for a function defined implicitly by an equation. Fortunately, the technique of implicit differentiation allows us to find the derivative of an implicitly defined function without ever solving for the function explicitly. The process of finding $\frac{dy}{dx}$ using implicit differentiation is described in the following problem-solving strategy.

### Problem-Solving Strategy

#### Implicit Differentiation

To perform implicit differentiation on an equation that defines a function $y$ implicitly in terms of a variable $x,$ use the following steps:

- Take the derivative of both sides of the equation. Keep in mind that *y* is a function of *x*. Consequently, whereas $\frac{d}{dx}(\sin x)=\cos x,\frac{d}{dx}(\sin y)=\cos y\frac{dy}{dx}$ because we must use the chain rule to differentiate $\sin y$ with respect to $x.$

- Rewrite the equation so that all terms containing $\frac{dy}{dx}$ are on the left and all terms that do not contain $\frac{dy}{dx}$ are on the right.

- Factor out $\frac{dy}{dx}$ on the left.

- Solve for $\frac{dy}{dx}$ by dividing both sides of the equation by an appropriate algebraic expression.

### Example 3.68

#### Using Implicit Differentiation

Assuming that $y$ is defined implicitly by the equation ${x}^{2}+{y}^{2}=25,$ find $\frac{dy}{dx}.$

#### Solution

Follow the steps in the problem-solving strategy.
$$\begin{matrix}\frac{d}{dx}({x}^{2}+{y}^{2}) & = & \frac{d}{dx}(25) & & & \text{Step 1. Differentiate both sides of the equation.} \\ \frac{d}{dx}({x}^{2})+\frac{d}{dx}({y}^{2}) & = & 0 & & & \begin{matrix}\text{Step 1.1. Use the sum rule on the left.} \\ \text{On the right} \frac{d}{dx}(25)=0.\end{matrix} \\ 2x+2y\frac{dy}{dx} & = & 0 & & & \begin{matrix}\text{Step 1.2. Take the derivatives, so} \frac{d}{dx}({x}^{2})=2x \\ \text{and} \frac{d}{dx}({y}^{2})=2y\frac{dy}{dx}.\end{matrix} \\ 2y\frac{dy}{dx} & = & −2x & & & \begin{matrix}\text{Step 2. Keep the terms with} \frac{dy}{dx} \text{on the left.} \\ \text{Move the remaining terms to the right.}\end{matrix} \\ \frac{dy}{dx} & = & -\frac{x}{y} & & & \begin{matrix}\text{Step 4. Divide both sides of the equation by} \\ 2y. \text{(Step 3 does not apply in this case.)}\end{matrix}\end{matrix}$$
#### Analysis

Note that the resulting expression for $\frac{dy}{dx}$ is in terms of both the independent variable $x$ and the dependent variable $y.$ Although in some cases it may be possible to express $\frac{dy}{dx}$ in terms of $x$ only, it is generally not possible to do so.

### Example 3.69

#### Using Implicit Differentiation and the Product Rule

Assuming that $y$ is defined implicitly by the equation ${x}^{3} \sin y+y=4x+3,$ find $\frac{dy}{dx}.$

#### Solution
$$\begin{matrix}\frac{d}{dx}({x}^{3}\sin y+y) & = & \frac{d}{dx}(4x+3) & & & \text{Step 1: Differentiate both sides of the equation.} \\ \frac{d}{dx}({x}^{3}\sin y)+\frac{d}{dx}(y) & = & 4 & & & \begin{matrix}\text{Step 1.1: Apply the sum rule on the left.} \\ \text{On the right,} \frac{d}{dx}(4x+3)=4.\end{matrix} \\ (\frac{d}{dx}({x}^{3})\cdot \sin y+\frac{d}{dx}(\sin y)\cdot {x}^{3})+\frac{dy}{dx} & = & 4 & & & \begin{matrix}\text{Step 1.2: Use the product rule to find} \\ \frac{d}{dx}({x}^{3}\sin y). \text{Observe that} \frac{d}{dx}(y)=\frac{dy}{dx}.\end{matrix} \\ 3{x}^{2}\sin y+(\cos y\frac{dy}{dx})\cdot {x}^{3}+\frac{dy}{dx} & = & 4 & & & \begin{matrix}\text{Step 1.3: We know} \frac{d}{dx}({x}^{3})=3{x}^{2}. \text{Use the} \\ \text{chain rule to obtain} \frac{d}{dx}(\sin y)=\cos y\frac{dy}{dx}.\end{matrix} \\ {\text{x}}^{3}\cos y\frac{dy}{dx}+\frac{dy}{dx} & = & 4-3{x}^{2}\sin y & & & \begin{matrix}\text{Step 2: Keep all terms containing} \frac{dy}{dx} \text{on the} \\ \text{left. Move all other terms to the right.}\end{matrix} \\ \frac{dy}{dx}({\text{x}}^{3}\cos y+1) & = & 4-3{x}^{2}\sin y & & & \text{Step 3: Factor out} \frac{dy}{dx} \text{on the left.} \\ \frac{dy}{dx} & = & \frac{4-3{x}^{2}\sin y}{{x}^{3}\cos y+1} & & & \begin{matrix}\text{Step 4: Solve for} \frac{dy}{dx} \text{by dividing both sides of} \\ \text{the equation by} {\text{x}}^{3}\cos y+1.\end{matrix}\end{matrix}$$
### Example 3.70

#### Using Implicit Differentiation to Find a Second Derivative

Find $\frac{{d}^{2}y}{d{x}^{2}}$ if ${x}^{2}+{y}^{2}=25.$

#### Solution

In Example 3.68, we showed that $\frac{dy}{dx}=-\frac{x}{y}.$ We can take the derivative of both sides of this equation to find $\frac{{d}^{2}y}{d{x}^{2}}.$
$$\begin{matrix}\frac{{d}^{2}y}{d{x}^{2}} & =\frac{d}{dx}(-\frac{x}{y}) & & & \text{Differentiate both sides of} \frac{dy}{dx}=-\frac{x}{y}. \\ & =-\frac{(1\cdot y-x\frac{dy}{dx})}{{y}^{2}} & & & \text{Use the quotient rule to find} \frac{d}{dy}(-\frac{x}{y}). \\ & =\frac{-y+x\frac{dy}{dx}}{{y}^{2}} & & & \text{Simplify.} \\ & =\frac{-y+x(-\frac{x}{y})}{{y}^{2}} & & & \text{Substitute} \frac{dy}{dx}=-\frac{x}{y}. \\ & =\frac{-{y}^{2}-{x}^{2}}{{y}^{3}} & & & \text{Simplify.}\end{matrix}$$
At this point we have found an expression for $\frac{{d}^{2}y}{d{x}^{2}}.$ If we choose, we can simplify the expression further by recalling that ${x}^{2}+{y}^{2}=25$ and making this substitution in the numerator to obtain $\frac{{d}^{2}y}{d{x}^{2}}=-\frac{25}{{y}^{3}}.$

### Checkpoint 3.48

Find $\frac{dy}{dx}$ for $y$ defined implicitly by the equation $4{x}^{5}+\tan y={y}^{2}+5x.$

### Finding Tangent Lines Implicitly

Now that we have seen the technique of implicit differentiation, we can apply it to the problem of finding equations of tangent lines to curves described by equations.

### Example 3.71

#### Finding a Tangent Line to a Circle

Find an equation of the line tangent to the curve ${x}^{2}+{y}^{2}=25$ at the point $(3,−4).$

#### Solution

Although we could find this equation without using implicit differentiation, using that method makes it much easier. In Example 3.68, we found $\frac{dy}{dx}=-\frac{x}{y}.$

The slope of the tangent line is found by substituting $(3,−4)$ into this expression. Consequently, the slope of the tangent line is $\frac{dy}{dx}|\begin{matrix} \\ {}_{(3,−4)}\end{matrix}=-\frac{3}{−4}=\frac{3}{4}.$

Using the point $(3,−4)$ and the slope $\frac{3}{4}$ in the point-slope equation of the line, we obtain the equation $y=\frac{3}{4}x-\frac{25}{4}$ (Figure 3.31).

*Figure 3.31 The line $y=\frac{3}{4}x-\frac{25}{4}$ is tangent to ${x}^{2}+{y}^{2}=25$ at the point (3, −4).* (Alt: The circle with radius 5 and center at the origin is graphed. A tangent line is drawn through the point (3, −4).)

### Example 3.72

#### Finding the Equation of the Tangent Line to a Curve

Find an equation of the line tangent to the graph of ${y}^{3}+{x}^{3}-3xy=0$ at the point $(\frac{3}{2},\frac{3}{2})$ (Figure 3.32). This curve is known as the folium (or leaf) of Descartes.

*Figure 3.32 Finding the tangent line to the folium of Descartes at $(\frac{3}{2},\frac{3}{2}).$* (Alt: A folium is shown, which is a line that creates a loop that crosses over itself. In this graph, it crosses over itself at (0, 0). Its tangent line from (3/2, 3/2) is shown.)

#### Solution

Begin by finding $\frac{dy}{dx}.$
$$\begin{matrix}\frac{d}{dx}({y}^{3}+{x}^{3}-3xy) & = & \frac{d}{dx}(0) \\ 3{y}^{2}\frac{dy}{dx}+3{x}^{2}-(3y+\frac{dy}{dx}3x) & = & 0 \\ \frac{dy}{dx} & = & \frac{3y-3{x}^{2}}{3{y}^{2}-3x}.\end{matrix}$$
Next, substitute $(\frac{3}{2},\frac{3}{2})$ into $\frac{dy}{dx}=\frac{3y-3{x}^{2}}{3{y}^{2}-3x}$ to find the slope of the tangent line:
$$\frac{dy}{dx}|\begin{matrix} \\ {}_{(\frac{3}{2},\frac{3}{2})}\end{matrix}=−1.$$
Finally, substitute into the point-slope equation of the line to obtain
$$y=-x+3.$$
### Example 3.73

#### Applying Implicit Differentiation

In a simple video game, a rocket travels in an elliptical orbit whose path is described by the equation $4{x}^{2}+25{y}^{2}=100.$ The rocket can fire missiles along lines tangent to its path. The object of the game is to destroy an incoming asteroid traveling along the positive *x*-axis toward $(0,0).$ If the rocket fires a missile when it is located at $(3,\frac{8}{5}),$ where will it intersect the *x*-axis?

#### Solution

To solve this problem, we must determine where the line tangent to the graph of

$4{x}^{2}+25{y}^{2}=100$ at $(3,\frac{8}{5})$ intersects the *x*-axis. Begin by finding $\frac{dy}{dx}$ implicitly.

Differentiating, we have
$$8x+50y\frac{dy}{dx}=0.$$
Solving for $\frac{dy}{dx},$ we have
$$\frac{dy}{dx}=-\frac{4x}{25y}.$$
The slope of the tangent line is $\frac{dy}{dx}|{}_{(3,\frac{8}{5})}=-\frac{3}{10}.$ The equation of the tangent line is $y=-\frac{3}{10}x+\frac{5}{2}.$ To determine where the line intersects the *x*-axis, solve $0=-\frac{3}{10}x+\frac{5}{2}.$ The solution is $x=\frac{25}{3}.$ The missile intersects the *x*-axis at the point $(\frac{25}{3},0).$

### Checkpoint 3.49

Find an equation of the line tangent to the hyperbola ${x}^{2}-{y}^{2}=16$ at the point $(5,3).$

## Section Exercises

Selected openly licensed end-of-section exercises from this OpenStax section. The complete set is on the source page.

**Exercise.** ${x}^{2}-{y}^{2}=4$

**Exercise.** $6{x}^{2}+3{y}^{2}=12$

**Exercise.** ${x}^{2}y=y-7$

**Exercise.** $3{x}^{3}+9x{y}^{2}=5{x}^{3}$

**Exercise.** $xy-\cos (xy)=1$

**Exercise.** $y\sqrt{x+4}=xy+8$

**Exercise.** $-xy-2=\frac{x}{7}$

**Exercise.** $y \sin (xy)={y}^{2}–2$
