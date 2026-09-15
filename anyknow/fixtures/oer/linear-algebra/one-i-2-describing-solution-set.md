# One.I.2 Describing the Solution Set

Title: One.I.2 Describing the Solution Set
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

## Describing the Solution Set

A linear system with a unique solution has a solution set with one element.
A linear system with no solution has a solution set that is empty.
In these cases the solution set is easy to describe.
Solution sets are a challenge to describe only when they contain many elements.

**Example.**

This system has many solutions because in echelon form

$$
\begin{aligned}
  2x + z = 3 \\
  x - y - z = 1 \\
  3x - y = 4
\end{aligned}
  &\xrightarrow{-(1/2)\rho_1+\rho_2,\ -(3/2)\rho_1 +\rho_3}
  \begin{aligned}
  2x + z = 3 \\
  -y - (3/2)z = -1/2 \\
  -y - (3/2)z = -1/2
\end{aligned}                                   \\
  &\xrightarrow{-\rho_2+\rho_3}
  \begin{aligned}
  2x + z = 3 \\
  -y - (3/2)z = -1/2 \\
  0 = 0
\end{aligned}
$$

not all of the variables are leading variables.
The Gauss's Method theorem shows that an $(x,y,z)$
satisfies the first system if and only if it satisfies the
third.
So we can describe the solution set
$\{ (x,y,z)\mid2x+z=3 and x-y-z=1 and 3x-y=4 \}$
in this way.

$$
\{ (x,y,z)\mid2x+z=3 and -y-3z/2=-1/2 \}\tag{$*$}
$$

This description is better because
it has two equations instead of three
but it is not optimal
because it still has some hard to understand interactions among the variables.

To improve it, use the
variable that does not lead any equation, $z$, to describe
the variables that do lead, $x$ and $y$.
The second equation gives
$y=(1/2)-(3/2)z$
and the first equation gives
$x=(3/2)-(1/2)z$.
Thus we can describe the solution set as this set of triples.

$$
\{ ((3/2)-(1/2)z, (1/2)-(3/2)z, z)\mid z\in\mathbb{R} \}\tag{$**$}
$$

Compared with ($*$),
the advantage of ($**$)
is that $z$ can be any real number.
This makes the job of deciding which tuples are in the solution set
much easier.
For instance, taking $z=2$ shows that $(1/2,-5/2,2)$ is a solution.

**Definition.**

In an echelon form linear system the variables that are not leading
are
**free**.

**Example.**

Reduction of a linear system can end with more than one variable free.
Gauss's Method on this system

$$
\begin{aligned}
  x + y + z - w = 1 \\
  y - z + w = -1 \\
  3x + 6z - 6w = 6 \\
  -y + z - w = 1
\end{aligned}
  &\xrightarrow{-3\rho_1 +\rho_3}
  \begin{aligned}
  x + y + z - w = 1 \\
  y - z + w = -1 \\
  -3y + 3z - 3w = 3 \\
  -y + z - w = 1
\end{aligned}                                      \\
  &\xrightarrow{3\rho_2 +\rho_3,\ \rho_2 +\rho_4}
  \begin{aligned}
  x + y + z - w = 1 \\
  y - z + w = -1 \\
  0 = 0 \\
  0 = 0
\end{aligned}
$$

leaves  \( x \) and \( y \) leading and both \( z \) and \( w \) free.
To get the description that we prefer, we work from the bottom.
We first express the leading variable $y$ in terms of
$z$ and $w$, as $y=-1+z-w$.
Moving up to the top equation,
substituting for $y$ gives
$x+(-1+z-w)+z-w=1$ and solving for $x$ leaves $x=2-2z+2w$.
The solution set

$$
\{ (2-2z+2w,-1+z-w,z,w)\mid z,w\in\mathbb{R} \}\tag{$**$}
$$

has the leading variables expressed in terms of the variables that are free.

**Example.**

The list of leading variables may skip over some columns.
After this reduction

$$
\begin{aligned}
  2x - 2y = 0 \\
  z + 3w = 2 \\
  3x - 3y = 0 \\
  x - y + 2z + 6w = 4
\end{aligned}
  &\xrightarrow{-(3/2)\rho_1 +\rho_3,\ -(1/2)\rho_1+ \rho_4}
  \begin{aligned}
  2x - 2y = 0 \\
  z + 3w = 2 \\
  0 = 0 \\
  2z + 6w = 4
\end{aligned}                                    \\
  &\xrightarrow{-2\rho_2 +\rho_4}
  \begin{aligned}
  2x - 2y = 0 \\
  z + 3w = 2 \\
  0 = 0 \\
  0 = 0
\end{aligned}
$$

$x$ and $z$ are the leading variables, not $x$ and $y$.
The free variables are $y$ and $w$ and so we can describe the solution set as
$\{  (y,y,2-3w,w)\mid y,w\in\mathbb{R}  \}$.
For instance, \( (1,1,2,0) \) satisfies the system— take
$y=1$ and $w=0$.
The four-tuple \( (1,0,5,4) \) is not a solution
since its first coordinate does not equal its second.

A variable that we use to describe a family of solutions
is a **parameter**.

We say that the solution set in the prior example
is **parametrized**
with $y$ and $w$.

The terms "parameter" and "free variable" do not mean the same thing.
In the prior example
$y$ and $w$ are free because in the echelon form system they
do not lead.
They are parameters because
we used them to describe the set of solutions.
Had we instead
rewritten the second equation as $w=2/3-(1/3)z$ then
the free variables would still be $y$ and $w$ but the parameters
would be $y$ and $z$.

In the rest of this book
we will solve linear systems by bringing them to
echelon form and then parametrizing with the free variables.

**Example.**

This is another system with infinitely many solutions.

$$
\begin{aligned}
  x + 2y = 1 \\
  2x + z = 2 \\
  3x + 2y + z - w = 4
\end{aligned}
  &\xrightarrow{-2\rho_1+\rho_2,\ -3\rho_1 +\rho_3}
  \begin{aligned}
  x + 2y = 1 \\
  -4y + z = 0 \\
  -4y + z - w = 1
\end{aligned}                                    \\
  &\xrightarrow{-\rho_2+\rho_3}
  \begin{aligned}
  x + 2y = 1 \\
  -4y + z = 0 \\
  -w = 1
\end{aligned}
$$

The leading variables are \( x \), \( y \), and \( w \).
The variable \( z \) is free.
Notice that, although there are infinitely many
solutions, the value of $w$ doesn't vary but is constant $w=-1$.
To parametrize, write \( w \) in terms of \( z \) with \( w=-1+0z \).
Then \( y=(1/4)z \).
Substitute for \( y \) in the first
equation to get \( x=1-(1/2)z \).
The solution set is $\{ (1-(1/2)z,(1/4)z,z,-1)\mid z\in\mathbb{R} \}$.

Parametrizing solution sets shows that systems with
free variables have infinitely many solutions.
For instance, above $z$ takes on all of infinitely many real number values,
each associated with a different solution.

We finish this subsection by developing a streamlined
notation for linear systems
and their solution sets.

**Definition.**

An \( m \times n \) **matrix**
is a rectangular array of numbers
with \( m \) **rows**
and \( n \) **columns**.
Each number in the matrix is an
**entry**.

We usually denote a matrix with an upper case roman letter.
For instance,

$$
A=
  \begin{pmatrix}
  1 & 2.2 & 5 \\
  3 & 4 & -7
\end{pmatrix}
$$

has $2$ rows and $3$ columns and so
is a \( 2 \times 3 \) matrix.
Read that aloud as "two-by-three";
the number of rows is always stated first.
(The matrix has parentheses around it
so that when
two matrices are adjacent
we can tell where one ends and the other begins.)
We name matrix entries with the corresponding lower-case letter,
so that the entry in the second row and first column
of the above array is \( a_{2,1}=3 \).
Note that the order of the subscripts matters:
$a_{1,2}\neq a_{2,1}$ since \( a_{1,2}=2.2 \).
We denote
the set of all \( m \times n \)
matrices by \( \mathcal{M}_{m \times n} \).

We do Gauss's Method using matrices in essentially the same
way that we did it for systems of equations:
a matrix row's
**leading entry**

is its first nonzero entry (if it has one) and
we perform row operations to arrive at
**matrix echelon form**,

where the leading entry in lower rows are to the right of those in
the rows above.
We like matrix notation because it lightens
the clerical load, the copying of variables and the
writing of $+$'s and $=$'s.

**Example.**

We can abbreviate this linear system

$$
\begin{aligned}
  x + 2y = 4 \\
  y - z = 0 \\
  x + 2z = 4
\end{aligned}
$$

with this matrix.

$$
\left(\begin{array}{ccc|c}
  1 & 2 & 0 & 4 \\
  0 & 1 & -1 & 0 \\
  1 & 0 & 2 & 4
\end{array}\right)
$$

The vertical bar reminds a reader of the difference between the
coefficients on the system's left hand side and the constants on the right.
With a bar, this is an
**augmented** matrix.

$$
\left(\begin{array}{ccc|c}
  1 & 2 & 0 & 4 \\
  0 & 1 & -1 & 0 \\
  1 & 0 & 2 & 4
\end{array}\right)
  \xrightarrow{-\rho_1 +\rho_3}
  \left(\begin{array}{ccc|c}
  1 & 2 & 0 & 4 \\
  0 & 1 & -1 & 0 \\
  0 & -2 & 2 & 0
\end{array}\right)
  \xrightarrow{2\rho_2 +\rho_3}
  \left(\begin{array}{ccc|c}
  1 & 2 & 0 & 4 \\
  0 & 1 & -1 & 0 \\
  0 & 0 & 0 & 0
\end{array}\right)
$$

The second row stands for $y-z=0$ and the first row stands for
$x+2y=4$ so the solution set is
\( \{ (4-2z,z,z)\mid z\in\mathbb{R} \} \).

Matrix notation also
clarifies the descriptions of solution sets.
The earlier parametrization example's
$\{ (2-2z+2w,-1+z-w,z,w)\mid z,w\in\mathbb{R} \}$
is hard to read.
We will rewrite it to group all of the
constants together, all of the
coefficients of \( z \) together, and all of the coefficients of \( w \)
together.
We write them vertically, in one-column matrices.

$$
\{ \begin{pmatrix} 2 \\ -1 \\ 0 \\ 0 \end{pmatrix}
       +\begin{pmatrix} -2 \\ 1 \\ 1 \\ 0 \end{pmatrix}\cdot z
       +\begin{pmatrix} 2 \\ -1 \\ 0 \\ 1 \end{pmatrix}\cdot w
       \mid z,w\in\mathbb{R} \}
$$

For instance, the top line says that \( x=2-2z+2w \)
and the second line says that \( y= -1+z-w \).
(Our next section gives a geometric interpretation that will help
us picture the solution sets.)

**Definition.**

A
**column vector**,
often just called a **vector**,
is a matrix with a single column.
A matrix with a single row is a
**row vector**.
The entries of a vector are sometimes called
**components**.
A column or row vector whose components are all zeros is a
**zero vector**.

Vectors are an exception to the convention of representing matrices with
capital roman letters.
We use lower-case roman or greek letters overlined
with an arrow:
\( \vec{a} \), \( \vec{b} \), \ldots  or
\( \vec{\alpha} \), \( \vec{\beta} \), \(\ldots\)
(boldface is also common: \(\mathbf{a}\) or \(\boldsymbol{\alpha}\)).
For instance, this is a column vector
with a third component of \( 7 \).

$$
\vec{v}=
  \begin{pmatrix} 1 \\ 3 \\ 7 \end{pmatrix}
$$

A zero vector is denoted \( \vec{0} \).
There are many different zero vectors— the
one-tall zero vector, the two-tall zero vector, etc.— but
nonetheless we will often say "the" zero vector, expecting
that the size will be clear from the context.

**Definition.**

The linear equation
\( a_1x_1+a_2x_2+ \cdots +a_nx_n=d \)
with unknowns \( x_1,\ldots ,x_n \)
is **satisfied**
 by

$$
\vec{s}=\begin{pmatrix} s_1 \\ \vdots \\ s_n \end{pmatrix}
$$

if \( a_1s_1+a_2s_2+ \cdots +a_ns_n=d \).
A vector satisfies a linear system if it satisfies each equation in
the system.

The style of description of solution sets that we use
involves adding the vectors, and
also multiplying them by real numbers.
Before we give the examples showing the style
we first need to define these operations.

**Definition.**

The
**vector sum**
of
\( \vec{u} \) and \( \vec{v} \) is the vector of the sums.

$$
\vec{u}+\vec{v}=
  \begin{pmatrix} u_1 \\ \vdots \\ u_n \end{pmatrix}
   +
  \begin{pmatrix} v_1 \\ \vdots \\ v_n \end{pmatrix}
   =
  \begin{pmatrix} u_1+v_1 \\ \vdots \\ u_n+v_n \end{pmatrix}
$$

Note that for the addition to be defined
the vectors must have the same number of entries.
This entry-by-entry addition works for any pair of matrices, not just vectors,
provided that they have the same number of rows and
columns.

**Definition.**

The **scalar multiplication**
 of the real number
\( r \) and the vector \( \vec{v} \) is the vector of the multiples.

$$
r\cdot\vec{v}=
  r\cdot\begin{pmatrix} v_1 \\ \vdots \\ v_n \end{pmatrix}
  =
  \begin{pmatrix} rv_1 \\ \vdots \\ rv_n \end{pmatrix}
$$

As with the addition operation, the entry-by-entry scalar multiplication
operation extends beyond vectors to apply to any
matrix.

We write scalar multiplication either as \( r\cdot\vec{v} \) or
\( \vec{v}\cdot r \), and sometimes even omit the "$\cdot$" symbol: $r\vec{v}$.
(Do not refer to scalar multiplication
as "scalar product" because that name is for a different operation.)

**Example.**

$$
\begin{pmatrix} 2 \\ 3 \\ 1 \end{pmatrix}
   +
  \begin{pmatrix} 3 \\ -1 \\ 4 \end{pmatrix}
  =
  \begin{pmatrix} 2+3 \\ 3-1 \\ 1+4 \end{pmatrix}
   =
  \begin{pmatrix} 5 \\ 2 \\ 5 \end{pmatrix}

  7\cdot\begin{pmatrix} 1 \\ 4 \\ -1 \\ -3 \end{pmatrix}
  =
  \begin{pmatrix} 7 \\ 28 \\ -7 \\ -21 \end{pmatrix}
$$

Observe that the definitions of addition and scalar multiplication agree
where they overlap; for instance, \( \vec{v} +\vec{v} = 2\vec{v} \).

With these definitions, we are set to use matrix and vector notation to
both solve systems and express the solution.

**Example.**

This system

$$
\begin{aligned}
  2x + y - w = 4 \\
  y + w + u = 4 \\
  x - z + 2w = 0
\end{aligned}
$$

reduces in this way.

$$
\left(\begin{array}{ccccc|c}
  2 & 1 & 0 & -1 & 0 & 4 \\
  0 & 1 & 0 & 1 & 1 & 4 \\
  1 & 0 & -1 & 2 & 0 & 0
\end{array}\right)
  &\xrightarrow{-(1/2)\rho_1+\rho_3}
  \left(\begin{array}{ccccc|c}
  2 & 1 & 0 & -1 & 0 & 4 \\
  0 & 1 & 0 & 1 & 1 & 4 \\
  0 & -1/2 & -1 & 5/2 & 0 & -2
\end{array}\right)                                 \\
  &\xrightarrow{(1/2)\rho_2+\rho_3}
  \left(\begin{array}{ccccc|c}
  2 & 1 & 0 & -1 & 0 & 4 \\
  0 & 1 & 0 & 1 & 1 & 4 \\
  0 & 0 & -1 & 3 & 1/2 & 0
\end{array}\right)
$$

The solution set is
\( \{ (w+(1/2)u,4-w-u,3w+(1/2)u,w,u)\mid w,u\in\mathbb{R} \} \).
We write that in vector form.

$$
\{ \begin{pmatrix} x \\ y \\ z \\ w \\ u \end{pmatrix}=
       \begin{pmatrix} 0 \\ 4 \\ 0 \\ 0 \\ 0 \end{pmatrix}+
       \begin{pmatrix} 1 \\ -1 \\ 3 \\ 1 \\ 0 \end{pmatrix}w+
       \begin{pmatrix} 1/2 \\ -1 \\ 1/2 \\ 0 \\ 1 \end{pmatrix}u
       \mid w,u\in\mathbb{R} \}
$$

Note how well vector notation sets off
the coefficients of each parameter.
For instance, the third row of the vector form shows plainly that if \( u \) is
fixed then \( z \) increases three times as fast as \( w \).
Another thing shown plainly is that setting both \( w \) and \( u \) to zero
gives that

$$
\begin{pmatrix} x \\ y \\ z \\ w \\ u \end{pmatrix}
  =\begin{pmatrix} 0 \\ 4 \\ 0 \\ 0 \\ 0 \end{pmatrix}
$$

is a particular solution of the linear system.

**Example.**

In the same way, the system

$$
\begin{aligned}
  x - y + z = 1 \\
  3x + z = 3 \\
  5x - 2y + 3z = 5
\end{aligned}
$$

reduces

$$
\left(\begin{array}{ccc|c}
  1 & -1 & 1 & 1 \\
  3 & 0 & 1 & 3 \\
  5 & -2 & 3 & 5
\end{array}\right)
  &\xrightarrow{-3\rho_1+\rho_2,\ -5\rho_1+\rho_3}
  \left(\begin{array}{ccc|c}
  1 & -1 & 1 & 1 \\
  0 & 3 & -2 & 0 \\
  0 & 3 & -2 & 0
\end{array}\right)                                    \\
  &\xrightarrow{-\rho_2+\rho_3}
  \left(\begin{array}{ccc|c}
  1 & -1 & 1 & 1 \\
  0 & 3 & -2 & 0 \\
  0 & 0 & 0 & 0
\end{array}\right)
$$

to give a one-parameter solution set.

$$
\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
       +\begin{pmatrix} -1/3 \\ 2/3 \\ 1 \end{pmatrix}z
       \mid z\in\mathbb{R} \}
$$

As in the prior example, the vector not associated with the parameter

$$
\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
$$

is a particular solution of the system.

Before the exercises, we will consider what we have accomplished
and what we will do in the remainder of the chapter.
So far we have done the mechanics of Gauss's Method.
We have not stopped to consider any of the questions
that arise,
except for proving the Gauss's Method theorem— which
justifies the method by showing that it gives
the right answers.

For example, can we
always describe solution sets as above, with
a particular solution vector added to an unrestricted linear combination of
some other vectors?
We've noted that the solution sets described in this way
have infinitely many members
so answering this question
would tell us about the size of solution sets.
The following subsection shows that the answer is "yes."
This chapter's second section then
uses that answer to describe the geometry of solution sets.

Other questions arise from the observation that we can do Gauss's Method in
more than one way (for instance, when swapping rows we may have a choice of
rows to swap with).
The Gauss's Method theorem says that we must get the same solution set
no matter how we proceed but
if we do Gauss's Method in two ways
must we get the same number of free variables in each echelon form system?
Must those be the same variables, that is, is it impossible to
solve a problem
one way to get $y$ and $w$ free and solve it another way to get $y$ and $z$
free?
The third section of this chapter answers "yes," that
from any starting linear system,
all derived echelon form versions
have the same free variables.

Thus, by the end of the chapter we will not only have a
solid grounding in the practice of Gauss's Method but
we will also have a solid grounding in the theory.
We will know exactly what can and cannot happen in a reduction.
