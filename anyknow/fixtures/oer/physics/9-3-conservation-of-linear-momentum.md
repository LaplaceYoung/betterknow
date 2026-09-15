# 9.3 Conservation of Linear Momentum

Title: 9.3 Conservation of Linear Momentum
Book: University Physics Volume 1
Authors: William Moebs, Samuel J. Ling, Jeff Sanny
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/university-physics-volume-1/pages/9-3-conservation-of-linear-momentum
Access for free at: https://openstax.org/books/university-physics-volume-1/pages/1-introduction
Course-aliases: 大学物理, University Physics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 9.3 Conservation of Linear Momentum

### Learning Objectives

By the end of this section, you will be able to:

- Explain the meaning of “conservation of momentum”

- Correctly identify if a system is, or is not, closed

- Define a system whose momentum is conserved

- Mathematically express conservation of momentum for a given system

- Calculate an unknown quantity using conservation of momentum

Recall Newton’s third law: When two objects of masses ${m}_{1}$ and ${m}_{2}$ interact (meaning that they apply forces on each other), the force that object 2 applies to object 1 is equal in magnitude and opposite in direction to the force that object 1 applies on object 2. Let:

- ${\overset{\to}{F}}_{21}=$ the force on ${m}_{1}$ from ${m}_{2}$

- ${\overset{\to}{F}}_{12}=$ the force on ${m}_{2}$ from ${m}_{1}$

Then, in symbols, Newton’s third law says
$$\begin{matrix}{\overset{\to}{F}}_{21} & = & -{\overset{\to}{F}}_{12} \\ {m}_{1}{\overset{\to}{a}}_{1} & = & -{m}_{2}{\overset{\to}{a}}_{2}.\end{matrix}$$
9.10

(Recall that these two forces do not cancel because they are applied to different objects. ${F}_{21}$ causes ${m}_{1}$ to accelerate, and ${F}_{12}$ causes ${m}_{2}$ to accelerate.)

Although the magnitudes of the forces on the objects are the same, the accelerations are not, simply because the masses (in general) are different. Therefore, the changes in velocity of each object are different:
$$\frac{d{\overset{\to}{v}}_{1}}{dt}\neq \frac{d{\overset{\to}{v}}_{2}}{dt}.$$
However, the products of the mass and the change of velocity *are* equal (in magnitude):
$${m}_{1}\frac{d{\overset{\to}{v}}_{1}}{dt}=-{m}_{2}\frac{d{\overset{\to}{v}}_{2}}{dt}.$$
9.11

It’s a good idea, at this point, to make sure you’re clear on the physical meaning of the derivatives in Equation 9.3. Because of the interaction, each object ends up getting its velocity changed, by an amount *dv*. Furthermore, the interaction occurs over a time interval *dt*, which means that the change of velocities also occurs over *dt*. This time interval is the same for each object.

Let‘s assume, for the moment, that the masses of the objects do not change during the interaction. (We’ll relax this restriction later.) In that case, we can pull the masses inside the derivatives:
$$\frac{d}{dt}({m}_{1}{\overset{\to}{v}}_{1})=-\frac{d}{dt}({m}_{2}{\overset{\to}{v}}_{2})$$
9.12

and thus
$$\frac{d{\overset{\to}{p}}_{1}}{dt}=-\frac{d{\overset{\to}{p}}_{2}}{dt}.$$
9.13

This says that *the rate at which momentum changes is the same for both objects.* The masses are different, and the changes of velocity are different, but the rate of change of the product of *m* and *$\overset{\to}{v}$* are the same.

Physically, this means that during the interaction of the two objects (${m}_{1} \text{and} {m}_{2}$), both objects have their momentum changed; but those changes are identical in magnitude, though opposite in sign. For example, the momentum of object 1 might increase, which means that the momentum of object 2 decreases by exactly the same amount.

In light of this, let’s re-write Equation 9.12 in a more suggestive form:
$$\frac{d{\overset{\to}{p}}_{1}}{dt}+\frac{d{\overset{\to}{p}}_{2}}{dt}=0.$$
9.14

This says that during the interaction, although object 1’s momentum changes, and object 2’s momentum also changes, these two changes cancel each other out, so that the total change of momentum of the two objects together is zero.

Since the total combined momentum of the two objects together never changes, then we could write
$$\frac{d}{dt}({\overset{\to}{p}}_{1}+{\overset{\to}{p}}_{2})=0$$
9.15

from which it follows that
$${\overset{\to}{p}}_{1}+{\overset{\to}{p}}_{2}=\text{constant}.$$
9.16

As shown in Figure 9.14, the total momentum of the system before and after the collision remains the same.

*Figure 9.14 Before the collision, the two billiard balls travel with momenta ${\overset{\to}{p}}_{1}$ and ${\overset{\to}{p}}_{2}$. The total momentum of the system is the sum of these, as shown by the red vector labeled ${\overset{\to}{p}}_{\mathrm{total}}$ on the left. After the collision, the two billiard balls travel with different momenta ${\overset{\to}{p}'}_{1}$ and ${\overset{\to}{p}'}_{2}$. The total momentum, however, has not changed, as shown by the red vector arrow ${\overset{\to}{p}'}_{\mathrm{total}}$ on the right.* (Alt: Before collision yellow ball1 is moving down and to the right, aiming at the center of blue ball 2. Blue ball 2 is moving to the left and slightly down, and more slowly than ball 1. We are told that p total vector equals p 1 vector plus p 2 vector and we are shown the sum as a vector diagram: p 1 and p 2 are placed with the tail of p 2 at the head of p 1. A vector is drawn from the tail of p 1 to the head of p 2. After the collision, the yellow ball is moving slowly to the right and p 2 is moving more rapidly down and to the left. We are told that p prime total vector equals p prime 1 vector plus p prime 2 vector and we are shown the sum as a vector diagram: p prime 1 and p prime 2 are placed with the tail of p prime 2 at the head of p prime 1. A vector is drawn from the tail of p prime 1 to the head of p prime 2 and is the same length and in the same direction as the sum vector before collision.)

Generalizing this result to *N* objects, we obtain
$$\begin{matrix}{\overset{\to}{p}}_{1}+{\overset{\to}{p}}_{2}+{\overset{\to}{p}}_{3}+\cdots +{\overset{\to}{p}}_{N} & = & \text{constant} \\ \sum _{j=1}^{N}{\overset{\to}{p}}_{j} & = & \text{constant.}\end{matrix}$$
9.17

Equation 9.17 is the definition of the total (or net) momentum of a system of *N* interacting objects, along with the statement that the total momentum of a system of objects is constant in time—or better, is conserved.

### Conservation Laws

If the value of a physical quantity is constant in time, we say that the quantity is conserved.

### Requirements for Momentum Conservation

There is a complication, however. A system must meet two requirements for its momentum to be conserved:

- *The mass of the system must remain constant during the interaction.*

As the objects interact (apply forces on each other), they may *transfer* mass from one to another; but any mass one object gains is balanced by the loss of that mass from another. The total mass of the system of objects, therefore, remains unchanged as time passes:
$${[\frac{dm}{dt}]}_{\text{system}}=0.$$
- *The net external force on the system must be zero.*

As the objects collide, or explode, and move around, they exert forces on each other. However, all of these forces are internal to the system, and thus each of these internal forces is balanced by another internal force that is equal in magnitude and opposite in sign. As a result, the change in momentum caused by each internal force is cancelled by another momentum change that is equal in magnitude and opposite in direction. Therefore, internal forces cannot change the total momentum of a system because the changes sum to zero. However, if there is some external force that acts on all of the objects (gravity, for example, or friction), then this force changes the momentum of the system as a whole; that is to say, the momentum of the system is changed by the external force. Thus, for the momentum of the system to be conserved, we must have
$${\overset{\to}{F}}_{ext}=\overset{\to}{0}.$$
A system of objects that meets these two requirements is said to be a closed system (also called an isolated system). Thus, the more compact way to express this is shown below.

### Law of Conservation of Momentum

The total momentum of a closed system is conserved:
$$\sum _{j=1}^{N}{\overset{\to}{p}}_{j}=\text{constant.}$$
This statement is called the Law of Conservation of Momentum. Along with the conservation of energy, it is one of the foundations upon which all of physics stands. All our experimental evidence supports this statement: from the motions of galactic clusters to the quarks that make up the proton and the neutron, and at every scale in between. *In a closed system, the total momentum never changes.*

Note that there absolutely *can* be external forces acting on the system; but for the system’s momentum to remain constant, these external forces have to cancel, so that the *net* external force is zero. Billiard balls on a table all have a weight force acting on them, but the weights are balanced (canceled) by the normal forces, so there is no *net* force.

### The Meaning of ‘System’

A system (mechanical) is the collection of objects in whose motion (kinematics and dynamics) you are interested. If you are analyzing the bounce of a ball on the ground, you are probably only interested in the motion of the ball, and not of Earth; thus, the ball is your system. If you are analyzing a car crash, the two cars together compose your system (Figure 9.15).

*Figure 9.15 The two cars together form the system that is to be analyzed. It is important to remember that the contents (the mass) of the system do not change before, during, or after the objects in the system interact.* (Alt: Illustration of collision of two cars with masses m 1 and m 2. The system of interest is the two cars before and after the collision. Before the collision, car m 2 is in front and moving forward with velocity v 2, and car m 1 is behind it, moving forward with velocity v 1. Net vector F = 0 and vectors p 1 plus p 2 equal p tot. After the collision, car m 2 is in front and moving forward with velocity v 2 prime which is larger than v 2 before the collision, and car m 1 is behind it, moving forward with velocity v 1 prime that is less than v 1 before the collision. Vectors p 1 prime plus p 2 prime equal p tot prime.)

### Problem-Solving Strategy

#### Conservation of Momentum

Using conservation of momentum requires four basic steps. The first step is crucial:

- Identify a closed system (total mass is constant, no net external force acts on the system).

- Write down an expression representing the total momentum of the system before the “event” (explosion or collision).

- Write down an expression representing the total momentum of the system after the “event.”

- Set these two expressions equal to each other, and solve this equation for the desired quantity.

### Example 9.6

#### Colliding Carts
Two carts in a physics lab roll on a level track, with negligible friction. These carts have small magnets at their ends, so that when they collide, they stick together (Figure 9.16). The first cart has a mass of 675 grams and is rolling at 0.75 m/s to the right; the second has a mass of 500 grams and is rolling at 1.33 m/s, also to the right. After the collision, what is the velocity of the two joined carts?

*Figure 9.16 Two lab carts collide and stick together after the collision.* (Alt: An illustration of two lab carts on a track, stuck together.)

#### Strategy
We have a collision. We’re given masses and initial velocities; we’re asked for the final velocity. This all suggests using conservation of momentum as a method of solution. However, we can only use it if we have a closed system. So we need to be sure that the system we choose has no net external force on it, and that its mass is not changed by the collision.

Defining the system to be the two carts meets the requirements for a closed system: The combined mass of the two carts certainly doesn’t change, and while the carts definitely exert forces on each other, those forces are internal to the system, so they do not change the momentum of the system as a whole. In the vertical direction, the weights of the carts are canceled by the normal forces on the carts from the track.

#### Solution
Conservation of momentum is
$${\overset{\to}{p}}_{f}={\overset{\to}{p}}_{i}.$$
Define the direction of their initial velocity vectors to be the +*x*-direction. The initial momentum is then
$${\overset{\to}{p}}_{i}={m}_{1}{v}_{1}\overset{^}{i}+{m}_{2}{v}_{2}\overset{^}{i}.$$
The final momentum of the now-linked carts is
$${\overset{\to}{p}}_{f}=({m}_{1}+{m}_{2}){\overset{\to}{v}}_{f}.$$
Equating:
$$\begin{matrix}({m}_{1}+{m}_{2}){\overset{\to}{v}}_{f} & = & {m}_{1}{v}_{1}\overset{^}{i}+{m}_{2}{v}_{2}\overset{^}{i} \\ {\overset{\to}{v}}_{f} & = & (\frac{{m}_{1}{v}_{1}+{m}_{2}{v}_{2}}{{m}_{1}+{m}_{2}})\overset{^}{i}.\end{matrix}$$
Substituting the given numbers:
$$\begin{matrix}{\overset{\to}{v}}_{f} & =[\frac{(0.675 \text{kg})(0.75 \text{m/s})+(0.5 \text{kg})(1.33 \text{m/s})}{1.175 \text{kg}}]\overset{^}{i} \\ & =(0.997 \text{m/s})\overset{^}{i}.\end{matrix}$$
#### Significance
The principles that apply here to two laboratory carts apply identically to all objects of whatever type or size. Even for photons, the concepts of momentum and conservation of momentum are still crucially important even at that scale. (Since they are massless, the momentum of a photon is defined very differently from the momentum of ordinary objects. You will learn about this when you study quantum physics.)

### Check Your Understanding 9.3

 Suppose the second, smaller cart had been initially moving to the left. What would the sign of the final velocity have been in this case?

### Example 9.7

#### A Bouncing Superball
A superball of mass 0.25 kg is dropped from rest from a height of $h=1.50 \text{m}$ above the floor. It bounces with no loss of energy and returns to its initial height (Figure 9.17).

- What is the superball’s change of momentum during its bounce on the floor?

- What was Earth’s change of momentum due to the ball colliding with the floor?

- What was Earth’s change of velocity as a result of this collision?

(This example shows that you have to be careful about defining your system.)

*Figure 9.17 A superball is dropped to the floor (${t}_{0}$), hits the floor (${t}_{1}$), bounces (${t}_{2}$), and returns to its initial height (${t}_{3}$).* (Alt: A ball is shown at four different times. At t sub 0 the ball is at a distance h above the floor and has p sub 0 equals 0. At t sub 1 the ball is near the floor. A downward arrow at the ball is labeled minus p sub 1. At t sub 2 the ball is near the floor. An upward arrow at the ball is labeled plus p sub 2. The p sub 1 and p sub 2 arrows are the same length. At t sub 3 the ball at height h again and p sub 3 equals zero.)

#### Strategy
Since we are asked only about the ball’s change of momentum, we define our system to be the ball. But this is clearly not a closed system; gravity applies a downward force on the ball while it is falling, and the normal force from the floor applies a force during the bounce. Thus, we cannot use conservation of momentum as a strategy. Instead, we simply determine the ball’s momentum just before it collides with the floor and just after, and calculate the difference. We have the ball’s mass, so we need its velocities.

#### Solution

- Since this is a one-dimensional problem, we use the scalar form of the equations. Let:

- ${p}_{0}=$ the magnitude of the ball’s momentum at time ${t}_{0}$, the moment it was released; since it was dropped from rest, this is zero.

- ${p}_{1}=$ the magnitude of the ball’s momentum at time ${t}_{1}$, the instant just before it hits the floor.

- ${p}_{2}=$ the magnitude of the ball’s momentum at time ${t}_{2}$, just after it loses contact with the floor after the bounce.

The ball’s change of momentum is
$$\begin{matrix}\Delta \overset{\to}{p} & ={\overset{\to}{p}}_{2}-{\overset{\to}{p}}_{1} \\ & ={p}_{2}\overset{^}{j}-(-{p}_{1}\overset{^}{j}) \\ & =({p}_{2}+{p}_{1})\overset{^}{j}.\end{matrix}$$
Its velocity just before it hits the floor can be determined from either conservation of energy or kinematics. We use kinematics here; you should re-solve it using conservation of energy and confirm you get the same result.

We want the velocity just before it hits the ground (at time ${t}_{1}$). We know its initial velocity ${v}_{0}=0$ (at time ${t}_{0}$), the height it falls, and its acceleration; we don’t know the fall time. We could calculate that, but instead we use
$${\overset{\to}{v}}_{1}=-\overset{^}{j}\sqrt{2gy}=−5.4 \text{m/s}\overset{^}{j}.$$
Thus the ball has a momentum of
$$\begin{matrix}{\overset{\to}{p}}_{1} & =-(0.25 \text{kg})(−5.4 \text{m/s}\overset{^}{j}) \\ & =-(1.4 \text{kg}\cdot \text{m/s})\overset{^}{j}.\end{matrix}$$
We don’t have an easy way to calculate the momentum after the bounce. Instead, we reason from the symmetry of the situation.

Before the bounce, the ball starts with zero velocity and falls 1.50 m under the influence of gravity, achieving some amount of momentum just before it hits the ground. On the return trip (after the bounce), it starts with some amount of momentum, rises the same 1.50 m it fell, and ends with zero velocity. Thus, the motion after the bounce was the mirror image of the motion before the bounce. From this symmetry, it must be true that the ball’s momentum after the bounce must be equal and opposite to its momentum before the bounce. (This is a subtle but crucial argument; make sure you understand it before you go on.)

Therefore,
$${\overset{\to}{p}}_{2}=-{\overset{\to}{p}}_{1}=+(1.4 \text{kg}\cdot \text{m/s})\overset{^}{j}.$$
Thus, the ball’s change of momentum during the bounce is
$$\begin{matrix}\Delta \overset{\to}{p} & ={\overset{\to}{p}}_{2}-{\overset{\to}{p}}_{1} \\ & =(1.4 \text{kg}\cdot \text{m/s})\overset{^}{j}-(−1.4 \text{kg}\cdot \text{m/s})\overset{^}{j} \\ & =+(2.8 \text{kg}\cdot \text{m/s})\overset{^}{j}.\end{matrix}$$
- What was Earth’s change of momentum due to the ball colliding with the floor?

Your instinctive response may well have been either “zero; the Earth is just too massive for that tiny ball to have affected it” or possibly, “more than zero, but utterly negligible.” But no—if we re-define our system to be the Superball + Earth, then this system is closed (neglecting the gravitational pulls of the Sun, the Moon, and the other planets in the solar system), and therefore the total change of momentum of this new system must be zero. Therefore, Earth’s change of momentum is exactly the same magnitude:
$$\Delta {\overset{\to}{p}}_{\text{Earth}}=−2.8 \text{kg}\cdot \text{m/s}\overset{^}{j}.$$
- What was Earth’s change of velocity as a result of this collision?

This is where your instinctive feeling is probably correct:
$$\begin{matrix}\Delta {\overset{\to}{v}}_{\text{Earth}} & =\frac{\Delta {\overset{\to}{p}}_{\text{Earth}}}{{M}_{\text{Earth}}} \\ & =-\frac{2.8 \text{kg}\cdot \text{m/s}}{5.97 \times {10}^{24} \text{kg}}\overset{^}{j} \\ & =-(4.7 \times {10}^{−25} \text{m/s})\overset{^}{j}.\end{matrix}$$
This change of Earth’s velocity *is* utterly negligible.

#### Significance
It is important to realize that the answer to part (c) is not a velocity; it is a change of velocity, which is a very different thing. Nevertheless, to give you a feel for just how small that change of velocity is, suppose you were moving with a velocity of $4.7 \times {10}^{−25} \text{m/s}$. At this speed, it would take you about 7 million years to travel a distance equal to the diameter of a hydrogen atom.

### Check Your Understanding 9.4

 Would the ball’s change of momentum have been larger, smaller, or the same, if it had collided with the floor and stopped (without bouncing)?

### Example 9.8

#### Ice Hockey 1
Two hockey pucks of identical mass are on a flat, horizontal ice hockey rink. The red puck is motionless; the blue puck is moving at 2.5 m/s to the left (Figure 9.18). It collides with the motionless red puck. The pucks have a mass of 15 g. After the collision, the red puck is moving at 2.5 m/s, to the left. What is the final velocity of the blue puck?

*Figure 9.18 Two identical hockey pucks colliding. The top diagram shows the pucks the instant before the collision, and the bottom diagram show the pucks the instant after the collision. The net external force is zero.* (Alt: Two hockey pucks are shown. The top diagram shows the puck on the left with 0 meters per second and the puck on the right moving to the left with 2.5 meters per second. The bottom diagram shows the puck on the left moving to the left at 2.5 meters per second and the puck on the right moving with unknown v.)

#### Strategy
We’re told that we have two colliding objects, we’re told the masses and initial velocities, and one final velocity; we’re asked for both final velocities. Conservation of momentum seems like a good strategy. Define the system to be the two pucks; there’s no friction, so we have a closed system.

Before you look at the solution, what do you think the answer will be?

The blue puck final velocity will be:

- zero

- 2.5 m/s to the left

- 2.5 m/s to the right

- 1.25 m/s to the left

- 1.25 m/s to the right

- something else

#### Solution
Define the +*x*-direction to point to the right. Conservation of momentum then reads
$$\begin{matrix}{\overset{\to}{p}}_{f} & = & {\overset{\to}{p}}_{i} \\ m{v}_{{\text{r}}_{\text{f}}}\overset{^}{i}+m{v}_{{\text{b}}_{\text{f}}}\overset{^}{i} & = & m{v}_{{\text{r}}_{\text{i}}}\overset{^}{i}-m{v}_{{\text{b}}_{\text{i}}}\overset{^}{i}.\end{matrix}$$
Before the collision, the momentum of the system is entirely and only in the blue puck. Thus,
$$\begin{matrix}m{v}_{{\text{r}}_{\text{f}}}\overset{^}{i}+m{v}_{{\text{b}}_{\text{f}}}\overset{^}{i} & = & -m{v}_{{\text{b}}_{\text{i}}}\overset{^}{i} \\ {v}_{{\text{r}}_{\text{f}}}\overset{^}{i}+{v}_{{\text{b}}_{\text{f}}}\overset{^}{i} & = & -{v}_{{\text{b}}_{\text{i}}}\overset{^}{i}.\end{matrix}$$
(Remember that the masses of the pucks are equal.) Substituting numbers:
$$\begin{matrix}-(2.5 \text{m/s})\overset{^}{i}+{\overset{\to}{v}}_{{\text{b}}_{\text{f}}} & = & -(2.5 \text{m/s})\overset{^}{i} \\ {\overset{\to}{v}}_{{\text{b}}_{\text{f}}} & = & 0.\end{matrix}$$
#### Significance
Evidently, the two pucks simply exchanged momentum. The blue puck transferred all of its momentum to the red puck. In fact, this is what happens in similar collision where ${m}_{1}={m}_{2}.$

### Check Your Understanding 9.5

 Even if there were some friction on the ice, it is still possible to use conservation of momentum to solve this problem, but you would need to impose an additional condition on the problem. What is that additional condition?

### Example 9.9

#### Landing of *Philae*
On November 12, 2014, the European Space Agency successfully landed a probe named *Philae* on Comet 67P/Churyumov/Gerasimenko (Figure 9.19). During the landing, however, the probe actually landed three times, because it bounced twice. Let’s calculate how much the comet’s speed changed as a result of the first bounce.

*Figure 9.19 An artist’s rendering of Philae landing on a comet. (credit: modification of work by “DLR German Aerospace Center”/Flickr)* (Alt: An artist’s rendering of Philae landing on a comet.)

Let’s define upward to be the +*y*-direction, perpendicular to the surface of the comet, and $y=0$ to be at the surface of the comet. Here’s what we know:

- The mass of Comet 67P: ${M}_{c}=1.0 \times {10}^{13} \text{kg}$

- The acceleration due to the comet’s gravity: $\overset{\to}{a}=-(5.0 \times {10}^{−3} {\text{m/s}}^{2})\overset{^}{j}$

- *Philae’s* mass: ${M}_{p}=96 \text{kg}$

- Initial touchdown speed: ${\overset{\to}{v}}_{1}=-(1.0 \text{m/s})\overset{^}{j}$

- Initial upward speed due to first bounce: ${\overset{\to}{v}}_{2}=(0.38 \text{m/s})\overset{^}{j}$

- Landing impact time: $\Delta t=1.3 \text{s}$

#### Strategy
We’re asked for how much the comet’s speed changed, but we don’t know much about the comet, beyond its mass and the acceleration its gravity causes. However, we *are* told that the *Philae* lander collides with (lands on) the comet, and bounces off of it. A collision suggests momentum as a strategy for solving this problem.

If we define a system that consists of both *Philae* and Comet 67/P, then there is no net external force on this system, and thus the momentum of this system is conserved. (We’ll neglect the gravitational force of the sun.) Thus, if we calculate the change of momentum of the lander, we automatically have the change of momentum of the comet. Also, the comet’s change of velocity is directly related to its change of momentum as a result of the lander “colliding” with it.

#### Solution
Let ${\overset{\to}{p}}_{1}$ be *Philae’s* momentum at the moment just before touchdown, and ${\overset{\to}{p}}_{2}$ be its momentum just after the first bounce. Then its momentum just before landing was
$${\overset{\to}{p}}_{1}={M}_{p}{\overset{\to}{v}}_{1}=(96 \text{kg})(-1.0 \text{m/s}\overset{^}{j})=-(96 \text{kg}\cdot \text{m/s})\overset{^}{j}$$
and just after was
$${\overset{\to}{p}}_{2}={M}_{p}{\overset{\to}{v}}_{2}=(96 \text{kg})(+0.38 \text{m/s}\overset{^}{j})=(36.5 \text{kg}\cdot \text{m/s})\overset{^}{j}.$$
Therefore, the lander’s change of momentum during the first bounce is
$$\begin{matrix}\Delta \overset{\to}{p}={\overset{\to}{p}}_{2}-{\overset{\to}{p}}_{1} \\ & =(36.5 \text{kg}\cdot \text{m/s})\overset{^}{j}-(−96.0 \text{kg}\cdot \text{m/s}\overset{^}{j})=(133 \text{kg}\cdot \text{m/s})\overset{^}{j}\end{matrix}$$
Notice how important it is to include the negative sign of the initial momentum.

Now for the comet. Since momentum of the system must be conserved, the *comet’s* momentum changed by exactly the negative of this:
$$\Delta {\overset{\to}{p}}_{c}=-\Delta \overset{\to}{p}=-(133 \text{kg}\cdot \text{m/s})\overset{^}{j}.$$
Therefore, its change of velocity is
$$\Delta {\overset{\to}{v}}_{c}=\frac{\Delta {\overset{\to}{p}}_{c}}{{M}_{c}}=\frac{-(133 \text{kg}\cdot \text{m/s})\overset{^}{j}}{1.0 \times {10}^{13} \text{kg}}=-(1.33 \times {10}^{−11} \text{m/s})\overset{^}{j}.$$
#### Significance
This is a very small change in velocity, about a thousandth of a billionth of a meter per second. Crucially, however, it is *not* zero.

### Check Your Understanding 9.6

 The changes of momentum for *Philae* and for Comet 67/P were equal (in magnitude). Were the impulses experienced by *Philae* and the comet equal? How about the forces? How about the changes of kinetic energies?
