# 5.3 Newton's Second Law

Title: 5.3 Newton's Second Law
Book: University Physics Volume 1
Authors: William Moebs, Samuel J. Ling, Jeff Sanny
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law
Access for free at: https://openstax.org/books/university-physics-volume-1/pages/1-introduction
Course-aliases: 大学物理, University Physics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 5.3 Newton's Second Law

### Learning Objectives

By the end of this section, you will be able to:

- Distinguish between external and internal forces
- Describe Newton's second law of motion
- Explain the dependence of acceleration on net force and mass

Newton's second law is closely related to his first law. It mathematically gives the cause-and-effect relationship between force and changes in motion. Newton's second law is quantitative and is used extensively to calculate what happens in situations involving a force. Before we can write down Newton's second law as a simple equation that gives the exact relationship of force, mass, and acceleration, we need to sharpen some ideas we mentioned earlier.

### Force and Acceleration

First, what do we mean by a change in motion? The answer is that a change in motion is equivalent to a change in velocity. A change in velocity means, by definition, that there is acceleration. Newton's first law says that a net external force causes a change in motion; thus, we see that a *net external force causes nonzero acceleration*.

We defined external force in Forces as force acting on an object or system that originates outside of the object or system. Let's consider this concept further. An intuitive notion of *external* is correct---it is outside the system of interest. For example, in Figure 5.10(a), the system of interest is the car plus the person within it. The two forces exerted by the two students are external forces. In contrast, an internal force acts between elements of the system. Thus, the force the person in the car exerts to hang on to the steering wheel is an internal force between elements of the system of interest. Only external forces affect the motion of a system, according to Newton's first law. (The internal forces cancel each other out, as explained in the next section.) Therefore, we must define the boundaries of the system before we can determine which forces are external. Sometimes, the system is obvious, whereas at other times, identifying the boundaries of a system is more subtle. The concept of a system is fundamental to many areas of physics, as is the correct application of Newton's laws. This concept is revisited many times in the study of physics.

*Figure 5.10* Different forces exerted on the same mass produce different accelerations. (a) Two students push a stalled car. All external forces acting on the car are shown. (b) The forces acting on the car are transferred to a coordinate plane (free-body diagram) for simpler analysis. (c) The tow truck can produce greater external force on the same mass, and thus greater acceleration. (Alt: Figure a shows two people pushing a car with forces F1 and F2 in the right direction. Acceleration a is also in the same direction. Frictional force f is shown near the tire in the opposite direction, left. Upward force N and downward force W are equal in magnitude and are shown near the ground. Figure b puts all the forces of figure a together and shows a net force F net. These forces are also shown in a free body diagram. Figure c shows the car being towed by a tow-truck. Here, the forces N, W and f are the same as those in figure a. F subscript tow truck has a greater magnitude than F1 or F2. Acceleration a prime has a greater magnitude than a. All forces of this system are also shown in a free body diagram.)

From this example, you can see that different forces exerted on the same mass produce different accelerations. In Figure 5.10(a), the two students push a car with a driver in it. Arrows representing all external forces are shown. The system of interest is the car and its driver. The weight $\mathbf{\overset{\rightarrow}{w}}$ of the system and the support of the ground $\mathbf{\overset{\rightarrow}{N}}$ are also shown for completeness and are assumed to cancel (because there was no vertical motion and no imbalance of forces in the vertical direction to create a change in motion). The vector $\mathbf{\overset{\rightarrow}{f}}$ represents the friction acting on the car, and it acts to the left, opposing the motion of the car. (We discuss friction in more detail in the next chapter.) In Figure 5.10(b), all external forces acting on the system add together to produce the net force $\mathbf{\overset{\rightarrow}{F}}_{\text{net}}.$ The free-body diagram shows all of the forces acting on the system of interest. The dot represents the center of mass of the system. Each force vector extends from this dot. Because there are two forces acting to the right, the vectors are shown collinearly. Finally, in Figure 5.10(c), a larger net external force produces a larger acceleration $(\mathbf{\overset{\rightarrow}{a^{\prime}}} > \mathbf{\overset{\rightarrow}{a}})$ when the tow truck pulls the car.

It seems reasonable that acceleration would be directly proportional to and in the same direction as the net external force acting on a system. This assumption has been verified experimentally and is illustrated in Figure 5.10. To obtain an equation for Newton's second law, we first write the relationship of acceleration $\mathbf{\overset{\rightarrow}{a}}$ and net external force $\mathbf{\overset{\rightarrow}{F}}_{\text{net}}$ as the proportionality

$$\mathbf{\overset{\rightarrow}{a}} \propto \mathbf{\overset{\rightarrow}{F}}_{\text{net}}$$

where the symbol $\propto$ means "proportional to." (Recall from Forces that the net external force is the vector sum of all external forces and is sometimes indicated as ${\sum\mathbf{\overset{\rightarrow}{F}}}.$) This proportionality shows what we have said in words---acceleration is directly proportional to net external force. Once the system of interest is chosen, identify the external forces and ignore the internal ones. It is a tremendous simplification to disregard the numerous internal forces acting between objects within the system, such as muscular forces within the students' bodies, let alone the myriad forces between the atoms in the objects. Still, this simplification helps us solve some complex problems.

It also seems reasonable that acceleration should be inversely proportional to the mass of the system. In other words, the larger the mass (the inertia), the smaller the acceleration produced by a given force. As illustrated in Figure 5.11, the same net external force applied to a basketball produces a much smaller acceleration when it is applied to an SUV. The proportionality is written as

$$a \propto \frac{1}{m},$$

where *m* is the mass of the system and *a* is the magnitude of the acceleration. Experiments have shown that acceleration is exactly inversely proportional to mass, just as it is directly proportional to net external force.

*Figure 5.11* The same force exerted on systems of different masses produces different accelerations. (a) A basketball player pushes on a basketball to make a pass. (Ignore the effect of gravity on the ball.) (b) The same player exerts an identical force on a stalled SUV and produces far less acceleration. (c) The free-body diagrams are identical, permitting direct comparison of the two situations. A series of patterns for free-body diagrams will emerge as you do more problems and learn how to draw them in Drawing Free-Body Diagrams . (Alt: Figure a shows a person exerting force F on a basketball with mass m1. The ball is shown to move to the rigth with an acceleration a1. Figure b shows the person exerting the same amount of force, F on an SUV with mass m2. The acceleration is a2, which is much smaller than a1. Figure c shows the free body diagrams of both systems shown in figure a and figure b. Both show the force F having the same magnitude and direction. The label reads: the free-body diagrams of both objects are the same.)

It has been found that the acceleration of an object depends only on the net external force and the mass of the object. Combining the two proportionalities just given yields Newton's second law.

### Newton's Second Law of Motion

The acceleration of a system is directly proportional to and in the same direction as the net external force acting on the system and is inversely proportional to its mass. In equation form, Newton's second law is

$$\mathbf{\overset{\rightarrow}{a}} = \frac{\mathbf{\overset{\rightarrow}{F}}_{\text{net}}}{m},$$
$\mathbf{\overset{\rightarrow}{a}}$ is the acceleration, $\mathbf{\overset{\rightarrow}{F}}_{\text{net}}$ is the net force, and *m* is the mass. This is often written in the more familiar form

$$\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = {\sum{\mathbf{\overset{\rightarrow}{F}} = m\mathbf{\overset{\rightarrow}{a}}}},$$

(5.3)

but the first equation gives more insight into what Newton's second law means. When only the magnitude of force and acceleration are considered, this equation can be written in the simpler scalar form:

$$F_{\text{net}} = ma.$$

(5.4)

The law is a cause-and-effect relationship among three quantities that is not simply based on their definitions. The validity of the second law is based on experimental verification. The free-body diagram, which you will learn to draw in Drawing Free-Body Diagrams, is the basis for writing Newton's second law.

### Example  5.2

#### What Acceleration Can a Person Produce When Pushing a Lawn Mower?

Suppose that the net external force (push minus friction) exerted on a lawn mower is 51 N (about 11 lb.) parallel to the ground (Figure 5.12). The mass of the mower is 24 kg. What is its acceleration?

*Figure 5.12* (a) The net force on a lawn mower is 51 N to the right. At what rate does the lawn mower accelerate to the right? (b) The free-body diagram for this problem is shown. (Alt: Figure a shows a person using a lawn mower on a lawn. Force F net points right, from the person’s hands. Figure b shows the force F net along the positive x axis.)

#### Strategy

This problem involves only motion in the horizontal direction; we are also given the net force, indicated by the single vector, but we can suppress the vector nature and concentrate on applying Newton's second law. Since $F_{\text{net}}$ and *m* are given, the acceleration can be calculated directly from Newton's second law as $F_{\text{net}} = ma.$

#### Solution

The magnitude of the acceleration *a* is $a = {F_{\text{net}}\text{/}m}$. Entering known values gives

$$a = \frac{51\ \text{N}}{24\ \text{kg}}.$$

Substituting the unit of kilograms times meters per square second for newtons yields

$$a = \frac{51\ \text{kg} \cdot \text{m/s}^{2}}{24\ \text{kg}} = 2.1\ \text{m/s}^{2}.$$

#### Significance

The direction of the acceleration is the same direction as that of the net force, which is parallel to the ground. This is a result of the vector relationship expressed in Newton's second law, that is, the vector representing net force is the scalar multiple of the acceleration vector. There is no information given in this example about the individual external forces acting on the system, but we can say something about their relative magnitudes. For example, the force exerted by the person pushing the mower must be greater than the friction opposing the motion (since we know the mower moved forward), and the vertical forces must cancel because no acceleration occurs in the vertical direction (the mower is moving only horizontally). The acceleration found is small enough to be reasonable for a person pushing a mower. Such an effort would not last too long, because the person's top speed would soon be reached.

### Check Your Understanding  5.3

At the time of its launch, the HMS *Titanic* was the most massive mobile object ever built, with a mass of $6.0\  \times \ 10^{7}\ \text{kg}$. If a force of 6 MN $(6\  \times \ 10^{6}\ \text{N})$ was applied to the ship, what acceleration would it experience?

In the preceding example, we dealt with net force only for simplicity. However, several forces act on the lawn mower. The weight $\mathbf{\overset{\rightarrow}{w}}$ (discussed in detail in Mass and Weight) pulls down on the mower, toward the center of Earth; this produces a contact force on the ground. The ground must exert an upward force on the lawn mower, known as the normal force $\mathbf{\overset{\rightarrow}{N}}$, which we define in Common Forces. These forces are balanced and therefore do not produce vertical acceleration. In the next example, we show both of these forces. As you continue to solve problems using Newton's second law, be sure to show multiple forces.

### Example  5.3

#### Which Force Is Bigger?

\(a\) The car shown in Figure 5.13 is moving at a constant speed. Which force is bigger, $\mathbf{\overset{\rightarrow}{F}}_{\text{friction}}$ or $\mathbf{\overset{\rightarrow}{F}}_{\text{drag}}$? Explain.

\(b\) The same car is now accelerating to the right. Which force is bigger, $\mathbf{\overset{\rightarrow}{F}}_{\text{friction}}$ or $\mathbf{\overset{\rightarrow}{F}}_{\text{drag}}?$ Explain.

*Figure 5.13* A car is shown (a) moving at constant speed and (b) accelerating. How do the forces acting on the car compare in each case? (a) What does the knowledge that the car is moving at constant velocity tell us about the net horizontal force on the car compared to the friction force? (b) What does the knowledge that the car is accelerating tell us about the horizontal force on the car compared to the friction force? (Alt: Figure a shows a car with velocity 10 meters per second, moving right. F subscript engine right and F subscript friction points left. Figure b shows the car moving with an acceleration of 10 meters per second squared, towards the right. Forces F subscript engine and F subscript friction are the same as those in figure a.)

#### Strategy

We must consider Newton's first and second laws to analyze the situation. We need to decide which law applies; this, in turn, will tell us about the relationship between the forces.

#### Solution

a.  The forces are equal. According to Newton's first law, if the net force is zero, the velocity is constant.
b.  In this case, $\mathbf{\overset{\rightarrow}{F}}_{\text{friction}}$ must be larger than $\mathbf{\overset{\rightarrow}{F}}_{\text{drag}}.$ According to Newton's second law, a net force is required to cause acceleration.

#### Significance

These questions may seem trivial, but they are commonly answered incorrectly. For a car or any other object to move, it must be accelerated from rest to the desired speed; this requires that the friction force be greater than the drag force. Once the car is moving at constant velocity, the net force must be zero; otherwise, the car will accelerate (gain speed). To solve problems involving Newton's laws, we must understand whether to apply Newton's first law (where ${\sum\mathbf{\overset{\rightarrow}{F}}} = \mathbf{\overset{\rightarrow}{0}}$) or Newton's second law (where $\sum\mathbf{\overset{\rightarrow}{F}}$ is not zero). This will be apparent as you see more examples and attempt to solve problems on your own.

### Example  5.4

#### What Rocket Thrust Accelerates This Sled?

Before space flights carrying astronauts, rocket sleds were used to test aircraft, missile equipment, and physiological effects on human subjects at high speeds. They consisted of a platform that was mounted on one or two rails and propelled by several rockets.

Calculate the magnitude of force exerted by each rocket, called its thrust *T*, for the four-rocket propulsion system shown in Figure 5.14. The sled's initial acceleration is $49\ \text{m/s}^{2}$, the mass of the system is 2100 kg, and the force of friction opposing the motion is 650 N.

*Figure 5.14* A sled experiences a rocket thrust that accelerates it to the right. Each rocket creates an identical thrust T . The system here is the sled, its rockets, and its rider, so none of the forces between these objects are considered. The arrow representing friction $(\mathbf{\overset{\rightarrow}{f}})$ is drawn larger than scale. (Alt: Figure shows a sled going right. It has four rockets at the back, with each thrust vector having the same magnitude and pointing right. Friction f points left. The upward normal force N and downward weight, are both equal in magnitude. Acceleration a is towards the right. All these forces are also shown in a free body diagram.)

#### Strategy

Although forces are acting both vertically and horizontally, we assume the vertical forces cancel because there is no vertical acceleration. This leaves us with only horizontal forces and a simpler one-dimensional problem. Directions are indicated with plus or minus signs, with right taken as the positive direction. See the free-body diagram in Figure 5.14.

#### Solution

Since acceleration, mass, and the force of friction are given, we start with Newton's second law and look for ways to find the thrust of the engines. We have defined the direction of the force and acceleration as acting "to the right," so we need to consider only the magnitudes of these quantities in the calculations. Hence we begin with

$$F_{\text{net}} = ma$$
$F_{\text{net}}$ is the net force along the horizontal direction. We can see from the figure that the engine thrusts add, whereas friction opposes the thrust. In equation form, the net external force is

$$F_{\text{net}} = 4T - f.$$

Substituting this into Newton's second law gives us

$$F_{\text{net}} = ma = 4T - f.$$

Using a little algebra, we solve for the total thrust 4*T*:

$$4T = ma + f.$$

Substituting known values yields

$$\left. 4T = ma + f = \left( {2100\ \text{kg}} \right)\left( {49\ {\text{m}\text{/}\text{s}}^{2}} \right. \right) + 650\ \text{N}.$$

Therefore, the total thrust is

$$4T = 1.0\  \times \ 10^{5}\ \text{N},$$

and the individual thrusts are

$$T = \frac{1.0\  \times \ 10^{5}\ \text{N}}{4} = 2.5\  \times \ 10^{4}\ \text{N}.$$

#### Significance

The numbers are quite large, so the result might surprise you. Experiments such as this were performed in the early 1960s to test the limits of human endurance, and the setup was designed to protect human subjects in jet fighter emergency ejections. Speeds of 1000 km/h were obtained, with accelerations of 45 *g*'s. (Recall that *g*, acceleration due to gravity, is $9.80\ \text{m/s}^{2}$. When we say that acceleration is 45 *g*'s, it is $45\  \times \ 9.8\ \text{m/s}^{2},$ which is approximately $440\ \text{m/s}^{2}$.) Although living subjects are not used anymore, land speeds of 10,000 km/h have been obtained with a rocket sled.

In this example, as in the preceding one, the system of interest is obvious. We see in later examples that choosing the system of interest is crucial---and the choice is not always obvious.

Newton's second law is more than a definition; it is a relationship among acceleration, force, and mass. It can help us make predictions. Each of those physical quantities can be defined independently, so the second law tells us something basic and universal about nature.

### Check Your Understanding  5.4

A 550-kg sports car collides with a 2200-kg truck, and during the collision, the net force on each vehicle is the force exerted by the other. If the magnitude of the truck's acceleration is $10\ \text{m/s}^{2},$ what is the magnitude of the sports car's acceleration?

### Component Form of Newton's Second Law

We have developed Newton's second law and presented it as a vector equation in Equation 5.3. This vector equation can be written as three component equations:

$${\sum\mathbf{F}_{x}} = m\mathbf{a}_{x},\ {\sum\mathbf{F}_{y}} = m\mathbf{a}_{y},\ \text{and}\ {\sum\mathbf{F}_{z}} = m\mathbf{a}_{z}.$$

(5.5)

The second law is a description of how a body responds mechanically to its environment. The influence of the environment is the net force $\mathbf{\overset{\rightarrow}{F}}_{\text{net}},$ the body's response is the acceleration $\mathbf{\overset{\rightarrow}{a}},$ and the strength of the response is inversely proportional to the mass *m*. The larger the mass of an object, the smaller its response (its acceleration) to the influence of the environment (a given net force). Therefore, a body's mass is a measure of its inertia, as we explained in Newton's First Law.

### Example  5.5

#### Force on a Soccer Ball

A 0.400-kg soccer ball is kicked across the field by a player; it undergoes acceleration given by $\mathbf{\overset{\rightarrow}{a}} = 3.00\mathbf{\hat{i}} + 7.00\mathbf{\hat{j}}\ \text{m/s}^{2}.$ Find (a) the resultant force acting on the ball and (b) the magnitude and direction of the resultant force.

#### Strategy

The vectors in $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ format, which indicate force direction along the *x*-axis and the *y*-axis, respectively, are involved, so we apply Newton's second law in vector form.

#### Solution

a.  We apply Newton's second law:

    :::
    $$\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = m\mathbf{\overset{\rightarrow}{a}} = \left( {0.400\ \text{kg}} \right)\left( {3.00\mathbf{\hat{i}} + 7.00\mathbf{\hat{j}}\ \text{m/s}^{2}} \right) = 1.20\mathbf{\hat{i}} + 2.80\mathbf{\hat{j}}\ \text{N}.$$
    :::
b.  Magnitude and direction are found using the components of $\mathbf{\overset{\rightarrow}{F}}_{\text{net}}$:\

    :::
    $$F_{\text{net}} = \sqrt{{(1.20\ \text{N})}^{2} + {(2.80\ \text{N})}^{2}} = 3.05\ \text{N}\ \text{and}\ \theta = \text{tan}^{-1}\left( \frac{2.80}{1.20} \right) = 66.8\text{°}.$$
    :::

#### Significance

We must remember that Newton's second law is a vector equation. In (a), we are multiplying a vector by a scalar to determine the net force in vector form. While the vector form gives a compact representation of the force vector, it does not tell us how "big" it is, or where it goes, in intuitive terms. In (b), we are determining the actual size (magnitude) of this force and the direction in which it travels.

### Example  5.6

#### Mass of a Car

Find the mass of a car if a net force of $-600.0\mathbf{\hat{j}}\ \text{N}$ produces an acceleration of $-0.2\mathbf{\hat{j}}\ \text{m/s}^{2}$.

#### Strategy

Vector division is not defined, so $m = {\mathbf{\overset{\rightarrow}{F}}_{\text{net}}\text{/}\mathbf{\overset{\rightarrow}{a}}}$ cannot be performed. However, mass *m* is a scalar, so we can use the scalar form of Newton's second law, $m = {F_{\text{net}}\text{/}a}$.

#### Solution

We use $m = {F_{\text{net}}\text{/}a}$ and substitute the magnitudes of the two vectors: $F_{\text{net}} = 600.0\ \text{N}$ and $a = 0.2\ \text{m/s}^{2}.$ Therefore,

$$m = \frac{F_{\text{net}}}{a} = \frac{600.0\ \text{N}}{0.2\ \text{m/s}^{2}} = 3000\ \text{kg}.$$

#### Significance

Force and acceleration were given in the $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ format, but the answer, mass *m*, is a scalar and thus is not given in $\mathbf{\hat{i}}$ and $\mathbf{\hat{j}}$ form.

### Example  5.7

#### Several Forces on a Particle

A particle of mass $m = 4.0\ \text{kg}$ is acted upon by four forces of magnitudes. $F_{1} = 10.0\ \text{N},\ F_{2} = 40.0\ \text{N},\ F_{3} = 5.0\ \text{N},\ \text{and}\ F_{4} = 2.0\ \text{N}$, with the directions as shown in the free-body diagram in Figure 5.15. What is the acceleration of the particle?

*Figure 5.15* Four forces in the xy -plane are applied to a 4.0-kg particle. (Alt: A particle is shown in the xy plane. Force F1 is at an angle of 30 degrees with the positive x axis, force F2 is in the downward direction, force F3 points left and force F4 points upwards.)

#### Strategy

Because this is a two-dimensional problem, we must use a free-body diagram. First, $\mathbf{\overset{\rightarrow}{F}}_{1}$ must be resolved into *x*- and *y*-components. We can then apply the second law in each direction.

#### Solution

We draw a free-body diagram as shown in Figure 5.15. Now we apply Newton's second law. We consider all vectors resolved into *x*- and *y*-components:

$$\begin{array}{lccl}
{{\sum F_{x}} = ma_{x}} & & & {{\sum F_{y}} = ma_{y}} \\
{F_{1x} - F_{3x} = ma_{x}} & & & {F_{1y} + F_{4y} - F_{2y} = ma_{y}} \\
{F_{1}\ \text{cos}\ 30\text{°} - F_{3x} = ma_{x}} & & & {F_{1}\text{sin}\ 30\text{°} + F_{4y} - F_{2y} = ma_{y}} \\
{\left( {10.0\ \text{N}} \right)\left( {\text{cos}\ 30\text{°}} \right) - 5.0\ \text{N} = \left( {4.0\ \text{kg}} \right)a_{x}} & & & {\left( {10.0\ \text{N}} \right)\left( {\text{sin}\ 30\text{°}} \right) + 2.0\ \text{N} - 40.0\ \text{N} = \left( {4.0\ \text{kg}} \right)a_{y}} \\
{a_{x} = 0.92\ {\text{m}\text{/}\text{s}^{2}}.} & & & {a_{y} = -8.3\ {\text{m}\text{/}\text{s}}^{2}.}
\end{array}$$

Thus, the net acceleration is

$$\mathbf{\overset{\rightarrow}{a}} = \left( {0.92\mathbf{\hat{i}} - 8.3\mathbf{\hat{j}}} \right)\ {\text{m}\text{/}\text{s}^{2}},$$

which is a vector of magnitude $8.4\ \text{m/s}^{2}$ directed at $276\text{°}$ to the positive *x*-axis.

#### Significance

Numerous examples in everyday life can be found that involve three or more forces acting on a single object, such as cables running from the Golden Gate Bridge or a football player being tackled by three defenders. We can see that the solution of this example is just an extension of what we have already done.

### Check Your Understanding  5.5

A car has forces acting on it, as shown below. The mass of the car is 1000.0 kg. The road is slick, so friction can be ignored. (a) What is the net force on the car? (b) What is the acceleration of the car?

*(Figure omitted; see the source book.)* (Alt: The top view of a car is shown. Two force vectors originate from the car and point upwards and outwards. A force of 450 newtons makes an angle of 30 degrees with the straight line motion of the car, towards the right. Another force of 360 newtons makes an angle of 10 degrees with the straight line motion of the car, towards the left.)

### Newton's Second Law and Momentum

Newton actually stated his second law in terms of momentum: "The instantaneous rate at which a body's momentum changes is equal to the net force acting on the body." ("Instantaneous rate" implies that the derivative is involved.) This can be given by the vector equation

$$\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = \frac{d\mathbf{\overset{\rightarrow}{p}}}{dt}.$$

(5.6)

This means that Newton's second law addresses the central question of motion: What causes a change in motion of an object? Momentum was described by Newton as "quantity of motion," a way of combining both the velocity of an object and its mass. We devote Linear Momentum and Collisions to the study of momentum.

For now, it is sufficient to define *momentum* $\mathbf{\overset{\rightarrow}{p}}$ as the product of the mass of the object *m* and its velocity $\mathbf{\overset{\rightarrow}{v}}$
$$\mathbf{\overset{\rightarrow}{p}} = m\mathbf{\overset{\rightarrow}{v}}.$$

(5.7)

Since velocity is a vector, so is momentum.

It is easy to visualize momentum. A train moving at 10 m/s has more momentum than one that moves at 2 m/s. In everyday life, we speak of one sports team as "having momentum" when they score points against the opposing team.

If we substitute Equation 5.7 into Equation 5.6, we obtain

$$\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = \frac{d\mathbf{\overset{\rightarrow}{p}}}{dt} = \frac{d\left( {m\mathbf{\overset{\rightarrow}{v}}} \right)}{dt}.$$

When *m* is constant, we have

$$\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = m\frac{d\left( \mathbf{\overset{\rightarrow}{v}} \right)}{dt} = m\mathbf{\overset{\rightarrow}{a}}.$$

Thus, we see that the momentum form of Newton's second law reduces to the form given earlier in this section.

### Interactive
