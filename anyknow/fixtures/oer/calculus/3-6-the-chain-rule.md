# 3.6 The Chain Rule

Title: 3.6 The Chain Rule
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 3.6 The Chain Rule

### Learning Objectives

- 3.6.1 State the chain rule for the composition of two functions.

- 3.6.2 Apply the chain rule together with the power rule.

- 3.6.3 Apply the chain rule and the product/quotient rules correctly in combination when both are necessary.

- 3.6.4 Recognize the chain rule for a composition of three or more functions.

- 3.6.5 Describe the proof of the chain rule.

We have seen the techniques for differentiating basic functions $({x}^{n},\sin x,\cos x,\text{etc}.)$ as well as sums, differences, products, quotients, and constant multiples of these functions. However, these techniques do not allow us to differentiate compositions of functions, such as $h(x)=\sin ({x}^{3})$ or $k(x)=\sqrt{3{x}^{2}+1}.$ In this section, we study the rule for finding the derivative of the composition of two or more functions.

### Deriving the Chain Rule

When we have a function that is a composition of two or more functions, we could use all of the techniques we have already learned to differentiate it. However, using all of those techniques to break down a function into simpler parts that we are able to differentiate can get cumbersome. Instead, we use the chain rule, which states that the derivative of a composite function is the derivative of the outer function evaluated at the inner function times the derivative of the inner function.

To put this rule into context, let’s take a look at an example: $h(x)=\sin ({x}^{3}).$ We can think of the derivative of this function with respect to *x* as the rate of change of $\sin ({x}^{3})$ relative to the change in $x.$ Consequently, we want to know how $\sin ({x}^{3})$ changes as $x$ changes. We can think of this event as a chain reaction: As $x$ changes, ${x}^{3}$ changes, which leads to a change in $\sin ({x}^{3}).$ This chain reaction gives us hints as to what is involved in computing the derivative of $\sin ({x}^{3}).$ First of all, a change in $x$ forcing a change in ${x}^{3}$ suggests that somehow the derivative of ${x}^{3}$ is involved. In addition, the change in ${x}^{3}$ forcing a change in $\sin ({x}^{3})$ suggests that the derivative of $\sin (u)$ with respect to $u,$ where $u={x}^{3},$ is also part of the final derivative.

We can take a more formal look at the derivative of $h(x)=\sin ({x}^{3})$ by setting up the limit that would give us the derivative at a specific value $a$ in the domain of $h(x)=\sin ({x}^{3}).$
$$h'(a)=\lim_{x\to a}\frac{\sin ({x}^{3})-\sin ({a}^{3})}{x-a}.$$
This expression does not seem particularly helpful; however, we can modify it by multiplying and dividing by the expression ${x}^{3}-{a}^{3}$ to obtain
$$h'(a)=\lim_{x\to a}\frac{\sin ({x}^{3})-\sin ({a}^{3})}{{x}^{3}-{a}^{3}}\cdot \frac{{x}^{3}-{a}^{3}}{x-a}.$$
From the definition of the derivative, we can see that the second factor is the derivative of ${x}^{3}$ at $x=a.$ That is,
$$\lim_{x\to a}\frac{{x}^{3}-{a}^{3}}{x-a}=\frac{d}{dx}{({x}^{3})}_{x=a}=3{a}^{2}.$$
However, it might be a little more challenging to recognize that the first term is also a derivative. We can see this by letting $u={x}^{3}$ and observing that as $x\to a,u\to {a}^{3}\text{:}$
$$\begin{matrix}\lim_{x\to a}\frac{\sin ({x}^{3})-\sin ({a}^{3})}{{x}^{3}-{a}^{3}} & =\lim_{u\to {a}^{3}}\frac{\sin u-\sin ({a}^{3})}{u-{a}^{3}} \\ & =\frac{d}{du}{(\sin u)}_{u={a}^{3}} \\ & =\cos ({a}^{3}).\end{matrix}$$
Thus, $h'(a)=\cos ({a}^{3})\cdot 3{a}^{2}.$

In other words, if $h(x)=\sin ({x}^{3}),$ then $h'(x)=\cos ({x}^{3})\cdot 3{x}^{2}.$ Thus, if we think of $h(x)=\sin ({x}^{3})$ as the composition $(f\circ g)(x)=f(g(x))$ where $f(x)=$ sin $x$ and $g(x)={x}^{3},$ then the derivative of $h(x)=\sin ({x}^{3})$ is the product of the derivative of $g(x)={x}^{3}$ and the derivative of the function $f(x)=\sin x$ evaluated at the function $g(x)={x}^{3}.$ At this point, we anticipate that for $h(x)=\sin (g(x)),$ it is quite likely that $h'(x)=\cos (g(x))g'(x).$ As we determined above, this is the case for $h(x)=\sin ({x}^{3}).$

Now that we have derived a special case of the chain rule, we state the general case and then apply it in a general form to other composite functions. An informal proof is provided at the end of the section.

### Rule: The Chain Rule

Let $f$ and $g$ be functions. For all *x* in the domain of $g$ for which $g$ is differentiable at *x* and $f$ is differentiable at $g(x),$ the derivative of the composite function
$$h(x)=(f\circ g)(x)=f(g(x))$$
is given by
$$h'(x)=f'(g(x))g'(x).$$
(3.17)

Alternatively, if $y$ is a function of $u,$ and $u$ is a function of $x,$ then
$$\frac{dy}{dx}=\frac{dy}{du}\cdot \frac{du}{dx}.$$

### Problem-Solving Strategy

#### Applying the Chain Rule

- To differentiate $h(x)=f(g(x)),$ begin by identifying $f(x)$ and $g(x).$

- Find $f'(x)$ and evaluate it at $g(x)$ to obtain $f'(g(x)).$

- Find $g'(x).$

- Write $h'(x)=f'(g(x))\cdot g'(x).$

*Note*: When applying the chain rule to the composition of two or more functions, keep in mind that we work our way from the outside function in. It is also useful to remember that the derivative of the composition of two functions can be thought of as having two parts; the derivative of the composition of three functions has three parts; and so on. Also, remember that we never evaluate a derivative at a derivative.

### The Chain and Power Rules Combined

We can now apply the chain rule to composite functions, but note that we often need to use it with other rules. For example, to find derivatives of functions of the form $h(x)={(g(x))}^{n},$ we need to use the chain rule combined with the power rule. To do so, we can think of $h(x)={(g(x))}^{n}$ as $f(g(x))$ where $f(x)={x}^{n}.$ Then $f'(x)=n{x}^{n-1}.$ Thus, $f'(g(x))=n{(g(x))}^{n-1}.$ This leads us to the derivative of a power function using the chain rule,
$$h'(x)=n{(g(x))}^{n-1}g'(x)$$
### Rule: Power Rule for Composition of Functions

For all values of *x* for which the derivative is defined, if
$$h(x)={(g(x))}^{n}.$$
Then
$$h'(x)=n{(g(x))}^{n-1}g'(x).$$
(3.18)

### Example 3.48

#### Using the Chain and Power Rules

Find the derivative of $h(x)=\frac{1}{{(3{x}^{2}+1)}^{2}}.$

#### Solution

First, rewrite $h(x)=\frac{1}{{(3{x}^{2}+1)}^{2}}={(3{x}^{2}+1)}^{−2}.$

Applying the power rule with $g(x)=3{x}^{2}+1,$ we have
$$h'(x)=−2{(3{x}^{2}+1)}^{−3}(6x).$$
Rewriting back to the original form gives us
$$h'(x)=\frac{−12x}{{(3{x}^{2}+1)}^{3}}.$$
### Checkpoint 3.34

Find the derivative of $h(x)={(2{x}^{3}+2x-1)}^{4}.$

### Example 3.49

#### Using the Chain and Power Rules with a Trigonometric Function

Find the derivative of $h(x)={\sin}^{3}x.$

#### Solution

First recall that ${\sin}^{3}x={(\sin x)}^{3},$ so we can rewrite $h(x)={\sin}^{3}x$ as $h(x)={(\sin x)}^{3}.$

Applying the power rule with $g(x)=\sin x,$ we obtain
$$h'(x)=3{(\sin x)}^{2}\cos x=3 {\sin}^{2}x \cos x.$$
### Example 3.50

#### Finding the Equation of a Tangent Line

Find the equation of a line tangent to the graph of $h(x)=\frac{1}{{(3x-5)}^{2}}$ at $x=2.$

#### Solution

Because we are finding an equation of a line, we need a point. The *x*-coordinate of the point is 2. To find the *y*-coordinate, substitute 2 into $h(x).$ Since $h(2)=\frac{1}{{(3(2)-5)}^{2}}=1,$ the point is $(2,1).$

For the slope, we need $h'(2).$ To find $h'(x),$ first we rewrite $h(x)={(3x-5)}^{−2}$ and apply the power rule to obtain
$$h'(x)=−2{(3x-5)}^{−3}(3)=−6{(3x-5)}^{−3}.$$
By substituting, we have $h'(2)=−6{(3(2)-5)}^{−3}=−6.$ Therefore, the line has equation $y-1=−6(x-2).$ Rewriting, the equation of the line is $y=−6x+13.$

### Checkpoint 3.35

Find an equation of the line tangent to the graph of $f(x)={({x}^{2}-2)}^{3}$ at $x=−2.$

### Combining the Chain Rule with Other Rules

Now that we can combine the chain rule and the power rule, we examine how to combine the chain rule with the other rules we have learned. In particular, we can use it with the formulas for the derivatives of trigonometric functions or with the product rule.

### Example 3.51

#### Using the Chain Rule on a General Cosine Function

Find the derivative of $h(x)=\cos (g(x)).$

#### Solution

Think of $h(x)=\cos (g(x))$ as $f(g(x))$ where $f(x)=\cos x.$ Since $f'(x)=-\sin x.$ we have $f'(g(x))=-\sin (g(x)).$ Then we do the following calculation.
$$\begin{matrix}h'(x) & =f'(g(x))g'(x) & & & \text{Apply the chain rule.} \\ & =-\sin (g(x))g'(x) & & & \text{Substitute} f'(g(x))=-\sin (g(x)).\end{matrix}$$
Thus, the derivative of $h(x)=\cos (g(x))$ is given by $h'(x)=-\sin (g(x))g'(x).$

In the following example we apply the rule that we have just derived.

### Example 3.52

#### Using the Chain Rule on a Cosine Function

Find the derivative of $h(x)=\cos (5{x}^{2}).$

#### Solution

Let $g(x)=5{x}^{2}.$ Then $g'(x)=10x.$ Using the result from the previous example,
$$\begin{matrix}h'(x) & =-\sin (5{x}^{2})\cdot 10x \\ & =−10x \sin (5{x}^{2}).\end{matrix}$$
### Example 3.53

#### Using the Chain Rule on Another Trigonometric Function

Find the derivative of $h(x)=\sec (4{x}^{5}+2x).$

#### Solution

Apply the chain rule to $h(x)=\sec (g(x))$ to obtain
$$h'(x)=\sec (g(x)) \tan (g(x))g'(x).$$
In this problem, $g(x)=4{x}^{5}+2x,$ so we have $g'(x)=20{x}^{4}+2.$ Therefore, we obtain
$$\begin{matrix}h'(x) & =\sec (4{x}^{5}+2x) \tan (4{x}^{5}+2x)(20{x}^{4}+2) \\ & =(20{x}^{4}+2)\sec (4{x}^{5}+2x) \tan (4{x}^{5}+2x).\end{matrix}$$
### Checkpoint 3.36

Find the derivative of $h(x)=\sin (7x+2).$

At this point we provide a list of derivative formulas that may be obtained by applying the chain rule in conjunction with the formulas for derivatives of trigonometric functions. Their derivations are similar to those used in Example 3.51 and Example 3.53. For convenience, formulas are also given in Leibniz’s notation, which some students find easier to remember. (We discuss the chain rule using Leibniz’s notation at the end of this section.) It is not absolutely necessary to memorize these as separate formulas as they are all applications of the chain rule to previously learned formulas.

### Theorem 3.10

#### Using the Chain Rule with Trigonometric Functions

For all values of $x$ for which the derivative is defined,
$$\begin{matrix}\frac{d}{dx}(\sin (g(x))) =\cos (g(x))g'(x) & & & \frac{d}{dx} \sin u =\cos u\frac{du}{dx} \\ \frac{d}{dx}(\cos (g(x))) =-\sin (g(x))g'(x) & & & \frac{d}{dx} \cos u =-\sin u\frac{du}{dx} \\ \frac{d}{dx}(\tan (g(x))) ={\sec}^{2}(g(x))g'(x) & & & \frac{d}{dx} \tan u ={\sec}^{2}u\frac{du}{dx} \\ \frac{d}{dx}(\cot (g(x))) =-{\csc}^{2}(g(x))g'(x) & & & \frac{d}{dx} \cot u =-{\csc}^{2}u\frac{du}{dx} \\ \frac{d}{dx}(\sec (g(x))) =\sec (g(x) \tan (g(x))g'(x) & & & \frac{d}{dx} \sec u =\sec u \tan u\frac{du}{dx} \\ \frac{d}{dx}(\csc (g(x))) =-\csc (g(x))\cot (g(x))g'(x) & & & \frac{d}{dx} \csc u =-\csc u \cot u\frac{du}{dx}.\end{matrix}$$
### Example 3.54

#### Combining the Chain Rule with the Product Rule

Find the derivative of $h(x)={(2x+1)}^{5}{(3x-2)}^{7}.$

#### Solution

First apply the product rule, then apply the chain rule to each term of the product.
$$\begin{matrix}h'(x) & =\frac{d}{dx}({(2x+1)}^{5})\cdot {(3x-2)}^{7}+\frac{d}{dx}({(3x-2)}^{7})\cdot {(2x+1)}^{5} & & & \text{Apply the product rule.} \\ & =5{(2x+1)}^{4}\cdot 2\cdot {(3x-2)}^{7}+7{(3x-2)}^{6}\cdot 3\cdot {(2x+1)}^{5} & & & \text{Apply the chain rule.} \\ & =10{(2x+1)}^{4}{(3x-2)}^{7}+21{(3x-2)}^{6}{(2x+1)}^{5} & & & \text{Simplify.} \\ & ={(2x+1)}^{4}{(3x-2)}^{6}(10(3x-2)+21(2x+1)) & & & \text{Factor out} {(2x+1)}^{4}{(3x-2)}^{6}. \\ & ={(2x+1)}^{4}{(3x-2)}^{6}(72x+1) & & & \text{Simplify.}\end{matrix}$$
### Checkpoint 3.37

Find the derivative of $h(x)=\frac{x}{{(2x+3)}^{3}}.$

### Composites of Three or More Functions

We can now combine the chain rule with other rules for differentiating functions, but when we are differentiating the composition of three or more functions, we need to apply the chain rule more than once. If we look at this situation in general terms, we can generate a formula, but we do not need to remember it, as we can simply apply the chain rule multiple times.

In general terms, first we let
$$k(x)=h(f(g(x))).$$
Then, applying the chain rule once we obtain
$$k'(x)=\frac{d}{dx}(h(f(g(x)))=h'(f(g(x)))\cdot \frac{d}{dx}f((g(x))).$$
Applying the chain rule again, we obtain
$$k'(x)=h'(f(g(x))f'(g(x))g'(x)).$$
### Rule: Chain Rule for a Composition of Three Functions

For all values of *x* for which the function is differentiable, if
$$k(x)=h(f(g(x))),$$
then
$$k'(x)=h'(f(g(x)))f'(g(x))g'(x).$$
In other words, we are applying the chain rule twice.

Notice that the derivative of the composition of three functions has three parts. (Similarly, the derivative of the composition of four functions has four parts, and so on.) Also, *remember, we can always work from the outside in, taking one derivative at a time.*

### Example 3.55

#### Differentiating a Composite of Three Functions

Find the derivative of $k(x)={\cos}^{4}({7x}^{2}+1).$

#### Solution

First, rewrite $k(x)$ as
$$k(x)={(\cos (7{x}^{2}+1))}^{4}.$$
Then apply the power rule several times.
$$\begin{matrix}k'(x) & =4{(\cos (7{x}^{2}+1))}^{3}(\frac{d}{dx}\cos (7{x}^{2}+1)) & & & \text{Apply the chain rule.} \\ & =4{(\cos (7{x}^{2}+1))}^{3}(-\sin (7{x}^{2}+1))(\frac{d}{dx}(7{x}^{2}+1)) & & & \text{Apply the chain rule.} \\ & =4{(\cos (7{x}^{2}+1))}^{3}(-\sin (7{x}^{2}+1))(14x) & & & \text{Apply the chain rule.} \\ & =−56x \sin (7{x}^{2}+1){\cos}^{3}(7{x}^{2}+1) & & & \text{Simplify.}\end{matrix}$$
### Checkpoint 3.38

Find the derivative of $h(x)={\sin}^{6}({x}^{3}).$

### Example 3.56

#### Using the Chain Rule in a Velocity Problem

A particle moves along a coordinate axis. Its position at time *t* is given by $s(t)=\sin (2t)+\cos (3t).$ What is the velocity of the particle at time $t=\frac{\pi}{6}?$

#### Solution

To find $v(t),$ the velocity of the particle at time $t,$ we must differentiate $s(t).$ Thus,
$$v(t)=s'(t)=2 \cos (2t)-3 \sin (3t).$$
Substituting $t=\frac{\pi}{6}$ into $v(t),$ we obtain $v(\frac{\pi}{6})=−2.$

### Checkpoint 3.39

A particle moves along a coordinate axis. Its position at time $t$ is given by $s(t)=\sin (4t).$ Find its acceleration at time $t.$

#### Proof

At this point, we present a very informal proof of the chain rule. For simplicity’s sake we ignore certain issues: For example, we assume that $g(x)\neq g(a)$ for $x\neq a$ in some open interval containing $a.$ We begin by applying the limit definition of the derivative to the function $h(x)$ to obtain $h'(a)\text{:}$
$$h'(a)=\lim_{x\to a}\frac{f(g(x))-f(g(a))}{x-a}.$$
Rewriting, we obtain
$$h'(a)=\lim_{x\to a}\frac{f(g(x))-f(g(a))}{g(x)-g(a)}\cdot \frac{g(x)-g(a)}{x-a}.$$
Although it is clear that
$$\lim_{x\to a}\frac{g(x)-g(a)}{x-a}=g'(a),$$
it is not obvious that
$$\lim_{x\to a}\frac{f(g(x))-f(g(a))}{g(x)-g(a)}=f'(g(a)).$$
To see that this is true, first recall that since *g* is differentiable at $a,g$ is also continuous at $a.$ Thus,
$$\lim_{x\to a}g(x)=g(a).$$
Next, make the substitution $y=g(x)$ and $b=g(a)$ and use change of variables in the limit to obtain
$$\lim_{x\to a}\frac{f(g(x))-f(g(a))}{g(x)-g(a)}=\lim_{y\to b}\frac{f(y)-f(b)}{y-b}=f'(b)=f'(g(a)).$$
Finally,
$$h'(a)=\lim_{x\to a}\frac{f(g(x))-f(g(a))}{g(x)-g(a)}\cdot \frac{g(x)-g(a)}{x-a}=f'(g(a))g'(a).$$
□

### Example 3.57

#### Using the Chain Rule with Functional Values

Let $h(x)=f(g(x)).$ If $g(1)=4,g'(1)=3,$ and $f'(4)=7,$ find $h'(1).$

#### Solution

Use the chain rule, then substitute.
$$\begin{matrix}h'(1) & =f'(g(1))g'(1) & & & \text{Apply the chain rule.} \\ & =f'(4)\cdot 3 & & & \text{Substitute} g(1)=4 \text{and} g'(1)=3. \\ & =7\cdot 3 & & & \text{Substitute} f'(4)=7. \\ & =21 & & & \text{Simplify.}\end{matrix}$$
### Checkpoint 3.40

Given $h(x)=f(g(x)).$ If $g(2)=−3,g'(2)=4,$ and $f'(−3)=7,$ find $h'(2).$

### The Chain Rule Using Leibniz’s Notation

As with other derivatives that we have seen, we can express the chain rule using Leibniz’s notation. This notation for the chain rule is used heavily in physics applications.

$\text{For} h(x)=f(g(x)),$ let $u=g(x)$ and $y=h(x)=f(u).$ Thus,
$$h'(x)=\frac{dy}{dx},f'(g(x))=f'(u)=\frac{dy}{du} \text{and} g'(x)=\frac{du}{dx}.$$
Consequently,
$$\frac{dy}{dx}=h'(x)=f'(g(x))g'(x)=\frac{dy}{du}\cdot \frac{du}{dx}.$$
### Rule: Chain Rule Using Leibniz’s Notation

If $y$ is a function of $u,$ and $u$ is a function of $x,$ then
$$\frac{dy}{dx}=\frac{dy}{du}\cdot \frac{du}{dx}.$$
### Example 3.58

#### Taking a Derivative Using Leibniz’s Notation, Example 1

Find the derivative of $y={(\frac{x}{3x+2})}^{5}.$

#### Solution

First, let $u=\frac{x}{3x+2}.$ Thus, $y={u}^{5}.$ Next, find $\frac{du}{dx}$ and $\frac{dy}{du}.$ Using the quotient rule,
$$\frac{du}{dx}=\frac{2}{{(3x+2)}^{2}}$$
and
$$\frac{dy}{du}=5{u}^{4}.$$
Finally, we put it all together.
$$\begin{matrix}\frac{dy}{dx} & =\frac{dy}{du}\cdot \frac{du}{dx} & & & \text{Apply the chain rule.} \\ & =5{u}^{4}\cdot \frac{2}{{(3x+2)}^{2}} & & & \text{Substitute} \frac{dy}{du}=5{u}^{4} \text{and} \frac{du}{dx}=\frac{2}{{(3x+2)}^{2}}. \\ & =5{(\frac{x}{3x+2})}^{4}\cdot \frac{2}{{(3x+2)}^{2}} & & & \text{Substitute} u=\frac{x}{3x+2}. \\ & =\frac{10{x}^{4}}{{(3x+2)}^{6}} & & & \text{Simplify.}\end{matrix}$$
It is important to remember that, when using the Leibniz form of the chain rule, the final answer must be expressed entirely in terms of the original variable given in the problem.

### Example 3.59

#### Taking a Derivative Using Leibniz’s Notation, Example 2

Find the derivative of $y=\tan (4{x}^{2}-3x+1).$

#### Solution

First, let $u=4{x}^{2}-3x+1.$ Then $y=\tan u.$ Next, find $\frac{du}{dx}$ and $\frac{dy}{du}\text{:}$
$$\frac{du}{dx}=8x-3 \text{and} \frac{dy}{du}={\sec}^{2}u.$$
Finally, we put it all together.
$$\begin{matrix}\frac{dy}{dx} & =\frac{dy}{du}\cdot \frac{du}{dx} & & & \text{Apply the chain rule.} \\ & ={\sec}^{2}u\cdot (8x-3) & & & \text{Use} \frac{du}{dx}=8x-3 \text{and} \frac{dy}{du}={\sec}^{2}u. \\ & ={\sec}^{2}(4{x}^{2}-3x+1)\cdot (8x-3) & & & \text{Substitute} u=4{x}^{2}-3x+1.\end{matrix}$$
### Checkpoint 3.41

Use Leibniz’s notation to find the derivative of $y=\cos ({x}^{3}).$ Make sure that the final answer is expressed entirely in terms of the variable $x.$

## Section Exercises

Selected openly licensed end-of-section exercises from this OpenStax section. The complete set is on the source page.

**Exercise.** $y=3u-6,u=2{x}^{2}$

**Exercise.** $y=6{u}^{3},u=7x-4$

**Exercise.** $y=\sin u,u=5x-1$

**Exercise.** $y=\cos u,u=\frac{-x}{8}$

**Exercise.** $y=\tan u,u=9x+2$

**Exercise.** $y=\sqrt{4u+3},u={x}^{2}-6x$

**Exercise.** $y={(3x-2)}^{6}$

**Exercise.** $y={(3{x}^{2}+1)}^{3}$
