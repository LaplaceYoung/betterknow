# 7.3 Work-Energy Theorem

Title: 7.3 Work-Energy Theorem
Book: University Physics Volume 1
Authors: William Moebs, Samuel J. Ling, Jeff Sanny
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem
Access for free at: https://openstax.org/books/university-physics-volume-1/pages/1-introduction
Course-aliases: 大学物理, University Physics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 7.3 Work-Energy Theorem

## 7.3   Work-Energy Theorem

### Learning Objectives

By the end of this section, you will be able to:

- Apply the work-energy theorem to find information about the motion of a particle, given the forces acting on it
- Use the work-energy theorem to find information about the forces acting on a particle, given information about its motion

We have discussed how to find the work done on a particle by the forces that act on it, but how is that work manifested in the motion of the particle? According to Newton's second law of motion, the sum of all the forces acting on a particle, or the net force, determines the rate of change in the momentum of the particle, or its motion. Therefore, we should consider the work done by all the forces acting on a particle, or the net work, to see what effect it has on the particle's motion.

Let's start by looking at the net work done on a particle as it moves over an infinitesimal displacement, which is the dot product of the net force and the displacement: $dW_{\text{net}} = \mathbf{\overset{\rightarrow}{F}}_{\text{net}} \cdot d\mathbf{\overset{\rightarrow}{r}}.$ Newton's second law tells us that $\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = m(d\mathbf{\overset{\rightarrow}{v}}\text{/}dt),$ so $dW_{\text{net}} = m(d\mathbf{\overset{\rightarrow}{v}}\text{/}dt) \cdot d\mathbf{\overset{\rightarrow}{r}}.$ For the mathematical functions describing the motion of a physical particle, we can rearrange the differentials *dt*, etc., as algebraic quantities in this expression, that is,

$$dW_{\text{net}} = m\left( \frac{d\mathbf{\overset{\rightarrow}{v}}}{dt} \right) \cdot d\mathbf{\overset{\rightarrow}{r}} = md\mathbf{\overset{\rightarrow}{v}} \cdot \left( \frac{d\mathbf{\overset{\rightarrow}{r}}}{dt} \right) = m\mathbf{\overset{\rightarrow}{v}} \cdot d\mathbf{\overset{\rightarrow}{v}},$$

where we substituted the velocity for the time derivative of the displacement and used the commutative property of the dot product \[Equation 2.30\]. Since derivatives and integrals of scalars are probably more familiar to you at this point, we express the dot product in terms of Cartesian coordinates before we integrate between any two points *A* and *B* on the particle's trajectory. This gives us the net work done on the particle:

$$\begin{array}{cl}
W_{\text{net},AB} & {= {\int_{A}^{B}{(mv_{x}dv_{x} + mv_{y}dv_{y} + mv_{z}dv_{z})}}} \\
 & {= \frac{1}{2}m\left| \left. {v_{x}^{2} + v_{y}^{2} + v_{z}^{2}} \right| \right._{A}^{B} = \left| \left. {\frac{1}{2}mv^{2}} \right| \right._{A}^{B} = K_{B} - K_{A}.}
\end{array}$$

(7.8)

In the middle step, we used the fact that the square of the velocity is the sum of the squares of its Cartesian components, and in the last step, we used the definition of the particle's kinetic energy. This important result is called the work-energy theorem (Figure 7.11).

### Work-Energy Theorem

The net work done on a particle equals the change in the particle's kinetic energy:

$$W_{\text{net}} = K_{B} - K_{A}.$$

(7.9)

*Figure 7.11* Horse pulls are common events at state fairs. The work done by the horses pulling on the load results in a change in kinetic energy of the load, ultimately going faster. (credit: modification of work by “Jassen”/ Flickr) (Alt: A photograph of horses pulling a loaded cart at a fair.)

According to this theorem, when an object slows down, its final kinetic energy is less than its initial kinetic energy, the change in its kinetic energy is negative, and so is the net work done on it. If an object speeds up, the net work done on it is positive. When calculating the net work, you must include all the forces that act on an object. If you leave out any forces that act on an object, or if you include any forces that don't act on it, you will get a wrong result.

The importance of the work-energy theorem, and the further generalizations to which it leads, is that it makes some types of calculations much simpler to accomplish than they would be by trying to solve Newton's second law. For example, in Newton's Laws of Motion, we found the speed of an object sliding down a frictionless plane by solving Newton's second law for the acceleration and using kinematic equations for constant acceleration, obtaining

$$v_{\text{f}}^{2} = v_{\text{i}}^{2} + 2g(s_{\text{f}} - s_{\text{i}})\text{sin}\ \theta,$$

where *s* is the displacement down the plane.

We can also get this result from the work-energy theorem in Equation 7.1. Since only two forces are acting on the object-gravity and the normal force-and the normal force doesn't do any work, the net work is just the work done by gravity. The work dW is the dot product of the force of gravity or $\overset{\rightarrow}{\mathbf{F}} = - \text{mg}\hat{\text{j}}$ and the displacement $\overset{\rightarrow}{dr} = dx\hat{i} + dy\hat{j}$. After taking the dot product and integrating from an initial position $y_{i}$ to a final position $y_{f}$, one finds the net work as

$$W_{\text{net}} = W_{\text{grav}} = \text{−}mg(y_{\text{f}} - y_{\text{i}}),$$

where *y* is positive up. The work-energy theorem says that this equals the change in kinetic energy:

$$\text{−}mg(y_{\text{f}} - y_{\text{i}}) = \frac{1}{2}m(v_{\text{f}}^{2} - v_{\text{i}}^{2}).$$

Using a right triangle, we can see that $(y_{\text{f}} - y_{\text{i}}) = (s_{\text{f}} - s_{\text{i}})\text{sin}\ \theta,$ so the result for the final speed is the same.

What is gained by using the work-energy theorem? The answer is that for a frictionless plane surface, not much. However, Newton's second law is easy to solve only for this particular case, whereas the work-energy theorem gives the final speed for any shaped frictionless surface. For an arbitrary curved surface, the normal force is not constant, and Newton's second law may be difficult or impossible to solve analytically. Constant or not, for motion along a surface, the normal force never does any work, because it's perpendicular to the displacement. A calculation using the work-energy theorem avoids this difficulty and applies to more general situations.

### Problem-Solving Strategy

#### Work-Energy Theorem

1.  Draw a free-body diagram for each force on the object.
2.  Determine whether or not each force does work over the displacement in the diagram. Be sure to keep any positive or negative signs in the work done.
3.  Add up the total amount of work done by each force.
4.  Set this total work equal to the change in kinetic energy and solve for any unknown parameter.
5.  Check your answers. If the object is traveling at a constant speed or zero acceleration, the total work done should be zero and match the change in kinetic energy. If the total work is positive, the object must have sped up or increased kinetic energy. If the total work is negative, the object must have slowed down or decreased kinetic energy.

### Example  7.9

#### Loop-the-Loop

The frictionless track for a toy car includes a loop-the-loop of radius *R*. How high, measured from the bottom of the loop, must the car be placed to start from rest on the approaching section of track and go all the way around the loop?

*Figure 7.12* A frictionless track for a toy car has a loop-the-loop in it. How high must the car start so that it can go around the loop without falling off? (Alt: A track descends to the ground, forms a circular loop of radius R, then continues horizontally at ground level. Point 1 is before the loop, near the start of the track at elevation y sub 1 above the ground. Point 2 is at the top of the loop, at elevation y sub 2 = 2 R. At point 2, there are 2 forces, N and m g. Both forces point vertically down.)

#### Strategy

The free-body diagram at the final position of the object is drawn in Figure 7.12. The gravitational work is the only work done over the displacement that is not zero. Since the weight points in the same direction as the net vertical displacement, the total work done by the gravitational force is positive. From the work-energy theorem, the starting height determines the speed of the car at the top of the loop,

$$–mg(y_{2} - y_{1}) = \frac{1}{2}mv_{2}{}^{2},$$

where the notation is shown in the accompanying figure. At the top of the loop, the normal force and gravity are both down and the acceleration is centripetal, so

$$a_{\text{top}} = \frac{F}{m} = \frac{N + mg}{m} = \frac{v_{2}^{2}}{R}.$$

The condition for maintaining contact with the track is that there must be some normal force, however slight; that is, $N > 0$. Substituting for $v_{2}^{2}$ and *N*, we can find the condition for $y_{1}$.

#### Solution

Implement the steps in the strategy to arrive at the desired result:

$$N = \text{−}mg + \frac{mv_{2}^{2}}{R} = \frac{\text{−}mgR + 2mg(y_{1} - 2R)}{R} > 0\quad\text{or}\quad y_{1} > \frac{5R}{2}.$$

#### Significance

On the surface of the loop, the normal component of gravity and the normal contact force must provide the centripetal acceleration of the car going around the loop. The tangential component of gravity slows down or speeds up the car. A child would find out how high to start the car by trial and error, but now that you know the work-energy theorem, you can predict the minimum height (as well as other more useful results) from physical principles. By using the work-energy theorem, you did not have to solve a differential equation to determine the height.

### Check Your Understanding  7.7

Suppose the radius of the loop-the-loop in Example 7.9 is 15 cm and the toy car starts from rest at a height of 45 cm above the bottom. What is its speed at the top of the loop?

### Interactive

Watch this video to see a looping rollercoaster.

In situations where the motion of an object is known, but the values of one or more of the forces acting on it are not known, you may be able to use the work-energy theorem to get some information about the forces. Work depends on the force and the distance over which it acts, so the information is provided via their product.

### Example  7.10

#### Determining a Stopping Force

A bullet has a mass of 40 grains (2.60 g) and a muzzle velocity of 1100 ft./s (335 m/s). It can penetrate eight 1-inch pine boards, each with thickness 0.75 inches. What is the average stopping force exerted by the wood, as shown in Figure 7.13?

*Figure 7.13* The boards exert a force to stop the bullet. As a result, the boards do work and the bullet loses kinetic energy. (Alt: In figure a, a bullet is moving horizontally at a speed of 335 meters per second toward a set of 8 boards, arranged in a horizontal stack. In figure b, the bullet has passed through the stack of boards and has stopped at the far end of the last board. The stopping distance is indicated as the width of the stack of boards.)

#### Strategy

We can assume that under the general conditions stated, the bullet loses all its kinetic energy penetrating the boards, so the work-energy theorem says its initial kinetic energy is equal to the average stopping force times the distance penetrated. The change in the bullet's kinetic energy and the net work done stopping it are both negative, so when you write out the work-energy theorem, with the net work equal to the average force times the stopping distance, that's what you get. The total thickness of eight 1-inch pine boards that the bullet penetrates is $8\  \times \ \frac{3}{4}\ \text{in}\text{.} = 6\ \text{in}\text{.} = 15.2\ \text{cm}\text{.}$

#### Solution

Applying the work-energy theorem, we get

$$W_{\text{net}} = \text{−}F_{\text{ave}}\text{Δ}s_{\text{stop}} = \text{−}K_{\text{initial}},$$

$$F_{\text{ave}} = \frac{\frac{1}{2}mv^{2}}{\text{Δ}s_{\text{stop}}} = \frac{\frac{1}{2}(2.6\  \times \ 10^{-3}\text{kg}){(335\ \text{m/s})}^{2}}{0.152\ \text{m}} = 960\ \text{N}\text{.}$$

#### Significance

We could have used Newton's second law and kinematics in this example, but the work-energy theorem also supplies an answer to less simple situations. The penetration of a bullet, fired vertically upward into a block of wood, is discussed in one section of Asif Shakur's recent article \["Bullet-Block Science Video Puzzle." *The Physics Teacher* (January 2015) 53(1): 15-16\]. If the bullet is fired dead center into the block, it loses all its kinetic energy and penetrates slightly farther than if fired off-center. The reason is that if the bullet hits off-center, it has a little kinetic energy after it stops penetrating, because the block rotates. The work-energy theorem implies that a smaller change in kinetic energy results in a smaller penetration. You will understand more of the physics in this interesting article after you finish reading Angular Momentum.

### Interactive

Learn more about work and energy in this PhET simulation called "the ramp." Try changing the force pushing the box and the frictional force along the incline. The work and energy plots can be examined to note the total work done and change in kinetic energy of the box.
