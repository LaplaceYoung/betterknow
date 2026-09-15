# 15.1 Simple Harmonic Motion

Title: 15.1 Simple Harmonic Motion
Book: University Physics Volume 1
Authors: William Moebs, Samuel J. Ling, Jeff Sanny
Publisher: OpenStax (Rice University)
License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
License URL: https://creativecommons.org/licenses/by-nc-sa/4.0/
Source: https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
Access for free at: https://openstax.org/books/university-physics-volume-1/pages/1-introduction
Course-aliases: 大学物理, University Physics
Extract: UTF-8 plain-text extract of the official OpenStax web section for the simo know local teaching knowledge base.
Figures are omitted or replaced with alt-text captions. OpenStax names and logos are not licensed for reuse.
This extract is not for training large language models.

---

## 15.1 Simple Harmonic Motion

### Learning Objectives

By the end of this section, you will be able to:

- Define the terms period and frequency
- List the characteristics of simple harmonic motion
- Explain the concept of phase shift
- Write the equations of motion for the system of a mass and spring undergoing simple harmonic motion
- Describe the motion of a mass oscillating on a vertical spring

When you pluck a guitar string, the resulting sound has a steady tone and lasts a long time (Figure 15.2). The string vibrates around an equilibrium position, and one oscillation is completed when the string starts from the initial position, travels to one of the extreme positions, then to the other extreme position, and returns to its initial position. We define periodic motion to be any motion that repeats itself at regular time intervals, such as exhibited by the guitar string or by a child swinging on a swing. In this section, we study the basic characteristics of oscillations and their mathematical description.

*Figure 15.2* When a guitar string is plucked, the string oscillates up and down in periodic motion. The vibrating string causes the surrounding air molecules to oscillate, producing sound waves. (credit: Yutaka Tsutano) (Alt: A photograph of a guitar being played.)

### Period and Frequency in Oscillations

In the absence of friction, the time to complete one oscillation remains constant and is called the period (*T*). Its units are usually seconds, but may be any convenient unit of time. The word 'period' refers to the time for some event whether repetitive or not, but in this chapter, we shall deal primarily in periodic motion, which is by definition repetitive.

A concept closely related to period is the frequency of an event. **Frequency** **(*f*)** is defined to be the number of events per unit time. For periodic motion, frequency is the number of oscillations per unit time. The relationship between frequency and period is

$$f = \frac{1}{T}.$$

(15.1)

The SI unit for frequency is the *hertz* (Hz) and is defined as one *cycle per second*:

$$1\ \text{Hz} = 1\frac{\text{cycle}}{\text{s}}\mspace{9mu}\text{or}\mspace{9mu} 1\ \text{Hz} = \frac{1}{\text{s}} = 1\ \text{s}^{-1}.$$

A cycle is one complete oscillation.

### Example  15.1

#### Determining the Frequency of Medical Ultrasound

Ultrasound machines are used by medical professionals to make images for examining internal organs of the body. An ultrasound machine emits high-frequency sound waves, which reflect off the organs, and a computer receives the waves, using them to create a picture. We can use the formulas presented in this module to determine the frequency, based on what we know about oscillations. Consider a medical imaging device that produces ultrasound by oscillating with a period of $0.400\ \mu\text{s}$. What is the frequency of this oscillation?

#### Strategy

The period (*T*) is given and we are asked to find frequency (*f*).

#### Solution

Substitute $0.400\ \mu\text{s}$ for *T* in $f = \frac{1}{T}$
$$f = \frac{1}{T} = \frac{1}{0.400\  \times \ 10^{-6}\ \text{s}}.$$

Solve to find

$$f = 2.50\  \times \ 10^{6}\ \text{Hz}\text{.}$$

#### Significance

This frequency of sound is much higher than the highest frequency that humans can hear (the range of human hearing is 20 Hz to 20,000 Hz); therefore, it is called ultrasound. Appropriate oscillations at this frequency generate ultrasound used for noninvasive medical diagnoses, such as observations of a fetus in the womb.

### Characteristics of Simple Harmonic Motion

A very common type of periodic motion is called simple harmonic motion (SHM). A system that oscillates with SHM is called a simple harmonic oscillator.

### Simple Harmonic Motion

In simple harmonic motion, the acceleration of the system, and therefore the net force, is proportional to the displacement and acts in the opposite direction of the displacement.

A good example of SHM is an object with mass *m* attached to a spring on a frictionless surface, as shown in Figure 15.3. The object oscillates around the equilibrium position, and the net force on the object is equal to the force provided by the spring. This force obeys Hooke's law $F_{s} = \text{−}kx,$ as discussed in a previous chapter.

If the net force can be described by Hooke's law and there is no *damping* (slowing down due to friction or other nonconservative forces), then a simple harmonic oscillator oscillates with equal displacement on either side of the equilibrium position, as shown for an object on a spring in Figure 15.3. The maximum displacement from equilibrium is called the amplitude (*A*). The units for amplitude and displacement are the same but depend on the type of oscillation. For the object on the spring, the units of amplitude and displacement are meters.

*Figure 15.3* An object attached to a spring sliding on a frictionless surface is an uncomplicated simple harmonic oscillator. In the above set of figures, a mass is attached to a spring and placed on a frictionless table. The other end of the spring is attached to the wall. The position of the mass, when the spring is neither stretched nor compressed, is marked as x = 0 and is the equilibrium position. (a) The mass is displaced to a position x = A and released from rest. (b) The mass accelerates as it moves in the negative x -direction, reaching a maximum negative velocity at x = 0 . (c) The mass continues to move in the negative x -direction, slowing until it comes to a stop at x = − A . (d) The mass now begins to accelerate in the positive x -direction, reaching a positive maximum velocity at x = 0 . (e) The mass then continues to move in the positive direction until it stops at x = A . The mass continues in SHM that has an amplitude A and a period T . The object’s maximum speed occurs as it passes through equilibrium. The stiffer the spring is, the smaller the period T . The greater the mass of the object is, the greater the period T . (Alt: The motion and free body diagrams of a mass attached to a horizontal spring, spring constant k, at various points in its motion. In figure (a) the mass is displaced to a position x = A to the right of x =0 and released from rest (v=0.) The spring is stretched. The force on the mass is to the left. The free body diagram has weight w down, the normal force N up and equal to the weight, and the force F to the left. (b) The mass is at x = 0 and moving in the negative x-direction with velocity – v sub max. The spring is relaxed. The Force on the mass is zero. The free body diagram has weight w down, the normal force N up and equal to the weight. (c) The mass is at minus A, to the left of x = 0 and is at rest (v =0.) The spring is compressed. The force F is to the right. The free body diagram has weight w down, the normal force N up and equal to the weight, and the force F to the right. (d) The mass is at x = 0 and moving in the positive x-direction with velocity plus v sub max. The spring is relaxed. The Force on the mass is zero. The free body diagram has weight w down, the normal force N up and equal to the weight. (e) the mass is again at x = A to the right of x =0 and at rest (v=0.) The spring is stretched. The force on the mass is to the left. The free body diagram has weight w down, the normal force N up and equal to the weight, and the force F to the left.)

What is so significant about SHM? For one thing, the period *T* and frequency *f* of a simple harmonic oscillator are independent of amplitude. The string of a guitar, for example, oscillates with the same frequency whether plucked gently or hard.

Two important factors do affect the period of a simple harmonic oscillator. The period is related to how stiff the system is. A very stiff object has a large force constant (*k*), which causes the system to have a smaller period. For example, you can adjust a diving board's stiffness---the stiffer it is, the faster it vibrates, and the shorter its period. Period also depends on the mass of the oscillating system. The more massive the system is, the longer the period. For example, a heavy person on a diving board bounces up and down more slowly than a light one. In fact, the mass *m* and the force constant *k* are the *only* factors that affect the period and frequency of SHM. To derive an equation for the period and the frequency, we must first define and analyze the equations of motion. Note that the force constant is sometimes referred to as the *spring constant*.

### Equations of SHM

Consider a block attached to a spring on a frictionless table (Figure 15.4). The equilibrium position (the position where the spring is neither stretched nor compressed) is marked as $x = 0$. At the equilibrium position, the net force is zero.

*Figure 15.4* A block is attached to a spring and placed on a frictionless table. The equilibrium position, where the spring is neither extended nor compressed, is marked as x = 0. (Alt: A block is attached to a horizontal spring and placed on a frictionless table. The equilibrium position, where the spring is neither extended nor compressed, is marked as x=0. A position to the left of the block is marked as x = - A and a position the same distance to the right of the block is marked as x = + A.)

Work is done on the block to pull it out to a position of $x = + A,$ and it is then released from rest. The maximum *x*-position (*A*) is called the amplitude of the motion. The block begins to oscillate in SHM between $x = + A$ and $x = \text{−}A,$ where *A* is the amplitude of the motion and *T* is the period of the oscillation. The period is the time for one oscillation. Figure 15.5 shows the motion of the block as it completes one and a half oscillations after release. Figure 15.6 shows a plot of the position of the block versus time. When the position is plotted versus time, it is clear that the data can be modeled by a cosine function with an amplitude *A* and a period *T*. The cosine function $\text{cos}\theta$ repeats every multiple of $2\pi,$ whereas the motion of the block repeats every period *T*. However, the function $\text{cos}\left( {\frac{2\pi}{T}t} \right)$ repeats every integer multiple of the period. The maximum of the cosine function is one, so it is necessary to multiply the cosine function by the amplitude *A*.

$$x(t) = A\mspace{2mu}\text{cos}\left( {\frac{2\pi}{T}t} \right) = A\mspace{2mu}\text{cos}\left( {\omega t} \right).$$

(15.2)

Recall from the chapter on rotation that the angular frequency equals $\omega = \frac{d\theta}{dt}$. In this case, the period is constant, so the angular frequency is defined as $2\pi$ divided by the period, $\omega = \frac{2\pi}{T}$.

*Figure 15.5* A block is attached to one end of a spring and placed on a frictionless table. The other end of the spring is anchored to the wall. The equilibrium position, where the net force equals zero, is marked as x = 0 m. Work is done on the block, pulling it out to x = + A , and the block is released from rest. The block oscillates between x = + A and x = − A . The force is also shown as a vector. (Alt: A series of illustrations of a mass, attached to a horizontal spring and sliding on a horizontal surface, is shown. The position of the mass, the spring, and the force on the mass are illustrated every eighth period from t = 0 to t = one and a half periods. The illustrations are aligned vertically and the positions of the mass are connected from one graph to the next using a blue line, creating a graph of the position (horizontal) dependence on time (vertical). The x = 0 position is at the center of the horizontal surface. In the top graph, the mass is at x = +A, the net force is to the left and is equal to – k A. The spring is stretched the maximum amount. The time is t = 0. In the second graph, the mass is between x = +A/2 and x = A, the net force is to the left and smaller than in the previous graph. The spring is stretched less than at t=0. In the third graph, the mass is at x = 0, there is no net force. The spring is relaxed. The time is t = one quarter T. In the fourth graph, the mass is between x = -A/2 and x = -A, the net force is to the right. The magnitude of the force is the same as that in the second graph. The spring is somewhat compressed. In the fifth graph, the mass is at x = -A, the net force is to the right and is equal to + k A. The spring is compressed the maximum amount. The time is t = 1/2 T. In the sixth graph, the mass is between x = -A/2 and x = -A, the net force is to the right. The magnitude of the force is the same as that in the second graph. The spring is somewhat compressed. This graph is identical to the fourth graph. In the seventh graph, the mass is at x = 0, there is no net force. The spring is relaxed. The time is t = 3/4 T. This graph is identical to the third graph. In the eighth graph, the mass is between x = +A/2 and x = A, the net force is to the left. This graph is identical to the second graph. In the ninth graph, the mass is at x = +A, the net force is to the left and is equal to – k A. The spring is stretched the maximum amount. The time is t = 0. This graph is identical to the first (top) graph. The remaining four graphs repeat the second, third, fourth and fifth graphs, with the eleventh graph’s time at t = 1 and 1/4 T and the thirteenth at t = 1 and 1/2 T. The curve connecting the positions of the mass forms a vertical sinusoidal curve.)

*Figure 15.6* A graph of the position of the block shown in Figure 15.5 as a function of time. The position can be modeled as a periodic function, such as a cosine or sine function. (Alt: A graph of the position on the vertical axis as a function of time on the horizontal axis. The vertical scale is from – A to +A and the horizontal scale is from 0 to 3/2 T. The curve is a cosine function, with a value of +A at time zero and again at time T.)

The equation for the position as a function of time $x(t) = A\mspace{2mu}\text{cos}\left( {\omega t} \right)$ is good for modeling data, where the position of the block at the initial time $t = 0.00\ \text{s}$ is at the amplitude *A* and the initial velocity is zero. Often when taking experimental data, the position of the mass at the initial time $t = 0.00\ \text{s}$ is not equal to the amplitude and the initial velocity is not zero. Consider 10 seconds of data collected by a student in lab, shown in Figure 15.7.

*Figure 15.7* Data collected by a student in lab indicate the position of a block attached to a spring, measured with a sonic range finder. The data are collected starting at time t = 0.00s, but the initial position is near position x ≈ −0.80 cm ≠ 3.00 cm , so the initial position does not equal the amplitude x 0 = + A . The velocity is the time derivative of the position, which is the slope at a point on the graph of position versus time. The velocity is not v = 0.00 m/s at time t = 0.00 s , as evident by the slope of the graph of position versus time, which is not zero at the initial time. (Alt: Data of position versus time for a mass on a spring. The horizontal axis is time t in seconds, ranging from 0 to 10 seconds. The vertical axis is position x in centimeters, ranging from -3 centimeters to 4 centimeters. The data is shown as points and appears to be taken at regular intervals at about 10 points per second. The data oscillates sinusoidally, with a little over four full cycles during the 10 seconds of data shown. The position at t=0 is x = -0.8 centimeters. The position is at a maximum of x = 3 centimeters at about t = 0.6 s, 3.1 s, 5.5 s, and 7.9 s. The position is at the minimum of x = -3 centimeters at about t=1.9 s, 4.3 s, 6.7 s, and 9.0 s.)

The data in Figure 15.7 can still be modeled with a periodic function, like a cosine function, but the function is shifted to the right. This shift is known as a phase shift and is usually represented by the Greek letter phi $(\phi)$. The equation of the position as a function of time for a block on a spring becomes

$$x(t) = A\mspace{2mu}\text{cos}\left( {\omega t + \phi} \right).$$

This is the generalized equation for SHM where *t* is the time measured in seconds, $\omega$ is the angular frequency with units of inverse seconds, *A* is the amplitude measured in meters or centimeters, and $\phi$ is the phase shift measured in radians (Figure 15.8). It should be noted that because sine and cosine functions differ only by a phase shift, this motion could be modeled using either the cosine or sine function.

*Figure 15.8* (a) A cosine function. (b) A cosine function shifted to the left by an angle ϕ . The angle ϕ is known as the phase shift of the function. (Alt: Two graphs of an oscillating function of angle. In figure a, we see the function cosine of theta as a function of theta, from minus pi to two pi. The function oscillates between -1 and +1, and is at the maximum of +1 at theta equals zero. In figure b, we see the function cosine of quantity theta plus phi as a function of theta, from minus pi to two pi. The function oscillates between -1 and +1, and is maximum at theta equals phi. The curve is the cosine curve, shifted to the right by an amount phi.)

The velocity of the mass on a spring, oscillating in SHM, can be found by taking the derivative of the position equation:

$$v(t) = \frac{dx}{dt} = \frac{d}{dt}\left( {A\text{cos}\left( {\omega t + \phi} \right)} \right) = \text{−}A\omega\text{sin}\left( {\omega t + \phi} \right) = \text{−}v_{\text{max}}\text{sin}\left( {\omega t + \phi} \right).$$

Because the sine function oscillates between --1 and +1, the maximum velocity is the amplitude times the angular frequency, $v_{\text{max}} = A\omega$. The maximum velocity occurs at the equilibrium position $\left( {x = 0} \right)$ when the mass is moving toward $x = + A$. The maximum velocity in the negative direction is attained at the equilibrium position $\left( {x = 0} \right)$ when the mass is moving toward $x = \text{−}A$ and is equal to $\text{−}v_{\text{max}}$.

The acceleration of the mass on the spring can be found by taking the time derivative of the velocity:

$$a(t) = \frac{dv}{dt} = \frac{d}{dt}\left( {\text{−}A\omega\text{sin}\left( {\omega t + \phi} \right)} \right) = \text{−}A\omega^{2}\text{cos}\left( {\omega t + \varphi} \right) = \text{−}a_{\text{max}}\text{cos}\left( {\omega t + \phi} \right).$$

The maximum acceleration is $a_{\text{max}} = A\omega^{2}$. The maximum acceleration in the positive direction occurs at the position $\left( {x = \text{−}A} \right)$, and is equal to $a_{\text{max}}$.

### Summary of Equations of Motion for SHM

In summary, the oscillatory motion of a block on a spring can be modeled with the following equations of motion:

$$x(t) = A\text{cos}\left( {\omega t + \phi} \right)$$

(15.3)

$$v(t) = \text{−}v_{\text{max}}\text{sin}\left( {\omega t + \phi} \right)$$

(15.4)

$$a(t) = \text{−}a_{\text{max}}\text{cos}\left( {\omega t + \phi} \right)$$

(15.5)

$$x_{\text{max}} = A$$

(15.6)

$$v_{\text{max}} = A\omega$$

(15.7)

$$a_{\text{max}} = A\omega^{2}.$$

(15.8)

Here, *A* is the amplitude of the motion, *T* is the period, $\phi$ is the phase shift, and $\omega = \frac{2\pi}{T} = 2\pi f$ is the angular frequency of the motion of the block.

### Example  15.2

#### Determining the Equations of Motion for a Block and a Spring

A 2.00-kg block is placed on a frictionless surface. A spring with a force constant of $k = 32.00\ {\text{N}\text{/}\text{m}}$ is attached to the block, and the opposite end of the spring is attached to the wall. The spring can be compressed or extended. The equilibrium position is marked as $x = 0.00\ \text{m}\text{.}$

Work is done on the block, pulling it out to $x = + 0.02\ \text{m}\text{.}$ The block is released from rest and oscillates between $x = + 0.02\ \text{m}$ and $x = -0.02\ \text{m}\text{.}$ The period of the motion is 1.57 s. Determine the equations of motion.

#### Strategy

We first find the angular frequency. The phase shift is zero, $\phi = 0.00\ \text{rad,}$ because the block is released from rest at $x = A = + 0.02\ \text{m}\text{.}$ Once the angular frequency is found, we can determine the maximum velocity and maximum acceleration.

#### Solution

The angular frequency can be found and used to find the maximum velocity and maximum acceleration:

$$\begin{array}{rll}
\omega & = & {\frac{2\pi}{1.57\ \text{s}} = 4.00\ \text{s}^{-1};} \\
v_{\text{max}} & = & {A\omega = 0.02\text{m}\left( {4.00\ \text{s}^{-1}} \right) = 0.08\ \text{m/s;}} \\
a_{\text{max}} & = & {A\omega^{2} = 0.02\ \text{m}\left( {4.00\ \text{s}^{-1}} \right)^{2} = 0.32{\ \text{m/s}}^{2}.}
\end{array}$$

All that is left is to fill in the equations of motion:

$$\begin{array}{cll}
{x(t)} & = & {A\mspace{2mu}\text{cos}\left( {\omega t + \phi} \right) = (0.02\ \text{m})\text{cos}\left( {4.00\ \text{s}^{-1}t} \right);} \\
{v(t)} & = & {\text{−}v_{\text{max}}\text{sin}\left( {\omega t + \phi} \right) = \left( {-0.08\ \text{m/s}} \right)\text{sin}{\left( {4.00\ \text{s}^{-1}t} \right);}} \\
{a(t)} & = & {\text{−}a_{\text{max}}\text{cos}\left( {\omega t + \phi} \right) = \left( {-0.32\ \text{m/s}^{2}} \right)\text{cos}\left( {4.00\ \text{s}^{-1}t} \right).}
\end{array}$$

#### Significance

The position, velocity, and acceleration can be found for any time. It is important to remember that when using these equations, your calculator must be in radians mode.

### The Period and Frequency of a Mass on a Spring

One interesting characteristic of the SHM of an object attached to a spring is that the angular frequency, and therefore the period and frequency of the motion, depend on only the mass and the force constant, and not on other factors such as the amplitude of the motion. We can use the equations of motion and Newton's second law $(\mathbf{\overset{\rightarrow}{F}}_{\text{net}} = m\mathbf{\overset{\rightarrow}{a}})$ to find equations for the angular frequency, frequency, and period.

Consider the block on a spring on a frictionless surface. There are three forces on the mass: the weight, the normal force, and the force due to the spring. The only two forces that act perpendicular to the surface are the weight and the normal force, which have equal magnitudes and opposite directions, and thus sum to zero. The only force that acts parallel to the surface is the force due to the spring, so the net force must be equal to the force of the spring:

$$\begin{array}{rll}
F_{x} & = & {\text{−}kx;} \\
 & & \\
{ma} & = & {\text{−}kx;} \\
 & & \\
 & & \\
{m\frac{d^{2}x}{dt^{2}}} & = & {\text{−}kx;} \\
\frac{d^{2}x}{dt^{2}} & = & {- \frac{k}{m}x.}
\end{array}$$

Substituting the equations of motion for *x* and *a* gives us

$$\text{−}A\omega^{2}\text{cos}\left( {\omega t + \phi} \right) = - \frac{k}{m}A\text{cos}\left( {\omega t + \phi} \right).$$

Cancelling out like terms and solving for the angular frequency yields

$$\omega = \sqrt{\frac{k}{m}}.$$

(15.9)

The angular frequency depends only on the force constant and the mass, and not the amplitude. The angular frequency is defined as $\omega = 2\pi\text{/}T,$ which yields an equation for the period of the motion:

$$T = 2\pi\sqrt{\frac{m}{k}}.$$

(15.10)

The period also depends only on the mass and the force constant. The greater the mass, the longer the period. The stiffer the spring, the shorter the period. The frequency is

$$f = \frac{1}{T} = \frac{1}{2\pi}\sqrt{\frac{k}{m}}.$$

(15.11)

### Vertical Motion and a Horizontal Spring

When a spring is hung vertically and a block is attached and set in motion, the block oscillates in SHM. In this case, there is no normal force, and the net effect of the force of gravity is to change the equilibrium position. Consider Figure 15.9. Two forces act on the block: the weight and the force of the spring. The weight is constant and the force of the spring changes as the length of the spring changes.

*Figure 15.9* A spring is hung from the ceiling. When a block is attached, the block is at the equilibrium position where the weight of the block is equal to the force of the spring. (a) The spring is hung from the ceiling and the equilibrium position is marked as y o . (b) A mass is attached to the spring and a new equilibrium position is reached ( y 1 = y o − Δ y ) when the force provided by the spring equals the weight of the mass. (c) The free-body diagram of the mass shows the two forces acting on the mass: the weight and the force of the spring. (Alt: An illustration of a vertical spring attached to the ceiling. The positive y direction is upward. In the figure on the left, figure a, the spring has no mass attached to it. The bottom of the spring is a distance y sub zero from the floor. In the middle figure, figure b, the spring has a mass m attached to it. The top of the spring is at the same level as in figure a, but the spring has stretched down a distance delta y, so that the bottom of the spring is now a distance y sub 1 equals y sub zero minus delta y from the floor. On the right, figure c, a free body diagram of the mass is shown with downward force m g and an upward force F sub s that equals k delta y which also equals k times the quantity y sub zero minus y sub 1.)

When the block reaches the equilibrium position, as seen in Figure 15.9, the force of the spring equals the weight of the block, $F_{\text{net}} = F_{\text{s}} - mg = 0$, where

$$\text{−}k\left( {\text{−}\text{Δ}y} \right) = mg.$$

From the figure, the change in the position is $\text{Δ}y = y_{0} - y_{1}$ and since $\text{−}k\left( {\text{−}\text{Δ}y} \right) = mg$, we have

$$k\left( {y_{0} - y_{1}} \right) - mg = 0.$$

If the block is displaced and released, it will oscillate around the new equilibrium position. As shown in Figure 15.10, if the position of the block is recorded as a function of time, the recording is a periodic function.

If the block is displaced to a position *y*, the net force becomes $F_{\text{net}} = k\left( {y_{0} - y} \right) - mg$. But we found that at the equilibrium position, $mg = k\text{Δ}y = ky_{0} - ky_{1}$. Substituting for the weight in the equation yields

$$F_{\text{net}} = ky_{0} - ky - \left( {ky_{0} - ky_{1}} \right).$$

Recall that $y_{1}$ is just the equilibrium position and any position can be set to be the point $y = 0.00\text{m}\text{.}$ So let's set $y_{1}$ to $y = 0.00\ \text{m}\text{.}$ The net force then becomes

$$\begin{array}{rll}
F_{\text{net}} & = & {\text{−}ky;} \\
 & & \\
 & & \\
{m\frac{d^{2}y}{dt^{2}}} & = & {\text{−}ky.}
\end{array}$$

This is just what we found previously for a horizontally sliding mass on a spring. The constant force of gravity only served to shift the equilibrium location of the mass. Therefore, the solution should be the same form as for a block on a horizontal spring, $y(t) = A\text{cos}\left( {\omega t + \phi} \right).$ The equations for the velocity and the acceleration also have the same form as for the horizontal case. Note that the inclusion of the phase shift means that the motion can actually be modeled using either a cosine or a sine function, since these two functions only differ by a phase shift.

*Figure 15.10* Graphs of y ( t ), v ( t ), and a ( t ) versus t for the motion of an object on a vertical spring. The net force on the object can be described by Hooke’s law, so the object undergoes SHM. Note that the initial position has the vertical displacement at its maximum value A ; v is initially zero and then negative as the object moves down; the initial acceleration is negative, back toward the equilibrium position and becomes zero at that point. (Alt: A series of 10 illustrations of a ball, attached to a vertical spring, is shown. The illustrations are displayed next to each other, with the tops of the springs aligned. The vertical positions y = + A, y = 0, and y = -A are labeled on the right. Working our way from left to right: In the left-most drawing, the spring is compressed so the ball is at y = + A and at rest. In the second drawing, the ball is at y = 0 and is moving downward. In the third drawing, the spring is stretched so that the ball is at y = - A and at rest. In the fourth drawing, the ball is at y = 0 and is moving upward. In the fifth drawing, the spring is compressed so the ball is at y = + A and at rest. In the sixth drawing, the ball is at y = 0 and is moving downward. In the seventh drawing, the spring is stretched so that the ball is at y = - A and at rest. In the eighth drawing, the ball is at y = 0 and is moving upward. In the ninth drawing, the spring is compressed so the ball is at y = + A and at rest. In the tenth drawing, the ball is at y = 0 and is moving downward. Below these illustrations is a series of graphs, aligned vertically. The top graph is of position as a function of time. The vertical axis is position y, with a range of – A to +A. The horizontal axis is time t, labeled in increments of T. The graph has value y=+A at t=0 and oscillates two and one quarter cycles. The horizontal distance between maxima is labeled as T and the vertical distance between the horizontal axis and the maximum is labeled as amplitude A. The middle graph is of velocity as a function of time. The vertical axis is velocity v, with a range of minus v sub max to v max. The horizontal axis is time t, labeled in increments of T. The graph has value v=0 and a negative slope at t=0, and oscillates two and one quarter cycles. The bottom graph is of acceleration as a function of time. The vertical axis is acceleration a, with a range of minus a sub max to a max. The horizontal axis is time t, labeled in increments of T. The graph has value a equals minus a sub max and a and oscillates two and one quarter cycles. Below the graphs are three illustrations of the ball on the spring. The positions y = + A, y=0, and y = -A are labeled on the right. In the leftmost diagram, a hand holds the ball and the length of the spring is labeled as the unstrained length. This position is above the y = + A position. In the middle picture, the ball is not being held and is at a lower position labeled as the equilibrium position. This position is y = 0. In the rightmost diagram, the ball is shown in four different positions. These positions are y = + A, just above y = 0, just below y = 0 , and at y = -A. The spring is shown only with its bottom attached to the ball at the y = + A position.)
