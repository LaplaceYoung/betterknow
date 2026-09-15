# 4.10 Antiderivatives

Title: 4.10 Antiderivatives
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/4-10-antiderivatives
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 4.10 Antiderivatives

## 4.10   Antiderivatives

### Learning Objectives

- 4.10.1 Find the general antiderivative of a given function.
- 4.10.2 Explain the terms and notation used for an indefinite integral.
- 4.10.3 State the power rule for integrals.
- 4.10.4 Use antidifferentiation to solve simple initial-value problems.

At this point, we have seen how to calculate derivatives of many functions and have been introduced to a variety of their applications. We now ask a question that turns this process around: Given a function $f,$ how do we find a function with the derivative $f$ and why would we be interested in such a function?

We answer the first part of this question by defining antiderivatives. The antiderivative of a function $f$ is a function with a derivative $f.$ Why are we interested in antiderivatives? The need for antiderivatives arises in many situations, and we look at various examples throughout the remainder of the text. Here we examine one specific example that involves rectilinear motion. In our examination in Derivatives of rectilinear motion, we showed that given a position function $s(t)$ of an object, then its velocity function $v(t)$ is the derivative of $s(t)$---that is, $v(t) = s'(t).$ Furthermore, the acceleration $a(t)$ is the derivative of the velocity $v(t)$---that is, $a(t) = v'(t) = s^{''}(t).$ Now suppose we are given an acceleration function $a,$ but not the velocity function $v$ or the position function $s.$ Since $a(t) = v'(t),$ determining the velocity function requires us to find an antiderivative of the acceleration function. Then, since $v(t) = s'(t),$ determining the position function requires us to find an antiderivative of the velocity function. Rectilinear motion is just one case in which the need for antiderivatives arises. We will see many more examples throughout the remainder of the text. For now, let's look at the terminology and notation for antiderivatives, and determine the antiderivatives for several types of functions. We examine various techniques for finding antiderivatives of more complicated functions later in the text (Introduction to Techniques of Integration).

### The Reverse of Differentiation

At this point, we know how to find derivatives of various functions. We now ask the opposite question. Given a function $f,$ how can we find a function with derivative $f?$ If we can find a function $F$ with derivative $f,$ we call $F$ an antiderivative of $f.$

### Definition

A function $F$ is an antiderivative of the function $f$ if

$$F'(x) = f(x)$$

for all $x$ in the domain of $f.$

Consider the function $f(x) = 2x.$ Knowing the power rule of differentiation, we conclude that $F(x) = x^{2}$ is an antiderivative of $f$ since $F'(x) = 2x.$ Are there any other antiderivatives of $f?$ Yes; since the derivative of any constant $C$ is zero, $x^{2} + C$ is also an antiderivative of $2x.$ Therefore, $x^{2} + 5$ and $x^{2} - \sqrt{2}$ are also antiderivatives. Are there any others that are not of the form $x^{2} + C$ for some constant $C?$ The answer is no. From Corollary $2$ of the Mean Value Theorem, we know that if $F$ and $G$ are differentiable functions such that $F'(x) = G'(x),$ then $F(x) - G(x) = C$ for some constant $C.$ This fact leads to the following important theorem.

### Theorem 4.14

#### General Form of an Antiderivative

Let $F$ be an antiderivative of $f$ over an interval $I.$ Then,

i.  for each constant $C,$ the function $F(x) + C$ is also an antiderivative of $f$ over $I;$
ii. if $G$ is an antiderivative of $f$ over $I,$ there is a constant $C$ for which $G(x) = F(x) + C$ over $I.$

In other words, the most general form of the antiderivative of $f$ over $I$ is $F(x) + C.$

We use this fact and our knowledge of derivatives to find all the antiderivatives for several functions.

### Example  4.50

#### Finding Antiderivatives

For each of the following functions, find all antiderivatives.

a.  $f(x) = 3x^{2}$
b.  $f(x) = \frac{1}{x}$
c.  $f(x) = \text{cos}\mspace{2mu} x$
d.  $f(x) = e^{x}$

#### Solution

a.  Because\

    :::
    $$\frac{d}{dx}\left( x^{3} \right) = 3x^{2}$$
    :::

    \
     then $F(x) = x^{3}$ is an antiderivative of $3x^{2}.$ Therefore, every antiderivative of $3x^{2}$ is of the form $x^{3} + C$ for some constant $C,$ and every function of the form $x^{3} + C$ is an antiderivative of $3x^{2}.$
b.  Let $f(x) = \text{ln}|x|.$ For $x > 0,f(x) = \text{ln}(x)$ and\

    :::
    $$\frac{d}{dx}\left( {\text{ln}\mspace{2mu} x} \right) = \frac{1}{x}.$$
    :::

    \
     For $x < 0,f(x) = \text{ln}\left( {\text{−}x} \right)$ and\

    :::
    $$\frac{d}{dx}\left( {\text{ln}\left( {\text{−}x} \right)} \right) = - \frac{1}{\text{−}x} = \frac{1}{x}.$$
    :::

    \
     Therefore,\

    :::
    $$\frac{d}{dx}\left( {\text{ln}|x|} \right) = \frac{1}{x}.$$
    :::

    \
     Thus, $F(x) = \text{ln}|x|$ is an antiderivative of $\frac{1}{x}.$ Therefore, every antiderivative of $\frac{1}{x}$ is of the form $\text{ln}|x| + C$ for some constant $C$ and every function of the form $\text{ln}|x| + C$ is an antiderivative of $\frac{1}{x}.$
c.  We have\

    :::
    $$\frac{d}{dx}\left( {\text{sin}\mspace{2mu} x} \right) = \text{cos}\mspace{2mu} x,$$
    :::

    \
     so $F(x) = \text{sin}\mspace{2mu} x$ is an antiderivative of $\text{cos}\mspace{2mu} x.$ Therefore, every antiderivative of $\text{cos}\mspace{2mu} x$ is of the form $\text{sin}\mspace{2mu} x + C$ for some constant $C$ and every function of the form $\text{sin}\mspace{2mu} x + C$ is an antiderivative of $\text{cos}\mspace{2mu} x.$
d.  Since\

    :::
    $$\frac{d}{dx}\left( e^{x} \right) = e^{x},$$
    :::

    \
     then $F(x) = e^{x}$ is an antiderivative of $e^{x}.$ Therefore, every antiderivative of $e^{x}$ is of the form $e^{x} + C$ for some constant $C$ and every function of the form $e^{x} + C$ is an antiderivative of $e^{x}.$

### Checkpoint 4.49

Find all antiderivatives of $f(x) = \text{sin}\mspace{2mu} x.$

### Indefinite Integrals

We now look at the formal notation used to represent antiderivatives and examine some of their properties. These properties allow us to find antiderivatives of more complicated functions. Given a function $f,$ we use the notation $f'(x)$ or $\frac{df}{dx}$ to denote the derivative of $f.$ Here we introduce notation for antiderivatives. If $F$ is an antiderivative of $f,$ we say that $F(x) + C$ is the most general antiderivative of $f$ and write

$${\int{f(x)dx}} = F(x) + C.$$

The symbol $\int$ is called an *integral sign*, and $\int{f(x)dx}$ is called the indefinite integral of $f.$

### Definition

Given a function $f,$ the indefinite integral of $f,$ denoted

$${\int{f(x)dx}},$$

is the most general antiderivative of $f.$ If $F$ is an antiderivative of $f,$ then

$${\int{f(x)dx}} = F(x) + C.$$

The expression $f(x)$ is called the *integrand* and the variable $x$ is the *variable of integration*.

Given the terminology introduced in this definition, the act of finding the antiderivatives of a function $f$ is usually referred to as *integrating* $f.$

For a function $f$ and an antiderivative $F,$ the functions $F(x) + C,$ where $C$ is any real number, is often referred to as *the family of antiderivatives of* $f.$ For example, since $x^{2}$ is an antiderivative of $2x$ and any antiderivative of $2x$ is of the form $x^{2} + C,$ we write

$${\int{2x\mspace{2mu} dx = x^{2} + C}}.$$

The collection of all functions of the form $x^{2} + C,$ where $C$ is any real number, is known as the *family of antiderivatives of* $2x.$ Figure 4.85 shows a graph of this family of antiderivatives.

*Figure 4.85* The family of antiderivatives of 2 x consists of all functions of the form x 2 + C , where C is any real number. (Alt: The graphs for y = x2 + 2, y = x2 + 1, y = x2, y = x2 − 1, and y = x2 − 2 are shown.)

For some functions, evaluating indefinite integrals follows directly from properties of derivatives. For example, for $n \neq \text{−}1,$

$${\int{x^{n}dx = \frac{x^{n + 1}}{n + 1} + C}},$$

which comes directly from

$$\frac{d}{dx}\left( \frac{x^{n + 1}}{n + 1} \right) = \left( {n + 1} \right)\frac{x^{n}}{n + 1} = x^{n}.$$

This fact is known as *the power rule for integrals*.

### Theorem 4.15

#### Power Rule for Integrals

For $n \neq \text{−}1,$

$${\int{x^{n}dx = \frac{x^{n + 1}}{n + 1} + C}}.$$

Evaluating indefinite integrals for some other functions is also a straightforward calculation. The following table lists the indefinite integrals for several common functions. A more complete list appears in Appendix A.

  Differentiation Formula                                                                                                          Indefinite Integral
  -------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------
  $\frac{d}{dx}(k) = 0$                                                                                                            ${\int{kdx = {\int{kx^{0}dx}}}} = kx + C$
  $\frac{d}{dx}\left( x^{n} \right) = nx^{n - 1}$                                                                                  ${\int{x^{n}dx}} = \frac{x^{n + 1}}{n + 1} + C$ for $n \neq \text{−}1$
  $\frac{d}{dx}\left( {\text{ln}|x|} \right) = \frac{1}{x}$                                                                        ${\int{\frac{1}{x}dx = \text{ln}|x|}} + C$
  $\frac{d}{dx}\left( e^{x} \right) = e^{x}$                                                                                       ${\int{e^{x}dx}} = e^{x} + C$
  $\frac{d}{dx}\left( {\text{sin}\mspace{2mu} x} \right) = \text{cos}\mspace{2mu} x$                                               $\int{\text{cos}\mspace{2mu} x\mspace{2mu} dx = \text{sin}\mspace{2mu} x + C}$
  $\frac{d}{dx}\left( {\text{cos}\mspace{2mu} x} \right) = \text{−}\text{sin}\mspace{2mu} x$                                       $\int{\text{sin}\mspace{2mu} x\mspace{2mu} dx = \text{−}\text{cos}\mspace{2mu} x + C}$
  $\frac{d}{dx}\left( {\text{tan}\mspace{2mu} x} \right) = \text{sec}^{2}x$                                                        $\int{\text{sec}^{2}x\mspace{2mu} dx = \text{tan}\mspace{2mu} x + C}$
  $\frac{d}{dx}\left( {\text{csc}\mspace{2mu} x} \right) = \text{−}\text{csc}\mspace{2mu} x\mspace{2mu}\text{cot}\mspace{2mu} x$   $\int{\text{csc}\mspace{2mu} x\mspace{2mu}\text{cot}\mspace{2mu} x\mspace{2mu} dx = \text{−}\text{csc}\mspace{2mu} x + C}$
  $\frac{d}{dx}\left( {\text{sec}\mspace{2mu} x} \right) = \text{sec}\mspace{2mu} x\mspace{2mu}\text{tan}\mspace{2mu} x$           $\int{\text{sec}\mspace{2mu} x\mspace{2mu}\text{tan}\mspace{2mu} x\mspace{2mu} dx = \text{sec}\mspace{2mu} x + C}$
  $\frac{d}{dx}\left( {\text{cot}\mspace{2mu} x} \right) = \text{−}\text{csc}^{2}x$                                                $\int{\text{csc}^{2}x\mspace{2mu} dx = \text{−}\text{cot}\mspace{2mu} x + C}$
  $\frac{d}{dx}\left( {\text{sin}^{-1}x} \right) = \frac{1}{\sqrt{1 - x^{2}}}$                                                     $\int{\frac{1}{\sqrt{1 - x^{2}}}{dx} = \text{sin}^{-1}x + C}$
  $\frac{d}{dx}\left( {\text{tan}^{-1}x} \right) = \frac{1}{1 + x^{2}}$                                                            $\int{\frac{1}{1 + x^{2}}dx = \text{tan}^{-1}x + C}$
  $\frac{d}{dx}\left( {\text{sec}^{-1}x} \right) = \frac{1}{x\sqrt{x^{2} - 1}}$                                                    $\int{\frac{1}{x\sqrt{x^{2} - 1}}dx = \text{sec}^{-1}x + C}$

Table  4.13   Integration Formulas

From the definition of indefinite integral of $f,$ we know

$$\int{f(x)dx = F(x) + C}$$

if and only if $F$ is an antiderivative of $f.$ Therefore, when claiming that

$$\int{f(x)dx = F(x) + C}$$

it is important to check whether this statement is correct by verifying that $F'(x) = f(x).$

### Example  4.51

#### Verifying an Indefinite Integral

Each of the following statements is of the form ${\int{f(x)dx = F(x) + C}}.$ Verify that each statement is correct by showing that $F'(x) = f(x).$

a.  ${\int\left( {x + e^{x}} \right)}dx = \frac{x^{2}}{2} + e^{x} + C$
b.  ${\int{xe^{x}dx}} = xe^{x} - e^{x} + C$

#### Solution

a.  Since\

    :::
    $$\frac{d}{dx}\left( {\frac{x^{2}}{2} + e^{x} + C} \right) = x + e^{x},$$
    :::

    \
     the statement\

    :::
    $${\int\left( {x + e^{x}} \right)}dx = \frac{x^{2}}{2} + e^{x} + C$$
    :::

    \
     is correct.\
     Note that we are verifying an indefinite integral for a sum. Furthermore, $\frac{x^{2}}{2}$ and $e^{x}$ are antiderivatives of $x$ and $e^{x},$ respectively, and the sum of the antiderivatives is an antiderivative of the sum. We discuss this fact again later in this section.
b.  Using the product rule, we see that\

    :::
    $$\frac{d}{dx}\left( {xe^{x} - e^{x} + C} \right) = e^{x} + xe^{x} - e^{x} = xe^{x}.$$
    :::

    \
     Therefore, the statement\

    :::
    $${\int{xe^{x}dx}} = xe^{x} - e^{x} + C$$
    :::

    \
     is correct.\
     Note that we are verifying an indefinite integral for a product. The antiderivative $xe^{x} - e^{x}$ is not a product of the antiderivatives. Furthermore, the product of antiderivatives, $x^{2}e^{x}\text{/}2$ is not an antiderivative of $xe^{x}$ since\

    :::
    $$\frac{d}{dx}\left( \frac{x^{2}e^{x}}{2} \right) = xe^{x} + \frac{x^{2}e^{x}}{2} \neq xe^{x}.$$
    :::

    \
     In general, the product of antiderivatives is not an antiderivative of a product.

### Checkpoint 4.50

Verify that $\int{x\mspace{2mu}\text{cos}\mspace{2mu} x\mspace{2mu} dx = x\mspace{2mu}\text{sin}\mspace{2mu} x + \text{cos}\mspace{2mu} x + C.}$

In Table 4.13, we listed the indefinite integrals for many elementary functions. Let's now turn our attention to evaluating indefinite integrals for more complicated functions. For example, consider finding an antiderivative of a sum $f + g.$ In Example 4.51a. we showed that an antiderivative of the sum $x + e^{x}$ is given by the sum $\left( \frac{x^{2}}{2} \right) + e^{x}$---that is, an antiderivative of a sum is given by a sum of antiderivatives. This result was not specific to this example. In general, if $F$ and $G$ are antiderivatives of any functions $f$ and $g,$ respectively, then

$$\frac{d}{dx}\left( {F(x) + G(x)} \right) = F'(x) + G'(x) = f(x) + g(x).$$

Therefore, $F(x) + G(x)$ is an antiderivative of $f(x) + g(x)$ and we have

$${\int\left( {f(x) + g(x)} \right)}dx = F(x) + G(x) + C.$$

Similarly,

$${\int\left( {f(x) - g(x)} \right)}dx = F(x) - G(x) + C.$$

In addition, consider the task of finding an antiderivative of $kf(x),$ where $k$ is any real number. Since

$$\frac{d}{dx}\left( {kf(x)} \right) = k\frac{d}{dx}F(x) = kf'(x)$$

for any real number $k,$ we conclude that

$${\int{kf(x)dx}} = kF(x) + C.$$

These properties are summarized next.

### Theorem 4.16

#### Properties of Indefinite Integrals

Let $F$ and $G$ be antiderivatives of $f$ and $g,$ respectively, and let $k$ be any real number.

Sums and Differences

$$\int{\left( {f(x)\text{±}g(x)} \right)dx = F(x)\text{±}G(x) + C}$$

Constant Multiples

$$\int{kf(x)dx = kF(x) + C}$$

From this theorem, we can evaluate any integral involving a sum, difference, or constant multiple of functions with antiderivatives that are known. Evaluating integrals involving products, quotients, or compositions is more complicated (see Example 4.51b. for an example involving an antiderivative of a product.) We look at and address integrals involving these more complicated functions in Introduction to Integration. In the next example, we examine how to use this theorem to calculate the indefinite integrals of several functions.

### Example  4.52

#### Evaluating Indefinite Integrals

Evaluate each of the following indefinite integrals:

a.  $\int{\left( {5x^{3} - 7x^{2} + 3x + 4} \right)dx}$
b.  ${\int\frac{x^{2} + 4\sqrt3}{x}}dx$
c.  ${\int\frac{4}{1 + x^{2}}}dx$
d.  $\int{\text{tan}\mspace{2mu} x\mspace{2mu}\text{cos}\mspace{2mu} x\mspace{2mu} dx}$

#### Solution

a.  Using Properties of Indefinite Integrals, we can integrate each of the four terms in the integrand separately. We obtain\

    :::
    $${\int{\left( {5x^{3} - 7x^{2} + 3x + 4} \right)dx}} = {\int{5x^{3}dx -}}{\int{7x^{2}dx}} + {\int{3x\mspace{2mu} dx}} + {\int{4dx}}.$$
    :::

    \
     From the second part of Properties of Indefinite Integrals, each coefficient can be written in front of the integral sign, which gives\

    :::
    $${\int{5x^{3}dx -}}{\int{7x^{2}dx}} + {\int{3x\mspace{2mu} dx}} + {\int{4dx}} = 5{\int{x^{3}dx - 7}}{\int{x^{2}dx}} + 3{\int{x\mspace{2mu} dx}} + 4{\int{1dx.}}$$
    :::

    Using the power rule for integrals, we conclude that\

    :::
    $${\int{\left( {5x^{3} - 7x^{2} + 3x + 4} \right)dx}} = \frac{5}{4}x^{4} - \frac{7}{3}x^{3} + \frac{3}{2}x^{2} + 4x + C.$$
    :::
b.  Rewrite the integrand as\

    :::
    $$\frac{x^{2} + 4\sqrt3}{x} = \frac{x^{2}}{x} + \frac{4\sqrt3}{x}.$$
    :::

    \
     Then, to evaluate the integral, integrate each of these terms separately. Using the power rule, we have\

    :::
    $$\begin{array}{cl}
    {{\int\left( {x + \frac{4}{x^{2\text{/}3}}} \right)}dx} & {= {\int{x\mspace{2mu} dx + 4}}{\int x^{-2\text{/}3}}dx} \\
     & {= \frac{1}{2}x^{2} + 4\frac{1}{\left( \frac{-2}{3} \right) + 1}x^{{({-2\text{/}3})} + 1} + C} \\
     & {= \frac{1}{2}x^{2} + 12x^{1\text{/}3} + C.}
    \end{array}$$
    :::
c.  Using Properties of Indefinite Integrals, write the integral as\

    :::
    $$4{\int{\frac{1}{1 + x^{2}}dx}}.$$
    :::

    \
     Then, use the fact that $\text{tan}^{-1}(x)$ is an antiderivative of $\frac{1}{\left( {1 + x^{2}} \right)}$ to conclude that\

    :::
    $${\int{\frac{4}{1 + x^{2}}dx}} = 4\mspace{2mu}\text{tan}^{-1}(x) + C.$$
    :::
d.  Rewrite the integrand as\

    :::
    $$\text{tan}\mspace{2mu} x\mspace{2mu}\text{cos}\mspace{2mu} x = \frac{\text{sin}\mspace{2mu} x}{\text{cos}\mspace{2mu} x}\mspace{2mu}\text{cos}\mspace{2mu} x = \text{sin}\mspace{2mu} x.$$
    :::

    \
     Therefore,\

    :::
    $${\int{\text{tan}\mspace{2mu} x\mspace{2mu}\text{cos}\mspace{2mu} x}} = {\int{\text{sin}\mspace{2mu} x}} = \text{−}\text{cos}\mspace{2mu} x + C.$$
    :::

### Checkpoint 4.51

Evaluate ${\int{\left( {4x^{3} - 5x^{2} + x - 7} \right)dx}}.$

### Initial-Value Problems

We look at techniques for integrating a large variety of functions involving products, quotients, and compositions later in the text. Here we turn to one common use for antiderivatives that arises often in many applications: solving differential equations.

A *differential equation* is an equation that relates an unknown function and one or more of its derivatives. The equation

$$\frac{dy}{dx} = f(x)$$

(4.9)

is a simple example of a differential equation. Solving this equation means finding a function $y$ with a derivative $f.$ Therefore, the solutions of Equation 4.9 are the antiderivatives of $f.$ If $F$ is one antiderivative of $f,$ every function of the form $y = F(x) + C$ is a solution of that differential equation. For example, the solutions of

$$\frac{dy}{dx} = 6x^{2}$$

are given by

$$y = {\int{6x^{2}dx = 2x^{3} + C}}.$$

Sometimes we are interested in determining whether a particular solution curve passes through a certain point $\left( {x_{0},y_{0}} \right)$---that is, $y\left( x_{0} \right) = y_{0}.$ The problem of finding a function $y$ that satisfies a differential equation

$$\frac{dy}{dx} = f(x)$$

(4.10)

with the additional condition

$$y\left( x_{0} \right) = y_{0}$$

(4.11)

is an example of an initial-value problem. The condition $y\left( x_{0} \right) = y_{0}$ is known as an *initial condition*. For example, looking for a function $y$ that satisfies the differential equation

$$\frac{dy}{dx} = 6x^{2}$$

and the initial condition

$$y(1) = 5$$

is an example of an initial-value problem. Since the solutions of the differential equation are $y = 2x^{3} + C,$ to find a function $y$ that also satisfies the initial condition, we need to find $C$ such that $y(1) = 2(1)^{3} + C = 5.$ From this equation, we see that $C = 3,$ and we conclude that $y = 2x^{3} + 3$ is the solution of this initial-value problem as shown in the following graph.

*Figure 4.86* Some of the solution curves of the differential equation $\frac{dy}{dx} = 6x^{2}$ are displayed. The function y = 2 x 3 + 3 satisfies the differential equation and the initial condition y (1) = 5. (Alt: The graphs for y = 2x3 + 6, y = 2x3 + 3, y = 2x3, and y = 2x3 − 3 are shown.)

### Example  4.53

#### Solving an Initial-Value Problem

Solve the initial-value problem

$$\frac{dy}{dx} = \text{sin}\mspace{2mu} x,y(0) = 5.$$

#### Solution

First we need to solve the differential equation. If $\frac{dy}{dx} = \text{sin}\mspace{2mu} x,$ then

$$y = {\int{\text{sin}(x)dx}} = \text{−}\text{cos}\mspace{2mu} x + C.$$

$$C = 5 + \text{cos}(0) = 6.$$

The solution of the initial-value problem is $y = \text{−}\text{cos}\mspace{2mu} x + 6.$

### Checkpoint 4.52

Solve the initial value problem $\frac{dy}{dx} = 3x^{-2},y(1) = 2.$

Initial-value problems arise in many applications. Next we consider a problem in which a driver applies the brakes in a car. We are interested in how long it takes for the car to stop. Recall that the velocity function $v(t)$ is the derivative of a position function $s(t),$ and the acceleration $a(t)$ is the derivative of the velocity function. In earlier examples in the text, we could calculate the velocity from the position and then compute the acceleration from the velocity. In the next example we work the other way around. Given an acceleration function, we calculate the velocity function. We then use the velocity function to determine the position function.

### Example  4.54

#### Decelerating Car

A car is traveling at the rate of $88$ ft/sec $(60$ mph) when the brakes are applied. The car begins decelerating at a constant rate of $15$ ft/sec^2^.

a.  How many seconds elapse before the car stops?
b.  How far does the car travel during that time?

#### Solution

a.  First we introduce variables for this problem. Let $t$ be the time (in seconds) after the brakes are first applied. Let $a(t)$ be the acceleration of the car (in feet per seconds squared) at time $t.$ Let $v(t)$ be the velocity of the car (in feet per second) at time $t.$ Let $s(t)$ be the car's position (in feet) beyond the point where the brakes are applied at time $t.$\
     The car is traveling at a rate of $88\ \text{ft/sec}.$ Therefore, the initial velocity is $v(0) = 88$ ft/sec. Since the car is decelerating, the acceleration is\

    :::
    $$a(t) = -15{\ \text{ft/s}}^{2}.$$
    :::

    \
     The acceleration is the derivative of the velocity,\

    :::
    $$v'(t) = -15.$$
    :::

    \
     Therefore, we have an initial-value problem to solve:\

    :::
    $$v'(t) = -15,v(0) = 88.$$
    :::

    \
     Integrating, we find that\

    :::
    $$v(t) = -15t + C.$$
    :::

    \
     Since $v(0) = 88,C = 88.$ Thus, the velocity function is\

    :::
    $$v(t) = -15t + 88.$$
    :::

    \
     To find how long it takes for the car to stop, we need to find the time $t$ such that the velocity is zero. Solving $-15t + 88 = 0,$ we obtain $t = \frac{88}{15}$ sec.
b.  To find how far the car travels during this time, we need to find the position of the car after $\frac{88}{15}$ sec. We know the velocity $v(t)$ is the derivative of the position $s(t).$ Consider the initial position to be $s(0) = 0.$ Therefore, we need to solve the initial-value problem\

    :::
    $$s'(t) = -15t + 88,s(0) = 0.$$
    :::

    \
     Integrating, we have\

    :::
    $$s(t) = - \frac{15}{2}t^{2} + 88t + C.$$
    :::

    \
     Since $s(0) = 0,$ the constant is $C = 0.$ Therefore, the position function is\

    :::
    $$s(t) = - \frac{15}{2}t^{2} + 88t.$$
    :::

    \
     After $t = \frac{88}{15}$ sec, the position is $s\left( \frac{88}{15} \right) \approx 258.133$ ft.

### Checkpoint 4.53

Suppose the car is traveling at the rate of $44$ ft/sec. How long does it take for the car to stop? How far will the car travel?

### Section 4.10 Exercises

For the following exercises, show that $F(x)$ are antiderivatives of $f(x).$

465.

$F(x) = 5x^{3} + 2x^{2} + 3x + 1,f(x) = 15x^{2} + 4x + 3$

$F(x) = x^{2} + 4x + 1,f(x) = 2x + 4$

467.

$F(x) = x^{2}e^{x},f(x) = e^{x}\left( {x^{2} + 2x} \right)$

$F(x) = \text{cos}\mspace{2mu} x,f(x) = \text{−}\text{sin}\mspace{2mu} x$

469.

$F(x) = e^{x},f(x) = e^{x}$

For the following exercises, find the general form for the antiderivative of the function.

$f(x) = \frac{1}{x^{2}} + x$

471.

$f(x) = e^{x} - 3x^{2} + \text{sin}\mspace{2mu} x$

$f(x) = e^{x} + 3x - x^{2}$

473.

$f(x) = x - 1 + 4\mspace{2mu}\text{sin}\left( {2x} \right)$

For the following exercises, find the general form for the antiderivative $F(x)$ of each function $f(x).$

$f(x) = 5x^{4} + 4x^{5}$

475.

$f(x) = x + 12x^{2}$

$f(x) = \frac{1}{\sqrt{x}}$

477.

$f(x) = \left( \sqrt{x} \right)^{3}$

$f(x) = x^{1\text{/}3} + \left( {2x} \right)^{1\text{/}3}$

479.

$f(x) = \frac{x^{1\text{/}3}}{x^{2\text{/}3}}$

$f(x) = 2\mspace{2mu}\text{sin}(x) + \text{sin}\left( {2x} \right)$

481.

$f(x) = \text{sec}^{2}(x) + 1$

$f(x) = \text{sin}\mspace{2mu} x\mspace{2mu}\text{cos}\mspace{2mu} x$

483.

$f(x) = \text{sin}^{2}(x)\text{cos}(x)$

$f(x) = 0$

485.

$f(x) = \frac{1}{2}\text{csc}^{2}(x) + \frac{1}{x^{2}}$

$f(x) = \text{csc}\mspace{2mu} x\mspace{2mu}\text{cot}\mspace{2mu} x + 3x$

487.

$f(x) = 4\mspace{2mu}\text{csc}\mspace{2mu} x\mspace{2mu}\text{cot}\mspace{2mu} x - \text{sec}\mspace{2mu} x\mspace{2mu}\text{tan}\mspace{2mu} x$

$f(x) = 8\mspace{2mu}\text{sec}\mspace{2mu} x\left( {\text{sec}\mspace{2mu} x - 4\mspace{2mu}\text{tan}\mspace{2mu} x} \right)$

489.

$f(x) = \frac{1}{2}e^{-4x} + \text{sin}\mspace{2mu} x$

For the following exercises, evaluate the integral.

$\int{(-1)dx}$

491.

$\int{\text{sin}\mspace{2mu} x\mspace{2mu} dx}$

$\int{\left( {4x + \sqrt{x}} \right)dx}$

493.

$\int{\frac{3x^{2} + 2}{x^{2}}dx}$

$\int{\left( {\text{sec}\mspace{2mu} x\mspace{2mu}\text{tan}\mspace{2mu} x + 4x} \right)dx}$

495.

$\int{\left( {4\sqrt{x} + \sqrt4} \right)dx}$

${\int\left( {x^{-1\text{/}3} - x^{2\text{/}3}} \right)}dx$

497.

$\int{\frac{14x^{3} + 2x + 1}{x^{3}}dx}$

${\int\left( {e^{x} + e^{\text{−}x}} \right)}dx$

For the following exercises, solve the initial value problem.

499.

$f'(x) = x^{-3},f(1) = 1$

$f'(x) = \sqrt{x} + x^{2},f(0) = 2$

501.

$f'(x) = \text{cos}\mspace{2mu} x + \text{sec}^{2}(x),f\left( \frac{\pi}{4} \right) = 2 + \frac{\sqrt{2}}{2}$

$f'(x) = x^{3} - 8x^{2} + 16x + 1,f(0) = 0$

503.

$f'(x) = \frac{2}{x^{2}} - \frac{x^{2}}{2},f(1) = 0$

For the following exercises, find two possible functions $f$ given the second- or third-order derivatives.

$f^{''}(x) = x^{2} + 2$

505.

$f^{''}(x) = e^{\text{−}x}$

$f^{''}(x) = 1 + x$

507.

$f\text{'''}(x) = \text{cos}\mspace{2mu} x$

$f\text{'''}(x) = 8e^{-2x} - \text{sin}\mspace{2mu} x$

509.

A car is being driven at a rate of $40$ mph when the brakes are applied. The car decelerates at a constant rate of $10$ ft/sec^2^. How long before the car stops?

In the preceding problem, calculate how far the car travels in the time it takes to stop.

511.

You are merging onto the freeway, accelerating from rest at a constant rate of $12$ ft/sec^2^. How long does it take you to reach merging speed at $60$ mph?

Based on the previous problem, how far does the car travel to reach merging speed?

513.

A car company wants to ensure its newest model can stop in $8$ sec when traveling at $75$ mph. If we assume constant deceleration, find the value of deceleration that accomplishes this.

A car company wants to ensure its newest model can stop in less than $450$ ft when traveling at $60$ mph. If we assume constant deceleration, find the value of deceleration that accomplishes this.

For the following exercises, find the antiderivative of the function, assuming $F(0) = 0.$

515.

**\[T\]** $f(x) = x^{2} + 2$

**\[T\]** $f(x) = 4x - \sqrt{x}$

517.

**\[T\]** $f(x) = \text{sin}\mspace{2mu} x + 2x$

**\[T\]** $f(x) = e^{x}$

519.

**\[T\]** $f(x) = \frac{1}{\left( {x + 1} \right)^{2}}$

**\[T\]** $f(x) = e^{-2x} + 3x^{2}$

For the following exercises, determine whether the statement is true or false. Either prove it is true or find a counterexample if it is false.

521.

If $f(x)$ is the antiderivative of $v(x),$ then $2f(x)$ is the antiderivative of $2v(x).$

If $f(x)$ is the antiderivative of $v(x),$ then $f\left( {2x} \right)$ is the antiderivative of $v\left( {2x} \right).$

523.

If $f(x)$ is the antiderivative of $v(x),$ then $f(x) + 1$ is the antiderivative of $v(x) + 1.$

If $f(x)$ is the antiderivative of $v(x),$ then $\left( {f(x)} \right)^{2}$ is the antiderivative of $\left( {v(x)} \right)^{2}.$
