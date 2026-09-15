# Two.II.1 Linear Independence

Title: Two.II.1 Linear Independence
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

# Linear Independence
The prior section shows how to understand a vector space
as a span,
as an unrestricted linear combination of some of its elements.
For example, the space of linear polynomials $\{ a+bx\mid a,b\in\mathbb{R} \}$
is spanned by the set $\{ 1,x \}$.
The prior section also showed that a space can have many sets that span it.
Two more sets that span the space of linear polynomials are
$\{ 1,2x \}$ and $\{ 1,x,2x \}$.

At the end of that section we described some spanning sets as "minimal"
but we never precisely defined that word.

We could mean that a spanning set is minimal if it
contains the smallest number of members of any set with the same span,
so that $\{ 1,x,2x \}$ is not minimal because it has
three members while we can give two-element sets spanning the same space.
Or we could mean that a spanning set is minimal when it has no elements
that we can remove without changing the span.
Under this meaning $\{ 1,x,2x \}$ is not minimal because
removing the \( 2x \) to get \( \{ 1,x \} \) leaves the
span unchanged.

The first sense of minimality appears to be a global requirement,
in that to check if a spanning set is minimal
we seemingly must look at all the sets that span
and find one with the least number of elements.
The second sense of minimality is local since
we need to look only at the set and consider the
span with and without various elements.
For instance, using the second sense
we could compare the span of $\{ 1,x,2x \}$
with the span of $\{ 1,x \}$ and
note that $2x$ is a "repeat" in that
its removal doesn't shrink the span.

In this section we will use the second sense of "minimal spanning set"
because of this technical convenience.
However, the most important result of this book is that the two senses
coincide.
We will prove that in the next section.

## Definition and Examples

We saw "repeats" in the first chapter.
There, Gauss's Method turned them into
$0=0$ equations.

**Example.**

Recall the Statics example from
Chapter One's opening.
We got two balances with the pair of unknown-mass objects, one
at \( 40 \) cm and \( 15 \) cm and another
at \( -50 \) cm and \( 25 \) cm, and
we then computed the value of those masses.
Had we instead gotten the second balance at
\( 20 \) cm and \( 7.5 \) cm
then Gauss's Method on the resulting two-equations, two-unknowns system
would not have yielded a solution, it would have yielded a $0=0$ equation
along with an equation containing a free variable.
Intuitively, the problem is that \( (20 \ 7.5) \) is half of
$(40 \ 15)$, that is,
$(20 \ 7.5)$ is in the span of the set $\{ (40 \ 15) \}$
and so is repeated data.
We would have been trying to
solve a two-unknowns problem with essentially only one piece of information.

We take $\vec{v}$ to be a "repeat"
of the vectors in a set $S$ if $\vec{v}\in[S]$ so
that it depends on, that is, is expressible in terms of,
elements of the set
$\vec{v}=c_1\vec{s}_1+\cdots+c_n\vec{s}_n$.

**Lemma.**

Where $V$ is a vector space, $S$ is a subset of that space, and $\vec{v}$
is an element of that space,
$[S\cup\{ \vec{v} \}] = [S]$
if and only if
$\vec{v}\in[S]$.

**Proof.**

Half of the if and only if is immediate: if $\vec{v}\notin[S]$ then
the sets are not equal because $\vec{v}\in[S\cup\{ \vec{v} \}]$.

For the other half assume that $\vec{v}\in[S]$
so that $\vec{v}=c_1\vec{s}_1+\cdots+c_n\vec{s}_n$ for some scalars $c_i$
and vectors $\vec{s}_i\in S$.
We will use mutual containment to show that the sets
$[S\cup\{ \vec{v} \}]$ and $[S]$ are equal.
The containment $[S\cup\{ \vec{v} \}]\supseteq[S]$ is clear.

To show containment in the other direction let $\vec{w}$ be an element
of $[S\cup\{ \vec{v} \}]$.
Then $\vec{w}$ is a linear combination of elements of
$S\cup\{ \vec{v} \}$, which we can write as
$\vec{w}=c_{n+1}\vec{s}_{n+1}+\cdots+c_{n+k}\vec{s}_{n+k}+c_{n+k+1}\vec{v}$.
(Possibly some of the $\vec{s}_i$'s from $\vec{w}$'s equation are the same as
some of those from $\vec{v}$'s equation but that does not matter.)
Expand $\vec{v}$.

$$
\vec{w}=c_{n+1}\vec{s}_{n+1}+\cdots+c_{n+k}\vec{s}_{n+k}
            +c_{n+k+1}\cdot(c_1\vec{s}_1+\cdots+c_n\vec{s}_n)
$$

Recognize the right hand side as a linear combination of linear
combinations of vectors from $S$.
Thus $\vec{w}\in[S]$.

The discussion at the section's opening involved removing vectors, not adding
them.

**Corollary.**

For $\vec{v}\in S$,
omitting that vector does not shrink the span
if and only if that vector is dependent on other vectors in the
set.
That is,
$[S]=[S-\{ \vec{v} \}]$
if and only if $\vec{v}\in[S-\{ \vec{v} \}]$.

Thus, to know whether removing a vector will decrease
the span, we need to know whether the vector is a linear combination
of others in the set.

**Definition.**

In any vector space, a set of vectors is
**linearly independent**

if none of its elements is a linear combination of the
others from the set. (See also the remark on why independence uses a multiset.)
Otherwise the set is
**linearly dependent**.

Thus the set $\{ \vec{s}_0,\ldots,\vec{s}_n \}$ is independent
if there is no equality
$\vec{s}_i=c_0\vec{s}_0+\ldots+c_{i-1}\vec{s}_{i-1}+c_{i+1}\vec{s}_{i+1}+\ldots+c_n\vec{s}_n$.
The definition's use of the word "others" means that
writing $\vec{s}_i$ as a linear combination via $\vec{s}_i=1\cdot\vec{s}_i$
does not count.

Observe that,
although this way of writing one vector as a combination of the others

$$
\vec{s}_0=c_1\vec{s}_1+\cdots+c_n\vec{s}_n
$$

visually sets off \( \vec{s}_0 \), algebraically
there is nothing special about that vector in that equation.
For any \( \vec{s}_i \) with a coefficient $c_i$ that is non-$0$,
we can rewrite to isolate \( \vec{s}_i \).

$$
\vec{s}_i=(1/c_i)\vec{s}_0+\dots
              +(-c_{i-1}/c_i)\vec{s}_{i-1}+(-c_{i+1}/c_i)\vec{s}_{i+1}
              +\dots+(-c_n/c_i)\vec{s}_n
$$

When we don't want to single out any vector
we will instead say that
\( \vec{s}_0,\vec{s}_1,\dots,\vec{s}_n \) are in a
**linear relationship**

and put all of the vectors on the same side.

The next result rephrases the linear independence definition in this style.
It is how we usually compute whether
a finite set is dependent or independent.

**Lemma.**

A subset \( S \) of a vector space is linearly independent if and only if
among its elements
the only linear relationship
$ c_1\vec{s}_1+\dots+c_n\vec{s}_n=\vec{0}$
is the trivial one, \( c_1=0,\dots, c_n=0 \)
(where $\vec{s}_i\neq\vec{s}_j$ when $i\neq j$) .

**Proof.**

If \( S \) is linearly independent then no vector
$\vec{s}_i$
is a linear combination of other vectors from $S$,
so there is no linear relationship where some of the
$\vec{s} $'s have nonzero coefficients.

If \( S \) is not linearly independent then some \( \vec{s}_i \) is a linear
combination
$\vec{s}_i=c_1\vec{s}_1+\dots+c_{i-1}\vec{s}_{i-1}
    +c_{i+1}\vec{s}_{i+1}+\dots+c_n\vec{s}_n$
of other vectors from \( S \).
Subtracting $\vec{s}_i$ from both sides
gives a relationship
involving a nonzero coefficient,
the \( -1 \) in front of \( \vec{s}_i \).

**Example.**

In the vector space of two-wide row vectors, the two-element set
\( \{  (40 \ 15),(-50 \ 25) \} \) is linearly independent.
To check this, take

$$
c_1\cdot(40 \ 15)+c_2\cdot(-50 \ 25)=(0 \ 0)
$$

and solve the resulting system.

$$
\begin{aligned}
  40c_1 - 50c_2 = 0 \\
  15c_1 + 25c_2 = 0
\end{aligned}
  \xrightarrow{-(15/40)\rho_1+\rho_2}
  \begin{aligned}
  40c_1 - 50c_2 = 0 \\
  (175/4)c_2 = 0
\end{aligned}
$$

Both \( c_1 \) and \( c_2 \) are zero.
So the only linear relationship between the two given row vectors
is the trivial relationship.

In the same vector space, the set
\( \{  (40 \ 15),(20 \ 7.5) \} \) is linearly dependent since
we can satisfy

$c_1\cdot (40 \ 15)+c_2\cdot(20 \ 7.5)=(0 \ 0)$

with \( c_1=1 \) and \( c_2=-2 \).

**Example.**

The set \( \{ 1+x,1-x \} \) is linearly independent in \( \mathcal{P}_2 \), the
space of quadratic polynomials with real coefficients, because

$$
0+0x+0x^2
   =
   c_1(1+x)+c_2(1-x)
   =
   (c_1+c_2)+(c_1-c_2)x+0x^2
$$

gives

$$
\begin{aligned}
  c_1 + c_2 = 0 \\
  c_1 - c_2 = 0
\end{aligned}
  \xrightarrow{-\rho_1+\rho_2}
  \begin{aligned}
  c_1 + c_2 = 0 \\
  2c_2 = 0
\end{aligned}
$$

since polynomials are equal only if their coefficients are equal.
Thus, the only linear relationship between these two members of
$\mathcal{P}_2$ is the trivial one.

**Remark.**

The lemma specifies that $\vec{s}_i\neq\vec{s}_j$
when $i\neq j$ because of course if some vector $\vec{s}$ appears
twice then we can get a nontrivial
$c_1\vec{s}_1+\dots+c_n\vec{s}_n=\vec{0}$, by taking
the associated coefficients to be $1$ and $-1$.
Besides, if some vector appears more than once in an expression then
we can always combine the coefficients.

Note that the lemma allows the
opposite of appearing more than once, that some
vectors from $S$ don't appear at all.
For instance, if $S$ is infinite then because
linear relationships involve only finitely many vectors,
any such relationship leaves out many of $S$'s vectors.
However, note also that if $S$ is finite then where convenient
we can take a combination
$c_1\vec{s}_1+\dots+c_n\vec{s}_n$ to contain each of $S$'s vectors once and
only once.
If a vector is missing then we can add it by using a
coefficient of $0$.

**Example.**

The rows of this matrix

$$
A=
  \begin{pmatrix}
  2 & 3 & 1 & 0 \\
  0 & -1 & 0 & -2 \\
  0 & 0 & 0 & 1
\end{pmatrix}
$$

form a linearly independent set.
This is easy to check for this case but also
recall that Lemma One.III.
shows that the rows of any echelon form matrix make
a linearly independent set.

**Example.**

In \( \mathbb{R}^3 \), where

$$
\vec{v}_1=\begin{pmatrix} 3 \\ 4 \\ 5 \end{pmatrix}

   \vec{v}_2=\begin{pmatrix} 2 \\ 9 \\ 2 \end{pmatrix}

   \vec{v}_3=\begin{pmatrix} 4 \\ 18 \\ 4 \end{pmatrix}
$$

the set \( S=\{ \vec{v}_1,\vec{v}_2,\vec{v}_3 \} \)
is linearly dependent because this is a relationship

$$
0\cdot\vec{v}_1
  +2\cdot\vec{v}_2
  -1\cdot\vec{v}_3
  =\vec{0}
$$

where not all of the scalars are zero
(the fact that some
of the scalars are zero doesn't matter).

That example illustrates why,
although the definition of linear independence is a clearer
statement of what independence means,
the linear-dependence lemma is better for
computations.
Working straight from the definition, someone trying to compute whether $S$
is linearly independent would start by setting
\( \vec{v}_1=c_2\vec{v}_2+c_3\vec{v}_3 \)
and concluding that there are no such $c_2$ and $c_3$.
But knowing that the first vector is not
dependent on the other two is not enough.
This person would have to go on to try
\( \vec{v}_2=c_1\vec{v}_1+c_3\vec{v}_3 \), in order
to find the dependence $c_1=0$, \( c_3=1/2 \).
The linear-dependence lemma
gets the same conclusion with only one computation.

**Example.**

The empty subset of a vector space is linearly independent.
There is no nontrivial linear relationship among its members as it has
no members.

**Example.**

In any vector space, any subset containing the zero vector is linearly
dependent.
One example is, in the space $\mathcal{P}_2$ of quadratic polynomials,
the subset $\{ 1+x,x+x^2,0 \}$.
It is linearly
dependent because
$0\cdot\vec{v}_1+0\cdot\vec{v}_2+1\cdot\vec{0}=\vec{0}$ is a nontrivial
relationship, since not all of the coefficients are zero.

There is a subtle point that we shall see a number of times and that
bears on the prior example.
It is about the trivial sum, the sum of the empty set.
One way to see how to define the trivial sum
is to consider the progression
$\vec{v}_1+\vec{v}_2+\vec{v}_3$, followed by
$\vec{v}_1+\vec{v}_2$, followed by
$\vec{v}_1$.
The difference between the sum of three vectors and the sum of two
is $\vec{v}_3$.
Then the difference between the sum of two and the sum of one
is $\vec{v}_2$.
In next passing to the trivial sum, the sum of zero-many vectors,
we can expect to subtract $\vec{v}_1$.
So we define the sum of zero-many vectors to be the zero vector.

The relation with the prior example is that if the zero vector is in a set
then that set has an element that
is a combination of a subset of other vectors from the set, specifically,
the zero vector is a combination of the empty subset.
Even the set $S=\{ \vec{0} \}$ is linearly dependent, because $\vec{0}$ is the
sum of the empty set and the empty set is a subset of $S$.

**Remark.**

The definition of linear independence refers to a "set" of vectors.
Sets are the most familiar kind of collection and
in practice everyone uses the word "set" in this context.
But to be complete, we will note that sets are not quite the right kind
of collection for this purpose.

Recall that a set is a collection with two properties:
(i) order does not matter,
so that the set $\{ 1,2 \}$ equals the set $\{ 2,1 \}$, and
(ii) duplicates collapse, so that the set $\{ 1,1,2 \}$ equals the set
$\{ 1,2 \}$.

Now consider this matrix reduction.

$$
\begin{pmatrix}
  1 & 1 & 1 \\
  2 & 2 & 2 \\
  1 & 2 & 3
\end{pmatrix}
  \xrightarrow{(1/2)\rho_2}
  \begin{pmatrix}
  1 & 1 & 1 \\
  1 & 1 & 1 \\
  1 & 2 & 3
\end{pmatrix}
$$

On the left the set of matrix rows
$\{ (1 \ 1 \ 1), (2 \ 2 \ 2), (1 \ 2 \ 3) \}$ is
linearly dependent.
On the right the set of rows is
$\{ (1 \ 1 \ 1), (1 \ 1 \ 1), (1 \ 2 \ 3) \}$.
Because duplicates collapse, that equals
the set
$\{ (1 \ 1 \ 1), (1 \ 2 \ 3) \}$,
which is linearly independent.
This is a problem because Gauss's Method should preserve linear dependence.

That is, strictly speaking,
we need a type of collection where duplicates do not collapse.
A collection where order does not matter and duplicates don't collapse
is a **multiset**.

However, while insisting on being completely correct has advantages,
departing from the standard terminology of "set" would have pitfalls of its
own, so we will continue to use that word.
Later, we shall occasionally need to take combinations without
letting duplicates collapse and we shall do that without
further comment.

**Corollary.**

A set $S$ is linearly independent if and only if
for any $\vec{v}\in S$, its removal shrinks the span
$[S-\{ v \}]\subsetneq[S]$.

**Proof.**

This follows from the omit-a-vector corollary.
If $S$ is linearly independent then none of its vectors is dependent on
the other elements, so removal of any vector will shrink the span.
If $S$ is not linearly independent then it contains a vector that is
dependent on other elements of the set, and removal of that vector
will not shrink the span.

So a spanning set is minimal if and only if it is linearly independent.

The prior result addresses removing elements from a linearly independent set.
The next one adds elements.

**Lemma.**

Suppose that $S$ is linearly independent and that $\vec{v}\notin S$.
Then
the set $S\cup\{ \vec{v} \}$ is linearly independent if and only if
$\vec{v}\notin[S]$.

**Proof.**

We will show that $S\cup\{ \vec{v} \}$ is not linearly independent
if and only if $\vec{v}\in[S]$.

Suppose first that $\vec{v}\in[S]$.
Express $\vec{v}$ as a combination $\vec{v}=c_1\vec{s}_1+\cdots+c_n\vec{s}_n$.
Rewrite that $\vec{0}=c_1\vec{s}_1+\cdots+c_n\vec{s}_n-1\cdot\vec{v}$.
Since $\vec{v}\notin S$, it does not equal any of the $\vec{s}_i$ so this is
a nontrivial linear dependence among the elements of $S\cup\{ \vec{v} \}$.
Thus that set is not linearly independent.

Now suppose that $S\cup\{ \vec{v} \}$ is not linearly independent and
consider a nontrivial dependence among its members
$\vec{0}=c_1\vec{s}_1+\cdots+c_n\vec{s}_n+c_{n+1}\cdot\vec{v}$.
If $c_{n+1}=0$ then that is a dependence among the elements of $S$, but
we are assuming that $S$ is independent, so $c_{n+1}\neq 0$.
Rewrite the equation
as $\vec{v}=(c_1/c_{n+1})\vec{s}_1+\cdots+(c_n/c_{n+1})\vec{s}_n$
to get $\vec{v}\in[S]$

**Example.**

This subset of $\mathbb{R}^3$ is linearly independent.

$$
S
   =\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} \}
$$

The span of $S$ is the $x$-axis.
Here are two supersets, one that is linearly dependent and the other
independent.

     dependent:
     \( \{
         \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
         \begin{pmatrix} -3 \\ 0 \\ 0 \end{pmatrix} \} \)

     independent:
     \( \{
         \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
         \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \} \)

We got the
dependent superset by adding a vector from the $x$-axis
and so the span did not grow.
We got the independent superset by adding a vector
that isn't in $[S]$, because it has a nonzero $y$ component,
causing the span to grow.

For the independent set

$$
S
   =\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
          \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}
                  \}
$$

the span \( [S] \) is the \( xy \)-plane.
Here are two supersets.

     dependent:
     \( \{
         \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
         \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix},
         \begin{pmatrix} 3 \\ -2 \\ 0 \end{pmatrix}  \} \)

     independent:
     \( \{
         \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
         \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix},
         \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}  \} \)

As above, the additional member of the
dependent superset comes from $[S]$, the $xy$-plane, while the
added member of the
independent superset comes from outside of that span.

Finally, consider this independent set

$$
S =\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
          \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix},
          \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}         \}
$$

with \( [S]=\mathbb{R}^3 \).
We can get a linearly dependent superset.

     dependent:
     \( \{
         \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
         \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix},
         \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix},
         \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix}  \} \)

But there is no linearly independent superset of $S$.
One way to see that is to note that
for any vector that we would add to $S$, the equation

$$
\begin{pmatrix} x \\ y \\ z \end{pmatrix}
  =c_1\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
   +c_2\begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}
   +c_3\begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}
$$

has a solution $c_1=x$, $c_2=y$, and $c_3=z$.
Another way to see it is that
we cannot add any vectors from outside of the span $[S]$ because that
span is $\mathbb{R}^3$.

**Corollary.**

In a vector space,
any finite set has a linearly independent subset with the same span.

**Proof.**

If \( S=\{  \vec{s}_1,\dots,\vec{s}_n \} \) is linearly independent
then $S$ itself satisfies the statement, so
assume that it is linearly dependent.

By the definition of dependent, $S$ contains
a vector $\vec{v}_1$ that is a linear combination of
the others.
Define the set \( S_1=S-\{ \vec{v}_1 \} \).
By the omit-a-vector corollary
the span does not shrink \( [S_1]=[S] \).

If \( S_1 \) is linearly independent then we are done.
Otherwise iterate:
take a vector $\vec{v}_2$
that is a linear combination of
other members of $S_1$ and discard it
to derive \( S_2=S_1-\{ \vec{v}_2 \} \)
such that \( [S_2]=[S_1] \).
Repeat this until a linearly independent set $S_j$ appears;
one must appear eventually because \( S \) is finite
and the empty set is linearly independent.

(Formally, this argument uses
induction on the number of elements in $S$.
the exercises ask for the details.)

Thus if we have a set that is linearly dependent then we can, without changing
the span, pare down by
discarding what we have called "repeat" vectors.

**Example.**

This set spans \( \mathbb{R}^3 \) (the check is routine)
but is not linearly independent.

$$
S=\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
     \begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix},
     \begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix},
     \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix},
     \begin{pmatrix} 3 \\ 3 \\ 0 \end{pmatrix}   \}
$$

We will calculate which vectors to drop in order
to get a subset that is independent but
has the same span.
This linear relationship

$$
c_1\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
  +c_2\begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix}
  +c_3\begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix}
  +c_4\begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}
  +c_5\begin{pmatrix} 3 \\ 3 \\ 0 \end{pmatrix}
  =\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}
   \tag{$*$}
$$

gives a system

$$
\begin{aligned}
  c_1 + c_3 + + 3c_5 = 0 \\
  2c_2 + 2c_3 - c_4 + 3c_5 = 0 \\
  c_4 = 0
\end{aligned}
$$

whose solution set has this parametrization.

$$
\{ \begin{pmatrix} c_1 \\ c_2 \\ c_3 \\ c_4 \\ c_5 \end{pmatrix}=
     c_3\begin{pmatrix} -1 \\ -1 \\ 1 \\ 0 \\ 0 \end{pmatrix}
     +c_5\begin{pmatrix} -3 \\ -3/2 \\ 0 \\ 0 \\ 1 \end{pmatrix}
     \mid c_3,c_5\in\mathbb{R}  \}
$$

Set $c_5=1$ and $c_3=0$
to get an instance of ($*$).

$$
-3\cdot\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
  -\frac{3}{2}\cdot\begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix}
  +0\cdot\begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix}
  +0\cdot\begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}
  +1\cdot\begin{pmatrix} 3 \\ 3 \\ 0 \end{pmatrix}
  =\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}
$$

This shows that the vector from $S$ that we've
associated with $c_5$
is in the span of the set of $c_1$'s vector and $c_2$'s vector.
We can discard $S$'s fifth vector without shrinking the span.

Similarly, set $c_3=1$, and $c_5=0$
to get an instance of ($*$) that
shows we can discard $S$'s third vector without shrinking the span.
 Thus this set has the same span as $S$.

$$
\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},
     \begin{pmatrix} 0 \\ 2 \\ 0 \end{pmatrix},
     \begin{pmatrix} 0 \\ -1 \\ 1 \end{pmatrix}   \}
$$

The check that it is linearly independent is routine.

**Corollary.**

A subset \( S=\{ \vec{s}_1,\dots,\vec{s}_n \} \) of a vector space
is linearly dependent if and only if some \( \vec{s_i} \)
is a linear combination of the vectors
\( \vec{s}_1 \), \ldots, \( \vec{s}_{i-1} \)
listed before it.

**Proof.**

Consider \( S_0=\{  \} \), \( S_1=\{ \vec{s_1} \} \),
\( S_2=\{ \vec{s}_1,\vec{s}_2  \} \), etc.
Some index \( i\geq 1 \) is the first one with
\( S_{i-1}\cup\{ \vec{s}_i  \} \)
linearly dependent, and there \( \vec{s}_i\in[ S_{i-1} ] \).

The proof of
the linearly-dependent-subset corollary describes producing a linearly
independent set by shrinking, by taking subsets.
And the proof of the dependence-means-linear-combination corollary describes finding a
linearly dependent set by taking supersets.
We finish this subsection by considering
how linear independence and dependence interact
with the subset relation between sets.

**Lemma.**

Any subset of a linearly independent set is also linearly independent.
Any superset of a linearly dependent set is also linearly dependent.

**Proof.**

Both are clear.

Restated, subset preserves independence
and superset preserves dependence.

Those are two of the four possible cases.
The third case, whether subset preserves linear dependence,
is covered by the shrink-set-same-span example, which gives
a linearly dependent set $S$ with one subset
that is linearly dependent and another
that is independent.
The fourth case, whether superset preserves linear independence,
is covered by the linearly independent supersets example, which gives cases
where a linearly independent set has both an independent
and a dependent superset.
This table summarizes.

| | \(\hat{S}\subset S\) | \(\hat{S}\supset S\) |
| --- | --- | --- |
| *$S$ independent* | \(\hat{S}\) must be independent | \(\hat{S}\) may be either |
| *$S$ dependent* | \(\hat{S}\) may be either | \(\hat{S}\) must be dependent |

The linearly independent supersets example has something else to say about the
interaction between linear independence and superset.
It names a
linearly independent set that is maximal in
that it has no supersets that are linearly independent.
By the add-a-vector independence lemma
a linearly independent set is maximal if and only if it
spans the
entire space, because that is when
all the vectors in the space are already in the span.
This nicely
complements the independent-set-is-minimal-spanning-set lemma, that
a spanning set is minimal if and only if it is linearly independent.
