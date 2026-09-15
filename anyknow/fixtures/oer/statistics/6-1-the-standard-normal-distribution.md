# 6.1 The Standard Normal Distribution

Title: 6.1 The Standard Normal Distribution
Book: Introductory Statistics
Authors: Barbara Illowsky, Susan Dean
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/introductory-statistics/pages/6-1-the-standard-normal-distribution
Access for free at: https://openstax.org/books/introductory-statistics/pages/1-introduction
Course-aliases: 概率统计, 概率论与数理统计, Statistics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 6.1 The Standard Normal Distribution

The standard normal distribution is a normal distribution of **standardized values called** *z*-scores. **A *z*-score is measured in units of the standard deviation.** For example, if the mean of a normal distribution is five and the standard deviation is two, the value 11 is three standard deviations above (or to the right of) the mean. The calculation is as follows:

*x* = *μ* + (*z*)(*σ*) = 5 + (3)(2) = 11

The *z*-score is three.

The mean for the standard normal distribution is zero, and the standard deviation is one. The transformation *z* = $\frac{x - \mu}{\sigma}$ produces the distribution *Z* \~ *N*(0, 1). The value *x* in the given equation comes from a normal distribution with mean *μ* and standard deviation *σ*.

### *Z*-Scores

If *X* is a normally distributed random variable and *X* \~ *N(μ, σ)*, then the *z*-score is:

$$z = \frac{x\ –\ \mu}{\sigma}$$

**The *z*-score tells you how many standard deviations the value *x* is above (to the right of) or below (to the left of) the mean, *μ*.** Values of *x* that are larger than the mean have positive *z*-scores, and values of *x* that are smaller than the mean have negative *z*-scores. If *x* equals the mean, then *x* has a *z*-score of zero.

### Example  6.1

Suppose *X* \~ *N(5, 6)*. This says that *X* is a normally distributed random variable with mean *μ* = 5 and standard deviation *σ* = 6. Suppose *x* = 17. Then:

$$z = \frac{x–\mu}{\sigma} = \frac{17–5}{6} = 2$$

This means that *x* = 17 is **two standard deviations** (2*σ*) above or to the right of the mean *μ* = 5.

Notice that: 5 + (2)(6) = 17 (The pattern is *μ* + *zσ* = *x*)

Now suppose *x* = 1. Then: *z* = $\frac{x–\mu}{\sigma}$ = $\frac{1–5}{6}$ = --0.67 (rounded to two decimal places)

**This means that *x* = 1 is 0.67 standard deviations (--0.67*σ*) below or to the left of the mean *μ* = 5. Notice that:** 5 + (--0.67)(6) is approximately equal to one (This has the pattern *μ* + (--0.67)σ = 1)

Summarizing, when *z* is positive, *x* is above or to the right of *μ* and when *z* is negative, *x* is to the left of or below *μ*. Or, when *z* is positive, *x* is greater than *μ*, and when *z* is negative *x* is less than *μ*.

### Try It  6.1

What is the *z*-score of *x*, when *x* = 1 and *X* \~ *N*(12,3)?

### Example  6.2

Some doctors believe that a person can lose five pounds, on the average, in a month by reducing his or her fat intake and by exercising consistently. Suppose weight loss has a normal distribution. Let *X* = the amount of weight lost (in pounds) by a person in a month. Use a standard deviation of two pounds. *X* \~ *N*(5, 2). Fill in the blanks.\
\

#### Problem

a\. Suppose a person **lost** ten pounds in a month. The *z*-score when *x* = 10 pounds is *z* = 2.5 (verify). This *z*-score tells you that *x* = 10 is \_\_\_\_\_\_\_\_ standard deviations to the \_\_\_\_\_\_\_\_ (right or left) of the mean \_\_\_\_\_ (What is the mean?).

#### Solution

a\. This *z*-score tells you that *x* = 10 is **2.5** standard deviations to the **right** of the mean **five**.\
\

#### Problem

b\. Suppose a person **gained** three pounds (a negative weight loss). Then *z* = \_\_\_\_\_\_\_\_\_\_. This *z*-score tells you that *x* = --3 is \_\_\_\_\_\_\_\_ standard deviations to the \_\_\_\_\_\_\_\_\_\_ (right or left) of the mean.

#### Solution

b\. *z* = **--4**. This *z*-score tells you that *x* = --3 is **four** standard deviations to the **left** of the mean.\
\

#### Problem

c\. Suppose the random variables *X* and *Y* have the following normal distributions: *X* \~ *N*(5, 6) and *Y* \~ *N*(2, 1). If *x* = 17, then *z* = 2. (This was previously shown.) If *y* = 4, what is *z*?

#### Solution

c\. *z* = $\frac{y - \mu}{\sigma}$ = $\frac{4 - 2}{1}$ = 2 where *µ* = 2 and *σ* = 1.

The *z*-score for *y* = 4 is *z* = 2. This means that four is *z* = 2 standard deviations to the right of the mean. Therefore, *x* = 17 and *y* = 4 are both two (of **their own**) standard deviations to the right of **their** respective means.

**The *z*-score allows us to compare data that are scaled differently.** To understand the concept, suppose *X* \~ *N*(5, 6) represents weight gains for one group of people who are trying to gain weight in a six week period and *Y* \~ *N*(2, 1) measures the same weight gain for a second group of people. A negative weight gain would be a weight loss. Since *x* = 17 and *y* = 4 are each two standard deviations to the right of their means, they represent the same, standardized weight gain **relative to their means**.

### Try It  6.2

Fill in the blanks.

Jerome averages 16 points a game with a standard deviation of four points. *X* \~ *N*(16,4). Suppose Jerome scores ten points in a game. The *z*--score when *x* = 10 is --1.5. This score tells you that *x* = 10 is \_\_\_\_\_ standard deviations to the \_\_\_\_\_\_(right or left) of the mean\_\_\_\_\_\_(What is the mean?).

The Empirical RuleIf *X* is a random variable and has a normal distribution with mean *µ* and standard deviation *σ*, then the Empirical Rule states the following:

- About 68% of the *x* values lie between --1*σ* and +1*σ* of the mean *µ* (within one standard deviation of the mean).
- About 95% of the *x* values lie between --2*σ* and +2*σ* of the mean *µ* (within two standard deviations of the mean).
- About 99.7% of the *x* values lie between --3*σ* and +3*σ* of the mean *µ* (within three standard deviations of the mean). Notice that almost all the *x* values lie within three standard deviations of the mean.
- The *z*-scores for +1*σ* and --1*σ* are +1 and --1, respectively.
- The *z*-scores for +2*σ* and --2*σ* are +2 and --2, respectively.
- The *z*-scores for +3*σ* and --3*σ* are +3 and --3 respectively.

The empirical rule is also known as the 68-95-99.7 rule.

*Figure 6.3*  (Alt: This frequency curve illustrates the empirical rule. The normal curve is shown over a horizontal axis. The axis is labeled with points -3s, -2s, -1s, m, 1s, 2s, 3s. Vertical lines connect the axis to the curve at each labeled point. The peak of the curve aligns with the point m.)

### Example  6.3

The mean height of 15 to 18-year-old males from Chile from 2009 to 2010 was 170 cm with a standard deviation of 6.28 cm. Male heights are known to follow a normal distribution. Let *X* = the height of a 15 to 18-year-old male from Chile in 2009 to 2010. Then *X* \~ *N*(170, 6.28).\
\

#### Problem

a\. Suppose a 15 to 18-year-old male from Chile was 168 cm tall from 2009 to 2010. The *z*-score when *x* = 168 cm is *z* = \_\_\_\_\_\_\_. This *z*-score tells you that *x* = 168 is \_\_\_\_\_\_\_\_ standard deviations to the \_\_\_\_\_\_\_\_ (right or left) of the mean \_\_\_\_\_ (What is the mean?).

b\. Suppose that the height of a 15 to 18-year-old male from Chile from 2009 to 2010 has a *z*-score of *z* = 1.27. What is the male's height? The *z*-score (*z* = 1.27) tells you that the male's height is \_\_\_\_\_\_\_\_ standard deviations to the \_\_\_\_\_\_\_\_\_\_ (right or left) of the mean.

#### Solution

a\. --0.32, 0.32, left, 170\
\

b\. 177.98 cm, 1.27, right

### Try It  6.3

Use the information in Example 6.3 to answer the following questions.

a.  Suppose a 15 to 18-year-old male from Chile was 176 cm tall from 2009 to 2010. The *z*-score when *x* = 176 cm is *z* = \_\_\_\_\_\_\_. This *z*-score tells you that *x* = 176 cm is \_\_\_\_\_\_\_\_ standard deviations to the \_\_\_\_\_\_\_\_ (right or left) of the mean \_\_\_\_\_ (What is the mean?).
b.  Suppose that the height of a 15 to 18-year-old male from Chile from 2009 to 2010 has a *z*-score of *z* = --2. What is the male's height? The *z*-score (*z* = --2) tells you that the male's height is \_\_\_\_\_\_\_\_ standard deviations to the \_\_\_\_\_\_\_\_\_\_ (right or left) of the mean.

### Example  6.4

#### Problem

From 1984 to 1985, the mean height of 15 to 18-year-old males from Chile was 172.36 cm, and the standard deviation was 6.34 cm. Let *Y* = the height of 15 to 18-year-old males from 1984 to 1985. Then *Y* \~ *N*(172.36, 6.34).

The mean height of 15 to 18-year-old males from Chile from 2009 to 2010 was 170 cm with a standard deviation of 6.28 cm. Male heights are known to follow a normal distribution. Let *X* = the height of a 15 to 18-year-old male from Chile in 2009 to 2010. Then *X* \~ *N*(170, 6.28).

Find the *z*-scores for *x* = 160.58 cm and *y* = 162.85 cm. Interpret each *z*-score. What can you say about *x* = 160.58 cm and *y* = 162.85 cm as they compare to their respective means and standard deviations?

#### Solution

The *z*-score for *x* = -160.58 is *z* = --1.5. \
The *z*-score for *y* = 162.85 is *z* = --1.5. \
Both *x* = 160.58 and *y* = 162.85 deviate the same number of standard deviations from their respective means and in the same direction.

### Try It  6.4

In 2012, 1,664,479 students took the SAT exam. The distribution of scores in the verbal section of the SAT had a mean *µ* = 496 and a standard deviation *σ* = 114. Let *X* = a SAT exam verbal section score in 2012. Then *X* \~ *N*(496, 114).

Find the *z*-scores for *x*~1~ = 325 and *x*~2~ = 366.21. Interpret each *z*-score. What can you say about *x*~1~ = 325 and *x*~2~ = 366.21 as they compare to their respective means and standard deviations?

### Example  6.5

Suppose *x* has a normal distribution with mean 50 and standard deviation 6.

- About 68% of the *x* values lie within one standard deviation of the mean. Therefore, about 68% of the *x* values lie between --1*σ* = (--1)(6) = --6 and 1*σ* = (1)(6) = 6 of the mean 50. The values 50 -- 6 = 44 and 50 + 6 = 56 are within one standard deviation from the mean 50. The *z*-scores are --1 and +1 for 44 and 56, respectively.
- About 95% of the *x* values lie within two standard deviations of the mean. Therefore, about 95% of the *x* values lie between --2*σ* = (--2)(6) = --12 and 2*σ* = (2)(6) = 12. The values 50 -- 12 = 38 and 50 + 12 = 62 are within two standard deviations from the mean 50. The *z*-scores are --2 and +2 for 38 and 62, respectively.
- About 99.7% of the *x* values lie within three standard deviations of the mean. Therefore, about 99.7% of the *x* values lie between --3*σ* = (--3)(6) = --18 and 3*σ* = (3)(6) = 18 from the mean 50. The values 50 -- 18 = 32 and 50 + 18 = 68 are within three standard deviations of the mean 50. The *z*-scores are --3 and +3 for 32 and 68, respectively.

### Try It  6.5

Suppose *X* has a normal distribution with mean 25 and standard deviation five. Between what values of *x* do 68% of the values lie?

### Example  6.6

#### Problem

From 1984 to 1985, the mean height of 15 to 18-year-old males from Chile was 172.36 cm, and the standard deviation was 6.34 cm. Let *Y* = the height of 15 to 18-year-old males in 1984 to 1985. Then *Y* \~ *N*(172.36, 6.34).

a.  About 68% of the *y* values lie between what two values? These values are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. The *z*-scores are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, respectively.
b.  About 95% of the *y* values lie between what two values? These values are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. The *z*-scores are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ respectively.
c.  About 99.7% of the *y* values lie between what two values? These values are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. The *z*-scores are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, respectively.

#### Solution

a.  About 68% of the values lie between 166.02 cm and 178.7 cm. The *z*-scores are --1 and 1.
b.  About 95% of the values lie between 159.68 cm and 185.04 cm. The *z*-scores are --2 and 2.
c.  About 99.7% of the values lie between 153.34 cm and 191.38 cm. The *z*-scores are --3 and 3.

### Try It  6.6

The scores on a college entrance exam have an approximate normal distribution with mean, *µ* = 52 points and a standard deviation, *σ* = 11 points.

a.  About 68% of the *y* values lie between what two values? These values are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. The *z*-scores are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, respectively.
b.  About 95% of the *y* values lie between what two values? These values are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. The *z*-scores are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, respectively.
c.  About 99.7% of the *y* values lie between what two values? These values are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_. The *z*-scores are \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_, respectively.
