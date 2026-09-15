/** Leftover Pythagorean practice dump (chalkboard animation spec, no leftover html). */

export const PYTHAGOREAN_PRACTICE = {
  "id": "pythagorean",
  "aliases": [
    "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2"
  ],
  "title": "Pythagorean Theorem",
  "sessions": [
    {
      "sessionId": "d62f9bbb-2902-49e5-b415-816a31207dda",
      "title": "Anatomy of the Right Triangle",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a right triangle where the three sides are labeled 'a', 'b', and 'c', and the 90-degree angle is located directly across from side 'b', which side is the hypotenuse?",
          "options": [
            "Side a",
            "Side b",
            "Side c",
            "The side adjacent to the right angle"
          ],
          "correctAnswers": [
            "Side b"
          ],
          "explanation": "The hypotenuse is always defined by its position relative to the right angle; it is the side 'opposite' or across from the 90-degree vertex, regardless of the alphabetical label used."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements accurately describe the 'legs' of a right triangle?",
          "options": [
            "They are the two sides that form the 90-degree angle.",
            "They are always shorter than the hypotenuse.",
            "They are the sides that the right-angle symbol points towards.",
            "They meet to form a perpendicular intersection.",
            "One leg must always be horizontal and the other must be vertical."
          ],
          "correctAnswers": [
            "They are the two sides that form the 90-degree angle.",
            "They are always shorter than the hypotenuse.",
            "They meet to form a perpendicular intersection."
          ],
          "explanation": "Legs are the two perpendicular sides that build the right angle. While they can be horizontal or vertical, this depends entirely on the triangle's rotation, not the definition of the legs themselves."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The geometric relationship that allows us to identify the hypotenuse regardless of a triangle's orientation is that it is always ____ the right angle.",
          "options": [],
          "correctAnswers": [
            "opposite",
            "across from",
            "opposite to"
          ],
          "explanation": "The 'oppositeness' relationship is the most reliable way to identify the hypotenuse, as visual length can be deceiving and orientation (up/down) changes with rotation.",
          "placeholder": "relative position"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If a right triangle is rotated so that it 'sits' on its hypotenuse (making the hypotenuse the flat base), what happens to the identity of the sides?",
          "options": [
            "The vertical side becomes the new hypotenuse.",
            "The sides lose their identity as legs or hypotenuse.",
            "The identity of the sides remains unchanged.",
            "The longest leg becomes the hypotenuse."
          ],
          "correctAnswers": [
            "The identity of the sides remains unchanged."
          ],
          "explanation": "Geometric roles are invariant under rotation; the hypotenuse is determined by its relationship to the internal angles, not its orientation relative to the ground.",
          "caption": "Three right triangles in different orientations, each with a marked 90-degree angle."
        },
        {
          "id": "q5",
          "type": "animation",
          "scene": "triangle-rotate",
          "prompt": "As the triangle is rotated 360 degrees, why does the arrow from the right angle always point to the same side?",
          "options": [
            "Because the hypotenuse is the only side not physically attached to the right angle vertex.",
            "Because the hypotenuse always aligns with the horizontal axis of the screen.",
            "Because the legs grow and shrink to keep the hypotenuse in the same spatial position.",
            "Because the right angle symbol is programmed to flip toward the longest side."
          ],
          "correctAnswers": [
            "Because the hypotenuse is the only side not physically attached to the right angle vertex."
          ],
          "explanation": "The hypotenuse is defined as the side opposite the right angle; since it does not form the 90-degree corner, it is the only side that does not touch that vertex, maintaining a fixed 'opposite' relationship regardless of rotation.",
          "caption": "Geometry in rigid rotation"
        }
      ]
    },
    {
      "sessionId": "aa3b4d82-19e6-4435-a4dc-f9f8d964ab0c",
      "title": "Visualizing Sides as Squares",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When we transition from a 1D line segment of length 's' to a 2D square with area 's²', what physical change occurs in our geometric representation?",
          "options": [
            "The line segment becomes the perimeter of the new square.",
            "The line segment acts as the diagonal of the new square.",
            "The line segment defines the length of one side of the new square.",
            "The line segment represents the total distance around four triangles."
          ],
          "correctAnswers": [
            "The line segment defines the length of one side of the new square."
          ],
          "explanation": "In this geometric visualization, squaring a side length means using that specific length as the 'seed' or base to build a physical square shape where every side is that same length.",
          "caption": "A line segment becoming the base of a square."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the context of the Pythagorean Theorem, which of the following statements correctly describe the relationship between a right triangle and the squares built upon its sides?",
          "options": [
            "The squares must be built projecting outward from the triangle's sides.",
            "The exponent '2' in the formula refers to the two dimensions of the square areas.",
            "The areas of the two smaller squares, when combined, equal the area of the largest square.",
            "The side length of the triangle is the same as the area of the attached square."
          ],
          "correctAnswers": [
            "The squares must be built projecting outward from the triangle's sides.",
            "The exponent '2' in the formula refers to the two dimensions of the square areas.",
            "The areas of the two smaller squares, when combined, equal the area of the largest square."
          ],
          "explanation": "The theorem describes a spatial relationship where the 2D space (area) of the two leg-squares sums exactly to the 2D space of the hypotenuse-square. The '2' in 'a squared' literally represents the two dimensions of these squares."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If a right triangle has a leg with a side length of 5 units, the physical square attached to that side occupies a total area of ____ units squared.",
          "options": [],
          "correctAnswers": [
            "25"
          ],
          "explanation": "To find the area, we use the side length as the base and height of a square (5 * 5), resulting in 25 square units of space.",
          "placeholder": "Enter the number"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If you are told that the 'square of the hypotenuse' is 100, what does the number 100 represent geometrically?",
          "options": [
            "The length of the longest side of the triangle.",
            "The total area of the square attached to the hypotenuse.",
            "The perimeter of the largest square.",
            "The result of squaring the area of the largest square."
          ],
          "correctAnswers": [
            "The total area of the square attached to the hypotenuse."
          ],
          "explanation": "A common mistake is thinking you need to square the result again; however, 'c squared' or the 'square of a side' is already the value of the area itself."
        }
      ]
    },
    {
      "sessionId": "7e413faa-ea83-4012-8445-ee52438d1590",
      "title": "The Core Area Equality",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If you are using a 3-4-5 right triangle to demonstrate the area relationship, why is counting the grid squares of the largest square particularly effective?",
          "options": [
            "It shows that the side lengths 3 and 4 add up to 5.",
            "It proves that the hypotenuse is always twice as long as the shortest leg.",
            "It allows the learner to see that the 25 unit squares exactly match the sum of the 9 and 16 squares from the legs.",
            "It demonstrates that the right angle can be any degree measurement."
          ],
          "correctAnswers": [
            "It allows the learner to see that the 25 unit squares exactly match the sum of the 9 and 16 squares from the legs."
          ],
          "explanation": "Grid counting turns the abstract formula into a physical reality, showing that the 2D space (area) of the two smaller squares (9 + 16) perfectly fills the 2D space of the largest square (25).",
          "caption": "A 3-4-5 right triangle with squares built on each side showing 9, 16, and 25 grid units respectively."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements correctly describe the roles of the triangle's sides in the 'Sum of Areas' principle?",
          "options": [
            "The legs act as the 'addends' in the area equation.",
            "The hypotenuse square represents the 'sum' or the 'whole'.",
            "The side lengths themselves (a and b) are added to find the hypotenuse length (c).",
            "The area of the square on the hypotenuse is the target area that the two smaller squares must fill.",
            "The largest side is always one of the two legs."
          ],
          "correctAnswers": [
            "The legs act as the 'addends' in the area equation.",
            "The hypotenuse square represents the 'sum' or the 'whole'.",
            "The area of the square on the hypotenuse is the target area that the two smaller squares must fill."
          ],
          "explanation": "In area terms, the squares of the legs are the parts that combine to equal the area of the square on the hypotenuse. We add areas (a² and b²), not the side lengths (a and b)."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The side of the triangle that is directly opposite the right angle is called the ____.",
          "options": [],
          "correctAnswers": [
            "hypotenuse"
          ],
          "explanation": "",
          "placeholder": "term for the longest side"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "What happens to the relationship between the three squares if the angle between the two legs is changed from 90 degrees to 100 degrees?",
          "options": [
            "The area of the square on the longest side will no longer equal the sum of the other two squares.",
            "The sum of the areas will stay the same because the side lengths haven't changed.",
            "The triangle will become a circle.",
            "The grid-count method will still work perfectly."
          ],
          "correctAnswers": [
            "The area of the square on the longest side will no longer equal the sum of the other two squares."
          ],
          "explanation": "The 'Core Area Equality' only holds true for right triangles. If the corner is not 'square' (90 degrees), the areas will not balance correctly."
        }
      ]
    },
    {
      "sessionId": "b73cce63-a6d8-4bc5-a7ed-9e00109dd18a",
      "title": "Non-Right Triangles and Area Mismatch",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In an equilateral triangle where all sides are equal to 5, which statement correctly describes the relationship of the side areas?",
          "options": [
            "a² + b² = c²",
            "a² + b² > c²",
            "a² + b² < c²",
            "a² + b² = 2c²"
          ],
          "correctAnswers": [
            "a² + b² > c²"
          ],
          "explanation": "An equilateral triangle has 60-degree angles (acute). Since the angle is smaller than 90 degrees, the third side 'c' is shorter than it would be in a right triangle, meaning the sum of the squares on the legs is greater than the square on the third side.",
          "caption": "Equilateral triangle with squares on all sides."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following conditions must be met for the equation a² + b² = c² to hold true for a triangle?",
          "options": [
            "The angle opposite side c must be exactly 90 degrees.",
            "The triangle must be equilateral.",
            "The triangle must not be obtuse.",
            "The triangle must not be acute.",
            "The sum of the internal angles must be 180 degrees."
          ],
          "correctAnswers": [
            "The angle opposite side c must be exactly 90 degrees.",
            "The triangle must not be obtuse.",
            "The triangle must not be acute."
          ],
          "explanation": "The Pythagorean theorem is an 'if and only if' relationship; it requires a right angle. If the triangle is obtuse or acute, the equality fails, resulting in an area mismatch."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When dealing with an obtuse triangle where the angle opposite side c is 120 degrees, the value of c² will be ____ than the sum of a² + b².",
          "options": [],
          "correctAnswers": [
            "greater",
            "larger",
            "more"
          ],
          "explanation": "In an obtuse triangle, the side opposite the wide angle must stretch further than in a right triangle, making its square area larger than the sum of the other two squares.",
          "placeholder": "greater or less"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why is the 90-degree angle referred to as a 'strict requirement' for the Pythagorean theorem?",
          "options": [
            "Because it is the only point where the areas of the squares on the legs perfectly balance the square on the hypotenuse.",
            "Because angles larger than 90 degrees make the triangle's area impossible to calculate.",
            "Because it is the only angle that allows a triangle to have three sides.",
            "Because it ensures that the perimeter of the triangle is always an even number."
          ],
          "correctAnswers": [
            "Because it is the only point where the areas of the squares on the legs perfectly balance the square on the hypotenuse."
          ],
          "explanation": "The theorem describes a specific state of equilibrium. Even a slight deviation from 90 degrees causes the area of the third square to either shrink below or grow above the sum of the other two."
        }
      ]
    },
    {
      "sessionId": "9ec8d572-ec33-4308-b7b3-ba8d69dc3547",
      "title": "The Large Square Construction",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When constructing the large square 'stage' for this proof, how do we determine the length of each side of the outer square?",
          "options": [
            "It is equal to the hypotenuse (c) of the right triangles.",
            "It is the sum of the long leg (b) and the short leg (a) of the triangle.",
            "It is twice the length of the shortest leg (a).",
            "It is calculated by finding the square root of the area of the triangles."
          ],
          "correctAnswers": [
            "It is the sum of the long leg (b) and the short leg (a) of the triangle."
          ],
          "explanation": "To create the specific 'four triangle' configuration, we build a square frame where each side is composed of one long leg (b) and one short leg (a) placed end-to-end, making the total side length (a+b).",
          "caption": "A square frame with side length a plus b containing four right triangles in the corners."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the 'four triangle' construction, which of the following properties must be true for the triangles used?",
          "options": [
            "All four triangles must be congruent (identical clones).",
            "The triangles must be isosceles (a = b).",
            "Each triangle must have one 90-degree angle.",
            "The hypotenuses must all be of different lengths."
          ],
          "correctAnswers": [
            "All four triangles must be congruent (identical clones).",
            "Each triangle must have one 90-degree angle."
          ],
          "explanation": "The proof relies on the four triangles being identical right triangles (congruent) so that their hypotenuses (c) are all equal and their corresponding angles allow the inner shape to be a perfect square."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If we represent the total area of the large square as a single expression based on its side length, that expression is ____.",
          "options": [],
          "correctAnswers": [
            "(a+b)^2",
            "(a + b)^2",
            "square of a+b"
          ],
          "explanation": "Since the side of the large outer square is the sum of the two legs (a + b), the area of that square is the side length multiplied by itself.",
          "placeholder": "e.g., (x+y)^2"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "What geometric shape is formed in the empty space at the center of the four triangles, and what is its side length?",
          "options": [
            "A rectangle with sides a and b.",
            "A square with side length c (the hypotenuse).",
            "A rhombus with side length a+b.",
            "A square with side length a-b."
          ],
          "correctAnswers": [
            "A square with side length c (the hypotenuse)."
          ],
          "explanation": "Because the four triangles are oriented with their hypotenuses facing inward, they bound a central 'hole'. Since all hypotenuses are equal (c) and the angles meet to form 90 degrees, the inner shape is a square of side c.",
          "caption": "The inner square formed by four hypotenuses of the surrounding triangles."
        }
      ]
    },
    {
      "sessionId": "9dc84965-5643-4fad-9c6f-199145a116a5",
      "title": "The Visual Proof by Subtraction",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the 'Two-Room Comparison' analogy, what does the 'empty space' in the first room (with the tilted square) represent in algebraic terms?",
          "options": [
            "a² + b²",
            "c²",
            "(a + b)²",
            "2ab"
          ],
          "correctAnswers": [
            "c²"
          ],
          "explanation": "In the first configuration, the four triangles are arranged such that their hypotenuses form the boundary of a single large square in the center, which has an area of c².",
          "caption": "A square containing four triangles that form a central tilted square of area c²."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "According to the principle of visual proof by subtraction, which of the following must be true for the proof to be valid? Select all that apply.",
          "options": [
            "The outer square's dimensions must remain constant in both configurations.",
            "The four triangles must be congruent (identical in shape and size).",
            "The triangles must overlap each other during the sliding process.",
            "The total area of the triangles must be the same in both arrangements."
          ],
          "correctAnswers": [
            "The outer square's dimensions must remain constant in both configurations.",
            "The four triangles must be congruent (identical in shape and size).",
            "The total area of the triangles must be the same in both arrangements."
          ],
          "explanation": "For the 'leftover' area to be equal in both cases, both the starting total area (the big square) and the amount being subtracted (the four triangles) must remain identical."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When we rearrange the triangles to form the second configuration, the empty space is no longer one large square but is redistributed into two smaller squares with areas ____.",
          "options": [],
          "correctAnswers": [
            "a² and b²",
            "a^2 and b^2",
            "a squared and b squared"
          ],
          "explanation": "",
          "placeholder": "e.g., x² and y²"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If the total area of the large container is 100 units and the four triangles together take up 60 units, what is the combined area of the 'a' and 'b' squares revealed after rearrangement?",
          "options": [
            "100 units",
            "60 units",
            "40 units",
            "160 units"
          ],
          "correctAnswers": [
            "40 units"
          ],
          "explanation": "The 'a² + b²' area is the leftover space after subtracting the triangles from the total area (100 - 60 = 40). This is the same amount of space as the 'c²' square in the first configuration."
        }
      ]
    },
    {
      "sessionId": "c4979d72-2dcb-484e-bf01-19dc13c92811",
      "title": "Expanding (a + b) Squared",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If a square has a side length defined as (a + b), which expression correctly represents its total area?",
          "options": [
            "a^2 + b^2",
            "a^2 + 2ab + b^2",
            "2a + 2b",
            "a^2 + ab + b^2"
          ],
          "correctAnswers": [
            "a^2 + 2ab + b^2"
          ],
          "explanation": "The area of a square is the side length squared. When you multiply (a + b) by (a + b), you must account for all terms: a*a, a*b, b*a, and b*b, which simplifies to a^2 + 2ab + b^2.",
          "caption": "A geometric area model of the binomial expansion (a+b) squared."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the context of the large composite square used to prove the Pythagorean theorem, which of these statements accurately describe the term '2ab'?",
          "options": [
            "It represents the total area of the four congruent right triangles with legs a and b.",
            "It is the result of adding (1/2)ab + (1/2)ab + (1/2)ab + (1/2)ab.",
            "It represents the area of the central square with side c.",
            "It is the 'connector' term that accounts for the rectangles in an area model.",
            "It represents the perimeter of the large square."
          ],
          "correctAnswers": [
            "It represents the total area of the four congruent right triangles with legs a and b.",
            "It is the result of adding (1/2)ab + (1/2)ab + (1/2)ab + (1/2)ab.",
            "It is the 'connector' term that accounts for the rectangles in an area model."
          ],
          "explanation": "Since one triangle has an area of (1/2)ab, four of them total 2ab. In a standard area model, this term also represents the two 'ab' rectangles that bridge the a^2 and b^2 squares."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "A common mistake in algebra is assuming that (a + b)^2 is equal to a^2 + b^2; however, this ignores the ____ term which represents the 'filling' area in the geometric model.",
          "options": [],
          "correctAnswers": [
            "2ab",
            "middle",
            "rectangles",
            "ab + ab"
          ],
          "explanation": "The '2ab' term is essential because it represents the two rectangles (each with area ab) that exist alongside the two smaller squares within the larger (a+b) square.",
          "placeholder": "e.g., 2ab"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why does the algebraic expansion of (a + b)(a + b) result in four terms before simplification?",
          "options": [
            "Because each of the two terms in the first set must be multiplied by each of the two terms in the second set.",
            "Because the square has four sides of equal length.",
            "Because there are four triangles in the geometric construction.",
            "Because the final equation must have a degree of four."
          ],
          "correctAnswers": [
            "Because each of the two terms in the first set must be multiplied by each of the two terms in the second set."
          ],
          "explanation": "Using distributive property (or FOIL), each part of the first binomial (a and b) must be multiplied by each part of the second (a and b), creating four distinct products: aa, ab, ba, and bb."
        }
      ]
    },
    {
      "sessionId": "7e0169cb-268b-418a-803e-b6161b5dfae0",
      "title": "The Formal Algebraic Proof",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the formal algebraic proof, why do we set the expression $(a+b)^2$ equal to $4(1/2)ab + c^2$?",
          "options": [
            "Because both expressions represent the area of the exact same large square.",
            "Because the sum of the triangles is always equal to the square of the hypotenuse.",
            "Because $(a+b)^2$ is the definition of a right-angled triangle's area.",
            "Because algebraic equations must always have a squared term on both sides."
          ],
          "correctAnswers": [
            "Because both expressions represent the area of the exact same large square."
          ],
          "explanation": "The 'logical engine' of this proof is the dual-perspective approach: calculating the total area of the large outer square in two different ways (as a whole and as a sum of parts) and setting them equal.",
          "caption": "A geometric construction showing a large square containing four right triangles and a smaller inner square."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following components are part of the 'Method 2' expression for the total area: $4(1/2)ab + c^2$?",
          "options": [
            "The area of four identical right triangles",
            "The area of the inner square with side length c",
            "The area of the outer square with side length (a+b)",
            "The product of the two squares a^2 and b^2"
          ],
          "correctAnswers": [
            "The area of four identical right triangles",
            "The area of the inner square with side length c"
          ],
          "explanation": "Method 2 breaks the large square into its internal components: four triangles (each with area 1/2*ab) and the central square (area c^2)."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When simplifying the equation $a^2 + 2ab + b^2 = 2ab + c^2$, we isolate the theorem by ____ $2ab$ from both sides.",
          "options": [],
          "correctAnswers": [
            "subtracting",
            "removing",
            "deducting"
          ],
          "explanation": "",
          "placeholder": "mathematical action"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "What does the term $2ab$ physically represent in the context of our geometric construction?",
          "options": [
            "The combined area of the four right triangles.",
            "The area of the inner square.",
            "The length of the hypotenuse squared.",
            "The perimeter of the large outer square."
          ],
          "correctAnswers": [
            "The combined area of the four right triangles."
          ],
          "explanation": "Each of the four triangles has an area of 1/2*ab. Multiplying this by 4 results in 2ab, which represents the total area covered by the triangles."
        }
      ]
    },
    {
      "sessionId": "05063f56-201f-41ec-8d33-55656f6a336e",
      "title": "Finding the Hypotenuse",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If you are using the Pythagorean Theorem to find the hypotenuse, what is the very first step you should take after identifying the lengths of the two legs?",
          "options": [
            "Add the two lengths together",
            "Take the square root of both lengths",
            "Square each length individually",
            "Multiply the two lengths together"
          ],
          "correctAnswers": [
            "Square each length individually"
          ],
          "explanation": "According to the order of operations in the formula a² + b² = c², you must square the legs (a and b) before you can sum them. Adding the lengths first is a common error that leads to an incorrect result."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements correctly describe the hypotenuse 'c' in a right triangle?",
          "options": [
            "It is always the side opposite the right angle.",
            "It can be shorter than one of the legs if the angle is small.",
            "It is represented by the variable 'c' in the theorem formula.",
            "It is the longest side of the right triangle.",
            "It is found by subtracting a² from b²."
          ],
          "correctAnswers": [
            "It is always the side opposite the right angle.",
            "It is represented by the variable 'c' in the theorem formula.",
            "It is the longest side of the right triangle."
          ],
          "explanation": "The hypotenuse is by definition the longest side and sits across from the 90-degree angle. In the formula a² + b² = c², 'c' is always the hypotenuse, while 'a' and 'b' are the legs.",
          "caption": "A diagram of a right triangle showing legs a and b and hypotenuse c."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The process of finding the length of the hypotenuse is not complete until you apply the ____ operation to the sum of the squared legs.",
          "options": [],
          "correctAnswers": [
            "square root",
            "sqrt",
            "root"
          ],
          "explanation": "Summing a² and b² gives you c², which represents the area of a square. To find the actual side length 'c', you must take the square root to 'undo' the square.",
          "placeholder": "Operation name"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "You are calculating the hypotenuse for a triangle with legs of 5 and 12. You have reached the step where c² = 169. What is the length of the hypotenuse?",
          "options": [
            "169",
            "13",
            "17",
            "84.5"
          ],
          "correctAnswers": [
            "13"
          ],
          "explanation": "The square root of 169 is 13. This final step is essential to convert the area value (c²) back into a linear distance (c)."
        }
      ]
    },
    {
      "sessionId": "783d1763-355f-4a2a-9e2a-491570f5813d",
      "title": "Solving for a Leg",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the Pythagorean theorem (a² + b² = c²), which algebraic step is required to isolate a² when the hypotenuse 'c' and leg 'b' are known?",
          "options": [
            "Add b² to both sides",
            "Subtract b² from both sides",
            "Subtract c² from both sides",
            "Take the square root of both sides first"
          ],
          "correctAnswers": [
            "Subtract b² from both sides"
          ],
          "explanation": "To isolate a², you must perform the inverse operation of the addition shown in the formula; subtracting b² from both sides results in a² = c² - b²."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements are true when solving for a missing leg of a right triangle?",
          "options": [
            "The missing leg must always be shorter than the hypotenuse.",
            "You should subtract the squares of the known sides: c² - b².",
            "You should subtract the lengths first, then square the result: (c - b)².",
            "The hypotenuse 'c' is always the longest side of the triangle.",
            "The formula remains a² + b² = c² regardless of which side is missing."
          ],
          "correctAnswers": [
            "The missing leg must always be shorter than the hypotenuse.",
            "You should subtract the squares of the known sides: c² - b².",
            "The hypotenuse 'c' is always the longest side of the triangle.",
            "The formula remains a² + b² = c² regardless of which side is missing."
          ],
          "explanation": "The hypotenuse is the longest side, so any leg must be shorter. The subtraction happens between the squared values (areas), not the raw lengths. The base formula is universal, but its arrangement changes based on the unknown."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "A 13ft ladder is leaning against a wall, and its base is 5ft away from the wall. The height of the wall where the ladder touches it is ____ feet.",
          "options": [],
          "correctAnswers": [
            "12"
          ],
          "explanation": "Using a² = c² - b², we calculate 13² - 5², which is 169 - 25 = 144. The square root of 144 is 12.",
          "placeholder": "Enter a number"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If a learner calculates the missing leg of a triangle with hypotenuse 10 and known leg 8, and they get an answer of 12.8, what error did they likely commit?",
          "options": [
            "They subtracted the lengths before squaring.",
            "They used the sine function instead of the Pythagorean theorem.",
            "They added the squares (100 + 64) instead of subtracting them.",
            "They forgot to take the square root at the end."
          ],
          "correctAnswers": [
            "They added the squares (100 + 64) instead of subtracting them."
          ],
          "explanation": "10² + 8² = 164, and the square root of 164 is approximately 12.8. This indicates they solved for a new hypotenuse instead of a leg. A leg must always be shorter than the hypotenuse (10)."
        }
      ]
    },
    {
      "sessionId": "926624cd-88b5-440b-ba18-05936202e70b",
      "title": "Common Triples (3-4-5 and 5-12-13)",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which of the following defines a 'Pythagorean triple' in the context of right triangles?",
          "options": [
            "Any three consecutive integers that can form a triangle",
            "Three positive integers where the sum of the two smaller equals the largest",
            "Three positive integers a, b, and c that satisfy the equation a² + b² = c²",
            "A set of three numbers where at least two are prime numbers"
          ],
          "correctAnswers": [
            "Three positive integers a, b, and c that satisfy the equation a² + b² = c²"
          ],
          "explanation": "A Pythagorean triple must consist of positive integers that satisfy the Pythagorean theorem. While 3-4-5 are consecutive, most triples are not, and the relationship is between their squares, not the numbers themselves."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Based on the Scaling Principle, which of these sets are also valid right triangles derived from the 3-4-5 ratio?",
          "options": [
            "9, 12, 15",
            "1.5, 2, 2.5",
            "30, 40, 50",
            "6, 8, 12",
            "4, 5, 6"
          ],
          "correctAnswers": [
            "9, 12, 15",
            "1.5, 2, 2.5",
            "30, 40, 50"
          ],
          "explanation": "Any set where the sides maintain the 3:4:5 ratio (by multiplying by 3, 0.5, or 10 respectively) forms a right triangle. The set 6-8-12 fails because the ratio is 3:4:6, not 3:4:5."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "To verify if the set {7, 24, 25} is a Pythagorean triple, you must confirm that 49 + 576 equals ____.",
          "options": [],
          "correctAnswers": [
            "625"
          ],
          "explanation": "To satisfy a² + b² = c², 7² (49) + 24² (576) must equal 25² (625). This confirms it is a valid triple.",
          "placeholder": "Result of 25 squared"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If a right triangle has a leg of 10 and a hypotenuse of 26, what is the length of the missing leg?",
          "options": [
            "16",
            "20",
            "24",
            "12"
          ],
          "correctAnswers": [
            "24"
          ],
          "explanation": "This triangle is a multiple of the 5-12-13 triple. By dividing the known sides (10 and 26) by 2, we get 5 and 13. The missing side must be 12 multiplied by the same scale factor (2), which is 24.",
          "caption": "Right triangle with hypotenuse 26 and one leg 10."
        }
      ]
    },
    {
      "sessionId": "32f4c667-bd0e-4e91-abf3-bd324f62ab67",
      "title": "Testing for Right Triangles",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "According to the Converse of the Pythagorean Theorem, if you find that a² + b² = c² for a given triangle, what conclusion must be true?",
          "options": [
            "The triangle is an equilateral triangle.",
            "The triangle must contain a 90-degree angle.",
            "The triangle is an acute triangle.",
            "The side lengths are incorrect."
          ],
          "correctAnswers": [
            "The triangle must contain a 90-degree angle."
          ],
          "explanation": "The Converse of the Pythagorean Theorem states that if the sum of the squares of the two shorter sides equals the square of the longest side, the triangle is guaranteed to be a right triangle (containing a 90-degree angle)."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following sets of side lengths would result in a perfect 'square' (right-angled) corner?",
          "options": [
            "3, 4, 5",
            "5, 12, 13",
            "10, 15, 20",
            "6, 8, 10",
            "7, 8, 12"
          ],
          "correctAnswers": [
            "3, 4, 5",
            "5, 12, 13",
            "6, 8, 10"
          ],
          "explanation": "Sets like 3-4-5 (9+16=25), 5-12-13 (25+144=169), and 6-8-10 (36+64=100) satisfy the equation a² + b² = c². The sets 10-15-20 and 7-8-12 do not result in an exact equality."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "A builder measures two walls. One is 6 feet long, the other is 8 feet long. If the diagonal distance between the ends of the walls is 11 feet, what can the builder conclude about the corner?",
          "options": [
            "The corner is exactly 90 degrees.",
            "The corner is not square because 36 + 64 does not equal 121.",
            "The corner is square because 6 + 8 is close to 11.",
            "The corner is square because the walls are straight."
          ],
          "correctAnswers": [
            "The corner is not square because 36 + 64 does not equal 121."
          ],
          "explanation": "To be square, 6² + 8² (100) must equal the diagonal squared (11² = 121). Since 100 does not equal 121, the corner is not a right angle.",
          "caption": "A diagram of a corner with sides 6 and 8 and a diagonal of 11."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "When testing if a triangle is a right triangle using the formula a² + b² = c², which of the following must be true to avoid a calculation error?",
          "options": [
            "The variable 'c' must always represent the longest side.",
            "The values 'a' and 'b' must be the two shorter sides.",
            "The equality must be exact, not just 'close'.",
            "You must assume the angle is 90 degrees before starting.",
            "The triangle must be equilateral."
          ],
          "correctAnswers": [
            "The variable 'c' must always represent the longest side.",
            "The values 'a' and 'b' must be the two shorter sides.",
            "The equality must be exact, not just 'close'."
          ],
          "explanation": "To correctly use the converse, 'c' must be the hypotenuse (the longest side). Because geometry requires precision, even a small difference in the equality means the angle is not exactly 90 degrees."
        }
      ]
    },
    {
      "sessionId": "d7b1bfc0-6969-4b56-9586-40f03caafae7",
      "title": "The Distance Formula in 2D",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When calculating the distance between points (x1, y1) and (x2, y2), why does it not matter if you subtract x1 from x2 or x2 from x1?",
          "options": [
            "The coordinate plane is inherently symmetrical across the origin.",
            "Squaring a negative result produces the same positive value as squaring its positive counterpart.",
            "The absolute value of the differences is always taken before squaring.",
            "The Pythagorean theorem only applies to positive integer coordinates."
          ],
          "correctAnswers": [
            "Squaring a negative result produces the same positive value as squaring its positive counterpart."
          ],
          "explanation": "Because (x2 - x1) is squared in the distance formula, a negative result (like -3) becomes the same positive area (9) as its positive counterpart (3). This ensures the length of the 'leg' is always treated as a positive magnitude."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are necessary steps when deriving the distance between two points (1, 2) and (4, 6) using the 'Invisible Triangle' method?",
          "options": [
            "Calculate the horizontal change (Δx) by subtracting the x-coordinates.",
            "Sum the x and y coordinates of both points to find the midpoint.",
            "Square the lengths of the horizontal and vertical legs.",
            "Take the square root of the sum of the squared differences.",
            "Multiply the x-difference by the y-difference to find the area."
          ],
          "correctAnswers": [
            "Calculate the horizontal change (Δx) by subtracting the x-coordinates.",
            "Square the lengths of the horizontal and vertical legs.",
            "Take the square root of the sum of the squared differences."
          ],
          "explanation": "To find the distance (hypotenuse), you must find the lengths of the legs (differences in x and y), square them (Pythagorean theorem), and then take the square root of their sum.",
          "caption": "A right triangle on a coordinate plane showing the vertical and horizontal legs connecting two points."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the context of the Distance Formula, the expression (x2 - x1) represents the length of the ____ leg of the invisible right triangle.",
          "options": [],
          "correctAnswers": [
            "horizontal",
            "horizontal leg",
            "bottom",
            "x"
          ],
          "explanation": "The difference in x-coordinates measures how far apart the points are along the x-axis, which corresponds to the horizontal side of the right triangle.",
          "placeholder": "e.g. vertical"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If a computer is checking if a mouse click at (7, 8) is inside a circular button centered at (4, 4) with a radius of 6, what is the 'engine' it uses to determine the distance?",
          "options": [
            "The Slope Formula",
            "The Midpoint Theorem",
            "The Pythagorean Theorem",
            "The Law of Sines"
          ],
          "correctAnswers": [
            "The Pythagorean Theorem"
          ],
          "explanation": "The Distance Formula is a direct application of the Pythagorean Theorem (a² + b² = c²). Computers use this to calculate the 'air distance' between the click and the center to see if it's less than the radius."
        }
      ]
    },
    {
      "sessionId": "8f4aaad2-ca54-466e-8aad-0ead8dcd3f15",
      "title": "Introduction to 3D Diagonals",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a rectangular prism with length $l$, width $w$, and height $h$, which geometric feature serves as the 'bridge' that allows us to transition from 2D to 3D calculations?",
          "options": [
            "The perimeter of the base",
            "The diagonal of the floor",
            "The area of the side walls",
            "The volume of the prism"
          ],
          "correctAnswers": [
            "The diagonal of the floor"
          ],
          "explanation": "The floor diagonal acts as the hypotenuse for the horizontal legs and then becomes the base leg for the vertical triangle that includes the height.",
          "caption": "A diagram of a rectangular prism showing the floor diagonal connecting to the space diagonal."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements correctly describe the relationship between 2D and 3D diagonals?",
          "options": [
            "The 3D formula $d^2 = x^2 + y^2 + z^2$ is an extension of the 2D Pythagorean theorem.",
            "The floor diagonal is always perpendicular to the vertical height of the room.",
            "The 3D diagonal is found by simply adding the height to the length of the floor diagonal.",
            "A 3D diagonal is the hypotenuse of an 'invisible' right triangle inside the box.",
            "You must calculate the volume of the box before you can find the space diagonal."
          ],
          "correctAnswers": [
            "The 3D formula $d^2 = x^2 + y^2 + z^2$ is an extension of the 2D Pythagorean theorem.",
            "The floor diagonal is always perpendicular to the vertical height of the room.",
            "A 3D diagonal is the hypotenuse of an 'invisible' right triangle inside the box."
          ],
          "explanation": "The 3D diagonal is the hypotenuse of a triangle where one leg is the height and the other is the floor diagonal; since the wall is perpendicular to the floor, these two legs meet at a 90-degree angle. Adding the height directly to the diagonal length without squaring (the 'Flattening Trap') is mathematically incorrect."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "To find the space diagonal of a room that is 12ft by 9ft with an 8ft ceiling, we first find the floor diagonal is 15ft, then calculate the final diagonal to be ____ feet.",
          "options": [],
          "correctAnswers": [
            "17"
          ],
          "explanation": "",
          "placeholder": "Result"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "When applying the formula $d^2 = l^2 + w^2 + h^2$, why is it unnecessary to find the square root of $(l^2 + w^2)$ if you are solving for the final space diagonal?",
          "options": [
            "Because the square root of the floor diagonal is always a whole number.",
            "Because the height $h$ is already the square root of the width.",
            "Because the formula uses the square of the floor diagonal ($d_{floor}^2$) as a leg.",
            "Because the 3D diagonal only depends on the surface area of the base."
          ],
          "correctAnswers": [
            "Because the formula uses the square of the floor diagonal ($d_{floor}^2$) as a leg."
          ],
          "explanation": "The second step of the calculation is $d_{space}^2 = (d_{floor})^2 + h^2$. Since the first step gives us $d_{floor}^2 = l^2 + w^2$, we can substitute that sum directly into the equation without ever finding the intermediate square root."
        }
      ]
    }
  ]
};

export const REGRESSION_PRACTICE = {
  "id": "regression",
  "aliases": [
    "706d4d5c-1b4d-4707-abb0-45fc9b1f4926"
  ],
  "title": "Linear Regression",
  "sessions": [
    {
      "sessionId": "b38a83f7-1f82-4f7c-a309-3598f1ac9e7a",
      "title": "Patterns in the Cloud: Scatterplots and Correlation",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You observe a scatterplot where the data points move from the top-left toward the bottom-right. How should this relationship be characterized?",
          "options": [
            "A positive correlation, because the variables move in the same direction.",
            "A negative correlation, because Y decreases as X increases.",
            "A null relationship, because the points do not form a horizontal line.",
            "A non-linear relationship, because the cloud is drifting downward."
          ],
          "correctAnswers": [
            "A negative correlation, because Y decreases as X increases."
          ],
          "explanation": "In a negative correlation, the variables move in opposite directions: as you move right along the X-axis (increase), the Y-values tend to drop (decrease).",
          "caption": "A scatterplot with points trending downwards."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When assessing the 'strength' of a relationship in a scatterplot, which of the following visual characteristics are most relevant?",
          "options": [
            "How closely the points cluster around an underlying path.",
            "The steepness or angle of the overall slope.",
            "The predictability of Y given a specific value of X.",
            "The total number of data points plotted on the axes.",
            "The amount of 'noise' or vertical scatter relative to the 'signal'."
          ],
          "correctAnswers": [
            "How closely the points cluster around an underlying path.",
            "The predictability of Y given a specific value of X.",
            "The amount of 'noise' or vertical scatter relative to the 'signal'."
          ],
          "explanation": "Strength is defined by 'tightness' and predictability (low noise), not by how steep the slope is. A very shallow slope can still represent a perfectly strong relationship if the points have zero scatter."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "A scatterplot that shows a clear 'U-shape' or curve indicates a relationship that is ____, meaning a straight line may fail to capture the true pattern.",
          "options": [],
          "correctAnswers": [
            "non-linear",
            "nonlinear",
            "non linear"
          ],
          "explanation": "Non-linear patterns have a clear 'signal' or shape, but because they aren't straight, linear tools might mistakenly report a weak or null relationship.",
          "placeholder": "e.g., linear or non-linear"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If a scatterplot looks like a circular, random cloud of points with no discernible drift, what does this tell us about the variables?",
          "options": [
            "There is a strong negative correlation.",
            "The independent variable is causing the dependent variable to stay constant.",
            "There is a null relationship, meaning X provides no information about Y.",
            "The data is non-linear and requires a curved line."
          ],
          "correctAnswers": [
            "There is a null relationship, meaning X provides no information about Y."
          ],
          "explanation": "A circular cloud suggests 'null' correlation. Because there is no 'flow' or trend, knowing the value of X does not help you predict whether Y will be high or low.",
          "caption": "A random cloud of points with no trend."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the points in the simulation move from a circular spread into a thin, tight diagonal line, why does our ability to predict the outcome improve?",
          "options": [
            "Because the slope of the line is becoming steeper, increasing the effect size.",
            "Because the 'noise' or vertical variation around the trend is decreasing.",
            "Because the variables are switching from a negative to a positive correlation.",
            "Because the number of data points is increasing, providing more evidence."
          ],
          "correctAnswers": [
            "Because the 'noise' or vertical variation around the trend is decreasing."
          ],
          "explanation": "Strength of correlation is visually represented by the 'tightness' of the cluster. As points move closer to a central path, there is less unexplained 'noise,' making predictions more accurate.",
          "scene": "scatter-cloud"
        }
      ]
    },
    {
      "sessionId": "6dcdbc8c-6993-4810-a663-69cad7be444e",
      "title": "The Pencil Test: Manually Fitting a Trend",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When applying the 'Pencil Test' to a scatterplot, what is the primary goal of the person drawing the line?",
          "options": [
            "To connect as many individual data points as possible",
            "To ensure the line passes through the origin (0,0)",
            "To balance the line so it represents the 'average' behavior of the data cloud",
            "To ignore any points that do not fall on a perfectly straight path"
          ],
          "correctAnswers": [
            "To balance the line so it represents the 'average' behavior of the data cloud"
          ],
          "explanation": "The line of best fit acts as a 'summarizer' of the data. Its goal is to represent the overall trend or central tendency of the relationship, rather than hitting specific points or starting at zero.",
          "caption": "A scatter cloud with a balanced pencil line — the slope sits in the middle of the drift."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "If a line is said to be 'under-reacting' to a set of steep data points, which of the following adjustments would likely improve the fit? Select all that apply.",
          "options": [
            "Increasing the slope of the line",
            "Decreasing the slope of the line",
            "Rotating the line to better match the rate of change",
            "Shifting the entire line vertically without changing the angle"
          ],
          "correctAnswers": [
            "Increasing the slope of the line",
            "Rotating the line to better match the rate of change"
          ],
          "explanation": "Under-reacting means the line's angle (slope) is too flat compared to the data's steepness. To fix this, you must adjust the slope/angle to reflect the correct rate of change.",
          "caption": "A steep scatterplot with a flat line illustrating an under-reacting slope."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the context of manually fitting a trend, a ____ is the visual gap or vertical distance between an observed data point and the predicted value on the line.",
          "options": [],
          "correctAnswers": [
            "residual",
            "error",
            "residual error"
          ],
          "explanation": "The residual is the vertical miss: how far a point sits above or below the pencil line.",
          "placeholder": "Enter the term...",
          "caption": "Vertical residual ticks from each point down to the pencil line."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "What usually happens to the overall fit of a model if you move your 'pencil' to perfectly intercept a single extreme outlier?",
          "options": [
            "The fit improves because the line now accounts for all data points.",
            "The line becomes less representative of the majority of the data points.",
            "The slope remains the same while only the intercept changes.",
            "The residuals for the other points will naturally decrease."
          ],
          "correctAnswers": [
            "The line becomes less representative of the majority of the data points."
          ],
          "explanation": "Chasing an outlier often ruins the 'global' fit. By trying to minimize the error for one extreme point, you significantly increase the residuals for the larger cluster of points.",
          "caption": "Comparison of a balanced line versus a line distorted by an outlier."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the slider moves to change the angle of the line, why does the line eventually become a 'better' fit for the cloud of points?",
          "options": [
            "The line is forced to touch the outlier at the edge of the screen.",
            "The total vertical distance between all points and the line reaches a minimum balance.",
            "The line becomes perfectly horizontal, which is the goal of every regression.",
            "The line moves to ensure there are no points remaining below it."
          ],
          "correctAnswers": [
            "The total vertical distance between all points and the line reaches a minimum balance."
          ],
          "explanation": "A 'good fit' occurs when the line's slope and intercept minimize the collective residuals. You can see this as the 'gaps' between the points and the line shrink as the angle aligns with the data cloud.",
          "scene": "scatter-cloud",
          "caption": "The pencil rotates until residual gaps on the scatter cloud balance."
        }
      ]
    },
    {
      "sessionId": "7bcb07a2-ba95-4139-a713-a0c60ba9cad5",
      "title": "Vertical Gaps: Defining the Residual",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the context of linear regression, what exactly does the notation $\\hat{y}$ (y-hat) represent?",
          "options": [
            "The average value of all observed data points in the set",
            "The horizontal distance between a data point and the y-axis",
            "the specific Y-value predicted by the model for a given X",
            "The slope of the line that best fits the scattered data"
          ],
          "correctAnswers": [
            "the specific Y-value predicted by the model for a given X"
          ],
          "explanation": "$\\hat{y}$ is the formal notation for a prediction. While $y$ represents the actual observed value, $\\hat{y}$ represents the value the 'prediction engine' (the line) claims is correct for that specific $x$.",
          "caption": "A scatter cloud with the pencil line marked ŷ at one x, and the observed y sitting above it."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements accurately describe a 'residual' in a regression model?",
          "options": [
            "It is the vertical distance between the observed point and the prediction line.",
            "It is calculated as the observed value minus the predicted value ($y - \\hat{y}$).",
            "It represents the shortest perpendicular distance from a point to the line.",
            "A positive residual indicates that the model has under-predicted the actual value."
          ],
          "correctAnswers": [
            "It is the vertical distance between the observed point and the prediction line.",
            "It is calculated as the observed value minus the predicted value ($y - \\hat{y}$).",
            "A positive residual indicates that the model has under-predicted the actual value."
          ],
          "explanation": "Residuals are vertical (not perpendicular) because we are measuring error specifically in the Y-dimension. If the point is above the line, the residual is positive ($y > \\hat{y}$), meaning the model's prediction was too low (under-prediction).",
          "caption": "Vertical residual: the gap from observed y down to ŷ on the pencil line."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If an observed data point is located at $(5, 12)$ and the regression line predicts a value of $15$ when $x=5$, the residual for this point is ____.",
          "options": [],
          "correctAnswers": [
            "-3",
            "negative 3"
          ],
          "explanation": "Residual = y − ŷ. Here 12 − 15 = −3, so the point sits below the prediction.",
          "placeholder": "Enter a number",
          "caption": "At x = 5 the observed y is 12 and ŷ is 15; the residual tick points down."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why do we measure the distance to the line vertically rather than using the shortest perpendicular path?",
          "options": [
            "Vertical distances are easier to calculate with basic geometry.",
            "We are predicting Y based on X, so 'error' only exists in the Y-dimension.",
            "Perpendicular distances would result in a slope of zero for every model.",
            "The X-values are usually assumed to contain more error than the Y-values."
          ],
          "correctAnswers": [
            "We are predicting Y based on X, so 'error' only exists in the Y-dimension."
          ],
          "explanation": "Because our goal is to predict the dependent variable (Y), the 'wrongness' of our prediction is defined by how far off our Y-estimate is from the actual Y-result at that specific X-coordinate.",
          "caption": "Residuals are vertical ticks, not the shortest perpendicular to the line."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As you tilt the line to pass through different regions of the data, why does the 'total error' feel like a game of trade-offs?",
          "options": [
            "Decreasing the vertical gap for points on the left inevitably increases the gaps for points on the right.",
            "The line must always pass through the average of all Y-values regardless of the slope.",
            "Moving the line closer to one point reduces its individual residual but can increase the residuals of others.",
            "The residuals are forced to sum to zero only when the line is perfectly horizontal."
          ],
          "correctAnswers": [
            "Moving the line closer to one point reduces its individual residual but can increase the residuals of others."
          ],
          "explanation": "The simulation shows that as the line moves toward one cluster, the vertical bars (residuals) for those points shrink, but the bars for distant points grow longer. Finding the best fit is about balancing these competing distances.",
          "scene": "scatter-cloud",
          "caption": "Tilting the pencil trades one residual for another until the ŷ line balances the cloud."
        }
      ]
    },
    {
      "sessionId": "e752a915-d53d-4cd7-bbd6-933d153839a9",
      "title": "The Tug-of-War: Balancing Total Error",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the 'Tug-of-War' analogy for a regression line, what does the 'equilibrium state' represent?",
          "options": [
            "A line that passes through the maximum number of data points",
            "The state where the total error across all points is minimized",
            "A line that ignores outliers to maintain a perfect horizontal balance",
            "The point where all residuals are exactly equal to zero"
          ],
          "correctAnswers": [
            "The state where the total error across all points is minimized"
          ],
          "explanation": "The equilibrium state is the 'Optimal Balance Point' where the collective tension or total frustration of the system is at its lowest possible value, even if individual points still have residuals.",
          "caption": "Tug-of-war on a scatter cloud: residuals pull the pencil until total error is minimized."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "If you adjust a regression line to reduce the residual of a single distant outlier, what are the likely consequences for the rest of the model?",
          "options": [
            "The residuals of points previously close to the line may increase.",
            "The total sum of squared errors will always decrease.",
            "The line may 'tilt' or 'pivot' away from the cluster of central points.",
            "The errors of all other points will stay the same because the line is rigid."
          ],
          "correctAnswers": [
            "The residuals of points previously close to the line may increase.",
            "The line may 'tilt' or 'pivot' away from the cluster of central points."
          ],
          "explanation": "Because the model seeks a global compromise, helping one point (especially an outlier) often 'hurts' others by pulling the line away from them, demonstrating the trade-off mechanism.",
          "caption": "Chasing one outlier residual tilts the pencil and lengthens residual ticks on the main cloud."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When calculating global error, simply summing raw residuals is problematic because positive and negative values ____ each other out.",
          "options": [],
          "correctAnswers": [
            "cancel",
            "offset",
            "neutralize"
          ],
          "explanation": "A point 5 units above (+5) and 5 units below (-5) sum to zero, which would falsely suggest a perfect fit despite a total of 10 units of absolute distance from the line.",
          "placeholder": "What do positive and negative values do?",
          "caption": "A +5 residual above the line and a −5 below cancel, hiding 10 units of miss."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Which of the following best describes the 'Trade-off Mechanism' in linear regression?",
          "options": [
            "Removing outliers to make the total error calculation simpler.",
            "Accepting higher errors in some points to achieve a lower overall error for the system.",
            "Ensuring that the number of points above the line equals the number of points below.",
            "Treating every point's error as independent of the line's overall position."
          ],
          "correctAnswers": [
            "Accepting higher errors in some points to achieve a lower overall error for the system."
          ],
          "explanation": "The trade-off mechanism acknowledges that we seek a compromise (optimal balance) rather than trying to perfectly hit every individual point.",
          "caption": "The pencil accepts some residual ticks so the total tension on the cloud drops."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the 'Total Sum' line remain at zero even as the line pivots further away from the data points?",
          "options": [
            "The positive residuals on one side of the pivot perfectly balance the negative residuals on the other.",
            "The line is anchored to the mean of the data, which forces the sum of distances to be zero.",
            "The simulation is only measuring the distance of the points that are exactly on the line.",
            "The points are moving closer to the line as it rotates, keeping the total error constant."
          ],
          "correctAnswers": [
            "The positive residuals on one side of the pivot perfectly balance the negative residuals on the other."
          ],
          "explanation": "This demonstrates the 'Cancellation Problem.' Even as the fit gets visibly worse, the raw sum stays at zero because the increased positive errors are countered by increased negative errors.",
          "scene": "scatter-cloud",
          "caption": "Pivoting the pencil: positive and negative residual ticks cancel even as the cloud fit gets worse."
        },
      ]
    },
    {
      "sessionId": "b44ac772-4b9e-4f2b-9254-3342a480ee6b",
      "title": "Springs and Tension: A Physics Analogy",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If the rigid rod representing the regression line is currently positioned above the mean of all Y-coordinates (the centroid), what must happen for the system to reach equilibrium?",
          "options": [
            "The rod must shift downward because there is a net downward force from the springs.",
            "The rod must rotate clockwise until it becomes perfectly horizontal.",
            "The rod must shift upward to further increase the potential energy of the system.",
            "The rod will remain stationary because the centroid does not affect vertical tension."
          ],
          "correctAnswers": [
            "The rod must shift downward because there is a net downward force from the springs."
          ],
          "explanation": "If the rod is not at the centroid, the forces are not balanced. If it is too high, the 'pull' from the points below outweighs the pull from any points above, creating a net downward force until it hits the balance point (the mean).",
          "caption": "A diagram showing a rod positioned above a cluster of points, with tension arrows indicating a downward pull."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In our physical analogy, which of the following statements correctly map a statistical concept to a physical property? (Select all that apply)",
          "options": [
            "The vertical distance between a point and the rod represents the residual.",
            "The total potential energy of the spring system represents the sum of squared errors.",
            "The stiffness of the springs represents the number of observations in the dataset.",
            "The 'Line of Best Fit' represents the state of lowest total tension in the system."
          ],
          "correctAnswers": [
            "The vertical distance between a point and the rod represents the residual.",
            "The total potential energy of the spring system represents the sum of squared errors.",
            "The 'Line of Best Fit' represents the state of lowest total tension in the system."
          ],
          "explanation": "The residual is the displacement (x), the squared error is the energy (1/2 kx²), and OLS seeks to minimize this total energy to find the equilibrium position.",
          "caption": "Each residual is a spring: stretch is the vertical miss, tension is the squared error."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The physical model explains why we square the residuals in OLS; it is because the ____ of a physical spring is proportional to the square of its displacement.",
          "options": [],
          "correctAnswers": [
            "potential energy",
            "energy",
            "stored energy"
          ],
          "placeholder": "Enter physical property",
          "caption": "Spring energy ½kx² is why OLS squares residuals instead of summing signed gaps."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Imagine a dataset where all points are perfectly aligned in a straight line. If you attach the springs and release the rod, what will the total tension in the system be at equilibrium?",
          "options": [
            "Zero",
            "It will be equal to the average Y-value",
            "It will be at its maximum possible value",
            "It depends on the number of points in the line"
          ],
          "correctAnswers": [
            "Zero"
          ],
          "explanation": "If points are perfectly collinear, the rod can pass directly through every point. In this state, the springs are not stretched or compressed at all, meaning the displacement and the resulting potential energy (tension) are zero.",
          "caption": "A collinear scatter cloud: every spring is slack, so total tension on the rod is zero."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As you move the outlier further away from the central cluster of data points, why does the rod tilt so aggressively toward it?",
          "options": [
            "Because the potential energy in a spring increases quadratically with its stretch, giving distant points disproportionate pull.",
            "Because the rod must always pass through every data point that exceeds a certain distance threshold to maintain balance.",
            "Because the springs connected to the cluster lose their tension entirely once the outlier reaches a critical distance.",
            "Because the system is programmed to prioritize points with the highest individual Y-values regardless of their X-position."
          ],
          "correctAnswers": [
            "Because the potential energy in a spring increases quadratically with its stretch, giving distant points disproportionate pull."
          ],
          "explanation": "In our physical analogy, the 'squared error' of OLS corresponds to the potential energy of a spring (1/2 kx²). Since energy increases with the square of the distance, a point twice as far away exerts four times the 'pull' on the rod's position.",
          "scene": "scatter-cloud",
          "caption": "The far outlier spring pulls the rod four times as hard: squared stretch, not linear."
        },
      ]
    },
    {
      "sessionId": "4820d42a-7a2b-4d22-98e0-686408627512",
      "title": "Leverage and Influence: When One Point Rules",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If the mean of the predictor variables $(\\bar{x}, \\bar{y})$ acts as the fulcrum of a see-saw, which point would have the highest leverage?",
          "options": [
            "A point with a very large residual located near the center of the x-range.",
            "A point located at the exact coordinates of the mean $(\\bar{x}, \\bar{y})$.",
            "A point located at the far horizontal edge of the data range.",
            "A point with a y-value equal to the mean $\\bar{y}$ but a typical x-value."
          ],
          "correctAnswers": [
            "A point located at the far horizontal edge of the data range."
          ],
          "explanation": "Leverage is determined by how far a point's x-value is from the mean of all x-values. Just like a lever, the further you are from the fulcrum (the center of the data), the more potential power you have to tilt the line.",
          "caption": "Fulcrum at (x̄, ȳ): the far-right chalk dot has the longest lever arm."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements accurately describe 'Leverage' in the context of linear regression?",
          "options": [
            "It is primarily a property of the predictor (X) values.",
            "High leverage always results in a significant change to the model slope.",
            "It measures how far an observation's X-value is from the mean X-value.",
            "A point with zero residual cannot have high leverage.",
            "It represents the potential of a point to influence the fit."
          ],
          "correctAnswers": [
            "It is primarily a property of the predictor (X) values.",
            "It measures how far an observation's X-value is from the mean X-value.",
            "It represents the potential of a point to influence the fit."
          ],
          "explanation": "Leverage depends only on the X-values (the horizontal position). While leverage gives a point the 'potential' to change the slope, it only becomes influential if the point also has a high residual (is an outlier).",
          "caption": "Leverage is how far a point sits from the fulcrum on the x-axis, not how tall its residual tick is."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the relationship between data points and model stability, Influence is often conceptualized as the product of Leverage and ____.",
          "options": [],
          "correctAnswers": [
            "Outlierness",
            "Residual",
            "the residual",
            "residual magnitude"
          ],
          "explanation": "Influence measures the actual effect a point has on the model. It requires both leverage (horizontal distance) and 'outlierness' (vertical distance from the trend) to truly pull the line away from the other points.",
          "placeholder": "Enter the term for vertical distance",
          "caption": "Influence = leverage × residual: a far fulcrum point only tilts the line if it also misses ŷ."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Suppose you have a point with very high leverage, but it sits exactly on the regression line calculated by the rest of the data. What is the effect of this point on the slope?",
          "options": [
            "It will significantly rotate the line toward the origin.",
            "It will have little to no effect on the slope.",
            "It will increase the slope regardless of its position.",
            "It will make the model's standard error drop to zero."
          ],
          "correctAnswers": [
            "It will have little to no effect on the slope."
          ],
          "explanation": "Even though the point has high leverage (potential power), it is not an outlier relative to the trend. Since it 'agrees' with the existing slope, it reinforces the trend rather than influencing or changing it.",
          "caption": "High-leverage point on the pencil line: long lever, zero residual, almost no influence."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As you move the lone outlier further to the right while keeping its vertical distance from the main cluster the same, why does the regression line rotate more aggressively toward that single point?",
          "options": [
            "Because increasing the horizontal distance from the fulcrum increases the mechanical advantage of that point.",
            "Because the vertical residual of the point increases automatically as it moves further along the x-axis.",
            "Because the mean of the data shifts to follow the point, changing the fulcrum position.",
            "Because the model is forced to minimize the total sum of x-values rather than the squared errors."
          ],
          "correctAnswers": [
            "Because increasing the horizontal distance from the fulcrum increases the mechanical advantage of that point."
          ],
          "explanation": "As the animation shows, the further the point is from the center (the fulcrum), the more 'leverage' it gains. Even with the same vertical 'pull', the increased distance makes it more influential, causing the entire line to rotate.",
          "scene": "scatter-cloud",
          "caption": "Slide the outlier right: same residual height, longer lever, the ŷ line rotates harder."
        },
      ]
    },
    {
      "sessionId": "884adde8-dbbb-492a-aed5-6972fde047f9",
      "title": "Residuals: The Language of Error",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the formal notation of linear regression, what does the symbol y-hat (ŷ) specifically represent?",
          "options": [
            "The ground truth value observed in the actual data",
            "The vertical distance between a data point and the regression line",
            "The value calculated by the model's equation for a given input x",
            "The average value of all dependent variables in the dataset"
          ],
          "correctAnswers": [
            "The value calculated by the model's equation for a given input x"
          ],
          "explanation": "While 'y' represents the observed ground truth, ŷ represents the prediction made by the model (y = mx + b). It is the point that lies exactly on the regression line for any given x.",
          "caption": "ŷ sits on the pencil line; y is the chalk dot. The residual tick is e = y − ŷ."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "A data point exists at (4, 15), but the regression model predicts a value of 12 for x=4. Which of the following statements are true about this specific residual?",
          "options": [
            "The residual (e) is equal to 3",
            "The residual (e) is equal to -3",
            "The model has over-predicted the value",
            "The model has under-predicted the value",
            "The data point lies above the regression line"
          ],
          "correctAnswers": [
            "The residual (e) is equal to 3",
            "The model has under-predicted the value",
            "The data point lies above the regression line"
          ],
          "explanation": "Residual is calculated as e = y - ŷ. Here, 15 - 12 = 3. Because the residual is positive, the actual value is higher than predicted (under-prediction), meaning the point sits above the line.",
          "caption": "At x = 4, y = 15 and ŷ = 12 so e = +3: the tick points up."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When calculating residuals in linear regression, we measure the ____ distance between the observed data point and the prediction line.",
          "options": [],
          "correctAnswers": [
            "vertical",
            "Vertical"
          ],
          "explanation": "We measure vertical distance because the residual represents the error in the dependent variable (y) we are trying to predict, not the perpendicular geometric distance to the line.",
          "placeholder": "e.g. horizontal",
          "caption": "Residuals are vertical ticks from the dot down (or up) to ŷ, not the shortest slant to the line."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why is the order of subtraction (e = y - ŷ) maintained consistently in regression analysis?",
          "options": [
            "To ensure that all residuals result in a positive number",
            "To indicate whether the model is over-predicting or under-predicting the data",
            "Because the mathematical proof for the line of best fit only works with y - ŷ",
            "To make sure the residual is always smaller than the observed value"
          ],
          "correctAnswers": [
            "To indicate whether the model is over-predicting or under-predicting the data"
          ],
          "explanation": "Consistency in the sign (positive vs. negative) allows us to see the direction of error. A negative residual consistently means the model's 'ŷ' was higher than the actual 'y' (over-prediction).",
          "caption": "Keep e = y − ŷ: plus means the dot is above the line, minus means ŷ overshot."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the slider moves the regression line from a high position to a lower position through the center of the data, why do some individual residuals change sign from negative to positive?",
          "options": [
            "Because the predicted values (ŷ) are decreasing, causing y - ŷ to transition from a negative value to a positive one.",
            "Because the model is becoming less biased toward larger x-values in the dataset.",
            "Because the observed values (y) are being recalculated by the system as the line moves.",
            "Because the vertical distance is being converted into horizontal distance as the line rotates."
          ],
          "correctAnswers": [
            "Because the predicted values (ŷ) are decreasing, causing y - ŷ to transition from a negative value to a positive one."
          ],
          "explanation": "As the line (the predictions) moves downward, the value of ŷ decreases. When ŷ becomes smaller than the fixed data point y, the subtraction result (y - ŷ) flips from negative to positive.",
          "scene": "scatter-cloud",
          "caption": "Drop the pencil: ŷ falls, so e = y − ŷ flips from minus (over-predict) to plus (under-predict)."
        },
      ]
    },
    {
      "sessionId": "6caa0b32-3665-42cb-8e1d-2ab0ff1c0bbb",
      "title": "The Objective Function: Aggregating Error",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the context of evaluating a linear model, what is the primary purpose of an objective function?",
          "options": [
            "To determine the exact slope and intercept of the line directly from the data",
            "To provide a single global metric that quantifies the total discrepancy between the model and the data",
            "To calculate the individual distance between each data point and the regression line",
            "To ensure that every individual residual is reduced to exactly zero"
          ],
          "correctAnswers": [
            "To provide a single global metric that quantifies the total discrepancy between the model and the data"
          ],
          "explanation": "An objective function aggregates individual residuals into a single numerical value, allowing us to compare different candidate lines and rank them based on their overall performance.",
          "caption": "Many residual ticks collapse into one chalkboard score for the whole cloud."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following metrics successfully prevent positive and negative residuals from canceling each other out?",
          "options": [
            "Sum of Errors (SE)",
            "Mean Absolute Error (MAE)",
            "Sum of Squared Errors (SSE)",
            "Average Raw Residuals"
          ],
          "correctAnswers": [
            "Mean Absolute Error (MAE)",
            "Sum of Squared Errors (SSE)"
          ],
          "explanation": "MAE uses absolute values and SSE uses squared values to ensure that all deviations are treated as positive magnitudes, preventing the mathematical cancellation that occurs with raw sums.",
          "caption": "Raw sum of ticks can cancel; |e| and e² keep every miss as a positive chalk mark."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The phenomenon where a line with significant distances from data points results in a total error of zero is known as the ____ trap.",
          "options": [],
          "correctAnswers": [
            "cancellation",
            "Cancellation"
          ],
          "explanation": "The cancellation trap occurs when positive and negative residuals sum to zero, misleadingly suggesting a perfect fit when the line is actually far from the data.",
          "placeholder": "type the concept name",
          "caption": "Cancellation trap: +ticks and −ticks sum to zero while the pencil still misses the cloud."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Imagine a dataset with two points: one with a residual of +10 and one with a residual of -10. What would be the 'Sum of Errors' for this model, and what does it signify?",
          "options": [
            "0; signifying a perfect fit that passes through both points",
            "0; signifying that the errors have canceled out despite the model being far from the points",
            "20; signifying the total absolute distance between the points and the line",
            "100; signifying the squared magnitude of the error"
          ],
          "correctAnswers": [
            "0; signifying that the errors have canceled out despite the model being far from the points"
          ],
          "explanation": "The Sum of Errors (SE) is a simple addition of raw residuals. Since +10 and -10 sum to 0, the metric fails to capture the actual distance of the points from the line.",
          "caption": "+10 above and −10 below: Sum of Errors reads 0, but both residual ticks are long."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the total error value behave differently between the 'Sum of Absolute' and 'Sum of Squared' metrics as the line moves further away from a single outlier?",
          "options": [
            "The squared metric increases faster because the penalty grows exponentially with distance rather than linearly.",
            "The absolute metric increases faster because it treats all distances as equally important regardless of magnitude.",
            "The squared metric stays lower because squaring decimal values initially makes the error appear smaller.",
            "Both metrics increase at the same rate because they both eliminate the negative signs of the residuals."
          ],
          "correctAnswers": [
            "The squared metric increases faster because the penalty grows exponentially with distance rather than linearly."
          ],
          "explanation": "Squaring residuals (SSE) penalizes larger distances much more heavily than absolute values (MAE). As a point moves further away, the squared error grows quadratically, while absolute error only grows linearly.",
          "scene": "scatter-cloud",
          "caption": "Walk the outlier out: |e| grows as a line, e² as a square — SSE climbs faster than MAE."
        },
      ]
    },
    {
      "sessionId": "ffb1c1f7-44a9-41ef-8604-e04f2c20b1f9",
      "title": "The Geometry of Squared Errors",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If a data point is moved so that its residual doubles from 3 units to 6 units, how does its contribution to the OLS cost function change?",
          "options": [
            "The penalty remains the same because the line adjusts.",
            "The penalty doubles because the distance doubled.",
            "The penalty quadruples because the area of the error square scales quadratically.",
            "The penalty triples because of the parabolic nature of the cost function."
          ],
          "correctAnswers": [
            "The penalty quadruples because the area of the error square scales quadratically."
          ],
          "explanation": "In OLS, the cost is the squared residual. Since 3 squared is 9 and 6 squared is 36, doubling the error results in four times the penalty (36 is 4 times 9).",
          "caption": "A residual tick of 3 becomes a 3×3 chalk square; double the tick and the square's area is four times larger."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Why is the Mean Squared Error (MSE) often preferred over Mean Absolute Error (MAE) in computational modeling, despite being more sensitive to outliers?",
          "options": [
            "The squared error function is 'smooth' and differentiable at all points.",
            "The 'U-shaped' parabolic curve makes it easier for algorithms to find the global minimum.",
            "Squared errors completely ignore small residuals to focus only on large ones.",
            "The absolute value function has a sharp 'V-shaped' corner that is mathematically harder to optimize."
          ],
          "correctAnswers": [
            "The squared error function is 'smooth' and differentiable at all points.",
            "The 'U-shaped' parabolic curve makes it easier for algorithms to find the global minimum.",
            "The absolute value function has a sharp 'V-shaped' corner that is mathematically harder to optimize."
          ],
          "explanation": "MSE is mathematically 'well-behaved' because it is differentiable everywhere, unlike the absolute value function which has a non-differentiable point at zero. This smoothness allows optimization algorithms to converge more reliably.",
          "caption": "The U of squared area is smooth at the bottom; the V of |e| has a sharp chalk corner at zero."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If a residual is 4 units long, the area of its error square — and therefore its contribution to SSE — is ____.",
          "options": [],
          "correctAnswers": [
            "16",
            "16 units",
            "sixteen"
          ],
          "explanation": "The error square has side length equal to the residual, so area is 4² = 16. OLS adds these areas, not the raw ticks.",
          "placeholder": "Enter a number",
          "caption": "A 4-unit residual tick is the side of a 16-area chalk square sitting on the ŷ line."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why does drawing a square on each residual (instead of a cube or a line) match the OLS cost?",
          "options": [
            "Because area is always easier to sketch than length.",
            "Because the cost is the sum of squared residuals, and a square's area is side × side.",
            "Because cubes would cancel positive and negative residuals.",
            "Because a square forces the line to pass through every point."
          ],
          "correctAnswers": [
            "Because the cost is the sum of squared residuals, and a square's area is side × side."
          ],
          "explanation": "OLS is literally the sum of squared residual lengths. Geometrically that is the total area of squares whose sides are the vertical gaps.",
          "caption": "Each vertical miss becomes a square; OLS is the total chalk area of those squares."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the residual tick on one point grows from 2 to 4, why does its square of error dominate the rest of the cloud?",
          "options": [
            "The square's area scales with the square of the tick, so 4² is four times 2².",
            "The square's area grows only as fast as the tick, so the rest of the cloud is ignored.",
            "The line is forced to pass through that point once the square is larger than the axes.",
            "Squares on short residuals shrink to zero as soon as one residual is doubled."
          ],
          "correctAnswers": [
            "The square's area scales with the square of the tick, so 4² is four times 2²."
          ],
          "explanation": "Area is quadratic. Doubling one residual multiplies that point's SSE contribution by four, so a far miss outweighs several small ticks.",
          "scene": "scatter-cloud",
          "caption": "Grow one residual tick: its error square inflates faster than the linear tick, swallowing the cloud."
        }
      ]
    },
    {
      "sessionId": "d7239551-3a08-4b27-b8be-a0aaaec46be8",
      "title": "Mathematical Elegance of OLS",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Why is the 'U-shape' of the Ordinary Least Squares (OLS) cost function preferred over the 'V-shape' of Mean Absolute Error (MAE) for optimization?",
          "options": [
            "The U-shape ensures that the error never reaches zero, making the model more stable.",
            "The U-shape is differentiable everywhere, including the minimum, providing a clear path for optimization.",
            "The V-shape is too steep for computers to calculate distances effectively.",
            "The U-shape naturally ignores outliers, which simplifies the calculation of the slope."
          ],
          "correctAnswers": [
            "The U-shape is differentiable everywhere, including the minimum, providing a clear path for optimization."
          ],
          "explanation": "The smooth 'U-shape' (parabola) of squared errors is differentiable at all points, allowing calculus to pinpoint the exact minimum. In contrast, the 'V-shape' of absolute error has a sharp point at the bottom where the derivative is undefined, making it harder for optimization algorithms to converge.",
          "caption": "U of e² vs V of |e|: the parabola is differentiable at the ŷ minimum; the V is not."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are benefits of the OLS cost function being 'Convex' (the One-Bowl Rule)?",
          "options": [
            "It guarantees that any local minimum found is also the global minimum.",
            "It allows the model to have multiple equally valid 'best' solutions for any dataset.",
            "It ensures that software like Scikit-Learn will consistently find the same optimal answer.",
            "It prevents the model from being influenced by the scale of the input features.",
            "It eliminates the risk of getting stuck in 'false bottoms' or local minima."
          ],
          "correctAnswers": [
            "It guarantees that any local minimum found is also the global minimum.",
            "It ensures that software like Scikit-Learn will consistently find the same optimal answer.",
            "It eliminates the risk of getting stuck in 'false bottoms' or local minima."
          ],
          "explanation": "Convexity in OLS means the cost function is a single bowl with one unique minimum. This ensures stability and consistency, as optimization algorithms won't get trapped in local suboptimal points, always reaching the single best solution.",
          "caption": "One-bowl U: convex OLS cost has a unique floor, so every downhill walk finds the same ŷ line."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "OLS is computationally efficient because it offers a ____ solution, meaning we can use a single matrix formula to jump straight to the best answer without guessing.",
          "options": [],
          "correctAnswers": [
            "closed-form",
            "closed form"
          ],
          "explanation": "A closed-form solution (like the Normal Equation) allows us to solve for the optimal parameters directly using algebra and calculus, rather than relying on an iterative process of trial and error.",
          "placeholder": "type the term here",
          "caption": "Closed-form jump: one Normal-equation formula lands on the U-bottom — no walking the V."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "In the context of OLS, what is the significance of the point on the cost curve where the slope (derivative) is exactly zero?",
          "options": [
            "It represents the point of maximum error for the model.",
            "It is the point where the model's coefficients are all equal to zero.",
            "It identifies the global minimum where the total squared error is minimized.",
            "It indicates that the model has failed to find a relationship in the data."
          ],
          "correctAnswers": [
            "It identifies the global minimum where the total squared error is minimized."
          ],
          "explanation": "Because the OLS cost function is a smooth bowl, the point where the slope is zero (the flat bottom) is mathematically guaranteed to be the location of the lowest possible error.",
          "caption": "Horizontal tangent at the U-bottom: derivative zero is the unique OLS minimum; a V has none there."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the slope of the regression line moves further away from the optimal fit, why does the 'cost' value shown in the simulation increase more rapidly for OLS than for MAE?",
          "options": [
            "Because squaring larger individual errors results in a total cost that grows quadratically.",
            "Because the OLS cost function is designed to ignore small errors entirely.",
            "Because the number of data points increases as the line moves away from the center.",
            "Because absolute errors are weighted more heavily when the line is nearly perfect."
          ],
          "correctAnswers": [
            "Because squaring larger individual errors results in a total cost that grows quadratically."
          ],
          "explanation": "Squaring an error of 2 yields 4, but an error of 4 yields 16. This quadratic growth causes the OLS cost curve (the U-shape) to get much steeper as you move away from the minimum compared to the linear growth of MAE.",
          "scene": "scatter-cloud",
          "caption": "Walk the pencil off the cloud: OLS cost (U, e²) steepens quadratically while MAE's V (|e|) stays linear."
        }
      ]
    },
    {
      "sessionId": "26ab5be2-d182-42cb-98c2-944975f91c2d",
      "title": "Setting up the Normal Equations",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the SSE formula, why do we treat the $x_i$ and $y_i$ values as constants while $\\beta_0$ and $\\beta_1$ are treated as variables?",
          "options": [
            "Because $x$ and $y$ are the observed data points that do not change during optimization.",
            "Because $x$ and $y$ are the slopes and intercepts we are trying to predict.",
            "Because the partial derivative of a variable must always be a fixed data point.",
            "Because constants in calculus must always be represented by letters from the end of the alphabet."
          ],
          "correctAnswers": [
            "Because $x$ and $y$ are the observed data points that do not change during optimization."
          ],
          "explanation": "In regression, the data (x and y) is fixed. We adjust the parameters ($\\beta_0, \\beta_1$) to find the values that minimize the error for that specific set of fixed data.",
          "caption": "The cloud is fixed: move β₀, β₁ so residual ticks to ŷ shrink; the x,y dots never move."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When applying the chain rule to the term $(y_i - (\\beta_0 + \\beta_1x_i))^2$ to find the partial derivative with respect to $\\beta_0$, which two components are mathematically correct?",
          "options": [
            "The outer derivative results in $2(y_i - \\beta_0 - \\beta_1x_i)$.",
            "The inner derivative with respect to $\\beta_0$ is $-1$.",
            "The inner derivative with respect to $\\beta_0$ is $x_i$.",
            "The outer derivative results in $(y_i - \\beta_0 - \\beta_1x_i)^1$.",
            "The inner derivative with respect to $\\beta_0$ is $1$."
          ],
          "correctAnswers": [
            "The outer derivative results in $2(y_i - \\beta_0 - \\beta_1x_i)$.",
            "The inner derivative with respect to $\\beta_0$ is $-1$."
          ],
          "explanation": "Using the chain rule, the exponent 2 is brought to the front (outer), and the derivative of $(-\\beta_0)$ with respect to $\\beta_0$ is $-1$ (inner).",
          "caption": "Chain rule on e²: outer 2(y−ŷ), inner −1 for β₀ — residual ticks slope the SSE bowl."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "Setting the partial derivative of the SSE with respect to $\\beta_0$ to zero and simplifying results in the first Normal Equation, which states that the sum of the ____ must be zero.",
          "options": [],
          "correctAnswers": [
            "residuals",
            "errors",
            "raw errors",
            "individual errors"
          ],
          "explanation": "The equation $\\sum (y_i - \\hat{y}_i) = 0$ means the sum of the differences between observed and predicted values (residuals) must equal zero for the optimal intercept.",
          "placeholder": "Type the term for (y - y_hat)...",
          "caption": "First Normal Equation: residual ticks above and below ŷ must sum to zero."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If you forget the negative sign from the inner derivative when calculating $\\frac{\\partial SSE}{\\partial \\beta_0}$, how would it affect the final Normal Equation?",
          "options": [
            "The resulting equation would imply the sum of residuals equals zero, leading to the same result.",
            "The equation would mathematically suggest maximizing error rather than minimizing it.",
            "It would not matter because we set the equation to zero, and $-0$ is the same as $0$.",
            "The $\\beta_1$ term would become a constant and disappear from the equation."
          ],
          "correctAnswers": [
            "The resulting equation would imply the sum of residuals equals zero, leading to the same result."
          ],
          "explanation": "Since we set the derivative to $0$, dividing both sides by $-2$ or $+2$ yields the same result: $\\sum (y_i - \\beta_0 - \\beta_1x_i) = 0$. However, the sign is critical for gradient descent algorithms.",
          "caption": "Drop the minus, still set ∂SSE=0: residual sum is still zero, so the ŷ line is unchanged."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Observe the 3D surface representing the Sum of Squared Errors as the parameters $\\beta_0$ and $\\beta_1$ change. Why must both partial derivatives be exactly zero to find the best fit line?",
          "options": [
            "Because any non-zero slope indicates we are on the side of the 'valley' and could still move to a lower error value.",
            "Because a zero slope ensures that the intercept and the slope are equal to each other at the origin.",
            "Because the partial derivative represents the total volume of the error which must be emptied.",
            "Because setting the slope to zero is the only way to convert a 3D landscape into a 2D line."
          ],
          "correctAnswers": [
            "Because any non-zero slope indicates we are on the side of the 'valley' and could still move to a lower error value."
          ],
          "explanation": "In optimization, a zero derivative indicates a local minimum (the bottom of the valley). If the derivative is not zero, the error surface is still sloping downward in some direction.",
          "scene": "scatter-cloud",
          "caption": "SSE valley: walk β₀ and β₁ until both residual slopes are flat — that ŷ pencil sits in the cloud."
        }
      ]
    },
    {
      "sessionId": "672aa1b4-f350-479e-826b-1bcc12ab4519",
      "title": "The Final Formulas: Slope and Intercept",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which of the following best describes the mathematical relationship defined by the OLS formula for the slope (beta1)?",
          "options": [
            "It is the ratio of the shared movement between X and Y to the total variance of X.",
            "It is the product of the mean of X and the mean of Y divided by the variance of Y.",
            "It is the sum of all Y values minus the sum of all X values, weighted by the intercept.",
            "It is the square root of the covariance divided by the mean-mean point of the dataset."
          ],
          "correctAnswers": [
            "It is the ratio of the shared movement between X and Y to the total variance of X."
          ],
          "explanation": "The formula for beta1 is the covariance of X and Y (shared movement) divided by the variance of X (spread of X). This ratio determines how much Y is expected to change for every unit change in X.",
          "caption": "β₁ = cov/var: shared residual pull of Y vs ŷ along the pencil, divided by the spread of X."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When calculating the intercept (beta0) using the OLS method, which of the following statements are true?",
          "options": [
            "The formula is derived by substituting the calculated slope back into the normal equations.",
            "The intercept ensures the line passes through the point (mean of X, mean of Y).",
            "The intercept always represents a physically meaningful value even if X cannot be zero.",
            "The calculation requires both the mean values of the variables and the calculated slope.",
            "The intercept is calculated before the slope to ensure the line is anchored correctly."
          ],
          "correctAnswers": [
            "The formula is derived by substituting the calculated slope back into the normal equations.",
            "The intercept ensures the line passes through the point (mean of X, mean of Y).",
            "The calculation requires both the mean values of the variables and the calculated slope."
          ],
          "explanation": "Beta0 is calculated as mean(Y) - beta1 * mean(X). This ensures the 'mean-mean' property where the line must pass through the center of the data mass. While mathematically required, the intercept does not always have a physical meaning in real-world contexts.",
          "caption": "β₀ parks the ŷ line through (mean X, mean Y) so residual ticks around the centroid cancel."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "Given a small dataset where X = [1, 2, 3] and Y = [2, 4, 5], what is the resulting slope (beta1)?",
          "options": [
            "1.5",
            "1.0",
            "0.5",
            "2.0"
          ],
          "correctAnswers": [
            "1.5"
          ],
          "explanation": "Mean X is 2, Mean Y is 3.67. Covariance numerator: (1-2)(2-3.67) + (2-2)(4-3.67) + (3-2)(5-3.67) = 1.67 + 0 + 1.33 = 3. Variance denominator: (1-2)^2 + (2-2)^2 + (3-2)^2 = 1 + 0 + 1 = 2. 3 / 2 = 1.5.",
          "caption": "Three dots, ŷ pencil through the cloud: slope 1.5 is residual-shared rise over the X spread."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "Why is it beneficial to build a table of (Xi - meanX) and (Yi - meanY) when calculating regression parameters manually?",
          "options": [
            "It helps organize the components needed for the covariance calculation.",
            "It allows for the calculation of the variance of X in a systematic way.",
            "It automatically identifies outliers that the OLS formula would otherwise ignore.",
            "It prevents common errors when dealing with the summation symbols in the formula."
          ],
          "correctAnswers": [
            "It helps organize the components needed for the covariance calculation.",
            "It allows for the calculation of the variance of X in a systematic way.",
            "It prevents common errors when dealing with the summation symbols in the formula."
          ],
          "explanation": "Tabulating these differences (residuals from the mean) is the standard way to compute variance and covariance manually. OLS does not ignore outliers; it is actually quite sensitive to them.",
          "caption": "Table of (x−x̄) and (y−ȳ): residual-from-mean ledger that builds cov and var for ŷ."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As individual data points are moved further away from the mean of X while keeping their Y values the same, why does the slope of the line change the way it does?",
          "options": [
            "Increasing the distance from the mean increases the denominator (variance), which reduces the sensitivity of the slope to those specific points.",
            "The line is anchored at the mean-mean point, so moving points horizontally forces the line to pivot to maintain the 'shared movement' ratio.",
            "The intercept must remain constant, so any change in X-values necessitates a reciprocal change in the slope to keep the error sum at zero.",
            "The covariance increases faster than the variance when points move horizontally, causing the slope to steepen regardless of the Y-direction."
          ],
          "correctAnswers": [
            "The line is anchored at the mean-mean point, so moving points horizontally forces the line to pivot to maintain the 'shared movement' ratio."
          ],
          "explanation": "The OLS line is a balancing act. Because it must pass through the mean-mean point, changes in the horizontal spread (variance) or the relationship between X and Y (covariance) force the line to 'pivot' around that central anchor to minimize squared errors.",
          "scene": "scatter-cloud",
          "caption": "Anchor ŷ at the mean-mean point: stretch a point in X and the pencil pivots so residual squares stay smallest."
        }
      ]
    },
    {
      "sessionId": "2a8918ce-3935-44ba-8139-24c5c9f20f3b",
      "title": "From Lines to Hyperplanes",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a 3D regression model where Y is predicted by X1 and X2, how is the 'residual' or error for a specific data point visually represented?",
          "options": [
            "The horizontal distance from the point to the nearest axis",
            "The vertical distance (along the Y-axis) from the point to the regression plane",
            "The shortest perpendicular distance from the point to the regression plane",
            "The area of the triangle formed by the point and the two predictors"
          ],
          "correctAnswers": [
            "The vertical distance (along the Y-axis) from the point to the regression plane"
          ],
          "explanation": "In linear regression, we measure the error in our prediction of the dependent variable (Y). Therefore, the residual is the vertical difference between the actual observed value of Y and the value predicted by the flat regression plane.",
          "caption": "Vertical residual tick: the Y-gap from the point down to the ŷ plane, not the shortest 3D drop."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When moving from a simple linear regression (1 predictor) to a multiple linear regression (2+ predictors), which of the following geometric properties remain true?",
          "options": [
            "The 'best fit' surface remains flat rather than curved",
            "The model can always be fully visualized in a 3D coordinate system",
            "The goal is still to minimize the distances (errors) between data points and the model surface",
            "Each predictor variable is treated as a separate dimension in the feature space"
          ],
          "correctAnswers": [
            "The 'best fit' surface remains flat rather than curved",
            "The goal is still to minimize the distances (errors) between data points and the model surface",
            "Each predictor variable is treated as a separate dimension in the feature space"
          ],
          "explanation": "Linear regression always results in a 'flat' object (line, plane, or hyperplane). Each new predictor adds a dimension, and the objective remains minimizing the residuals, regardless of how many dimensions are involved.",
          "caption": "Line → plane → hyperplane: still a flat ŷ surface; still minimize residual ticks, one extra axis per predictor."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "A flat mathematical object that exists in a space with four or more dimensions, serving as the higher-dimensional equivalent of a plane, is called a ____.",
          "options": [],
          "correctAnswers": [
            "hyperplane"
          ],
          "explanation": "A hyperplane is the generalization of a plane into any number of dimensions. In linear regression, this object remains 'flat' to satisfy the linear requirement of the model.",
          "placeholder": "Enter the term",
          "caption": "Four+ axes: the flat ŷ surface is a hyperplane; residual ticks still run along Y."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why is the 'isolation trap'—analyzing the relationship between Y and X1 separately from Y and X2—dangerous in multiple regression?",
          "options": [
            "It makes the math too simple for computer algorithms to process",
            "It ignores how the tilt of the regression plane depends on both variables simultaneously",
            "It forces the regression plane to always pass through the origin",
            "It incorrectly turns a linear model into a non-linear one"
          ],
          "correctAnswers": [
            "It ignores how the tilt of the regression plane depends on both variables simultaneously"
          ],
          "explanation": "A regression plane is a single surface influenced by all predictors at once. Looking at variables in isolation fails to capture how they interact or how the 'slope' of one variable might change when the other is accounted for.",
          "caption": "Isolation trap: tilting ŷ for X1 without X2 misses how residual ticks depend on both axes at once."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the orientation of the entire plane shift when the value of a single data point is significantly changed?",
          "options": [
            "Because the plane must maintain a constant distance from all axes regardless of data density",
            "Because the model is minimizing the sum of all vertical distances, forcing the flat surface to rebalance to accommodate the new outlier",
            "Because adding a third dimension requires the surface to curve to meet the furthest points",
            "Because the plane is physically tethered to the origin point and can only rotate around it"
          ],
          "correctAnswers": [
            "Because the model is minimizing the sum of all vertical distances, forcing the flat surface to rebalance to accommodate the new outlier"
          ],
          "explanation": "The 'best fit' is a collective calculation. Since a plane is a rigid, flat object, moving one data point (especially an outlier) pulls on the 'expectation' of the model, causing the entire surface to tilt to keep the total error as low as possible.",
          "scene": "scatter-cloud",
          "caption": "Move one outlier: the ŷ plane tilts so the sum of vertical residual ticks stays smallest."
        }
      ]
    },
    {
      "sessionId": "90999b8d-28f2-4c3b-82ae-f6f18f3474b8",
      "title": "The Matrix Representation of MLR",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If you have a dataset with 500 individual observations and 5 independent variables (predictors), what are the specific dimensions of the Design Matrix X including the intercept term?",
          "options": [
            "500 x 5",
            "500 x 6",
            "5 x 500",
            "6 x 500"
          ],
          "correctAnswers": [
            "500 x 6"
          ],
          "explanation": "The Design Matrix X has N rows (observations) and p+1 columns. Here, N=500 and p=5, but we must add one extra column for the intercept (the 'Intercept Trick'), resulting in 500 x 6."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements accurately describe the components of the matrix equation Y = Xβ + ε?",
          "options": [
            "Y is a vector of observed target values with dimension N x 1.",
            "β is a vector of unknown coefficients that we aim to estimate.",
            "X is a square matrix where the number of rows equals the number of columns.",
            "ε represents the residuals or the difference between observed and predicted values.",
            "The multiplication order βX is equivalent to Xβ."
          ],
          "correctAnswers": [
            "Y is a vector of observed target values with dimension N x 1.",
            "β is a vector of unknown coefficients that we aim to estimate.",
            "ε represents the residuals or the difference between observed and predicted values."
          ],
          "explanation": "Y and ε are vectors related to our observations and errors. β contains the parameters we seek. X is rarely square as it depends on the number of observations (N) and predictors (p). Matrix multiplication is not commutative, so Xβ is not the same as βX."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "Why is the matrix representation Y = Xβ + ε preferred over the summation notation in professional ML applications?",
          "options": [
            "It limits the number of variables you can include in a model to three.",
            "It provides a unified notation that stays consistent regardless of the number of predictors.",
            "It eliminates the need for calculating an error term ε.",
            "It allows the model to ignore the intercept term automatically."
          ],
          "correctAnswers": [
            "It provides a unified notation that stays consistent regardless of the number of predictors."
          ],
          "explanation": "Matrix notation collapses complex summations into a sleek form. Whether you have 1 or 1,000 predictors, the equation Y = Xβ + ε remains exactly the same, making it scalable for modern data science.",
          "caption": "Comparison of summation notation versus matrix notation for regression."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "Identify the necessary conditions for the 'Intercept Trick' to work correctly within the matrix multiplication Xβ.",
          "options": [
            "The first column of X must be a constant vector of 1s.",
            "The first element of the β vector must be the intercept coefficient β₀.",
            "The β vector must have the same number of rows as the X matrix.",
            "The X matrix must be transposed before multiplying by β."
          ],
          "correctAnswers": [
            "The first column of X must be a constant vector of 1s.",
            "The first element of the β vector must be the intercept coefficient β₀."
          ],
          "explanation": "When a row of X (1, x₁, x₂...) hits the β vector (β₀, β₁, β₂...), the 1 multiplies by β₀, effectively adding the intercept to the weighted sum of the other features.",
          "caption": "Visualization of row-column multiplication for the intercept term."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the predicted value change as we adjust the values within the β vector?",
          "options": [
            "Each β value acts as a weight that scales the contribution of its corresponding feature column in X.",
            "Adjusting β changes the number of observations (rows) stored in the Design Matrix.",
            "The β vector alters the constant 1s in the first column of the Design Matrix to match the target Y.",
            "Changing β modifies the error vector ε to ensure it always equals zero."
          ],
          "correctAnswers": [
            "Each β value acts as a weight that scales the contribution of its corresponding feature column in X."
          ],
          "explanation": "The simulation shows that the predicted output is a weighted sum. By changing the 'knobs' in the β vector, you are altering how much influence each feature has on the final prediction result.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "bd3f6096-2b50-4839-af45-64de8b4603d5",
      "title": "The 'Holding Others Constant' Intuition",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a simple linear regression model where only one predictor (X1) is used to predict Y, what does the coefficient for X1 represent regarding its relationship with other potential variables?",
          "options": [
            "It isolates the unique effect of X1 by ignoring all other factors.",
            "It 'soaks up' the influence of any hidden variables that are correlated with X1.",
            "It automatically adjusts for the influence of any omitted variables.",
            "It represents the causal impact of X1 regardless of other predictors."
          ],
          "correctAnswers": [
            "It 'soaks up' the influence of any hidden variables that are correlated with X1."
          ],
          "explanation": "In simple regression, the coefficient reflects the 'total effect' of X1, which includes both its own direct influence and the influence of any omitted variables it happens to be correlated with."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When moving from a simple regression (Y ~ X1) to a multiple regression (Y ~ X1 + X2), which of the following statements about the coefficient of X1 are true?",
          "options": [
            "The coefficient of X1 will always decrease in magnitude.",
            "The coefficient now represents the effect of X1 while holding X2 constant.",
            "The coefficient can change signs if X2 was previously a confounding factor.",
            "The coefficient measures the 'unique' variance in Y explained by X1.",
            "The coefficient will stay the same unless X1 and X2 are perfectly correlated."
          ],
          "correctAnswers": [
            "The coefficient now represents the effect of X1 while holding X2 constant.",
            "The coefficient can change signs if X2 was previously a confounding factor.",
            "The coefficient measures the 'unique' variance in Y explained by X1."
          ],
          "explanation": "Adding X2 allows the model to isolate X1's unique contribution. This can lead to the coefficient increasing, decreasing, or even changing signs depending on the relationship between X1, X2, and Y.",
          "caption": "A Venn diagram illustrating unique vs shared variance between a dependent variable and two predictors."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The Latin phrase used by economists and statisticians to describe the 'all else equal' condition in multiple regression is ____.",
          "options": [],
          "correctAnswers": [
            "ceteris paribus"
          ],
          "placeholder": "Enter the Latin phrase"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Imagine you are explaining a model to a manager where Salary is predicted by Education (X1) and Work Experience (X2). How should you correctly interpret the coefficient for Education?",
          "options": [
            "The average change in salary for each additional year of education, regardless of experience.",
            "The total correlation between education levels and salary across the entire company.",
            "The predicted change in salary for an extra year of education, assuming two employees have the same years of experience.",
            "The percentage of salary that is determined solely by an employee's degree."
          ],
          "correctAnswers": [
            "The predicted change in salary for an extra year of education, assuming two employees have the same years of experience."
          ],
          "explanation": "This captures the 'holding others constant' intuition. It compares individuals who are identical on the other variables (Experience) to see the specific impact of the variable of interest (Education)."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the correlation between the two predictor variables (X1 and X2) increases toward 1.0, why does it become nearly impossible to determine the individual 'Partial Slopes' for each?",
          "options": [
            "Because the total variance of the dependent variable Y decreases as predictors become more similar.",
            "Because there is no unique variance left in X1 that is not already shared with or predicted by X2.",
            "Because the model automatically combines the two variables into a single average coefficient.",
            "Because the 'ceteris paribus' condition requires that the two variables have opposite signs."
          ],
          "correctAnswers": [
            "Because there is no unique variance left in X1 that is not already shared with or predicted by X2."
          ],
          "explanation": "Partial coefficients rely on finding the 'unique' contribution of a variable. If X1 and X2 are perfectly correlated, they move in lockstep, making it mathematically impossible to 'hold one constant' while changing the other.",
          "scene": "scatter-cloud"
        }
      ]
    },
    {
      "sessionId": "742a8f3a-49a1-40b9-83de-513dc0228ba3",
      "title": "The Geometry of Projections",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the geometric interpretation of OLS, what defines the 'Column Space' (or Predictor Space)?",
          "options": [
            "The set of all possible values that the target variable Y can take",
            "Every possible linear combination of the predictor vectors X",
            "The vertical distance between the target vector Y and the prediction Y-hat",
            "The identity matrix that represents the dimensions of the data"
          ],
          "correctAnswers": [
            "Every possible linear combination of the predictor vectors X"
          ],
          "explanation": "The Column Space is the subspace spanned by the predictor vectors; it represents all potential predictions the model is capable of making based on the provided inputs."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements accurately describe the relationship between the target vector (Y), the prediction vector (Y-hat), and the residual vector (e)?",
          "options": [
            "The residual vector is the shortest distance from Y to the Column Space",
            "Y-hat is the orthogonal projection of Y onto the Column Space",
            "The residual vector must be parallel to the predictors",
            "The prediction Y-hat is always longer than the target vector Y"
          ],
          "correctAnswers": [
            "The residual vector is the shortest distance from Y to the Column Space",
            "Y-hat is the orthogonal projection of Y onto the Column Space"
          ],
          "explanation": "The OLS solution minimizes error by finding the 'shadow' of Y on the plane (Y-hat); the vector connecting them (the residual) is perpendicular to the plane, representing the shortest possible distance.",
          "caption": "A vector diagram showing the projection of Y onto the predictor plane, forming a right angle with the residual vector."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "For the prediction error to be minimized in OLS, the residual vector must be ____ to the Column Space of predictors.",
          "options": [],
          "correctAnswers": [
            "orthogonal",
            "perpendicular"
          ],
          "placeholder": "geometric property"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why does extreme collinearity (high correlation between predictors) cause the OLS model to become 'unstable'?",
          "options": [
            "It increases the number of dimensions in the Column Space",
            "The target vector Y moves further away from the predictor plane",
            "The predictor plane 'collapses' or becomes wobbly, making the projection point highly sensitive",
            "The Hat Matrix becomes the Identity Matrix, eliminating the residual"
          ],
          "correctAnswers": [
            "The predictor plane 'collapses' or becomes wobbly, making the projection point highly sensitive"
          ],
          "explanation": "When predictors are nearly identical, they don't define a stable 2D plane but rather a line-like surface. This makes the specific 'landing point' of the projection move drastically with even tiny changes in data."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the two predictor vectors X1 and X2 are rotated to become almost perfectly aligned, why does the prediction point Y-hat become harder to determine reliably?",
          "options": [
            "Because the target vector Y is physically moving further away from the origin.",
            "Because the area of the spanned plane shrinks toward a single line, making the 'landing point' of the projection sensitive to noise.",
            "Because the residual vector 'e' must become longer than the target vector Y to maintain orthogonality.",
            "Because the projection matrix H can only function when predictors are at exactly 90 degree angles to each other."
          ],
          "correctAnswers": [
            "Because the area of the spanned plane shrinks toward a single line, making the 'landing point' of the projection sensitive to noise."
          ],
          "explanation": "As predictors become collinear, the 'floor' we are projecting onto loses its stability. A tiny shift in the direction of Y results in a massive jump in the coordinates of Y-hat along that narrowing plane.",
          "scene": "triangle-rotate"
        }
      ]
    },
    {
      "sessionId": "4f11afac-15a8-4f36-8927-8ea17b75d5c1",
      "title": "Dummy Variables and Reference Levels",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a linear regression model containing a categorical variable with four levels (Spring, Summer, Fall, Winter), how many indicator variables should be added to the model to avoid the 'Dummy Variable Trap'?",
          "options": [
            "4",
            "3",
            "1",
            "2"
          ],
          "correctAnswers": [
            "3"
          ],
          "explanation": "According to the k-1 rule, a categorical variable with k levels requires k-1 dummy variables. Including all four would create perfect multicollinearity because the sum of the four dummies would always equal 1, which is identical to the intercept column."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Suppose you are modeling 'House Price' based on 'Neighborhood' (Urban, Suburban, Rural). If 'Rural' is set as the reference level, which of the following statements are true?",
          "options": [
            "The intercept represents the average price of Rural houses.",
            "The coefficient for 'Urban' represents the absolute average price of Urban houses.",
            "The coefficient for 'Suburban' represents the difference in price between Suburban and Rural houses.",
            "The model will include dummy variables for all three categories: Urban, Suburban, and Rural.",
            "The Rural category is 'absorbed' into the intercept term."
          ],
          "correctAnswers": [
            "The intercept represents the average price of Rural houses.",
            "The coefficient for 'Suburban' represents the difference in price between Suburban and Rural houses.",
            "The Rural category is 'absorbed' into the intercept term."
          ],
          "explanation": "When a level is chosen as the reference, the intercept (beta-0) becomes that group's mean. The other dummy coefficients represent the 'offset' or shift from that baseline, not the absolute mean of the groups."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The mathematical phenomenon where including a dummy variable for every single category leads to a non-invertible matrix is known as the ____.",
          "options": [],
          "correctAnswers": [
            "Dummy Variable Trap",
            "dummy variable trap"
          ],
          "placeholder": "Enter the term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "In a regression result, the coefficient for the dummy variable 'City_Center' is -500. If the intercept is 3000 and the reference level is 'Suburbs', what is the predicted value for a property in the City Center?",
          "options": [
            "3500",
            "3000",
            "2500",
            "-500"
          ],
          "correctAnswers": [
            "2500"
          ],
          "explanation": "The predicted value is calculated as Intercept + (Coefficient * Indicator). Here, it is 3000 + (-500 * 1) = 2500. This shows that being in the City Center results in a 500-unit decrease compared to the suburban baseline.",
          "caption": "Calculation showing intercept minus the dummy coefficient."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the regression line for the 'Treatment' group shift vertically when the reference 'Control' group's mean increases, even if the treatment's effect remains the same?",
          "options": [
            "Because the treatment coefficient represents the difference relative to the reference level intercept.",
            "Because the model automatically averages the two groups into a single slope.",
            "Because the dummy variable trap forces both lines to have the same intercept.",
            "Because the indicator variable for the treatment group changes from 1 to 0."
          ],
          "correctAnswers": [
            "Because the treatment coefficient represents the difference relative to the reference level intercept."
          ],
          "explanation": "Since the intercept captures the mean of the reference group, any change in that baseline moves the entire coordinate system for the model. The treatment coefficient only describes the 'gap' between the groups, so it 'rides' on top of the intercept.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "6f99ca46-c205-41b6-9c42-e7feb1b178af",
      "title": "Parallel Slopes Models",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a parallel slopes model with a continuous predictor $X$ and a dummy variable $D$, what does the coefficient for the dummy variable ($\\beta_2$) represent?",
          "options": [
            "The change in the slope of the line for the group where D = 1",
            "The constant vertical distance between the regression lines for different groups",
            "The rate of change in Y for every one-unit increase in X",
            "The average value of Y across all groups when X is at its maximum"
          ],
          "correctAnswers": [
            "The constant vertical distance between the regression lines for different groups"
          ],
          "explanation": "In a parallel slopes model, the dummy coefficient shifts the intercept up or down, creating a constant gap between the lines. It does not change the slope, which is shared across all groups.",
          "caption": "A plot showing two parallel regression lines with a vertical gap representing the dummy coefficient."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are characteristics of a 'Parallel Slopes' model? Select all that apply.",
          "options": [
            "The effect of the continuous predictor is assumed to be the same for all categorical groups.",
            "The lines representing different groups will eventually intersect if the range of X is large enough.",
            "The model uses a shared slope coefficient for all levels of the categorical variable.",
            "Each categorical group has its own unique slope coefficient.",
            "The difference between groups is constant regardless of the value of the continuous predictor."
          ],
          "correctAnswers": [
            "The effect of the continuous predictor is assumed to be the same for all categorical groups.",
            "The model uses a shared slope coefficient for all levels of the categorical variable.",
            "The difference between groups is constant regardless of the value of the continuous predictor."
          ],
          "explanation": "Parallel slopes models enforce a single, global slope coefficient. Because the slopes are identical, the lines are mathematically prevented from ever intersecting, and the gap between them remains constant."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If a categorical variable 'City Size' has three levels (Small, Medium, Large), a parallel slopes model will result in ____ distinct intercepts being represented in the data visualization.",
          "options": [],
          "correctAnswers": [
            "3",
            "three"
          ],
          "placeholder": "Enter a number"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If you are modeling house prices based on 'Square Footage' and 'Neighborhood', and you find that the price per square foot is much higher in 'Neighborhood A' than in 'Neighborhood B', why is a parallel slopes model inappropriate?",
          "options": [
            "Because the parallel slopes model assumes the baseline price is the same for all neighborhoods.",
            "Because the parallel slopes model requires all predictors to be categorical.",
            "Because the parallel slopes model forces the 'price per square foot' relationship to be identical for both groups.",
            "Because the parallel slopes model cannot handle more than two neighborhoods at once."
          ],
          "correctAnswers": [
            "Because the parallel slopes model forces the 'price per square foot' relationship to be identical for both groups."
          ],
          "explanation": "A parallel slopes model assumes the rate of change (the slope) is universal. If the 'price per square foot' differs between groups, you need an interaction model where slopes can diverge."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the coefficient for the dummy variable increases, why does the gap between the two lines on the graph widen?",
          "options": [
            "Because the dummy coefficient changes the angle of the second line relative to the X-axis.",
            "Because the dummy coefficient increases the vertical offset of the second group's intercept relative to the first.",
            "Because a larger coefficient causes the two slopes to diverge at a faster rate as X increases.",
            "Because the dummy variable increases the variance of the data points within each specific group."
          ],
          "correctAnswers": [
            "Because the dummy coefficient increases the vertical offset of the second group's intercept relative to the first."
          ],
          "explanation": "In this model, the dummy coefficient is purely additive. Increasing it simply shifts the entire line for that group higher up the Y-axis without changing its steepness.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "7219b276-487e-4836-a4a1-9896350a3fc6",
      "title": "When Slopes Are Not Parallel",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a standard Multiple Linear Regression model without interaction terms, what does the 'Additive Assumption' imply about the relationship between variables?",
          "options": [
            "The effect of one predictor variable on the outcome remains constant regardless of the value of other predictors.",
            "The effect of one predictor variable is multiplied by the effect of other predictors automatically.",
            "The relationship between a predictor and the outcome must always be a horizontal line.",
            "The model can only handle one predictor variable at a time."
          ],
          "correctAnswers": [
            "The effect of one predictor variable on the outcome remains constant regardless of the value of other predictors."
          ],
          "explanation": "The additive assumption implies that variables act independently; the slope for one variable is the same across all levels of another variable, resulting in parallel lines on a plot."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following scenarios likely represent a 'moderation' effect where an interaction term would be necessary?",
          "options": [
            "The impact of study hours on test scores is much higher for students with high prior knowledge than for those with low prior knowledge.",
            "A medication reduces blood pressure by 10 points for every patient, regardless of their age or weight.",
            "The effect of advertising spend on sales is stronger during the holiday season than during the summer.",
            "Adding more fertilizer increases crop yield by exactly 2 units for every acre of land."
          ],
          "correctAnswers": [
            "The impact of study hours on test scores is much higher for students with high prior knowledge than for those with low prior knowledge.",
            "The effect of advertising spend on sales is stronger during the holiday season than during the summer."
          ],
          "explanation": "Moderation occurs when the relationship between two variables 'depends' on a third variable. In these two cases, the 'slope' (impact of study or ads) changes based on context (prior knowledge or season)."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "When examining an Interaction Plot, what visual cue indicates that the additive assumption has failed and a moderation effect is present?",
          "options": [
            "The lines representing different groups are perfectly parallel.",
            "The lines representing different groups have different slopes or intersect.",
            "There is only one single line representing all data points.",
            "The lines are perfectly horizontal and overlap on the X-axis."
          ],
          "correctAnswers": [
            "The lines representing different groups have different slopes or intersect."
          ],
          "explanation": "Non-parallel lines indicate that the relationship between the independent and dependent variables changes depending on the group, which is the definition of an interaction.",
          "caption": "An interaction plot showing two non-parallel lines with different slopes."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "When building a model that includes an interaction term (X1 * X2), which of the following is considered a best practice for 'logical hierarchy'?",
          "options": [
            "Include the interaction term (X1 * X2).",
            "Include the main effect for X1.",
            "Include the main effect for X2.",
            "Remove the main effects to simplify the model and avoid redundancy."
          ],
          "correctAnswers": [
            "Include the interaction term (X1 * X2).",
            "Include the main effect for X1.",
            "Include the main effect for X2."
          ],
          "explanation": "To maintain hierarchical integrity, you must include the individual 'main effects' (X1 and X2) whenever their interaction is included; otherwise, the interaction term may absorb effects that actually belong to the individual variables."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the interaction strength between the two variables increases in the simulation, why do the lines move from a parallel state to a cross-over state?",
          "options": [
            "Because the interaction term forces the individual effects of each variable to become zero.",
            "Because the impact of the primary variable is being increasingly modified by the secondary variable, causing their slopes to diverge.",
            "Because the model is reverting to a simple linear regression with only one predictor.",
            "Because the average effect is being calculated across all groups simultaneously, forcing the lines to flatten."
          ],
          "correctAnswers": [
            "Because the impact of the primary variable is being increasingly modified by the secondary variable, causing their slopes to diverge."
          ],
          "explanation": "The 'cross-over' occurs because the relationship between X and Y is no longer uniform; as the interaction term grows, it creates distinct, divergent slopes for different levels of the third variable.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "3866adb8-2d10-4f5e-928f-3afecf196255",
      "title": "Interpreting Interaction Coefficients",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a model with an interaction term X1*X2, how should the 'main effect' coefficient b1 be interpreted?",
          "options": [
            "The average effect of X1 across all values of X2.",
            "The effect of X1 specifically when X2 is equal to zero.",
            "The maximum possible impact X1 can have on the outcome Y.",
            "The baseline value of Y before any predictors are added."
          ],
          "correctAnswers": [
            "The effect of X1 specifically when X2 is equal to zero."
          ],
          "explanation": "In an interaction model, the slope of X1 is conditional. Plugging X2 = 0 into the conditional slope formula (b1 + b3X2) leaves only b1."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements align with the 'Hierarchy Principle' in regression modeling?",
          "options": [
            "If an interaction term is significant, its component main effects must stay in the model.",
            "Main effects should be removed if their p-values are non-significant, regardless of the interaction.",
            "Removing main effects while keeping their interaction can lead to biased conditional slopes.",
            "Interaction terms should only be added if both main effects are already statistically significant."
          ],
          "correctAnswers": [
            "If an interaction term is significant, its component main effects must stay in the model.",
            "Removing main effects while keeping their interaction can lead to biased conditional slopes."
          ],
          "explanation": "The Hierarchy Principle dictates that the 'building blocks' (main effects) must be preserved to maintain the mathematical integrity of the interaction term's interpretation."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "To find the conditional slope of X1 in the model Y = b0 + b1X1 + b2X2 + b3(X1*X2), we regroup the terms into the functional form: Slope = ____.",
          "options": [],
          "correctAnswers": [
            "b1 + b3X2",
            "b1 + b3*X2",
            "(b1 + b3X2)"
          ],
          "explanation": "By factoring out X1 from the equation, we see that its coefficient is no longer just b1, but the sum of the main effect and the product of the interaction coefficient and X2.",
          "placeholder": "e.g., b1 + b3X2"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Suppose a model predicts Test Scores based on Study Time (X1) and Stress (X2). If b1 is positive and the interaction b3 (Study Time * Stress) is negative, what is happening?",
          "options": [
            "Stress makes study time more effective for increasing scores.",
            "The benefit of study time decreases as stress levels increase.",
            "Stress has no impact on how study time affects scores.",
            "Study time reduces stress levels, leading to higher scores."
          ],
          "correctAnswers": [
            "The benefit of study time decreases as stress levels increase."
          ],
          "explanation": "A negative interaction coefficient acting on a positive main effect creates a 'damping' effect, where the primary relationship weakens as the second variable grows.",
          "caption": "Comparison of slopes showing a weakening relationship under high stress."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Based on the simulation, why does the slope of the blue line change as the slider for the Moderator (X2) is moved from left to right?",
          "options": [
            "Because the interaction coefficient is adjusting the relationship between X1 and Y based on the current value of X2.",
            "Because the intercept is increasing, which automatically forces the slope to become steeper to compensate.",
            "Because the main effect of X1 is being replaced by the main effect of X2 as the slider moves.",
            "Because the data points are being deleted from the sample as X2 reaches higher values."
          ],
          "correctAnswers": [
            "Because the interaction coefficient is adjusting the relationship between X1 and Y based on the current value of X2."
          ],
          "explanation": "The simulation shows that the slope is a function of X2. As X2 changes, the 'conditional slope' (b1 + b3*X2) is recalculated, resulting in the visible rotation of the line.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "4f108e72-27e1-4afc-b49f-abf53bcb2389",
      "title": "Anatomy of a Residual Plot",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a residual plot, why do we map the predicted values (ŷ) to the x-axis and the residuals (e) to the y-axis?",
          "options": [
            "To confirm that the dependent variable y is normally distributed",
            "To check if the error is independent of the level of prediction",
            "To prove that the residuals sum to exactly zero in OLS regression",
            "To visualize the original scatter plot on a different scale"
          ],
          "correctAnswers": [
            "To check if the error is independent of the level of prediction"
          ],
          "explanation": "By plotting residuals against fitted values, we can see if the model's accuracy changes as the predicted outcome increases. A 'healthy' plot shows a random cloud, meaning the model's error doesn't depend on the magnitude of the prediction."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following scenarios describe a residual (e) correctly?",
          "options": [
            "A positive residual indicates the model under-predicted the actual value.",
            "A negative residual indicates the actual data point lies below the regression line.",
            "The residual represents the information the model successfully explained.",
            "The sum of all residuals in an OLS model is always zero.",
            "A residual is the horizontal distance from a point to the regression line."
          ],
          "correctAnswers": [
            "A positive residual indicates the model under-predicted the actual value.",
            "A negative residual indicates the actual data point lies below the regression line.",
            "The sum of all residuals in an OLS model is always zero."
          ],
          "explanation": "Residuals are the 'leftover' vertical distances (y - ŷ). Positive values mean the actual (y) was higher than predicted (ŷ), negative values mean the actual was lower. In OLS, the math ensures these errors sum to zero."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If a residual plot displays a clear U-shaped pattern, this indicates that the relationship between the variables is likely ____.",
          "options": [],
          "correctAnswers": [
            "non-linear",
            "nonlinear",
            "quadratic",
            "curvilinear"
          ],
          "explanation": "A U-shape or curve in the residuals means the linear model is systematically missing a trend. This usually happens when the true relationship is quadratic or otherwise non-linear.",
          "placeholder": "e.g. non-linear"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why is a high R-squared value sometimes misleading if you haven't checked the residual plot?",
          "options": [
            "R-squared only measures the sum of residuals, not their average.",
            "A high R-squared can hide systematic patterns like curves that indicate a poor model fit.",
            "R-squared decreases when you add more data points to a perfect line.",
            "High R-squared values only occur when there are no outliers present."
          ],
          "correctAnswers": [
            "A high R-squared can hide systematic patterns like curves that indicate a poor model fit."
          ],
          "explanation": "R-squared measures the strength of the fit, but not the validity. A model can explain a lot of variance while still being 'wrong' (e.g., using a straight line to fit a curve), which only a residual plot will reveal.",
          "caption": "A diagram showing how a high R-squared can coexist with a poor linear fit evidenced by a curved residual plot."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the data points are adjusted to follow a more curved path while the linear regression remains, why does the residual plot transform from a random cloud into a U-shape?",
          "options": [
            "Because the model begins to over-predict in the middle and under-predict at the ends of the range.",
            "Because the total sum of the residuals is no longer zero, causing the points to drift upward.",
            "Because the linear model is intentionally ignoring the ends of the data set to maintain a high R-squared.",
            "Because the predicted values (ŷ) are becoming larger than the actual values (y) across the entire range."
          ],
          "correctAnswers": [
            "Because the model begins to over-predict in the middle and under-predict at the ends of the range."
          ],
          "explanation": "When a linear model tries to fit a curve, it typically cuts through the arc. This results in under-prediction at the extremities (positive residuals) and over-prediction in the center (negative residuals), creating the characteristic U-shape.",
          "scene": "scatter-cloud"
        }
      ]
    },
    {
      "sessionId": "4b8aac3d-3a96-4b6b-b69a-934ed286770d",
      "title": "Detecting Heteroscedasticity",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which of the following best describes the core problem when a model exhibits heteroscedasticity?",
          "options": [
            "The regression line is shifted away from the true mean of the data.",
            "The error variance is inconsistent across different levels of the predictor.",
            "The relationship between the variables has become strictly non-linear.",
            "The model is no longer able to calculate any coefficients at all."
          ],
          "correctAnswers": [
            "The error variance is inconsistent across different levels of the predictor."
          ],
          "explanation": "Heteroscedasticity specifically refers to 'unequal variance' of residuals, meaning the spread of the 'noise' changes as the independent variable or fitted values change."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the presence of heteroscedasticity, which aspects of a standard OLS (Ordinary Least Squares) model become unreliable?",
          "options": [
            "The estimated coefficients (slopes)",
            "Standard errors of the coefficients",
            "P-values for hypothesis testing",
            "Confidence intervals",
            "The intercept of the regression line"
          ],
          "correctAnswers": [
            "Standard errors of the coefficients",
            "P-values for hypothesis testing",
            "Confidence intervals"
          ],
          "explanation": "While heteroscedasticity doesn't bias the coefficients (the line remains unbiased), it breaks the calculation of uncertainty. Because standard errors are wrong, any metric derived from them—like p-values and confidence intervals—becomes invalid."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When visually inspecting a residual plot, a pattern where the spread of points widens or narrows as you move along the x-axis is often called the ____ effect.",
          "options": [],
          "correctAnswers": [
            "funnel",
            "megaphone",
            "fan"
          ],
          "explanation": "The 'funnel' or 'megaphone' shape is the classic visual indicator of heteroscedasticity, showing that the model's error variance is increasing or decreasing systematically.",
          "placeholder": "Shape name..."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Look at the provided residual plot. Why would a researcher be concerned about using the p-values from this specific model?",
          "options": [
            "Because the residuals show a clear trend, suggesting a missing linear variable.",
            "Because the uneven spread indicates that standard error calculations will be incorrect.",
            "Because the residuals are all positive, meaning the model underpredicts everything.",
            "Because the residuals follow a perfect bell curve centered at zero."
          ],
          "correctAnswers": [
            "Because the uneven spread indicates that standard error calculations will be incorrect."
          ],
          "explanation": "Uneven residual spread (the funnel shape) violates the homoscedasticity assumption. OLS math assumes a single, constant variance; if this is violated, the calculated standard errors—and thus the p-values—cannot be trusted.",
          "caption": "A residual plot showing a distinct funnel-shaped pattern of data points."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As you observe the data points being generated, why does the 'funnel' shape emerge in the residual plot on the right?",
          "options": [
            "The model is intentionally ignoring the larger values to maintain a better fit at the start.",
            "The spread of the actual observations increases as the value of the predictor variable grows.",
            "The regression line is rotating away from the mean to compensate for the outliers.",
            "The number of data points being collected decreases as we move further along the x-axis."
          ],
          "correctAnswers": [
            "The spread of the actual observations increases as the value of the predictor variable grows."
          ],
          "explanation": "The animation shows that while the average relationship remains linear, the 'noise' or randomness added to each point is proportional to the x-value, creating a wider distribution of errors (the funnel) at higher levels.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "f4d725c5-a085-4503-89df-8427a9e67dae",
      "title": "The Null Hypothesis for Regression Coefficients",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the context of a simple linear regression model, what does the null hypothesis (H0: β1 = 0) specifically represent?",
          "options": [
            "The model has a 100% accuracy rate in predicting the outcome variable.",
            "There is no linear relationship between the predictor and the outcome in the population.",
            "The intercept of the regression line must pass through the origin (0,0).",
            "The slope of the line is perfectly equal to the correlation coefficient."
          ],
          "correctAnswers": [
            "There is no linear relationship between the predictor and the outcome in the population."
          ],
          "explanation": "A slope of zero creates a horizontal line, meaning that changes in the predictor variable do not result in any predicted change in the outcome variable, which defines a 'no relationship' scenario."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following factors would lead to a larger (more extreme) T-statistic for a regression slope, assuming the estimated coefficient remains constant?",
          "options": [
            "An increase in the sample size (n).",
            "A decrease in the residual variance (data points closer to the line).",
            "An increase in the Standard Error of the coefficient.",
            "A decrease in the Standard Error of the coefficient."
          ],
          "correctAnswers": [
            "An increase in the sample size (n).",
            "A decrease in the residual variance (data points closer to the line).",
            "A decrease in the Standard Error of the coefficient."
          ],
          "explanation": "The T-statistic is calculated as the estimate divided by the standard error. Therefore, anything that reduces the standard error (like more data or less noise) will increase the T-statistic."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The T-statistic is often described as a signal-to-noise ratio; in the formula (Estimate / Standard Error), the 'noise' is represented by the ____.",
          "options": [],
          "correctAnswers": [
            "Standard Error",
            "SE",
            "uncertainty"
          ],
          "placeholder": "Enter term..."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If you calculate a T-statistic of 4.5 for a slope coefficient, what is the best interpretation of this value?",
          "options": [
            "The slope is 4.5 units steep.",
            "The observed slope is 4.5 standard errors away from the null hypothesis of zero.",
            "There is a 4.5% chance that the null hypothesis is actually true.",
            "The model explains 45% of the total variation in the data."
          ],
          "correctAnswers": [
            "The observed slope is 4.5 standard errors away from the null hypothesis of zero."
          ],
          "explanation": "The T-statistic measures distance in units of standard error. A value of 4.5 means your sample result is quite far from the 'flat line' scenario expected under the null hypothesis.",
          "caption": "A T-distribution curve showing a T-score of 4.5 in the far right tail."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the T-distribution's shape change as the number of data points increases, and how does this affect our inference?",
          "options": [
            "Because the variance of the estimate increases with more data, making the tails thicker.",
            "Because more data points reduce the penalty for complexity, causing the distribution to widen away from the center.",
            "Because higher degrees of freedom reduce the probability of extreme outliers by chance, causing the distribution to converge toward a Normal shape.",
            "Because the null hypothesis changes from zero to the mean of the sample as the sample size grows."
          ],
          "correctAnswers": [
            "Because higher degrees of freedom reduce the probability of extreme outliers by chance, causing the distribution to converge toward a Normal shape."
          ],
          "explanation": "As degrees of freedom (n - k - 1) increase, we have more information about the population variance, which reduces the 'heaviness' of the tails in the T-distribution, making it look more like a standard Normal distribution.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "c951c1b6-2257-4a42-af6a-ce2c84fdc69f",
      "title": "Interpreting P-Values Without the Myths",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which of the following is the most accurate definition of a p-value of 0.03?",
          "options": [
            "There is a 3% probability that the null hypothesis is true.",
            "There is a 3% chance that the observed effect is due to random chance.",
            "The probability of seeing this result (or more extreme) if the null hypothesis is true is 3%.",
            "The probability that our alternative hypothesis is correct is exactly 97%."
          ],
          "correctAnswers": [
            "The probability of seeing this result (or more extreme) if the null hypothesis is true is 3%."
          ],
          "explanation": "A p-value is a conditional probability: it assumes the null hypothesis is true first, then calculates the likelihood of the data. It is not a direct measure of the probability that a hypothesis is 'true' or 'false'."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Why should a researcher be cautious about a 'statistically significant' p-value (p < 0.05) when working with a very large sample size?",
          "options": [
            "Large samples increase the likelihood of the null hypothesis being true.",
            "With a large enough sample, even a trivial or tiny effect can reach statistical significance.",
            "Statistical significance does not automatically imply that the finding is practically useful.",
            "Large samples make the p-value less accurate compared to small samples."
          ],
          "correctAnswers": [
            "With a large enough sample, even a trivial or tiny effect can reach statistical significance.",
            "Statistical significance does not automatically imply that the finding is practically useful."
          ],
          "explanation": "As sample size increases, the standard error decreases, making the T-statistic larger and the p-value smaller. This can lead to 'significant' results for effects that are too small to matter in the real world."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The threshold value (usually 0.05) that we use to decide whether to reject the null hypothesis is known as ____.",
          "options": [],
          "correctAnswers": [
            "alpha",
            "alpha level",
            "significance level"
          ],
          "explanation": "Alpha is the 'line in the sand' set by the researcher before the study. If the p-value is less than alpha, we reject the null hypothesis.",
          "placeholder": "Enter the term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "A clinical trial for a new weight loss tea shows a p-value of 0.001, but the average weight loss was only 0.1 pounds over six months. How should this be interpreted?",
          "options": [
            "The results are not valid because the effect size is too small.",
            "The result is statistically significant but likely lacks practical importance.",
            "The study proves that the tea is a highly effective treatment for weight loss.",
            "The p-value must be an error because the effect size is so small."
          ],
          "correctAnswers": [
            "The result is statistically significant but likely lacks practical importance."
          ],
          "explanation": "Statistical significance (p < 0.05) only tells us the effect is likely 'real' rather than noise; it does not tell us if the magnitude of that effect is useful for a patient or business."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the sample size increases in this simulation while keeping the observed effect size constant, why does the p-value consistently decrease?",
          "options": [
            "Because the null hypothesis becomes less true as we collect more data from the population.",
            "Because the standard error shrinks with more data, making the same difference appear more 'surprising' relative to noise.",
            "Because larger samples automatically change the threshold of what we consider to be a 0.05 alpha level.",
            "Because the simulation is designed to ignore random variation once the sample size exceeds a certain limit."
          ],
          "correctAnswers": [
            "Because the standard error shrinks with more data, making the same difference appear more 'surprising' relative to noise."
          ],
          "explanation": "The p-value is a function of the T-statistic, which is calculated by dividing the effect by the standard error. Since standard error is inversely related to the square root of n, larger samples make us more confident that the effect isn't just a fluke.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "87c683f7-c33f-40f0-b71c-8843c429595f",
      "title": "The Global F-Test",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Why is the Global F-test often referred to as the 'gatekeeper' of multiple linear regression analysis?",
          "options": [
            "It determines which specific predictor has the largest impact on the dependent variable.",
            "It must be passed to justify the interpretation of individual predictor coefficients.",
            "It calculates the exact correlation between any two independent variables.",
            "It provides a way to transform non-linear data into a linear format."
          ],
          "correctAnswers": [
            "It must be passed to justify the interpretation of individual predictor coefficients."
          ],
          "explanation": "The F-test acts as a gatekeeper because if the overall model is not significant, any 'significant' individual t-tests are likely due to chance. Interpreting coefficients in a model that fails the F-test is a statistical error."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the context of the F-test, what constitutes the 'Null Hypothesis' (H0)?",
          "options": [
            "All slope coefficients are equal to zero.",
            "The model is no better at predicting Y than the sample mean.",
            "At least one predictor has a non-zero coefficient.",
            "The intercept of the model must be zero.",
            "The unexplained variance (SSE) is zero."
          ],
          "correctAnswers": [
            "All slope coefficients are equal to zero.",
            "The model is no better at predicting Y than the sample mean."
          ],
          "explanation": "The null hypothesis for the Global F-test assumes that every predictor's coefficient (except the intercept) is zero, meaning the model behaves like a simple mean-only model."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The F-ratio is calculated by dividing the Mean Square Regression (MSR) by the ____.",
          "options": [],
          "correctAnswers": [
            "Mean Square Error",
            "MSE",
            "mean squared error"
          ],
          "explanation": "The F-statistic is the ratio of explained variance (MSR) to unexplained variance (MSE). This ratio tells us if the 'signal' captured by the model is significantly larger than the 'noise'.",
          "placeholder": "Enter term or acronym"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Which component represents the 'Noise' or the variance that the regression model failed to explain?",
          "options": [
            "SSR (Sum of Squares Regression)",
            "SST (Total Sum of Squares)",
            "SSE (Sum of Squares Error)",
            "MSR (Mean Square Regression)"
          ],
          "correctAnswers": [
            "SSE (Sum of Squares Error)"
          ],
          "explanation": "SSE represents the residuals, which is the difference between the observed values and the values predicted by the model—essentially the 'noise' left over.",
          "caption": "Visual partition of SST into SSR and SSE components."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As we add more completely random, irrelevant predictors to a model, why does the F-statistic typically decrease even if the explained variance (SSR) stays the same or increases slightly?",
          "options": [
            "The Mean Square Regression decreases because the small gain in SSR is divided by an increasing number of degrees of freedom.",
            "The Total Sum of Squares (SST) increases automatically whenever any new variable is added to the data set.",
            "The Mean Square Error decreases faster than the Mean Square Regression, causing the ratio to collapse toward zero.",
            "Random variables increase the intercept value, which mathematically cancels out the power of the slope coefficients."
          ],
          "correctAnswers": [
            "The Mean Square Regression decreases because the small gain in SSR is divided by an increasing number of degrees of freedom."
          ],
          "explanation": "The F-test includes a 'fairness adjustment' via degrees of freedom. If you add variables that don't contribute real information, the 'Mean Square' (the average explained variance per variable) drops, leading to a lower F-statistic.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "17231e28-6fc7-4c9a-8678-1fff5c25db2c",
      "title": "The R-Squared Trap",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You add a column of random 'Coin Flip' results to a model predicting house prices. What is the most likely outcome for the R-squared and Adjusted R-squared values?",
          "options": [
            "R-squared stays the same; Adjusted R-squared increases.",
            "R-squared increases or stays the same; Adjusted R-squared decreases.",
            "Both R-squared and Adjusted R-squared will increase.",
            "Both R-squared and Adjusted R-squared will decrease."
          ],
          "correctAnswers": [
            "R-squared increases or stays the same; Adjusted R-squared decreases."
          ],
          "explanation": "Due to its 'greedy property,' R-squared will mathematically capture any slight coincidental correlation in the noise, but Adjusted R-squared applies a 'penalty tax' for adding a predictor that doesn't significantly improve the model's fit."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements accurately describe the limitations of the standard R-squared metric?",
          "options": [
            "It can never decrease when more predictors are added to the model.",
            "A high R-squared guarantees that the model has identified causal relationships.",
            "It does not account for the number of variables relative to the sample size.",
            "It provides information about whether the residuals are normally distributed.",
            "It measures the percentage of total variation explained by the model."
          ],
          "correctAnswers": [
            "It can never decrease when more predictors are added to the model.",
            "It does not account for the number of variables relative to the sample size.",
            "It measures the percentage of total variation explained by the model."
          ],
          "explanation": "R-squared is a descriptive measure of fit, not a diagnostic for causality or residual distribution. Its 'greedy' nature means it always increases with more variables, regardless of their relevance."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "A researcher notices that as they add more variables to their regression, the gap between R-squared and Adjusted R-squared grows larger. What does this gap primarily indicate?",
          "options": [
            "The model is becoming more accurate with every variable added.",
            "The new variables are contributing very little real predictive power.",
            "The sample size is too large for the number of predictors used.",
            "The model has successfully eliminated all omitted variable bias."
          ],
          "correctAnswers": [
            "The new variables are contributing very little real predictive power."
          ],
          "explanation": "The gap widens because the 'penalty' for adding complexity is outweighing the marginal improvement in fit, signaling that the added variables are likely just noise.",
          "caption": "Graph showing the diverging paths of R-squared and Adjusted R-squared as non-significant variables are added."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "Why might a model with an exceptionally high R-squared (e.g., 0.98) still be considered 'flawed' by a professional practitioner?",
          "options": [
            "The high score could be a result of overfitting to specific data noise.",
            "The model may be suffering from omitted variable bias, missing a key confounder.",
            "The R-squared value is too low to be considered statistically significant.",
            "The model might accurately predict values without explaining the underlying mechanism."
          ],
          "correctAnswers": [
            "The high score could be a result of overfitting to specific data noise.",
            "The model may be suffering from omitted variable bias, missing a key confounder.",
            "The model might accurately predict values without explaining the underlying mechanism."
          ],
          "explanation": "High R-squared is not a 'correctness' seal. Overfitting leads to poor generalization, and omitted variables can bias coefficients even if the current fit appears nearly perfect."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the number of irrelevant noise variables added to the regression increases, why does the Adjusted R-squared eventually begin to decline while the R-squared continues to rise?",
          "options": [
            "Because the mathematical penalty for adding degrees of freedom eventually outweighs the tiny coincidental improvements in fit.",
            "Because the total variation (SST) increases every time a new variable is added to the data set.",
            "Because the model begins to prioritize the average of Y over the individual predictors to reduce error.",
            "Because the Sum of Squares Residual (SSR) is forced to increase when variables with no correlation are introduced."
          ],
          "correctAnswers": [
            "Because the mathematical penalty for adding degrees of freedom eventually outweighs the tiny coincidental improvements in fit."
          ],
          "explanation": "R-squared is 'greedy' and captures any random alignment in noise, but Adjusted R-squared 'charges' the model for every degree of freedom used, causing the score to drop if the variable doesn't 'earn its keep.'",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "46f96c2c-907a-412c-9f77-c9d0c2b40402",
      "title": "Normality of Residuals",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which component of a linear regression model is actually required to be normally distributed to ensure the validity of standard p-values?",
          "options": [
            "The independent variable (X)",
            "The dependent variable (Y)",
            "The residuals (errors)",
            "The regression coefficients (slopes)"
          ],
          "correctAnswers": [
            "The residuals (errors)"
          ],
          "explanation": "Linear regression does not require the predictors or the response variable to be normal; only the residuals (the difference between observed and predicted values) must be normally distributed for the t-tests and F-tests to produce accurate p-values."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When examining a Q-Q plot of residuals, which of the following patterns indicate a violation of the normality assumption?",
          "options": [
            "Points tightly following the 45-degree diagonal line",
            "An 'S-shape' where points curve away from the line at both ends",
            "A systematic 'U-shaped' curve relative to the diagonal",
            "Minor, random wiggles around the center of the line",
            "Points forming a significant 'arch' above the line"
          ],
          "correctAnswers": [
            "An 'S-shape' where points curve away from the line at both ends",
            "A systematic 'U-shaped' curve relative to the diagonal",
            "Points forming a significant 'arch' above the line"
          ],
          "explanation": "Systematic departures like S-shapes (indicating heavy or light tails) or arches (indicating skewness) suggest the residuals are not normal. Minor wiggles are expected due to sampling noise, and following the diagonal is the ideal case.",
          "caption": "Four different Q-Q plot patterns showing various types of departures from normality."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The ____ suggests that as your sample size grows sufficiently large, the requirement for perfectly normal residuals becomes less critical because the distribution of the coefficient estimates tends toward normality anyway.",
          "options": [],
          "correctAnswers": [
            "Central Limit Theorem",
            "CLT"
          ],
          "placeholder": "Enter the statistical principle"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If your residuals show 'heavy tails' in a Q-Q plot, what is the primary risk when interpreting your regression results?",
          "options": [
            "The model will be unable to calculate a line of best fit",
            "The R-squared value will be artificially inflated to nearly 1.0",
            "Standard errors and p-values may be unreliable, making results look more significant than they are",
            "The model will automatically exclude those extreme data points"
          ],
          "correctAnswers": [
            "Standard errors and p-values may be unreliable, making results look more significant than they are"
          ],
          "explanation": "Heavy tails mean the model encounters more extreme outliers than the normal distribution expects. This violates the assumptions used to calculate 'precision,' often leading to overconfident (too small) p-values and untrustworthy confidence intervals."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the sample size (N) of the simulated data increases, why does the 'instability' or 'wiggle' of the points on the Q-Q plot tend to decrease near the center of the line?",
          "options": [
            "Because larger samples are mathematically forced to have zero mean",
            "Because higher N increases the density of observations, making the empirical quantiles more likely to match theoretical expectations",
            "Because the simulation removes outliers automatically as the sample size grows larger",
            "Because the line of best fit rotates to align with whatever data points are present"
          ],
          "correctAnswers": [
            "Because higher N increases the density of observations, making the empirical quantiles more likely to match theoretical expectations"
          ],
          "explanation": "In small samples, random noise can cause quantiles to vary significantly. With a larger N, the Law of Large Numbers ensures the observed distribution of residuals more closely mirrors the true underlying normal distribution, leading to a smoother alignment with the diagonal.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "6404844f-4fcd-4aa3-97d3-9254a1d844e9",
      "title": "Outliers, Leverage, and Influence",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You have a data point that is very far from the average of the predictor variable (X), but it falls almost exactly on the regression line formed by the rest of the data. What is the likely characteristic of this point?",
          "options": [
            "It is an outlier with high influence.",
            "It is a high-leverage point with low influence.",
            "It is a low-leverage point with high influence.",
            "It is neither a leverage point nor an outlier."
          ],
          "correctAnswers": [
            "It is a high-leverage point with low influence."
          ],
          "explanation": "Leverage is determined by how far a point's X-value is from the mean of X. Because this point falls on the existing regression line, its residual is small, meaning it doesn't pull the line toward itself and thus has low influence."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "A researcher identifies a single data point with a very high Cook's Distance. Which of the following statements about this situation are true?",
          "options": [
            "Removing this point will significantly change the model's coefficients.",
            "The point must be an outlier in the Y-direction.",
            "The point must be a high-leverage point in the X-direction.",
            "The point has a high combination of leverage and residual magnitude.",
            "The point should be immediately deleted to improve the model R-squared."
          ],
          "correctAnswers": [
            "Removing this point will significantly change the model's coefficients.",
            "The point has a high combination of leverage and residual magnitude."
          ],
          "explanation": "Cook's Distance measures influence, which is the product of leverage and 'outlier-ness' (residual). While a high Cook's distance implies influence, it could be caused by extreme leverage, an extreme residual, or a combination of both; however, it should never be deleted without investigation."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the context of regression diagnostics, leverage is primarily a measure of how 'unusual' an observation is regarding its ____ value.",
          "options": [],
          "correctAnswers": [
            "X",
            "predictor",
            "independent variable",
            "input"
          ],
          "placeholder": "variable name"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "When visualizing a 'seesaw' analogy for simple linear regression, what represents the 'fulcrum' or pivot point of the regression line?",
          "options": [
            "The Y-intercept",
            "The point (mean of X, mean of Y)",
            "The origin (0,0)",
            "The point with the highest leverage"
          ],
          "correctAnswers": [
            "The point (mean of X, mean of Y)"
          ],
          "explanation": "The regression line always passes through the point of the means (X-bar, Y-bar). Points further from this X-mean have higher leverage to tilt the line around this pivot point.",
          "caption": "Diagram showing the regression line pivoting around the center of the data."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Observe how the regression line reacts as the single red data point is moved vertically and horizontally. Why does the line tilt much more aggressively when the point is moved at the far right of the graph compared to when it is moved near the center?",
          "options": [
            "The points at the center have higher residuals which naturally resist the movement of the line.",
            "The far-right position acts as a longer lever arm, increasing the point's potential to pivot the line around the mean.",
            "The model assumes that errors in the center are more important than errors at the edges of the data range.",
            "Moving a point horizontally changes the slope, while moving it vertically only changes the intercept."
          ],
          "correctAnswers": [
            "The far-right position acts as a longer lever arm, increasing the point's potential to pivot the line around the mean."
          ],
          "explanation": "Leverage is like a physical seesaw; points further from the center (the mean of X) have more 'torque' or power to pull the regression line toward them, whereas points near the center have very little effect on the slope.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "5e796e43-8ad3-47c2-9a89-1f5553ecad23",
      "title": "The Big Three: Coefficients, SE, and T-Stats",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "A regression output shows a coefficient (Estimate) of 15.0 and a Standard Error of 5.0. What is the resulting t-statistic, and what does it represent?",
          "options": [
            "3.0; the signal is three times larger than the noise",
            "0.33; the noise is three times larger than the signal",
            "10.0; the distance between the estimate and the error",
            "20.0; the total combined variance of the model"
          ],
          "correctAnswers": [
            "3.0; the signal is three times larger than the noise"
          ],
          "explanation": "The t-statistic is calculated as the Estimate divided by the Standard Error (15 / 5 = 3). It represents a signal-to-noise ratio, indicating how many standard errors the estimate is away from zero."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements correctly describe the relationship between the 'Big Three' metrics in a regression table?",
          "options": [
            "The t-statistic increases if the Standard Error decreases while the Coefficient remains constant.",
            "The Standard Error measures the average 'wobble' or uncertainty of our estimate across different samples.",
            "A t-statistic of 0.5 suggests that the 'signal' is significantly stronger than the 'noise'.",
            "The Coefficient represents the 'best guess' slope calculated by the OLS logic.",
            "The t-statistic is calculated by multiplying the Coefficient by the Standard Error."
          ],
          "correctAnswers": [
            "The t-statistic increases if the Standard Error decreases while the Coefficient remains constant.",
            "The Standard Error measures the average 'wobble' or uncertainty of our estimate across different samples.",
            "The Coefficient represents the 'best guess' slope calculated by the OLS logic."
          ],
          "explanation": "The t-statistic is the ratio of Coefficient to SE; thus, a smaller SE (denominator) increases the t-stat. The SE represents sampling uncertainty, and the Coefficient is the OLS slope estimate. A t-stat of 0.5 actually means the noise is twice as large as the signal."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the context of the t-statistic formula, if we view the Coefficient as the 'signal' and the Standard Error as the 'noise', the t-statistic itself represents the ____ ratio.",
          "options": [],
          "correctAnswers": [
            "signal-to-noise",
            "Signal to Noise"
          ],
          "explanation": "The t-statistic measures how many units of uncertainty (Standard Error) the estimate is away from zero, effectively acting as a signal-to-noise ratio.",
          "placeholder": "e.g. signal-to-noise"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "In the provided regression table, which column would a researcher look at to determine the precision or 'clarity' of the estimated slope?",
          "options": [
            "The 'coef' column",
            "The 'std err' column",
            "The 'intercept' row",
            "The R-squared value"
          ],
          "correctAnswers": [
            "The 'std err' column"
          ],
          "explanation": "The Standard Error (std err) represents the uncertainty or 'wobble' in the estimate. A smaller SE indicates a more precise, 'sharper' estimate, much like a high-resolution photo.",
          "caption": "A standard regression output table showing columns for coefficients, standard errors, t-statistics, and p-values."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Based on the behavior of the regression line and the changing 'wobble' area as more data points are added, why does the t-statistic typically increase as the sample size grows?",
          "options": [
            "Because the Estimate (slope) naturally gets steeper as we collect more data points from the population.",
            "Because the Standard Error decreases as the data points provide more evidence, making the signal clearer relative to the noise.",
            "Because the software automatically doubles the Coefficient value once a certain threshold of data is reached.",
            "Because the noise increases at the same rate as the signal, causing the ratio to expand exponentially."
          ],
          "correctAnswers": [
            "Because the Standard Error decreases as the data points provide more evidence, making the signal clearer relative to the noise."
          ],
          "explanation": "As sample size increases, our uncertainty (Standard Error) typically shrinks. Since the t-statistic is the Coefficient divided by the SE, a shrinking denominator results in a larger t-statistic, even if the slope itself remains relatively stable.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "45d76172-0f49-411a-a8a1-f6bf2372a869",
      "title": "The Confidence Interval: Range of Plausibility",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You are reviewing a model output where the coefficient for 'Marketing Spend' is 5.2 with a 95% confidence interval of [-1.1, 11.5]. Based on the 'Zero-Crossing' rule, what can you conclude about this effect?",
          "options": [
            "The effect is statistically significant because the point estimate is positive.",
            "The effect is not statistically significant because the interval includes zero.",
            "The model is 95% accurate at predicting individual marketing outcomes.",
            "The standard error is likely very small compared to the coefficient."
          ],
          "correctAnswers": [
            "The effect is not statistically significant because the interval includes zero."
          ],
          "explanation": "If a confidence interval contains zero, it means we cannot rule out the possibility that the true effect is zero (no effect) or even negative. This makes the result statistically insignificant at the 95% level."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following factors directly influence the width of a 95% confidence interval for a regression coefficient?",
          "options": [
            "The Standard Error (SE) of the coefficient",
            "The scaling factor (typically around 2 for 95% confidence)",
            "The R-squared value of the overall model",
            "The precision of the estimate",
            "The mean value of the dependent variable"
          ],
          "correctAnswers": [
            "The Standard Error (SE) of the coefficient",
            "The scaling factor (typically around 2 for 95% confidence)",
            "The precision of the estimate"
          ],
          "explanation": "The width is mathematically determined by the SE and the critical value (scaling factor). Precision is the conceptual inverse of width—smaller SEs lead to narrower intervals and higher precision."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "A common misconception is that a 95% confidence interval contains 95% of the individual data points; in reality, the interval describes the range of plausibility for the ____, not the data itself.",
          "options": [],
          "correctAnswers": [
            "population parameter",
            "true parameter",
            "true slope",
            "coefficient",
            "estimate"
          ],
          "placeholder": "Enter the term describing the target of the CI"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Consider two models predicting revenue. Model A has a coefficient of 500 with a CI of [450, 550]. Model B has a coefficient of 600 with a CI of [50, 1150]. Why might a business prefer Model A?",
          "options": [
            "Model A has a higher point estimate than Model B.",
            "Model A's range shows a much higher level of precision for decision-making.",
            "Model B is statistically insignificant because its interval is too wide.",
            "Model A is guaranteed to be 100% accurate because the range is small."
          ],
          "correctAnswers": [
            "Model A's range shows a much higher level of precision for decision-making."
          ],
          "explanation": "Even though Model B has a higher point estimate, its wide interval suggests high uncertainty. Model A provides a tighter 'range of plausibility,' reducing the risk of making decisions based on a noisy estimate.",
          "caption": "Comparison of a narrow confidence interval versus a wide confidence interval."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the simulation progresses and more samples are drawn from the population, why does the percentage of intervals covering the 'true' population line stabilize near 95%?",
          "options": [
            "Because the width of each interval is designed to capture the average of all data points.",
            "Because the construction of each interval accounts for sampling error to capture the true parameter in most repeated trials.",
            "Because the true population parameter moves toward the center of the intervals as more data is collected.",
            "Because 95% of the individual data points in each sample are forced to lie within the calculated bounds."
          ],
          "correctAnswers": [
            "Because the construction of each interval accounts for sampling error to capture the true parameter in most repeated trials."
          ],
          "explanation": "The 'repeated sampling' intuition shows that 95% confidence refers to the process: if we repeat the experiment many times, 95% of the generated intervals will contain the true population parameter.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "46bbc38d-9806-4a0c-acc7-e1fb4de61de9",
      "title": "Deconstructing R-Squared and Adjusted R-Squared",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a Multiple Linear Regression model, what is the specific 'Mathematical Trap' associated with the standard R-squared value?",
          "options": [
            "It can never decrease when you add a new predictor, regardless of that predictor's quality.",
            "It only measures linear relationships and ignores non-linear patterns in the data.",
            "It becomes negative if the sample size is smaller than the number of predictors.",
            "It always overestimates the slope of the regression line."
          ],
          "correctAnswers": [
            "It can never decrease when you add a new predictor, regardless of that predictor's quality."
          ],
          "explanation": "Because of the way R-squared is calculated, adding any variable—even random noise—will mathematically capture some variation in the data, forcing R-squared to stay the same or increase, but never decrease."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following components are used in the calculation of Adjusted R-squared to penalize model complexity?",
          "options": [
            "The total number of observations (n)",
            "The number of predictor variables (p)",
            "The Y-intercept value",
            "The standard deviation of the dependent variable",
            "The residual sum of squares"
          ],
          "correctAnswers": [
            "The total number of observations (n)",
            "The number of predictor variables (p)",
            "The residual sum of squares"
          ],
          "explanation": "Adjusted R-squared incorporates 'n' and 'p' (often seen as n-p-1) to create a 'penalty' for every predictor added. It also relies on the residual variation to see if the predictor actually improves the fit enough to justify its cost."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When a researcher adds several 'noise' variables to a model and finds that the R-squared remains high while the Adjusted R-squared drops significantly, the model is likely suffering from ____.",
          "options": [],
          "correctAnswers": [
            "overfitting",
            "over-fitting",
            "overparameterization"
          ],
          "explanation": "Overfitting occurs when a model is too complex and starts 'learning' the random noise in the data rather than just the underlying signal. The gap between R-squared and Adjusted R-squared is a primary diagnostic for this.",
          "placeholder": "Enter the term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "You are comparing two models. Model A has 3 predictors with an Adjusted R-squared of 0.78. Model B has 15 predictors with an Adjusted R-squared of 0.72. Which model should you prefer for its 'honesty' and efficiency?",
          "options": [
            "Model A, because it explains more variance with fewer variables.",
            "Model B, because 15 predictors provide a more granular view of the data.",
            "Neither, as Adjusted R-squared cannot be compared between models.",
            "Model B, because it likely has a higher standard R-squared value."
          ],
          "correctAnswers": [
            "Model A, because it explains more variance with fewer variables."
          ],
          "explanation": "Model A is superior because its Adjusted R-squared is higher despite having fewer predictors. This indicates the predictors in Model A are genuinely useful, whereas Model B's high complexity is actually hurting its adjusted performance.",
          "caption": "Comparison of R-squared vs Adjusted R-squared for two models."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As more random noise variables are added to the regression, why does the gap between the two lines in the simulation increase?",
          "options": [
            "The penalty term for complexity increases while the actual predictive power remains stagnant.",
            "The total variation in the dataset increases with every new variable added.",
            "Random variables cause the residual sum of squares to drop to zero naturally.",
            "The standard R-squared is being divided by the number of predictors."
          ],
          "correctAnswers": [
            "The penalty term for complexity increases while the actual predictive power remains stagnant."
          ],
          "explanation": "The simulation shows that while R-squared 'cheats' by rising with every variable, Adjusted R-squared applies a 'tax' for complexity. Since noise variables don't add real value, the 'tax' (the n-p-1 term) causes the Adjusted R-squared to diverge and drop.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "bbffc0dd-8782-4dd5-adf6-a6579fbdbfd5",
      "title": "Information Criteria: Intro to AIC and BIC",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You are comparing two models. Model A has an AIC of -12.5 and Model B has an AIC of 4.2. Which model should you prefer according to the Information Criterion rule, and why?",
          "options": [
            "Model B, because 4.2 is a positive value indicating higher accuracy.",
            "Model A, because it is closer to zero than Model B.",
            "Model A, because lower (more negative) AIC values indicate less information loss.",
            "Model B, because negative AIC values indicate an error in the log-likelihood calculation."
          ],
          "correctAnswers": [
            "Model A, because lower (more negative) AIC values indicate less information loss."
          ],
          "explanation": "AIC and BIC follow the 'lower is better' rule. Since these metrics estimate information loss, a smaller (or more negative) value represents a more efficient model that preserves more information."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following components are always included in the calculation of both AIC and BIC?",
          "options": [
            "A penalty for the number of parameters (k).",
            "The sample size (n).",
            "The log-likelihood (L) of the model.",
            "The R-squared value.",
            "The p-values of individual predictors."
          ],
          "correctAnswers": [
            "A penalty for the number of parameters (k).",
            "The log-likelihood (L) of the model."
          ],
          "explanation": "Both criteria balance 'goodness of fit' (log-likelihood) against 'model complexity' (k). Only BIC incorporates the sample size (n) into its penalty term; AIC does not use n."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "As the sample size (n) of a dataset increases, the ____ criterion becomes increasingly harsh compared to the other, making it more likely to select a simpler model.",
          "options": [],
          "correctAnswers": [
            "BIC",
            "Bayesian Information Criterion"
          ],
          "explanation": "BIC uses log(n) in its penalty term. As n grows, the penalty for each additional parameter becomes much larger than the constant penalty of 2 used in AIC.",
          "placeholder": "Enter criterion name"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Based on the provided table of model results, which model represents the best balance of fit and complexity?",
          "options": [
            "Model 1: 2 predictors, AIC = 510, BIC = 518",
            "Model 2: 5 predictors, AIC = 495, BIC = 515",
            "Model 3: 8 predictors, AIC = 490, BIC = 525",
            "Model 4: 12 predictors, AIC = 505, BIC = 550"
          ],
          "correctAnswers": [
            "Model 2: 5 predictors, AIC = 495, BIC = 515"
          ],
          "explanation": "Model 2 provides a lower AIC than Model 1 and a significantly lower BIC than Model 3. While Model 3 has the lowest AIC, its BIC is much higher, suggesting that the extra 3 predictors do not justify the added complexity in a way that BIC finds acceptable.",
          "caption": "Comparison table of AIC and BIC values for four models with varying complexity."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the gap between the AIC and BIC scores for the same model increase as the number of data points grows?",
          "options": [
            "Because the BIC penalty term depends on the sample size, while the AIC penalty term remains constant.",
            "Because AIC begins to ignore the log-likelihood as the dataset grows larger.",
            "Because BIC reduces its penalty as it becomes more confident in the 'true' model.",
            "Because more data points naturally lead to a higher number of predictors (k)."
          ],
          "correctAnswers": [
            "Because the BIC penalty term depends on the sample size, while the AIC penalty term remains constant."
          ],
          "explanation": "The AIC penalty is always 2k. The BIC penalty is log(n) * k. As n (the number of observations) increases, log(n) grows, causing the BIC penalty to diverge from the AIC penalty.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "2168349d-cae0-4a40-b39b-1023b29c6bc5",
      "title": "Generating Reports in Python and R",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the Python `statsmodels` workflow, what is the primary distinction between the object created by `sm.OLS(y, X)` and the object created by calling `.fit()` on it?",
          "options": [
            "The first is a data frame, while the second is a dictionary of coefficients.",
            "The first defines the model structure, while the second contains the calculated statistical results.",
            "The first is used for visualization, while the second is used for data cleaning.",
            "The first is a 'tidy' tibble, while the second is a raw text summary."
          ],
          "correctAnswers": [
            "The first defines the model structure, while the second contains the calculated statistical results."
          ],
          "explanation": "The OLS class initializes the model's mathematical definition, but the actual estimation of parameters occurs during the .fit() method, which returns a Results object containing the metrics."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following methods or attributes in Python's `statsmodels` are used to programmatically extract specific metrics rather than reading a text summary?",
          "options": [
            ".params",
            ".pvalues",
            ".rsquared",
            ".read_summary()",
            ".extract_all()"
          ],
          "correctAnswers": [
            ".params",
            ".pvalues",
            ".rsquared"
          ],
          "explanation": "Attributes like .params, .pvalues, and .rsquared allow you to access specific numerical values directly for use in automated scripts, avoiding the need to parse the text output of .summary()."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the R `tidymodels` ecosystem, the function `broom::____()` is used to convert the messy output of a model object into a clean, coefficient-level tibble.",
          "options": [],
          "correctAnswers": [
            "tidy"
          ],
          "explanation": "The tidy() function from the broom package is the standard way to turn model results into a predictable data frame format (tibble), where each row represents a term in the model.",
          "placeholder": "function name"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why do practitioners using R's `tidymodels` prefer using `broom::glance()` over the standard `summary()` function for model-level statistics?",
          "options": [
            "It produces a more colorful text report for Jupyter notebooks.",
            "It returns a single-row tibble that is easy to combine with other model results.",
            "It automatically runs a residual diagnostic plot.",
            "It is the only way to calculate the R-squared value in R."
          ],
          "correctAnswers": [
            "It returns a single-row tibble that is easy to combine with other model results."
          ],
          "explanation": "glance() provides model-wide statistics (like R-squared and AIC) as a data frame, making it easy to programmatically compare multiple models or pipe results into a visualization."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "When moving from conceptual regression to production-ready code, why is it considered a 'pitfall' to scrape text from a summary string?",
          "options": [
            "Text summaries are designed for human eyes and may change formatting.",
            "It is computationally slower than accessing object attributes directly.",
            "Scraping text makes it difficult to use values (like p-values) in downstream logic.",
            "Summary strings are only available in Python, not in R."
          ],
          "correctAnswers": [
            "Text summaries are designed for human eyes and may change formatting.",
            "It is computationally slower than accessing object attributes directly.",
            "Scraping text makes it difficult to use values (like p-values) in downstream logic."
          ],
          "explanation": "Programmatic access via attributes (Python) or tidy data frames (R) is more robust than string parsing because it accesses the underlying numerical data directly, ensuring your pipeline doesn't break if a report's visual layout changes."
        }
      ]
    },
    {
      "sessionId": "f5169a93-f1a8-4656-b7d1-41eab45e59ee",
      "title": "Standard Errors and Robust Options",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When a researcher applies 'Robust' standard errors to an OLS regression, which part of the output table typically remains unchanged?",
          "options": [
            "The p-values of the predictors",
            "The coefficient estimates (beta values)",
            "The standard error values",
            "The t-statistics for the coefficients"
          ],
          "correctAnswers": [
            "The coefficient estimates (beta values)"
          ],
          "explanation": "Robust standard errors adjust our measure of uncertainty, affecting the SEs, t-stats, and p-values, but they do not change the point estimates (the slopes) themselves."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In which of the following scenarios is a practitioner most likely to choose HC3 robust standard errors over standard OLS errors?",
          "options": [
            "When a residual plot shows a 'fan' shape as X increases",
            "When the R-squared value is lower than expected",
            "When there is evidence of heteroscedasticity in the data",
            "When the researcher wants to change the slope of the regression line",
            "When working with small-to-medium sized samples that violate the constant variance assumption"
          ],
          "correctAnswers": [
            "When a residual plot shows a 'fan' shape as X increases",
            "When there is evidence of heteroscedasticity in the data",
            "When working with small-to-medium sized samples that violate the constant variance assumption"
          ],
          "explanation": "Robust errors (specifically HC3) are designed to handle heteroscedasticity, often visualized as a fan shape in residuals. They improve the honesty of our uncertainty estimates but do not change the model fit (R-squared) or the slope.",
          "caption": "A plot demonstrating heteroscedasticity with a fan-shaped distribution of residuals."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The assumption that the variance of the error term is constant across all levels of the independent variables is known as ____.",
          "options": [],
          "correctAnswers": [
            "homoscedasticity"
          ],
          "placeholder": "Enter term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "A practitioner notices that after switching to robust standard errors, a previously significant variable (p < 0.05) now has a p-value of 0.12. What is the most appropriate conclusion?",
          "options": [
            "The robust standard errors are 'broken' and should be ignored.",
            "The original significance was likely an artifact of underestimated uncertainty due to heteroscedasticity.",
            "The model should be discarded because the R-squared has likely dropped significantly.",
            "The researcher should switch to HC0 errors to try and get the p-value back under 0.05."
          ],
          "correctAnswers": [
            "The original significance was likely an artifact of underestimated uncertainty due to heteroscedasticity."
          ],
          "explanation": "Robust SEs are often larger than standard SEs when heteroscedasticity is present. If the p-value rises above the threshold, it suggests the original model was overconfident about the precision of that estimate."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the animation progresses and the variance of the residuals becomes increasingly 'fan-shaped' at higher levels of X, why do the robust confidence intervals behave differently than the standard OLS confidence intervals?",
          "options": [
            "The robust estimator re-weights the residuals to account for local variance, leading to wider intervals that reflect the true uncertainty.",
            "The robust estimator reduces the influence of outliers at the start of the data range to keep the intervals narrow.",
            "The robust estimator changes the underlying slope to minimize the appearance of the fan shape in the residuals.",
            "The robust estimator assumes the noise is constant across the entire range, causing it to ignore the fan shape entirely."
          ],
          "correctAnswers": [
            "The robust estimator re-weights the residuals to account for local variance, leading to wider intervals that reflect the true uncertainty."
          ],
          "explanation": "The 'Sandwich' or robust estimator looks at the actual variance at different levels of X; as the 'fan' opens up, the robust method recognizes the increased unreliability and widens the margin of error accordingly.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "19c32b95-c889-4026-81ab-3cc143939be0",
      "title": "The Geometry of Redundancy",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a geometric sense, what happens to the regression plane when two predictor vectors move from being orthogonal to being nearly parallel?",
          "options": [
            "The plane becomes more horizontal relative to the Y-axis.",
            "The plane becomes 'wobbly' and sensitive to small changes in individual data points.",
            "The plane expands into a third dimension to accommodate the redundant data.",
            "The plane locks into a fixed position because the vectors provide double the evidence."
          ],
          "correctAnswers": [
            "The plane becomes 'wobbly' and sensitive to small changes in individual data points."
          ],
          "explanation": "When predictors are nearly parallel, the 'floor' supporting the regression plane narrows. This lack of structural width means a minor shift in a single data point can cause the entire plane to tilt drastically, leading to unstable coefficient estimates.",
          "caption": "Comparison of a stable regression plane on orthogonal vectors versus a wobbly plane on collinear vectors."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are practical consequences of high multicollinearity in a multivariate regression model?",
          "options": [
            "Coefficient signs may flip to the opposite of what is logically expected.",
            "The model's overall R-squared value will significantly decrease.",
            "Standard errors for the affected coefficients become very large.",
            "Individual variables may appear statistically insignificant even if they are important.",
            "The matrix algebra becomes impossible to solve regardless of the degree of correlation."
          ],
          "correctAnswers": [
            "Coefficient signs may flip to the opposite of what is logically expected.",
            "Standard errors for the affected coefficients become very large.",
            "Individual variables may appear statistically insignificant even if they are important."
          ],
          "explanation": "Multicollinearity inflates standard errors and makes 'credit assignment' difficult, leading to insignificant p-values and illogical signs. However, it does not necessarily lower the R-squared, as the model's overall predictive power might remain high."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "Including both a 'Temperature in Celsius' column and a 'Temperature in Fahrenheit' column in the same model would result in ____ collinearity.",
          "options": [],
          "correctAnswers": [
            "perfect",
            "total",
            "exact"
          ],
          "explanation": "Because one is a linear transformation of the other, they contain 100% redundant information. This is perfect collinearity, which usually results in a singular matrix error in statistical software.",
          "placeholder": "Enter type of collinearity"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Using the 'Two Drivers, One Steering Wheel' analogy, what does the steering wheel represent in a regression model?",
          "options": [
            "The independent variable (X)",
            "The standard error",
            "The response variable (Y)",
            "The intercept term"
          ],
          "correctAnswers": [
            "The response variable (Y)"
          ],
          "explanation": "The drivers are the predictors (X variables) attempting to explain the movement of the steering wheel (the response variable Y). If both drivers move in perfect unison, you can't determine which one is actually exerting force."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the angle between the two predictor vectors (X1 and X2) decreases toward zero, why does the model struggle to determine the specific coefficient for X1?",
          "options": [
            "The total variance of the response variable Y decreases as the vectors align.",
            "The overlap in explained variance makes it impossible to distinguish which vector is responsible for changes in Y.",
            "The length of the predictor vectors increases, over-scaling the influence of the intercept.",
            "The regression plane must rotate to be perfectly vertical, which the math cannot define."
          ],
          "correctAnswers": [
            "The overlap in explained variance makes it impossible to distinguish which vector is responsible for changes in Y."
          ],
          "explanation": "When vectors are nearly identical, they cover the same 'space.' The model cannot tell if an increase in Y was caused by X1 or X2 because they almost always move together, making the individual 'credit' (the coefficient) arbitrary.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "ba462aad-ffaf-45cd-889d-ce46dfec1eb9",
      "title": "Detecting Hidden Correlation with VIF",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When calculating the VIF for a specific feature, $X_1$, what is actually used as the dependent variable (Y) in the auxiliary regression?",
          "options": [
            "The original target variable of the model",
            "The feature $X_1$ itself",
            "The average of all independent variables",
            "The residual errors of the main model"
          ],
          "correctAnswers": [
            "The feature $X_1$ itself"
          ],
          "explanation": "To find the VIF for $X_1$, we 'predict the predictor' by treating $X_1$ as the target and using all other features as inputs. The resulting R-squared tells us how much of $X_1$ is already explained by other variables."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are true regarding the 'inflation' described by VIF?",
          "options": [
            "It refers to the growth of the standard error of the coefficient",
            "It indicates that the model's overall R-squared is artificially high",
            "It represents increased uncertainty in the specific coefficient's value",
            "It causes the coefficient to always become a larger positive number"
          ],
          "correctAnswers": [
            "It refers to the growth of the standard error of the coefficient",
            "It represents increased uncertainty in the specific coefficient's value"
          ],
          "explanation": "VIF measures how much the variance (and thus the standard error) of an estimated coefficient is increased due to collinearity. This makes the 'why' or the impact of that variable harder to trust."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If a feature has an auxiliary R-squared of 0.8, its Variance Inflation Factor (VIF) would be ____.",
          "options": [],
          "correctAnswers": [
            "5",
            "5.0"
          ],
          "explanation": "The formula is VIF = 1 / (1 - R^2). In this case, 1 / (1 - 0.8) = 1 / 0.2 = 5.",
          "placeholder": "Enter a number"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "How does a high VIF (e.g., > 10) impact the utility of a regression model?",
          "options": [
            "It makes the model completely useless for making predictions",
            "It guarantees that the target variable has been measured incorrectly",
            "It makes the individual coefficients unreliable for interpretation",
            "It automatically reduces the model's total explained variance"
          ],
          "correctAnswers": [
            "It makes the individual coefficients unreliable for interpretation"
          ],
          "explanation": "High VIF doesn't necessarily ruin predictive power, but it creates high sensitivity in the coefficients. This means we cannot confidently say how much a specific X truly influences Y."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the VIF value accelerate so rapidly as the R-squared of the auxiliary regression approaches 1.0?",
          "options": [
            "Because the denominator (1 - R-squared) approaches zero, causing the ratio to explode",
            "Because the numerator increases exponentially as more variables are added",
            "Because the standard error remains constant while the coefficient shrinks",
            "Because the model loses degrees of freedom as correlation increases"
          ],
          "correctAnswers": [
            "Because the denominator (1 - R-squared) approaches zero, causing the ratio to explode"
          ],
          "explanation": "As seen in the simulation, while R-squared increases linearly, the VIF curve stays flat initially and then shoots upward. This is because the VIF formula is a reciprocal; as the 'unexplained' portion (1 - R^2) vanishes, the factor tends toward infinity.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "f7d8678a-8dbc-4e97-89d5-3cad1200c181",
      "title": "The Intuition of Synergy",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the context of predictive modeling, what does the term 'synergy' specifically refer to?",
          "options": [
            "The sum of two independent variables' effects",
            "A scenario where the impact of one variable changes based on the level of another",
            "The total number of variables included in a regression model",
            "The process of adding more data points to improve model accuracy"
          ],
          "correctAnswers": [
            "A scenario where the impact of one variable changes based on the level of another"
          ],
          "explanation": "Synergy, or interaction, occurs when variables are not independent; the 'slope' or effect of one predictor depends on the current value of another."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following scenarios describe an 'interaction effect' rather than a purely 'additive' one?",
          "options": [
            "A fertilizer is more effective on corn during rainy seasons than during droughts.",
            "A marketing campaign's success is simply the sum of Facebook ads plus Billboard ads.",
            "A medication's effectiveness per milligram increases as a patient's metabolism slows down.",
            "Increasing both price and shipping costs reduces sales by the exact sum of their individual impacts."
          ],
          "correctAnswers": [
            "A fertilizer is more effective on corn during rainy seasons than during droughts.",
            "A medication's effectiveness per milligram increases as a patient's metabolism slows down."
          ],
          "explanation": "Interaction effects involve 'it depends' logic where the relationship between two things is non-parallel or conditional, unlike additive effects which are simple layering."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "If we visualize a model and the lines representing different groups are ____, we can conclude that there is no interaction effect between the variables.",
          "options": [],
          "correctAnswers": [
            "parallel"
          ],
          "explanation": "Parallel lines indicate that the effect (slope) of one variable is constant across all levels of the other variable, which is the definition of an additive model.",
          "placeholder": "describe the lines"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "You are modeling the relationship between 'Study Hours' and 'Test Score' for two different subjects: Math and Art. If an interaction effect exists, what would you expect to see on a graph?",
          "options": [
            "Two lines with the same slope but different starting heights (intercepts)",
            "A single line that represents both subjects perfectly",
            "Two lines with different slopes, indicating study hours are more impactful for one subject than the other",
            "One horizontal line and one vertical line"
          ],
          "correctAnswers": [
            "Two lines with different slopes, indicating study hours are more impactful for one subject than the other"
          ],
          "explanation": "Different slopes indicate that the 'return' on each hour of study depends on the subject being studied, which is a hallmark of an interaction.",
          "caption": "A graph showing two lines with different slopes, illustrating how the benefit of study hours varies by subject."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Based on the behavior shown in the simulation, why does the outcome variable respond differently to Variable A as Variable B increases?",
          "options": [
            "Because the slope of Variable A is being modified by the value of Variable B.",
            "Because Variable B is simply being added to the total after Variable A is calculated.",
            "Because the two variables are moving in opposite directions at a constant rate.",
            "Because the starting intercept is the only thing changing between the different states."
          ],
          "correctAnswers": [
            "Because the slope of Variable A is being modified by the value of Variable B."
          ],
          "explanation": "In an interaction, one variable acts as a multiplier for the other's effect, which is visible when the tilt (slope) of the line changes as the second variable is adjusted.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "bb79f685-db10-448c-998c-be9536b825a0",
      "title": "Mathematical Formulation of Interaction Terms",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the interaction model Y = β0 + β1X1 + β2X2 + β3(X1*X2) + ε, what does the coefficient β3 represent?",
          "options": [
            "The expected change in Y for a one-unit increase in X1 when X2 is held constant at its mean.",
            "The rate at which the effect of X1 on Y changes for every one-unit increase in X2.",
            "The baseline value of Y when both X1 and X2 are equal to zero.",
            "The total combined effect of X1 and X2 on the response variable."
          ],
          "correctAnswers": [
            "The rate at which the effect of X1 on Y changes for every one-unit increase in X2."
          ],
          "explanation": "β3 is the interaction coefficient; it modifies the slope of one variable based on the value of the other. In calculus terms, it is the partial derivative of the slope of X1 with respect to X2."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When modeling the interaction between a continuous variable (X1) and a binary categorical variable (D, where 0=Group A and 1=Group B), which of the following statements are true?",
          "options": [
            "If the interaction coefficient is zero, the regression lines for both groups will be parallel.",
            "The coefficient for X1 represents the slope specifically for the group where D=0.",
            "The interaction term allows the two groups to have different intercepts but identical slopes.",
            "If the interaction coefficient is non-zero, the effect of X1 on Y depends on which group the observation belongs to."
          ],
          "correctAnswers": [
            "If the interaction coefficient is zero, the regression lines for both groups will be parallel.",
            "The coefficient for X1 represents the slope specifically for the group where D=0.",
            "If the interaction coefficient is non-zero, the effect of X1 on Y depends on which group the observation belongs to."
          ],
          "explanation": "In a dummy variable interaction, the base slope (β1) is the effect for the reference group (D=0). The interaction term (β3) determines if the slope for the second group (D=1) diverges (non-parallel) or stays the same (parallel) relative to the first.",
          "caption": "A plot showing two regression lines with different slopes, illustrating an interaction between a continuous and a categorical variable."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "According to the rule of hierarchy in regression modeling, if a model includes the interaction term X1*X2, then the individual terms X1 and X2 must be ____ in the model, even if their individual p-values are not significant.",
          "options": [],
          "correctAnswers": [
            "included",
            "kept",
            "retained",
            "present"
          ],
          "explanation": "The hierarchy principle states that lower-order terms (main effects) must be present to properly interpret the higher-order interaction term. Removing them can bias the interaction coefficient.",
          "placeholder": "Enter a verb..."
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Given the model Y = 5 + 2X1 + 3X2 + 0.5(X1*X2), what is the calculated 'slope' of X1 when X2 equals 10?",
          "options": [
            "2",
            "5",
            "7",
            "10"
          ],
          "correctAnswers": [
            "7"
          ],
          "explanation": "To find the slope of X1, take the partial derivative: dY/dX1 = β1 + β3X2. Substituting the values: 2 + 0.5(10) = 2 + 5 = 7."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the value of X2 is swept from a low value to a high value, why does the steepness of the line representing the relationship between X1 and Y change?",
          "options": [
            "Because the interaction coefficient β3 acts as a multiplier that adjusts the X1 slope based on the current level of X2.",
            "Because the intercept β0 is being recalculated for every new value of X1 added to the product term.",
            "Because the error term ε increases proportionally with X2, forcing the regression line to tilt more aggressively.",
            "Because the main effect β1 is replaced entirely by the value of X2 once X2 exceeds a certain threshold."
          ],
          "correctAnswers": [
            "Because the interaction coefficient β3 acts as a multiplier that adjusts the X1 slope based on the current level of X2."
          ],
          "explanation": "The simulation shows that the slope of X1 is a dynamic function: (β1 + β3X2). As X2 increases, this entire term changes, causing the line to rotate or 'tilt' in the 2D plane of X1 and Y.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "2319da45-6aa7-4e9f-b755-5ca698eb3141",
      "title": "Centering Variables for Clarity",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a regression model with an interaction term (X * Z), what does the 'main effect' coefficient for X represent after both X and Z have been mean-centered?",
          "options": [
            "The effect of X when Z is at its average value.",
            "The effect of X when Z is equal to zero in the original units.",
            "The average value of X across all observations.",
            "The total change in Y for a one-unit change in X, regardless of Z."
          ],
          "correctAnswers": [
            "The effect of X when Z is at its average value."
          ],
          "explanation": "Because centering shifts the data so that 0 represents the mean, the coefficient for X (which represents the effect when other terms in the interaction are zero) now describes the effect of X at the average level of Z."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements correctly describe the impact of mean-centering on a regression model?",
          "options": [
            "It reduces structural multicollinearity between main effects and interaction terms.",
            "It improves the R-squared value of the model compared to the raw version.",
            "It changes the interpretation of the intercept to the predicted value for an average observation.",
            "It changes the shape of the variable's distribution from skewed to normal.",
            "It alters the coefficients of the highest-order interaction terms."
          ],
          "correctAnswers": [
            "It reduces structural multicollinearity between main effects and interaction terms.",
            "It changes the interpretation of the intercept to the predicted value for an average observation."
          ],
          "explanation": "Centering reduces the correlation between X and X*Z created by the model's structure and shifts the intercept to the mean. It does not change the model's fit (R-squared) or the coefficients of the highest-order interactions."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The process of subtracting the sample mean from every observation in a variable to shift its average to zero is known as ____.",
          "options": [],
          "correctAnswers": [
            "mean-centering",
            "centering",
            "mean centering"
          ],
          "explanation": "Mean-centering is a linear transformation that shifts the distribution so that the new mean is zero, without changing the shape of the distribution or its standard deviation.",
          "placeholder": "Enter the term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "A researcher is modeling House Price based on Square Footage and Year Built. In the raw model, the 'Year Built' coefficient is confusing because its value represents the effect when Square Footage is 0. Why is centering Square Footage helpful here?",
          "options": [
            "It provides a baseline for a house of average size, which is more realistic than 0 sq ft.",
            "It eliminates the need to include an interaction term between the variables.",
            "It automatically corrects for errors in the data collection process.",
            "It scales the variables so they have a standard deviation of one."
          ],
          "correctAnswers": [
            "It provides a baseline for a house of average size, which is more realistic than 0 sq ft."
          ],
          "explanation": "A house with 0 square feet is physically impossible. Centering allows the model to report effects relative to an 'average' house, which is much more intuitive for stakeholders.",
          "caption": "Comparison of raw vs centered data distributions on a coordinate plane."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the correlation between the main effect (X) and the interaction term (X * Z) decrease as the data for X is shifted toward its mean?",
          "options": [
            "Centering balances the positive and negative products, reducing the shared linear trend between the terms.",
            "The shifting process removes all outliers that were responsible for the original correlation.",
            "Centering changes the units of the interaction term, making it unrelated to the original units.",
            "The interaction term becomes zero for all observations once the main effects are centered."
          ],
          "correctAnswers": [
            "Centering balances the positive and negative products, reducing the shared linear trend between the terms."
          ],
          "explanation": "When data is centered at zero, the products in the interaction term are distributed around the origin. This mathematical symmetry reduces the artificial linear relationship (structural multicollinearity) that exists when all X and Z values are strictly positive.",
          "scene": "scatter-cloud"
        }
      ]
    },
    {
      "sessionId": "842b57ed-f6f9-4125-823f-babcd1d364bb",
      "title": "The Hierarchy Principle",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "According to the Hierarchy Principle, what must be true if you include an interaction term $X_1 X_2$ in your regression model?",
          "options": [
            "Both $X_1$ and $X_2$ must be included as main effects regardless of their p-values.",
            "Only the main effects that are statistically significant ($p < 0.05$) should be included.",
            "The interaction term should only be kept if its p-value is lower than the main effects.",
            "You must remove the main effects to avoid multicollinearity with the interaction term."
          ],
          "correctAnswers": [
            "Both $X_1$ and $X_2$ must be included as main effects regardless of their p-values."
          ],
          "explanation": "The Hierarchy Principle requires all constituent lower-order terms to be present to ensure the interaction remains interpretable and the model is not forced through an arbitrary origin."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "What are the primary risks of violating the Hierarchy Principle by omitting a non-significant main effect while keeping its interaction term?",
          "options": [
            "It can lead to inflated Type I error rates.",
            "The interaction coefficient becomes difficult or impossible to interpret correctly.",
            "The model is essentially forced into a hidden, often nonsensical constraint.",
            "The model's R-squared value will always automatically decrease.",
            "The interaction term will automatically become non-significant."
          ],
          "correctAnswers": [
            "It can lead to inflated Type I error rates.",
            "The interaction coefficient becomes difficult or impossible to interpret correctly.",
            "The model is essentially forced into a hidden, often nonsensical constraint."
          ],
          "explanation": "Omitting main effects shifts the coordinate system and forces the effect of the variable to be zero when the other variable is zero, which biases the interaction and can lead to false positives."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "In the provided model output, which modification is required to satisfy the Hierarchy Principle?\n\nModel: $Y = \\beta_0 + \\beta_1(Experience) + \\beta_2(Education \\times Experience)$",
          "options": [
            "Add a main effect term for 'Education'.",
            "Remove the interaction term since it contains a missing main effect.",
            "Remove 'Experience' because it is already part of the interaction.",
            "Add a squared term for 'Experience' to balance the model."
          ],
          "correctAnswers": [
            "Add a main effect term for 'Education'."
          ],
          "explanation": "Since 'Education' is part of the interaction term, it must exist as a standalone main effect to serve as a baseline for the interaction's nuance.",
          "caption": "A regression table missing the main effect for a variable included in an interaction."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "Which of the following scenarios represent a proper application of the Hierarchy Principle?",
          "options": [
            "A model includes $X_1$, $X_2$, and $X_1^2$ even if $X_1$ is not significant.",
            "A model includes $X_1$, $X_2$, $X_3$, and $X_1 X_2 X_3$.",
            "A model includes only $X_1 X_2$ because the data is centered.",
            "A model includes $X_1$ and $X_1 X_2$ but excludes $X_2$ because its p-value is 0.85.",
            "A model includes $X_1$, $X_2$, and $X_1 X_2$."
          ],
          "correctAnswers": [
            "A model includes $X_1$, $X_2$, and $X_1^2$ even if $X_1$ is not significant.",
            "A model includes $X_1$, $X_2$, $X_3$, and $X_1 X_2 X_3$.",
            "A model includes $X_1$, $X_2$, and $X_1 X_2$."
          ],
          "explanation": "Proper hierarchy means all lower-level components (like $X_1, X_2, X_3$ for a three-way interaction) are present, regardless of their statistical significance."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the regression line for the 'Low Education' group behave erratically when the main effect for Education is toggled off in the simulation?",
          "options": [
            "Removing the main effect forces all group lines to intersect at the exact same Y-intercept, regardless of the data.",
            "The interaction term is calculated only for high-value inputs, leaving low-value inputs with no data.",
            "The slope of the lines increases automatically to compensate for the lost intercept value.",
            "The model switches from a linear regression to a polynomial regression to fill the gap."
          ],
          "correctAnswers": [
            "Removing the main effect forces all group lines to intersect at the exact same Y-intercept, regardless of the data."
          ],
          "explanation": "By omitting the main effect, you remove the vertical 'shift' between groups, forcing them to share an intercept. This creates a geometric constraint that misrepresents the actual differences between the groups.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "0c30a67c-4a16-48aa-b4c9-4138139f5c8e",
      "title": "The Multi-Step Diagnostic Checklist",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You are following the professional diagnostic workflow and find both a high Variance Inflation Factor (VIF) and a curved pattern in your residual plot. Which action should you take first?",
          "options": [
            "Add a polynomial term to address the non-linearity in the residuals.",
            "Remove or combine the variable with the highest VIF and re-calculate diagnostics.",
            "Include an interaction term to explain the variance.",
            "Ignore the VIF if the residual plot shows a clear pattern that can be fixed."
          ],
          "correctAnswers": [
            "Remove or combine the variable with the highest VIF and re-calculate diagnostics."
          ],
          "explanation": "According to the systematic workflow, you must stabilize the model (VIF Pruning) before enriching it (Interactions/Polynomials). High VIF indicates unstable coefficients, which can make residual patterns misleading."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the 'VIF Pruning Loop,' why is it considered a mistake to delete all variables with a VIF > 5 simultaneously?",
          "options": [
            "VIF scores are interdependent; removing one variable changes the scores of the others.",
            "Removing variables simultaneously can lead to the 'kitchen sink' approach.",
            "Mass deletion risks losing significant explanatory power unnecessarily.",
            "The model requires at least one variable with a high VIF to calculate residuals."
          ],
          "correctAnswers": [
            "VIF scores are interdependent; removing one variable changes the scores of the others.",
            "Mass deletion risks losing significant explanatory power unnecessarily."
          ],
          "explanation": "VIF measures how much one predictor is explained by others; once one is removed, the remaining predictors may fall back into a safe range. Surgical removal ensures you keep as much data as possible while achieving stability."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The principle of ____ suggests that the best model is the simplest one that satisfies all diagnostic checks, avoiding unnecessary complexity.",
          "options": [],
          "correctAnswers": [
            "parsimony",
            "Occam's Razor"
          ],
          "explanation": "Parsimony is a core modeling philosophy that prioritizes simplicity. In our workflow, this means only adding complexity (like interactions) when the base linear model fails to capture patterns in the residuals.",
          "placeholder": "Enter the concept name"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Which diagnostic tool serves as the 'Pre-flight Check' to anticipate multicollinearity issues before the model is even fitted?",
          "options": [
            "VIF Calculation",
            "Residual vs. Fitted Plot",
            "Pairwise Correlation Heatmap",
            "P-value Analysis"
          ],
          "correctAnswers": [
            "Pairwise Correlation Heatmap"
          ],
          "explanation": "A heatmap is used for early screening of bivariate correlations. While VIF is a deeper diagnostic for multivariate relationships, the heatmap helps prune redundant features before the fitting process begins.",
          "caption": "A correlation heatmap showing relationships between independent variables."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the simulation progresses and a highly redundant variable is removed from the model, why do the VIF scores of the remaining variables drop significantly?",
          "options": [
            "Because the shared variance that was being 'double-counted' across multiple predictors has been eliminated.",
            "Because the model automatically increases the sample size to compensate for the lost variable.",
            "Because removing any variable, regardless of its correlation, mathematically forced the residuals to zero.",
            "Because the remaining variables are now forced to be perfectly linear to fit the data."
          ],
          "correctAnswers": [
            "Because the shared variance that was being 'double-counted' across multiple predictors has been eliminated."
          ],
          "explanation": "VIF measures how much a variable's variance is 'inflated' by its relationships with others. When a redundant variable is removed, the remaining variables no longer have to 'compete' to explain that same portion of variance, leading to lower VIFs and more stable coefficients.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "7955b0d4-6aec-4d26-8bd8-291b9faf637f",
      "title": "Complexity and Overfitting",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which of the following best describes the difference between 'Signal' and 'Noise' in a dataset?",
          "options": [
            "Signal is the total data collected, while noise is the subset of data used for testing.",
            "Signal is the underlying relationship we want to capture, while noise is the random, irreducible error.",
            "Signal is the complexity of the algorithm, while noise is the lack of flexibility in a linear model.",
            "Signal is the training error rate, while noise is the difference between training and test error."
          ],
          "correctAnswers": [
            "Signal is the underlying relationship we want to capture, while noise is the random, irreducible error."
          ],
          "explanation": "Signal represents the true, replicable pattern in the population, whereas noise consists of random fluctuations or measurement errors that do not repeat across different samples."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "What are the primary characteristics of a 'high-variance' model?",
          "options": [
            "It produces very different results when trained on different samples from the same population.",
            "It tends to 'over-react' to individual outliers or random jitter in the training data.",
            "It results in a very simple, straight-line representation of complex data trends.",
            "It consistently underestimates the complexity of the underlying signal across all samples.",
            "It shows a high sensitivity to the specific noise present in the training set."
          ],
          "correctAnswers": [
            "It produces very different results when trained on different samples from the same population.",
            "It tends to 'over-react' to individual outliers or random jitter in the training data.",
            "It shows a high sensitivity to the specific noise present in the training set."
          ],
          "explanation": "High variance means the model is highly flexible and unstable; it changes its 'shape' significantly based on the specific noise and data points it happens to see during training."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When a model interprets random noise as part of the true underlying pattern because it is too flexible, it is experiencing ____.",
          "options": [],
          "correctAnswers": [
            "overfitting",
            "over-fitting"
          ],
          "explanation": "Overfitting occurs when a model's complexity allows it to 'hallucinate' patterns in the noise, leading to low training error but poor generalization to new data.",
          "placeholder": "Enter the term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "If a model has 'too much freedom to wiggle' during the training process, what is the most likely outcome?",
          "options": [
            "The model will fail to capture the signal and have high training error.",
            "The model will perfectly generalize to all future datasets.",
            "The model will capture the noise and perform poorly on test data.",
            "The model will become a linear fit to avoid complexity."
          ],
          "correctAnswers": [
            "The model will capture the noise and perform poorly on test data."
          ],
          "explanation": "Excessive flexibility (complexity) allows the model to hit every training point, including noise, which makes it less accurate when it encounters new data without that specific noise.",
          "caption": "Comparison of a balanced model versus an overly complex, jagged model."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Why does the complex polynomial curve's error rate increase so dramatically when the 'New Sample' button is pressed?",
          "options": [
            "The model is capturing random fluctuations unique to the first sample that do not exist in the second sample.",
            "The underlying signal of the data has changed between the first sample and the second sample.",
            "The model is too simple to recognize that the new data points come from the same population.",
            "The complexity of the model is automatically reduced when it encounters data it has not seen before."
          ],
          "correctAnswers": [
            "The model is capturing random fluctuations unique to the first sample that do not exist in the second sample."
          ],
          "explanation": "The complex model 'memorized' the specific noise of the first training set. Because that noise is random, it is not present in the new sample, causing the model's 'hallucinated' pattern to fail miserably.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "4400c825-7800-451e-b0fc-5eee10376482",
      "title": "The Bias-Variance Decomposition",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the context of the Bias-Variance decomposition, what does 'Irreducible Error' represent?",
          "options": [
            "The error caused by using an oversimplified model for complex data.",
            "The inherent randomness or noise in the data that no model can eliminate.",
            "The error introduced when a model is too sensitive to training fluctuations.",
            "The mathematical difference between training error and validation error."
          ],
          "correctAnswers": [
            "The inherent randomness or noise in the data that no model can eliminate."
          ],
          "explanation": "Irreducible error (noise) is the 'floor' of the total error; it represents factors outside the model's control, such as measurement errors or missing variables, that cannot be reduced by changing the model complexity."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following characteristics are typical of a model experiencing High Bias?",
          "options": [
            "It makes strong, oversimplified assumptions about the underlying data.",
            "It is highly sensitive to small changes in the training dataset.",
            "It typically results in underfitting.",
            "It produces very different results when trained on different subsets of data.",
            "It has a high systematic error regardless of the specific training samples."
          ],
          "correctAnswers": [
            "It makes strong, oversimplified assumptions about the underlying data.",
            "It typically results in underfitting.",
            "It has a high systematic error regardless of the specific training samples."
          ],
          "explanation": "High bias occurs when a model is too simple (underfitting), leading it to consistently miss the true relationship. This is a systematic error, unlike high variance, which is characterized by high sensitivity to training data fluctuations."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "Total Error can be formally decomposed into the sum of ____, Variance, and Irreducible Error.",
          "options": [],
          "correctAnswers": [
            "Bias squared",
            "Bias^2",
            "Squared Bias"
          ],
          "explanation": "The mathematical decomposition of Mean Squared Error (MSE) shows that total error is the sum of the square of the bias, the variance of the predictions, and the irreducible noise.",
          "placeholder": "e.g. Bias squared"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Looking at the 'Complexity vs. Error' U-curve, what happens to the Training Error and Validation Error as model complexity increases beyond the 'Sweet Spot'?",
          "options": [
            "Both Training Error and Validation Error increase.",
            "Training Error continues to decrease, while Validation Error starts to increase.",
            "Training Error starts to increase, while Validation Error continues to decrease.",
            "Both Training Error and Validation Error remain constant."
          ],
          "correctAnswers": [
            "Training Error continues to decrease, while Validation Error starts to increase."
          ],
          "explanation": "As complexity increases, a model can fit the training data more closely (lower training error), but it eventually starts 'memorizing' noise (overfitting), which causes the error on unseen validation data to rise.",
          "caption": "A U-curve graph showing the trade-off between training error and validation error as model complexity increases."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the complexity of the model is adjusted in the simulation, why does the gap between the training error and the validation error widen?",
          "options": [
            "Because the model begins to treat random noise as if it were a repeatable structural pattern.",
            "Because the irreducible error increases as the model attempts to fit more data points.",
            "Because the bias of the model increases, causing it to ignore the true underlying trend.",
            "Because the total error is capped, so as training error falls, validation error must rise."
          ],
          "correctAnswers": [
            "Because the model begins to treat random noise as if it were a repeatable structural pattern."
          ],
          "explanation": "The widening gap is the hallmark of overfitting; as complexity increases, the model captures specific fluctuations (variance) in the training set that do not exist in the validation set, causing validation performance to diverge.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "ecfd55bf-72e3-4f1c-829a-28935f9eaa26",
      "title": "Ridge Regression and the L2 Penalty",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In Ridge regression, what is the mathematical difference between the Ordinary Least Squares (OLS) objective function and the Ridge objective function?",
          "options": [
            "Ridge adds the sum of the absolute values of the coefficients.",
            "Ridge adds a penalty term proportional to the square of the coefficients.",
            "Ridge divides the error term by the number of predictors.",
            "Ridge replaces the squared error term with a logarithmic error term."
          ],
          "correctAnswers": [
            "Ridge adds a penalty term proportional to the square of the coefficients."
          ],
          "explanation": "Ridge regression uses the L2 penalty, which adds the squared magnitude of coefficients (multiplied by lambda) to the standard loss function. This penalizes large slopes to prevent overfitting."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following statements correctly describe the behavior of the regularization parameter λ (lambda) in a Ridge model?",
          "options": [
            "When λ is zero, the model produces the same results as an OLS regression.",
            "As λ increases towards infinity, the coefficients approach exactly zero.",
            "Increasing λ decreases the model's sensitivity to multicollinearity.",
            "As λ increases, the coefficients shrink toward zero but generally remain non-zero.",
            "Lowering λ increases the 'stiffness' of the model, making it less likely to fit noise."
          ],
          "correctAnswers": [
            "When λ is zero, the model produces the same results as an OLS regression.",
            "Increasing λ decreases the model's sensitivity to multicollinearity.",
            "As λ increases, the coefficients shrink toward zero but generally remain non-zero."
          ],
          "explanation": "λ controls the trade-off between fitting the data and keeping coefficients small. At λ=0, we have OLS. As λ grows, coefficients shrink asymptotically toward zero to handle multicollinearity, though unlike Lasso, they rarely hit zero exactly."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "Before applying Ridge regression, it is critical to ____ the features because the L2 penalty is sensitive to the scale of the input variables.",
          "options": [],
          "correctAnswers": [
            "scale",
            "standardize",
            "normalize"
          ],
          "placeholder": "e.g., scale"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Looking at the geometric interpretation of Ridge regression, why does the optimal solution occur where the OLS elliptical contours touch the L2 constraint circle?",
          "options": [
            "The circle represents the maximum possible error allowed by the model.",
            "The intersection represents the lowest possible error that satisfies the coefficient budget.",
            "The origin is where the model achieves the highest possible variance.",
            "The elliptical contours represent the penalty term while the circle represents the data."
          ],
          "correctAnswers": [
            "The intersection represents the lowest possible error that satisfies the coefficient budget."
          ],
          "explanation": "The OLS ellipses represent sets of coefficients with equal error; the circle represents the 'budget' of coefficient magnitudes. The best Ridge solution is the point with the smallest error (the innermost ellipse) that still touches the constraint circle.",
          "caption": "Diagram of OLS error ellipses intersecting a circular L2 penalty constraint."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "Based on the behavior of the coefficients in the simulation, why do they converge toward the origin as the slider moves?",
          "options": [
            "The increased penalty cost outweighs the benefit of slightly reducing the residual error.",
            "The model is switching from a squared error loss to an absolute error loss.",
            "The features are becoming more correlated, forcing the model to pick only one.",
            "The origin represents the point where the model has the highest possible accuracy."
          ],
          "correctAnswers": [
            "The increased penalty cost outweighs the benefit of slightly reducing the residual error."
          ],
          "explanation": "As the penalty (lambda) increases, the 'cost' of having large coefficients rises. The optimization algorithm finds a new balance point where the coefficients are smaller, accepting a slightly higher training error in exchange for a much lower penalty.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "9827cc7d-2523-4616-8be5-fe2843075d06",
      "title": "Lasso Regression and Feature Selection",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which specific mathematical property of the L1 penalty allows Lasso to perform feature selection, unlike the L2 penalty used in Ridge regression?",
          "options": [
            "The L1 penalty is the square of the sum of coefficients, which penalizes large values more heavily.",
            "The L1 penalty has a constant gradient even as coefficients approach zero, maintaining pressure to reach exactly zero.",
            "The L1 penalty is differentiable at the origin, allowing for standard gradient descent to find zeros.",
            "The L1 penalty scales quadratically with the number of predictors, forcing the model to simplify."
          ],
          "correctAnswers": [
            "The L1 penalty has a constant gradient even as coefficients approach zero, maintaining pressure to reach exactly zero."
          ],
          "explanation": "Because the absolute value function has a constant slope, the 'shinkage' force does not vanish as the coefficient gets small, unlike Ridge where the squared penalty's derivative approaches zero near the origin."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In a scenario with 100 input features where you suspect only 5 have a meaningful relationship with the target, which of the following are benefits of choosing Lasso regression?",
          "options": [
            "It improves model interpretability by producing a sparse model.",
            "It inherently handles highly correlated features by keeping all of them in the model.",
            "It performs automated feature selection by zeroing out irrelevant predictors.",
            "It guarantees a lower training error than standard OLS regression.",
            "It reduces the risk of overfitting by constraining the total magnitude of coefficients."
          ],
          "correctAnswers": [
            "It improves model interpretability by producing a sparse model.",
            "It performs automated feature selection by zeroing out irrelevant predictors.",
            "It reduces the risk of overfitting by constraining the total magnitude of coefficients."
          ],
          "explanation": "Lasso creates 'sparsity' by setting coefficients to zero, which selects features and aids interpretation. Like Ridge, it also regularizes to prevent overfitting, but it does not handle correlation as evenly as Ridge and does not improve training error (it usually increases it to improve generalization)."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "A model where many of the coefficient weights are exactly zero is referred to as a ____ model.",
          "options": [],
          "correctAnswers": [
            "sparse",
            "sparsity"
          ],
          "explanation": "Sparsity is the technical term for a model state where most parameters are zero, which is the primary outcome of Lasso regularization.",
          "placeholder": "Enter term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "In the geometric interpretation of Lasso, why is the solution likely to fall on one of the axes?",
          "options": [
            "The elliptical OLS contours are forced to be perfectly circular in L1 space.",
            "The L1 constraint region has 'sharp' corners on the axes that the OLS contours are more likely to touch first.",
            "The L1 constraint region is a sphere that touches all axes at the same distance.",
            "The L1 penalty moves the OLS center closer to the origin before the constraint is applied."
          ],
          "correctAnswers": [
            "The L1 constraint region has 'sharp' corners on the axes that the OLS contours are more likely to touch first."
          ],
          "explanation": "The L1 'diamond' shape has vertices on the axes. When the expanding OLS error contours first contact this diamond, they are statistically more likely to hit these high-extrema corners than the flat edges.",
          "caption": "Diagram of L1 diamond constraint and OLS error ellipses touching at a corner."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As the penalty strength increases, why do the coefficients disappear one by one rather than all shrinking at the same rate?",
          "options": [
            "The diamond constraint shrinks, and its sharp corners eventually force each coefficient to hit the axis at different thresholds.",
            "The circular L2 constraint causes the coefficients to spiral toward the center at different speeds.",
            "The L1 penalty only applies to the largest coefficient at any given time, leaving the others untouched.",
            "The gradient of the loss function increases for smaller coefficients, making them vanish first."
          ],
          "correctAnswers": [
            "The diamond constraint shrinks, and its sharp corners eventually force each coefficient to hit the axis at different thresholds."
          ],
          "explanation": "As lambda grows, the L1 'diamond' constraint shrinks toward the origin. Because the OLS contours are ellipses oriented according to the data, the 'corners' of the diamond hit the contours at different lambda values for each dimension, resulting in a staggered exclusion of variables.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "8417398a-b253-4a07-8314-593269315056",
      "title": "Cross-Validation for Lambda Selection",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the context of K-fold cross-validation, what happens to the K individual models once the optimal lambda is identified?",
          "options": [
            "They are averaged together to form a final ensemble model.",
            "They are discarded, and a new model is trained on the full dataset using the best lambda.",
            "The model with the lowest individual fold error is selected as the production model.",
            "The weights from all K models are summed and normalized."
          ],
          "correctAnswers": [
            "They are discarded, and a new model is trained on the full dataset using the best lambda."
          ],
          "explanation": "Cross-validation is used only to find the best hyperparameter (lambda). Once determined, we use all available data to train the final model to maximize its learning potential, rather than keeping the models trained on only subsets (K-1 folds) of the data."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Why is K-fold cross-validation generally preferred over a single 'hold-out' validation split for selecting lambda?",
          "options": [
            "It reduces the risk of 'luck of the draw' where a specific split happens to be unrepresentative.",
            "It provides a more stable estimate of the model's true performance by averaging errors.",
            "It prevents the model from ever seeing the test data during final evaluation.",
            "It ensures that every data point is used exactly once for validation across the process.",
            "It eliminates the need for a final test set entirely."
          ],
          "correctAnswers": [
            "It reduces the risk of 'luck of the draw' where a specific split happens to be unrepresentative.",
            "It provides a more stable estimate of the model's true performance by averaging errors.",
            "It ensures that every data point is used exactly once for validation across the process."
          ],
          "explanation": "K-fold CV is robust because it rotates the validation set, ensuring performance isn't tied to one arbitrary split. However, it does not eliminate the need for a final, independent test set to report final accuracy to stakeholders."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When selecting lambda using the 'One-Standard-Error Rule,' we choose the simplest model whose error is within one standard error of the minimum to favor ____.",
          "options": [],
          "correctAnswers": [
            "parsimony",
            "simplicity",
            "interpretability",
            "model parsimony"
          ],
          "placeholder": "Enter a conceptual term"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Which region of the Cross-Validation Error Curve represents a model that has been 'over-regularized'?",
          "options": [
            "The region where lambda is near zero and error is high.",
            "The region where lambda is very large and the error is high.",
            "The absolute minimum point of the U-shaped curve.",
            "The region where the training error is exactly zero."
          ],
          "correctAnswers": [
            "The region where lambda is very large and the error is high."
          ],
          "explanation": "Over-regularization occurs when the penalty (lambda) is too high, leading to underfitting. This happens on the right side of the CV plot where the model is too simple to capture the data's structure.",
          "caption": "A U-shaped curve of CV error versus lambda."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As we sweep from very low lambda values to very high lambda values, why does the cross-validation error typically follow a U-shaped curve?",
          "options": [
            "Low lambda values allow for high variance (overfitting), while high lambda values cause high bias (underfitting).",
            "The error increases at both ends because the model is unable to converge on a single global minimum.",
            "The number of folds decreases as lambda increases, leading to higher instability in the error calculation.",
            "High lambda values lead to larger coefficients, which inherently increases the mean squared error of the prediction."
          ],
          "correctAnswers": [
            "Low lambda values allow for high variance (overfitting), while high lambda values cause high bias (underfitting)."
          ],
          "explanation": "At low lambda, the model is too flexible and fits the noise (high variance). At high lambda, the penalty is too harsh, forcing coefficients toward zero and missing the signal (high bias). The 'Goldilocks' zone is the bottom of that U-curve.",
          "scene": "concept"
        }
      ]
    },
    {
      "sessionId": "04155065-34f2-4c74-b22c-1e8d1cce86ed",
      "title": "The Road Ahead: From Regression to Modern ML",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "How does Elastic Net differ from purely using Ridge or Lasso regularization?",
          "options": [
            "It eliminates the need for cross-validation by calculating the ideal penalty automatically.",
            "It uses a weighted combination of both L1 and L2 penalties to handle correlated features.",
            "It replaces the least squares objective function with a non-linear kernel.",
            "It only regularizes the intercept term while leaving coefficients untouched."
          ],
          "correctAnswers": [
            "It uses a weighted combination of both L1 and L2 penalties to handle correlated features."
          ],
          "explanation": "Elastic Net is a hybrid approach that combines the feature selection capabilities of Lasso (L1) with the stability and group-handling of Ridge (L2), making it effective when multiple variables are highly correlated."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "In the context of the course, which of the following are universal 'diagnostic' concepts that apply to both classical linear regression and modern machine learning?",
          "options": [
            "Analyzing residuals to check for systematic patterns of error",
            "The bias-variance tradeoff as a framework for model complexity",
            "The use of validation sets to assess out-of-sample performance",
            "The requirement that all models must be strictly linear in their parameters",
            "The interpretation of p-values as the primary metric for prediction accuracy"
          ],
          "correctAnswers": [
            "Analyzing residuals to check for systematic patterns of error",
            "The bias-variance tradeoff as a framework for model complexity",
            "The use of validation sets to assess out-of-sample performance"
          ],
          "explanation": "Residual analysis, validation techniques, and the bias-variance tradeoff are fundamental principles of data science that remain relevant regardless of whether you are using a simple line or a complex neural network."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "When transitioning from OLS to modern predictive modeling, what is the primary shift in the practitioner's goal?",
          "options": [
            "Moving from a focus on prediction accuracy to a focus on parameter interpretation.",
            "Shifting from understanding 'why' (coefficients) to prioritizing 'what' (prediction performance).",
            "Abandoning the use of data for the use of purely algorithmic intuition.",
            "Decreasing the number of variables to ensure the model can be graphed in 2D."
          ],
          "correctAnswers": [
            "Shifting from understanding 'why' (coefficients) to prioritizing 'what' (prediction performance)."
          ],
          "explanation": "While OLS often emphasizes the interpretability of coefficients (inference), modern ML often prioritizes the model's ability to generalize and make accurate predictions on new data."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "Why is the linear regression you've learned considered a 'building block' for more advanced AI techniques?",
          "options": [
            "Logistic regression uses a linear engine with a different output wrapper for classification.",
            "Neural networks are essentially many 'stacked' linear units with non-linear activations.",
            "Regularization techniques like L1 and L2 are still used to prevent overfitting in deep learning.",
            "Modern AI has completely moved away from weights and biases to avoid the math of regression."
          ],
          "correctAnswers": [
            "Logistic regression uses a linear engine with a different output wrapper for classification.",
            "Neural networks are essentially many 'stacked' linear units with non-linear activations.",
            "Regularization techniques like L1 and L2 are still used to prevent overfitting in deep learning."
          ],
          "explanation": "Linear regression provides the mathematical foundation (weights, biases, and optimization) that scales into complex models like Logistic Regression and Deep Neural Networks.",
          "caption": "A flowchart showing the evolution from a simple linear equation to a single neural network unit."
        },
        {
          "id": "q5",
          "type": "animation",
          "prompt": "As we move from a simple OLS model to a model with increasingly heavy L2 (Ridge) regularization, why does the model's variance decrease?",
          "options": [
            "The penalty forces the coefficients toward zero, making the model less sensitive to small fluctuations in the training data.",
            "The regularization increases the number of features, which naturally stabilizes the prediction line.",
            "The model ignores the intercept entirely, ensuring the line always passes through the origin.",
            "The L2 penalty eliminates the most important variables first, leaving only noise behind."
          ],
          "correctAnswers": [
            "The penalty forces the coefficients toward zero, making the model less sensitive to small fluctuations in the training data."
          ],
          "explanation": "The animation shows that as the penalty (lambda) grows, the 'wiggliness' or sensitivity of the line to specific data points drops. By shrinking coefficients, we trade a little bias for a significant reduction in variance.",
          "scene": "concept"
        }
      ]
    }
  ]
};

export const PRACTICE_SESSIONS = [PYTHAGOREAN_PRACTICE, REGRESSION_PRACTICE];
