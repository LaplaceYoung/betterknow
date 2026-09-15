# Two.III.2 Dimension

Title: Two.III.2 Dimension
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

## Dimension
The previous subsection defines a basis of a vector space and
shows that a space can have many different bases.

So we cannot talk about "the" basis for a vector space.
True, some vector spaces have bases that strike us as more natural
than others, for instance, $\mathbb{R}^2$'s basis $\mathcal{E}_2$

or $\mathcal{P}_2$'s basis $\langle 1,x,x^2 \rangle$.
But for
the vector space $\{ a_2x^2+a_1x+a_0\mid 2a_2-a_0=a_1 \}$,
no particular basis leaps out at us as the natural one.
We cannot, in general, associate with a space any single basis that
best describes it.

We can however find something about the bases that
is uniquely associated with the space.
This subsection shows that
any two bases for a space have the same number of elements.
So with each space we can associate a number,
the number of vectors in any of its bases.

Before we start, we first
limit our attention to spaces where at least one basis has only finitely
many members.

**Definition.**

A vector space is **finite-dimensional**

if it has a basis with only finitely many vectors.

 One space that is not finite-dimensional is
the set of polynomials with real coefficients,
the polynomials-of-all-degrees example.
This is not spanned by any finite subset since that would contain
a polynomial of largest degree but this space has polynomials of all degrees.
Such spaces are interesting and important but we will focus in a
different direction.
From now on we will study only finite-dimensional vector spaces.
In the rest of this book we shall take "vector space" to mean
"finite-dimensional vector space".

To prove the main theorem we shall use a technical result, the Exchange Lemma.
We first illustrate it with an example.

**Example.**

Here is a basis for $\mathbb{R}^3$ and a vector given as a linear combination
of members of that basis.

$$
B=\langle \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
              \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix},
              \begin{pmatrix} 0 \\ 0 \\ 2 \end{pmatrix} \rangle

  \begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix}
  =(-1)\cdot\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
   +2\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}
   +0\cdot\begin{pmatrix} 0 \\ 0 \\ 2 \end{pmatrix}
$$

Two of the basis vectors have non-zero coefficients.
Pick one, for instance the first.
Replace it with the vector that we've expressed as the combination

$$
\hat{B}=\langle \begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix},
              \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix},
              \begin{pmatrix} 0 \\ 0 \\ 2 \end{pmatrix} \rangle
$$

and the result is another basis for \( \mathbb{R}^3 \).

**Lemma.**

Assume that
\( B=\langle \vec{\beta}_1,\dots,\vec{\beta}_n \rangle \) is a basis for a
vector space, and that for the vector \( \vec{v} \)
the relationship \( \vec{v}=c_1\vec{\beta}_1+\cdots+c_n\vec{\beta}_n \)
has \( c_i\neq 0 \).
Then exchanging \( \vec{\beta}_i \) for \( \vec{v} \) yields another
basis for the space.

**Proof.**

Call the outcome of the exchange
\( \hat{B}=\langle \vec{\beta}_1,\dots,\vec{\beta}_{i-1},\vec{v},
                       \vec{\beta}_{i+1},\dots,\vec{\beta}_n \rangle  \).

We first show that $\hat{B}$ is linearly independent.
Any relationship
\( d_1\vec{\beta}_1+\dots+d_i\vec{v}+\dots+d_n\vec{\beta}_n=\vec{0} \)
among the members of $\hat{B}$, after substitution for $\vec{v}$,

$$
d_1\vec{\beta}_1+\dots
    +d_i\cdot(c_1\vec{\beta}_1+\dots+c_i\vec{\beta}_i+\dots+c_n\vec{\beta}_n)
    +\dots+d_n\vec{\beta}_n
  =\vec{0}\tag{($*$)}
$$

gives a linear relationship among the members of $B$.
The basis $B$ is linearly independent so the coefficient $d_ic_i$ of
$\vec{\beta}_i$ is zero.
Because we assumed that $c_i$ is nonzero, $d_i=0$.
Using this in equation $(*)$ gives that all of the other $d$'s are also
zero.
Therefore $\hat{B}$ is linearly independent.

We finish by showing that $\hat{B}$ has the same span as $B$.
Half of this argument, that $[\hat{B}]\subseteq[B]$,
is easy; we can write any member
$d_1\vec{\beta}_1+\dots+d_i\vec{v}+\dots+d_n\vec{\beta}_n$
of $[\hat{B}]$ as
$
  d_1\vec{\beta}_1+\dots
    +d_i\cdot(c_1\vec{\beta}_1+\dots+c_n\vec{\beta}_n)
    +\dots+d_n\vec{\beta}_n
$,
which is a linear combination of linear combinations of members of $B$, and
hence is in $[B]$.
For the $[B]\subseteq[\hat{B}]$ half of the argument,
recall that if
$\vec{v}=c_1\vec{\beta}_1+\dots+c_n\vec{\beta}_n$ with $c_i\neq 0$
then we can rearrange the equation to
$\vec{\beta}_i=(-c_1/c_i)\vec{\beta}_1+\dots+(1/c_i)\vec{v}+\dots
   +(-c_n/c_i)\vec{\beta}_n$.
Now, consider any member
$d_1\vec{\beta}_1+\dots+d_i\vec{\beta}_i+\dots+d_n\vec{\beta}_n$
of $[B]$, substitute for $\vec{\beta}_i$ its expression as a linear
combination of the members of $\hat{B}$, and recognize,
as in the first half of this argument, that the result is a linear
combination of linear combinations of members of $\hat{B}$, and hence is in
$[\hat{B}]$.

**Theorem.**

In any finite-dimensional vector space, all
bases have the same number of elements.

**Proof.**

Fix a vector space with at least one finite basis.
Choose, from among all of this space's bases,
one \( B=\langle \vec{\beta}_1,\dots,\vec{\beta}_n \rangle \) of minimal size.
We will show that any other basis
\( D=\langle \vec{\delta}_1,\vec{\delta}_2,\ldots \rangle \)
also has the same number of members, $n$.
Because \( B \) has minimal size, \( D \) has no fewer than \( n \) vectors.
We will argue that it cannot have more than \( n \) vectors.

The basis \( B \) spans the space and \( \vec{\delta}_1 \) is in the space,
so \( \vec{\delta}_1 \) is a nontrivial linear combination of elements of
\( B \).
By the Exchange Lemma, we can swap \( \vec{\delta}_1 \) for a
vector from \( B \), resulting in a basis \( B_1 \), where one element is
\( \vec{\delta}_1 \) and all of the \( n-1 \) other elements
are \( \vec{\beta} \)'s.

The prior paragraph forms the basis step for an induction argument.
The inductive step starts with a basis \( B_k \) (for \( 1\leq k<n \))
containing \( k \) members of \( D \) and \( n-k \) members of \( B \).
We know that \( D \) has at least \( n \) members so there is a
\( \vec{\delta}_{k+1} \).
Represent it as a linear combination of elements of \( B_k \).
The key point: in that representation, at least one of the nonzero scalars
must be associated with a \( \vec{\beta}_i \) or else that
representation would be a
nontrivial linear relationship among elements of the linearly independent
set \( D \).
Exchange \( \vec{\delta}_{k+1} \) for \( \vec{\beta}_i \) to get a new basis
\( B_{k+1} \) with one \( \vec{\delta} \) more and one \( \vec{\beta} \)
fewer than the previous basis \( B_k \).

Repeat that until no \( \vec{\beta} \)'s remain, so
that \( B_n \) contains
$\vec{\delta}_1,\dots,\vec{\delta}_n$.
Now, \( D \) cannot have more than these \( n \) vectors because
any \( \vec{\delta}_{n+1} \) that remains would be in the span of
\( B_n \) (since it is a basis)
and hence would be a linear combination of the other $\vec{\delta}$'s,
contradicting that $D$ is linearly independent.

**Definition.**

The **dimension**
of a vector space is the number of vectors in any of its bases.

**Example.**

Any basis for \( \mathbb{R}^n \) has \( n \) vectors since the standard basis
\( \mathcal{E}_n \) has \( n \) vectors.
Thus, this definition of "dimension" generalizes the most familiar use of
term, that $\mathbb{R}^n$ is $n$-dimensional.

**Example.**

The space \( \mathcal{P}_n \) of polynomials of degree at most $n$
has dimension \( n+1 \).
We can show this by exhibiting any basis— $\langle 1,x,\dots,x^n \rangle$
comes to mind— and counting its members.

**Example.**

The space of functions
$\{ a\cdot\cos\theta+b\cdot\sin\theta\mid a,b\in\mathbb{R} \}$
of the real variable $\theta$ has dimension $2$ since this space has the
basis $\langle \cos\theta,\sin\theta \rangle$.

**Example.**

A trivial space is zero-dimensional since its basis is empty.

Again, although we sometimes say "finite-dimensional" for emphasis, from now on
we take all vector spaces to be finite-dimensional.
So in the next result the word "space"
means "finite-dimensional vector space".

**Corollary.**

No linearly independent set can have a size greater than the dimension of the
enclosing space.

**Proof.**

The proof of the all-bases-same-size theorem
never uses that \( D \) spans the space,
only that it is linearly independent.

**Example.**

Recall the diagram from the subspaces-of-R^3 example showing
the subspaces of \( \mathbb{R}^3 \).
Each subspace is described with a minimal spanning set, a basis.
The whole space has a basis with three members,
the plane subspaces have bases with two members,
the line subspaces have bases with one member,
and the trivial subspace has a basis with zero members.

In that section we could not show that these are
\( \mathbb{R}^3 \)'s only subspaces.
We can show it now.
The prior corollary proves that
There are no, say, five-dimensional subspaces of three-space.
Further, by the definition of dimension the dimension of every space
is a whole number so there are no subspaces of $\mathbb{R}^3$
that are somehow $1.5$-dimensional, between lines and planes.
Thus the list of subspaces that we gave is exhaustive;
the only subspaces of \( \mathbb{R}^3 \) are either three-,
two-, one-, or zero-dimensional.

**Corollary.**

Any linearly independent set can be expanded to make a basis.

**Proof.**

If a linearly independent set
is not already a basis then it must not span the space.
Adding to the set a vector that is not in the span
will preserve linear independence by
the add-a-vector independence lemma.
Keep adding until the resulting set does span the space,
which the prior corollary
shows will happen after only a finite number of steps.

**Corollary.**

Any spanning set can be shrunk to a basis.

**Proof.**

Call the spanning set \( S \).
If \( S \) is empty then it is already a basis (the space must be a trivial
space).
If \( S=\{ \vec{0} \} \) then it can be shrunk to the empty basis,
thereby making it linearly independent, without changing its span.

Otherwise, $S$ contains a vector $\vec{s}_1$ with $\vec{s}_1\neq\vec{0}$
and we can form a basis \( B_1=\langle \vec{s}_1 \rangle \).
If \( [B_1]=[S] \) then we are done.
If not then there is a \( \vec{s}_2\in[S] \) such that
\( \vec{s}_2\notin[B_1] \).
Let \( B_2=\langle \vec{s}_1,\vec{s_2} \rangle \);
by the add-a-vector independence lemma this is linearly independent
so if \( [B_2]=[S] \) then we are done.

We can repeat this process until the spans are equal,
which must happen in at most finitely many steps.

**Corollary.**

In an \( n \)-dimensional space, a set composed of \( n \) vectors is linearly
independent if and
only if it spans the space.

**Proof.**

First we will
show that a subset with \( n \) vectors is linearly independent if and only
if it is a basis.
The "if" is trivially true— bases are linearly independent.
"Only if" holds
because a linearly independent set can be expanded to a basis, but a
basis has \( n \) elements, so this
expansion is actually the set that we began with.

To finish, we will show that any subset with \( n \) vectors spans the space
if and only if it is a basis.
Again, "if" is trivial.
"Only if"
holds because any spanning set can be shrunk to a basis, but a basis has
\( n \) elements and so this shrunken set is just the one we started with.

The main result of this subsection, that all of
the bases in a finite-dimensional
vector space have the same number of elements, is the single most important
result in this book.
As the subspace-diagram example
shows, it describes what vector spaces and subspaces there can be.

One immediate consequence brings us
back to when we considered the two things that could be meant
by the term "minimal spanning set".
At that point we defined "minimal" as linearly independent
but we noted that
another reasonable interpretation of the term is
that a spanning set is "minimal" when it has the fewest
number of elements of any set with the same span.
Now that
we have shown that all bases have the same number of elements, we know
that the two senses of "minimal" are equivalent.
