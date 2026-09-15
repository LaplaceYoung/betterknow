# 3.1 Terminology

Title: 3.1 Terminology
Book: Introductory Statistics
Authors: Barbara Illowsky, Susan Dean
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/introductory-statistics/pages/3-1-terminology
Access for free at: https://openstax.org/books/introductory-statistics/pages/1-introduction
Course-aliases: 概率统计, 概率论与数理统计, Statistics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 3.1 Terminology

Probability is a measure that is associated with how certain we are of outcomes of a particular experiment or activity. An experiment is a planned operation carried out under controlled conditions. If the result is not predetermined, then the experiment is said to be a **chance** experiment. Flipping one fair coin twice is an example of an experiment.

A result of an experiment is called an outcome. The sample space of an experiment is the set of all possible outcomes. Three ways to represent a sample space are: to list the possible outcomes, to create a tree diagram, or to create a Venn diagram. The uppercase letter *S* is used to denote the sample space. For example, if you flip one fair coin, *S* = {*H*, *T*} where *H* = heads and *T* = tails are the outcomes.

An event is any combination of outcomes. Upper case letters like *A* and *B* represent events. For example, if the experiment is to flip one fair coin, event *A* might be getting at most one head. The probability of an event *A* is written *P*(*A*).

The probability of any outcome is the long-term relative frequency of that outcome. **Probabilities are between zero and one, inclusive** (that is, zero and one and all numbers between these values). *P*(*A*) = 0 means the event *A* can never happen. *P*(*A*) = 1 means the event *A* always happens. *P*(*A*) = 0.5 means the event *A* is equally likely to occur or not to occur. For example, if you flip one fair coin repeatedly (from 20 to 2,000 to 20,000 times) the relative frequency of heads approaches 0.5 (the probability of heads).

Equally likely means that each outcome of an experiment occurs with equal probability. For example, if you toss a fair, six-sided die, each face (1, 2, 3, 4, 5, or 6) is as likely to occur as any other face. If you toss a fair coin, a Head (*H*) and a Tail (*T*) are equally likely to occur. If you randomly guess the answer to a true/false question on an exam, you are equally likely to select a correct answer or an incorrect answer.

**To calculate the probability of an event *A* when all outcomes in the sample space are equally likely**, count the number of outcomes for event *A* and divide by the total number of outcomes in the sample space. For example, if you toss a fair dime and a fair nickel, the sample space is {*HH*, *TH*, *HT*, *TT*} where *T* = tails and *H* = heads. The sample space has four outcomes. *A* = getting one head. There are two outcomes that meet this condition {*HT*, *TH*}, so *P*(*A*) = $\frac{2}{4}$ = 0.5.

Suppose you roll one fair six-sided die, with the numbers {1, 2, 3, 4, 5, 6} on its faces. Let event *E* = rolling a number that is at least five. There are two outcomes {5, 6}. *P*(*E*) = $\frac{2}{6}$. If you were to roll the die only a few times, you would not be surprised if your observed results did not match the probability. If you were to roll the die a very large number of times, you would expect that, overall, $\frac{2}{6}$ of the rolls would result in an outcome of "at least five". You would not expect exactly $\frac{2}{6}$. The long-term relative frequency of obtaining this result would approach the theoretical probability of $\frac{2}{6}$ as the number of repetitions grows larger and larger.

This important characteristic of probability experiments is known as the law of large numbers which states that as the number of repetitions of an experiment is increased, the relative frequency obtained in the experiment tends to become closer and closer to the theoretical probability. Even though the outcomes do not happen according to any set pattern or order, overall, the long-term observed relative frequency will approach the theoretical probability. (The word **empirical** is often used instead of the word observed.)

It is important to realize that in many situations, the outcomes are not equally likely. A coin or die may be unfair, or **biased**. Two math professors in Europe had their statistics students test the Belgian one Euro coin and discovered that in 250 trials, a head was obtained 56% of the time and a tail was obtained 44% of the time. The data seem to show that the coin is not a fair coin; more repetitions would be helpful to draw a more accurate conclusion about such bias. Some dice may be biased. Look at the dice in a game you have at home; the spots on each face are usually small holes carved out and then painted to make the spots visible. Your dice may or may not be biased; it is possible that the outcomes may be affected by the slight weight differences due to the different numbers of holes in the faces. Gambling casinos make a lot of money depending on outcomes from rolling dice, so casino dice are made differently to eliminate bias. Casino dice have flat faces; the holes are completely filled with paint having the same density as the material that the dice are made out of so that each face is equally likely to occur. Later we will learn techniques to use to work with probabilities for events that are not equally likely.\
\

"OR" Event:An outcome is in the event *A* OR *B* if the outcome is in *A* or is in *B* or is in both *A* and *B*. For example, let *A* = {1, 2, 3, 4, 5} and *B* = {4, 5, 6, 7, 8}. *A* OR *B* = {1, 2, 3, 4, 5, 6, 7, 8}. Notice that 4 and 5 are NOT listed twice.\
\

"AND" Event:An outcome is in the event *A* AND *B* if the outcome is in both *A* and *B* at the same time. For example, let *A* and *B* be {1, 2, 3, 4, 5} and {4, 5, 6, 7, 8}, respectively. Then *A* AND *B* = {4, 5}.

The complement of event *A* is denoted *A′* (read "*A* prime"). *A′* consists of all outcomes that are **NOT** in *A*. Notice that *P*(*A*) + *P*(*A′*) = 1. For example, let *S* = {1, 2, 3, 4, 5, 6} and let *A* = {1, 2, 3, 4}. Then, *A′* = {5, 6}. *P*(*A*) = $\frac{4}{6}$, *P*(*A′*) = $\frac{2}{6}$, and *P*(*A*) + *P*(*A′*) = $\frac{4}{6} + \frac{2}{6}$ = 1

The conditional probability of *A* given *B* is written *P*(*A*\|*B*). *P*(*A*\|*B*) is the probability that event *A* will occur given that the event *B* has already occurred. **A conditional reduces the sample space**. We calculate the probability of *A* from the reduced sample space *B*. The formula to calculate *P*(*A*\|*B*) is *P*(*A*\|*B*) = $\frac{P(A\text{AND}B)}{P(B)}$ where *P*(*B*) is greater than zero.

For example, suppose we toss one fair, six-sided die. The sample space *S* = {1, 2, 3, 4, 5, 6}. Let *A* = face is 2 or 3 and *B* = face is even (2, 4, 6). To calculate *P*(*A*\|*B*), we count the number of outcomes 2 or 3 in the sample space *B* = {2, 4, 6}. Then we divide that by the number of outcomes *B* (rather than *S*).

We get the same result by using the formula. Remember that *S* has six outcomes.

*P*(*A*\|*B*) = $\frac{P(A\mspace{360mu}\text{AND}\mspace{360mu} B)}{P(B)} = \frac{\frac{(\text{the number of outcomes that are 2 or 3 and even in}\mspace{360mu} S)}{6}}{\frac{(\text{the number of outcomes that are even in}\mspace{360mu} S)}{6}} = \frac{\frac{1}{6}}{\frac{3}{6}} = \frac{1}{3}$

Understanding Terminology and SymbolsIt is important to read each problem carefully to think about and understand what the events are. Understanding the wording is the first very important step in solving probability problems. Reread the problem several times if necessary. Clearly identify the event of interest. Determine whether there is a condition stated in the wording that would indicate that the probability is conditional; carefully identify the condition, if any.

### Example  3.1

#### Problem

The sample space *S* is the whole numbers starting at one and less than 20.

a.  *S* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

    Let event *A* = the even numbers and event *B* = numbers greater than 13.

b.  *A* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, *B* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

c.  *P*(*A*) = \_\_\_\_\_\_\_\_\_\_\_\_\_, *P*(*B*) = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

d.  *A* AND *B* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, *A* OR *B* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

e.  *P*(*A* AND *B*) = \_\_\_\_\_\_\_\_\_, *P*(*A* OR *B*) = \_\_\_\_\_\_\_\_\_\_\_\_\_

f.  *A′* = \_\_\_\_\_\_\_\_\_\_\_\_\_, *P*(*A′*) = \_\_\_\_\_\_\_\_\_\_\_\_\_

g.  *P*(*A*) + *P*(*A′*) = \_\_\_\_\_\_\_\_\_\_\_\_

h.  *P*(*A*\|*B*) = \_\_\_\_\_\_\_\_\_\_\_, *P*(*B*\|*A*) = \_\_\_\_\_\_\_\_\_\_\_\_\_; are the probabilities equal?

#### Solution

a.  *S* = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19}
b.  *A* = {2, 4, 6, 8, 10, 12, 14, 16, 18}, *B* = {14, 15, 16, 17, 18, 19}
c.  *P*(*A*) = $\frac{9}{19}$, *P*(*B*) = $\frac{6}{19}$
d.  *A* AND *B* = {14,16,18}, *A* OR *B* = {2, 4, 6, 8, 10, 12, 14, 15, 16, 17, 18, 19}
e.  *P*(*A* AND *B*) = $\frac{3}{19}$, *P*(*A* OR *B*) = $\frac{12}{19}$
f.  *A′* = 1, 3, 5, 7, 9, 11, 13, 15, 17, 19; *P*(*A′*) = $\frac{10}{19}$
g.  *P*(*A*) + *P*(*A′*) = 1 ($\frac{9}{19}$ + $\frac{10}{19}$ = 1)
h.  *P*(*A*\|*B*) = $\frac{P(A\text{AND}B)}{P(B)}$ = $\frac{3}{6}$, *P*(*B*\|*A*) = $\frac{P(A\text{AND}B)}{P(A)}$ = $\frac{3}{9}$, No

### Try It  3.1

The sample space *S* is all the ordered pairs of two whole numbers, the first from one to three and the second from one to four (Example: (1, 4)).\
\

a.  *S* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ \
    \
    Let event *A* = the sum is even and event *B* = the first number is prime.
b.  *A* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, *B* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
c.  *P*(*A*) = \_\_\_\_\_\_\_\_\_\_\_\_\_, *P*(*B*) = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
d.  *A* AND *B* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, *A* OR *B* = \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
e.  *P*(*A* AND *B*) = \_\_\_\_\_\_\_\_\_, *P*(*A* OR *B*) = \_\_\_\_\_\_\_\_\_\_\_\_\_
f.  *B′* = \_\_\_\_\_\_\_\_\_\_\_\_\_, *P*(*B′*) = \_\_\_\_\_\_\_\_\_\_\_\_\_
g.  *P*(*A*) + *P*(*A′*) = \_\_\_\_\_\_\_\_\_\_\_\_
h.  *P*(*A*\|*B*) = \_\_\_\_\_\_\_\_\_\_\_, *P*(*B*\|*A*) = \_\_\_\_\_\_\_\_\_\_\_\_\_; are the probabilities equal?

### Example  3.2

#### Problem

A fair, six-sided die is rolled. Describe the sample space *S*, identify each of the following events with a subset of *S* and compute its probability (an outcome is the number of dots that show up).

a.  Event *T* = the outcome is two.
b.  Event *A* = the outcome is an even number.
c.  Event *B* = the outcome is less than four.
d.  The complement of *A*.
e.  *A* GIVEN *B*
f.  *B* GIVEN *A*
g.  *A* AND *B*
h.  *A* OR *B*
i.  *A* OR *B′*
j.  Event *N* = the outcome is a prime number.
k.  Event *I* = the outcome is seven.

#### Solution

a.  *T* = {2}, *P*(*T*) = $\frac{1}{6}$
b.  *A* = {2, 4, 6}, *P*(*A*) = $\frac{1}{2}$
c.  *B* = {1, 2, 3}, *P*(*B*) = $\frac{1}{2}$
d.  *A′* = {1, 3, 5}, *P*(*A′*) = $\frac{1}{2}$
e.  *A*\|*B* = {2}, *P*(*A*\|*B*) = $\frac{1}{3}$
f.  *B*\|*A* = {2}, *P*(*B*\|*A*) = $\frac{1}{3}$
g.  *A* AND *B* = {2}, *P*(*A* AND *B*) = $\frac{1}{6}$
h.  *A* OR *B* = {1, 2, 3, 4, 6}, *P*(*A* OR *B*) = $\frac{5}{6}$
i.  *A* OR *B′* = {2, 4, 5, 6}, *P*(*A* OR *B′*) = $\frac{2}{3}$
j.  *N* = {2, 3, 5}, *P*(*N*) = $\frac{1}{2}$
k.  A six-sided die does not have seven dots. *P*(7) = 0.

### Example  3.3

Table 3.1 describes the distribution of a random sample *S* of 100 individuals, organized by gender and whether they are right- or left-handed.

            Right-handed   Left-handed
  --------- -------------- -------------
  Males     43             9
  Females   44             4

Table  3.1

#### Problem

Let's denote the events *M* = the subject is male, *F* = the subject is female, *R* = the subject is right-handed, *L* = the subject is left-handed. Compute the following probabilities:

a.  *P*(*M*)
b.  *P*(*F*)
c.  *P*(*R*)
d.  *P*(*L*)
e.  *P*(*M* AND *R*)
f.  *P*(*F* AND *L*)
g.  *P*(*M* OR *F*)
h.  *P*(*M* OR *R*)
i.  *P*(*F* OR *L*)
j.  *P*(*M'*)
k.  *P*(*R*\|*M*)
l.  *P*(*F*\|*L*)
m.  *P*(*L*\|*F*)

#### Solution

a.  *P*(*M*) = 0.52
b.  *P*(*F*) = 0.48
c.  *P*(*R*) = 0.87
d.  *P*(*L*) = 0.13
e.  *P*(*M* AND *R*) = 0.43
f.  *P*(*F* AND *L*) = 0.04
g.  *P*(*M* OR *F*) = 1
h.  *P*(*M* OR *R*) = 0.96
i.  *P*(*F* OR *L*) = 0.57
j.  *P*(*M'*) = 0.48
k.  *P*(*R*\|*M*) = 0.8269 (rounded to four decimal places)
l.  *P*(*F*\|*L*) = 0.3077 (rounded to four decimal places)
m.  *P*(*L*\|*F*) = 0.0833
