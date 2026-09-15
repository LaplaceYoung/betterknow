# Two.I.2 Subspaces and Spanning Sets

Title: Two.I.2 Subspaces and Spanning Sets
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

## Subspaces and Spanning Sets

In the plane-through-the-origin example we saw a
vector space that is a subset of $\mathbb{R}^2$, a line through the origin.
There, the vector space $\mathbb{R}^2$ contains inside it another
vector space, the line.

**Definition.**

For any vector space,
a **subspace**
is a subset that is itself a vector space,
under the inherited operations.

**Example.**

This plane through the origin

$$
P=\{ \begin{pmatrix} x \\ y \\ z \end{pmatrix}\mid x+y+z=0 \}
$$

is a subspace of \( \mathbb{R}^3 \).
As required by the definition
the plane's operations are inherited from the larger space,
that is,
vectors add in $P$ as they add in $\mathbb{R}^3$

$$
\begin{pmatrix} x_1 \\ y_1 \\ z_1 \end{pmatrix}+\begin{pmatrix} x_2 \\ y_2 \\ z_2 \end{pmatrix}
   =\begin{pmatrix} x_1+x_2 \\ y_1+y_2 \\ z_1+z_2 \end{pmatrix}
$$

and scalar multiplication is also the same as in $\mathbb{R}^3$.
To show that $P$ is a subspace we need only note that it is a subset and then
verify that it is a space.
We won't check all ten conditions, just the two closure ones.
For closure under addition, note that if
the summands satisfy that
$x_1+y_1+z_1=0$ and $x_2+y_2+z_2=0$ then the sum satisfies that
$(x_1+x_2)+(y_1+y_2)+(z_1+z_2)=(x_1+y_1+z_1)+(x_2+y_2+z_2)=0$.
For closure under scalar multiplication, if
$x+y+z=0$ then the scalar multiple has
$rx+ry+rz=r(x+y+z)=0$.

**Example.**

The \( x \)-axis in \( \mathbb{R}^2 \)
is a subspace, where
the addition and scalar multiplication operations are
the inherited ones.

$$
\begin{pmatrix} x_1 \\ 0 \end{pmatrix}
    +
  \begin{pmatrix} x_2 \\ 0 \end{pmatrix}
    =
  \begin{pmatrix} x_1+x_2 \\ 0 \end{pmatrix}

  r\cdot\begin{pmatrix} x \\ 0 \end{pmatrix}
  =\begin{pmatrix} rx \\ 0 \end{pmatrix}
$$

As in the prior example, to verify directly from the definition
that this is a subspace we simply note that it is a
subset and then check that it satisfies
the conditions in definition of a vector space.
For instance the two closure conditions are
satisfied: adding two vectors with a second component of zero results
in a vector with a second component of zero and multiplying a
scalar times a vector with a second component of zero
results in a vector with a second component of zero.

**Example.**

Another subspace of $\mathbb{R}^2$ is
its trivial subspace.

$$
\{ \begin{pmatrix} 0 \\ 0 \end{pmatrix} \}
$$

Any vector space has a trivial subspace
\( \{ \vec{0}  \} \).

At the opposite extreme, any vector space has itself for a subspace.
A subspace that is not the entire space is a
**proper**
 subspace.

**Example.**

Vector spaces that are not $\mathbb{R}^n$'s also have subspaces.
The space of cubic polynomials
\( \{ a+bx+cx^2+dx^3\mid a,b,c,d\in\mathbb{R} \} \)
has a subspace comprised of all linear polynomials
\( \{ m+nx\mid m,n\in\mathbb{R} \} \).

**Example.**

Another example of a subspace that is not a subset of an $\mathbb{R}^n$
followed the definition of a vector space.
The space in the real-valued functions example
of all real-valued functions of one real variable
\( \{ f\mid f\colon \mathbb{R}\to \mathbb{R}  \} \) has the subspace in
the differential-equation example
of functions satisfying
the restriction $(d^2 f/dx^2)+f=0$.

**Example.**

The definition requires that the
addition and scalar multiplication operations
must be the ones inherited from the larger space.
The set \( S=\{ 1 \} \) is a subset of \( \mathbb{R}^1 \).
And, under the operations $1+1=1$ and  $r\cdot 1=1$
the set $S$ is a vector space, specifically, a trivial space.
However, $S$ is not a subspace of \( \mathbb{R}^1 \) because those aren't the
inherited operations, since of course \( \mathbb{R}^1 \) has \( 1+1=2 \).

**Example.**

Being vector spaces themselves, subspaces must satisfy the closure
conditions.
The set \( \mathbb{R}^+ \) is not a subspace of the vector space \( \mathbb{R}^1 \)
because with the inherited operations it is not closed under scalar
multiplication: if \( \vec{v}=1 \) then \( -1\cdot\vec{v}\notin\mathbb{R}^+ \).

The next result says that the positive-reals counterexample is prototypical.
The only way that a subset can fail to be a subspace,
if it is nonempty and uses the inherited operations,
is if it isn't closed.

**Lemma.**

For a nonempty subset \( S \) of a vector space, under the inherited
operations the following are equivalent
statements.

1. \( S \) is a subspace of that vector space
2. \( S \) is closed under linear combinations of pairs of vectors: for any vectors \( \vec{s}_1,\vec{s}_2\in S \) and scalars \( r_1,r_2 \) the vector \( r_1\vec{s}_1+r_2\vec{s}_2 \) is in \( S \)
3. \( S \) is closed under linear combinations of any number of vectors: for any vectors \( \vec{s}_1,\ldots,\vec{s}_n\in S \) and scalars \( r_1, \ldots,r_n \) the vector \( r_1\vec{s}_1+\cdots+r_n\vec{s}_n \) is an element of \( S \).

 Briefly, a subset is a
subspace if and only if  it is closed under linear combinations.

**Proof.**

"The following are equivalent" means that each pair of
statements are equivalent.

$$
(1)\iff(2)

  (2)\iff(3)

  (3)\iff(1)
$$

We will prove the equivalence by establishing that
\( (1)\implies (3)\implies (2)\implies (1)\).
This strategy is suggested by the observation that the implications
\( (1)\implies (3) \) and \( (3)\implies (2) \) are easy and so we need only
argue that \( (2)\implies (1) \).

Assume that \( S \) is a nonempty subset of a vector space
$V$ that is closed under combinations of pairs of vectors.
We will show that $S$ is a vector space by checking the conditions.

The vector space definition has five conditions on addition.
First, for closure under addition, if
\( \vec{s}_1,\vec{s}_2\in S \) then \( \vec{s}_1+\vec{s}_2\in S \),
as it
is a combination of a pair of vectors
and we are assuming that \( S \) is closed under those.
Second, for any \( \vec{s}_1,\vec{s}_2\in S \), because addition
is inherited from \( V \), the sum \( \vec{s}_1+\vec{s}_2 \)
in \( S \) equals the sum \( \vec{s}_1+\vec{s}_2 \)
in \( V \), and that equals the sum \( \vec{s}_2+\vec{s}_1 \) in
\( V \) (because $V$ is a vector space, its addition is commutative),
and that in turn equals the sum \( \vec{s}_2+\vec{s}_1 \) in \( S \).
The argument for the third condition is similar to that for the second.
For the fourth, consider the zero vector of \( V \) and note that
closure of $S$ under linear combinations of pairs of vectors gives that
\( 0\cdot\vec{s}+0\cdot\vec{s}=\vec{0} \) is an element of \( S\)
(where \( \vec{s} \) is any member of the nonempty set \( S \));
checking that \( \vec{0} \) acts under the inherited operations as the additive
identity of \( S \) is easy.
The fifth condition is satisfied because for any \( \vec{s}\in S \),
closure under linear combinations of pairs of vectors shows that
\( 0\cdot\vec{0}+(-1)\cdot\vec{s} \) is an element of \( S \), and it is
obviously the
additive inverse of \( \vec{s} \) under the inherited operations.

The verifications for the scalar multiplication conditions are similar;
see the exercises.

We will usually verify that a subset is a subspace by checking that it
satisfies statement (2).

**Remark.**

At the start of this chapter we introduced vector spaces as collections in
which linear combinations "make sense."

The subspace-iff-closed lemma's statements (1)-(3)
say that we can always make sense of
an expression like
$r_1\vec{s}_1+r_2\vec{s}_2$
in that the vector described is in the set $S$.

As a contrast, consider the set $T$ of two-tall vectors whose entries add to
a number greater than or equal to zero.
Here we cannot just write any linear combination such as $2\vec{t}_1-3\vec{t}_2$
and be confident the result is an element of $T$.

The subspace-iff-closed lemma suggests that a good way to think of
a vector space is as a collection of unrestricted linear combinations.
The next two examples take some spaces and recasts their
descriptions to be in that form.

**Example.**

We can show that this plane through the origin subset of $\mathbb{R}^3$

$$
S=\{ \begin{pmatrix} x \\ y \\ z \end{pmatrix}\mid x-2y+z=0 \}
$$

is a subspace under the usual addition and scalar multiplication
operations of column vectors by checking that it is nonempty and closed under
linear combinations of two vectors.
But there is another way.
Think of  $x-2y+z=0$  as a one-equation linear system and parametrize it
by expressing the leading
variable in terms of the free variables $x=2y-z$.

$$
S
     =\{ \begin{pmatrix} 2y-z \\ y \\ z \end{pmatrix}\mid y,z\in\mathbb{R} \}
     =\{ y\begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}+
            z\begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}\mid y,z\in\mathbb{R} \}\tag{$*$}
$$

Now, to show that this is a subspace consider
$r_1\vec{s}_1+r_2\vec{s}_2$.
Each $\vec{s}_i$ is a linear combination of the two vectors in ($*$)
so this is a linear combination of linear combinations.

$$
r_1\cdot(y_1\begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}+
            z_1\begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix})
  +
  r_2\cdot(y_2\begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix}+
            z_2\begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix})
$$

The Linear Combination Lemma, Lemma One.III.,
shows that the total is a linear combination of the two vectors
and so the subspace-iff-closed lemma's statement (2) is satisfied.

**Example.**

This is a subspace of the \( 2 \times 2 \) matrices $\mathcal{M}_{2 \times 2}$.

$$
L=\{ \begin{pmatrix}
  a & 0 \\
  b & c
\end{pmatrix}
       \mid a+b+c=0 \}
$$

To parametrize, express the condition as $a=-b-c$.

$$
L
  =\{ \begin{pmatrix}
  -b-c & 0 \\
  b & c
\end{pmatrix}
       \mid b,c\in\mathbb{R} \}
  =\{ b\begin{pmatrix}
  -1 & 0 \\
  1 & 0
\end{pmatrix}
       +c\begin{pmatrix}
  -1 & 0 \\
  0 & 1
\end{pmatrix}
       \mid b,c\in\mathbb{R} \}
$$

As above, we've described the subspace as a collection of unrestricted linear
combinations.
To show it is a subspace, note that a linear combination of vectors from
$L$ is a linear combination of linear combinations and so statement (2)
is true.

**Definition.**

The **span** (or
**linear closure**) of a nonempty subset \( S \) of a
vector space is the set of all linear combinations of vectors from \( S \).

$$
[S] =\{ c_1\vec{s}_1+\cdots+c_n\vec{s}_n
            \mid c_1,\ldots, c_n\in\mathbb{R}
            \ and\  \vec{s}_1,\ldots,\vec{s}_n\in S \}
$$

The span of the empty subset of a vector space is its trivial subspace.

 No notation for the span is completely standard.
The square brackets used here are common but so are
"$span(S)$" and "$sp(S)$".

**Remark.**

In Chapter One, after we showed that we can write the solution
set of a homogeneous linear system as
$\{ c_1\vec{\beta}_1+\cdots+c_k\vec{\beta}_k\mid
  c_1,\ldots,c_k\in\mathbb{R} \}$,
we described that as the set "generated" by the $\vec{\beta}$'s.
We now call that the span of
$\{ \vec{\beta}_1,\ldots,\vec{\beta}_k \}$.

Recall also from that proof that
the span of the empty set is defined to be the set \( \{ \vec{0} \} \) because
of the convention that a trivial linear combination, a combination of
zero-many vectors, adds to \( \vec{0} \).
Besides, defining the empty set's span to be the trivial subspace
is convenient because it keeps results
like the next one from needing exceptions for the empty set.

**Lemma.**

In a vector space, the span of any subset is a subspace.

**Proof.**

If the subset \( S \)
is empty then by definition its span is the trivial
subspace.
If \( S\) is not empty then by the subspace-iff-closed lemma we need
only check that the span \( [S] \) is closed under linear combinations
of pairs of elements.
For a pair of vectors from that span,
\( \vec{v}=c_1\vec{s}_1+\cdots+c_n\vec{s}_n \) and
\( \vec{w}=c_{n+1}\vec{s}_{n+1}+\cdots+c_m\vec{s}_m \),
a linear combination

$$
p\cdot(c_1\vec{s}_1+\cdots+c_n\vec{s}_n)+
       r\cdot(c_{n+1}\vec{s}_{n+1}+\cdots+c_m\vec{s}_m)  \\
  =
  pc_1\vec{s}_1+\cdots+pc_n\vec{s}_n
    +rc_{n+1}\vec{s}_{n+1}+\cdots+rc_m\vec{s}_m
$$

is a linear combination of elements of \( S \)
and so is an element of \( [S] \)
(possibly some of the $\vec{s}_i$'s from $\vec{v}$ equal some
of the $\vec{s}_j$'s from $\vec{w}$ but that does not matter).

The converse of the lemma
holds: any subspace is the span of some set, because
a subspace is obviously the span of itself, the set of all of its members.
Thus a subset of a vector space is a subspace if and only if it is a span.
This fits the intuition
that a good way to think of a vector space is as
a collection in which linear combinations are sensible.

Taken together, the subspace-iff-closed lemma and
the span-is-a-subspace lemma show that the span of a subset $S$ of a
vector space is the smallest subspace containing all of the members of $S$.

**Example.**

In any vector space \( V \), for any vector \( \vec{v}\in V \), the set
\( \{ r\cdot\vec{v} \mid r\in\mathbb{R} \} \) is a subspace of \( V \).
For instance, for any vector \( \vec{v}\in\mathbb{R}^3 \)
the line through the origin containing that vector
\( \{ k\vec{v}\mid k\in\mathbb{R}  \} \) is a subspace of \( \mathbb{R}^3 \).
This is true even if $\vec{v}$ is the zero vector, in which case
it is the degenerate line, the trivial subspace.

**Example.**

The span of this set
is all of $\mathbb{R}^2$.

$$
\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix},\begin{pmatrix} 1 \\ -1 \end{pmatrix} \}
$$

We know that the span is some subspace of $\mathbb{R}^2$.
To check that it is all of $\mathbb{R}^2$
we must show that any member of $\mathbb{R}^2$ is a linear combination
of these two vectors.
So we ask: for which
vectors with real components $x$ and $y$
are there scalars $c_1$ and $c_2$ such that this holds?

$$
c_1\begin{pmatrix} 1 \\ 1 \end{pmatrix}+c_2\begin{pmatrix} 1 \\ -1 \end{pmatrix}=\begin{pmatrix} x \\ y \end{pmatrix}\tag{$*$}
$$

Gauss's Method

$$
\begin{aligned}
  c_1 + c_2 = x \\
  c_1 - c_2 = y
\end{aligned}
  \xrightarrow{-\rho_1+\rho_2}
  \begin{aligned}
  c_1 + c_2 = x \\
  -2c_2 = -x+y
\end{aligned}
$$

with back substitution gives $c_2=(x-y)/2$ and $c_1=(x+y)/2$.
This shows that for any $x,y$ there
are appropriate coefficients $c_1,c_2$ making ($*$)
true—
we can write any element of $\mathbb{R}^2$ as a linear combination of the
two given ones.
For instance, for $x=1$ and $y=2$ the coefficients $c_2=-1/2$ and
$c_1=3/2$ will do.

Since spans are subspaces, and we know that a
good way to understand a subspace is
to parametrize its description, we can try to understand a set's span in
that way.

**Example.**

Consider, in the vector space of quadratic polynomials \( \mathcal{P}_2 \),
the span of the set \( S=\{ 3x-x^2, 2x \} \).
By the definition of span, it is the set of unrestricted linear
combinations of the two $\{ c_1(3x-x^2)+c_2(2x)\mid c_1,c_2\in\mathbb{R} \}$.
Clearly polynomials in this span must have a constant term of zero.
Is that necessary condition also sufficient?

We are asking: for which members $a_2x^2+a_1x+a_0$
of $\mathcal{P}_2$ are there $c_1$ and $c_2$ such that
$a_2x^2+a_1x+a_0=c_1(3x-x^2)+c_2(2x)$?
Polynomials are equal when their coefficients are equal so
we want conditions on $a_2$, $a_1$, and $a_0$
making that triple a solution of this system.

$$
\begin{aligned}
  -c_1 = a_2 \\
  3c_1 + 2c_2 = a_1 \\
  0 = a_0
\end{aligned}
$$

Gauss's Method and back-substitution gives
$c_1=-a_2$, and $c_2=(3/2)a_2+(1/2)a_1$, and $0=a_0$.
Thus

as long as there is no constant term $a_0=0$
we can give coefficients $c_1$ and $c_2$
to describe that polynomial as an element of the span.
For instance, for the polynomial $0-4x+3x^2$, the coefficients
$c_1=-3$ and $c_2=5/2$ will do.
So the span of the given set is
$[S]=\{ a_1x+a_2x^2\mid a_1,a_2\in\mathbb{R} \}$.

Incidentally, this shows that
the set \( \{ x,x^2 \} \) spans the same subspace.
A space can have more than one spanning set.
Two other sets spanning this subspace are
\( \{ x,x^2,-x+2x^2 \} \) and
\( \{ x,x+x^2,x+2x^2,\ldots  \} \).

**Example.**

The picture below shows the subspaces of \( \mathbb{R}^3 \) that we now know of: the
trivial subspace, lines through the origin,
planes through the origin, and the whole space.
(Of course, the picture shows only a few of the infinitely many cases.
Line segments connect subsets with
their supersets.)
In the next section we will prove that $\mathbb{R}^3$ has no other
kind of subspace, so in fact this lists them all.

This describes each subspace
as the span of a set with a minimal number of members.
With this, the subspaces
fall naturally into levels— planes on one level,
lines on another,
etc.

*(Figure omitted; lattice of subspaces of \(\mathbb{R}^3\).)*

Levels of subspaces of \(\mathbb{R}^3\), each written as a span of a small set (line segments in the original figure connect subsets with their supersets):

- Whole space: \(\{ x\begin{pmatrix}1\\0\\0\end{pmatrix}+y\begin{pmatrix}0\\1\\0\end{pmatrix}+z\begin{pmatrix}0\\0\\1\end{pmatrix}\}\)
- Planes through the origin, e.g. \(\{ x\begin{pmatrix}1\\0\\0\end{pmatrix}+y\begin{pmatrix}0\\1\\0\end{pmatrix}\}\), \(\{ x\begin{pmatrix}1\\0\\0\end{pmatrix}+z\begin{pmatrix}0\\0\\1\end{pmatrix}\}\), \(\{ x\begin{pmatrix}1\\1\\0\end{pmatrix}+z\begin{pmatrix}0\\0\\1\end{pmatrix}\}\), \(\ldots\)
- Lines through the origin, e.g. \(\{ x\begin{pmatrix}1\\0\\0\end{pmatrix}\}\), \(\{ y\begin{pmatrix}0\\1\\0\end{pmatrix}\}\), \(\{ y\begin{pmatrix}2\\1\\0\end{pmatrix}\}\), \(\{ y\begin{pmatrix}1\\1\\1\end{pmatrix}\}\), \(\ldots\)
- Trivial subspace: \(\{ \begin{pmatrix}0\\0\\0\end{pmatrix} \}\)

So far in this chapter we have seen that to study the
properties of linear combinations, the right setting is a
collection that is closed under these combinations.
In the first subsection we introduced such collections, vector spaces,
and we saw a great variety of examples.
In this subsection we saw still
more spaces, ones that are subspaces of others.
In all of the variety there is a commonality.
The subspaces-of-\(\mathbb{R}^3\) example above
brings it out: vector spaces and subspaces are best understood as a span,
and especially as a span of a small number of vectors.
The next section studies spanning sets that are minimal.
