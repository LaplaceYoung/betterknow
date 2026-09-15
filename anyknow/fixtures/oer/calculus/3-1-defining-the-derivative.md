# 3.1 Defining the Derivative

Title: 3.1 Defining the Derivative
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---
## 3.1 Defining the Derivative

### Learning Objectives

- 3.1.1 Recognize the meaning of the tangent to a curve at a point.
- 3.1.2 Calculate the slope of a tangent line.
- 3.1.3 Identify the derivative as the limit of a difference quotient.
- 3.1.4 Calculate the derivative of a given function at a point.
- 3.1.5 Describe the velocity as a rate of change.
- 3.1.6 Explain the difference between average velocity and instantaneous velocity.
- 3.1.7 Estimate the derivative from a table of values.

Now that we have both a conceptual understanding of a limit and the practical ability to compute limits, we have established the foundation for our study of calculus, the branch of mathematics in which we compute derivatives and integrals. Most mathematicians and historians agree that calculus was developed independently by the Englishman Isaac Newton $\text{(1643–1727)}$ and the German Gottfried Leibniz $\text{(1646–1716),}$ whose images appear in Figure 3.2. When we credit Newton and Leibniz with developing calculus, we are really referring to the fact that Newton and Leibniz were the first to understand the relationship between the derivative and the integral. Both mathematicians benefited from the work of predecessors, such as Barrow, Fermat, and Cavalieri. The initial relationship between the two mathematicians appears to have been amicable; however, in later years a bitter controversy erupted over whose work took precedence. Although it seems likely that Newton did, indeed, arrive at the ideas behind calculus first, we are indebted to Leibniz for the notation that we commonly use today.

*Figure 3.2* Newton and Leibniz are credited with developing calculus independently. (Alt: Photos of Newton and Leibniz.)

### Tangent Lines

We begin our study of calculus by revisiting the notion of secant lines and tangent lines. Recall that we used the slope of a secant line to a function at a point $(a,f(a))$ to estimate the rate of change, or the rate at which one variable changes in relation to another variable. We can obtain the slope of the secant by choosing a value of $x$ near $a$ and drawing a line through the points $(a,f(a))$ and $(x,f(x)),$ as shown in Figure 3.3. The slope of this line is given by an equation in the form of a difference quotient:

$$
m_{\mathrm{sec}}=\frac{f(x)-f(a)}{x-a}.
$$

We can also calculate the slope of a secant line to a function at a value *a* by using this equation and replacing $x$ with $a+h,$ where $h$ is a value close to 0. We can then calculate the slope of the line through the points $(a,f(a))$ and $(a+h,f(a+h)).$ In this case, we find the secant line has a slope given by the following difference quotient with increment $h\text{:}$

$$
m_{\mathrm{sec}}=\frac{f(a+h)-f(a)}{a+h-a}=\frac{f(a+h)-f(a)}{h}.
$$

### Definition

Let $f$ be a function defined on an interval $I$ containing $a.$ If $x\neq a$ is in $I,$ then

$$
Q=\frac{f(x)-f(a)}{x-a}
$$

(3.1)

is a difference quotient.

Also, if $h\neq 0$ is chosen so that $a+h$ is in $I,$ then

$$
Q=\frac{f(a+h)-f(a)}{h}
$$

(3.2)

is a difference quotient with increment $h.$

These two expressions for calculating the slope of a secant line are illustrated in Figure 3.3. We will see that each of these two methods for finding the slope of a secant line is of value. Depending on the setting, we can choose one or the other. The primary consideration in our choice usually depends on ease of calculation.

*Figure 3.3* We can calculate the slope of a secant line in either of two ways. (Alt: This figure consists of two graphs labeled a and b. Figure a shows the Cartesian coordinate plane with 0, a, and x marked on the x-axis. There is a curve labeled y = f(x) with points marked (a, f(a)) and (x, f(x)). There is also a straight line that crosses these two points (a, f(a)) and (x, f(x)). At the bottom of the graph, the equation msec = (f(x) - f(a))/(x - a) is given. Figure b shows a similar graph, but this time a + h is marked on the x-axis instead of x. Consequently, the curve labeled y = f(x) passes through (a, f(a)) and (a + h, f(a + h)) as does the straight line. At the bottom of the graph, the equation msec = (f(a + h) - f(a))/h is given.)

In Figure 3.4(a) we see that, as the values of $x$ approach $a,$ the slopes of the secant lines provide better estimates of the rate of change of the function at $a.$ Furthermore, the secant lines themselves approach the tangent line to the function at $a,$ which represents the limit of the secant lines. Similarly, Figure 3.4(b) shows that as the values of $h$ get closer to $0,$ the secant lines also approach the tangent line. The slope of the tangent line at $a$ is the rate of change of the function at $a,$ as shown in Figure 3.4(c).

*Figure 3.4* The secant lines approach the tangent line (shown in green) as the second point approaches the first. (Alt: This figure consists of three graphs labeled a, b, and c. Figure a shows the Cartesian coordinate plane with 0, a, x2, and x1 marked in order on the x-axis. There is a curve labeled y = f(x) with points marked (a, f(a)), (x2, f(x2)), and (x1, f(x1)). There are three straight lines: the first crosses (a, f(a)) and (x1, f(x1)); the second crosses (a, f(a)) and (x2, f(x2)); and the third only touches (a, f(a)), making it the tangent. At the bottom of the graph, the equation mtan = limx → a (f(x) - f(a))/(x - a) is given. Figure b shows a similar graph, but this time a + h2 and a + h1 are marked on the x-axis instead of x2 and x1. Consequently, the curve labeled y = f(x) passes through (a, f(a)), (a + h2, f(a + h2)), and (a + h1, f(a + h1)) and the straight lines similarly cross the graph as in Figure a. At the bottom of the graph, the equation mtan = limh → 0 (f(a + h) - f(a))/h is given. Figure c shows only the curve labeled y = f(x) and its tangent at point (a, f(a)).)

In Figure 3.5 we show the graph of $f(x)=\sqrt{x}$ and its tangent line at $(1,1)$ in a series of tighter intervals about $x=1.$ As the intervals become narrower, the graph of the function and its tangent line appear to coincide, making the values on the tangent line a good approximation to the values of the function for choices of $x$ close to $1.$ In fact, the graph of $f(x)$ itself appears to be locally linear in the immediate vicinity of $x=1.$

*Figure 3.5* For values of $x$ close to $1,$ the graph of $f(x)=\sqrt{x}$ and its tangent line appear to coincide. (Alt: This figure consists of four graphs labeled a, b, c, and d. Figure a shows the graphs of the square root of x and the equation y = (x + 1)/2 with the x-axis going from 0 to 4 and the y-axis going from 0 to 2.5. The graphs of these two functions look very close near 1; there is a box around where these graphs look close. Figure b shows a close up of these same two functions in the area of the box from Figure a, specifically x going from 0 to 2 and y going from 0 to 1.4. Figure c is the same graph as Figure b, but this one has a box from 0 to 1.1 in the x coordinate and 0.8 and 1 on the y coordinate. There is an arrow indicating that this is blown up in Figure d. Figure d shows a very close picture of the box from Figure c, and the two functions appear to be touching for almost the entire length of the graph.)

Formally we may define the tangent line to the graph of a function as follows.

### Definition

Let $f(x)$ be a function defined in an open interval containing $a.$ The *tangent line* to $f(x)$ at $a$ is the line passing through the point $(a,f(a))$ having slope

$$
m_{\mathrm{tan}}=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}
$$

(3.3)

provided this limit exists.

Equivalently, we may define the tangent line to $f(x)$ at $a$ to be the line passing through the point $(a,f(a))$ having slope

$$
m_{\mathrm{tan}}=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}
$$

(3.4)

provided this limit exists.

Just as we have used two different expressions to define the slope of a secant line, we use two different forms to define the slope of the tangent line. In this text we use both forms of the definition. As before, the choice of definition will depend on the setting. Now that we have formally defined a tangent line to a function at a point, we can use this definition to find equations of tangent lines.

### Example 3.1

#### Finding a Tangent Line

Find an equation of the line tangent to the graph of $f(x)=x^{2}$ at $x=3.$

#### Solution

First find the slope of the tangent line. In this example, use Equation 3.3.

$$
\begin{matrix}m_{\mathrm{tan}} & =\lim_{x\to 3}\frac{f(x)-f(3)}{x-3} & & & \text{Apply the definition.} \\ & =\lim_{x\to 3}\frac{x^{2}-9}{x-3} & & & \text{Substitute} f(x)=x^{2} \text{and} f(3)=9. \\ & =\lim_{x\to 3}\frac{(x-3)(x+3)}{x-3}=\lim_{x\to 3}(x+3)=6 & & & \text{Factor the numerator to evaluate the limit.}\end{matrix}
$$

Next, find a point on the tangent line. Since the line is tangent to the graph of $f(x)$ at $x=3,$ it passes through the point $(3,f(3)).$ We have $f(3)=9,$ so the tangent line passes through the point $(3,9).$

Using the point-slope equation of the line with the slope $m=6$ and the point $(3,9),$ we obtain the line $y-9=6(x-3).$ Simplifying, we have $y=6x-9.$ The graph of $f(x)=x^{2}$ and its tangent line at $3$ are shown in Figure 3.6.

*Figure 3.6* The tangent line to $f(x)$ at $x=3.$ (Alt: This figure consists of the graphs of f(x) = x squared and y = 6x - 9. The graphs of these functions appear to touch at x = 3.)

### Example 3.2

#### The Slope of a Tangent Line Revisited

Use Equation 3.4 to find the slope of the line tangent to the graph of $f(x)=x^{2}$ at $x=3.$

#### Solution

The steps are very similar to Example 3.1. See Equation 3.4 for the definition.

$$
\begin{matrix}m_{\mathrm{tan}} & =\lim_{h\to 0}\frac{f(3+h)-f(3)}{h} & & & \text{Apply the definition.} \\ & =\lim_{h\to 0}\frac{(3+h)^{2}-9}{h} & & & \text{Substitute} f(3+h)=(3+h)^{2} \text{and} f(3)=9. \\ & =\lim_{h\to 0}\frac{9+6h+h^{2}-9}{h} & & & \text{Expand and simplify to evaluate the limit.} \\ & =\lim_{h\to 0}\frac{h(6+h)}{h}=\lim_{h\to 0}(6+h)=6\end{matrix}
$$

We obtained the same value for the slope of the tangent line by using the other definition, demonstrating that the formulas can be interchanged.

### Example 3.3

#### Finding the Equation of a Tangent Line

Find an equation of the line tangent to the graph of $f(x)=1\text{/}x$ at $x=2.$

#### Solution

We can use Equation 3.3, but as we have seen, the results are the same if we use Equation 3.4.

$$
\begin{matrix}m_{\mathrm{tan}} & =\lim_{x\to 2}\frac{f(x)-f(2)}{x-2} & & & \text{Apply the definition.} \\ & =\lim_{x\to 2}\frac{\frac{1}{x}-\frac{1}{2}}{x-2} & & & \text{Substitute} f(x)=\frac{1}{x} \text{and} f(2)=\frac{1}{2}. \\ & =\lim_{x\to 2}\frac{\frac{1}{x}-\frac{1}{2}}{x-2}\cdot \frac{2x}{2x} & & & \begin{matrix}\text{Multiply numerator and denominator by} 2x \text{to} \\ \text{simplify fractions.}\end{matrix} \\ & =\lim_{x\to 2}\frac{(2-x)}{(x-2)(2x)} & & & \text{Simplify.} \\ & =\lim_{x\to 2}\frac{-1}{2x} & & & \text{Simplify using} \frac{2-x}{x-2}=-1,\text{for} x\neq 2. \\ & =-\frac{1}{4} & & & \text{Evaluate the limit.}\end{matrix}
$$

We now know that the slope of the tangent line is $-\frac{1}{4}.$ To find an equation of the tangent line, we also need a point on the line. We know that $f(2)=\frac{1}{2}.$ Since the tangent line passes through the point $(2,\frac{1}{2})$ we can use the point-slope equation of a line to find an equation of the tangent line. Thus the tangent line has the equation $y=-\frac{1}{4}x+1.$ The graphs of $f(x)=\frac{1}{x}$ and $y=-\frac{1}{4}x+1$ are shown in Figure 3.7.

*Figure 3.7* The line is tangent to $f(x)$ at $x=2.$ (Alt: This figure consists of the graphs of f(x) = 1/x and y = -x/4 + 1. The part of the graph f(x) = 1/x in the first quadrant appears to touch the other function’s graph at x = 2.)

### Checkpoint 3.1

Find the slope of the line tangent to the graph of $f(x)=\sqrt{x}$ at $x=4.$

### The Derivative of a Function at a Point

The type of limit we compute in order to find the slope of the line tangent to a function at a point occurs in many applications across many disciplines. These applications include velocity and acceleration in physics, marginal profit functions in business, and growth rates in biology. This limit occurs so frequently that we give this value a special name: the derivative. The process of finding a derivative is called differentiation.

### Definition

Let $f(x)$ be a function defined in an open interval containing $a.$ The derivative of the function $f(x)$ at $a,$ denoted by $f^{'}(a),$ is defined by

$$
f^{'}(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}
$$

(3.5)

provided this limit exists.

Alternatively, we may also define the derivative of $f(x)$ at $a$ as

$$
f^{'}(a)=\lim_{h\to 0}\frac{f(a+h)-f(a)}{h}.
$$

(3.6)

### Example 3.4

#### Estimating a Derivative

For $f(x)=x^{2},$ use a table to estimate $f^{'}(3)$ using Equation 3.5.

#### Solution

Create a table using values of $x$ just below $3$ and just above $3.$

| $x$ | $\frac{x^{2}-9}{x-3}$ |
| --- | --- |
| $2.9$ | $5.9$ |
| $2.99$ | $5.99$ |
| $2.999$ | $5.999$ |
| $3.001$ | $6.001$ |
| $3.01$ | $6.01$ |
| $3.1$ | $6.1$ |

After examining the table, we see that a good estimate is $f^{'}(3)=6.$

### Checkpoint 3.2

For $f(x)=x^{2},$ use a table to estimate $f^{'}(3)$ using Equation 3.6.

### Example 3.5

#### Finding a Derivative

For $f(x)=3x^{2}-4x+1,$ find $f^{'}(2)$ by using Equation 3.5.

#### Solution

Substitute the given function and value directly into the equation.

$$
\begin{matrix}f^{'}(2) & =\lim_{x\to 2}\frac{f(x)-f(2)}{x-2} & & & \text{Apply the definition.} \\ & =\lim_{x\to 2}\frac{(3x^{2}-4x+1)-5}{x-2} & & & \text{Substitute} f(x)=3x^{2}-4x+1 \text{and} f(2)=5. \\ & =\lim_{x\to 2}\frac{(x-2)(3x+2)}{x-2} & & & \text{Simplify and factor the numerator.} \\ & =\lim_{x\to 2}(3x+2) & & & \text{Cancel the common factor.} \\ & =8 & & & \text{Evaluate the limit.}\end{matrix}
$$

### Example 3.6

#### Revisiting the Derivative

For $f(x)=3x^{2}-4x+1,$ find $f^{'}(2)$ by using Equation 3.6.

#### Solution

Using this equation, we can substitute two values of the function into the equation, and we should get the same value as in Example 3.5.

$$
\begin{matrix}f^{'}(2) & =\lim_{h\to 0}\frac{f(2+h)-f(2)}{h} & & & \text{Apply the definition.} \\ & =\lim_{h\to 0}\frac{(3(2+h)^{2}-4(2+h)+1)-5}{h} & & & \begin{matrix}\text{Substitute} f(2)=5 \text{and} \\ f(2+h)=3(2+h)^{2}-4(2+h)+1.\end{matrix} \\ & =\lim_{h\to 0}\frac{3h^{2}+8h}{h} & & & \text{Simplify the numerator.} \\ & =\lim_{h\to 0}\frac{h(3h+8)}{h} & & & \text{Factor the numerator.} \\ & =\lim_{h\to 0}(3h+8) & & & \text{Cancel the common factor.} \\ & =8 & & & \text{Evaluate the limit.}\end{matrix}
$$

The results are the same whether we use Equation 3.5 or Equation 3.6.

### Checkpoint 3.3

For $f(x)=x^{2}+3x+2,$ find $f^{'}(1).$

### Velocities and Rates of Change

Now that we can evaluate a derivative, we can use it in velocity applications. Recall that if $s(t)$ is the position of an object moving along a coordinate axis, the average velocity of the object over a time interval $[a,t]$ if $t>a$ or $[t,a]$ if $t<a$ is given by the difference quotient

$$
v_{\text{ave}}=\frac{s(t)-s(a)}{t-a}.
$$

(3.7)

As the values of $t$ approach $a,$ the values of $v_{\text{ave}}$ approach the value we call the instantaneous velocity at $a.$ That is, instantaneous velocity at $a,$ denoted $v(a),$ is given by

$$
v(a)=s^{'}(a)=\lim_{t\to a}\frac{s(t)-s(a)}{t-a}.
$$

(3.8)

To better understand the relationship between average velocity and instantaneous velocity, see Figure 3.8. In this figure, the slope of the tangent line (shown in red) is the instantaneous velocity of the object at time $t=a$ whose position at time $t$ is given by the function $s(t).$ The slope of the secant line (shown in green) is the average velocity of the object over the time interval $[a,t].$

*Figure 3.8* The slope of the secant line is the average velocity over the interval $[a,t].$ The slope of the tangent line is the instantaneous velocity. (Alt: This figure consists of the Cartesian coordinate plane with 0, a, and t1 marked on the t-axis. The function y = s(t) is graphed in the first quadrant along with two lines marked tangent and secant. The tangent line touches y = s(t) at only one point, (a, s(a)). The secant line touches y = s(t) at two points: (a, s(a)) and (t1, s(t1)).)

We can use Equation 3.5 to calculate the instantaneous velocity, or we can estimate the velocity of a moving object by using a table of values. We can then confirm the estimate by using Equation 3.7.

### Example 3.7

#### Estimating Velocity

A lead weight on a spring is oscillating up and down. Its position at time $t$ with respect to a fixed horizontal line is given by $s(t)=\mathrm{sin} t$ (Figure 3.9). Use a table of values to estimate $v(0).$ Check the estimate by using Equation 3.5.

*Figure 3.9* A lead weight suspended from a spring in vertical oscillatory motion. (Alt: A picture of a spring hanging down with a weight at the end. There is a horizontal dashed line marked 0 a little bit above the weight.)

#### Solution

We can estimate the instantaneous velocity at $t=0$ by computing a table of average velocities using values of $t$ approaching $0,$ as shown in Table 3.1.

| $t$ | $\frac{\mathrm{sin} t-\mathrm{sin} 0}{t-0}=\frac{\mathrm{sin} t}{t}$ |
| --- | --- |
| $-0.1$ | $0.998334166$ |
| $-0.01$ | $0.9999833333$ |
| $-0.001$ | $0.999999833$ |
| $0.001$ | $0.999999833$ |
| $0.01$ | $0.9999833333$ |
| $0.1$ | $0.998334166$ |

From the table we see that the average velocity over the time interval $[-0.1,0]$ is $0.998334166,$ the average velocity over the time interval $[-0.01,0]$ is $0.9999833333,$ and so forth. Using this table of values, it appears that a good estimate is $v(0)=1.$

By using Equation 3.5, we can see that

$$
v(0)=s^{'}(0)=\lim_{t\to 0}\frac{\mathrm{sin} t-\mathrm{sin} 0}{t-0}=\lim_{t\to 0}\frac{\mathrm{sin} t}{t}=1.
$$

Thus, in fact, $v(0)=1.$

### Checkpoint 3.4

A rock is dropped from a height of $64$ feet. Its height above ground at time $t$ seconds later is given by $s(t)=-16t^{2}+64,0\leq t\leq 2.$ Find its instantaneous velocity $1$ second after it is dropped, using Equation 3.5.

As we have seen throughout this section, the slope of a tangent line to a function and instantaneous velocity are related concepts. Each is calculated by computing a derivative and each measures the instantaneous rate of change of a function, or the rate of change of a function at any point along the function.

### Definition

The instantaneous rate of change of a function $f(x)$ at a value $a$ is its derivative $f^{'}(a).$

### Example 3.8

#### Chapter Opener: Estimating Rate of Change of Velocity

*Figure 3.10* (credit: modification of work by Codex41, Flickr) (Alt: The same sports car speeding along a winding road from the beginning of the chapter.)

Reaching a top speed of $270.49$ mph, the Hennessey Venom GT is one of the fastest cars in the world. In tests it went from $0$ to $60$ mph in $3.05$ seconds, from $0 \text{to} 100$ mph in $5.88$ seconds, from $0 \text{to} 200$ mph in $14.51$ seconds, and from $0 \text{to} 229.9$ mph in $19.96$ seconds. Use this data to draw a conclusion about the rate of change of velocity (that is, its acceleration) as it approaches $229.9$ mph. Does the rate at which the car is accelerating appear to be increasing, decreasing, or constant?

#### Solution

First observe that $60$ mph = $88$ ft/s, $100$ mph $\approx 146.67$ ft/s, $200$ mph $\approx 293.33$ ft/s, and $229.9$ mph $\approx 337.19$ ft/s. We can summarize the information in a table.

| $t$ | $v(t)$ |
| --- | --- |
| $0$ | $0$ |
| $3.05$ | $88$ |
| $5.88$ | $146.67$ |
| $14.51$ | $293.33$ |
| $19.96$ | $337.19$ |

Now compute the average acceleration of the car in feet per second per second on intervals of the form $[t,19.96]$ as $t$ approaches $19.96,$ as shown in the following table.

| $t$ | $\frac{v(t)-v(19.96)}{t-19.96}=\frac{v(t)-337.19}{t-19.96}$ |
| --- | --- |
| $0.0$ | $16.89$ |
| $3.05$ | $14.74$ |
| $5.88$ | $13.53$ |
| $14.51$ | $8.05$ |

The rate at which the car is accelerating is decreasing as its velocity approaches $229.9$ mph $\text{(}337.19$ ft/s).

### Example 3.9

#### Rate of Change of Temperature

A homeowner sets the thermostat so that the temperature in the house begins to drop from $70\text{°}\text{F}$ at $9$ p.m., reaches a low of $60\text{°}$ during the night, and rises back to $70\text{°}$ by $7$ a.m. the next morning. Suppose that the temperature in the house is given by $T(t)=0.4t^{2}-4t+70$ for $0\leq t\leq 10,$ where $t$ is the number of hours past $9$ p.m. Find the instantaneous rate of change of the temperature at midnight.

#### Solution

Since midnight is $3$ hours past $9$ p.m., we want to compute $T^{'}(3).$ Refer to Equation 3.5.

$$
\begin{matrix}T^{'}(3) & =\lim_{t\to 3}\frac{T(t)-T(3)}{t-3} & & & \text{Apply the definition.} \\ & =\lim_{t\to 3}\frac{0.4t^{2}-4t+70-61.6}{t-3} & & & \begin{matrix}\text{Substitute} T(t)=0.4t^{2}-4t+70 \text{and} \\ T(3)=61.6.\end{matrix} \\ & =\lim_{t\to 3}\frac{0.4t^{2}-4t+8.4}{t-3} & & & \text{Simplify.} \\ & =\lim_{t\to 3}\frac{0.4(t-3)(t-7)}{t-3} & & & =\lim_{t\to 3}\frac{0.4(t-3)(t-7)}{t-3} \\ & =\lim_{t\to 3}0.4(t-7) & & & \text{Cancel.} \\ & =-1.6 & & & \text{Evaluate the limit.}\end{matrix}
$$

The instantaneous rate of change of the temperature at midnight is $-1.6\text{°}\text{F}$ per hour.

### Example 3.10

#### Rate of Change of Profit

A toy company can sell $x$ electronic gaming systems at a price of $p=-0.01x+400$ dollars per gaming system. The cost of manufacturing $x$ systems is given by $C(x)=100x+10,000$ dollars. Find the rate of change of profit when $10,000$ games are produced. Should the toy company increase or decrease production?

#### Solution

The profit $P(x)$ earned by producing $x$ gaming systems is $R(x)-C(x),$ where $R(x)$ is the revenue obtained from the sale of $x$ games. Since the company can sell $x$ games at $p=-0.01x+400$ per game,

$$
R(x)=xp=x(-0.01x+400)=-0.01x^{2}+400x.
$$

Consequently,

$$
P(x)=-0.01x^{2}+300x-10,000.
$$

Therefore, evaluating the rate of change of profit gives

$$
\begin{matrix}P^{'}(10000) & =\lim_{x\to 10000}\frac{P(x)-P(10000)}{x-10000} \\ & =\lim_{x\to 10000}\frac{-0.01x^{2}+300x-10000-1990000}{x-10000} \\ & =\lim_{x\to 10000}\frac{-0.01x^{2}+300x-2000000}{x-10000} \\ & =100.\end{matrix}
$$

Since the rate of change of profit $P^{'}(10,000)>0$ and $P(10,000)>0,$ the company should increase production.

### Checkpoint 3.5

A coffee shop determines that the daily profit on scones obtained by charging $s$ dollars per scone is $P(s)=-20s^{2}+150s-10.$ The coffee shop currently charges $3.25 per scone. Find $P'(3.25)$, the rate of change of profit when the price is $3.25$, and decide whether or not the coffee shop should consider raising or lowering its prices on scones.

## Section Exercises

Selected openly licensed end-of-section exercises from this OpenStax section. The complete set is on the source page.

For the following exercises, use Equation 3.1 to find the slope of the secant line between the values $x_{1}$ and $x_{2}$ for each function $y=f(x).$

**Exercise.** 1. $f(x)=4x+7;x_{1}=2,x_{2}=5$

**Exercise.** 2. $f(x)=8x-3;x_{1}=-1,x_{2}=3$

**Exercise.** 3. $f(x)=x^{2}+2x+1;x_{1}=3,x_{2}=3.5$

**Exercise.** 4. $f(x)=-x^{2}+x+2;x_{1}=0.5,x_{2}=1.5$

**Exercise.** 5. $f(x)=\frac{4}{3x-1};x_{1}=1,x_{2}=3$

**Exercise.** 6. $f(x)=\frac{x-7}{2x+1};x_{1}=0,x_{2}=2$

**Exercise.** 7. $f(x)=\sqrt{x};x_{1}=1,x_{2}=16$

**Exercise.** 8. $f(x)=\sqrt{x-9};x_{1}=10,x_{2}=13$
