# 4.1 Related Rates

Title: 4.1 Related Rates
Book: Calculus Volume 1
Authors: Gilbert Strang, Edwin “Jed” Herman
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/calculus-volume-1/pages/4-1-related-rates
Access for free at: https://openstax.org/books/calculus-volume-1/pages/1-introduction
Course-aliases: 高等数学, 高等数学A, 微积分, Calculus
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 4.1 Related Rates

### Learning Objectives

- 4.1.1 Express changing quantities in terms of derivatives.

- 4.1.2 Find relationships among the derivatives in a given problem.

- 4.1.3 Use the chain rule to find the rate of change of one quantity that depends on the rate of change of other quantities.

We have seen that for quantities that are changing over time, the rates at which these quantities change are given by derivatives. If two related quantities are changing over time, the rates at which the quantities change are related. For example, if a balloon is being filled with air, both the radius of the balloon and the volume of the balloon are increasing. In this section, we consider several problems in which two or more related quantities are changing and we study how to determine the relationship between the rates of change of these quantities.

### Setting up Related-Rates Problems

In many real-world applications, related quantities are changing with respect to time. For example, if we consider the balloon example again, we can say that the rate of change in the volume, $V,$ is related to the rate of change in the radius, $r.$ In this case, we say that $\frac{dV}{dt}$ and $\frac{dr}{dt}$ are related rates because *V* is related to *r*. Here we study several examples of related quantities that are changing with respect to time and we look at how to calculate one rate of change given another rate of change.

### Example 4.1

#### Inflating a Balloon

A spherical balloon is being filled with air at the constant rate of $2{\text{cm}}^{3}\text{/}\sec$ (Figure 4.2). How fast is the radius increasing when the radius is $3 \text{cm}?$

*Figure 4.2 As the balloon is being filled with air, both the radius and the volume are increasing with respect to time.* (Alt: Three balloons are shown at Times 1, 2, and 3. These balloons increase in volume and radius as time increases.)

#### Solution

The volume of a sphere of radius $r$ centimeters is
$$V=\frac{4}{3}\pi {r}^{3}{\text{cm}}^{3}.$$
Since the balloon is being filled with air, both the volume and the radius are functions of time. Therefore, $t$ seconds after beginning to fill the balloon with air, the volume of air in the balloon is
$$V(t)=\frac{4}{3}\pi {[r(t)]}^{3}{\text{cm}}^{3}.$$
Differentiating both sides of this equation with respect to time and applying the chain rule, we see that the rate of change in the volume is related to the rate of change in the radius by the equation
$$V'(t)=4\pi {[r(t)]}^{2}r'(t).$$
The balloon is being filled with air at the constant rate of 2 cm3/sec, so $V'(t)=2{\text{cm}}^{3}\text{/}\sec .$ Therefore,
$$2{\text{cm}}^{3}\text{/}\sec =(4\pi {[r(t)]}^{2}{\text{cm}}^{2})\cdot (r'(t)\text{cm/s})\text{,}$$
which implies
$$r'(t)=\frac{1}{2\pi {[r(t)]}^{2}} \text{cm/sec}.$$
When the radius $r=3 \text{cm,}$
$$r'(t)=\frac{1}{18\pi} \text{cm/sec}.$$
### Checkpoint 4.1

What is the instantaneous rate of change of the radius when $r=6 \text{cm}?$

Before looking at other examples, let’s outline the problem-solving strategy we will be using to solve related-rates problems.

### Problem-Solving Strategy

#### Solving a Related-Rates Problem

- Assign symbols to all variables involved in the problem. Draw a figure if applicable.

- State, in terms of the variables, the information that is given and the rate to be determined.

- Find an equation relating the variables introduced in step 1.

- Using the chain rule, differentiate both sides of the equation found in step 3 with respect to the independent variable. This new equation will relate the derivatives.

- Substitute all known values into the equation from step 4, then solve for the unknown rate of change.

Note that when solving a related-rates problem, it is crucial not to substitute known values too soon. For example, if the value for a changing quantity is substituted into an equation before both sides of the equation are differentiated, then that quantity will behave as a constant and its derivative will not appear in the new equation found in step 4. We examine this potential error in the following example.

### Examples of the Process

Let’s now implement the strategy just described to solve several related-rates problems. The first example involves a plane flying overhead. The relationship we are studying is between the speed of the plane and the rate at which the distance between the plane and a person on the ground is changing.

### Example 4.2

#### An Airplane Flying at a Constant Elevation

An airplane is flying overhead at a constant elevation of $4000 \text{ft}.$ A man is viewing the plane from a position $3000 \text{ft}$ from the base of a radio tower. The airplane is flying horizontally away from the man. If the plane is flying at the rate of $600 \text{ft/sec},$ at what rate is the distance between the man and the plane increasing when the plane passes over the radio tower?

#### Solution

Step 1. Draw a picture, introducing variables to represent the different quantities involved.

*Figure 4.3 An airplane is flying at a constant height of 4000 ft. The distance between the person and the airplane and the person and the place on the ground directly below the airplane are changing. We denote those quantities with the variables $s$ and $x,$ respectively.* (Alt: A right triangle is made with a person on the ground, an airplane in the air, and a radio tower at the right angle on the ground. The hypotenuse is s, the distance on the ground between the person and the radio tower is x, and the side opposite the person (that is, the height from the ground to the airplane) is 4000 ft.)

As shown, $x$ denotes the distance between the man and the position on the ground directly below the airplane. The variable $s$ denotes the distance between the man and the plane. Note that both $x$ and $s$ are functions of time. We do not introduce a variable for the height of the plane because it remains at a constant elevation of $4000 \text{ft}.$ Since an object’s height above the ground is measured as the shortest distance between the object and the ground, the line segment of length 4000 ft is perpendicular to the line segment of length $x$ feet, creating a right triangle.

Step 2. Since $x$ denotes the horizontal distance between the man and the point on the ground below the plane, $dx\text{/}dt$ represents the speed of the plane. We are told the speed of the plane is 600 ft/sec. Therefore, $\frac{dx}{dt}=600$ ft/sec. Since we are asked to find the rate of change in the distance between the man and the plane when the plane is directly above the radio tower, we need to find $ds\text{/}dt$ when $x=3000 \text{ft}.$

Step 3. From the figure, we can use the Pythagorean theorem to write an equation relating $x$ and $s\text{:}$
$${[x(t)]}^{2}+{4000}^{2}={[s(t)]}^{2}.$$
Step 4. Differentiating this equation with respect to time and using the fact that the derivative of a constant is zero, we arrive at the equation
$$x\frac{dx}{dt}=s\frac{ds}{dt}.$$
Step 5. Find the rate at which the distance between the man and the plane is increasing when the plane is directly over the radio tower. That is, find $\frac{ds}{dt}$ when $x=3000 \text{ft}.$ Since the speed of the plane is $600 \text{ft/sec},$ we know that $\frac{dx}{dt}=600 \text{ft/sec}.$ We are not given an explicit value for $s;$ however, since we are trying to find $\frac{ds}{dt}$ when $x=3000 \text{ft},$ we can use the Pythagorean theorem to determine the distance $s$ when $x=3000$ and the height is $4000 \text{ft}.$ Solving the equation
$${3000}^{2}+{4000}^{2}={s}^{2}$$
for $s,$ we have $s=5000 \text{ft}$ at the time of interest. Using these values, we conclude that $ds\text{/}dt$ is a solution of the equation
$$(3000)(600)=(5000)\cdot \frac{ds}{dt}.$$
Therefore,
$$\frac{ds}{dt}=\frac{3000\cdot 600}{5000}=360 \text{ft/sec}.$$
*Note*: When solving related-rates problems, it is important not to substitute values for the variables too soon. For example, in step 3, we related the variable quantities $x(t)$ and $s(t)$ by the equation
$${[x(t)]}^{2}+{4000}^{2}={[s(t)]}^{2}.$$
Since the plane remains at a constant height, it is not necessary to introduce a variable for the height, and we are allowed to use the constant 4000 to denote that quantity. However, the other two quantities are changing. If we mistakenly substituted $x(t)=3000$ into the equation before differentiating, our equation would have been
$${3000}^{2}+{4000}^{2}={[s(t)]}^{2}.$$
After differentiating, our equation would become
$$0=s(t)\frac{ds}{dt}.$$
As a result, we would incorrectly conclude that $\frac{ds}{dt}=0.$

### Checkpoint 4.2

What is the speed of the plane if the distance between the person and the plane is increasing at the rate of $300 \text{ft/sec}?$

We now return to the problem involving the rocket launch from the beginning of the chapter.

### Example 4.3

#### Chapter Opener: A Rocket Launch

*Figure 4.4 (credit: modification of work by Steve Jurvetson, Wikimedia Commons)* (Alt: A photo of a rocket lifting off.)

A rocket is launched so that it rises vertically. A camera is positioned $5000 \text{ft}$ from the launch pad. When the rocket is $1000 \text{ft}$ above the launch pad, its velocity is $600 \text{ft/sec}.$ Find the necessary rate of change of the camera’s angle as a function of time so that it stays focused on the rocket.

#### Solution

Step 1. Draw a picture introducing the variables.

*Figure 4.5 A camera is positioned 5000 ft from the launch pad of the rocket. The height of the rocket and the angle of the camera are changing with respect to time. We denote those quantities with the variables $h$ and $\theta ,$ respectively.* (Alt: A right triangle is formed with a camera at one of the nonright angles and a rocket at the other nonright angle. The angle with the camera has measure θ. The distance from the rocket to the ground is h; note that this is the side opposite the angle with measure θ. The side adjacent to the angle with measure θ is 5000 ft.)

Let $h$ denote the height of the rocket above the launch pad and $\theta$ be the angle between the camera lens and the ground.

Step 2. We are trying to find the rate of change in the angle of the camera with respect to time when the rocket is 1000 ft off the ground. That is, we need to find $\frac{d\theta}{dt}$ when $h=1000 \text{ft}.$ At that time, we know the velocity of the rocket is $\frac{dh}{dt}=600 \text{ft/sec}.$

Step 3. Now we need to find an equation relating the two quantities that are changing with respect to time: $h$ and $\theta .$ How can we create such an equation? Using the fact that we have drawn a right triangle, it is natural to think about trigonometric functions. Recall that $\tan \theta$ is the ratio of the length of the opposite side of the triangle to the length of the adjacent side. Thus, we have
$$\tan \theta =\frac{h}{5000}.$$
This gives us the equation
$$h=5000 \tan \theta .$$
Step 4. Differentiating this equation with respect to time $t,$ we obtain
$$\frac{dh}{dt}=5000 {\sec}^{2}\theta \frac{d\theta}{dt}.$$
Step 5. We want to find $\frac{d\theta}{dt}$ when $h=1000 \text{ft}.$ At this time, we know that $\frac{dh}{dt}=600 \text{ft/sec}.$ We need to determine ${\sec}^{2}\theta .$ Recall that $\sec \theta$ is the ratio of the length of the hypotenuse to the length of the adjacent side. We know the length of the adjacent side is $5000 \text{ft}.$ To determine the length of the hypotenuse, we use the Pythagorean theorem, where the length of one leg is $5000 \text{ft},$ the length of the other leg is $h=1000 \text{ft},$ and the length of the hypotenuse is $c$ feet as shown in the following figure.

We see that
$${1000}^{2}+{5000}^{2}={c}^{2}$$
and we conclude that the hypotenuse is
$$c=1000\sqrt{26} \text{ft}.$$
Therefore, when $h=1000,$ we have
$${\sec}^{2}\theta ={(\frac{1000\sqrt{26}}{5000})}^{2}=\frac{26}{25}.$$
Recall from step 4 that the equation relating $\frac{d\theta}{dt}$ to our known values is
$$\frac{dh}{dt}=5000 {\sec}^{2}\theta \frac{d\theta}{dt}.$$
When $h=1000 \text{ft},$ we know that $\frac{dh}{dt}=600 \text{ft/sec}$ and ${\sec}^{2}\theta =\frac{26}{25}.$ Substituting these values into the previous equation, we arrive at the equation
$$600=5000(\frac{26}{25})\frac{d\theta}{dt}\text{.}$$
Therefore, $\frac{d\theta}{dt}=\frac{3}{26} \text{rad/sec}.$

### Checkpoint 4.3

What rate of change is necessary for the elevation angle of the camera if the camera is placed on the ground at a distance of $4000 \text{ft}$ from the launch pad and the velocity of the rocket is 500 ft/sec when the rocket is $2000 \text{ft}$ off the ground?

In the next example, we consider water draining from a cone-shaped funnel. We compare the rate at which the level of water in the cone is decreasing with the rate at which the volume of water is decreasing.

### Example 4.4

#### Water Draining from a Funnel

Water is draining from the bottom of a cone-shaped funnel at the rate of $0.0{3 \text{ft}}^{3}\text{/sec}.$ The height of the funnel is 2 ft and the radius at the top of the funnel is $1 \text{ft}.$ At what rate is the height of the water in the funnel changing when the height of the water is $\frac{1}{2} \text{ft}?$

#### Solution

Step 1: Draw a picture introducing the variables.

*Figure 4.6 Water is draining from a funnel of height 2 ft and radius 1 ft. The height of the water and the radius of water are changing over time. We denote these quantities with the variables $h$ and $r,$ respectively.* (Alt: A funnel is shown with height 2 and radius 1 at its top. The funnel has water to height h, at which point the radius is r.)

Let $h$ denote the height of the water in the funnel, $r$ denote the radius of the water at its surface, and $V$ denote the volume of the water.

Step 2: We need to determine $\frac{dh}{dt}$ when $h=\frac{1}{2} \text{ft}.$ We know that $\frac{dV}{dt}=−0.03 {\text{ft}}^{3}\text{/sec}.$

Step 3: The volume of water in the cone is
$$V=\frac{1}{3}\pi {r}^{2}h.$$
From the figure, we see that we have similar triangles. Therefore, the ratio of the sides in the two triangles is the same. Therefore, $\frac{r}{h}=\frac{1}{2}$ or $r=\frac{h}{2}.$ Using this fact, the equation for volume can be simplified to
$$V=\frac{1}{3}\pi {(\frac{h}{2})}^{2}h=\frac{\pi}{12} {h}^{3}.$$
Step 4: Applying the chain rule while differentiating both sides of this equation with respect to time $t,$ we obtain
$$\frac{dV}{dt}=\frac{\pi}{4} {h}^{2}\frac{dh}{dt}.$$
Step 5: We want to find $\frac{dh}{dt}$ when $h=\frac{1}{2} \text{ft}.$ Since water is leaving at the rate of $0.0{3 \text{ft}}^{3}\text{/sec},$ we know that $\frac{dV}{dt}=−0.03{\text{ft}}^{3}\text{/sec}.$ Therefore,
$$−0.03=\frac{\pi}{4}{(\frac{1}{2})}^{2}\frac{dh}{dt}\text{},$$
which implies
$$−0.03=\frac{\pi}{16} \frac{dh}{dt}.$$
It follows that
$$\frac{dh}{dt}=-\frac{0.48}{\pi}=−0.153 \text{ft/sec}.$$
### Checkpoint 4.4

At what rate is the height of the water changing when the height of the water is $\frac{1}{4} \text{ft}?$

## Section Exercises

Selected openly licensed end-of-section exercises from this OpenStax section. The complete set is on the source page.

**Exercise.** Find $\frac{dy}{dt}$ at $x=1$ and $y={x}^{2}+3$ if $\frac{dx}{dt}=4.$

**Exercise.** Find $\frac{dx}{dt}$ at $x=−2$ and $y=2{x}^{2}+1$ if $\frac{dy}{dt}=−1.$

**Exercise.** Find $\frac{dz}{dt}$ at $(x,y)=(1,3)$ and ${z}^{2}={x}^{2}+{y}^{2}$ if $\frac{dx}{dt}=4$ and $\frac{dy}{dt}=3.$

**Exercise.** [T] If two electrical resistors are connected in parallel, the total resistance (measured in ohms, denoted by the Greek capital letter omega, $\text{Ω})$ is given by the equation $\frac{1}{R}=\frac{1}{{R}_{1}}+\frac{1}{{R}_{2}}.$ If ${R}_{1}$ is increasing at a rate of $0.5 \text{Ω}\text{/}\min$ and ${R}_{2}$ decreases at a rate of $1.1\text{Ω/min},$ at what rate does the total resistance change when ${R}_{1}=20\text{Ω}$ and ${R}_{2}=50\text{Ω}$ ?

**Exercise.** A 10-ft ladder is leaning against a wall. If the top of the ladder slides down the wall at a rate of 2 ft/sec, how fast is the bottom moving along the ground when the bottom of the ladder is 5 ft from the wall?

**Exercise.** A 25-ft ladder is leaning against a wall. If we push the ladder toward the wall at a rate of 1 ft/sec, and the bottom of the ladder is initially $20 \text{ft}$ away from the wall, how fast does the ladder move up the wall $5 \sec$ after we start pushing?

**Exercise.** Two airplanes are flying in the air at the same height: airplane A is flying east at 250 mi/h and airplane B is flying north at $300 \text{mi/h}.$ If they are both heading to the same airport, located 30 miles east of airplane A and 40 miles north of airplane B , at what rate is the distance between the airplanes changing?

**Exercise.** You and a friend are riding your bikes to a restaurant that you think is east; your friend thinks the restaurant is north. You both leave from the same point, with you riding at 16 mph east and your friend riding $12 \text{mph}$ north. After you traveled $4 \text{mi,}$ at what rate is the distance between you changing?
