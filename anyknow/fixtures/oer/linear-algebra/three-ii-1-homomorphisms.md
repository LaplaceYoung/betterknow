# Three.II.1 Homomorphisms (Linear Maps)

Title: Three.II.1 Homomorphisms (Linear Maps)
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

## Homomorphisms

The definition of isomorphism has two conditions.
In this section we will consider the second one.
We will study maps that
are required only to preserve structure,
maps that are not also required to be correspondences.

Experience shows that these maps are
tremendously useful.
For one thing we shall see in the second subsection below
that while isomorphisms describe how spaces are the same,
we can think of these maps as describing how spaces are alike.

### Definition

**Definition.**
A function between vector spaces \( h\colon V\to W \) that
preserves
addition

  if \( \vec{v}_1,\vec{v}_2\in V \) then
      \( h(\vec{v}_1+\vec{v}_2)=h(\vec{v}_1)+h(\vec{v}_2) \)

and scalar multiplication

      if \( \vec{v}\in V \) and \( r\in\mathbb{R} \) then
      \( h(r\cdot\vec{v})=r\cdot h(\vec{v}) \)

is a **homomorphism**

or **linear map**.

**Example.**
The projection
map \( \pi\colon \mathbb{R}^3\to \mathbb{R}^2 \)

$$
   \begin{pmatrix} x \\ y \\ z \end{pmatrix}
    \xrightarrow{\pi}
   \begin{pmatrix} x \\ y \end{pmatrix}
$$

is a homomorphism.
It preserves addition

$$
  \pi(\begin{pmatrix} x_1 \\ y_1 \\ z_1 \end{pmatrix}+\begin{pmatrix} x_2 \\ y_2 \\ z_2 \end{pmatrix})
  =
  \pi(\begin{pmatrix} x_1+x_2 \\ y_1+y_2 \\ z_1+z_2 \end{pmatrix})
  =
  \begin{pmatrix} x_1+x_2 \\ y_1+y_2 \end{pmatrix}
  =
  \pi(\begin{pmatrix} x_1 \\ y_1 \\ z_1 \end{pmatrix})
  +
  \pi(\begin{pmatrix} x_2 \\ y_2 \\ z_2 \end{pmatrix})
$$

and scalar multiplication.

$$
  \pi(r\cdot\begin{pmatrix} x_1 \\ y_1 \\ z_1 \end{pmatrix})
  =
  \pi(\begin{pmatrix} rx_1 \\ ry_1 \\ rz_1 \end{pmatrix})
  =
  \begin{pmatrix} rx_1 \\ ry_1 \end{pmatrix}
  =
  r\cdot\pi(\begin{pmatrix} x_1 \\ y_1 \\ z_1 \end{pmatrix})
$$

This is not an isomorphism since it is not one-to-one.
For instance, both $\vec{0}$ and $\vec{e}_3$ in $\mathbb{R}^3$ map to
the zero vector in $\mathbb{R}^2$.

**Example.**
The domain and codomain
can be other than spaces of column vectors.
Both of these are homomorphisms;
the verifications are straightforward.

- \( f_1\colon \mathcal{P}_2\to \mathcal{P}_3 \) given by

$$
      a_0+a_1x+a_2x^2  \mapsto  a_0x+(a_1/2)x^2+(a_2/3)x^3
$$

- \( f_2\colon M_{2 \times 2}\to \mathbb{R} \) given by

$$
      \begin{pmatrix} a &b \\ c &d \end{pmatrix}
        \mapsto
      a+d
$$

**Example.**
Between any two spaces there is a **zero homomorphism**,

mapping every vector in the domain to the zero vector in the codomain.

We shall use the two terms ‘homomorphism' and ‘linear map' interchangably.

**Example.**
These two suggest why we say ‘linear map'.

- The map \( g\colon \mathbb{R}^3\to \mathbb{R} \) given by

$$
      \begin{pmatrix} x \\ y \\ z \end{pmatrix}
        \xrightarrow{g}
      3x+2y-4.5z
$$

    is linear, that is, is a homomorphism.
    The check is easy.
    In contrast, the map \( \hat{g}\colon \mathbb{R}^3\to \mathbb{R} \) given by

$$
      \begin{pmatrix} x \\ y \\ z \end{pmatrix}
        \xrightarrow{\hat{g}}
      3x+2y-4.5z+1
$$

    is not linear.
    To show this we need only produce a single
    linear combination that the map does not preserve.
    Here is one.

$$
      \hat{g}(\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}+\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix})=4
      \hat{g}(\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix})
      +\hat{g}(\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix})=5
$$

- The first of these two maps
    \( t_1,t_2\colon \mathbb{R}^3\to \mathbb{R}^2 \)
    is linear while the second is not.

$$
      \begin{pmatrix} x \\ y \\ z \end{pmatrix}
        \xrightarrow{t_1}
      \begin{pmatrix} 5x-2y \\ x+y \end{pmatrix}
      \begin{pmatrix} x \\ y \\ z \end{pmatrix}
        \xrightarrow{t_2}
      \begin{pmatrix} 5x-2y \\ xy \end{pmatrix}
$$

    Finding a linear combination that the second map does not
    preserve is easy.

So one way to think of ‘homomorphism'
is that we are generalizing ‘isomorphism' (by dropping the condition that
the map is a correspondence),
motivated by the observation that many of the properties of
isomorphisms have only to do with the map's structure-preservation property.
The next two results are examples of this motivation.
In the prior section we saw a proof for each that only uses preservation of
addition and preservation of scalar multiplication,
and therefore applies to homomorphisms.

**Lemma.**
A linear map sends the zero vector to the zero vector.

**Lemma.**
The following are equivalent for any map
\( f\colon V\to W \)
between vector spaces.

- $f$ is a homomorphism

- $f(c_1\cdot\vec{v}_1+c_2\cdot\vec{v}_2)
      =c_1\cdot f(\vec{v}_1)+c_2\cdot f(\vec{v}_2)$
      for any \( c_1,c_2\in\mathbb{R} \) and \( \vec{v}_1,\vec{v}_2\in V \)

- $f(c_1\cdot\vec{v}_1+...+c_n\cdot\vec{v}_n)
    =c_1\cdot f(\vec{v}_1)+...+c_n\cdot f(\vec{v}_n)$
    for any \( c_1,...,c_n\in\mathbb{R} \) and
    \( \vec{v}_1,...,\vec{v}_n\in V \)

**Example.**
The function \( f\colon \mathbb{R}^2\to \mathbb{R}^4 \) given by

$$
  \begin{pmatrix} x \\ y \end{pmatrix}
    \xrightarrow{f}
  \begin{pmatrix} x/2 \\ 0 \\ x+y \\ 3y \end{pmatrix}
$$

is linear since it satisfies item (2).

$$
  \begin{pmatrix} r_1(x_1/2)+r_2(x_2/2) \\ 0 \\ r_1(x_1+y_1)+r_2(x_2+y_2) \\ r_1(3y_1)+r_2(3y_2) \end{pmatrix}
   =
  r_1\begin{pmatrix} x_1/2 \\ 0 \\ x_1+y_1 \\ 3y_1 \end{pmatrix}
   +
  r_2\begin{pmatrix} x_2/2 \\ 0 \\ x_2+y_2 \\ 3y_2 \end{pmatrix}
$$

However,
some things that hold for isomorphisms fail to hold for
homomorphisms.
One example is in the proof of Lemma I.\ref{lem:IsoImpliesSameDim},
which shows that an isomorphism between spaces gives
a correspondence between their bases.
Homomorphisms do not give any such correspondence;
the example shows this and another example is
the zero map between two nontrivial spaces.
Instead, for homomorphisms we have a weaker but still very useful result.

**Theorem.**
A homomorphism is determined by its action on a basis: if
$V$ is a vector space with basis
\( \langle \vec{\beta \rangle_1,...,\vec{\beta}_n} \),
if $W$ is a vector space, and if
\( \vec{w}_1,...,\vec{w}_n\in W \)
(these codomain elements need not be distinct) then
there exists a homomorphism from \( V \) to \( W \) sending each
\( \vec{\beta}_i \) to \( \vec{w}_i \), and that homomorphism is unique.

*Proof.*
For any input $\vec{v}\in V$ let its expression with
respect to the basis be
\( \vec{v}=c_1\vec{\beta}_1+...+c_n\vec{\beta}_n \).
Define
the associated output by using the same coordinates
$h(\vec{v})=c_1\vec{w}_1+...+c_n\vec{w}_n$.
This is well defined because, with respect to the basis,
the representation of each domain vector \( \vec{v} \) is unique.

This map is a homomorphism
because it preserves linear combinations:
where \( \vec{v_1}=c_1\vec{\beta}_1+\cdots+c_n\vec{\beta}_n \) and
\( \vec{v_2}=d_1\vec{\beta}_1+\cdots+d_n\vec{\beta}_n \), here
is the calculation.

$$
\begin{aligned}
  h(r_1\vec{v}_1+r_2\vec{v}_2)
  &=h( (r_1c_1+r_2d_1)\vec{\beta}_1+...+(r_1c_n+r_2d_n)\vec{\beta}_n )  \\
  &=(r_1c_1+r_2d_1)\vec{w}_1+...+(r_1c_n+r_2d_n)\vec{w}_n   \\
  &=r_1h(\vec{v}_1)+r_2h(\vec{v}_2)
\end{aligned}
$$

This map is unique because if \( \hat{h}\colon V\to W \)
is another homomorphism satisfying that \( \hat{h}(\vec{\beta}_i)=\vec{w}_i \)
for each \( i \)
then \( h \) and \( \hat{h} \) have the
same effect on all of the vectors in the domain.

$$
  \hat{h}(\vec{v})
  =\hat{h}(c_1\vec{\beta}_1+...+c_n\vec{\beta}_n)
  =c_1 \hat{h}(\vec{\beta}_1)+...+c_n \hat{h}(\vec{\beta}_n)  \\
  =c_1\vec{w}_1+...+c_n\vec{w}_n
  =h(\vec{v})
$$

They have the same action so they are the same function.

**Definition.**
Let $V$ and $W$ be vector spaces and
let
$B=\langle \vec{\beta \rangle_1,...,\vec{\beta}_n}$
be a basis for $V$.
A function defined on that basis $f\colon B\to W$
is **extended linearly**
to a function $\hat{f}\colon V\to W$ if
for all $\vec{v}\in V$ such that
$\vec{v}=c_1\vec{\beta}_1+\cdots+c_n\vec{\beta}_n$,
the action of the map is
$\hat{f}(\vec{v})=c_1\cdot f(\vec{\beta}_1)
  +\cdots+c_n\cdot f(\vec{\beta}_n)$.

**Example.**
If we specify a map \( h\colon \mathbb{R}^2\to \mathbb{R}^2 \)
that acts on the standard basis $\mathcal{E}_2$ in this way

$$
  h(\begin{pmatrix} 1 \\ 0 \end{pmatrix})=\begin{pmatrix} -1 \\ 1 \end{pmatrix}
  h(\begin{pmatrix} 0 \\ 1 \end{pmatrix})=\begin{pmatrix} -4 \\ 4 \end{pmatrix}
$$

then we have also specified the action of $h$ on any other member of the domain.
For instance,
the value of $h$ on this argument

$$
  h(\begin{pmatrix} 3 \\ -2 \end{pmatrix})=h(3\cdot \begin{pmatrix} 1 \\ 0 \end{pmatrix}-2\cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix})
                      =3\cdot h(\begin{pmatrix} 1 \\ 0 \end{pmatrix})-2\cdot h(\begin{pmatrix} 0 \\ 1 \end{pmatrix})
                      =\begin{pmatrix} 5 \\ -5 \end{pmatrix}
$$

is a direct consequence of the value of $h$ on the basis vectors.

Later in this chapter we shall develop a convenient scheme for computations
like this one, using matrices.

**Definition.**
A linear map from a space into itself \( t\colon V\to V \) is a
**linear transformation**.

**Remark.**
In this book we use ‘linear transformation' only in the case where
the codomain equals the domain.
Be aware that some sources instead use it as a synonym for ‘linear map'.
Still another synonym is ‘linear operator'.

**Example.**
The map on $\mathbb{R}^2$ that projects all vectors down to the $x$-axis
is a linear transformation.

$$
  \begin{pmatrix} x \\ y \end{pmatrix}\mapsto\begin{pmatrix} x \\ 0 \end{pmatrix}
$$

**Example.**
The derivative map \( d/dx\colon \mathcal{P}_n\to \mathcal{P}_n \)

$$
  a_0+a_1x+\cdots+a_nx^n
    \xrightarrow{d/dx}
  a_1+2a_2x+3a_3x^2+\cdots+na_nx^{n-1}
$$

is a linear transformation as this result from calculus shows:
\( d(c_1f+c_2g)/dx=c_1 (df/dx)+c_2 (dg/dx) \).

**Example.**
The matrix transpose operation

$$
  \begin{pmatrix} a &b \\ c &d \end{pmatrix}
   \mapsto
  \begin{pmatrix} a &c \\ b &d \end{pmatrix}
$$

is a linear transformation of \( \mathcal{M}_{2 \times 2} \).
(Transpose is one-to-one and onto and so is in fact
an automorphism.)

We finish this subsection about maps by recalling that
we can linearly combine maps.
For instance, for these maps from \( \mathbb{R}^2 \) to itself

$$
  \begin{pmatrix} x \\ y \end{pmatrix}
   \xrightarrow{f}
  \begin{pmatrix} 2x \\ 3x-2y \end{pmatrix}
   and
  \begin{pmatrix} x \\ y \end{pmatrix}
   \xrightarrow{g}
  \begin{pmatrix} 0 \\ 5x \end{pmatrix}
$$

the linear combination \( 5f-2g \) is also a transformation of $\mathbb{R}^2$.

$$
  \begin{pmatrix} x \\ y \end{pmatrix}
   \xrightarrow{5f-2g}
  \begin{pmatrix} 10x \\ 5x-10y \end{pmatrix}
$$

**Lemma.**
For vector spaces \( V \) and \( W \),
the set of linear functions from \( V \) to
\( W \) is itself a vector space, a subspace of the space of all functions
from \( V \) to \( W \).

 We denote the space of linear maps from $V$ to $W$ by
\( \mathcal{L}(V,W) \).

*Proof.*
This set is non-empty because it contains the zero homomorphism.
So to show that it is a subspace we need only check that it is
closed under the operations.
Let \( f,g\colon V\to W \) be linear.
Then the operation of function addition is preserved

$$
\begin{aligned}
   (f+g)(c_1\vec{v}_1+c_2\vec{v}_2)
   &=f(c_1\vec{v}_1+c_2\vec{v}_2) +
   g(c_1\vec{v}_1+c_2\vec{v}_2)       \\
   &=c_1f(\vec{v}_1)+c_2f(\vec{v}_2)
   +c_1g(\vec{v}_1)+c_2g(\vec{v}_2)   \\
   &=c_1\bigl(f+g\bigr)(\vec{v}_1)+c_2\bigl(f+g\bigr)(\vec{v}_2)
\end{aligned}
$$

as is the operation of scalar multiplication of a function.

$$
\begin{aligned}
   (r\cdot f)(c_1\vec{v}_1+c_2\vec{v}_2)
   &=r(c_1f(\vec{v}_1)+c_2f(\vec{v}_2))  \\
   &=c_1(r\cdot f)(\vec{v}_1)+c_2(r\cdot f)(\vec{v}_2)
\end{aligned}
$$

Hence \( \mathcal{L}(V,W) \) is a subspace.

We started this section by
defining ‘homomorphism' as a generalization of ‘isomorphism',
by isolating the structure preservation property.
Some of the points about isomorphisms carried over unchanged, while
we adapted others.

Note, however, that the idea of
‘homomorphism' is in no way somehow secondary to
that of ‘isomorphism'.
In the rest of this chapter we shall work mostly with homomorphisms.
This is
partly because any statement made about homomorphisms is automatically true
about isomorphisms but more because,
while the isomorphism concept is more natural,
our experience will show that the homomorphism concept
is more fruitful and more central to progress.
