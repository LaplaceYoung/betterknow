# 9.2 Impulse and Collisions

Title: 9.2 Impulse and Collisions
Book: University Physics Volume 1
Authors: William Moebs, Samuel J. Ling, Jeff Sanny
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/university-physics-volume-1/pages/9-2-impulse-and-collisions
Access for free at: https://openstax.org/books/university-physics-volume-1/pages/1-introduction
Course-aliases: 大学物理, University Physics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 9.2 Impulse and Collisions

### Learning Objectives

By the end of this section, you will be able to:

- Explain what an impulse is, physically

- Describe what an impulse does

- Relate impulses to collisions

- Apply the impulse-momentum theorem to solve problems

We have defined momentum to be the product of mass and velocity. Therefore, if an object’s velocity should change (due to the application of a force on the object), then necessarily, its momentum changes as well. This indicates a connection between momentum and force. The purpose of this section is to explore and describe that connection.

Suppose you apply a force on a free object for some amount of time. Clearly, the larger the force, the larger the object’s change of momentum will be. Alternatively, the more time you spend applying this force, again the larger the change of momentum will be, as depicted in Figure 9.5. The amount by which the object’s motion changes is therefore proportional to the magnitude of the force, and also to the time interval over which the force is applied.

*Figure 9.5 The change in momentum of an object is proportional to the length of time during which the force is applied. If a force is exerted on the lower ball for twice as long as on the upper ball, then the change in the momentum of the lower ball is twice that of the upper ball.* (Alt: Two soccer balls are shown. In one figure, a red arrow labeled vector F, t sub 0 points to the right and a blue arrow labeled delta p vector also points to the right. In the second figure, a red arrow of the same length as in the first figure points to the right and is labeled vector F, 2 t sub 0. A blue arrow twice as long as the blue arrow in the first figure points to the right and is labeled 2 delta p vector.)

Mathematically, if a quantity is proportional to two (or more) things, then it is proportional to the product of those things. The product of a force and a time interval (over which that force acts) is called impulse, and is given the symbol $\overset{\to}{J}.$

### Impulse

Let $\overset{\to}{F}(t)$ be the force applied to an object over some differential time interval *dt* (Figure 9.6). The resulting impulse on the object is defined as
$$d\overset{\to}{J}=\overset{\to}{F}(t)dt.$$
9.2

*Figure 9.6 A force applied by a tennis racquet to a tennis ball over a time interval generates an impulse acting on the ball.* (Alt: A drawing of a tennis racket hitting a tennis ball. Two arrows pointing to the right are drawn near the ball. One is labeled vector F d t and th other is labeled d J vector.)

The total impulse over the interval ${t}_{\text{f}}-{t}_{\text{i}}$ is
$$\overset{\to}{J}={\int}_{{t}_{\text{i}}}^{{t}_{\text{f}}}d\overset{\to}{J} \text{or} \overset{\to}{J}≡{\int}_{{t}_{\text{i}}}^{{t}_{\text{f}}}\overset{\to}{F}(t)dt.$$
9.3

Equation 9.2 and Equation 9.3 together say that when a force is applied for an infinitesimal time interval *dt*, it causes an infinitesimal impulse $d\overset{\to}{J}$, and the total impulse given to the object is defined to be the sum (integral) of all these infinitesimal impulses.

To calculate the impulse using Equation 9.3, we need to know the force function *F*(*t*), which we often don’t. However, a result from calculus is useful here: Recall that the average value of a function over some interval is calculated by
$$f{(x)}_{\text{ave}}=\frac{1}{\Delta x}{\int}_{{x}_{\text{i}}}^{{x}_{\text{f}}}f(x)dx$$
where $\Delta x={x}_{\text{f}}-{x}_{\text{i}}$. Applying this to the time-dependent force function, we obtain
$${\overset{\to}{F}}_{\text{ave}}=\frac{1}{\Delta t}{\int}_{{t}_{\text{i}}}^{{t}_{\text{f}}}\overset{\to}{F}(t)dt.$$
9.4

Therefore, from Equation 9.3,
$$\overset{\to}{J}={\overset{\to}{F}}_{\text{ave}}\Delta t.$$
9.5

The idea here is that you can calculate the impulse on the object even if you don’t know the details of the force as a function of time; you only need the average force. In fact, though, the process is usually reversed: You determine the impulse (by measurement or calculation) and then calculate the average force that caused that impulse.

To calculate the impulse, a useful result follows from writing the force in Equation 9.3 as $\overset{\to}{F}(t)=m\overset{\to}{a}(t)$:
$$\overset{\to}{J}={\int}_{{t}_{\text{i}}}^{{t}_{\text{f}}}\overset{\to}{F}(t)dt=m{\int}_{{t}_{\text{i}}}^{{t}_{\text{f}}}\overset{\to}{a}(t)dt=m[\overset{\to}{v}({t}_{\text{f}})-{\overset{\to}{t}}_{\text{i}}].$$
For a constant force ${\overset{\to}{F}}_{\text{ave}}=\overset{\to}{F}=m\overset{\to}{a}$, this simplifies to
$$\overset{\to}{J}=m\overset{\to}{a}\Delta t=m{\overset{\to}{v}}_{\text{f}}-m{\overset{\to}{v}}_{\text{i}}=m({\overset{\to}{v}}_{\text{f}}-{\overset{\to}{v}}_{\text{i}}).$$
That is,
$$\overset{\to}{J}=m\Delta \overset{\to}{v}.$$
9.6

Note that the integral form, Equation 9.3, applies to constant forces as well; in that case, since the force is independent of time, it comes out of the integral, which can then be trivially evaluated.

### Example 9.1

#### The Arizona Meteor Crater
Approximately 50,000 years ago, a large (radius of 25 m) iron-nickel meteorite collided with Earth at an estimated speed of $1.28 \times {10}^{4} \text{m/s}$ in what is now the northern Arizona desert, in the United States. The impact produced a crater that is still visible today (Figure 9.7); it is approximately 1200 m (three-quarters of a mile) in diameter, 170 m deep, and has a rim that rises 45 m above the surrounding desert plain. Iron-nickel meteorites typically have a density of $\rho =7970{\text{kg/m}}^{3}$. Use impulse considerations to estimate the average force and the maximum force that the meteor applied to Earth during the impact.

*Figure 9.7 The Arizona Meteor Crater in Flagstaff, Arizona (often referred to as the Barringer Crater after the person who first suggested its origin and whose family owns the land). (credit: modification of work by “Shane.torgerson”/Wikimedia Commons)* (Alt: A photo of the Arizona meteor crater. Buildings near the crater are tiny compared to the crater.)

#### Strategy
It is conceptually easier to reverse the question and calculate the force that Earth applied on the meteor in order to stop it. Therefore, we’ll calculate the force on the meteor and then use Newton’s third law to argue that the force from the meteor on Earth was equal in magnitude and opposite in direction.

Using the given data about the meteor, and making reasonable guesses about the shape of the meteor and impact time, we first calculate the impulse using Equation 9.6. We then use the relationship between force and impulse Equation 9.5 to estimate the average force during impact. Next, we choose a reasonable force function for the impact event, calculate the average value of that function Equation 9.4, and set the resulting expression equal to the calculated average force. This enables us to solve for the maximum force.

#### Solution
Define upward to be the +*y*-direction. For simplicity, assume the meteor is traveling vertically downward prior to impact. In that case, its initial velocity is ${\overset{\to}{v}}_{\text{i}}=-{v}_{\text{i}}\overset{^}{j}$, and the force Earth exerts on the meteor points upward, $\overset{\to}{F}(t)=+F(t)\overset{^}{j}$. The situation at $t=0$ is depicted below.

The average force during the impact is related to the impulse by
$${\overset{\to}{F}}_{\text{ave}}=\frac{\overset{\to}{J}}{\Delta t}.$$
From Equation 9.6, $\overset{\to}{J}=m\Delta \overset{\to}{v}$, so we have
$${\overset{\to}{F}}_{\text{ave}}=\frac{m\Delta \overset{\to}{v}}{\Delta t}.$$
The mass is equal to the product of the meteor’s density and its volume:
$$m=\rho V.$$
If we assume (guess) that the meteor was roughly spherical, we have
$$V=\frac{4}{3}\pi {R}^{3}.$$
Thus we obtain
$${\overset{\to}{F}}_{\text{ave}}=\frac{\rho V\Delta \overset{\to}{v}}{\Delta t}=\frac{\rho (\frac{4}{3}\pi {R}^{3})({\overset{\to}{v}}_{\text{f}}-{\overset{\to}{v}}_{\text{i}})}{\Delta t}.$$
The problem says the velocity at impact was $−1.28 \times {10}^{4} \text{m/s}\overset{^}{j}$ (the final velocity is zero); also, we guess that the primary impact lasted about ${t}_{\max}=2 \text{s}$. Substituting these values gives
$$\begin{matrix} \\ \\ {\overset{\to}{F}}_{\text{ave}} & =\frac{(7970 \frac{\text{kg}}{{\text{m}}^{3}})[\frac{4}{3}\pi {(25 \text{m})}^{3}][0 \frac{\text{m}}{\text{s}}-(−1.28 \times {10}^{4} \frac{\text{m}}{\text{s}}\overset{^}{j})]}{2 \text{s}} \\ & =+(3.33 \times {10}^{12} \text{N})\overset{^}{j}\end{matrix}.$$
This is the average force applied during the collision. Notice that this force vector points in the same direction as the change of velocity vector $\Delta \overset{\to}{v}$.

Next, we calculate the maximum force. The impulse is related to the force function by
$$\overset{\to}{J}={\int}_{{t}_{\text{i}}}^{{t}_{\max}}\overset{\to}{F}(t)dt.$$
We need to make a reasonable choice for the force as a function of time. We define $t=0$ to be the moment the meteor first touches the ground. Then we assume the force is a maximum at impact, and rapidly drops to zero. A function that does this is
$$F(t)={F}_{\max}{e}^{-{t}^{2}\text{/}(2{\tau}^{2})}.$$
(The parameter $\tau$ represents how rapidly the force decreases to zero.) The average force is
$${F}_{\text{ave}}=\frac{1}{\Delta t}{\int}_{0}^{{t}_{\max}}{F}_{\max}{e}^{-{t}^{2}\text{/}(2{\tau}^{2})}dt$$
where $\Delta t={t}_{\max}-0 \text{s}$. Since we already have a numeric value for ${F}_{\text{ave}}$, we can use the result of the integral to obtain ${F}_{\max}$.

Choosing $\tau =\frac{1}{e}{t}_{\max}$ (this is a common choice, as you will see in later chapters), and guessing that ${t}_{\max}=2 \text{s}$, this integral evaluates to
$${F}_{\text{avg}}=0.458 {F}_{\max}.$$
Thus, the maximum force has a magnitude of
$$\begin{matrix}0.458{F}_{\max} & = & 3.33 \times {10}^{12} \text{N} \\ {F}_{\max} & = & 7.27 \times {10}^{12} \text{N}\end{matrix}.$$
The complete force function, including the direction, is
$$\overset{\to}{F}(t)=(7.27 \times {10}^{12} \text{N}){e}^{-{t}^{2}\text{/}(8{\text{s}}^{2})}\overset{^}{j}.$$
This is the force Earth applied to the meteor; by Newton’s third law, the force the meteor applied to Earth is
$$\overset{\to}{F}(t)=-(7.27 \times {10}^{12} \text{N}){e}^{-{t}^{2}\text{/}(8{\text{s}}^{2})}\overset{^}{j}$$
which is the answer to the original question.

#### Significance
The graph of this function contains important information. Let’s graph (the magnitude of) both this function and the average force together (Figure 9.8).

*Figure 9.8 A graph of the average force (in red) and the force as a function of time (blue) of the meteor impact. The areas under the curves are equal to each other, and are numerically equal to the applied impulse.* (Alt: A graph of the force and the average force as a function of time of the meteor impact. The horizontal axis is time in seconds and ranges from 0 to 2 seconds. The vertical axis is Force in Newtons and ranges from 0 to 8 times 10 to the 12. At t=0 the force starts at a little under 8 times 10 to the 12 and decreases to almost 0 at t=2. The average force is constant at about 3.5 times 10 to the 12. The areas under each of the curves are shaded and we are told the areas are equal.)

Notice that the area under each plot has been filled in. For the plot of the (constant) force ${F}_{\text{ave}}$, the area is a rectangle, corresponding to ${F}_{\text{ave}}\Delta t=J$. As for the plot of *F*(*t*), recall from calculus that the area under the plot of a function is numerically equal to the integral of that function, over the specified interval; so here, that is ${\int}_{0}^{{t}_{\max}}F(t)dt=J$. Thus, the areas are equal, and both represent the impulse that the meteor applied to Earth during the two-second impact. The average force on Earth sounds like a huge force, and it is. Nevertheless, Earth barely noticed it. The acceleration Earth obtained was just
$$\overset{\to}{a}=\frac{-{\overset{\to}{F}}_{\text{ave}}}{{M}_{\text{Earth}}}=\frac{-(3.33 \times {10}^{12} \text{N})\overset{^}{j}}{5.97 \times {10}^{24} \text{kg}}=-(5.6 \times {10}^{−13} \frac{\text{m}}{{\text{s}}^{2}})\overset{^}{j}$$
which is completely immeasurable. That said, the impact created seismic waves that nowadays could be detected by modern monitoring equipment.

### Example 9.2

#### The Benefits of Impulse
A car traveling at 27 m/s collides with a building. The collision with the building causes the car to come to a stop in approximately 1 second. The driver, who weighs 860 N, is protected by a combination of a variable-tension seatbelt and an airbag (Figure 9.9). (In effect, the driver collides with the seatbelt and airbag and *not* with the building.) The airbag and seatbelt slow his velocity, such that he comes to a stop in approximately 2.5 s.

- What average force does the driver experience during the collision?

- Without the seatbelt and airbag, his collision time (with the steering wheel) would have been approximately 0.20 s. What force would he experience in this case?

*Figure 9.9 The motion of a car and its driver at the instant before and the instant after colliding with the wall. The restrained driver experiences a large backward force from the seatbelt and airbag, which causes his velocity to decrease to zero. (The forward force from the seatbelt is much smaller than the backward force, so we neglect it in the solution.)* (Alt: Before the collision, a car is traveling at velocity v sub I equals 27 meters per second to the right. After the collision, the car has velocity v sub f = 0 and the passenger feels a force minus F to the left.)

#### Strategy
We are given the driver’s weight, his initial and final velocities, and the time of collision; we are asked to calculate a force. Impulse seems the right way to tackle this; we can combine Equation 9.5 and Equation 9.6.

#### Solution

- Define the +*x*-direction to be the direction the car is initially moving. We know
$$\overset{\to}{J}=\overset{\to}{F}\Delta t$$
and
$$\overset{\to}{J}=m\Delta \overset{\to}{v}.$$
Since *J* is equal to both those things, they must be equal to each other:
$$\overset{\to}{F}\Delta t=m\Delta \overset{\to}{v}.$$
We need to convert this weight to the equivalent mass, expressed in SI units:
$$\frac{860 \text{N}}{9.8 {\text{m/s}}^{2}}=87.8 \text{kg}.$$
Remembering that $\Delta \overset{\to}{v}={\overset{\to}{v}}_{\text{f}}-{\overset{\to}{v}}_{\text{i}}$, and noting that the final velocity is zero, we solve for the force:
$$\overset{\to}{F}=m\frac{0-{v}_{\text{i}}\overset{^}{i}}{\Delta t}=(87.8 \text{kg})(\frac{-(27 \text{m}\text{/}\text{s})\overset{^}{i}}{2.5 \text{s}})=-(948 \text{N})\overset{^}{i}.$$
The negative sign implies that the force slows him down. For perspective, this is about 1.1 times his own weight.

- Same calculation, just the different time interval:
$$\overset{\to}{F}=(87.8 \text{kg})(\frac{-(27 \text{m}\text{/}\text{s})\overset{^}{i}}{0.20 \text{s}})=-(11,853 \text{N})\overset{^}{i}$$
which is about 14 times his own weight. Big difference!

#### Significance
You see that the value of an airbag is how greatly it reduces the force on the vehicle occupants. For this reason, they have been required on all passenger vehicles in the United States since 1991, and have been commonplace throughout Europe and Asia since the mid-1990s. The change of momentum in a crash is the same, with or without an airbag; the force, however, is vastly different.

### Effect of Impulse

Since an impulse is a force acting for some amount of time, it causes an object’s motion to change. Recall Equation 9.6:
$$\overset{\to}{J}=m\Delta \overset{\to}{v}.$$
Because $m\overset{\to}{v}$ is the momentum of a system, $m\Delta \overset{\to}{v}$ is the *change* of momentum $\Delta \overset{\to}{p}$. This gives us the following relation, called the impulse-momentum theorem (or relation).

### Impulse-Momentum Theorem

An impulse applied to a system changes the system’s momentum, and that change of momentum is exactly equal to the impulse that was applied:
$$\overset{\to}{J}=\Delta \overset{\to}{p}.$$
9.7

The impulse-momentum theorem is depicted graphically in Figure 9.10.

*Figure 9.10 Illustration of impulse-momentum theorem. (a) A ball with initial velocity ${\overset{\to}{v}}_{0}$ and momentum ${\overset{\to}{p}}_{0}$ receives an impulse $\overset{\to}{J}$. (b) This impulse is added vectorially to the initial momentum. (c) Thus, the impulse equals the change in momentum, $\overset{\to}{J}=\Delta \overset{\to}{p}$. (d) After the impulse, the ball moves off with its new momentum ${\overset{\to}{p}}_{\text{f}}.$* (Alt: A ball and three vector arrows are shown. The arrows are: v sub i to the right, p sub i to the right and J pointing down and to the right. This figure is labeled “Ball receives impulse.” The next figure shows the p i vector to the right and the J vector, down and to the right with its tail aligned with the tip of the p i vector. This is labeled p sub i plus J and is equal to the p sub f vector. This figure is labeled impulse is added to initial momentum. The next figure shows the J vector equals the p f vector with a vector that is the opposite of p sub i placed with its tail at the p sub f tip. The p vectors are labeled p sub f minus p sub i. This is equal to a vector identical to the J vector but labeled delta p. This figure is labeled “so change in momentum equals the impulse. The last figure shows the ball and two arrows: the p sub f vector and another vector in the same direction and labeled v sub f. This figure is labeled “after impulse ball has final momentum.”)

There are two crucial concepts in the impulse-momentum theorem:

- Impulse is a vector quantity; an impulse of, say, $-(10 \text{N}\cdot \text{s})\overset{^}{i}$ is very different from an impulse of $+(10 \text{N}\cdot \text{s})\overset{^}{i}$; they cause completely opposite changes of momentum.

- An impulse does not cause momentum; rather, it causes a *change* in the momentum of an object. Thus, you must subtract the initial momentum from the final momentum, and—since momentum is also a vector quantity—you must take careful account of the signs of the momentum vectors.

The most common questions asked in relation to impulse are to calculate the applied force, or the change of velocity that occurs as a result of applying an impulse. The general approach is the same.

### Problem-Solving Strategy

#### Impulse-Momentum Theorem

- Express the impulse as force times the relevant time interval.

- Express the impulse as the change of momentum, usually $m\Delta v$.

- Equate these and solve for the desired quantity.

### Example 9.3

#### Moving the *Enterprise*

*Figure 9.11 The fictional starship Enterprise from the Star Trek adventures operated on so-called “impulse engines” that combined matter with antimatter to produce energy.* (Alt: An illustration of the Enterprise from Star Trek with stars in the background.)

When Captain Picard commands, “Take us out,” the starship *Enterprise* (Figure 9.11) starts from rest to a final speed of ${v}_{\text{f}}=7.5 \times {10}^{7} \text{m/s}$. Assuming this maneuver is completed in 60 s, what average force did the impulse engines apply to the ship?

#### Strategy
We are asked for a force; we know the initial and final speeds (and hence the change in speed), and we know the time interval over which this all happened. In particular, we know the amount of time that the force acted. This suggests using the impulse-momentum relation. To use that, though, we need the mass of the *Enterprise*. An internet search gives a best estimate of the mass of the *Enterprise* (in the 2009 movie) as $2 \times {10}^{9} \text{kg}$.

#### Solution
Because this problem involves only one direction (i.e., the direction of the force applied by the engines), we only need the scalar form of the impulse-momentum theorem Equation 9.7, which is
$$\Delta p=J$$
with
$$\Delta p=m\Delta v$$
and
$$J=F\Delta t.$$
Equating these expressions gives
$$F\Delta t=m\Delta v.$$
Solving for the magnitude of the force and inserting the given values leads to
$$F=\frac{m\Delta v}{\Delta t}=\frac{(2 \times {10}^{9} \text{kg})(7.5 \times {10}^{7} \text{m/s})}{60 \text{s}}=2.5 \times {10}^{15} \text{N}.$$
#### Significance
Using Newton's Second Law, this force causes an acceleration of $1.25 \times {10}^{6} {\text{m/s}}^{2}$. This is 130,000 times gravity, which is unimaginably huge. It goes almost without saying that such a force would kill everyone on board instantly, as well as destroying every piece of equipment. Fortunately, the *Enterprise* has “inertial dampeners.” It is left as an exercise for the reader’s imagination to determine how these work.

### Check Your Understanding 9.1

 The U.S. Air Force uses “10*g*s” (an acceleration equal to $10 \times 9.8 {\text{m/s}}^{2}$) as the maximum acceleration a human can withstand (but only for several seconds) and survive. How much time must the *Enterprise* spend accelerating if the humans on board are to experience an average of at most 10*g*s of acceleration? (Assume the inertial dampeners are offline.)

### Example 9.4

#### The iPhone Drop
Apple released its iPhone 6 Plus in November 2014. According to many reports, it was originally supposed to have a screen made from sapphire, but that was changed at the last minute for a hardened glass screen. Reportedly, this was because the sapphire screen cracked when the phone was dropped. What force did the iPhone 6 Plus experience as a result of being dropped?

#### Strategy
The force the phone experiences is due to the impulse applied to it by the floor when the phone collides with the floor. Our strategy then is to use the impulse-momentum relationship. We calculate the impulse, estimate the impact time, and use this to calculate the force.

We need to make a couple of reasonable estimates, as well as find technical data on the phone itself. First, let’s suppose that the phone is most often dropped from about chest height on an average-height person. Second, assume that it is dropped from rest, that is, with an initial vertical velocity of zero. Finally, we assume that the phone bounces very little—the height of its bounce is assumed to be negligible.

#### Solution
Define upward to be the +*y*-direction. A typical height is approximately $h=1.5 \text{m}$ and, as stated, ${\overset{\to}{v}}_{\text{i}}=(0 \text{m/s})\overset{^}{i}$. The average force on the phone is related to the impulse the floor applies on it during the collision:
$${\overset{\to}{F}}_{\text{ave}}=\frac{\overset{\to}{J}}{\Delta t}.$$
The impulse $\overset{\to}{J}$ equals the change in momentum,
$$\overset{\to}{J}=\Delta \overset{\to}{p}$$
so
$${\overset{\to}{F}}_{\text{ave}}=\frac{\Delta \overset{\to}{p}}{\Delta t}.$$
Next, the change of momentum is
$$\Delta \overset{\to}{p}=m\Delta \overset{\to}{v}.$$
We need to be careful with the velocities here; this is the change of velocity due to the collision with the floor. But the phone also has an initial drop velocity [${\overset{\to}{v}}_{\text{i}}=(0 \text{m/s})\overset{^}{j}$], so we label our velocities. Let:

- ${\overset{\to}{v}}_{\text{i}}=$ the initial velocity with which the phone was dropped (zero, in this example)

- ${\overset{\to}{v}}_{1}=$ the velocity the phone had the instant just before it hit the floor

- ${\overset{\to}{v}}_{2}=$ the final velocity of the phone as a result of hitting the floor

Figure 9.12 shows the velocities at each of these points in the phone’s trajectory.

*Figure 9.12 (a) The initial velocity of the phone is zero, just after the person drops it. (b) Just before the phone hits the floor, its velocity is ${\overset{\to}{v}}_{1},$ which is unknown at the moment, except for its direction, which is downward $(-\overset{^}{j}).$ (c) After bouncing off the floor, the phone has a velocity ${\overset{\to}{v}}_{2}$, which is also unknown, except for its direction, which is upward $(+\overset{^}{j}).$* (Alt: A phone is illustrated at three times. The top figure shows the phone well above the floor and with initial velocity v sub i = 0 meters per second. The middle figure shows the phone close to the floor and with large downward velocity v sub 1. We are told that v sub 1 vector equals minus v sub 1 j hat and that this is the velocity just before hitting the floor. The bottom figure shows the phone close to the floor and with small upward velocity v sub 2. We are told that v sub 2 vector equals plus v sub 2 j hat and that this is the velocity just after hitting the floor.)

With these definitions, the change of momentum of the phone during the collision with the floor is
$$m\Delta \overset{\to}{v}=m({\overset{\to}{v}}_{2}-{\overset{\to}{v}}_{1}).$$
Since we assume the phone doesn’t bounce at all when it hits the floor (or at least, the bounce height is negligible), then ${\overset{\to}{v}}_{2}$ is zero, so
$$\begin{matrix}m\Delta \overset{\to}{v} & = & m[0-(-{v}_{1}\overset{^}{j})] \\ m\Delta \overset{\to}{v} & = & +m{v}_{1}\overset{^}{j}.\end{matrix}$$
We can get the speed of the phone just before it hits the floor using either kinematics or conservation of energy. We’ll use conservation of energy here; you should re-do this part of the problem using kinematics and prove that you get the same answer.

First, define the zero of potential energy to be located at the floor. Conservation of energy then gives us:
$$\begin{matrix}{E}_{\text{i}} & = & {E}_{1} \\ {K}_{\text{i}}+{U}_{\text{i}} & = & {K}_{1}+{U}_{1} \\ \frac{1}{2}m{v}_{\text{i}}^{2}+mg{h}_{\text{drop}} & = & \frac{1}{2}m{v}_{1}^{2}+mg{h}_{\text{floor}}.\end{matrix}$$
Defining ${h}_{\text{floor}}=0$ and using ${\overset{\to}{v}}_{\text{i}}=(0 \text{m/s})\overset{^}{j}$ gives
$$\begin{matrix}\frac{1}{2}m{v}_{1}^{2} & = & mg{h}_{\text{drop}} \\ {v}_{1} & = & \pm \sqrt{2g{h}_{\text{drop}}}.\end{matrix}$$
Because ${v}_{1}$ is a vector magnitude, it must be positive. Thus, $m\Delta v=m{v}_{1}=m\sqrt{2g{h}_{\text{drop}}}$. Inserting this result into the expression for force gives
$$\begin{matrix}\overset{\to}{F} & =\frac{\Delta \overset{\to}{p}}{\Delta t} \\ & =\frac{m\Delta \overset{\to}{v}}{\Delta t} \\ & =\frac{+m{v}_{1}\overset{^}{j}}{\Delta t} \\ & =\frac{m\sqrt{2gh}}{\Delta t}\overset{^}{j}.\end{matrix}$$
Finally, we need to estimate the collision time. One common way to estimate a collision time is to calculate how long the object would take to travel its own length. The phone is moving at 5.4 m/s just before it hits the floor, and it is 0.14 m long, giving an estimated collision time of 0.026 s. Inserting the given numbers, we obtain
$$\overset{\to}{F}=\frac{(0.172 \text{kg})\sqrt{2(9.8 {\text{m/s}}^{2})(1.5 \text{m})}}{0.026 \text{s}}\overset{^}{j}=(36 \text{N})\overset{^}{j}.$$
#### Significance
The iPhone itself weighs just $(0.172 \text{kg})(9.81 {\text{m/s}}^{2})=1.68 \text{N}$; the force the floor applies to it is therefore over 20 times its weight.

### Check Your Understanding 9.2

 What if we had assumed the phone *did* bounce on impact? Would this have increased the force on the iPhone, decreased it, or made no difference?

### Momentum and Force

In Example 9.3, we obtained an important relationship:
$${\overset{\to}{F}}_{\text{ave}}=\frac{\Delta \overset{\to}{p}}{\Delta t}.$$
9.8

In words, the average force applied to an object is equal to the change of the momentum that the force causes, divided by the time interval over which this change of momentum occurs. This relationship is very useful in situations where the collision time $\Delta t$ is small, but measureable; typical values would be 1/10th of a second, or even one thousandth of a second. Car crashes, punting a football, or collisions of subatomic particles would meet this criterion.

For a *continuously* changing momentum—due to a continuously changing force—this becomes a powerful conceptual tool. In the limit $\Delta t\to dt$, Equation 9.2 becomes
$$\overset{\to}{F}=\frac{d\overset{\to}{p}}{dt}.$$
9.9

This says that the rate of change of the system’s momentum (implying that momentum is a function of time) is exactly equal to the net applied force (also, in general, a function of time). This is, in fact, Newton’s second law, written in terms of momentum rather than acceleration. This is the relationship Newton himself presented in his *Principia Mathematica* (although he called it “quantity of motion” rather than “momentum”).

If the mass of the system remains constant, Equation 9.3 reduces to the more familiar form of Newton’s second law. We can see this by substituting the definition of momentum:
$$\overset{\to}{F}=\frac{d(m\overset{\to}{v})}{dt}=m\frac{d\overset{\to}{v}}{dt}=m\overset{\to}{a}.$$
The assumption of constant mass allowed us to pull *m* out of the derivative. If the mass is not constant, we cannot use this form of the second law, but instead must start from Equation 9.3. Thus, one advantage to expressing force in terms of changing momentum is that it allows for the mass of the system to change, as well as the velocity; this is a concept we’ll explore when we study the motion of rockets.

### Newton’s Second Law of Motion in Terms of Momentum

The net external force on a system is equal to the rate of change of the momentum of that system caused by the force:
$$\overset{\to}{F}=\frac{d\overset{\to}{p}}{dt}.$$
Although Equation 9.3 allows for changing mass, as we will see in Rocket Propulsion, the relationship between momentum and force remains useful when the mass of the system is constant, as in the following example.

### Example 9.5

#### Calculating Force: Venus Williams’ Tennis Serve
During the 2007 French Open, Venus Williams hit the fastest recorded serve in a premier women’s match, reaching a speed of 58 m/s (209 km/h). What is the average force exerted on the 0.057-kg tennis ball by Venus Williams’ racquet? Assume that the ball’s speed just after impact is 58 m/s, as shown in Figure 9.13, that the initial horizontal component of the velocity before impact is negligible, and that the ball remained in contact with the racquet for 5.0 ms.

*Figure 9.13 The final velocity of the tennis ball is ${\overset{\to}{v}}_{\text{f}}=(58 \text{m/s})\overset{^}{i}$.* (Alt: A tennis ball leaves the racket with velocity v sub f equals 58 meters per second i hat which points horizontally to the right.)

#### Strategy
This problem involves only one dimension because the ball starts from having no horizontal velocity component before impact. Newton’s second law stated in terms of momentum is then written as
$$\overset{\to}{F}=\frac{d\overset{\to}{p}}{dt}.$$
As noted above, when mass is constant, the change in momentum is given by
$$\Delta p=m\Delta v=m({v}_{\text{f}}-{v}_{\text{i}})$$
where we have used scalars because this problem involves only one dimension. In this example, the velocity just after impact and the time interval are given; thus, once $\Delta p$ is calculated, we can use$F=\frac{\Delta p}{\Delta t}$ to find the force.

#### Solution
To determine the change in momentum, insert the values for the initial and final velocities into the equation above:
$$\begin{matrix}\Delta p & =m({v}_{\text{f}}-{v}_{\text{i}}) \\ & =(0.057 \text{kg})(58 \text{m/s}- 0 \text{m/s}) \\ & =3.3 \frac{\text{kg}\cdot \text{m}}{\text{s}}.\end{matrix}$$
Now the magnitude of the net external force can be determined by using
$$F=\frac{\Delta p}{\Delta t}=\frac{3.3 \frac{\text{kg}\cdot \text{m}}{\text{s}}}{5.0 \times {10}^{−3} \text{s}}=6.6 \times {10}^{2} \text{N.}$$
where we have retained only two significant figures in the final step.

#### Significance
This quantity was the average force exerted by Venus Williams’ racquet on the tennis ball during its brief impact (note that the ball also experienced the 0.57-N force of gravity, but that force was not due to the racquet). This problem could also be solved by first finding the acceleration and then using $F=ma$, but one additional step would be required compared with the strategy used in this example.
