# 5.3 The Fundamental Theorem of Calculus

Title: 5.3 The Fundamental Theorem of Calculus
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---
## 5.3 The Fundamental Theorem of Calculus

### Learning Objectives

- 5.3.1 Describe the meaning of the Mean Value Theorem for Integrals.
- 5.3.2 State the meaning of the Fundamental Theorem of Calculus, Part 1.
- 5.3.3 Use the Fundamental Theorem of Calculus, Part 1, to evaluate derivatives of integrals.
- 5.3.4 State the meaning of the Fundamental Theorem of Calculus, Part 2.
- 5.3.5 Use the Fundamental Theorem of Calculus, Part 2, to evaluate definite integrals.
- 5.3.6 Explain the relationship between differentiation and integration.

In the previous two sections, we looked at the definite integral and its relationship to the area under the curve of a function. Unfortunately, so far, the only tools we have available to calculate the value of a definite integral are geometric area formulas and limits of Riemann sums, and both approaches are extremely cumbersome. In this section we look at some more powerful and useful techniques for evaluating definite integrals.

These new techniques rely on the relationship between differentiation and integration. This relationship was discovered and explored by both Sir Isaac Newton and Gottfried Wilhelm Leibniz (among others) during the late 1600s and early 1700s, and it is codified in what we now call the Fundamental Theorem of Calculus, which has two parts that we examine in this section. Its very name indicates how central this theorem is to the entire development of calculus.

Before we get to this crucial theorem, however, let’s examine another important theorem, the Mean Value Theorem for Integrals, which is needed to prove the Fundamental Theorem of Calculus.

### The Mean Value Theorem for Integrals

The Mean Value Theorem for Integrals states that a continuous function on a closed interval takes on its average value at some point in that interval. The theorem guarantees that if $f(x)$ is continuous, a point *c* exists in an interval $[a,b]$ such that the value of the function at *c* is equal to the average value of $f(x)$ over $[a,b].$ We state this theorem mathematically with the help of the formula for the average value of a function that we presented at the end of the preceding section.

### Theorem 5.3

#### The Mean Value Theorem for Integrals

If $f(x)$ is continuous over an interval $[a,b],$ then there is at least one point $c\in [a,b]$ such that

$$
f(c)=\frac{1}{b-a}\int _{a}^{b}f(x)dx.
$$

(5.15)

This formula can also be stated as

$$
\int _{a}^{b}f(x)dx=f(c)(b-a).
$$

#### Proof

Since $f(x)$ is continuous on $[a,b],$ by the extreme value theorem (see Maxima and Minima), it assumes minimum and maximum values— *m* and *M* , respectively—on $[a,b].$ Then, for all *x* in $[a,b],$ we have $m\leq f(x)\leq M.$ Therefore, by the comparison theorem (see The Definite Integral), we have

$$
m(b-a)\leq \int _{a}^{b}f(x)dx\leq M(b-a).
$$

Dividing by $b-a$ gives us

$$
m\leq \frac{1}{b-a}\int _{a}^{b}f(x)dx\leq M.
$$

Since $\frac{1}{b-a}\int _{a}^{b}f(x)dx$ is a number between *m* and *M* , and since $f(x)$ is continuous and assumes the values *m* and *M* over $[a,b],$ by the Intermediate Value Theorem (see Continuity), there is a number *c* over $[a,b]$ such that

$$
f(c)=\frac{1}{b-a}\int _{a}^{b}f(x)dx,
$$

and the proof is complete.

□

### Example 5.15

#### Finding the Average Value of a Function

Find the average value of the function $f(x)=8-2x$ over the interval $[0,4]$ and find *c* such that $f(c)$ equals the average value of the function over $[0,4].$

#### Solution

The formula states the mean value of $f(x)$ is given by

$$
\frac{1}{4-0}\int _{0}^{4}(8-2x)dx.
$$

We can see in Figure 5.26 that the function represents a straight line and forms a right triangle bounded by the *x* - and *y* -axes. The area of the triangle is $A=\frac{1}{2}(\text{base})(\text{height}).$ We have

$$
A=\frac{1}{2}(4)(8)=16.
$$

The average value is found by multiplying the area by $1\text{/}(4-0).$ Thus, the average value of the function is

$$
\frac{1}{4}(16)=4.
$$

Set the average value equal to $f(c)$ and solve for *c* .

$$
\begin{matrix}8-2c & = & 4 \\ c & = & 2\end{matrix}
$$

At $c=2,f(2)=4.$

*Figure 5.26* By the Mean Value Theorem, the continuous function $f(x)$ takes on its average value at *c* at least once over a closed interval. (Alt: The graph of a decreasing line f(x) = 8 – 2x over [-1,4.5]. The line y=4 is drawn over [0,4], which intersects with the line at (2,4). A line is drawn down from (2,4) to the x axis and from (4,4) to the y axis. The area under y=4 is shaded.)

### Checkpoint 5.14

Find the average value of the function $f(x)=\frac{x}{2}$ over the interval $[0,6]$ and find *c* such that $f(c)$ equals the average value of the function over $[0,6].$

### Example 5.16

#### Finding the Point Where a Function Takes on Its Average Value

Given $\int _{0}^{3}x^{2}dx=9,$ find *c* such that $f(c)$ equals the average value of $f(x)=x^{2}$ over $[0,3].$

#### Solution

We are looking for the value of *c* such that

$$
f(c)=\frac{1}{3-0}\int _{0}^{3}x^{2}dx=\frac{1}{3}(9)=3.
$$

Replacing $f(c)$ with *c* ^{2}, we have

$$
\begin{matrix}c^{2} & = & 3 \\ c & = & \text{\pm}\sqrt{3}.\end{matrix}
$$

Since $-\sqrt{3}$ is outside the interval, take only the positive value. Thus, $c=\sqrt{3}$ (Figure 5.27).

*Figure 5.27* Over the interval $[0,3],$ the function $f(x)=x^{2}$ takes on its average value at $c=\sqrt{3}.$ (Alt: A graph of the parabola f(x) = x^2 over [-2, 3]. The area under the curve and above the x axis is shaded, and the point (sqrt(3), 3) is marked.)

### Checkpoint 5.15

Given $\int _{0}^{3}(2x^{2}-1)dx=15,$ find *c* such that $f(c)$ equals the average value of $f(x)=2x^{2}-1$ over $[0,3].$

### Fundamental Theorem of Calculus Part 1: Integrals and Antiderivatives

As mentioned earlier, the Fundamental Theorem of Calculus is an extremely powerful theorem that establishes the relationship between differentiation and integration, and gives us a way to evaluate definite integrals without using Riemann sums or calculating areas. The theorem is comprised of two parts, the first of which, the Fundamental Theorem of Calculus, Part 1, is stated here. Part 1 establishes the relationship between differentiation and integration.

### Theorem 5.4

#### Fundamental Theorem of Calculus, Part 1

If $f(x)$ is continuous over an interval $[a,b],$ and the function $F(x)$ is defined by

$$
F(x)=\int _{a}^{x}f(t)dt,
$$

(5.16)

then $F^{'}\text{(}x)=f(x)$ over $(a,b).$

Before we delve into the proof, a couple of subtleties are worth mentioning here. First, a comment on the notation. Note that we have defined a function, $F(x),$ as the definite integral of another function, $f(t),$ from the point *a* to the point *x* . At first glance, this is confusing, because we have said several times that a definite integral is a number, and here it looks like it’s a function. The key here is to notice that for any particular value of *x* , the definite integral is a number. So the function $F(x)$ returns a number (the value of the definite integral) for each value of *x* .

Second, it is worth commenting on some of the key implications of this theorem. There is a reason it is called the *Fundamental* Theorem of Calculus. Not only does it establish a relationship between integration and differentiation, but also it guarantees that any integrable function has an antiderivative.

#### Proof

Applying the definition of the derivative, we have

$$
\begin{matrix} \\ \\ \\ F^{'}\text{(}x) & =\lim_{h\to 0} \frac{F(x+h)-F(x)}{h} \\ \\ & =\lim_{h\to 0} \frac{1}{h}[\int _{a}^{x+h}f(t)dt-\int _{a}^{x}f(t)dt] \\ & =\lim_{h\to 0} \frac{1}{h}[\int _{a}^{x+h}f(t)dt+\int _{x}^{a}f(t)dt] \\ & =\lim_{h\to 0} \frac{1}{h}\int _{x}^{x+h}f(t)dt.\end{matrix}
$$

Looking carefully at this last expression, we see $\frac{1}{h}\int _{x}^{x+h}f(t)dt$ is just the average value of the function $f(x)$ over the interval $[x,x+h].$ Therefore, by The Mean Value Theorem for Integrals, there is some number *c* in $[x,x+h]$ such that

$$
\frac{1}{h}\int _{x}^{x+h}f(x)dx=f(c).
$$

In addition, since *c* is between *x* and *x* + *h* , *c* approaches *x* as *h* approaches zero. Also, since $f(x)$ is continuous, we have $\lim_{h\to 0}f(c)=\lim_{c\to x}f(c)=f(x).$ Putting all these pieces together, we have

$$
\begin{matrix} \\ F^{'}\text{(}x) & =\lim_{h\to 0} \frac{1}{h}\int _{x}^{x+h}f(x)dx \\ & =\lim_{h\to 0}f(c) \\ & =f(x),\end{matrix}
$$

and the proof is complete.

□

### Example 5.17

#### Finding a Derivative with the Fundamental Theorem of Calculus

Use the Fundamental Theorem of Calculus, Part 1 to find the derivative of

$$
g(x)=\int _{1}^{x}\frac{1}{t^{3}+1}dt.
$$

#### Solution

According to the Fundamental Theorem of Calculus, the derivative is given by

$$
g^{'}\text{(}x)=\frac{1}{x^{3}+1}.
$$

### Checkpoint 5.16

Use the Fundamental Theorem of Calculus, Part 1 to find the derivative of $g(r)=\int _{0}^{r}\sqrt{x^{2}+4}dx.$

### Example 5.18

#### Using the Fundamental Theorem and the Chain Rule to Calculate Derivatives

Let $F(x)=\int _{1}^{\sqrt{x}}\mathrm{sin} tdt.$ Find $F^{'}\text{(}x).$

#### Solution

Letting $u(x)=\sqrt{x},$ we have $F(x)=\int _{1}^{u(x)}\mathrm{sin} tdt.$ Thus, by the Fundamental Theorem of Calculus and the chain rule,

$$
\begin{matrix} \\ F^{'}\text{(}x) & =\mathrm{sin}(u(x))\frac{du}{dx} \\ & =\mathrm{sin}(u(x))\cdot (\frac{1}{2}x^{-1\text{/}2}) \\ & =\frac{\mathrm{sin}\sqrt{x}}{2\sqrt{x}}.\end{matrix}
$$

### Checkpoint 5.17

Let $F(x)=\int _{1}^{x^{3}}\mathrm{cos} tdt.$ Find $F^{'}\text{(}x).$

### Example 5.19

#### Using the Fundamental Theorem of Calculus with Two Variable Limits of Integration

Let $F(x)=\int _{x}^{2x}t^{3}dt.$ Find $F^{'}\text{(}x).$

#### Solution

We have $F(x)=\int _{x}^{2x}t^{3}dt.$ Both limits of integration are variable, so we need to split this into two integrals. We get

$$
\begin{matrix} \\ F(x) & =\int _{x}^{2x}t^{3}dt \\ & =\int _{x}^{0}t^{3}dt+\int _{0}^{2x}t^{3}dt \\ & =-\int _{0}^{x}t^{3}dt+\int _{0}^{2x}t^{3}dt.\end{matrix}
$$

Differentiating the first term, we obtain

$$
\frac{d}{dx}[-\int _{0}^{x}t^{3}dt]=-x^{3}.
$$

Differentiating the second term, we first let $u(x)=2x.$ Then,

$$
\begin{matrix} \\ \frac{d}{dx}[\int _{0}^{2x}t^{3}dt] & =\frac{d}{dx}[\int _{0}^{u(x)}t^{3}dt] \\ & =(u(x))^{3}\frac{du}{dx} \\ & =(2x)^{3}\cdot 2 \\ & =16x^{3}.\end{matrix}
$$

Thus,

$$
\begin{matrix} \\ \\ F^{'}\text{(}x) & =\frac{d}{dx}[-\int _{0}^{x}t^{3}dt]+\frac{d}{dx}[\int _{0}^{2x}t^{3}dt] \\ & =-x^{3}+16x^{3} \\ & =15x^{3}.\end{matrix}
$$

### Checkpoint 5.18

Let $F(x)=\int _{x}^{x^{2}}\mathrm{cos} tdt.$ Find $F^{'}\text{(}x).$

### Fundamental Theorem of Calculus, Part 2: The Evaluation Theorem

The Fundamental Theorem of Calculus, Part 2, is perhaps the most important theorem in calculus. After tireless efforts by mathematicians for approximately 500 years, new techniques emerged that provided scientists with the necessary tools to explain many phenomena. Using calculus, astronomers could finally determine distances in space and map planetary orbits. Everyday financial problems such as calculating marginal costs or predicting total profit could now be handled with simplicity and accuracy. Engineers could calculate the bending strength of materials or the three-dimensional motion of objects. Our view of the world was forever changed with calculus.

After finding approximate areas by adding the areas of *n* rectangles, the application of this theorem is straightforward by comparison. It almost seems too simple that the area of an entire curved region can be calculated by just evaluating an antiderivative at the first and last endpoints of an interval.

### Theorem 5.5

#### The Fundamental Theorem of Calculus, Part 2

If *f* is continuous over the interval $[a,b]$ and $F(x)$ is any antiderivative of $f(x),$ then

$$
\int _{a}^{b}f(x)dx=F(b)-F(a).
$$

(5.17)

We often see the notation $F(x)|_{a}^{b}$ to denote the expression $F(b)-F(a).$ We use this vertical bar and associated limits *a* and *b* to indicate that we should evaluate the function $F(x)$ at the upper limit (in this case, *b* ), and subtract the value of the function $F(x)$ evaluated at the lower limit (in this case, *a* ).

The Fundamental Theorem of Calculus, Part 2 (also known as the evaluation theorem) states that if we can find an antiderivative for the integrand, then we can evaluate the definite integral by evaluating the antiderivative at the endpoints of the interval and subtracting.

#### Proof

Let $P={x_{i}},i=0,1\text{,…,} n$ be a regular partition of $[a,b].$ Then, we can write

$$
\begin{matrix}F(b)-F(a) & =F(x_{n})-F(x_{0}) \\ & =[F(x_{n})-F(x_{n-1})]+[F(x_{n-1})-F(x_{n-2})]+\text{…}+[F(x_{1})-F(x_{0})] \\ \\ & =\sum _{i=1}^{n}[F(x_{i})-F(x_{i-1})].\end{matrix}
$$

Now, we know *F* is an antiderivative of *f* over $[a,b],$ so by the Mean Value Theorem (see The Mean Value Theorem) for $i=0,1\text{,…,} n$ we can find $c_{i}$ in $[x_{i-1},x_{i}]$ such that

$$
F(x_{i})-F(x_{i-1})=F^{'}\text{(}c_{i})(x_{i}-x_{i-1})=f(c_{i})\text{Δ}x.
$$

Then, substituting into the previous equation, we have

$$
F(b)-F(a)=\sum _{i=1}^{n}f(c_{i})\text{Δ}x.
$$

Taking the limit of both sides as $n\to \infty ,$ we obtain

$$
\begin{matrix} \\ \\ F(b)-F(a) & =\lim_{n\to \infty }\sum _{i=1}^{n}f(c_{i})\text{Δ}x \\ & =\int _{a}^{b}f(x)dx.\end{matrix}
$$

□

### Example 5.20

#### Evaluating an Integral with the Fundamental Theorem of Calculus

Use The Fundamental Theorem of Calculus, Part 2 to evaluate

$$
\int _{-2}^{2}(t^{2}-4)dt.
$$

#### Solution

Recall the power rule for Antiderivatives:

$$
\text{If} y=x^{n},\int x^{n}dx=\frac{x^{n+1}}{n+1}+C.
$$

Use this rule to find the antiderivative of the function and then apply the theorem. We have

$$
\begin{matrix}\int _{-2}^{2}(t^{2}-4)dt & =\frac{t^{3}}{3}-4t|_{-2}^{2} \\ \\ \\ & =[\frac{(2)^{3}}{3}-4(2)]-[\frac{(-2)^{3}}{3}-4(-2)] \\ & =(\frac{8}{3}-8)-(-\frac{8}{3}+8) \\ & =\frac{8}{3}-8+\frac{8}{3}-8 \\ & =\frac{16}{3}-16 \\ & =-\frac{32}{3}.\end{matrix}
$$

#### Analysis

Notice that we did not include the “+ *C* ” term when we wrote the antiderivative. The reason is that, according to the Fundamental Theorem of Calculus, Part 2, *any* antiderivative works. So, for convenience, we chose the antiderivative with $C=0.$ If we had chosen another antiderivative, the constant term would have canceled out. This always happens when evaluating a definite integral.

The region of the area we just calculated is depicted in Figure 5.28. Note that the region between the curve and the *x* -axis is all below the *x* -axis. Area is always positive, but a definite integral can still produce a negative number (a net signed area). For example, if this were a profit function, a negative number indicates the company is operating at a loss over the given interval.

*Figure 5.28* The evaluation of a definite integral can produce a negative value, even though area is always positive. (Alt: The graph of the parabola f(t) = t^2 – 4 over [-4, 4]. The area above the curve and below the x axis over [-2, 2] is shaded.)

### Example 5.21

#### Evaluating a Definite Integral Using the Fundamental Theorem of Calculus, Part 2

Evaluate the following integral using the Fundamental Theorem of Calculus, Part 2:

$$
\int _{1}^{9}\frac{x-1}{\sqrt{x}}dx.
$$

#### Solution

First, eliminate the radical by rewriting the integral using rational exponents. Then, separate the numerator terms by writing each one over the denominator:

$$
\int _{1}^{9}\frac{x-1}{x^{1\text{/}2}}dx=\int _{1}^{9}(\frac{x}{x^{1\text{/}2}}-\frac{1}{x^{1\text{/}2}})dx\text{.}
$$

Use the properties of exponents to simplify:

$$
\int _{1}^{9}(\frac{x}{x^{1\text{/}2}}-\frac{1}{x^{1\text{/}2}})dx=\int _{1}^{9}(x^{1\text{/}2}-x^{-1\text{/}2})dx\text{.}
$$

Now, integrate using the power rule:

$$
\begin{matrix} \\ \\ \int _{1}^{9}(x^{1\text{/}2}-x^{-1\text{/}2})dx & =(\frac{x^{3\text{/}2}}{\frac{3}{2}}-\frac{x^{1\text{/}2}}{\frac{1}{2}})|_{1}^{9} \\ \\ & =[\frac{(9)^{3\text{/}2}}{\frac{3}{2}}-\frac{(9)^{1\text{/}2}}{\frac{1}{2}}]-[\frac{(1)^{3\text{/}2}}{\frac{3}{2}}-\frac{(1)^{1\text{/}2}}{\frac{1}{2}}] \\ & =[\frac{2}{3}(27)-2(3)]-[\frac{2}{3}(1)-2(1)] \\ & =18-6-\frac{2}{3}+2 \\ & =\frac{40}{3}.\end{matrix}
$$

See Figure 5.29.

*Figure 5.29* The area under the curve from $x=1$ to $x=9$ can be calculated by evaluating a definite integral. (Alt: The graph of the function f(x) = (x-1) / sqrt(x) over [0,9]. The area under the graph over [1,9] is shaded.)

### Checkpoint 5.19

Use The Fundamental Theorem of Calculus, Part 2 to evaluate $\int _{1}^{2}x^{-4}dx.$

### Example 5.22

#### A Roller-Skating Race

James and Kathy are racing on roller skates. They race along a long, straight track, and whoever has gone the farthest after 5 sec wins a prize. If James can skate at a velocity of $f(t)=5+2t$ ft/sec and Kathy can skate at a velocity of $g(t)=10+\mathrm{cos}(\frac{π}{2}t)$ ft/sec, who is going to win the race?

#### Solution

We need to integrate both functions over the interval $[0,5]$ and see which value is bigger. For James, we want to calculate

$$
\int _{0}^{5}(5+2t)dt.
$$

Using the power rule, we have

$$
\begin{matrix}\int _{0}^{5}(5+2t)dt & =(5t+t^{2})|_{0}^{5} \\ & =(25+25)=50.\end{matrix}
$$

Thus, James has skated 50 ft after 5 sec. Turning now to Kathy, we want to calculate

$$
\int _{0}^{5}10+\mathrm{cos}(\frac{π}{2}t)dt.
$$

We know $\mathrm{sin} t$ is an antiderivative of $\mathrm{cos} t,$ so it is reasonable to expect that an antiderivative of $\mathrm{cos}(\frac{π}{2}t)$ would involve $\mathrm{sin}(\frac{π}{2}t).$ However, when we differentiate $\mathrm{sin}(\frac{π}{2}t),$ we get $\frac{π}{2}\mathrm{cos}(\frac{π}{2}t)$ as a result of the chain rule, so we have to account for this additional coefficient when we integrate. We obtain

$$
\begin{matrix}\int _{0}^{5}10+\mathrm{cos}(\frac{π}{2}t)dt & =(10t+\frac{2}{π}\mathrm{sin}(\frac{π}{2}t))|_{0}^{5} \\ & =(50+\frac{2}{π})-(0-\frac{2}{π}\mathrm{sin} 0) \\ & \approx 50.6.\end{matrix}
$$

Kathy has skated approximately 50.6 ft after 5 sec. Kathy wins, but not by much!

### Checkpoint 5.20

Suppose James and Kathy have a rematch, but this time the official stops the contest after only 3 sec. Does this change the outcome?

### Student Project

#### A Parachutist in Free Fall

*Figure 5.30* Skydivers can adjust the velocity of their dive by changing the position of their body during the free fall. (credit: Jeremy T. Lock) (Alt: Two skydivers free falling in the sky.)

Julie is an avid skydiver. She has more than 300 jumps under her belt and has mastered the art of making adjustments to her body position in the air to control how fast she falls. If she arches her back and points her belly toward the ground, she reaches a terminal velocity of approximately 120 mph (176 ft/sec). If, instead, she orients her body with her head straight down, she falls faster, reaching a terminal velocity of 150 mph (220 ft/sec).

Since Julie will be moving (falling) in a downward direction, we assume the downward direction is positive to simplify our calculations. Julie executes her jumps from an altitude of 12,500 ft. After she exits the aircraft, she immediately starts falling at a velocity given by $v(t)=32t.$ She continues to accelerate according to this velocity function until she reaches terminal velocity. After she reaches terminal velocity, her speed remains constant until she pulls her ripcord and slows down to land.

On her first jump of the day, Julie orients herself in the slower “belly down” position (terminal velocity is 176 ft/sec). Using this information, answer the following questions.

1. How long after she exits the aircraft does Julie reach terminal velocity?
2. Based on your answer to question 1, set up an expression involving one or more integrals that represents the distance Julie falls after 30 sec.
3. If Julie pulls her ripcord at an altitude of 3000 ft, how long does she spend in a free fall?
4. Julie pulls her ripcord at 3000 ft. It takes 5 sec for her parachute to open completely and for her to slow down, during which time she falls another 400 ft. After her canopy is fully open, her speed is reduced to 16 ft/sec. Find the total time Julie spends in the air, from the time she leaves the airplane until the time her feet touch the ground. On Julie’s second jump of the day, she decides she wants to fall a little faster and orients herself in the “head down” position. Her terminal velocity in this position is 220 ft/sec. Answer these questions based on this velocity:
5. How long does it take Julie to reach terminal velocity in this case?
6. Before pulling her ripcord, Julie reorients her body in the “belly down” position so she is not moving quite as fast when her parachute opens. If she begins this maneuver at an altitude of 4000 ft, how long does she spend in a free fall before beginning the reorientation? Some jumpers wear “wingsuits” (see Figure 5.31). These suits have fabric panels between the arms and legs and allow the wearer to glide around in a free fall, much like a flying squirrel. (Indeed, the suits are sometimes called “flying squirrel suits.”) When wearing these suits, terminal velocity can be reduced to about 30 mph (44 ft/sec), allowing the wearers a much longer time in the air. Wingsuit flyers still use parachutes to land; although the vertical velocities are within the margin of safety, horizontal velocities can exceed 70 mph, much too fast to land safely.

*Figure 5.31* The fabric panels on the arms and legs of a wingsuit work to reduce the vertical velocity of a skydiver’s fall. (credit: Richard Schneider) (Alt: A person falling in a wingsuit, which works to reduce the vertical velocity of a skydiver’s fall.)

Answer the following question based on the velocity in a wingsuit.

1. If Julie dons a wingsuit before her third jump of the day, and she pulls her ripcord at an altitude of 3000 ft, how long does she get to spend gliding around in the air?

## Section Exercises

Selected openly licensed end-of-section exercises from this OpenStax section. The complete set is on the source page.

Consider two athletes running at variable speeds $v_{1}(t)$ and $v_{2}(t).$ The runners start and finish a race at exactly the same time. Explain why the two runners must be going the same speed at some point.

**Exercise.** 144. Consider two athletes running at variable speeds $v_{1}(t)$ and $v_{2}(t).$ The runners start and finish a race at exactly the same time. Explain why the two runners must be going the same speed at some point.

**Exercise.** 145. Two mountain climbers start their climb at base camp, taking two different routes, one steeper than the other, and arrive at the peak at exactly the same time. Is it necessarily true that, at some point, both climbers increased in altitude at the same rate?

**Exercise.** 146. To get on a certain toll road a driver has to take a card that lists the mile entrance point. The card also has a timestamp. When going to pay the toll at the exit, the driver is surprised to receive a speeding ticket along with the toll. Explain how this can happen.

**Exercise.** 147. Set $F(x)=\int _{1}^{x}(1-t)dt.$ Find $F^{'}\text{(}2)$ and the average value of $F^{\text{'}}$ over $[1,2].$

**Exercise.** 148. $\frac{d}{dx}\int _{1}^{x}e^{-t^{2}}dt$

**Exercise.** 149. $\frac{d}{dx}\int _{1}^{x}e^{\mathrm{cos} t}dt$

**Exercise.** 150. $\frac{d}{dx}\int _{3}^{x}\sqrt{9-y^{2}}dy$

**Exercise.** 151. $\frac{d}{dx}\int _{3}^{x}\frac{ds}{\sqrt{16-s^{2}}}$
