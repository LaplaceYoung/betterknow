# 2.2 The Limit of a Function

Title: 2.2 The Limit of a Function
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---
## 2.2 The Limit of a Function

### Learning Objectives

- 2.2.1 Using correct notation, describe the limit of a function.
- 2.2.2 Use a table of values to estimate the limit of a function or to identify when the limit does not exist.
- 2.2.3 Use a graph to estimate the limit of a function or to identify when the limit does not exist.
- 2.2.4 Define one-sided limits and provide examples.
- 2.2.5 Explain the relationship between one-sided and two-sided limits.
- 2.2.6 Using correct notation, describe an infinite limit.
- 2.2.7 Define a vertical asymptote.

The concept of a limit or limiting process, essential to the understanding of calculus, has been around for thousands of years. In fact, early mathematicians used a limiting process to obtain better and better approximations of areas of circles. Yet, the formal definition of a limit—as we know and understand it today—did not appear until the late 19th century. We therefore begin our quest to understand limits, as our mathematical ancestors did, by using an intuitive approach. At the end of this chapter, armed with a conceptual understanding of limits, we examine the formal definition of a limit.

We begin our exploration of limits by taking a look at the graphs of the functions

$$
f(x)=\frac{x^{2}-4}{x-2}, g(x)=\frac{|x-2|}{x-2}, \text{and} h(x)=\frac{1}{(x-2)^{2}},
$$

which are shown in Figure 2.12. In particular, let’s focus our attention on the behavior of each graph at and around $x=2.$

*Figure 2.12* These graphs show the behavior of three different functions around $x=2.$ (Alt: Three graphs of functions. The first is f(s) = (x^2 – 4) / (x-2), which is a line of slope, x intercept (-2,0), and open circle at (2,4). The second is g(x) = |x – 2 | / (x-2), which contains two lines: x=1 for x>2 and x= -1 for x < 2. There are open circles at both endpoints (2, 1) and (-2, 1). The third is h(x) = 1 / (x-2)^2, in which the function curves asymptotically towards y=0 and x=2 in quadrants one and two.)

Each of the three functions is undefined at $x=2,$ but if we make this statement and no other, we give a very incomplete picture of how each function behaves in the vicinity of $x=2.$ To express the behavior of each graph in the vicinity of 2 more completely, we need to introduce the concept of a limit.

### Intuitive Definition of a Limit

Let’s first take a closer look at how the function $f(x)=(x^{2}-4)\text{/}(x-2)$ behaves around $x=2$ in Figure 2.12. As the values of *x* approach 2 from either side of 2, the values of $y=f(x)$ approach 4. Mathematically, we say that the limit of $f(x)$ as *x* approaches 2 is 4. Symbolically, we express this limit as

$$
\lim_{x\to 2}f(x)=4.
$$

From this very brief informal look at one limit, let’s start to develop an intuitive definition of the limit. We can think of the limit of a function at a number *a* as being the one real number *L* that the functional values approach as the *x* -values approach *a,* provided such a real number *L* exists. Stated more carefully, we have the following definition:

### Definition

Let $f(x)$ be a function defined at all values in an open interval containing *a* , with the possible exception of *a* itself, and let *L* be a real number. If *all* values of the function $f(x)$ approach the real number *L* as the values of $x(\neq a)$ approach the number *a* , then we say that the limit of $f(x)$ as *x* approaches *a* is *L* . (More succinct, as *x* gets closer to *a* , $f(x)$ gets closer and stays close to *L* .) Symbolically, we express this idea as

$$
\lim_{x\to a}f(x)=L.
$$

(2.3)

We can estimate limits by constructing tables of functional values and by looking at their graphs. This process is described in the following Problem-Solving Strategy.

### Problem-Solving Strategy

#### Evaluating a Limit Using a Table of Functional Values

1. To evaluate $\lim_{x\to a}f(x),$ we begin by completing a table of functional values. We should choose two sets of *x* -values—one set of values approaching *a* and less than *a* , and another set of values approaching *a* and greater than *a* . Table 2.1 demonstrates what your tables might look like. | *x* | $f(x)$ | | *x* | $f(x)$ | | --- | --- | --- | --- | --- | | $a-0.1$ | $f(a-0.1)$ | | $a+0.1$ | $f(a+0.1)$ | | $a-0.01$ | $f(a-0.01)$ | $a+0.01$ | $f(a+0.01)$ | | | $a-0.001$ | $f(a-0.001)$ | $a+0.001$ | $f(a+0.001)$ | | | $a-0.0001$ | $f(a-0.0001)$ | $a+0.0001$ | $f(a+0.0001)$ | | | Use additional values as necessary. | Use additional values as necessary. | | | |
2. Next, let’s look at the values in each of the $f(x)$ columns and determine whether the values seem to be approaching a single value as we move down each column. In our columns, we look at the sequence $f(a-0.1),f(a-0.01),f(a-0.001).,f(a-0.0001),$ and so on, and $f(a+0.1),f(a+0.01),f(a+0.001),f(a+0.0001),$ and so on. ( *Note* : Although we have chosen the *x* -values $a\pm 0.1,a\pm 0.01,a\pm 0.001,a\pm 0.0001,$ and so forth, and these values will probably work nearly every time, on very rare occasions we may need to modify our choices.)
3. If both columns approach a common *y* -value *L* , we state $\lim_{x\to a}f(x)=L.$ We can use the following strategy to confirm the result obtained from the table or as an alternative method for estimating a limit.
4. Using a graphing calculator or computer software that allows us to graph functions, we can plot the function $f(x),$ making sure the functional values of $f(x)$ for *x* -values near *a* are in our window. We can use the trace feature to move along the graph of the function and watch the *y* -value readout as the *x* -values approach *a* . If the *y* -values approach *L* as our *x* -values approach *a* from both directions, then $\lim_{x\to a}f(x)=L.$ We may need to zoom in on our graph and repeat this process several times.

We apply this Problem-Solving Strategy to compute a limit in Example 2.4.

### Example 2.4

#### Evaluating a Limit Using a Table of Functional Values 1

Evaluate $\lim_{x\to 0}\frac{\mathrm{sin} x}{x}$ using a table of functional values.

#### Solution

We have calculated the values of $f(x)=(\mathrm{sin} x)\text{/}x$ for the values of *x* listed in Table 2.2.

| *x* | $\frac{\mathrm{sin} x}{x}$ | | *x* | $\frac{\mathrm{sin} x}{x}$ |
| --- | --- | --- | --- | --- |
| −0.1 | 0.998334166468 | | 0.1 | 0.998334166468 |
| −0.01 | 0.999983333417 | 0.01 | 0.999983333417 | |
| −0.001 | 0.999999833333 | 0.001 | 0.999999833333 | |
| −0.0001 | 0.999999998333 | 0.0001 | 0.999999998333 | |

*Note* : The values in this table were obtained using a calculator and using all the places given in the calculator output.

As we read down each $\frac{(\mathrm{sin} x)}{x}$ column, we see that the values in each column appear to be approaching one. Thus, it is fairly reasonable to conclude that $\lim_{x\to 0}\frac{\mathrm{sin} x}{x}=1.$ A calculator or computer-generated graph of $f(x)=\frac{(\mathrm{sin} x)}{x}$ would be similar to that shown in Figure 2.13, and it confirms our estimate.

*Figure 2.13* The graph of $f(x)=(\mathrm{sin} x)\text{/}x$ confirms the estimate from Table 2.2. (Alt: A graph of f(x) = sin(x)/x over the interval [-6, 6]. The curving function has a y intercept at x=0 and x intercepts at y=pi and y=-pi.)

### Example 2.5

#### Evaluating a Limit Using a Table of Functional Values 2

Evaluate $\lim_{x\to 4}\frac{\sqrt{x}-2}{x-4}$ using a table of functional values.

#### Solution

As before, we use a table—in this case, Table 2.3—to list the values of the function for the given values of *x* .

| *x* | $\frac{\sqrt{x}-2}{x-4}$ | | *x* | $\frac{\sqrt{x}-2}{x-4}$ |
| --- | --- | --- | --- | --- |
| 3.9 | 0.251582341869 | | 4.1 | 0.248456731317 |
| 3.99 | 0.25015644562 | 4.01 | 0.24984394501 | |
| 3.999 | 0.250015627 | 4.001 | 0.249984377 | |
| 3.9999 | 0.250001563 | 4.0001 | 0.249998438 | |
| 3.99999 | 0.25000016 | 4.00001 | 0.24999984 | |

After inspecting this table, we see that the functional values less than 4 appear to be decreasing toward 0.25 whereas the functional values greater than 4 appear to be increasing toward 0.25. We conclude that $\lim_{x\to 4}\frac{\sqrt{x}-2}{x-4}=0.25.$ We confirm this estimate using the graph of $f(x)=\frac{\sqrt{x}-2}{x-4}$ shown in Figure 2.14.

*Figure 2.14* The graph of $f(x)=\frac{\sqrt{x}-2}{x-4}$ confirms the estimate from Table 2.3. (Alt: A graph of the function f(x) = (sqrt(x) – 2 ) / (x-4) over the interval [0,8]. There is an open circle on the function at x=4. The function curves asymptotically towards the x axis and y axis in quadrant one.)

### Checkpoint 2.4

Estimate $\lim_{x\to 1}\frac{\frac{1}{x}-1}{x-1}$ using a table of functional values. Use a graph to confirm your estimate.

At this point, we see from Example 2.4 and Example 2.5 that it may be just as easy, if not easier, to estimate a limit of a function by inspecting its graph as it is to estimate the limit by using a table of functional values. In Example 2.6, we evaluate a limit exclusively by looking at a graph rather than by using a table of functional values.

### Example 2.6

#### Evaluating a Limit Using a Graph

For $g(x)$ shown in Figure 2.15, evaluate $\lim_{x\to -1}g(x).$

*Figure 2.15* The graph of $g(x)$ includes one value not on a smooth curve. (Alt: The graph of a generic curving function g(x). In quadrant two, there is an open circle on the function at (-1,3) and a closed circle one unit up at (-1, 4).)

#### Solution

Despite the fact that $g(-1)=4,$ as the *x* -values approach −1 from either side, the $g(x)$ values approach 3. Therefore, $\lim_{x\to -1}g(x)=3.$ Note that we can determine this limit without even knowing the algebraic expression of the function.

Based on Example 2.6, we make the following observation: It is possible for the limit of a function to exist at a point, and for the function to be defined at this point, but the limit of the function and the value of the function at the point may be different.

### Checkpoint 2.5

Use the graph of $h(x)$ in Figure 2.16 to evaluate $\lim_{x\to 2}h(x),$ if possible.

*Figure 2.16* (Alt: A graph of the function h(x), which is a parabola graphed over [-2.5, 5]. There is an open circle where the vertex should be at the point (2,-1).)

Looking at a table of functional values or looking at the graph of a function provides us with useful insight into the value of the limit of a function at a given point. However, these techniques rely too much on guesswork. We eventually need to develop alternative methods of evaluating limits. These new methods are more algebraic in nature and we explore them in the next section; however, at this point we introduce two special limits that are foundational to the techniques to come.

### Theorem 2.1

#### Two Important Limits

Let *a* be a real number and *c* be a constant.

1. $$ \lim_{x\to a}x=a $$ (2.4)
2. $$ \lim_{x\to a}c=c $$ (2.5)

We can make the following observations about these two limits.

1. For the first limit, observe that as *x* approaches *a* , so does $f(x),$ because $f(x)=x.$ Consequently, $\lim_{x\to a}x=a.$
2. For the second limit, consider Table 2.4.

| *x* | $f(x)=c$ | | *x* | $f(x)=c$ |
| --- | --- | --- | --- | --- |
| $a-0.1$ | *c* | | $a+0.1$ | *c* |
| $a-0.01$ | *c* | $a+0.01$ | *c* | |
| $a-0.001$ | *c* | $a+0.001$ | *c* | |
| $a-0.0001$ | *c* | $a+0.0001$ | *c* | |

Observe that for all values of *x* (regardless of whether they are approaching *a* ), the values $f(x)$ remain constant at *c* . We have no choice but to conclude $\lim_{x\to a}c=c.$

### The Existence of a Limit

As we consider the limit in the next example, keep in mind that for the limit of a function to exist at a point, the functional values must approach a single real-number value at that point. If the functional values do not approach a single value, then the limit does not exist.

### Example 2.7

#### Evaluating a Limit That Fails to Exist

Evaluate $\lim_{x\to 0}\mathrm{sin} (1\text{/}\text{x})$ using a table of values.

#### Solution

Table 2.5 lists values for the function $\mathrm{sin}(1\text{/}x)$ for the given values of *x* .

| *x* | $\mathrm{sin}(\frac{1}{x})$ | | *x* | $\mathrm{sin}(\frac{1}{x})$ |
| --- | --- | --- | --- | --- |
| −0.1 | 0.544021110889 | | 0.1 | −0.544021110889 |
| −0.01 | 0.50636564111 | 0.01 | −0.50636564111 | |
| −0.001 | −0.8268795405312 | 0.001 | 0.826879540532 | |
| −0.0001 | 0.305614388888 | 0.0001 | −0.305614388888 | |
| −0.00001 | −0.035748797987 | 0.00001 | 0.035748797987 | |
| −0.000001 | 0.349993504187 | 0.000001 | −0.349993504187 | |

After examining the table of functional values, we can see that the *y* -values do not seem to approach any one single value. It appears the limit does not exist. Before drawing this conclusion, let’s take a more systematic approach. Take the following sequence of *x* -values approaching 0:

$$
\frac{2}{π},\frac{2}{3π},\frac{2}{5π},\frac{2}{7π},\frac{2}{9π},\frac{2}{11π}\text{,….}
$$

The corresponding *y* -values are

$$
1,-1,1,-1,1,-1\text{,….}
$$

At this point we can indeed conclude that $\lim_{x\to 0}\mathrm{sin} (1\text{/}\text{x})$ does not exist. (Mathematicians frequently abbreviate “does not exist” as DNE. Thus, we would write $\lim_{x\to 0}\mathrm{sin} (1\text{/}\text{x})$ DNE.) The graph of $f(x)=\mathrm{sin} (1\text{/}x)$ is shown in Figure 2.17 and it gives a clearer picture of the behavior of $\mathrm{sin}(1\text{/}x)$ as *x* approaches 0. You can see that $\mathrm{sin}(1\text{/}\text{x})$ oscillates ever more wildly between −1 and 1 as *x* approaches 0.

*Figure 2.17* The graph of $f(x)=\mathrm{sin}(1\text{/}x)$ oscillates rapidly between −1 and 1 as *x* approaches 0. (Alt: The graph of the function f(x) = sin(1/x), which oscillates rapidly between -1 and 1 as x approaches 0. The oscillations are less frequent as the function moves away from 0 on the x axis.)

### Checkpoint 2.6

Use a table of functional values to evaluate $\lim_{x\to 2}\frac{|x^{2}-4|}{x-2},$ if possible.

### One-Sided Limits

Sometimes indicating that the limit of a function fails to exist at a point does not provide us with enough information about the behavior of the function at that particular point. To see this, we now revisit the function $g(x)=|x-2|\text{/}(x-2)$ introduced at the beginning of the section (see Figure 2.12(b)). As we pick values of *x* close to 2, $g(x)$ does not approach a single value, so the limit as *x* approaches 2 does not exist—that is, $\lim_{x\to 2}g(x)$ DNE. However, this statement alone does not give us a complete picture of the behavior of the function around the *x* -value 2. To provide a more accurate description, we introduce the idea of a one-sided limit. For all values to the left of 2 (or *the negative side of* 2), $g(x)=-1.$ Thus, as *x* approaches 2 from the left, $g(x)$ approaches −1. Mathematically, we say that the limit as *x* approaches 2 from the left is −1. Symbolically, we express this idea as

$$
\lim_{x\to 2^{-}}g(x)=-1.
$$

Similarly, as *x* approaches 2 from the right (or *from the positive side* ), $g(x)$ approaches 1. Symbolically, we express this idea as

$$
\lim_{x\to 2^{+}}g(x)=1.
$$

We can now present an informal definition of one-sided limits.

### Definition

We define two types of **one-sided limits** .

*Limit from the left:* Let $f(x)$ be a function defined at all values in an open interval of the form ( *c* , *a* ), and let *L* be a real number. If the values of the function $f(x)$ approach the real number *L* as the values of *x* (where $x<\text{a}\text{)}$ approach the number *a* , then we say that *L* is the limit of $f(x)$ as *x* approaches a from the left. Symbolically, we express this idea as

$$
\lim_{x\to a^{-}}f(x)=L.
$$

(2.6)

*Limit from the right:* Let $f(x)$ be a function defined at all values in an open interval of the form $(a,c),$ and let *L* be a real number. If the values of the function $f(x)$ approach the real number L as the values of *x* (where $x>\text{a}\text{)}$ approach the number *a* , then we say that *L* is the limit of $f(x)$ as *x* approaches *a* from the right. Symbolically, we express this idea as

$$
\lim_{x\to a^{+}}f(x)=L.
$$

(2.7)

### Example 2.8

#### Evaluating One-Sided Limits

For the function $f(x)={\begin{matrix}x+1 & \text{if} x<2 \\ x^{2}-4 & \text{if} x\geq 2\end{matrix},$ evaluate each of the following limits.

1. $\lim_{x\to 2^{-}}f(x)$
2. $\lim_{x\to 2^{+}}f(x)$

#### Solution

We can use tables of functional values again Table 2.6. Observe that for values of *x* less than 2, we use $f(x)=x+1$ and for values of *x* greater than 2, we use $f(x)=x^{2}-4.$

| *x* | $f(x)=x+1$ | | *x* | $f(x)=x^{2}-4$ |
| --- | --- | --- | --- | --- |
| 1.9 | 2.9 | | 2.1 | 0.41 |
| 1.99 | 2.99 | 2.01 | 0.0401 | |
| 1.999 | 2.999 | 2.001 | 0.004001 | |
| 1.9999 | 2.9999 | 2.0001 | 0.00040001 | |
| 1.99999 | 2.99999 | 2.00001 | 0.0000400001 | |

Based on this table, we can conclude that a. $\lim_{x\to 2^{-}}f(x)=3$ and b. $\lim_{x\to 2^{+}}f(x)=0.$ Therefore, the (two-sided) limit of $f(x)$ does not exist at $x=2.$ Figure 2.18 shows a graph of $f(x)$ and reinforces our conclusion about these limits.

*Figure 2.18* The graph of $f(x)={\begin{matrix}x+1 \text{if} x<2 \\ x^{2}-4 \text{if} x\geq 2\end{matrix}$ has a break at $x=2.$ (Alt: The graph of the given piecewise function. The first piece is f(x) = x+1 if x < 2. The second piece is x^2 – 4 if x >= 2. The first piece is a line with x intercept at (-1, 0) and y intercept at (0,1). There is an open circle at (2,3), where the endpoint would be. The second piece is the right half of a parabola opening upward. The vertex at (2,0) is a solid circle.)

### Checkpoint 2.7

Use a table of functional values to estimate the following limits, if possible.

1. $\lim_{x\to 2^{-}}\frac{|x^{2}-4|}{x-2}$
2. $\lim_{x\to 2^{+}}\frac{|x^{2}-4|}{x-2}$

Let us now consider the relationship between the limit of a function at a point and the limits from the right and left at that point. It seems clear that if the limit from the right and the limit from the left have a common value, then that common value is the limit of the function at that point. Similarly, if the limit from the left and the limit from the right take on different values, the limit of the function does not exist. These conclusions are summarized in Relating One-Sided and Two-Sided Limits.

### Theorem 2.2

#### Relating One-Sided and Two-Sided Limits

Let $f(x)$ be a function defined at all values in an open interval containing *a* , with the possible exception of *a* itself, and let *L* be a real number. Then,

$$
\lim_{x\to a}f(x)=L \text{if and only if} \lim_{x\to a^{-}}f(x)=L \text{and} \lim_{x\to a^{+}}f(x)=L.
$$

### Infinite Limits

Evaluating the limit of a function at a point or evaluating the limit of a function from the right and left at a point helps us to characterize the behavior of a function around a given value. As we shall see, we can also describe the behavior of functions that do not have finite limits.

We now turn our attention to $h(x)=1\text{/}(x-2)^{2},$ the third and final function introduced at the beginning of this section (see Figure 2.12(c)). From its graph we see that as the values of *x* approach 2, the values of $h(x)=1\text{/}(x-2)^{2}$ become larger and larger and, in fact, become infinite. Mathematically, we say that the limit of $h(x)$ as *x* approaches 2 is positive infinity. Symbolically, we express this idea as

$$
\lim_{x\to 2}h(x)=+\infty .
$$

More generally, we define infinite limits as follows:

### Definition

We define three types of **infinite limits** .

*Infinite limits from the left:* Let $f(x)$ be a function defined at all values in an open interval of the form $(b,a).$

1. If the values of $f(x)$ increase without bound as the values of *x* (where $x<\text{a}\text{)}$ approach the number *a* , then we say that the limit as *x* approaches *a* from the left is positive infinity and we write $$ \lim_{x\to a^{-}}f(x)=+\infty . $$ (2.8)
2. If the values of $f(x)$ decrease without bound as the values of *x* (where $x<\text{a}\text{)}$ approach the number *a* , then we say that the limit as *x* approaches *a* from the left is negative infinity and we write $$ \lim_{x\to a^{-}}f(x)=-\infty . $$ (2.9)

*Infinite limits from the right* : Let $f(x)$ be a function defined at all values in an open interval of the form $(a,c).$

1. If the values of $f(x)$ increase without bound as the values of *x* (where $x>\text{a}\text{)}$ approach the number *a* , then we say that the limit as *x* approaches *a* from the right is positive infinity and we write $$ \lim_{x\to a^{+}}f(x)=+\infty . $$ (2.10)
2. If the values of $f(x)$ decrease without bound as the values of *x* (where $x>\text{a}\text{)}$ approach the number *a* , then we say that the limit as *x* approaches *a* from the right is negative infinity and we write $$ \lim_{x\to a^{+}}f(x)=-\infty . $$ (2.11)

*Two-sided infinite limit:* Let $f(x)$ be defined for all $x\neq a$ in an open interval containing *a* .

1. If the values of $f(x)$ increase without bound as the values of *x* (where $x\neq \text{a}\text{)}$ approach the number *a* , then we say that the limit as *x* approaches *a* is positive infinity and we write $$ \lim_{x\to a}f(x)=+\infty . $$ (2.12)
2. If the values of $f(x)$ decrease without bound as the values of *x* (where $x\neq \text{a}\text{)}$ approach the number *a* , then we say that the limit as *x* approaches *a* is negative infinity and we write $$ \lim_{x\to a}f(x)=-\infty . $$ (2.13)

It is important to understand that when we write statements such as $\lim_{x\to a}f(x)=+\infty$ or $\lim_{x\to a}f(x)=-\infty$ we are describing the behavior of the function, as we have just defined it. We are not asserting that a limit exists. For the limit of a function $f(x)$ to exist at *a* , it must approach a real number *L* as *x* approaches *a* . That said, if, for example, $\lim_{x\to a}f(x)=+\infty ,$ we always write $\lim_{x\to a}f(x)=+\infty$ rather than $\lim_{x\to a}f(x)$ DNE.

### Example 2.9

#### Recognizing an Infinite Limit

Evaluate each of the following limits, if possible. Use a table of functional values and graph $f(x)=1\text{/}x$ to confirm your conclusion.

1. $\lim_{x\to 0^{-}}\frac{1}{x}$
2. $\lim_{x\to 0^{+}}\frac{1}{x}$
3. $\lim_{x\to 0}\frac{1}{x}$

#### Solution

Begin by constructing a table of functional values.

| *x* | $\frac{1}{x}$ | | *x* | $\frac{1}{x}$ |
| --- | --- | --- | --- | --- |
| −0.1 | −10 | | 0.1 | 10 |
| −0.01 | −100 | 0.01 | 100 | |
| −0.001 | −1000 | 0.001 | 1000 | |
| −0.0001 | −10,000 | 0.0001 | 10,000 | |
| −0.00001 | −100,000 | 0.00001 | 100,000 | |
| −0.000001 | −1,000,000 | 0.000001 | 1,000,000 | |

1. The values of $1\text{/}x$ decrease without bound as *x* approaches 0 from the left. We conclude that $$ \lim_{x\to 0^{-}}\frac{1}{x}=-\infty . $$
2. The values of $1\text{/}x$ increase without bound as *x* approaches 0 from the right. We conclude that $$ \lim_{x\to 0^{+}}\frac{1}{x}=+\infty . $$
3. Since $\lim_{x\to 0^{-}}\frac{1}{x}=-\infty$ and $\lim_{x\to 0^{+}}\frac{1}{x}=+\infty$ have different values, we conclude that $$ \lim_{x\to 0}\frac{1}{x} \text{DNE.} $$

The graph of $f(x)=1\text{/}x$ in Figure 2.19 confirms these conclusions.

*Figure 2.19* The graph of $f(x)=1\text{/}x$ confirms that the limit as *x* approaches 0 does not exist. (Alt: The graph of the function f(x) = 1/x. The function curves asymptotically towards x=0 and y=0 in quadrants one and three.)

### Checkpoint 2.8

Evaluate each of the following limits, if possible. Use a table of functional values and graph $f(x)=1\text{/}x^{2}$ to confirm your conclusion.

1. $\lim_{x\to 0^{-}}\frac{1}{x^{2}}$
2. $\lim_{x\to 0^{+}}\frac{1}{x^{2}}$
3. $\lim_{x\to 0}\frac{1}{x^{2}}$

It is useful to point out that functions of the form $f(x)=1\text{/}(x-a)^{n},$ where *n* is a positive integer, have infinite limits as *x* approaches *a* from either the left or right (Figure 2.20). These limits are summarized in Infinite Limits from Positive Integers.

*Figure 2.20* The function $f(x)=1\text{/}(x-a)^{n}$ has infinite limits at *a* . (Alt: Two graphs side by side of f(x) = 1 / (x-a)^n. The first graph shows the case where n is an odd positive integer, and the second shows the case where n is an even positive integer. In the first, the graph has two segments. Each curve asymptotically towards the x axis, also known as y=0, and x=a. The segment to the left of x=a is below the x axis, and the segment to the right of x=a is above the x axis. In the second graph, both segments are above the x axis.)

### Theorem 2.3

#### Infinite Limits from Positive Integers

If *n* is a positive even integer, then

$$
\lim_{x\to a}\frac{1}{(x-a)^{n}}=+\infty .
$$

If *n* is a positive odd integer, then

$$
\lim_{x\to a^{+}}\frac{1}{(x-a)^{n}}=+\infty
$$

and

$$
\lim_{x\to a^{-}}\frac{1}{(x-a)^{n}}=-\infty .
$$

We should also point out that in the graphs of $f(x)=1\text{/}(x-a)^{n},$ points on the graph having *x* -coordinates very near to *a* are very close to the vertical line $x=a.$ That is, as *x* approaches *a* , the points on the graph of $f(x)$ are closer to the line $x=a.$ The line $x=a$ is called a vertical asymptote of the graph. We formally define a vertical asymptote as follows:

### Definition

Let $f(x)$ be a function. If any of the following conditions hold, then the line $x=a$ is a **vertical asymptote** of $f(x).$

$$
\begin{matrix}\lim_{x\to a^{-}}f(x) & = & +\infty \text{or} \text{-\infty} \\ \lim_{x\to a^{+}}f(x) & = & +\infty \text{or} \text{-\infty} \\ & \text{or} & \\ \lim_{x\to a}f(x) & = & +\infty \text{or} \text{-\infty}\end{matrix}
$$

### Example 2.10

#### Finding a Vertical Asymptote

Evaluate each of the following limits using Infinite Limits from Positive Integers. Identify any vertical asymptotes of the function $f(x)=1\text{/}(x+3)^{4}.$

1. $\lim_{x\to -3^{-}}\frac{1}{(x+3)^{4}}$
2. $\lim_{x\to -3^{+}}\frac{1}{(x+3)^{4}}$
3. $\lim_{x\to -3}\frac{1}{(x+3)^{4}}$

#### Solution

We can use Infinite Limits from Positive Integers directly.

1. $\lim_{x\to -3^{-}}\frac{1}{(x+3)^{4}}=+\infty$
2. $\lim_{x\to -3^{+}}\frac{1}{(x+3)^{4}}=+\infty$
3. $\lim_{x\to -3}\frac{1}{(x+3)^{4}}=+\infty$

The function $f(x)=1\text{/}(x+3)^{4}$ has a vertical asymptote of $x=-3.$

### Checkpoint 2.9

Evaluate each of the following limits. Identify any vertical asymptotes of the function $f(x)=\frac{1}{(x-2)^{3}}.$

1. $\lim_{x\to 2^{-}}\frac{1}{(x-2)^{3}}$
2. $\lim_{x\to 2^{+}}\frac{1}{(x-2)^{3}}$
3. $\lim_{x\to 2}\frac{1}{(x-2)^{3}}$

In the next example we put our knowledge of various types of limits to use to analyze the behavior of a function at several different points.

### Example 2.11

#### Behavior of a Function at Different Points

Use the graph of $f(x)$ in Figure 2.21 to determine each of the following values:

1. $\lim_{x\to -4^{-}}f(x);\lim_{x\to -4^{+}}f(x);\lim_{x\to -4}f(x);f(-4)$
2. $\lim_{x\to -2^{-}}f(x);\lim_{x\to -2^{+}}f(x);\lim_{x\to -2}f(x);f(-2)$
3. $\lim_{x\to 1^{-}}f(x);\lim_{x\to 1^{+}}f(x);\lim_{x\to 1}f(x);f(1)$
4. $\lim_{x\to 3^{-}}f(x);\lim_{x\to 3^{+}}f(x);\lim_{x\to 3}f(x);f(3)$

*Figure 2.21* The graph shows $f(x).$ (Alt: The graph of a function f(x) described by the above limits and values. There is a smooth curve for values below x=-2; at (-2, 3), there is an open circle. There is a smooth curve between (-2, 1] with a closed circle at (1,6). There is an open circle at (1,3), and a smooth curve stretching from there down asymptotically to negative infinity along x=3. The function also curves asymptotically along x=3 on the other side, also stretching to negative infinity. The function then changes concavity in the first quadrant around y=4.5 and continues up.)

#### Solution

Using Infinite Limits from Positive Integers and the graph for reference, we arrive at the following values:

1. $\lim_{x\to -4^{-}}f(x)=0;\lim_{x\to -4^{+}}f(x)=0;\lim_{x\to -4}f(x)=0;f(-4)=0$
2. $\lim_{x\to -2^{-}}f(x)=3.;\lim_{x\to -2^{+}}f(x)=3;\lim_{x\to -2}f(x)=3;f(-2)$ is undefined
3. $\lim_{x\to 1^{-}}f(x)=6;\lim_{x\to 1^{+}}f(x)=3;\lim_{x\to 1}f(x)$ DNE; $f(1)=6$
4. $\lim_{x\to 3^{-}}f(x)=-\infty ;\lim_{x\to 3^{+}}f(x)=-\infty ;\lim_{x\to 3}f(x)=-\infty ;f(3)$ is undefined

### Checkpoint 2.10

Evaluate $\lim_{x\to 1}f(x)$ for $f(x)$ shown here:

### Example 2.12

#### Chapter Opener: Einstein’s Equation

*Figure 2.22* (credit: NASA) (Alt: A picture of a futuristic spaceship speeding through deep space.)

In the chapter opener we mentioned briefly how Albert Einstein showed that a limit exists to how fast any object can travel. Given Einstein’s equation for the mass of a moving object, what is the value of this bound?

#### Solution

Our starting point is Einstein’s equation for the mass of a moving object,

$$
m=\frac{m_{0}}{\sqrt{1-\frac{v^{2}}{c^{2}}}},
$$

where $m_{0}$ is the object’s mass at rest, *v* is its speed, and *c* is the speed of light. To see how the mass changes at high speeds, we can graph the ratio of masses $m\text{/}m_{0}$ as a function of the ratio of speeds, $v\text{/}c$ (Figure 2.23).

*Figure 2.23* This graph shows the ratio of masses as a function of the ratio of speeds in Einstein’s equation for the mass of a moving object. (Alt: A graph showing the ratio of masses as a function of the ratio of speed in Einstein’s equation for the mass of a moving object. The x axis is the ratio of the speeds, v/c. The y axis is the ratio of the masses, m/m0. The equation of the function is m = m0 / sqrt(1 – v2 / c2 ). The graph is only in quadrant 1. It starts at (0,1) and curves up gently until about 0.8, where it increases seemingly exponentially; there is a vertical asymptote at v/c (or x) = 1.)

We can see that as the ratio of speeds approaches 1—that is, as the speed of the object approaches the speed of light—the ratio of masses increases without bound. In other words, the function has a vertical asymptote at $v\text{/}c=1.$ We can try a few values of this ratio to test this idea.

| $\frac{v}{c}$ | $\sqrt{1-\frac{v^{2}}{c^{2}}}$ | $\frac{m}{m_{0}}$ |
| --- | --- | --- |
| 0.99 | 0.1411 | 7.089 |
| 0.999 | 0.0447 | 22.37 |
| 0.9999 | 0.0141 | 70.71 |

Thus, according to Table 2.8, if an object with mass 100 kg is traveling at 0.9999 *c* , its mass becomes 7071 kg. Since no object can have an infinite mass, we conclude that no object can travel at or more than the speed of light.

## Section Exercises

Selected openly licensed end-of-section exercises from this OpenStax section. The complete set is on the source page.

For the following exercises, consider the function $f(x)=\frac{x^{2}-1}{|x-1|}.$

**Exercise.** 30. **[T]** Complete the following table for the function. Round your solutions to four decimal places.

**Exercise.** 31. What do your results in the preceding exercise indicate about the two-sided limit $\lim_{x\to 1}f(x)?$ Explain your response.

**Exercise.** 32. **[T]** Make a table showing the values of *f* for $x=-0.01,-0.001,-0.0001,-0.00001$ and for $x=0.01,0.001,0.0001,0.00001.$ Round your solutions to five decimal places.

**Exercise.** 33. What does the table of values in the preceding exercise indicate about the function $f(x)=(1+x)^{1\text{/}x}?$

**Exercise.** 34. To which mathematical constant does the limit in the preceding exercise appear to be getting closer?

**Exercise.** 35. **[T]** $\lim_{x\to 0}\frac{\mathrm{sin} 2x}{x}; \pm 0.1,\pm 0.01,\pm 0.001,\pm .0001$

**Exercise.** 36. **[T]** $\lim_{x\to 0}\frac{\mathrm{sin} 3x}{x}$ ±0.1, ±0.01, ±0.001, ±0.0001

**Exercise.** 37. Use the preceding two exercises to conjecture (guess) the value of the following limit: $\lim_{x\to 0}\frac{\mathrm{sin} ax}{x}$ for *a* , a positive real value.
