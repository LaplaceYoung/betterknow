# One.I.1 Exercises: Gauss's Method

Title: One.I.1 Exercises: Gauss's Method
Book: Linear Algebra (4th edition)
Authors: Jim Hefferon
Publisher: Orthogonal Publishing L3C / University of Vermont
License: Creative Commons Attribution-ShareAlike 3.0 United States (CC BY-SA 3.0 US)
License URL: https://creativecommons.org/licenses/by-sa/3.0/us/
Source: https://hefferon.net/linearalgebra/
Course-aliases: 线性代数, Linear Algebra
Extract: Selected exercises from Jim Hefferon, Linear Algebra, section One.I.1 (Gauss's Method). Worked answers omitted; see the source book.
This extract is not for training large language models.

---

## Exercises

Selected problems. Justify every answer.

**Exercise.** Use Gauss's Method to find the unique solution for each system.

- 
```
2x + 3y = 13
x - y = -1
```

- $    x - z = 0
    3x + y = 1
    -x + y + z = 4
$

**Exercise.** Each system is in echelon form.
    For each, say whether the system has a unique solution,
    no solution, or infinitely many solutions.

- $    -3x + 2y = 0
    -2y = 0
$

- $    x + y = 4
    y - z = 0
$

- $    x + y = 4
    y -z = 0
    0 = 0
$

- $    x + y = 4
    0 = 4
$

- $    3x + 6y + z = -0.5
    -z = 2.5
$

- $    x - 3y = 2
    0 = 0
$

- $    2x + 2y = 4
    y = 1
    0 = 4
$

- $    2x + y = 0
$

- $    x - y = -1
    0 = 0
    0 = 4
$

- $    x + y - 3z = -1
    y - z = 2
    z = 0
    0 = 0
$

**Exercise.** Use Gauss's Method to solve each system
    or conclude `many solutions' or `no solutions'.

- $
                   2x + 2y = 5
    x - 4y = 0

             $

- $
                   -x + y = 1
    x + y = 2

             $

- $
                   x - 3y + z = 1
    x + y + 2z = 14

             $

- $
                   -x - y = 1
    -3x - 3y = 2

             $

- $
                   4y + z = 20
    2x - 2y + z = 0
    x + z = 5
    x + y - z = 10

             $

- $     2x + z + w = 5
    y - w = -1
    3x - z - w = 0
    4x + y + 2z + w = 9

            $

**Exercise.** Solve each system
    or conclude `many solutions' or `no solutions'.
    Use Gauss's Method.

- $
                   x + y + z = 5
    x - y = 0
    y + 2z = 7

             $

- $
                   3x + z = 7
    x - y + 3z = 4
    x + 2y - 5z = -1

             $

- $
                   x + 3y + z = 0
    -x - y = 2
    -x + y + 2z = 8

             $

**Exercise.** We can solve linear systems by methods other
    than Gauss's.
    One often taught in high school is to solve one of the
    equations for a variable, then substitute the resulting expression into
    other equations.
    Then we repeat that step until there is an equation with only one
    variable.
    From that we get the first number in the solution and then we get the
    rest with
    back-substitution.
    This method takes longer than Gauss's Method, since it involves
    more arithmetic operations, and is also more
    likely to lead to errors.
    To illustrate how it can lead to wrong conclusions, we will use the system
    \begin{equation*}
          x + 3y = 1
    2x + y = -3
    2x + 2y = 0

    \end{equation*}
    from \nearbyexample{ex:MoreEqsThanUnksInconsis}.

- Solve the first equation for $x$ and
        substitute that expression into the second equation.
        Find the resulting $y$.

- Again solve the first equation for $x$,
        but this time substitute that expression into the third equation.
        Find this $y$.

    What extra step must a user of this method take to avoid
    erroneously concluding a system has a solution?

**Exercise.** For which values of $ k $ are
    there no solutions, many solutions, or a unique solution
    to this system?
    \begin{equation*}
           x - y = 1
    3x - 3y = k

    \end{equation*}

**Exercise.** This system is not linear in that it says $\sin\alpha$ instead of $\alpha$
    \begin{equation*}
          2\sin\alpha - \cos\beta + 3\tan\gamma = 3
    4\sin\alpha + 2\cos\beta - 2\tan\gamma = 10
    6\sin\alpha - 3\cos\beta + \tan\gamma = 9

    \end{equation*}
    and yet we can apply Gauss's Method.
    Do so.
    Does the system have a solution?

**Exercise.** What conditions must the constants, the $b$'s,
    satisfy so that each of these systems has a solution?
    *Hint.*
    Apply Gauss's Method and see what happens to the right side.

- $
            x - 3y = b_1
    3x + y = b_2
    x + 7y = b_3
    2x + 4y = b_4
   $

- $
            x_1 + 2x_2 + 3x_3 = b_1
    2x_1 + 5x_2 + 3x_3 = b_2
    x_1 + 8x_3 = b_3
   $

**Exercise.** True or false: a system with more unknowns than equations
    has at least one solution.
    (As always, to say `true' you must prove it, while to say
    `false' you must produce a counterexample.)

**Exercise.** Must any Chemistry problem like
    the one that starts this subsection\Dash
    a balance the reaction problem\Dash have infinitely many solutions?

**Exercise.** Find the coefficients
    $ a $, $ b $, and $ c $ so that the graph of $ f(x)=ax^2+bx+c $
    passes through the points $ (1,2) $, $ (-1,6) $, and $ (2,3) $.

**Exercise.** After \nearbytheorem{th:GaussMethod} we note that multiplying a
   row by~$0$ is not allowed because that could change a solution set.
   Give an example of a system with solution set~$S_0$ where after
   multiplying a row by~$0$ the new system has a solution set~$S_1$
   and $S_0$ is a proper subset of $S_1$, that is, $S_0\neq S_1$.
   Give an example where $S_0=S_1$.

**Exercise.** Gauss's Method works by combining the equations in a system to make new
    equations.

- Can we derive the equation $ 3x-2y=5 $ by a sequence of
        Gaussian reduction steps from the equations in this system?
        \begin{equation*}
              x + y = 1
    4x - y = 6

        \end{equation*}

- Can we derive the equation $ 5x-3y=2 $ with a sequence of
        Gaussian reduction steps from the equations in this system?
        \begin{equation*}
              2x + 2y = 5
    3x + y = 4

        \end{equation*}

- Can we derive $ 6x-9y+5z=-2 $
        by a sequence of
        Gaussian reduction steps from the equations in the system?
        \begin{equation*}
              2x + y - z = 4
    6x - 3y + z = 5

        \end{equation*}

**Exercise.** Prove that, where $ a,b,c,d,e $ are real numbers
    with $ a\neq 0 $, if this linear equation
    \begin{equation*}
       ax+by=c
    \end{equation*}
    has the same solution set as this one
    \begin{equation*}
       ax+dy=e
    \end{equation*}
    then they are the same equation.
    What if $ a=0 $?

**Exercise.** Show that if $ ad-bc\neq 0 $ then
    \begin{equation*}
          ax + by = j
    cx + dy = k

    \end{equation*}
    has a unique solution.

**Exercise.** In the system
    \begin{equation*}
          ax + by = c
    dx + ey = f

    \end{equation*}
    each of the equations describes a line in the $ xy $-plane.
    By geometrical reasoning, show that there are three possibilities:
    there is a unique solution, there is no solution,
    and there are infinitely many solutions.

**Exercise.** Finish the proof of \nearbytheorem{th:GaussMethod}.

**Exercise.** Is there a two-unknowns
    linear system whose solution set is all of $ \Re^2 $?

**Exercise.** Are any of the operations used in Gauss's Method
    redundant?
    That is, can we make any of the operations from a combination
    of the others?

**Exercise.** Prove that each operation of Gauss's Method is reversible.
    That is, show that if two systems are related by a row operation
    $S_1\rightarrow S_2$ then there is a row operation to go back
    $S_2\rightarrow S_1$.

  \puzzle
**Exercise.** \cite{Anton}
    A box holding pennies, nickels and dimes contains
    thirteen coins with a total value of $ 83 $ cents.
    How many coins of each type are in the box?
    (These are US coins;
    a penny is $1$~cent, a nickel is $5$~cents, and
    a dime is $10$~cents.)

  \puzzle
**Exercise.** \cite{ContestProb1955no38}
    Four positive integers are given.
    Select any three of the integers, find their arithmetic average,
    and add this result to the fourth integer.
    Thus the numbers 29, 23, 21, and 17 are obtained.
    One of the original integers is:

- 19

- 21

- 23

- 29

- 17

  \puzzle
**Exercise.** \cite{Monthly35p47}
      Laugh at this:  $ \mbox{AHAHA}+\mbox{TEHE}=\mbox{TEHAW} $.
      It resulted from substituting a code letter for each digit of a simple
      example in addition, and it is required to identify the letters
      and prove the solution unique.

  \puzzle
**Exercise.** \cite{Wohascum2}
     The Wohascum County Board of Commissioners, which has 20 members,
     recently had to elect a President.
     There were three candidates ($A$, $B$, and $C$); on each ballot
     the three
     candidates were to be listed in order of preference, with no abstentions.
     It was found that 11 members, a majority, preferred $A$ over $B$
     (thus the other 9 preferred $B$ over $A$).
     Similarly, it was found that 12 members preferred $C$ over $A$.
     Given these results, it was suggested that $B$ should withdraw, to enable
     a runoff election between $A$ and $C$.
     However, $B$ protested, and it was then found that 14 members preferred
     $B$ over $C$!
     The Board has not yet recovered from the resulting confusion.
     Given that every possible order of $A$, $B$, $C$ appeared on at least
     one ballot, how many members voted for $B$ as their first choice?

  \puzzle
**Exercise.** \cite{Monthly63p93}
    ``This system
     of $ n $ linear equations with
     $ n $ unknowns,'' said the Great Mathematician, ``has a curious
     property.''

     ``Good heavens!'' said the Poor Nut,  ``What is it?''

     ``Note,'' said the Great Mathematician, ``that the constants are in
     arithmetic progression.''

     ``It's all so clear when you explain it!'' said the Poor Nut.
     ``Do you mean like $ 6x+9y=12 $ and $ 15x+18y=21 $?''

     ``Quite so,'' said the Great Mathematician, pulling out his bassoon.
     ``Indeed, the system has a unique solution.
     Can you find it?''

     ``Good heavens!'' cried the Poor Nut, ``I am baffled.''

     Are you?
