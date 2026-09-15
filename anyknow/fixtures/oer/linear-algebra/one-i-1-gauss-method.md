# One.I.1 Gauss's Method

Title: One.I.1 Gauss's Method
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

# Linear Systems
## Solving Linear Systems

Systems of linear equations are common in science and mathematics.
These two examples from high school science
give a sense of how they arise.

The first example is from
Statics.
Suppose that we have three objects,
we know that one has a mass of 2 kg,
and we want to find the two unknown masses.
Experimentation with a meter stick produces these two balances.

  *(Figure omitted; see the source book.)*

  *(Figure omitted; see the source book.)*

For the masses to balance we must have that
the sum of moments on the left equals the sum of moments on
the right, where the moment of an object is its mass times its distance
from the balance point.
That gives a system of two linear equations.

$$
\begin{aligned}
      40h + 15c &= 100  \\
            25c &= 50+50h
\end{aligned}
$$

The second example
is from Chemistry.
We can mix, under controlled conditions, toluene $C_7H_8$ and
nitric acid $HNO_3$ to produce
trinitrotoluene $C_7H_5O_6N_3$
along with the byproduct water
(conditions have to be very well controlled— trinitrotoluene
is better known as TNT).
In what proportion should we mix them?
The number of atoms of each element present before the reaction

$$
    x  { C}_7{ H}_8\ +\ y { H}{ N}{ O}_3
     \longrightarrow
    z { C}_7{ H}_5{ O}_6{ N}_3\ +\ w { H}_2{ O}
$$

must equal the number present afterward.
Applying that in turn to the elements C, H, N, and O gives
this system.

$$
\begin{aligned}
      7x      &= 7z  \\
      8x +1y  &= 5z+2w  \\
      1y      &= 3z  \\
      3y      &= 6z+1w
\end{aligned}
$$

Both examples come down to solving a system of equations.
In each system, the equations involve only the first power of each variable.
This chapter shows how to solve any such system of equations.

### Gauss's Method

**Definition.**
A **linear combination** of
\( x_1 \), ..., \( x_n \) has the form

$$
   a_1x_1+a_2x_2+a_3x_3+\cdots+a_nx_n
$$

where the numbers \( a_1, ... ,a_n\in\mathbb{R} \) are the combination's
**coefficients**. A **linear equation**
in the variables $x_1$, ..., $x_n$
has the form
$a_1x_1+a_2x_2+a_3x_3+\cdots+a_nx_n=d$
where
\( d\in\mathbb{R} \) is the **constant**.

An \( n \)-tuple \( (s_1,s_2,... ,s_n)\in\mathbb{R}^n \) is a
**solution**
of, or **satisfies**, that equation if substituting the numbers
$s_1$, ..., $s_n$ for the variables
gives a true statement:
$a_1s_1+a_2s_2+\cdots+a_ns_n=d$.
A **system of linear equations**

$$
\begin{aligned}
  a_{1,1}x_1 + a_{1,2}x_2 + \cdots + a_{1,n}x_n = d_1 \\
  a_{2,1}x_1 + a_{2,2}x_2 + \cdots + a_{2,n}x_n = d_2 \\
  \vdots \\
  a_{m,1}x_1 + a_{m,2}x_2 + \cdots + a_{m,n}x_n = d_m
\end{aligned}
$$

has the solution
\( (s_1,s_2,... ,s_n) \) if that $n$-tuple is a solution of all
of the equations.

**Example.**
The combination \( 3x_1 + 2x_2 \) of $x_1$ and $x_2$ is linear.
The combination \( 3x_1^2 + 2x_2 \) is not a linear function of
$x_1$ and $x_2$, nor is \( 3x_1 + 2\sin(x_2) \).

We usually take $x_1$, ..., $x_n$ to be unequal to each other because
in a sum with repeats we can rearrange to
make the elements unique, as with $2x+3y+4x=6x+3y$.
We sometimes include terms with a zero coefficient, as in
$x-2y+0z$, and at other times omit them, depending on what is convenient.

**Example.**
The ordered pair \( (-1,5) \) is a solution of this system.

$$
\begin{aligned}
  3x_1 + 2x_2 = 7 \\
  -x_1 + x_2 = 6
\end{aligned}
$$

In contrast, \( (5,-1) \) is not a solution.

Finding the set of all solutions is
**solving**
the system.
We don't need guesswork or good luck;
there is an algorithm that always works.
This algorithm is
**Gauss's Method**

(or **Gaussian elimination**

or **linear elimination**

).

**Example.**
To solve this system

$$
\begin{aligned}
  3x_3 = 9 \\
  x_1 + 5x_2 - 2x_3 = 2 \\
  \frac{1}{3}x_1 + 2x_2 = 3
\end{aligned}
$$

we transform it, step by step, until it is in a form that
we can easily solve.

The first transformation
rewrites the system by interchanging the first and third row.

$$
\begin{aligned}
  &\xrightarrow{ swap row 1 with row 3 }
\begin{aligned}
  \frac{1}{3}x_1 + 2x_2 = 3 \\
  x_1 + 5x_2 - 2x_3 = 2 \\
  3x_3 = 9
\end{aligned}
\end{aligned}
$$

The second transformation rescales the first row by a factor of $3$.

$$
\begin{aligned}
  &\xrightarrow{ multiply row 1 by 3 }
\begin{aligned}
  x_1 + 6x_2 = 9 \\
  x_1 + 5x_2 - 2x_3 = 2 \\
  3x_3 = 9
\end{aligned}
\end{aligned}
$$

The third transformation is the only nontrivial one in this example.
We mentally multiply both sides of the first row by \( -1 \),
mentally add that to the second row,
and write the result in as the new second row.

$$
\begin{aligned}
  &\xrightarrow{ add \(-1\) times row 1 to row 2 }
\begin{aligned}
  x_1 + 6x_2 = 9 \\
  -x_2 - 2x_3 = -7 \\
  3x_3 = 9
\end{aligned}
\end{aligned}
$$

These steps have brought the system to a
form where we can easily find the value of each variable.
The bottom equation shows that \( x_3=3 \).
Substituting $3$ for \( x_3 \) in the middle equation shows that \( x_2=1 \).
Substituting those two into the top equation
gives that \( x_1=3 \).
Thus the system has a unique solution;
the solution set is \{(3,1,3)\}.

We will use Gauss's Method throughout the book.
It is fast and easy.
We will now show that
it is also safe:
Gauss's Method never loses solutions nor does it ever
pick up extraneous solutions, so that
a tuple is a solution to the system before we apply the method if and only if
it is a solution after.

**Theorem (Gauss's Method).**

If a linear system is changed to another by one of these operations

- an equation is swapped with another

- an equation has both sides multiplied by a nonzero constant

- an equation is replaced by the sum of itself and a multiple of another

then the two systems have the same set of solutions.

Each of the three operations has a restriction.
Multiplying a row by \( 0 \) is not allowed because obviously that
can change the solution set.
Similarly, adding a multiple of a row to itself is not allowed because
adding \( -1 \) times the row to itself has the effect of multiplying the row
by \( 0 \).
And we disallow swapping a row with itself,
to make some results in the fourth chapter easier.
Besides, it's pointless.

*Proof.*
We will cover the equation swap operation here.
The other two
cases are similar and are an exercise.

Consider a linear system.

$$
\begin{aligned}
  a_{1,1}x_1 + a_{1,2}x_2 + \cdots + a_{1,n}x_n = d_1 \\
  \vdots \\
  a_{i,1}x_1 + a_{i,2}x_2 + \cdots + a_{i,n}x_n = d_i \\
  \vdots \\
  a_{j,1}x_1 + a_{j,2}x_2 + \cdots + a_{j,n}x_n = d_j \\
  \vdots \\
  a_{m,1}x_1 + a_{m,2}x_2 + \cdots + a_{m,n}x_n = d_m
\end{aligned}
$$

The tuple \( (s_1,... ,s_n) \)
satisfies this system
if and only if substituting the values for the
variables, the $s$'s for the $x$'s, gives a conjunction of true statements:
$a_{1,1}s_1+a_{1,2}s_2+\cdots+a_{1,n}s_n=d_1$
and ...
$a_{i,1}s_1+a_{i,2}s_2+\cdots+a_{i,n}s_n=d_i$
and ...  $a_{j,1}s_1+a_{j,2}s_2+\cdots+a_{j,n}s_n=d_j$
and ...  $a_{m,1}s_1+a_{m,2}s_2+\cdots+a_{m,n}s_n=d_m$.

In a list of statements joined with ‘and' we can
rearrange the order of the statements.
Thus
this requirement is met if and only if
$a_{1,1}s_1+a_{1,2}s_2+\cdots+a_{1,n}s_n=d_1$
and ...  $a_{j,1}s_1+a_{j,2}s_2+\cdots+a_{j,n}s_n=d_j$
and ...  $a_{i,1}s_1+a_{i,2}s_2+\cdots+a_{i,n}s_n=d_i$
and ...  $a_{m,1}s_1+a_{m,2}s_2+\cdots+a_{m,n}s_n=d_m$.
This is exactly the requirement that \( (s_1,... ,s_n) \)
solves the system after the row swap.

**Definition.**
The three operations from
the theorem
are the
**elementary reduction operations**,

or **row operations**, or **Gaussian operations**.
They are
**swapping**
,
**multiplying by a scalar** (or
**rescaling**
), and
**row combination**
.

When writing out the calculations, we will
abbreviate ‘row \(i\)' by ‘\( \rho_i \)'
(this is the Greek letter rho, pronounced aloud as “row”).
For instance, we will denote a row combination operation by
\( k\rho_i+\rho_j \),
with the row that changes written second.
To save writing we will
often combine addition steps when they use the same $\rho_i$, as in the
next example.

**Example.**
Gauss's Method systematically applies the row operations to solve a system.
Here is a typical case.

$$
\begin{aligned}
  x + y = 0 \\
  2x - y + 3z = 3 \\
  x - 2y - z = 3
\end{aligned}
$$

We begin by using the first row to
eliminate the $2x$ in the second row and the $x$ in the third.
To get rid of the $2x$ we mentally multiply the entire first row by $-2$,
add that to the
second row, and write the result in as the new second row.
To eliminate the $x$ in the third row we multiply the first row by
$-1$, add that to the third row, and write the result in as the
new third row.

$$
\begin{aligned}
  &\xrightarrow{-2\rho_1 +\rho_2}
\begin{aligned}
  x + y = 0 \\
  -3y + 3z = 3 \\
  -3y - z = 3
\end{aligned}
\end{aligned}
$$

We finish by transforming the second system into a third, where the
bottom equation involves only one unknown.
We do that by using
the second row to eliminate the $y$ term from the third row.

$$
  \xrightarrow{-\rho_2 +\rho_3}
\begin{aligned}
  x + y = 0 \\
  -3y + 3z = 3 \\
  -4z = 0
\end{aligned}
$$

Now finding the system's solution is easy.
The third row gives \( z=0 \).
Substitute that back

into the second row to get \( y=-1 \).
Then substitute back into the first row to get \( x=1 \).

**Example.**
For the Physics problem from the start of this
chapter, Gauss's Method gives this.

$$
\begin{aligned}
  40h + 15c = 100 \\
  -50h + 25c = 50
\end{aligned}
   \xrightarrow{5/4\rho_1 +\rho_2}
\begin{aligned}
  40h + 15c = 100 \\
  (175/4)c = 175
\end{aligned}
$$

So \( c=4 \), and back-substitution gives that \( h=1 \).
(We will solve the Chemistry problem later.)

**Example.**
The reduction

$$
\begin{aligned}
\begin{aligned}
  x + y + z = 9 \\
  2x + 4y - 3z = 1 \\
  3x + 6y - 5z = 0
\end{aligned}
   &\xrightarrow{-2\rho_1 +\rho_2}
\begin{aligned}
  x + y + z = 9 \\
  2y - 5z = -17 \\
  3y - 8z = -27
\end{aligned}
                                    \\
   &\xrightarrow{-(3/2)\rho_2+\rho_3}
\begin{aligned}
  x + y + z = 9 \\
  2y - 5z = -17 \\
  -(1/2)z = -(3/2)
\end{aligned}
\end{aligned}
$$

shows that \( z=3 \), \( y=-1 \), and \( x=7 \).

As illustrated above, the point of Gauss's Method
is to use the elementary reduction
operations to set up back-substitution.

**Definition.**
In each row of a system,
the first variable with a nonzero coefficient is the row's
**leading variable**
.
A system is in **echelon form**
if each leading variable
is to the right of the leading variable in the row above it,
except for the leading variable in the first row,
and any rows with all-zero coefficients are at the bottom.

**Example.**
The prior three examples only used the operation of row combination.
This linear system requires the swap operation
to get it into echelon form because
after the first combination

$$
\begin{aligned}
\begin{aligned}
  x - y = 0 \\
  2x - 2y + z + 2w = 4 \\
  y + w = 0 \\
  2z + w = 5
\end{aligned}
   &\xrightarrow{-2\rho_1 +\rho_2}
\begin{aligned}
  x - y = 0 \\
  z + 2w = 4 \\
  y + w = 0 \\
  2z + w = 5
\end{aligned}
\end{aligned}
$$

the second equation has no leading $y$.
We exchange it for a lower-down row that has a leading $y$.

$$
\begin{aligned}
   &\xrightarrow{\rho_2 \leftrightarrow\rho_3}
\begin{aligned}
  x - y = 0 \\
  y + w = 0 \\
  z + 2w = 4 \\
  2z + w = 5
\end{aligned}
\end{aligned}
$$

(Had there been more than one suitable row below the second
then we could have used any one.)
With that, Gauss's Method proceeds as before.

$$
\begin{aligned}
   &\xrightarrow{-2\rho_3 +\rho_4}
\begin{aligned}
  x - y = 0 \\
  y + w = 0 \\
  z + 2w = 4 \\
  -3w = -3
\end{aligned}
\end{aligned}
$$

Back-substitution gives \( w=1 \), \( z=2 \) , \( y=-1 \), and \( x=-1 \).

Strictly speaking, to solve linear systems we don't need
the row rescaling operation.
We have introduced it here because it is convenient and because we will use it
later in this chapter as part of a variation of Gauss's Method,
the Gauss-Jordan Method.

All of the systems so far have the same number of equations as unknowns.
All of them have a solution and for all of them there is only one solution.
We finish this subsection by seeing
other things that can happen.

**Example.**
This system
has more equations than variables.

$$
\begin{aligned}
  x + 3y = 1 \\
  2x + y = -3 \\
  2x + 2y = -2
\end{aligned}
$$

Gauss's Method helps us understand this system also, since this

$$
\begin{aligned}
    &\xrightarrow{-2\rho_1 +\rho_2}
\begin{aligned}
  x + 3y = 1 \\
  -5y = -5 \\
  -4y = -4
\end{aligned}
\end{aligned}
$$

shows that one of the equations is redundant.
Echelon form

$$
    \xrightarrow{-(4/5)\rho_2 +\rho_3}
\begin{aligned}
  x + 3y = 1 \\
  -5y = -5 \\
  0 = 0
\end{aligned}
$$

gives that \( y=1 \) and \( x=-2 \).
The ‘\( 0=0 \)' reflects the redundancy.

Gauss's Method is also useful on systems with more variables than equations.
The next subsection has many examples.

Another way that linear systems can differ from the examples shown above
is that some linear systems do not have a unique solution.
This can happen in two ways.
The first is that a system can fail to have any solution at all.

**Example.**
Contrast the system in the last example with this one.

$$
\begin{aligned}
  x + 3y = 1 \\
  2x + y = -3 \\
  2x + 2y = 0
\end{aligned}
    \xrightarrow{-2\rho_1 +\rho_2}
\begin{aligned}
  x + 3y = 1 \\
  -5y = -5 \\
  -4y = -2
\end{aligned}
$$

Here the system is inconsistent: no pair of numbers $(s_1,s_2)$ satisfies
all three equations simultaneously.
Echelon form makes the inconsistency obvious.

$$
  \xrightarrow{-(4/5)\rho_2 +\rho_3}
\begin{aligned}
  x + 3y = 1 \\
  -5y = -5 \\
  0 = 2
\end{aligned}
$$

The solution set is empty.

**Example.**
The prior system has more equations than unknowns but
that is not what causes the inconsistency—
the example
has more equations than unknowns and yet is consistent.
Nor is having more equations than unknowns necessary for
inconsistency, as we see with this inconsistent system that has the
same number of equations as unknowns.

$$
\begin{aligned}
  x + 2y = 8 \\
  2x + 4y = 8
\end{aligned}
  \xrightarrow{-2\rho_1 + \rho_2}
\begin{aligned}
  x + 2y = 8 \\
  0 = -8
\end{aligned}
$$

Instead,
inconsistency has to do with the interaction of the left and right sides;
in the first system above the left side's second equation is twice the
first but the right side's second constant is not twice the first.
Later we will have more to say about dependencies between a system's
parts.

The other way that
a linear system can fail to have a unique solution, besides having no solutions,
is to have many solutions.

**Example.**
In this system

$$
\begin{aligned}
  x + y = 4 \\
  2x + 2y = 8
\end{aligned}
$$

any pair of numbers satisfying the first equation also
satisfies the second.
The solution set
\( \{ (x,y)\mid x+y=4\} \)
is infinite; some example
member pairs are $(0,4)$, $(-1,5)$, and $(2.5,1.5)$.

The result of applying Gauss's Method here contrasts with the prior example
because we do not get a contradictory equation.

$$
  \xrightarrow{-2\rho_1 + \rho_2}
\begin{aligned}
  x + y = 4 \\
  0 = 0
\end{aligned}
$$

Don't be fooled by that example: a $0=0$ equation
is not the signal that a system has many solutions.

**Example.**
The absence of a \( 0=0 \) equation does not keep a system from having
many different solutions.
This system is in echelon form,
has no $0=0$, but has infinitely many solutions,
including $(0,1,-1)$,
$(0,1/2,-1/2)$, $(0,0,0)$, and $(0,-\pi,\pi)$
(any triple whose first component is $0$ and whose second component is the
negative of the third is a solution).

$$
\begin{aligned}
  x + y + z = 0 \\
  y + z = 0
\end{aligned}
$$

Nor does the presence of \( 0=0 \) mean that the system must have
many solutions.
the example shows that.
So does this system, which does not have
any solutions at all despite that
in echelon form it has a $0=0$ row.

$$
\begin{aligned}
\begin{aligned}
  2x - 2z = 6 \\
  y + z = 1 \\
  2x + y - z = 7 \\
  3y + 3z = 0
\end{aligned}
  &\xrightarrow{-\rho_1 +\rho_3}
\begin{aligned}
  2x - 2z = 6 \\
  y + z = 1 \\
  y + z = 1 \\
  3y + 3z = 0
\end{aligned}
                                    \\
  &\xrightarrow{-\rho_2 +\rho_3}
\begin{aligned}
  2x - 2z = 6 \\
  y + z = 1 \\
  0 = 0 \\
  0 = -3
\end{aligned}
\end{aligned}
$$

In summary,
Gauss's Method uses the row operations to
set a system up for back substitution.
If any step shows a contradictory equation then we can stop with the
conclusion that the system has no solutions.
If we reach echelon form without a contradictory equation,
and each variable is a leading variable in its
row, then the system has a unique solution and we find it by
back substitution.
Finally, if we reach echelon form without a contradictory equation,
and there is not a unique solution—
that is, at least one variable is not a leading variable—
then the system has many solutions.

The next subsection explores the third case.
We will see that such a system must have infinitely many solutions
and we will describe the
solution set.

**Note.**
*In the exercises here, and in the rest of the book,
you must justify all of your answers.
For instance, if a question asks whether a system has a solution then you
must justify a yes response by producing the solution and must justify
a no response by showing that no solution exists.*
