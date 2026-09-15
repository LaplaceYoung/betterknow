# 5.5 Substitution

Title: 5.5 Substitution
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/5-5-substitution
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 5.5 Substitution

## 5.5   Substitution

### Learning Objectives

- 5.5.1 Use substitution to evaluate indefinite integrals.
- 5.5.2 Use substitution to evaluate definite integrals.

The Fundamental Theorem of Calculus gave us a method to evaluate integrals without using Riemann sums. The drawback of this method, though, is that we must be able to find an antiderivative, and this is not always easy. In this section we examine a technique, called integration by substitution, to help us find antiderivatives. Specifically, this method helps us find antiderivatives when the integrand is the result of a chain-rule derivative.

At first, the approach to the substitution procedure may not appear very obvious. However, it is primarily a visual task---that is, the integrand shows you what to do; it is a matter of recognizing the form of the function. So, what are we supposed to see? We are looking for an integrand of the form $f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right)dx.$ For example, in the integral $\left. \int{\left( {x^{2} - 3} \right)^{3}2xdx} \right.,$ we have $f(x) = x^{3},g(x) = x^{2} - 3,$ and $g'(x) = 2x.$ Then,

$$f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right) = \left( {x^{2} - 3} \right)^{3}\left( {2x} \right),$$

and we see that our integrand is in the correct form.

The method is called *substitution* because we substitute part of the integrand with the variable *u* and part of the integrand with *du*. It is also referred to as change of variables because we are changing variables to obtain an expression that is easier to work with for applying the integration rules.

### Theorem 5.7

#### Substitution with Indefinite Integrals

Let $u = g(x),$ where $g'\left. \text{(}x \right)$ is continuous over an interval, let $f(x)$ be continuous over the corresponding range of *g*, and let $F(x)$ be an antiderivative of $f(x).$ Then,

$$\begin{array}{cl}
\left. \int{f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right)dx} \right. & {= {\int f}(u)du} \\
 & {= F(u) + C} \\
 & {= F\left( {g(x)} \right) + C.}
\end{array}$$

(5.19)

### Proof

Let *f*, *g*, *u*, and *F* be as specified in the theorem. Then

$$\begin{array}{cl}
{\frac{d}{dx}F(g(x))} & {= F'\left. \text{(}{g(x)} \right)g'\left. \text{(}x \right)} \\
 & {= f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right).}
\end{array}$$

Integrating both sides with respect to *x*, we see that

$${\int{f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right)dx}} = F\left( {g(x)} \right) + C.$$

If we now substitute $u = g(x),$ and $du = g'(x)dx,$ we get

$$\begin{array}{cl}
{\int{f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right)dx}} & {= {\int f}(u)du} \\
 & {= F(u) + C} \\
 & {= F\left( {g(x)} \right) + C.}
\end{array}$$

□

Returning to the problem we looked at originally, we let $u = x^{2} - 3$ and then $du = 2xdx.$ Rewrite the integral in terms of *u*:

$$\left. \int{\underset{u}{\underbrace{\left( x^{2} - 3 \right)}}}^{3} \right.\underset{du}{\underbrace{(2xdx)}} = \int u^{3}du.$$

Using the power rule for integrals, we have

$$\left. \int{u^{3}du = \frac{u^{4}}{4} + C} \right..$$

Substitute the original expression for *x* back into the solution:

$$\frac{u^{4}}{4} + C = \frac{\left( {x^{2} - 3} \right)^{4}}{4} + C.$$

We can generalize the procedure in the following Problem-Solving Strategy.

### Problem-Solving Strategy

#### Integration by Substitution

1.  Look carefully at the integrand and select an expression $g(x)$ within the integrand to set equal to *u*. Let's select $g(x)$ such that $g'\left. \text{(}x \right)$ is also part of the integrand.
2.  Substitute $u = g(x)$ and $du = g'\left. \text{(}x \right)dx$ into the integral.
3.  We should now be able to evaluate the integral with respect to *u*. If the integral can't be evaluated we need to go back and select a different expression to use as *u*.
4.  Evaluate the integral in terms of *u*.
5.  Write the result in terms of *x* and the expression $g(x).$

### Example  5.30

#### Using Substitution to Find an Antiderivative

Use substitution to find the antiderivative $\left. \int{6x\left( {3x^{2} + 4} \right)^{4}dx} \right..$

#### Solution

The first step is to choose an expression for *u*. We choose $u = 3x^{2} + 4$ because then $du = 6xdx,$ and we already have *du* in the integrand. Write the integral in terms of *u*:

$$\left. \int{6x\left( {3x^{2} + 4} \right)^{4}dx} \right. = {\int{u^{4}du}}.$$

Remember that *du* is the derivative of the expression chosen for *u*, regardless of what is inside the integrand. Now we can evaluate the integral with respect to *u*:

$$\begin{array}{ll}
\left. \int{u^{4}du} \right. & {= \frac{u^{5}}{5} + C} \\
 & \\
 & \\
 & {= \frac{\left( {3x^{2} + 4} \right)^{5}}{5} + C.}
\end{array}$$

#### Analysis

We can check our answer by taking the derivative of the result of integration. We should obtain the integrand. Picking a value for *C* of 1, we let $y = \frac{1}{5}\left( {3x^{2} + 4} \right)^{5} + 1.$ We have

$$y = \frac{1}{5}\left( {3x^{2} + 4} \right)^{5} + 1,$$

$$\begin{array}{cl}
 & \\
y' & {= \left( \frac{1}{5} \right)5\left( {3x^{2} + 4} \right)^{4}6x} \\
 & {= 6x\left( {3x^{2} + 4} \right)^{4}.}
\end{array}$$

This is exactly the expression we started with inside the integrand.

### Checkpoint 5.25

Use substitution to find the antiderivative $\left. \int{3x^{2}\left( {x^{3} - 3} \right)^{2}dx} \right..$

Sometimes we need to adjust the constants in our integral if they don't match up exactly with the expressions we are substituting.

### Example  5.31

#### Using Substitution with Alteration

Use substitution to find $\left. \int{z\sqrt{z^{2} - 5}dz} \right..$

#### Solution

Rewrite the integral as $\left. \int{z\left( {z^{2} - 5} \right)^{1\text{/}2}dz} \right..$ Let $u = z^{2} - 5$ and $du = 2z\ dz.$ Now we have a problem because $du = 2z\ dz$ and the original expression has only $z\ dz.$ We have to alter our expression for *du* or the integral in *u* will be twice as large as it should be. If we multiply both sides of the *du* equation by $\frac{1}{2}.$ we can solve this problem. Thus,

$$\begin{aligned}
 & \\
u & {= z^{2} - 5} \\
{du} & {= 2z\ dz} \\
{\frac{1}{2}du} & {= \frac{1}{2}\left( {2z} \right)dz = z\ dz.}
\end{aligned}$$

Write the integral in terms of *u*, but pull the $\frac{1}{2}$ outside the integration symbol:

$$\left. \int{z\left( {z^{2} - 5} \right)^{1\text{/}2}dz =} \right.\frac{1}{2}{\int{u^{1\text{/}2}du.}}$$

Integrate the expression in *u*:

$$\begin{array}{cl}
 & \\
{\frac{1}{2}{\int{u^{1\text{/}2}du}}} & {= \left( \frac{1}{2} \right)\frac{u^{3\text{/}2}}{\frac{3}{2}} + C} \\
 & \\
 & {= \left( \frac{1}{2} \right)\left( \frac{2}{3} \right)u^{3\text{/}2} + C} \\
 & {= \frac{1}{3}u^{3\text{/}2} + C} \\
 & {= \frac{1}{3}\left( {z^{2} - 5} \right)^{3\text{/}2} + C.}
\end{array}$$

### Checkpoint 5.26

Use substitution to find $\left. \int{x^{2}\left( {x^{3} + 5} \right)^{9}dx} \right..$

### Example  5.32

#### Using Substitution with Integrals of Trigonometric Functions

Use substitution to evaluate the integral $\left. \int{\frac{\text{sin}\mspace{2mu} t}{\text{cos}^{3}t}dt} \right..$

#### Solution

We know the derivative of $\text{cos}\mspace{2mu} t$ is $\text{−}\text{sin}\mspace{2mu} t,$ so we set $u = \text{cos}\mspace{2mu} t.$ Then $du = \text{−}\text{sin}\mspace{2mu} tdt.$ Substituting into the integral, we have

$$\left. \int{\frac{\text{sin}\mspace{2mu} t}{\text{cos}^{3}t}dt = \text{−}\left. \int\frac{du}{u^{3}} \right.} \right..$$

Evaluating the integral, we get

$$\begin{array}{cl}
 & \\
 & \\
{\text{−}\left. \int\frac{du}{u^{3}} \right.} & {= \text{−}{\int{u^{-3}du}}} \\
 & {= \text{−}\left( {- \frac{1}{2}} \right)u^{-2} + C.}
\end{array}$$

Putting the answer back in terms of *t*, we get

$$\begin{array}{cl}
\left. \int{\frac{\text{sin}\mspace{2mu} t}{\text{cos}^{3}t}dt} \right. & {= \frac{1}{2u^{2}} + C} \\
 & \\
 & {= \frac{1}{2\text{cos}^{2}t} + C.}
\end{array}$$

### Checkpoint 5.27

Use substitution to evaluate the integral $\left. \int{\frac{\text{cos}\mspace{2mu} t}{\text{sin}^{2}t}dt.} \right.$

Sometimes we need to manipulate an integral in ways that are more complicated than just multiplying or dividing by a constant. We need to eliminate all the expressions within the integrand that are in terms of the original variable. When we are done, *u* should be the only variable in the integrand. In some cases, this means solving for the original variable in terms of *u*. This technique should become clear in the next example.

### Example  5.33

#### Finding an Antiderivative Using *u*-Substitution

Use substitution to find the antiderivative $\left. \int{\frac{x}{\sqrt{x - 1}}dx.} \right.$

#### Solution

If we let $u = x - 1,$ then $du = dx.$ But this does not account for the *x* in the numerator of the integrand. We need to express *x* in terms of *u*. If $u = x - 1,$ then $x = u + 1.$ Now we can rewrite the integral in terms of *u*:

$$\begin{array}{ll}
\left. \int{\frac{x}{\sqrt{x - 1}}dx} \right. & {= \left. \int{\frac{u + 1}{\sqrt{u}}du} \right.} \\
 & \\
 & {= \left. \int{\sqrt{u} + \frac{1}{\sqrt{u}}du} \right.} \\
 & {= \left. \int{\left( {u^{1\text{/}2} + u^{-1\text{/}2}} \right)du} \right..}
\end{array}$$

Then we integrate in the usual way, replace *u* with the original expression, and factor and simplify the result. Thus,

$$\begin{array}{cl}
\left. \int{\left( {u^{1\text{/}2} + u^{-1\text{/}2}} \right)du} \right. & {= \frac{2}{3}u^{3\text{/}2} + 2u^{1\text{/}2} + C} \\
 & \\
 & {= \frac{2}{3}\left( {x - 1} \right)^{3\text{/}2} + 2\left( {x - 1} \right)^{1\text{/}2} + C} \\
 & {= \left( {x - 1} \right)^{1\text{/}2}\left\lbrack {\frac{2}{3}\left( {x - 1} \right) + 2} \right\rbrack + C} \\
 & {= \left( {x - 1} \right)^{1\text{/}2}{\left( {\frac{2}{3}x - \frac{2}{3} + \frac{6}{3}} \right) + C}} \\
 & {= \left( {x - 1} \right)^{1\text{/}2}{\left( {\frac{2}{3}x + \frac{4}{3}} \right) + C}} \\
 & {= \frac{2}{3}\left( {x - 1} \right)^{1\text{/}2}\left( {x + 2} \right) + C.}
\end{array}$$

### Checkpoint 5.28

Use substitution to evaluate the indefinite integral $\left. \int{\text{cos}^{3}t\mspace{2mu}\text{sin}\mspace{2mu} t\ dt} \right..$

### Substitution for Definite Integrals

Substitution can be used with definite integrals, too. However, using substitution to evaluate a definite integral requires a change to the limits of integration. If we change variables in the integrand, the limits of integration change as well.

### Theorem 5.8

#### Substitution with Definite Integrals

Let $u = g(x)$ and let $g'$ be continuous over an interval $\left\lbrack {a,b} \right\rbrack,$ and let *f* be continuous over the range of $u = g(x).$ Then,

$${\int_{a}^{b}{f\left( {g(x)} \right)g'\left. \text{(}x \right)dx = {\int_{g{(a)}}^{g{(b)}}{f(u)du}}}}.$$

Although we will not formally prove this theorem, we justify it with some calculations here. From the substitution rule for indefinite integrals, if $F(x)$ is an antiderivative of $f(x),$ we have

$$\int{f\left( {g(x)} \right)g'\text{(}x)dx = F\left( {g(x)} \right) + C.}$$

$$\begin{array}{cl}
{\int_{a}^{b}{f\left\lbrack {g(x)} \right\rbrack g'\left. \text{(}x \right)dx}} & {= \left. {F\left( {g(x)} \right)} \right|_{x = a}^{x = b}} \\
 & {= F\left( {g(b)} \right) - F\left( {g(a)} \right)} \\
 & {= \left. {F(u)} \right|_{u = g(a)}^{u = g(b)}} \\
 & \\
 & \\
 & {= {\int_{g(a)}^{g(b)}f}(u)du,}
\end{array}$$

(5.20)

and we have the desired result.

### Example  5.34

#### Using Substitution to Evaluate a Definite Integral

Use substitution to evaluate ${\int_{0}^{1}{x^{2}\left( {1 + 2x^{3}} \right)^{5}}}dx.$

#### Solution

Let $u = 1 + 2x^{3},$ so $du = 6x^{2}dx.$ Since the original function includes one factor of *x*^2^ and $du = 6x^{2}dx,$ multiply both sides of the *du* equation by $1\text{/}6.$ Then,

$$\begin{array}{lll}
{du} & = & {6x^{2}dx} \\
{\frac{1}{6}du} & = & {x^{2}dx.}
\end{array}$$

To adjust the limits of integration, note that when $x = 0,u = 1 + 2(0) = 1,$ and when $x = 1,u = 1 + 2(1) = 3.$ Then

$${\int_{0}^{1}{x^{2}\left( {1 + 2x^{3}} \right)^{5}dx = \frac{1}{6}{\int_{1}^{3}{u^{5}du}}}}.$$

Evaluating this expression, we get

$$\begin{array}{cl}
 & \\
 & \\
{\frac{1}{6}{\int_{1}^{3}{u^{5}du}}} & {= \left( \frac{1}{6} \right)\left( \frac{u^{6}}{6} \right)|_{1}^{3}} \\
 & {= \frac{1}{36}\left\lbrack {(3)^{6} - (1)^{6}} \right\rbrack} \\
 & {= \frac{182}{9}.}
\end{array}$$

### Checkpoint 5.29

Use substitution to evaluate the definite integral ${\int_{-1}^{0}{y\left( {2y^{2} - 3} \right)^{5}dy}}.$

### Example  5.35

#### Using Substitution with an Exponential Function

Use substitution to evaluate ${\int_{0}^{1}{xe^{4x^{2} + 3}dx}}.$

#### Solution

Let $u = 4x^{2} + 3.$ Then, $du = 8xdx.$ To adjust the limits of integration, we note that when $x = 0,u = 3,$ and when $x = 1,u = 7.$ So our substitution gives

$$\begin{array}{cl}
{\int_{0}^{1}{xe^{4x^{2} + 3}dx}} & {= \frac{1}{8}{\int_{3}^{7}{e^{u}du}}} \\
 & \\
 & {= \frac{1}{8}e^{u}|_{3}^{7}} \\
 & {= \frac{e^{7} - e^{3}}{8}} \\
 & {\approx 134.568.}
\end{array}$$

### Checkpoint 5.30

Use substitution to evaluate ${\int_{0}^{1}{x^{2}\text{cos}\left( {\frac{\pi}{2}x^{3}} \right)dx}}.$

Substitution may be only one of the techniques needed to evaluate a definite integral. All of the properties and rules of integration apply independently, and trigonometric functions may need to be rewritten using a trigonometric identity before we can apply substitution. Also, we have the option of replacing the original expression for *u* after we find the antiderivative, which means that we do not have to change the limits of integration. These two approaches are shown in Example 5.36.

### Example  5.36

#### Using Substitution to Evaluate a Trigonometric Integral

Use substitution to evaluate ${\int_{0}^{\pi\text{/}2}{\text{cos}^{2}\theta\ d\theta}}.$

#### Solution

Let us first use a trigonometric identity to rewrite the integral. The trig identity $\text{cos}^{2}\theta = \frac{1 + \text{cos}\mspace{2mu} 2\theta}{2}$ allows us to rewrite the integral as

$${\int_{0}^{\pi\text{/}2}{\text{cos}^{2}\theta d\theta}} = {\int_{0}^{\pi\text{/}2}{\frac{1 + \text{cos}\mspace{2mu} 2\theta}{2}d\theta.}}$$

Then,

$$\begin{array}{cl}
{{\int_{0}^{\pi\text{/}2}\left( \frac{1 + \text{cos}\mspace{2mu} 2\theta}{2} \right)}d\theta} & {= {\int_{0}^{\pi\text{/}2}{\left( {\frac{1}{2} + \frac{1}{2}\text{cos}\mspace{2mu} 2\theta} \right)d\theta}}} \\
 & \\
 & \\
 & {= \frac{1}{2}{\int_{0}^{\pi\text{/}2}{d\theta}} + \frac{1}{2}{\int_{0}^{\pi\text{/}2}{\text{cos}\mspace{2mu} 2\theta d\theta.}}}
\end{array}$$

We can evaluate the first integral as it is, but we need to make a substitution to evaluate the second integral. Let $u = 2\theta.$ Then, $du = 2d\theta,$ or $\frac{1}{2}du = d\theta.$ Also, when $\theta = 0,u = 0,$ and when $\theta = \pi\text{/}2,u = \pi.$ Expressing the second integral in terms of *u*, we have

$$\begin{array}{cl}
 & \\
 & \\
{\frac{1}{2}{\int_{0}^{\pi\text{/}2}{d\theta + \frac{1}{2}{\int_{0}^{\pi\text{/}2}{\text{cos}\mspace{2mu} 2\theta d\theta}}}}} & {= \frac{1}{2}{\int_{0}^{\pi\text{/}2}{d\theta + \frac{1}{2}\left( \frac{1}{2} \right){\int_{0}^{\pi}{\text{cos}\mspace{2mu} udu}}}}} \\
 & {= \frac{\theta}{2}{|_{\theta = 0}^{\theta = \pi\text{/}2} + \frac{1}{4}\text{sin}\mspace{2mu} u|_{u = 0}^{u = \pi}}} \\
 & {= \left( {\frac{\pi}{4} - 0} \right) + \left( {0 - 0} \right) = \frac{\pi}{4}.}
\end{array}$$

### Section 5.5 Exercises

Why is *u*-substitution referred to as *change of variable*?

255.

2\. If $f = g \circ h,$ when reversing the chain rule, $\frac{d}{dx}(g \circ h)(x) = g'\left. \text{(}{h(x)} \right)h'\text{(}x),$ should you take $u = g(x)$ or $u = h(x)?$

In the following exercises, verify each identity using differentiation. Then, using the indicated *u*-substitution, identify *f* such that the integral takes the form ${\int{f(u)du}}.$

$\left. \int{x\sqrt{x + 1}} \right.dx = \frac{2}{15}\left( {x + 1} \right)^{3\text{/}2}\left( {3x - 2} \right) + C;u = x + 1$

257.

For $x > 1:{\left. \int{\frac{x^{2}}{\sqrt{x - 1}}dx} \right. = \frac{2}{15}\sqrt{x - 1}\left( {3x^{2} + 4x + 8} \right) + C;u = x - 1}$

${\int{x\sqrt{4x^{2} + 9}dx = \frac{1}{12}\left( {4x^{2} + 9} \right)^{3\text{/}2} + C}};u = 4x^{2} + 9$

259.

$\left. \int{\frac{x}{\sqrt{4x^{2} + 9}}dx = \frac{1}{4}\sqrt{4x^{2} + 9} + C} \right.;u = 4x^{2} + 9$

$\left. \int{\frac{x}{{(4x^{2} + 9)}^{2}}dx = - \frac{1}{8(4x^{2} + 9)}} \right.;u = 4x^{2} + 9$

In the following exercises, find the antiderivative using the indicated substitution.

261.

${\int{\left( {x + 1} \right)^{4}dx}};u = x + 1$

${\int{\left( {x - 1} \right)^{5}dx}};u = x - 1$

263.

${\int{\left( {2x - 3} \right)^{-7}dx}};u = 2x - 3$

${\int{\left( {3x - 2} \right)^{-11}dx}};u = 3x - 2$

265.

$\left. \int{\frac{x}{\sqrt{x^{2} + 1}}dx} \right.;u = x^{2} + 1$

$\left. \int{\frac{x}{\sqrt{1 - x^{2}}}dx} \right.;u = 1 - x^{2}$

267.

${\int{\left( {x - 1} \right)\left( {x^{2} - 2x} \right)^{3}dx}};u = x^{2} - 2x$

${\int{\left( {x^{2} - 2x} \right)\left( {x^{3} - 3x^{2}} \right)^{2}dx}};u = x^{3}–3x^{2}$

269.

${\int{\text{cos}^{3}\theta d\theta}};u = \text{sin}\mspace{2mu}\theta$ $\text{(}Hint\text{:}\ \text{cos}^{2}\theta = 1 - \text{sin}^{2}\theta\text{)}$

${\int{\text{sin}^{3}\theta d\theta}};u = \text{cos}\mspace{2mu}\theta$ $\text{(}Hint\text{:}\ \text{sin}^{2}\theta = 1 - \text{cos}^{2}\theta\text{)}$

In the following exercises, use a suitable change of variables to determine the indefinite integral.

271.

$\int{x\left( {1 - x} \right)^{99}dx}$

$\int{t\left( {1 - t^{2}} \right)^{10}dt}$

273.

$\int{\left( {11x - 7} \right)^{-3}dx}$

$\int{\left( {7x - 11} \right)^{4}dx}$

275.

$\int{\text{cos}^{3}\theta\mspace{2mu}\text{sin}\mspace{2mu}\theta d\theta}$

$\int{\text{sin}^{7}\theta\mspace{2mu}\text{cos}\mspace{2mu}\theta d\theta}$

277.

$\int{\text{cos}^{2}\left( {\pi t} \right)\text{sin}\left( {\pi t} \right)dt}$

$\int{\text{sin}^{2}x\text{cos}^{3}xdx}$ $\text{(}Hint\text{:}\ \text{sin}^{2}x + \text{cos}^{2}x = 1\text{)}$

279.

$\int{t\mspace{2mu}\text{sin}\left( t^{2} \right)\text{cos}\left( t^{2} \right)dt}$

${\int t^{2}}\text{cos}^{2}\left( t^{3} \right)\text{sin}\left( t^{3} \right)dt$

281.

$\left. \int{\frac{x^{2}}{\left( {x^{3} - 3} \right)^{2}}dx} \right.$

$\left. \int{\frac{x^{3}}{\sqrt{1 - x^{2}}}dx} \right.$

283.

$\left. \int{\frac{y^{5}}{\left( {1 - y^{3}} \right)^{3\text{/}2}}dy} \right.$

${\int{\text{cos}\mspace{2mu}\theta\left( {1 - \text{cos}\mspace{2mu}\theta} \right)}}^{99}\text{sin}\mspace{2mu}\theta d\theta$

285.

${\int\left( {1 - \text{cos}^{3}\theta} \right)}^{10}\text{cos}^{2}\theta\mspace{2mu}\text{sin}\mspace{2mu}\theta d\theta$

$\int{\left( {\text{cos}\mspace{2mu}\theta - 1} \right)\left( {\text{cos}^{2}\theta - 2\mspace{2mu}\text{cos}\mspace{2mu}\theta} \right)^{3}\text{sin}\mspace{2mu}\theta d\theta}$

287.

$\int{\left( {\text{sin}^{2}\theta - 2\mspace{2mu}\text{sin}\mspace{2mu}\theta} \right)\left( {\text{sin}^{3}\theta - 3\text{sin}^{2}\theta} \right)^{3}\text{cos}\mspace{2mu}\theta d\theta}$

In the following exercises, use a calculator to estimate the area under the curve using left Riemann sums with 50 terms, then use substitution to solve for the exact answer.

**\[T\]** $y = 3\left( {1 - x} \right)^{2}$ over $\left\lbrack {0,2} \right\rbrack$

289.

**\[T\]** $y = x\left( {1 - x^{2}} \right)^{3}$ over $\left\lbrack {-1,2} \right\rbrack$

**\[T\]** $y = \text{sin}\mspace{2mu} x\left( {1 - \text{cos}\mspace{2mu} x} \right)^{2}$ over $\left\lbrack {0,\pi} \right\rbrack$

291.

**\[T\]** $y = \frac{x}{\left( {x^{2} + 1} \right)^{2}}$ over $\left\lbrack {-1,1} \right\rbrack$

In the following exercises, use a change of variables to evaluate the definite integral.

${\int_{0}^{1}{x\sqrt{1 - x^{2}}}}dx$

293.

$\int_{0}^{1}{\frac{x}{\sqrt{1 + x^{2}}}dx}$

$\int_{0}^{2}{\frac{t}{\sqrt{5 + t^{2}}}dt}$

295.

$\int_{0}^{1}{\frac{t^{2}}{\sqrt{1 + t^{3}}}dt}$

$\int_{0}^{\pi\text{/}4}{\text{sec}^{2}\theta\mspace{2mu}\text{tan}\mspace{2mu}\theta d\theta}$

297.

$\int_{0}^{\pi\text{/}4}{\frac{\text{sin}\mspace{2mu}\theta}{\text{cos}^{4}\theta}d\theta}$

In the following exercises, evaluate the indefinite integral $\int{f(x)dx}$ with constant $C = 0$ using *u*-substitution. Then, graph the function and the antiderivative over the indicated interval. If possible, estimate a value of *C* that would need to be added to the antiderivative to make it equal to the definite integral $F(x) = {\int_{a}^{x}{f(t)dt}},$ with *a* the left endpoint of the given interval.

**\[T\]** $\int{\left( {2x + 1} \right)e^{x^{2} + x - 6}dx}$ over $\left\lbrack {-3,2} \right\rbrack$

299.

**\[T\]** $\left. \int{\frac{\text{cos}\left( {\text{ln}\left( {2x} \right)} \right)}{x}dx} \right.$ on $\left\lbrack {0,2} \right\rbrack$

**\[T\]** $\left. \int{\frac{3x^{2} + 2x + 1}{\sqrt{x^{3} + x^{2} + x + 4}}dx} \right.$ over $\left\lbrack {-1,2} \right\rbrack$

301.

**\[T\]** $\left. \int{\frac{\text{sin}\mspace{2mu} x}{\text{cos}^{3}x}dx} \right.$ over $\left\lbrack {- \frac{\pi}{3},\frac{\pi}{3}} \right\rbrack$

**\[T\]** $\int{\left( {x + 2} \right)e^{\text{−}x^{2} - 4x + 3}dx}$ over $\left\lbrack {-5,1} \right\rbrack$

303.

**\[T\]** ${\int{3x^{2}\sqrt{2x^{3} + 1}}}dx$ over $\left\lbrack {0,1} \right\rbrack$

If $h(a) = h(b)$ in $\int_{a}^{b}g'\left( h(x) \right)h'(x)dx,$ what can you say about the value of the integral?

305.

Is the substitution $u = 1 - x^{2}$ in the definite integral $\int_{0}^{2}{\frac{x}{1 - x^{2}}dx}$ okay? If not, why not?

In the following exercises, use a change of variables to show that each definite integral is equal to zero.

$\int_{0}^{\pi}{\text{cos}^{2}\left( {2\theta} \right)\text{sin}\left( {2\theta} \right)d\theta}$

307.

$\int_{0}^{\sqrt{\pi}}{t\mspace{2mu}\text{cos}\left( t^{2} \right)\text{sin}\left( t^{2} \right)dt}$

$\int_{0}^{1}{\left( {1 - 2t} \right)dt}$

309.

$\int_{0}^{1}{\frac{1 - 2t}{\left( {1 + \left( {t - \frac{1}{2}} \right)^{2}} \right)}dt}$

$\int_{0}^{\pi}{\text{sin}\left( \left( {t - \frac{\pi}{2}} \right)^{3} \right)\text{cos}\left( {t - \frac{\pi}{2}} \right)dt}$

311.

$\int_{0}^{2}{\left( {1 - t} \right)\text{cos}\left( {\pi t} \right)dt}$

$\int_{\pi\text{/}4}^{3\pi\text{/}4}{\text{sin}^{2}t\mspace{2mu}\text{cos}\mspace{2mu} tdt}$

313.

Show that the average value of $f(x)$ over an interval $\left\lbrack {a,b} \right\rbrack$ is the same as the average value of $f\left( {cx} \right)$ over the interval $\left\lbrack {\frac{a}{c},\frac{b}{c}} \right\rbrack$ for $c > 0.$

Find the area under the graph of $f(t) = \frac{t}{\left( {1 + t^{2}} \right)^{a}}$ between $t = 0$ and $t = x$ where $a > 0$ and $a \neq 1$ is fixed, and evaluate the limit as $x\rightarrow\infty.$

315.

Find the area under the graph of $g(t) = \frac{t}{\left( {1 - t^{2}} \right)^{a}}$ between $t = 0$ and $t = x,$ where $0 < x < 1$ and $a > 0$ is fixed. Evaluate the limit as $x\rightarrow 1.$

The area of a semicircle of radius 1 can be expressed as ${\int_{-1}^{1}{\sqrt{1 - x^{2}}dx}}.$ Use the substitution $x = \text{cos}\mspace{2mu} t$ to express the area of a semicircle as the integral of a trigonometric function. You do not need to compute the integral.

317.

The area of the top half of an ellipse with a major axis that is the *x*-axis from $x = - a$ to $x = a$ and with a minor axis that is the *y*-axis from $y = \text{−}b$ to $y = b$ can be written as ${\int_{\text{−}a}^{a}{b\sqrt{1 - \frac{x^{2}}{a^{2}}}dx}}.$ Use the substitution $x = a\mspace{2mu}\text{cos}\mspace{2mu} t$ to express this area in terms of an integral of a trigonometric function. You do not need to compute the integral.

**\[T\]** The following graph is of a function of the form $f(t) = a\mspace{2mu}\text{sin}(nt) + b\mspace{2mu}\text{sin}(mt).$ Estimate the coefficients *a* and *b*, and the frequency parameters *n* and *m*. Use these estimates to approximate ${\int_{0}^{\pi}{f(t)dt}}.$

![A graph of a function of the given form over \[0, 2pi\], which has six turning points. They are located at just before pi/4, just after pi/2, between 3pi/4 and pi, between pi and 5pi/4, just before 3pi/2, and just after 7pi/4 at about 3, -2, 1, -1, 2, and -3. It begins at the origin and ends at (2pi, 0). It crosses the x axis between pi/4 and pi/2, just before 3pi/4, pi, just after 5pi/4, and between 3pi/2 and 4pi/4.](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/f025d3a168ebb9204c5f510f11f9886172c8c990)

319.

**\[T\]** The following graph is of a function of the form $f(x) = a\mspace{2mu}\text{cos}\left( {nt} \right) + b\mspace{2mu}\text{cos}\left( {mt} \right).$ Estimate the coefficients *a* and *b* and the frequency parameters *n* and *m*. Use these estimates to approximate ${\int_{0}^{\frac{\pi}{2}}{f(t)dt}}.$

![The graph of a function of the given form over \[0, 2pi\]. It begins at (0,1) and ends at (2pi, 1). It has five turning points, located just after pi/4, between pi/2 and 3pi/4, pi, between 5pi/4 and 3pi/2, and just before 7pi/4 at about -1.5, 2.5, -3, 2.5, and -1. It crosses the x axis between 0 and pi/4, just before pi/2, just after 3pi/4, just before 5pi/4, just after 3pi/2, and between 7pi/4 and 2pi.](/apps/image-cdn/v1/f=webp/apps/archive/20260604.144757/resources/a33e7dc767e74b5c8d6042a8bac55ed7fec536ed)
