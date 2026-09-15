# Two.III.1 Basis

Title: Two.III.1 Basis
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

# Basis and Dimension

The prior section ends with the observation that
a spanning set is minimal when it is linearly independent and
a linearly independent set is maximal when it spans the space.
So the notions of minimal spanning set and maximal independent set
coincide.
In this section we will name this idea and study its properties.

## Basis

**Definition.**

A **basis**
for a vector
space is a sequence of vectors that is linearly independent
and that spans the space.

Because a basis is a
sequence,
meaning that
bases are different if they contain the same elements but in different
orders,

we denote it with angle brackets
\( \langle \vec{\beta}_1,\vec{\beta}_2,\ldots \rangle \).

(A sequence is linearly independent if the multiset
consisting of the elements of the sequence is independent.
Similarly,
a sequence spans the space if the set of elements
of the sequence spans the space.)

**Example.**

This is a basis for \( \mathbb{R}^2 \).

$$
\langle  \begin{pmatrix} 2 \\ 4 \end{pmatrix},\begin{pmatrix} 1 \\ 1 \end{pmatrix}  \rangle
$$

It is linearly independent

$$
c_1\begin{pmatrix} 2 \\ 4 \end{pmatrix}+c_2\begin{pmatrix} 1 \\ 1 \end{pmatrix}=\begin{pmatrix} 0 \\ 0 \end{pmatrix}
   \implies
  \begin{aligned}
  2c_1 + 1c_2 = 0 \\
  4c_1 + 1c_2 = 0
\end{aligned}
   \implies
  c_1=c_2=0
$$

and it spans \( \mathbb{R}^2 \).

$$
\begin{aligned}
  2c_1 + 1c_2 = x \\
  4c_1 + 1c_2 = y
\end{aligned}
   \implies
  c_2=2x-y \text{ and } c_1=(y-x)/2
$$

**Example.**

This basis for \( \mathbb{R}^2 \) differs from the prior one

$$
\langle \begin{pmatrix} 1 \\ 1 \end{pmatrix},\begin{pmatrix} 2 \\ 4 \end{pmatrix} \rangle
$$

because it is in a different order.
The verification that it is a basis is just as in the prior example.

**Example.**

The space \( \mathbb{R}^2 \) has many bases.
Another one is this.

$$
\langle  \begin{pmatrix} 1 \\ 0 \end{pmatrix},\begin{pmatrix} 0 \\ 1 \end{pmatrix}  \rangle
$$

The verification is easy.

**Definition.**

For any \( \mathbb{R}^n \)

$$
\mathcal{E}_n=\langle
     \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix},
     \begin{pmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{pmatrix},
     \dots,
     \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{pmatrix} \rangle
$$

is the **standard**
 (or **natural**) basis.
We denote these vectors \( \vec{e}_1,\dots,\vec{e}_n \).

Calculus books denote $\mathbb{R}^2$'s standard basis vectors as
\( \vec{\imath} \) and \( \vec{\jmath} \) instead of $\vec{e}_1$
and $\vec{e}_2$ and they denote to
\( \mathbb{R}^3 \)'s standard basis vectors as
\( \vec{\imath} \), \( \vec{\jmath} \), and \( \vec{k} \)
instead of $\vec{e}_1$, $\vec{e}_2$, and $\vec{e}_3$.
Note that \( \vec{e}_1 \) means something different in a
discussion of \( \mathbb{R}^3 \) than it means in a discussion of \( \mathbb{R}^2 \).

**Example.**

Consider the space
\( \{ a\cdot\cos\theta+b\cdot\sin\theta\mid a,b\in\mathbb{R} \} \)
of functions of the real variable $\theta$.
This is a natural basis
$ \langle \cos\theta, \sin\theta \rangle=\langle 1\cdot\cos\theta+0\cdot\sin\theta,
             0\cdot\cos\theta+1\cdot\sin\theta \rangle
    $.
A more generic basis for this space is
\( \langle \cos\theta-\sin\theta,
             2\cos\theta+3\sin\theta \rangle \).
Verification that these two are bases is left to the exercises.

**Example.**

A natural basis for the vector space of cubic polynomials \( \mathcal{P}_3 \)
is \( \langle 1,x,x^2,x^3 \rangle \).
Two other bases for this space are \( \langle x^3,3x^2,6x,6 \rangle \)
and \( \langle 1,1+x,1+x+x^2,1+x+x^2+x^3 \rangle \).
Checking that each is linearly independent and spans the space is easy.

**Example.**

The trivial space
$\{ \vec{0} \}$ has only one basis, the empty one
\( \langle  \rangle \).

**Example.**

The space of finite-degree polynomials has a basis with infinitely many
elements
\( \langle 1,x,x^2,\ldots \rangle \).

**Example.**

We have seen bases before.
In the first chapter we described the solution set of homogeneous systems
such as this one

$$
\begin{aligned}
  x + y - w = 0 \\
  z + w = 0
\end{aligned}
$$

by parametrizing.

$$
\{ \begin{pmatrix} -1 \\ 1 \\ 0 \\ 0 \end{pmatrix}y
       +\begin{pmatrix} 1 \\ 0 \\ -1 \\ 1 \end{pmatrix}w
       \mid y,w\in\mathbb{R}  \}
$$

Thus the vector space of solutions is
the span of a two-element set.
This two-vector set is also linearly independent, which is easy to check.
Therefore the solution set is a subspace of \( \mathbb{R}^4 \) with a
basis comprised of these two vectors.

**Example.**

Parametrization finds bases for other vector spaces, not just
for solution sets of homogeneous systems.
To find a basis for this subspace of $\mathcal{M}_{2 \times 2}$

$$
\{ \begin{pmatrix}
  a & b \\
  c & 0
\end{pmatrix} \mid a+b-2c=0 \}
$$

we rewrite the condition as $a=-b+2c$.

$$
\{ \begin{pmatrix}
  -b+2c & b \\
  c & 0
\end{pmatrix} \mid b,c \in \mathbb{R} \}
  =\{ b\begin{pmatrix}
  -1 & 1 \\
  0 & 0
\end{pmatrix}+
       c\begin{pmatrix}
  2 & 0 \\
  1 & 0
\end{pmatrix} \mid b,c \in \mathbb{R} \}
$$

Thus, this is a natural candidate for a basis.

$$
\langle \begin{pmatrix}
  -1 & 1 \\
  0 & 0
\end{pmatrix},
       \begin{pmatrix}
  2 & 0 \\
  1 & 0
\end{pmatrix}  \rangle
$$

The above work shows that it spans the space.
Linear independence is also easy.

Consider again the first basis example in R^2.

To verify that the set spans the space we
looked at linear combinations that total to a
member of the space
$c_1\vec{\beta}_1+c_2\vec{\beta}_2=\binom{x}{y}$.
We only noted in that example that such a combination
exists, that for each $x,y$ there exists a $c_1,c_2$, but
in fact the calculation also shows that the combination is
unique: $c_1$ must be $(y-x)/2$ and $c_2$ must be $2x-y$.

**Theorem.**

In any vector space, a subset is a basis
if and only if each vector in the
space can be expressed as a linear combination of elements of the subset
in one and only one way.

 We consider linear combinations to be the same if they have the
same summands but in a different order,
or if they differ only in the addition or deletion of terms of the form
"\( 0\cdot\vec{\beta} \)".

**Proof.**

A sequence is a basis if and only if its vectors form a set
that spans and that is linearly independent.
A subset is a spanning set if and only if each vector in the space is a linear
combination of elements of that subset in at least one way.
Thus we need only show
that a spanning subset is linearly independent
if and only if every vector in the space
is a linear combination of elements from the subset in at most one way.

Consider two expressions of a vector as a linear combination of the
members of the subset.
Rearrange the two sums, and if necessary
add some \( 0\cdot\vec{\beta}_i \) terms, so that the two sums
combine the same \( \vec{\beta} \)'s in the same order:
\( \vec{v}=c_1\vec{\beta}_1+\cdots+c_n\vec{\beta}_n \) and
\( \vec{v}=d_1\vec{\beta}_1+\cdots+d_n\vec{\beta}_n \).
Now

$$
c_1\vec{\beta}_1+\cdots+c_n\vec{\beta}_n=d_1\vec{\beta}_1+\cdots+d_n\vec{\beta}_n
$$

holds if and only if

$$
(c_1-d_1)\vec{\beta}_1+\dots+(c_n-d_n)\vec{\beta}_n=\vec{0}
$$

holds.
So, asserting that
each coefficient in the lower equation is zero is
the same thing as asserting that \( c_i=d_i \) for each \( i \),
that is, that every vector is expressible as a linear combination of
the \( \vec{\beta} \)'s in a unique way.

**Definition.**

In a vector space with basis $B$
the **representation of \( \vec{v} \) with respect to \( B \)**
 is
the column vector of the coefficients used to express $\vec{v}$ as a
linear combination of the basis vectors:

$$
Rep_{B}(\vec{v})
  =
  \begin{pmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{pmatrix}_{B}
$$

where
\( B=\langle \vec{\beta}_1,\dots,\vec{\beta}_n \rangle \) and
\( \vec{v}=c_1\vec{\beta}_1+\cdots+c_n\vec{\beta}_n \).
The \( c \)'s are the
**coordinates of \( \vec{v} \) with respect to \( B \)**
.

**Example.**

In \( \mathcal{P}_3 \), with respect to the basis
\( B=\langle 1,2x,2x^2,2x^3 \rangle \),
the representation of \( x+x^2 \) is

$$
Rep_{B}(x+x^2)=\begin{pmatrix} 0 \\ 1/2 \\ 1/2 \\ 0 \end{pmatrix}_B
$$

because $x+x^2=0\cdot 1+(1/2)\cdot 2x+(1/2)\cdot 2x^2+0\cdot 2x^3$.
With respect to a different basis \( D=\langle 1+x,1-x,x+x^2,x+x^3 \rangle \),
the representation is different.

$$
Rep_{D}(x+x^2)=\begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix}_D
$$

**Remark.**

The definition of a basis requires that a basis be a sequence
so that we can write these coordinates in an order.

When there is only one basis around, we often omit the subscript
naming that basis.

**Example.**

In \( \mathbb{R}^2 \), to find
the coordinates of the vector $\vec{v}=\binom{3}{2}$ with respect to the basis

$$
B=\langle
              \begin{pmatrix} 1 \\ 1 \end{pmatrix},
              \begin{pmatrix} 0 \\ 2 \end{pmatrix}  \rangle
$$

solve

$$
c_1\begin{pmatrix} 1 \\ 1 \end{pmatrix}
  +c_2\begin{pmatrix} 0 \\ 2 \end{pmatrix}
  =
  \begin{pmatrix} 3 \\ 2 \end{pmatrix}
$$

and get that $c_1=3$ and $c_2=-1/2$.

$$
Rep_{B}(\vec{v})=\begin{pmatrix} 3 \\ -1/2 \end{pmatrix}
$$

Writing the representation as a column
generalizes the familiar case: in \( \mathbb{R}^n \)
and with respect to the standard
basis \( \mathcal{E}_n \), the vector starting at the origin and ending at
\( (v_1,\dots,v_n) \) has this representation.

$$
Rep_{\mathcal{E}_n}(\begin{pmatrix} v_1 \\ \vdots \\ v_n \end{pmatrix})
    =
  \begin{pmatrix} v_1 \\ \vdots \\ v_n \end{pmatrix}_{\mathcal{E}_n}
$$

This is an example.

$$
Rep_{\mathcal{E}_{n}}(\begin{pmatrix} -1 \\ 1 \end{pmatrix})
  =\begin{pmatrix} -1 \\ 1 \end{pmatrix}
$$

**Remark.**

The $Rep_{B}(\vec{v})$ notation is not standard.
The most common notation is $[\vec{v}]_B$ but one advantage that
$Rep_{B}(\vec{v})$ has is that it is harder to misinterpret or overlook.

The column represents the vector in the sense that
a linear relationship holds among a set of vectors if and only if
that relationship holds among the set of representations.

**Lemma.**

Where $B$ is a basis with $n$ elements, for any set of vectors,
$a_1\vec{v}_1+\cdots+a_k\vec{v}_k=\vec{0}_{V}$ if and only if
$a_1Rep_{B}(\vec{v}_1)+\cdots+a_kRep_{B}(\vec{v}_k)=\vec{0}_{\mathbb{R}^n}$.

**Proof.**

Fix a basis \( B=\langle \vec{\beta}_1,\dots,\vec{\beta}_n \rangle \)
and suppose

$$
Rep_{B}(\vec{v}_1)=\begin{pmatrix} c_{1,1} \\ \vdots \\ c_{n,1} \end{pmatrix}
   \ldots
  Rep_{B}(\vec{v}_k)=\begin{pmatrix} c_{1,k} \\ \vdots \\ c_{n,k} \end{pmatrix}
$$

so that $\vec{v}_1=c_{1,1}\vec{\beta}_1+\dots+c_{n,1}\vec{\beta}_n$, etc.
Then $a_1\vec{v}_1+\dots+a_k\vec{v}_k=\vec{0}$ is equivalent to these.

$$
\vec{0}
  &=a_1\cdot(c_{1,1}\vec{\beta}_1+\dots+c_{n,1}\vec{\beta}_n)
    +\dots+
    a_k\cdot(c_{1,k}\vec{\beta}_1+\dots+c_{n,k}\vec{\beta}_n)  \\
  &=(a_1c_{1,1}+\dots+a_kc_{1,k})\cdot\vec{\beta}_1
    +\dots+
    (a_1c_{n,1}+\dots+a_kc_{n,k})\cdot\vec{\beta}_n
$$

Obviously the bottom equation is true if the coefficients are zero.
But, because \( B \) is a basis, the unique-representation theorem
says that the bottom equation is true if and only if the coefficients are zero.
So the relation is equivalent to this.

$$
a_1c_{1,1}+\dots+a_kc_{1,k} &=0    \\
                               &\vdots \\
    a_1c_{n,1}+\dots+a_kc_{n,k} &=0
$$

This is the equivalent recast into column vectors.

$$
a_1\begin{pmatrix} c_{1,1} \\ \vdots \\ c_{n,1} \end{pmatrix}
  +\dots+
  a_k\begin{pmatrix} c_{1,k} \\ \vdots \\ c_{n,k} \end{pmatrix}
  =\begin{pmatrix} 0 \\ \vdots \\ 0 \end{pmatrix}
$$

Note that not only does a relationship hold for one set if and only if it
holds for the other, but it is the same relationship— the
\( a_i \) are the same.

**Example.**

The polynomial-representation example finds the
representation of \( x+x^2\in\mathcal{P}_3 \) with respect to
\( B=\langle 1,2x,2x^2,2x^3 \rangle \).

$$
Rep_{B}(x+x^2)=\begin{pmatrix} 0 \\ 1/2 \\ 1/2 \\ 0 \end{pmatrix}_B
$$

This relationship

$$
2\cdot(x+x^2)-1\cdot(2x)-2\cdot(x^2) = 0+0x+0x^2+0x^3
$$

is represented by this one.

$$
2\cdot\mathrm{Rep}_{B}(x+x^2)-\mathrm{Rep}_{B}(2x)-2\cdot\mathrm{Rep}_{B}(x^2)
  =2\cdot\begin{pmatrix} 0 \\ 1/2 \\ 1/2 \\ 0 \end{pmatrix}
   -\begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}
   -2\cdot\begin{pmatrix} 0 \\ 0 \\ 1/2 \\ 0 \end{pmatrix}
  =\begin{pmatrix} 0 \\ 0 \\ 0 \\ 0 \end{pmatrix}
$$

Our main use of representations will come later but
the definition appears here because the fact that every vector is a linear
combination of basis vectors in a unique way is a crucial property of bases,
and also to help make a point.
For calculation of coordinates among other things, we shall
restrict our attention to spaces with bases having only finitely many elements.
That will start in the next subsection.
