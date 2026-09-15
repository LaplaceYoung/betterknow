# One.I.3 General = Particular + Homogeneous

Title: One.I.3 General = Particular + Homogeneous
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

## General = Particular + Homogeneous

In the prior subsection the descriptions of solution sets
all fit a pattern.
They have a vector that is a particular solution
of the system added to an unrestricted combination of some other vectors.
The solution set from
the earlier many-parameter example illustrates.

$$
\{

     \begin{pmatrix} 0 \\ 4 \\ 0 \\ 0 \\ 0 \end{pmatrix}+
   w\begin{pmatrix} 1 \\ -1 \\ 3 \\ 1 \\ 0 \end{pmatrix}+
       u\begin{pmatrix} 1/2 \\ -1 \\ 1/2 \\ 0 \\ 1 \end{pmatrix}
       \mid w,u\in\mathbb{R} \}
$$

The combination is unrestricted in that
$w$ and $u$ can be any real numbers— there
is no condition like "such that $2w-u=0$" to restrict
which pairs $w,u$ we can use.

That example shows an infinite solution set fitting the pattern.
The other two kinds of solution sets also fit.
A one-element solution set fits because it
has a particular solution
and the unrestricted combination part is trivial.
That is, instead of being a combination of two vectors or
of one vector, it is a combination of no vectors.
(By convention the sum of an empty set of vectors
is the zero vector.)
An empty solution set fits the pattern because there is no
particular solution and thus there are no sums of that form.

**Theorem.**

Any linear system's
solution set has the form

$$
\{ \vec{p}+c_1\vec{\beta}_1+ \cdots +c_k\vec{\beta}_k
     \mid c_1, \ldots ,c_k\in\mathbb{R} \}
$$

where \( \vec{p} \) is any particular solution
and where the number of vectors
$\vec{\beta}_1$, \ldots, $\vec{\beta}_k$ equals
the number of free variables that the system has after a Gaussian reduction.

The solution description has two parts,
the particular solution $\vec{p}$
and the unrestricted linear combination of the $\vec{\beta}$'s.
We shall prove the theorem with two corresponding lemmas.

We will focus first on the unrestricted combination.
For that we consider systems that have the vector of zeroes
as a particular solution
so that we can shorten $\vec{p}+c_1\vec{\beta}_1+\dots+c_k\vec{\beta}_k$
to $c_1\vec{\beta}_1+\dots+c_k\vec{\beta}_k$.

**Definition.**

A linear equation is **homogeneous**
 if it has a constant of zero, so
that it can be written as $a_1x_1+a_2x_2+ \cdots +a_nx_n=0$.

**Example.**

With any linear system like

$$
\begin{aligned}
  3x + 4y = 3 \\
  2x - y = 1
\end{aligned}
$$

we associate a system of homogeneous equations by setting the right side to
zeros.

$$
\begin{aligned}
  3x + 4y = 0 \\
  2x - y = 0
\end{aligned}
$$

Compare the reduction of the original system

$$
\begin{aligned}
  3x + 4y = 3 \\
  2x - y = 1
\end{aligned}
  \xrightarrow{-(2/3)\rho_1+\rho_2}
  \begin{aligned}
  3x + 4y = 3 \\
  -(11/3)y = -1
\end{aligned}
$$

with the reduction of the associated homogeneous system.

$$
\begin{aligned}
  3x + 4y = 0 \\
  2x - y = 0
\end{aligned}
  \xrightarrow{-(2/3)\rho_1+\rho_2}
  \begin{aligned}
  3x + 4y = 0 \\
  -(11/3)y = 0
\end{aligned}
$$

Obviously the two reductions go in the same way.
We can study how to reduce a linear system by instead studying how
to reduce the associated homogeneous system.

Studying the associated homogeneous system has a great advantage over
studying the original system.
Nonhomogeneous systems can be inconsistent.
But a homogeneous system must be consistent since there is always at least
one solution, the zero vector.

**Example.**

Some homogeneous systems have the zero vector as their only solution.

$$
\begin{aligned}
  3x + 2y + z = 0 \\
  6x + 4y = 0 \\
  y + z = 0
\end{aligned}
   \xrightarrow{-2\rho_1 +\rho_2}
   \begin{aligned}
  3x + 2y + z = 0 \\
  -2z = 0 \\
  y + z = 0
\end{aligned}
   \xrightarrow{\rho_2 \leftrightarrow\rho_3}
   \begin{aligned}
  3x + 2y + z = 0 \\
  y + z = 0 \\
  -2z = 0
\end{aligned}
$$

**Example.**

Some homogeneous systems have many solutions.
One is the Chemistry problem
from the first page of the first subsection.

$$
\begin{aligned}
  7x - 7z = 0 \\
  8x + y - 5z - 2w = 0 \\
  y - 3z = 0 \\
  3y - 6z - w = 0
\end{aligned}
  &\xrightarrow{-(8/7)\rho_1+\rho_2}
  \begin{aligned}
  7x - 7z = 0 \\
  y + 3z - 2w = 0 \\
  y - 3z = 0 \\
  3y - 6z - w = 0
\end{aligned}                                        \\
  &\xrightarrow{-\rho_2+\rho_3,\ -3\rho_2+\rho_4}
  \begin{aligned}
  7x - 7z = 0 \\
  y + 3z - 2w = 0 \\
  -6z + 2w = 0 \\
  -15z + 5w = 0
\end{aligned}                                        \\
  &\xrightarrow{-(5/2)\rho_3+\rho_4}
  \begin{aligned}
  7x - 7z = 0 \\
  y + 3z - 2w = 0 \\
  -6z + 2w = 0 \\
  0 = 0
\end{aligned}
$$

The solution set

$$
\{ \begin{pmatrix} 1/3 \\ 1 \\ 1/3 \\ 1 \end{pmatrix}w \mid w\in\mathbb{R} \}
$$

has many vectors besides the zero vector
(if we take \( w \) to be a number of molecules then solutions
make sense only when \( w \) is a nonnegative multiple of $3$).

**Lemma.**

For any  homogeneous linear system there exist
vectors $\vec{\beta}_1$, \ldots, $\vec{\beta}_k$ such that the
solution set of the system is

$$
\{ c_1\vec{\beta}_1+\cdots+c_k\vec{\beta}_k \mid c_1,\ldots,c_k\in\mathbb{R} \}
$$

where $k$ is the
number of free variables in an echelon form version of the system.

Before the proof, we discuss a couple of points about it.
First, the proof verifies that, given a homogeneous system in echelon form,
we can use back substitution to express
all of the leading variables in terms of the free variables.
To see why this suffices to establish the lemma, we give an example
(we will also use this walk-through as a chance to
illustrate the proof's notation).

Consider this system of homogeneous equations in echelon form.

$$
\begin{aligned}
  x + y + 2z + u + v = 0 \\
  y + z + u - v = 0 \\
  u + v = 0
\end{aligned}
$$

It has five variables: $x_1=x$, \ldots{}, $x_5=v$.
To do back substitution, we start with the bottom row, equation $m=3$.
We solve for its leading variable, $x_{\ell_3}=x_4=u$, using its
leading term $a_{m,\ell_m}x_m=a_{3,4}x_4=1\cdot u$
(the notation's "$\ell$" stands for "leading").
We get $u=-v$.

Now back substitution enters its iteration phase.

We will use the variable $t$ to count how many rows up from the bottom
the current row is, so we take $t=1$ and
look at row $m-t=3-1=2$.
We come to this row having so far expressed the leading variable
in terms of free variables for row $3$.
We substitute for $x_{\ell_3}=x_4=u$
its expression in terms
of free variables, getting $y+z+(-v)-v=0$.
Then solving for this row's leading variable gives
$x_{\ell_{m-t}}=x_2=y=-z+2v$.

Next is the row that is $t=2$ up from the bottom, row $m-t=1$.
We have so far expressed the leading variable
in terms of free variables for rows $3$ and $2$.
Substitute for $x_{\ell_3}=u$ and $x_{\ell_2}=y$, giving
$x+(-z+2v)+2z+(-v)+v=0$.
Then solve for the leading variable in terms of the free variables
as $x_{\ell_1}=x=-z-2v$.

The point of this example is that now we are done.
Just write the solution in vector notation

$$
\begin{pmatrix} x \\ y \\ z \\ u \\ v \end{pmatrix}
  =\begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \\ 0 \end{pmatrix}z
   +\begin{pmatrix} -2 \\ 2 \\ 0 \\ -1 \\ 1 \end{pmatrix}v
    \qquad \text{where } z,v\in\mathbb{R}
$$

to recognize that $\vec{\beta}_1$ and $\vec{\beta}_2$
of the lemma's statement are the
vectors associated with the free variables $z$ and $v$.

The second point about the proof follows from that example also.
Back substitution moves up the system, using the conclusions
from lower rows to do the next row.
This suggests the proof strategy of mathematical
induction.

Induction is an important and non-obvious proof technique that will
appear a number of times in this book.
Our proofs by induction will come in two steps, a base step and
an inductive step.
In the base step, we verify that the statement is true for some first
instance, here that for an echelon form linear system we can write
the bottom equation's leading variable in terms of free variables.
In the inductive step, we must establish an implication,
namely that if the statement
is true for all prior cases then it follows
that the statement holds for the present case
also.
Specifically, here the inductive hypothesis is that if for the
lower-down rows we can express the leading variables
in terms of the free variables, then for the next row up
we can express the leading variable in those terms also.

Those two steps together prove the statement for all the rows
because by the base step it is true for the bottom equation,
and by the inductive step the fact that it is true for the bottom
equation shows that
it is true for the next one up.
Then, another application of
the inductive step implies that it is true for the third equation up,
etc.

**Proof.**

Apply Gauss's Method to get to echelon form.
There may be some \( 0=0 \) equations; we ignore these
(if the
system consists only of \( 0=0 \) equations then the lemma is trivially true
because there are no leading variables).

But
because the system is homogeneous there are no contradictory equations.

We will use induction to verify that
each leading variable can be expressed in terms of
free variables.
That will finish the proof because
we can use the free variables as parameters and
the $\vec{\beta}$'s are the vectors of coefficients of those
free variables.

For the base step, consider the bottom-most equation,

$$
a_{m,\ell_m}x_{\ell_m}+a_{m,1+\ell_{m}}x_{1+\ell_{m}}+\cdots+a_{m,n}x_n=0
$$

where \( a_{m,\ell_m}\neq 0 \).

This is the bottom row, so
any variables
after the
leading one must be free.
Move these to the right hand side and divide by $a_{m,\ell_m}$

$$
x_{\ell_m}
  =(-a_{m,1+\ell_{m}}/a_{m,\ell_m})x_{1+\ell_{m}}+\cdots+(-a_{m,n}/a_{m,\ell_m})x_n
$$

to express the leading variable in terms of free variables.

(A technical point: if in the bottom equation
there are no variables to the right
of $x_{\ell_m}$ then \( x_{\ell_m}=0 \).
This satisfies the statement that we are verifying because,
as alluded to at the start of this subsection,
it has \( x_{\ell_m} \) written
as a sum of a number of the free variables, namely as the sum of zero many,
under the convention that
a trivial sum totals to $0$.)

For the inductive step, assume that assume
that for the \( m \)-th equation,
and the \( (m-1) \)-th
equation, etc., up to and including the \( m-(t-1) \)-th equation,
we can
express the leading variable of that equation in terms of free variables.
That is,
assume that the statement that we can
express the leading variable of the row in terms of the free variables
holds for the bottom-most $t$ rows, with $1\leq t<m$.
We must verify that the statement
therefore also holds for the next equation up,
the \( (m-t) \)-th equation.

For each of
\( x_{\ell_m} \), \ldots, \( x_{\ell_{m-(t-1)}} \),
substitute its expression in terms of free variables.
The result has a leading term of
$a_{m-t,\ell_{m-t}}x_{\ell_{m-t}}$ with \( a_{m-t,\ell_{m-t}}\neq 0 \),
and the rest of the left hand side
is a combination of free variables.
Move the free variables to
the right side and divide by
\( a_{m-t,\ell_{m-t}} \), to end with
\( x_{\ell_{m-t}} \) expressed in terms of free variables.

We have done both the base step and the inductive step, so by the
principle of mathematical induction the proposition is true.

This shows,
as discussed between the lemma and its proof, that
we can parametrize solution sets
using the free variables.
We say that the set of vectors
$\{ c_1\vec{\beta}_1+\cdots+c_k\vec{\beta}_k \mid c_1,\ldots,c_k\in\mathbb{R} \}$
is **generated by**
or **spanned by**
the set
\( \{ \vec{\beta}_1,\ldots,\vec{\beta}_k \} \).

To finish the proof of  the General = Particular + Homogeneous theorem
the next lemma considers the particular solution part of the
solution set's description.

**Lemma.**

For a linear system and for any particular solution $\vec{p}$,
the solution set equals

$$
\{ \vec{p}+\vec{h} \mid \text{\(\vec{h}\) satisfies the associated homogeneous system} \}
$$

**Proof.**

We will show mutual set inclusion, that any solution to the system is in
the above set and that anything in the set is a solution of the
system.

For set inclusion the first way, that if a vector solves the system
then it is in the set described above,
assume that \( \vec{s} \) solves the system.
Then \( \vec{s}-\vec{p} \) solves the associated
homogeneous system since for each equation index \( i \),

$$
a_{i,1}(s_1-p_1)+\cdots+a_{i,n}(s_n-p_n) \\
  =(a_{i,1}s_1+\cdots+a_{i,n}s_n)
  -(a_{i,1}p_1+\cdots+a_{i,n}p_n)
  =d_i-d_i
  =0
$$

where \( p_j \) and \( s_j \) are the \( j \)-th components of
\( \vec{p} \) and \( \vec{s} \).
Express \( \vec{s} \) in the required \( \vec{p}+\vec{h} \) form
by writing \( \vec{s}-\vec{p} \) as \( \vec{h} \).

For set inclusion the other way, take a vector of the form $\vec{p}+\vec{h}$,
where \( \vec{p} \) solves the system and \( \vec{h} \) solves the
associated homogeneous system and note that $\vec{p}+\vec{h}$
solves the given system since for any equation index $i$,

$$
a_{i,1}(p_1+h_1)+\cdots+a_{i,n}(p_n+h_n)  \\
  =(a_{i,1}p_1+\cdots+a_{i,n}p_n)
   +(a_{i,1}h_1+\cdots+a_{i,n}h_n)
  =d_i+0
  =d_i
$$

where as earlier \( p_j \) and \( h_j \) are the \( j \)-th components of
\( \vec{p} \) and \( \vec{h} \).

The two lemmas together establish the General = Particular + Homogeneous theorem.
Remember that theorem with the slogan,
"\( General = Particular + Homogeneous \)".

**Example.**

This system illustrates the General = Particular + Homogeneous theorem.

$$
\begin{aligned}
  x + 2y - z = 1 \\
  2x + 4y = 2 \\
  y - 3z = 0
\end{aligned}
$$

Gauss's Method

$$
\xrightarrow{-2\rho_1+\rho_2}
  \begin{aligned}
  x + 2y - z = 1 \\
  2z = 0 \\
  y - 3z = 0
\end{aligned}
  \xrightarrow{\rho_2\leftrightarrow\rho_3}
  \begin{aligned}
  x + 2y - z = 1 \\
  y - 3z = 0 \\
  2z = 0
\end{aligned}
$$

shows that the general solution is a singleton set.

$$
\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}  \}
$$

That single vector is obviously a particular solution.
The associated homogeneous system reduces via the same row operations

$$
\begin{aligned}
  x + 2y - z = 0 \\
  2x + 4y = 0 \\
  y - 3z = 0
\end{aligned}
  \xrightarrow{-2\rho_1+\rho_2}
  \xrightarrow{\rho_2\leftrightarrow\rho_3}
  \begin{aligned}
  x + 2y - z = 0 \\
  y - 3z = 0 \\
  2z = 0
\end{aligned}
$$

to also give a singleton set.

$$
\{ \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}  \}
$$

So, as discussed at the start of this subsection,
in this single-solution case the general solution results
from taking the particular solution and adding to it the unique solution
of the associated homogeneous system.

**Example.**

The start of this subsection also discusses that the case where
the general solution set is empty fits the
General = Particular + Homogeneous pattern too.
This system illustrates.

$$
\begin{aligned}
  x + z + w = -1 \\
  2x - y + w = 3 \\
  x + y + 3z + 2w = 1
\end{aligned}
  \xrightarrow{-2\rho_1+\rho_2,\ -\rho_1+\rho_3}
  \begin{aligned}
  x + z + w = -1 \\
  -y - 2z - w = 5 \\
  y + 2z + w = 2
\end{aligned}
$$

It has no solutions because the final two equations
conflict.
But the associated homogeneous system does have a solution, as do all
homogeneous systems.

$$
\begin{aligned}
  x + z + w = 0 \\
  2x - y + w = 0 \\
  x + y + 3z + 2w = 0
\end{aligned}
  \xrightarrow{-2\rho_1+\rho_2,\ -\rho_1+\rho_3}
  \xrightarrow{\rho_2+\rho_3}
  \begin{aligned}
  x + z + w = 0 \\
  -y - 2z - w = 0 \\
  0 = 0
\end{aligned}
$$

In fact, the solution set is infinite.

$$
\{ \begin{pmatrix} -1 \\ -2 \\ 1 \\ 0 \end{pmatrix}z+\begin{pmatrix} -1 \\ -1 \\ 0 \\ 1 \end{pmatrix}w
         \mid z,w\in\mathbb{R} \}
$$

Nonetheless, because the original system has no particular solution, its
general solution set is empty— there are no vectors of the form
$\vec{p}+\vec{h}$ because there are no \(\vec{p}\)'s.

**Corollary.**

Solution sets of linear systems are either empty, have one element, or
have infinitely many elements.

**Proof.**

We've seen examples of all three happening so we need only prove
that there are no other possibilities.

First observe a homogeneous system with
at least one non-\( \vec{0} \) solution $\vec{v}$ has infinitely many
solutions.
This is because any scalar multiple of $\vec{v}$ also solves the homogeneous
system and there are infinitely many vectors in the set of scalar
multiples of $\vec{v}$: if $s,t\in\mathbb{R}$ are unequal then $s\vec{v}\neq t\vec{v}$,
since $s\vec{v}-t\vec{v}=(s-t)\vec{v}$ is
non-$\vec{0}$ as  any non-$0$ component of $\vec{v}$, when
rescaled by the non-$0$ factor $s-t$, will give a non-$0$ value.

Now apply the particular-plus-homogeneous lemma to conclude that a solution set

$$
\{ \vec{p}+\vec{h}\mid
    \text{\(\vec{h}\) solves the associated homogeneous system} \}
$$

is either empty (if there is no particular solution \( \vec{p} \)),
or has one element (if there is a \( \vec{p} \) and the homogeneous system
has the unique solution \( \vec{0} \)), or is infinite (if there is a
\( \vec{p} \) and the homogeneous system has a non-$\vec{0}$ solution,
and thus by the prior paragraph has infinitely many solutions).

This table summarizes the factors affecting the size of a
general solution.

| particular solution exists? | homogeneous: one solution | homogeneous: infinitely many |
| --- | --- | --- |
| yes | unique solution | infinitely many solutions |
| no | no solutions | no solutions |

The dimension on the top of the table is the simpler one.
When we perform Gauss's Method on a linear system, ignoring the
constants on the right side and so paying attention only
to the coefficients on the left-hand side,
we either end with every variable leading some row or else
we find some variable that does not lead a row, that is,
we find some variable that is free.
(We formalize "ignoring the constants on the right" by
considering the associated homogeneous system.)

A notable special case is
systems having the same number of equations as unknowns.
Such a system will have a solution, and that solution will be unique,
if and only if it
reduces to an echelon form system where every variable leads its row
(since there are the same number of variables as rows),
which will happen if and only if
the associated homogeneous system has a unique solution.

**Definition.**

A square matrix is **nonsingular**

if it is the matrix of coefficients of a
homogeneous system with a unique solution.
It is
**singular** otherwise,
that is,
if it is the matrix of coefficients of a homogeneous system with
infinitely many solutions.

**Example.**

The first of these matrices is nonsingular while the second is singular

$$
\begin{pmatrix}
  1 & 2 \\
  3 & 4
\end{pmatrix}

  \begin{pmatrix}
  1 & 2 \\
  3 & 6
\end{pmatrix}
$$

because the first of these homogeneous systems has a unique solution
while the second has infinitely many solutions.

$$
\begin{aligned}
  x + 2y = 0 \\
  3x + 4y = 0
\end{aligned}

  \begin{aligned}
  x + 2y = 0 \\
  3x + 6y = 0
\end{aligned}
$$

We have made the distinction in the definition because a system
with the same number of equations as variables
behaves in one of two ways, depending on whether its matrix of coefficients
is nonsingular or singular.
Where the matrix of coefficients is nonsingular the system
has a unique solution for any constants on the right
side: for instance, Gauss's Method shows that this system

$$
\begin{aligned}
  x + 2y = a \\
  3x + 4y = b
\end{aligned}
$$

has the unique solution $x=b-2a$ and  $y=(3a-b)/2$.
On the other hand, where the matrix of coefficients is
singular the system never has a unique solution— it
has either no solutions or else has infinitely many, as with these.

$$
\begin{aligned}
  x + 2y = 1 \\
  3x + 6y = 2
\end{aligned}

  \begin{aligned}
  x + 2y = 1 \\
  3x + 6y = 3
\end{aligned}
$$

The definition uses the word "singular" because it
means "departing from general expectation."
People often, naively, expect that systems
with the same number of variables as equations will have a unique solution.
Thus, we can think of the word as connoting
"troublesome," or at least "not ideal."
(That "singular" applies to those systems that never have exactly one solution
is ironic but it is the standard term.)

**Example.**

The systems from the first homogeneous-system example,
the unique-zero homogeneous example,
and the unique-solution illustration
each have an associated homogeneous system with a unique solution.
Thus these matrices are nonsingular.

$$
\begin{pmatrix}
  3 & 4 \\
  2 & -1
\end{pmatrix}

  \begin{pmatrix}
  3 & 2 & 1 \\
  6 & -4 & 0 \\
  0 & 1 & 1
\end{pmatrix}

  \begin{pmatrix}
  1 & 2 & -1 \\
  2 & 4 & 0 \\
  0 & 1 & -3
\end{pmatrix}
$$

The Chemistry problem from the Chemistry-problem example
is a homogeneous system with more than one solution so its matrix
is singular.

$$
\begin{pmatrix}
  7 & 0 & -7 & 0 \\
  8 & 1 & -5 & -2 \\
  0 & 1 & -3 & 0 \\
  0 & 3 & -6 & -1
\end{pmatrix}
$$

The table above has two dimensions.
We have considered the one on top: we can tell
into which column a given linear system goes
solely by considering the system's left-hand side; the
constants on the right-hand side play no role in this.

The table's other dimension,
determining whether a particular solution exists, is tougher.
Consider these two systems with the same left side but different right sides.

$$
\begin{aligned}
  3x + 2y = 5 \\
  3x + 2y = 5
\end{aligned}

  \begin{aligned}
  3x + 2y = 5 \\
  3x + 2y = 4
\end{aligned}
$$

The first has a solution while the second does not, so
here the constants on the right side decide if the system has a solution.
We could conjecture that the left side of a linear system determines
the number of solutions while the right side determines if solutions
exist but that guess is not correct.
Compare these two,
with the same right sides but different left sides.

$$
\begin{aligned}
  3x + 2y = 5 \\
  4x + 2y = 4
\end{aligned}

  \begin{aligned}
  3x + 2y = 5 \\
  3x + 2y = 4
\end{aligned}
$$

The first has a solution but the second does not.
Thus the constants on the right side of a system
don't alone determine whether a solution exists.
Rather, that depends on some interaction between the left and
right.

For some intuition about that interaction,
consider this system with one of the coefficients left unspecified, as
the variable $c$.

$$
\begin{aligned}
  x + 2y + 3z = 1 \\
  x + y + z = 1 \\
  cx + 3y + 4z = 0
\end{aligned}
$$

If \( c=2 \) then this system has no solution because the left-hand side
has the third row as the sum of the first two, while the right-hand does not.
If \( c\neq 2 \) then this system has a unique solution (try it with \( c=1 \)).
For a system to have a solution, if one row of the matrix of coefficients on
the left is a linear combination of other rows
then on the right the constant from that row must be the same
combination of constants from the same rows.

More intuition about the interaction comes from studying linear
combinations.
That will be our focus in the second chapter, after we finish the study
of Gauss's Method itself in the rest of this chapter.
