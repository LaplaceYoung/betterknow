# Two.I.1 Definition of Vector Space

Title: Two.I.1 Definition of Vector Space
Book: Linear Algebra (4th edition)
Authors: Jim Hefferon
Publisher: Orthogonal Publishing L3C / University of Vermont
License: Creative Commons Attribution-ShareAlike 3.0 United States (CC BY-SA 3.0 US)
License URL: https://creativecommons.org/licenses/by-sa/3.0/us/
Source: https://hefferon.net/linearalgebra/
Course-aliases: 线性代数, Linear Algebra
Extract: UTF-8 plain-text extract of the official Free textbook Linear Algebra by Jim Hefferon for the simo know local teaching knowledge base.
Figures are omitted or replaced with captions. This extract is offered under the same CC BY-SA license as the source.
This extract is not for training large language models.

---

# Vector Spaces

The first chapter finished with a fair
understanding
of how Gauss's Method solves a linear system.
It systematically takes linear combinations of the rows.
Here we move to a general study of linear
combinations.

We need a setting.
At times in the first chapter we've combined vectors from $\mathbb{R}^2$,
at other times vectors from $\mathbb{R}^3$,
and at other times vectors from higher-dimensional spaces.
So our first impulse might be
to work in $\mathbb{R}^n$, leaving $n$ unspecified.
This would have the advantage that any of the results
would hold for $\mathbb{R}^2$ and for $\mathbb{R}^3$ and for many other spaces,
simultaneously.

But if having the results apply to many spaces at once is
advantageous then sticking only to $\mathbb{R}^n$'s is restrictive.
We'd like our results to apply to combinations of row vectors,
as in the final section of the first chapter.
We've even seen some spaces that are not simply a collection of all of the
same-sized column vectors or row vectors.
For instance, we've seen a homogeneous system's solution
set that is a plane inside of $\mathbb{R}^3$.
This set is a closed system in that
a linear combination of these solutions is also a solution.
But it does not contain all of the three-tall column vectors,
only some of them.

We want the results about linear combinations to apply anywhere that linear
combinations make sense.
We shall call any such set a **vector space**.
Our results, instead of being phrased as
“Whenever we have a collection in which we can sensibly take linear
combinations ...”, will be stated
“In any vector space ...”

Such a statement describes at once what
happens in many spaces.
To understand the advantages of moving from studying a single space
to studying a class of spaces, consider this analogy.
Imagine that the government made laws one person at a time:
“Leslie Jones can't jay walk.”
That would be bad;
statements have the virtue of economy when they apply to many cases at once.
Or suppose that they said, “Kim Ke must stop when passing
an accident.”
Contrast that with, “Any doctor must stop when passing
an accident.”
More general statements, in some ways, are clearer.

## Definition of Vector Space

We shall study structures with two operations,
an addition and a scalar multiplication, that are subject to some
simple conditions.
We will reflect more on the conditions later
but on first reading notice how reasonable they are.
For instance, surely any operation that can be called an addition
(e.g., column vector addition, row vector addition, or
real number addition) will satisfy conditions (1) through (5) below.

### Definition and Examples

**Definition.**

A **vector space**
(over \( \mathbb{R} \)) consists of a set \( V \) along with
two operations
‘+'
and ‘\( \cdot \)'
subject to the conditions
that for all vectors \( \vec{v},\vec{w},\vec{u}\in V \)
and all **scalars**
\( r,s\in\mathbb{R} \):

- the set $V$ is closed under
  vector addition, that is,
  \( \vec{v}+\vec{w}\in V \)

- vector addition is commutative,
  \( \vec{v}+\vec{w}=\vec{w}+\vec{v} \)

- vector addition is associative,
  \( (\vec{v}+\vec{w})+\vec{u}=\vec{v}+(\vec{w}+\vec{u}) \)

- there is a **zero vector**
    \( \vec{0}\in V \) such that
    \( \vec{v}+\vec{0}=\vec{v}  \) for all \( \vec{v}\in V \)

- each \( \vec{v}\in V \) has an
    **additive inverse**
    \( \vec{w}\in V \) such that \( \vec{w}+\vec{v}=\vec{0} \)

- the set $V$ is closed under
    scalar multiplication, that is,
   \( r\cdot\vec{v}\in V \)

- scalar multiplication distributes over scalar addition,
 \( (r+s)\cdot\vec{v}=r\cdot\vec{v}+s\cdot\vec{v} \)

- scalar multiplication distributes over vector addition,
  \( r\cdot(\vec{v}+\vec{w})=r\cdot\vec{v}+r\cdot\vec{w} \)

- ordinary multiplication of scalars associates with
  scalar multiplication, \( (rs)\cdot\vec{v} =r\cdot(s\cdot\vec{v}) \)

- multiplication by the scalar $1$ is the
  identity operation, \( 1\cdot\vec{v}=\vec{v} \).

**Remark.**
The definition involves two kinds of addition and two kinds of multiplication,
and so may at first seem confused.
For instance, in condition (7)
the ‘$+$' on the left is addition of two real numbers
while the ‘$+$' on the right is addition of two vectors in
\( V \).
These expressions aren't ambiguous because of context; for example,
\( r \) and \( s \)
are real numbers so ‘\( r+s \)' can only mean real number addition.
In the same way, item (9)'s left side ‘$rs$' is ordinary real number
multiplication, while its right side ‘$s\cdot\vec{v}$' is
the scalar multiplication defined for this
vector space.

The best way to understand the definition is to
go through the examples below and for each,
check all ten conditions.
The first example includes that check, written out at length.
Use it as a model for the others.
Especially important are the **closure**
conditions, (1) and (6).
They specify that the addition and scalar multiplication operations
are always sensible— they are defined for every pair of vectors
and every scalar and vector,
and the result of the operation is a member of the set.

**Example.**
This subset of \( \mathbb{R}^2 \) is a line through the origin.

$$
  L=\{ \begin{pmatrix} x \\ y \end{pmatrix}  \mid y=3x\}
$$

We shall verify that it is a
vector space under the usual meaning of ‘+' and ‘\(\cdot\)'.

$$
  \begin{pmatrix} x_1 \\ y_1 \end{pmatrix}
  +
  \begin{pmatrix} x_2 \\ y_2 \end{pmatrix}
  =
  \begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}
  r\cdot
  \begin{pmatrix} x \\ y \end{pmatrix}
  =
  \begin{pmatrix} rx \\ ry \end{pmatrix}
$$

These operations
are just the ordinary ones, reused on its subset $L$.
We say that \( L \) **inherits**
these operations from \( \mathbb{R}^2 \).

We shall check all ten conditions.
The paragraph having to do with addition has five conditions.
For condition (1), closure under addition,
suppose that we start with two vectors from the line $L$,

$$
  \vec{v}_1=\begin{pmatrix} x_1 \\ y_1 \end{pmatrix}
  \vec{v}_2=\begin{pmatrix} x_2 \\ y_2 \end{pmatrix}
$$

so that they satisfy the restrictions
that $y_1=3x_1$ and $y_2=3x_2$.
Their sum

$$
  \vec{v}_1+\vec{v}_2
  =\begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}
$$

is also a member of the line $L$
because the fact that its second component is three times its first
$y_1+y_2=3(x_1+x_2)$ follows from the
restrictions on $\vec{v}_1$ and $\vec{v}_2$.
For (2), that addition of vectors commutes,
just compare

$$
  \vec{v}_1+\vec{v}_2
  =\begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}
  \vec{v}_2+\vec{v}_1
  =\begin{pmatrix} x_2+x_1 \\ y_2+y_1 \end{pmatrix}
$$

and note that they are equal since their entries are real numbers and
real numbers commute.
(That the vectors satisfy the restriction of lying in the line is not relevant
for this condition;
they commute just because all vectors in the plane commute.)
Condition (3), associativity of vector addition, is similar.

$$
\begin{aligned}
  (\begin{pmatrix} x_1 \\ y_1 \end{pmatrix}
  +\begin{pmatrix} x_2 \\ y_2 \end{pmatrix})
  +\begin{pmatrix} x_3 \\ y_3 \end{pmatrix}
  &=\begin{pmatrix} (x_1+x_2)+x_3 \\ (y_1+y_2)+y_3 \end{pmatrix}  \\
  &=\begin{pmatrix} x_1+(x_2+x_3) \\ y_1+(y_2+y_3) \end{pmatrix}  \\
  &=\begin{pmatrix} x_1 \\ y_1 \end{pmatrix}
  +(\begin{pmatrix} x_2 \\ y_2 \end{pmatrix}
  +\begin{pmatrix} x_3 \\ y_3 \end{pmatrix})
\end{aligned}
$$

For the fourth condition we must produce a vector that acts as the
zero element.
The vector of zero entries will do.

$$
  \begin{pmatrix} x \\ y \end{pmatrix}
  +\begin{pmatrix} 0 \\ 0 \end{pmatrix}
  =\begin{pmatrix} x \\ y \end{pmatrix}
$$

Note that $\vec{0}\in L$ as its second component is triple its first.
For (5), that given any $\vec{v}\in L$ we can
produce an additive inverse, we have

$$
  \begin{pmatrix} -x \\ -y \end{pmatrix}
  +\begin{pmatrix} x \\ y \end{pmatrix}
  =\begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$

and so the vector $-\vec{v}$ is the desired inverse.
As with the prior condition, observe here that if $\vec{v}\in L$, so that
$y=3x$, then $-\vec{v}\in L$ also, since $-y=3(-x)$.

The checks for the five conditions having to do with scalar multiplication
are similar.
For (6), closure under scalar multiplication,
suppose that $r\in\mathbb{R}$ and $\vec{v}\in L$, that is,

$$
  \vec{v}=\begin{pmatrix} x \\ y \end{pmatrix}
$$

satisfies that $y=3x$.
Then

$$
  r\cdot\vec{v}=r\cdot\begin{pmatrix} x \\ y \end{pmatrix}
  =\begin{pmatrix} rx \\ ry \end{pmatrix}
$$

is also a member of $L$: the relation $ry=3\cdot rx$ holds because
$y=3x$.
Next, this checks (7).

$$
  (r+s)\cdot\begin{pmatrix} x \\ y \end{pmatrix}
  =\begin{pmatrix} (r+s)x \\ (r+s)y \end{pmatrix}
  =\begin{pmatrix} rx+sx \\ ry+sy \end{pmatrix}
  =r\cdot\begin{pmatrix} x \\ y \end{pmatrix}+s\cdot\begin{pmatrix} x \\ y \end{pmatrix}
$$

For (8) we have this.

$$
  r\cdot(\begin{pmatrix} x_1 \\ y_1 \end{pmatrix}+\begin{pmatrix} x_2 \\ y_2 \end{pmatrix})
  =\begin{pmatrix} r(x_1+x_2) \\ r(y_1+y_2) \end{pmatrix}
  =\begin{pmatrix} rx_1+rx_2 \\ ry_1+ry_2 \end{pmatrix}
  =r\cdot\begin{pmatrix} x_1 \\ y_1 \end{pmatrix}+r\cdot\begin{pmatrix} x_2 \\ y_2 \end{pmatrix}
$$

The ninth

$$
  (rs)\cdot\begin{pmatrix} x \\ y \end{pmatrix}
  =\begin{pmatrix} (rs)x \\ (rs)y \end{pmatrix}
  =\begin{pmatrix} r(sx) \\ r(sy) \end{pmatrix}
  =r\cdot(s\cdot\begin{pmatrix} x \\ y \end{pmatrix})
$$

and tenth conditions are also straightforward.

$$
  1\cdot\begin{pmatrix} x \\ y \end{pmatrix}
  =\begin{pmatrix} 1x \\ 1y \end{pmatrix}
  =\begin{pmatrix} x \\ y \end{pmatrix}
$$

**Example.**
The whole plane, the set
\( \mathbb{R}^2 \), is a vector space where the operations ‘\( + \)' and ‘\( \cdot \)'
have their usual meaning.

$$
  \begin{pmatrix} x_1 \\ y_1 \end{pmatrix}
  +
  \begin{pmatrix} x_2 \\ y_2 \end{pmatrix}
  =
  \begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}
  r\cdot
  \begin{pmatrix} x \\ y \end{pmatrix}
  =
  \begin{pmatrix} rx \\ ry \end{pmatrix}
$$

We shall check just two of the conditions, the closure conditions.

For (1) observe that
the result of the vector sum

$$
  \begin{pmatrix} x_1 \\ y_1 \end{pmatrix}
  +\begin{pmatrix} x_2 \\ y_2 \end{pmatrix}
  =\begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}
$$

is a column array with two real entries, and so is a member of the
plane \( \mathbb{R}^2 \).
In contrast with the prior example, here there is no restriction on the
first and second components of the vectors.

Condition (6) is similar.
The vector

$$
  r\cdot\begin{pmatrix} x \\ y \end{pmatrix}
  =\begin{pmatrix} rx \\ ry \end{pmatrix}
$$

has two real entries, and so is a member of \( \mathbb{R}^2 \).

In a similar way,
each \( \mathbb{R}^n \) is a vector space with the usual operations of vector addition
and scalar multiplication.
(In \( \mathbb{R}^1 \), we usually do not write the members as
column vectors, i.e., we usually do not write ‘\( (\pi) \)'.
Instead we just write ‘\( \pi \)'.)

**Example.**
the example gives a subset of $\mathbb{R}^2$ that is
a vector space.
For contrast, consider the set
of two-tall columns with entries that are integers,
under the same operations of component-wise
addition and scalar multiplication.
This is a subset of $\mathbb{R}^2$ but it is not a vector space:
it is not closed under scalar multiplication,
that is, it does not satisfy condition (6).
For instance, on the left below is a vector with integer entries, and a scalar.

$$
  0.5
  \cdot
  \begin{pmatrix} 4 \\ 3 \end{pmatrix}
  =
  \begin{pmatrix} 2 \\ 1.5 \end{pmatrix}
$$

On the right is a column vector that
is not a member of the set, since its entries are not all integers.

**Example.**
The one-element set

$$
  \{ \begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix} \}
$$

is a vector space under the operations

$$
  \begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix}
  +
  \begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix}
  =
  \begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix}
  r\cdot
  \begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix}
  =
  \begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix}
$$

that it inherits from \( \mathbb{R}^4 \).

A vector space must have at least one element, its zero vector.
Thus a one-element vector space is the smallest possible.

**Definition.**
A one-element vector space is a **trivial**

space.

The examples so far involve sets of column vectors with the usual operations.
But vector spaces need not be collections of column vectors, or even of row
vectors.
Below are some other types of vector spaces.
The term ‘vector space' does not mean ‘collection of columns of reals'.
It means something more like
‘collection in which any linear combination is sensible'.

**Example.**
Consider
\( \mathcal{P}_3=\{a_0+a_1x+a_2x^2+a_3x^3\mid a_0,...,a_3\in\mathbb{R}\} \),
the set of polynomials of degree three or less
(in this book, we'll take constant polynomials,
including the zero polynomial, to be of degree zero).
It is a vector space under the operations

$$
   (a_0+a_1x+a_2x^2+a_3x^3)+(b_0+b_1x+b_2x^2+b_3x^3)  \\
     =(a_0+b_0)+(a_1+b_1)x+(a_2+b_2)x^2+(a_3+b_3)x^3
$$

and

$$
   r\cdot(a_0+a_1x+a_2x^2+a_3x^3)=
     (ra_0)+(ra_1)x+(ra_2)x^2+(ra_3)x^3
$$

(the verification is easy).
This vector space is worthy of attention because
these are the polynomial operations familiar from high school algebra.
For instance,
$
  3\cdot(1-2x+3x^2-4x^3)-2\cdot(2-3x+x^2-(1/2)x^3)=-1+7x^2-11x^3$.

Although this space is not a subset of any \( \mathbb{R}^n \),
there is a sense in which we can think of $\mathcal{P}_3$ as “the same” as
\( \mathbb{R}^4 \).
If we identify these two space's elements in this way

$$
  a_0+a_1x+a_2x^2+a_3x^3
   corresponds to
  \begin{pmatrix} a_0 \\ a_1 \\ a_2 \\ a_3 \end{pmatrix}
$$

then the operations also correspond.
Here is an example of corresponding additions.

$$
  \begin{tabular{lr}
       &\(1-2x+0x^2+1x^3\) \\
     + &\(2+3x+7x^2-4x^3\) \\ \hline
       &\(3+1x+7x^2-3x^3\)
  \end{tabular}  }
   corresponds to
  \begin{pmatrix} 1 \\ -2 \\ 0 \\ 1 \end{pmatrix}
  +
  \begin{pmatrix} 2 \\ 3 \\ 7 \\ -4 \end{pmatrix}
  =
  \begin{pmatrix} 3 \\ 1 \\ 7 \\ -3 \end{pmatrix}
$$

Things we are thinking of as “the same” add to “the same” sum.
Chapter Three makes precise this idea of vector space correspondence.
For now we shall just leave it as an intuition.

In general we write
\( \mathcal{P}_n \) for the
vector space of polynomials of degree $n$ or less
\( \{a_0+a_1x+a_2x^2+\cdots+a_nx^n\mid a_0,...,a_n\in\mathbb{R}\} \),
under the operations of the usual polynomial addition and scalar
multiplication.
We will often use these spaces as examples.

**Example.**
The set \( \mathcal{M}_{2 \times 2} \) of \( 2 \times 2 \) matrices with
real number entries is a vector space under the natural
entry-by-entry operations.

$$
  \begin{pmatrix} a &b \\ c &d \end{pmatrix}
  +
  \begin{pmatrix} w &x \\ y &z \end{pmatrix}
  =
  \begin{pmatrix} a+w &b+x \\ c+y &d+z \end{pmatrix}
  r\cdot
  \begin{pmatrix} a &b \\ c &d \end{pmatrix}
  =
  \begin{pmatrix} ra &rb \\ rc &rd \end{pmatrix}
$$

As in the prior example, we can think of this space as
“the same” as \( \mathbb{R}^4 \).

We write
\( \mathcal{M}_{n \times m} \) for the
vector space of $n \times m$ matrices
under the natural operations of matrix addition and scalar
multiplication.
As with the polynomial spaces,
we will often use these as examples.

**Example.**
The set \( \{f\mid f\colon \mathbb{N}\to \mathbb{R} \} \) of all
real-valued functions of one natural number variable is a vector space
under the operations

$$
  (f_1+f_2) (n)=f_1(n)+f_2(n)
  (r\cdot f) (n)=r f(n)
$$

so that if, for example, \( f_1(n)=n^2+2\sin(n) \) and
\( f_2(n)=-\sin(n)+0.5 \)
then \( (f_1+2f_2) (n)=n^2+1 \).

We can view this space
as a generalization of the example— instead of
$2$-tall vectors, these functions are like infinitely-tall
vectors.

$$
    \begin{tabular{c|c}
      \( n \)      &\( f(n)=n^2+1 \)  \\ \hline
      \( 0      \) &\( 1      \)    \\
      \( 1      \) &\( 2      \)    \\
      \( 2      \) &\( 5      \)    \\
      $3$          &$10$            \\
      \( \vdots \) &\( \vdots \)
    \end{tabular} }
     corresponds to
    \begin{pmatrix} 1 \\ 2 \\ 5 \\ 10 \\ \vdots \end{pmatrix}
$$

Addition and scalar multiplication are component-wise,
as in the example.
(We can formalize “infinitely-tall” by saying that it means an infinite
sequence, or that it means a function from $\mathbb{N}$ to $\mathbb{R}$.)

**Example.**
The set of polynomials with real coefficients

$$
 \{ a_0+a_1x+\cdots+a_nx^n\mid n\in\mathbb{N}
     and  a_0,...,a_n\in\mathbb{R}\}
$$

makes a vector space when given the natural ‘$+$'

$$
  (a_0+a_1x+\cdots+a_nx^n)+(b_0+b_1x+\cdots+b_nx^n)  \\
     =(a_0+b_0)+(a_1+b_1)x+\cdots +(a_n+b_n)x^n
$$

and ‘$\cdot$'.

$$
  r\cdot (a_0+a_1x+... a_nx^n)
   =
  (ra_0)+(ra_1)x+... (ra_n)x^n
$$

This space differs from the space $\mathcal{P}_3$ of
the example.
This space contains not just degree three polynomials,
but degree thirty polynomials and
degree three hundred polynomials, too.
Each individual polynomial of course is of a finite degree,
but the set has no single bound on the degree of all of its members.

We can think of this example, like the prior one,
in terms of infinite-tuples.
For instance, we can think of \( 1+3x+5x^2 \) as corresponding to
\( (1,3,5,0,0,...) \).
However, this space differs from the one in
the example.
Here, each member of the set has a finite degree, that is,
under the correspondence there is no element from this space
matching \( (1,2,5,10, ... ) \).
Vectors in this space correspond to infinite-tuples
that end in zeroes.

**Example.**
The set
\( \{f\mid f\colon \mathbb{R}\to \mathbb{R} \} \)
of all real-valued functions of one real variable
is a vector space under these.

$$
  (f_1+f_2) (x)=f_1(x)+f_2(x)
  (r\cdot f) (x)=r f(x)
$$

The difference between this and the example is the
domain of the functions.

**Example.**
The set
\( F=\{ a\cos\theta+b\sin\theta \mid a,b\in\mathbb{R}\} \)
of real-valued functions of the real variable \( \theta \)
is a vector space under the operations

$$
  (a_1\cos\theta+b_1\sin\theta)+(a_2\cos\theta+b_2\sin\theta)
    =(a_1+a_2)\cos\theta+(b_1+b_2)\sin\theta
$$

and

$$
  r\cdot (a\cos\theta+b\sin\theta)
   =(ra)\cos\theta+(rb)\sin\theta
$$

inherited from the space in the prior example.
(We can think of \( F \) as “the same” as \( \mathbb{R}^2 \)
in that $a\cos\theta+b\sin\theta$ corresponds to the vector with
components $a$ and $b$.)

**Example.**
The set

$$
  \{f\colon \mathbb{R}\to \mathbb{R}\mid \dfrac{d^2f}{dx^2}+f=0\}
$$

is a vector space under the, by now natural, interpretation.

$$
  (f+g) (x)=f(x)+g(x)
  (r\cdot f) (x)=r f(x)
$$

In particular, notice that basic Calculus gives

$$
   \frac{d^2(f+g)}{dx^2}+(f+g)
   =(\frac{d^2f}{dx^2}+f)+(\frac{d^2g}{dx^2}+g)
$$

and

$$
   \frac{d^2(rf)}{dx^2}+(rf)
   =r(\frac{d^2 f}{dx^2}+f)
$$

and so the space is closed under addition and scalar multiplication.
This turns out to equal the space from the prior example— functions
satisfying this differential equation have the form
$a\cos\theta+b\sin\theta$— but this description
suggests an extension to solutions sets of other
differential equations.

**Example.**
The set of solutions of a homogeneous linear system in \( n \) variables
is a vector space under the operations inherited from \( \mathbb{R}^n \).
For example, for closure under addition
consider a typical equation in that system
$c_1x_1+\cdots+c_nx_n=0$ and suppose that both these vectors

$$
   \vec{v}=\begin{pmatrix} v_1 \\ \vdots \\ v_n \end{pmatrix}
   \vec{w}=\begin{pmatrix} w_1 \\ \vdots \\ w_n \end{pmatrix}
$$

satisfy the equation.
Then their sum
\( \vec{v}+\vec{w} \) also satisfies that equation:
\(
  c_1(v_1+w_1)+\cdots+c_n(v_n+w_n)
  =(c_1v_1+\cdots+c_nv_n)+(c_1w_1+\cdots+c_nw_n)
  =0
\).
The checks of the other vector space conditions are just as routine.

We often omit the multiplication symbol ‘\( \cdot \)' between the
scalar and the vector.
We distinguish the multiplication in
\( c_1v_1 \) from that in \( r\vec{v}  \) by context, since if both
multiplicands are real numbers then it must be
real-real multiplication while if one is a vector then it must be
scalar-vector multiplication.

the example has brought us full circle since it is one of
our motivating examples.
Now, with some feel for the kinds of structures that satisfy the definition
of a vector space, we can reflect on that definition.
For example, why specify in the definition the condition that
\( 1\cdot\vec{v}=\vec{v} \) but not a condition that \( 0\cdot\vec{v}=\vec{0} \)?

One answer is that this is just a definition— it gives the rules
and you need to follow those rules to continue.

Another answer is perhaps more satisfying.
People in this area have worked to develop the
right balance of power and generality.
This definition is shaped so that it contains the conditions
needed to prove all of the interesting and
important properties of spaces of linear combinations.
As we proceed, we shall derive all of the properties natural to collections of
linear combinations from the conditions given in the definition.

The next result is an example.
We do not need to include these properties in the definition of vector space
because they follow from the properties already listed there.

**Lemma.**
In any vector space \( V \),
for any \( \vec{v}\in V \) and \( r\in\mathbb{R} \), we have
(1) \( 0\cdot\vec{v}=\vec{0} \),
(2) \( (-1\cdot\vec{v})+\vec{v}=\vec{0} \), and
(3) \( r\cdot\vec{0}=\vec{0} \).

*Proof.*
For (1) note that
\( \vec{v}=(1+0)\cdot\vec{v}=\vec{v}+(0\cdot\vec{v}) \).
Add to both sides the additive inverse of \( \vec{v} \),
the vector \( \vec{w} \) such that \( \vec{w}+\vec{v}=\vec{0} \).

$$
\begin{aligned}
  \vec{w}+\vec{v}
  &=\vec{w}+\vec{v}+0\cdot\vec{v}  \\
  \vec{0}
  &=\vec{0}+0\cdot\vec{v}                   \\
  \vec{0}
  &=0\cdot\vec{v}
\end{aligned}
$$

Item (2) is easy:
\(  (-1\cdot\vec{v})+\vec{v}=(-1+1)\cdot\vec{v}=0\cdot\vec{v}=\vec{0} \).
For (3),
\( r\cdot\vec{0}
  =
  r\cdot(0\cdot\vec{0})
  =
  (r\cdot 0)\cdot\vec{0}
  =
  \vec{0} \)
will do.

The second item
shows that we can write the additive inverse
of \( \vec{v} \) as ‘\( -\vec{v}  \)' without worrying about any
confusion with \( (-1)\cdot\vec{v} \).

A recap:
our study in Chapter One of Gaussian reduction
led us to consider collections of linear combinations.
So in this chapter we have defined a vector space to be a
structure in which we can form such combinations,
subject to simple conditions on the addition and scalar
multiplication operations.
In a phrase: vector spaces are
the right context in which to study linearity.

From the fact that it forms a whole chapter, and especially because that
chapter is the first one, a reader could suppose that our purpose
in this book is the study of linear systems.
The truth is that we will not so much use vector spaces in
the study  of linear systems as we instead have linear systems
start us on the study of vector spaces.
The wide variety of examples from this subsection shows that the study of
vector spaces is interesting and important in its own right.
Linear systems won't go away.
But from now on our primary objects of study will be vector spaces.
