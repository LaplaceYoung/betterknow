# 7.1 The Central Limit Theorem for Sample Means (Averages)

Title: 7.1 The Central Limit Theorem for Sample Means (Averages)
Book: Introductory Statistics
Authors: Barbara Illowsky, Susan Dean
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/introductory-statistics/pages/7-1-the-central-limit-theorem-for-sample-means-averages
Access for free at: https://openstax.org/books/introductory-statistics/pages/1-introduction
Course-aliases: 概率统计, 概率论与数理统计, Statistics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 7.1 The Central Limit Theorem for Sample Means (Averages)

Suppose *X* is a random variable with a distribution that may be known or unknown (it can be any distribution). Using a subscript that matches the random variable, suppose:

a.  *μ~X~* = the mean of *X*
b.  *σ~X~* = the standard deviation of *X*

If you draw random samples of size *n*, then as *n* increases, the random variable $\overline{x}$ which consists of sample means, tends to be normally distributed and

$\overline{x}$ \~ *N*$\left( {\mu_{x}\text{,~}\frac{\sigma X}{\sqrt{n}}} \right)$.

The central limit theorem for sample means says that if you repeatedly draw samples of a given size (such as repeatedly rolling ten dice) and calculate their means, those means tend to follow a normal distribution (the sampling distribution). As sample sizes increase, the distribution of means more closely follows the normal distribution. The normal distribution has the same mean as the original distribution and a variance that equals the original variance divided by the sample size. Standard deviation is the square root of variance, so the standard deviation of the sampling distribution is the standard deviation of the original distribution divided by the square root of *n*. The variable *n* is the number of values that are averaged together, not the number of times the experiment is done.

To put it more formally, if you draw random samples of size *n*, the distribution of the random variable $\overline{x}$, which consists of sample means, is called the **sampling distribution of the mean**. The sampling distribution of the mean approaches a normal distribution as *n*, the sample size, increases.

The random variable $\overline{x}$ has a different *z*-score associated with it from that of the random variable *X*. The mean $\overline{x}$ is the value of $\overline{x}$ in one sample.

$$z = \frac{\overline{x} - \mu_{x}}{\left( \frac{\sigma_{X}}{\sqrt{n}} \right)}$$

*μ*~*X*~ is the average of both *X* and $\overline{x}$.

$\sigma_{\overline{x}}\text{~=~}\frac{\sigma X}{\sqrt{n}}$ = standard deviation of $\overline{x}$ and is called the standard error of the mean.

### Using the TI-83, 83+, 84, 84+ Calculator

To find probabilities for means on the calculator, follow these steps.

2nd DISTR\
2:normalcdf

$normalcdf\left( {lower\ value\ of\ the\ area,\ upper\ value\ of\ the\ area,\ mean,\ \frac{standard~deviation}{\sqrt{sample~size}}} \right)$

where:

- *mean* is the mean of the original distribution
- *standard deviation* is the standard deviation of the original distribution
- *sample size* = *n*

### Example  7.1

An unknown distribution has a mean of 90 and a standard deviation of 15. Samples of size *n* = 25 are drawn randomly from the population.

#### Problem

\
a. Find the probability that the sample mean is between 85 and 92.

#### Solution

a\. Let *X* = one value from the original unknown population. The probability question asks you to find a probability for the **sample mean**.

Let $\overline{x}$ = the mean of a sample of size 25. Since *μ*~*X*~ = 90, *σ~X~* = 15, and *n* = 25,

$\overline{x}$ \~ *N*$\left( {90\text{,~}\frac{15}{\sqrt{25}}} \right)$.

Find *P*(85 \< $\overline{x}$ \< 92). Draw a graph.

*P*(85 \< $\overline{x}$ \< 92) = 0.6997

The probability that the sample mean is between 85 and 92 is 0.6997.

*Figure 7.2*  (Alt: This is a normal distribution curve. The peak of the curve coincides with the point 90 on the horizontal axis. The points 85 and 92 are labeled on the axis. Vertical lines are drawn from these points to the curve and the area between the lines is shaded. The shaded region represents the probability that 85 < x < 92.)

### Using the TI-83, 83+, 84, 84+ Calculator

`normalcdf`(lower value, upper value, mean, standard error of the mean)

The parameter list is abbreviated (lower value, upper value, *μ*, $\frac{\sigma}{\sqrt{n}}$)

`normalcdf`(85,92,90,$\frac{15}{\sqrt{25}}$) = 0.6997

#### Problem

b\. Find the value that is two standard deviations above the expected value, 90, of the sample mean.

#### Solution

b\. To find the value that is two standard deviations above the expected value 90, use the formula:

value = *μ*~x~ + (#ofTSDEVs)$\left( \frac{\sigma_{x}}{\sqrt{n}} \right)$

value = 90 + 2 $\left( \frac{15}{\sqrt{25}} \right)$ = 96

The value that is two standard deviations above the expected value is 96.

The standard error of the mean is $\frac{\sigma x}{\sqrt{n}}$ = $\frac{15}{\sqrt{25}}$ = 3. Recall that the standard error of the mean is a description of how far (on average) that the sample mean will be from the population mean in repeated simple random samples of size *n*.

### Try It  7.1

An unknown distribution has a mean of 45 and a standard deviation of eight. Samples of size *n* = 30 are drawn randomly from the population. Find the probability that the sample mean is between 42 and 50.

### Example  7.2

#### Problem

The length of time, in hours, it takes an "over 40" group of people to play one soccer match is normally distributed with a **mean of two hours** and a **standard deviation of 0.5 hours**. A **sample of size *n* = 50** is drawn randomly from the population. Find the probability that the **sample mean** is between 1.8 hours and 2.3 hours.

#### Solution

Let *X* = the time, in hours, it takes to play one soccer match.

The probability question asks you to find a probability for the **sample mean time, in hours**, it takes to play one soccer match.

Let $\overline{x}$ = the mean time, in hours, it takes to play one soccer match.

If *μ~X~* = \_\_\_\_\_\_\_\_\_, *σ~X~* = \_\_\_\_\_\_\_\_\_\_, and *n* = \_\_\_\_\_\_\_\_\_\_\_, then $\overline{X}$ \~ *N*(\_\_\_\_\_\_, \_\_\_\_\_\_) by the central limit theorem for means.

*μ~X~* = 2, *σ~X~* = 0.5, *n* = 50, and *X* \~ *N*$\left( {\text{2,~}\frac{0.5}{\sqrt{50}}} \right)$

Find *P*(1.8 \< $\overline{x}$ \< 2.3). Draw a graph.

*P*(1.8 \< $\overline{x}$ \< 2.3) = 0.9977

`normalcdf`$\left( {1.\text{8,2}\text{.3,2,}\frac{.5}{\sqrt{50}}} \right)$ = 0.9977

The probability that the mean time is between 1.8 hours and 2.3 hours is 0.9977.

### Try It  7.2

The length of time taken on the SAT for a group of students is normally distributed with a mean of 2.5 hours and a standard deviation of 0.25 hours. A sample size of *n* = 60 is drawn randomly from the population. Find the probability that the sample mean is between two hours and three hours.

### Using the TI-83, 83+, 84, 84+ Calculator

To find percentiles for means on the calculator, follow these steps.

2^nd^ DIStR \
3:invNorm

*k* = invNorm$\left( {\text{area~to~the~left~of~}k\text{,~mean,}~\frac{standard~deviation}{\sqrt{sample~size}}} \right)$

where:

- *k* = the *k*^th^ percentile
- *mean* is the mean of the original distribution
- *standard deviation* is the standard deviation of the original distribution
- *sample size* = *n*

### Example  7.3

#### Problem

In a recent study reported Oct. 29, 2012 on the Flurry Blog, the mean age of tablet users is 34 years. Suppose the standard deviation is 15 years. Take a sample of size *n* = 100.

a.  What are the mean and standard deviation for the sample mean ages of tablet users?
b.  What does the distribution look like?
c.  Find the probability that the sample mean age is more than 30 years (the reported mean age of tablet users in this particular study).
d.  Find the 95^th^ percentile for the sample mean age (to one decimal place).

#### Solution

a.  Since the sample mean tends to target the population mean, we have *μ~χ~* = *μ* = 34. The sample standard deviation is given by *σ~χ~* = $\frac{\sigma}{\sqrt{n}}$ = $\frac{15}{\sqrt{100}}$ = $\frac{15}{10}$ = 1.5
b.  The central limit theorem states that for large sample sizes(*n*), the sampling distribution will be approximately normal.
c.  The probability that the sample mean age is more than 30 is given by $P\left( \overline{X}~ > ~30 \right)$ = `normalcdf`(30,E99,34,1.5) = 0.9962
d.  Let *k* = the 95^th^ percentile. \
    *k* = invNorm$\left( {0.\text{95,34,}\frac{15}{\sqrt{100}}} \right)$ = 36.5

### Try It  7.3

In an article on Flurry Blog, a gaming marketing gap for men between the ages of 30 and 40 is identified. You are researching a startup game targeted at the 35-year-old demographic. Your idea is to develop a strategy game that can be played by men from their late 20s through their late 30s. Based on the article's data, industry research shows that the average strategy player is 28 years old with a standard deviation of 4.8 years. You take a sample of 100 randomly selected gamers. If your target market is 29- to 35-year-olds, should you continue with your development strategy?

### Example  7.4

#### Problem

The mean number of minutes for app engagement by a tablet user is 8.2 minutes. Suppose the standard deviation is one minute. Take a sample of 60.

a.  What are the mean and standard deviation for the sample mean number of app engagement by a tablet user?
b.  What is the standard error of the mean?
c.  Find the 90^th^ percentile for the sample mean time for app engagement for a tablet user. Interpret this value in a complete sentence.
d.  Find the probability that the sample mean is between eight minutes and 8.5 minutes.

#### Solution

a.  $\mu_{\overline{x}} = \mu = 8.2\ \sigma_{\overline{x}} = \frac{\sigma}{\sqrt{n}} = \frac{1}{\sqrt{60}} = 0.13$
b.  This allows us to calculate the probability of sample means of a particular distance from the mean, in repeated samples of size 60.
c.  Let *k* = the 90^th^ percentile \
     *k* = `invNorm`$\left( {0.\text{90,8}\text{.2,}\frac{1}{\sqrt{60}}} \right)$ = 8.37. This values indicates that 90 percent of the average app engagement time for table users is less than 8.37 minutes.
d.  *P*(8 \< $\overline{x}$ \< 8.5) = `normalcdf`$\left( {\text{8,8}\text{.5,8}\text{.2,}\frac{1}{\sqrt{60}}} \right)$ = 0.9293

### Try It  7.4

Cans of a cola beverage claim to contain 16 ounces. The amounts in a sample are measured and the statistics are *n* = 34, $\overline{x}$ = 16.01 ounces. If the cans are filled so that *μ* = 16.00 ounces (as labeled) and *σ* = 0.143 ounces, find the probability that a sample of 34 cans will have an average amount greater than 16.01 ounces. Do the results suggest that cans are filled with an amount greater than 16 ounces?
