/** Leftover Pythagorean exam dump (chalkboard animation spec, no leftover html). */

export const PYTHAGOREAN_EXAM = {
  "id": "pythagorean",
  "aliases": [
    "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2"
  ],
  "title": "Pythagorean Theorem",
  "exams": [
    {
      "examId": "unit1",
      "unitId": "unit1",
      "title": "Unit 1 Comprehensive Assessment",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "Which component of a right triangle is considered the 'anchor' or 'boss' that defines the relationship between all other sides?",
          "options": [
            "The longest side",
            "The 90-degree angle",
            "The vertical leg",
            "The horizontal base"
          ],
          "correctAnswers": [
            "The 90-degree angle"
          ],
          "explanation": "The 90-degree angle is the anchor because it defines which sides are legs (the ones forming the angle) and which side is the hypotenuse (the one opposite the angle)."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "If you rotate a right triangle 45 degrees so that no side is perfectly horizontal or vertical, which of the following properties remain unchanged?",
          "options": [
            "The identification of the hypotenuse as the side opposite the right angle",
            "The designation of the two sides forming the right angle as 'legs'",
            "The orientation of the hypotenuse as the 'top' side",
            "The mathematical relationship between the areas of the squares on each side"
          ],
          "correctAnswers": [
            "The identification of the hypotenuse as the side opposite the right angle",
            "The designation of the two sides forming the right angle as 'legs'",
            "The mathematical relationship between the areas of the squares on each side"
          ],
          "explanation": "Orientation does not change the geometric roles of the sides; the hypotenuse is always opposite the 90-degree vertex regardless of rotation.",
          "caption": "A diagram showing a right triangle in three different rotations."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the context of the Pythagorean theorem, the exponent '2' in the term $a^2$ represents the ____ of a shape built using side 'a'.",
          "options": [],
          "correctAnswers": [
            "area",
            "two dimensions",
            "physical area"
          ],
          "explanation": "",
          "placeholder": "geometric property"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "When moving from a 1D side length of 5 units to its 2D representation in the theorem, what does the resulting '25 units' physically represent?",
          "options": [
            "The length of the hypotenuse",
            "The perimeter of the triangle",
            "The area of a square built on that side",
            "The sum of the two legs"
          ],
          "correctAnswers": [
            "The area of a square built on that side"
          ],
          "explanation": "Squaring a side length (5x5) translates a 1D measurement into a 2D square area containing 25 grid units."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "Which of the following are common pitfalls when learners first apply the Pythagorean theorem?",
          "options": [
            "Adding the side lengths directly (3 + 4 = 7) instead of their areas",
            "Squaring the area value a second time (e.g., squaring 25 again)",
            "Identifying the hypotenuse as the side opposite the right angle",
            "Applying the formula to triangles that do not have a 90-degree angle"
          ],
          "correctAnswers": [
            "Adding the side lengths directly (3 + 4 = 7) instead of their areas",
            "Squaring the area value a second time (e.g., squaring 25 again)",
            "Applying the formula to triangles that do not have a 90-degree angle"
          ],
          "explanation": "Learners often mistakenly add lengths instead of areas, over-square values, or ignore the 90-degree requirement."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "The 'oppositeness' relationship is used to identify the hypotenuse because using the description '____' can be visually misleading in nearly isosceles right triangles.",
          "options": [],
          "correctAnswers": [
            "longest side",
            "the longest side",
            "longest"
          ],
          "explanation": "",
          "placeholder": "visual descriptor"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "If a triangle has an angle greater than 90 degrees (obtuse), how does the area of the square on the longest side compare to the sum of the areas of the squares on the two shorter sides?",
          "options": [
            "It is exactly equal to the sum",
            "It is smaller than the sum",
            "It is larger than the sum",
            "It is half of the sum"
          ],
          "correctAnswers": [
            "It is larger than the sum"
          ],
          "explanation": "In an obtuse triangle, the opening of the angle stretches the 'bridge' (the longest side), making its square area exceed the combined area of the leg squares.",
          "caption": "Obtuse triangle with squares on sides illustrating area mismatch."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "Which of these are required to be true for the area of the square on side C to equal the sum of the areas on sides A and B?",
          "options": [
            "The angle opposite side C must be exactly 90 degrees",
            "The triangle must have three sides of equal length",
            "Sides A and B must be the 'legs' that form the right angle",
            "The triangle must be located on a coordinate grid"
          ],
          "correctAnswers": [
            "The angle opposite side C must be exactly 90 degrees",
            "Sides A and B must be the 'legs' that form the right angle"
          ],
          "explanation": "The theorem only applies to right triangles where the squares of the two sides forming the 90-degree angle sum to the square of the side opposite it."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "To identify the hypotenuse in a complex diagram, one should draw an arrow starting from the vertex of the ____ and pointing outward.",
          "options": [],
          "correctAnswers": [
            "right angle",
            "90 degree angle",
            "90-degree angle",
            "square symbol"
          ],
          "explanation": "",
          "placeholder": "specific angle"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "In the 'Core Area Equality' lesson, the 3-4-5 triangle is used primarily because:",
          "options": [
            "It is the only triangle where the theorem works",
            "It allows for easy verification by counting whole grid squares",
            "It is an equilateral triangle with equal areas",
            "It proves that the legs are always longer than the hypotenuse"
          ],
          "correctAnswers": [
            "It allows for easy verification by counting whole grid squares"
          ],
          "explanation": "The 3-4-5 triangle yields perfect square areas of 9, 16, and 25, which can be visually counted on a grid without dealing with decimals.",
          "caption": "3-4-5 triangle on a grid with side squares."
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "When visualizing 'sides as squares,' what are we transitionining between?",
          "options": [
            "1D line segments and 2D regions",
            "Algebraic symbols and geometric shapes",
            "Right angles and obtuse angles",
            "Side lengths and physical space"
          ],
          "correctAnswers": [
            "1D line segments and 2D regions",
            "Algebraic symbols and geometric shapes",
            "Side lengths and physical space"
          ],
          "explanation": "The unit emphasizes moving from abstract numbers (algebra) and lines (1D) to tangible areas (2D) and physical space."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "The Pythagorean theorem is described as an 'if and only if' relationship, meaning it ____ apply to triangles without a 90-degree angle.",
          "options": [],
          "correctAnswers": [
            "cannot",
            "does not",
            "will not"
          ],
          "explanation": "",
          "placeholder": "can/cannot"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "What happens to the area relationship if we test an equilateral triangle (where all angles are 60 degrees)?",
          "options": [
            "The area of one square equals the sum of the other two",
            "The square on any side is smaller than the sum of the other two",
            "The square on any side is larger than the sum of the other two",
            "The areas cannot be measured because there is no right angle"
          ],
          "correctAnswers": [
            "The square on any side is smaller than the sum of the other two"
          ],
          "explanation": "Because 60 degrees is less than 90 degrees (acute), the 'bridge' side is shorter than it would be in a right triangle, leading to an area deficit ($c^2 < a^2 + b^2$)."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "Identify the characteristics of 'Legs' in a right triangle.",
          "options": [
            "They are the two sides that build the right angle",
            "They are always shorter than the hypotenuse",
            "They are always equal in length to each other",
            "They represent the 'addends' in the area-sum relationship"
          ],
          "correctAnswers": [
            "They are the two sides that build the right angle",
            "They are always shorter than the hypotenuse",
            "They represent the 'addends' in the area-sum relationship"
          ],
          "explanation": "Legs form the 90-degree angle and their squared areas are added together; they are always shorter than the hypotenuse, but they do not have to be equal to each other."
        },
        {
          "id": "q15",
          "type": "single",
          "prompt": "Why is the term 'hypotenuse' specifically linked to the concept of 'sum' in this unit?",
          "options": [
            "Because it is the smallest area",
            "Because its square area is the total of the other two square areas",
            "Because you add its length to the legs to find the perimeter",
            "Because it is always the horizontal side"
          ],
          "correctAnswers": [
            "Because its square area is the total of the other two square areas"
          ],
          "explanation": "In the area-addition principle, the hypotenuse square is the 'whole' (sum), while the leg squares are the 'parts' (addends)."
        },
        {
          "id": "q16",
          "type": "animation",
          "scene": "angle-open",
          "prompt": "As the vertex angle of the triangle increases from 90 degrees to 120 degrees while the lengths of the two legs stay fixed, why does the Pythagorean equality ($a^2 + b^2 = c^2$) fail?",
          "options": [
            "Because the side connecting the legs must stretch to cover the wider opening, making its square area too large.",
            "Because the squares on the two legs grow in size to match the new angle, exceeding the hypotenuse square.",
            "Because the triangle's perimeter remains constant while the internal area is redistributed to the legs.",
            "Because the right-angle anchor is lost, which causes the area of the two legs to decrease automatically."
          ],
          "correctAnswers": [
            "Because the side connecting the legs must stretch to cover the wider opening, making its square area too large."
          ],
          "explanation": "In the simulation, you can see that side 'c' must lengthen to bridge the wider gap as the angle opens, meaning $c^2$ will now be greater than $a^2 + b^2$.",
          "caption": "Geometry of a triangle with varying interior angle"
        }
      ]
    },
    {
      "examId": "unit3",
      "unitId": "unit3",
      "title": "Unit 3 Mastery Exam",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You are building a ramp with a base (leg) of 12 feet and a height (leg) of 5 feet. What is the length of the ramp (hypotenuse)?",
          "options": [
            "13 feet",
            "17 feet",
            "169 feet",
            "14.5 feet"
          ],
          "correctAnswers": [
            "13 feet"
          ],
          "explanation": "This follows the 5-12-13 Pythagorean triple. By calculating 5 squared (25) plus 12 squared (144), you get 169. The square root of 169 is 13."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following sets of numbers represent valid Pythagorean triples?",
          "options": [
            "3, 4, 5",
            "6, 8, 10",
            "1, 2, 3",
            "7, 24, 25",
            "5, 12, 14"
          ],
          "correctAnswers": [
            "3, 4, 5",
            "6, 8, 10",
            "7, 24, 25"
          ],
          "explanation": "3-4-5 and 7-24-25 are basic triples. 6-8-10 is a triple because it is a multiple of 3-4-5 (the Scaling Principle). 1-2-3 and 5-12-14 do not satisfy the theorem."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "When solving for a missing leg 'a' given the hypotenuse 'c' and leg 'b', the correctly rearranged formula is a² = ____.",
          "options": [],
          "correctAnswers": [
            "c^2 - b^2",
            "c² - b²",
            "c*c - b*b"
          ],
          "explanation": "To isolate a leg, you must subtract the square of the known leg from the square of the hypotenuse.",
          "placeholder": "e.g., c^2 - b^2"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "A 10ft ladder is leaning against a wall. The base of the ladder is 6ft away from the wall. How high up the wall does the ladder reach?",
          "options": [
            "4 ft",
            "8 ft",
            "11.6 ft",
            "64 ft"
          ],
          "correctAnswers": [
            "8 ft"
          ],
          "explanation": "The ladder is the hypotenuse (10). Using the formula for a leg: 10² - 6² = 100 - 36 = 64. The square root of 64 is 8.",
          "caption": "Right triangle formed by a ladder against a wall."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "When calculating the distance between two coordinates (x1, y1) and (x2, y2) using the Distance Formula, which steps are mathematically necessary?",
          "options": [
            "Find the difference between the x-coordinates and square it.",
            "Subtract the y-coordinates and square the result.",
            "Add the two squared differences together.",
            "Take the square root of the final sum.",
            "Multiply the x-difference by the y-difference."
          ],
          "correctAnswers": [
            "Find the difference between the x-coordinates and square it.",
            "Subtract the y-coordinates and square the result.",
            "Add the two squared differences together.",
            "Take the square root of the final sum."
          ],
          "explanation": "The Distance Formula is d = √((x2-x1)² + (y2-y1)²). This involves finding differences (legs), squaring them, summing them, and taking the root."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "The Pythagorean triple (3, 4, 5) can be scaled by a factor of 10 to create the triple (____).",
          "options": [],
          "correctAnswers": [
            "30, 40, 50",
            "30,40,50",
            "30-40-50"
          ],
          "explanation": "The Scaling Principle states that if you multiply all sides of a triple by the same constant 'k', the resulting triangle is still a right triangle.",
          "placeholder": "Enter three numbers"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "If a triangle has sides of 10, 15, and 20, is it a right triangle?",
          "options": [
            "Yes, because 10 + 15 > 20.",
            "No, because 10² + 15² is 325, which is not equal to 20² (400).",
            "Yes, because any three sides can form a right triangle if arranged correctly.",
            "No, because the sides are not integers."
          ],
          "correctAnswers": [
            "No, because 10² + 15² is 325, which is not equal to 20² (400)."
          ],
          "explanation": "According to the Converse of the Pythagorean Theorem, a² + b² must equal c². Here, 100 + 225 = 325, which does not match 400."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "Why is the order of subtraction (e.g., x1-x2 vs x2-x1) irrelevant in the Distance Formula?",
          "options": [
            "Because distances are always positive anyway.",
            "Because squaring a negative number results in a positive number.",
            "Because the formula uses absolute values before squaring.",
            "Because the coordinate plane is symmetrical.",
            "Because the squares of opposite numbers (like -3 and 3) are identical."
          ],
          "correctAnswers": [
            "Because squaring a negative number results in a positive number.",
            "Because the squares of opposite numbers (like -3 and 3) are identical."
          ],
          "explanation": "Squaring removes the effect of the sign. Whether the difference is 3 or -3, the squared result (the area of the square on that leg) is 9."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "In the formula a² + b² = c², the variable ____ must always represent the longest side.",
          "options": [],
          "correctAnswers": [
            "c",
            "c side",
            "the hypotenuse"
          ],
          "explanation": "The hypotenuse is always the longest side and must be the 'c' variable isolated on one side of the equation.",
          "placeholder": "Variable name"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "A box has a length of 3cm, a width of 4cm, and a height of 12cm. What is the length of the longest diagonal inside the box?",
          "options": [
            "5 cm",
            "13 cm",
            "19 cm",
            "15 cm"
          ],
          "correctAnswers": [
            "13 cm"
          ],
          "explanation": "First find the floor diagonal: √(3² + 4²) = 5. Then use that as a leg with the height: √(5² + 12²) = √169 = 13.",
          "caption": "3D diagram of a rectangular prism space diagonal."
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "Which of these errors are common when students first learn to solve for the hypotenuse?",
          "options": [
            "Adding the lengths (a+b) before squaring them.",
            "Forgetting to take the square root at the final step.",
            "Subtracting the legs instead of adding them.",
            "Using the formula for triangles that don't have a right angle.",
            "Squaring the numbers before adding them."
          ],
          "correctAnswers": [
            "Adding the lengths (a+b) before squaring them.",
            "Forgetting to take the square root at the final step.",
            "Using the formula for triangles that don't have a right angle."
          ],
          "explanation": "Students often add before squaring (the order of operations error), forget the root (leaving the area instead of side), or apply it to non-right triangles."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "The process of moving from $a^2 + b^2 = c^2$ to $a = \\sqrt{c^2 - b^2}$ is known as algebraic ____.",
          "options": [],
          "correctAnswers": [
            "isolation",
            "manipulation",
            "rearrangement"
          ],
          "explanation": "Isolation refers to getting the unknown variable by itself on one side of the equals sign.",
          "placeholder": "e.g., isolation"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "What is the distance between coordinates (1, 2) and (4, 6)?",
          "options": [
            "7 units",
            "5 units",
            "25 units",
            "3.5 units"
          ],
          "correctAnswers": [
            "5 units"
          ],
          "explanation": "The horizontal leg (Δx) is 4-1=3. The vertical leg (Δy) is 6-2=4. This forms a 3-4-5 triangle, so the distance is 5.",
          "caption": "Coordinate plane distance calculation."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "If you calculate the side of a triangle to be √50, which of the following are true?",
          "options": [
            "The result is an irrational number.",
            "The length is exactly 7.",
            "The length is between 7 and 8.",
            "You likely made a mistake as sides must be integers.",
            "It can be rounded to approximately 7.07."
          ],
          "correctAnswers": [
            "The result is an irrational number.",
            "The length is between 7 and 8.",
            "It can be rounded to approximately 7.07."
          ],
          "explanation": "Most square roots in geometry are irrational. Since 7²=49 and 8²=64, √50 is just over 7."
        },
        {
          "id": "q15",
          "type": "single",
          "prompt": "In the 3D distance formula d² = x² + y² + z², what does the component (x² + y²) represent?",
          "options": [
            "The volume of the box.",
            "The square of the diagonal of the base (floor).",
            "The height of the prism.",
            "The perimeter of the base."
          ],
          "correctAnswers": [
            "The square of the diagonal of the base (floor)."
          ],
          "explanation": "According to the two-step logic, the square of the floor diagonal is x² + y². This value then becomes the 'a²' in the final 3D calculation."
        },
        {
          "id": "q16",
          "type": "animation",
          "scene": "prism-height",
          "prompt": "Observe the relationship between the 2D floor diagonal and the 3D space diagonal as the height of the box increases. Why does the space diagonal grow even when the floor dimensions remain constant?",
          "options": [
            "Because the floor diagonal acts as a fixed leg in a new vertical right triangle where the increasing height is the second leg.",
            "Because increasing the height of the box increases the area of the base, which forces the diagonal to stretch.",
            "Because the 3D diagonal is simply the sum of the length, width, and height regardless of the angles.",
            "Because the triangle on the floor rotates upward, making the original hypotenuse longer through expansion."
          ],
          "correctAnswers": [
            "Because the floor diagonal acts as a fixed leg in a new vertical right triangle where the increasing height is the second leg."
          ],
          "explanation": "The 3D diagonal calculation is a two-step process. The floor diagonal is calculated first and then becomes the 'base' leg for the vertical triangle that includes the height.",
          "caption": "Prism height varying over time."
        }
      ]
    }
  ]
};

export const REGRESSION_EXAM = {
  "id": "regression",
  "aliases": [
    "706d4d5c-1b4d-4707-abb0-45fc9b1f4926"
  ],
  "title": "Linear Regression",
  "exams": [
    {
      "examId": "unit1",
      "unitId": "unit1",
      "title": "Geometric Intuition Proficiency Exam",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You are looking at a scatterplot where the data points form a tight, cigar-like shape sloping downward from left to right. What does this visual pattern tell you about the relationship?",
          "options": [
            "A weak positive correlation where predictions are highly uncertain",
            "A strong negative correlation where high X values predict low Y values",
            "A strong positive correlation where X and Y increase together",
            "A weak negative correlation with a very steep slope"
          ],
          "correctAnswers": [
            "A strong negative correlation where high X values predict low Y values"
          ],
          "explanation": "A downward slope indicates a negative relationship, and a 'tight' cigar shape indicates high strength (predictability). Slope steepness and correlation strength are independent concepts.",
          "caption": "Tight downward-sloping scatterplot"
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "When 'eyeballing' a line of best fit using the Pencil Test, which of the following goals are you trying to achieve simultaneously?",
          "options": [
            "Ensuring the line touches as many individual data points as possible",
            "Balancing the total vertical distance of points above and below the line",
            "Minimizing the global visual gaps (residuals) across all points",
            "Ignoring the 'empty space' to focus only on the highest and lowest points",
            "Adjusting the slope so the line reflects the aggregate 'flow' of the cloud"
          ],
          "correctAnswers": [
            "Balancing the total vertical distance of points above and below the line",
            "Minimizing the global visual gaps (residuals) across all points",
            "Adjusting the slope so the line reflects the aggregate 'flow' of the cloud"
          ],
          "explanation": "A best-fit line is a global summarizer; it balances errors and follows the aggregate trend rather than trying to hit specific points or focusing only on extremes."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In the context of regression, the vertical distance between an observed data point and the prediction line is known as a ____.",
          "options": [],
          "correctAnswers": [
            "residual",
            "error",
            "vertical gap"
          ],
          "placeholder": "Term for prediction error"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why is the residual measured vertically (parallel to the Y-axis) rather than as the shortest perpendicular distance to the line?",
          "options": [
            "Vertical distances are easier to calculate with a standard ruler",
            "The model is specifically trying to predict the Y-variable based on X",
            "Perpendicular distances would ignore the influence of outliers",
            "The X-variable is always assumed to have more error than the Y-variable"
          ],
          "correctAnswers": [
            "The model is specifically trying to predict the Y-variable based on X"
          ],
          "explanation": "Because we use X to predict Y, the 'error' is defined as how much our Y prediction (the line) differs from the actual Y observation.",
          "caption": "Vertical vs Perpendicular residual diagram"
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "Which of the following would likely happen to the line of best fit if a high-leverage outlier (a point far to the right of the rest of the data) is moved significantly upward?",
          "options": [
            "The slope of the line would increase (become steeper)",
            "The intercept of the line would likely shift downward to compensate",
            "The line would rotate toward the new position of the outlier",
            "The correlation strength would automatically increase",
            "The residuals for the main cluster of points would likely increase"
          ],
          "correctAnswers": [
            "The slope of the line would increase (become steeper)",
            "The line would rotate toward the new position of the outlier",
            "The residuals for the main cluster of points would likely increase"
          ],
          "explanation": "High-leverage points 'pull' the line toward them. Moving one up increases the slope and rotation, which often creates larger residuals for the original main cluster.",
          "caption": "Visual of outlier influence on slope"
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "The point on a scatterplot that represents the average of all X values and the average of all Y values is called the ____, and the best-fit line must always pass through it.",
          "options": [],
          "correctAnswers": [
            "centroid",
            "mean point",
            "center of mass"
          ],
          "placeholder": "Geometric center"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "If a line has a 'Zero-Sum' of raw residuals (the sum of all $y - \\hat{y}$ is 0), does this guarantee the line is the best possible fit?",
          "options": [
            "Yes, it means there is no error in the model",
            "Yes, it means the line is perfectly balanced",
            "No, because large positive and negative errors can cancel each other out",
            "No, because the zero-sum only applies to horizontal lines"
          ],
          "correctAnswers": [
            "No, because large positive and negative errors can cancel each other out"
          ],
          "explanation": "Raw sums are deceptive; a line could be very far from all points but still have errors that sum to zero if the 'ups' and 'downs' are equal in magnitude."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "A 'strong' relationship in a scatterplot is characterized by which of the following visual features?",
          "options": [
            "Points are very close to the trend line",
            "The slope of the trend line is very steep",
            "There is low 'noise' or vertical scatter around the signal",
            "The data points cover a very wide range of X-values",
            "Predictions made using the line are likely to be more accurate"
          ],
          "correctAnswers": [
            "Points are very close to the trend line",
            "There is low 'noise' or vertical scatter around the signal",
            "Predictions made using the line are likely to be more accurate"
          ],
          "explanation": "Strength refers to the tightness of the cluster (low noise), not the steepness of the slope or the range of the data."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "A single point that is far removed from the main cluster and has a disproportionate effect on the line's slope is said to have high ____.",
          "options": [],
          "correctAnswers": [
            "leverage",
            "influence"
          ],
          "placeholder": "Mechanical term for slope influence"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "If you see a scatterplot where the points form a clear 'U' shape, what is the most appropriate conclusion regarding a linear best-fit line?",
          "options": [
            "The linear line will perfectly capture the U-shaped relationship",
            "There is no relationship at all between the variables",
            "A straight line is the wrong tool because the relationship is non-linear",
            "The correlation strength (r) will be 1.0 because the pattern is clear"
          ],
          "correctAnswers": [
            "A straight line is the wrong tool because the relationship is non-linear"
          ],
          "explanation": "Linear regression assumes a straight-line relationship. A U-shape is a strong relationship, but a linear model will fail to describe it accurately.",
          "caption": "Non-linear U-shaped scatterplot"
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "In the 'Springs and Tension' analogy, the state of 'equilibrium' represents the Line of Best Fit. What is being 'balanced' in this state?",
          "options": [
            "The upward and downward forces exerted by the springs",
            "The number of points above versus below the line",
            "The rotational torque exerted by points at different distances",
            "The total potential energy (sum of squared distances) is at its minimum",
            "The slope is forced to be exactly 1.0"
          ],
          "correctAnswers": [
            "The upward and downward forces exerted by the springs",
            "The rotational torque exerted by points at different distances",
            "The total potential energy (sum of squared distances) is at its minimum"
          ],
          "explanation": "Physical equilibrium involves balancing forces and torques, which mathematically corresponds to minimizing the sum of squared residuals."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "If a data point is located above the regression line, it has a ____ residual.",
          "options": [],
          "correctAnswers": [
            "positive",
            "plus"
          ],
          "placeholder": "Sign of the residual"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "In the 'Tug-of-War' analogy, what happens when you move the line to reduce a very large residual for a single outlier?",
          "options": [
            "All other residuals will stay the same",
            "The total error of the system is guaranteed to decrease",
            "It inevitably increases the residuals for other points in the dataset",
            "The line becomes more representative of the 'average' behavior"
          ],
          "correctAnswers": [
            "It inevitably increases the residuals for other points in the dataset"
          ],
          "explanation": "Regression is a compromise. Tilting or shifting the 'rigid' line to help one point pulls it away from others, reflecting the tension inherent in the model."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "Which of the following are considered 'Signal' rather than 'Noise' in a scatterplot?",
          "options": [
            "The general upward or downward drift of the cloud",
            "The specific vertical distance of one stray point from the line",
            "The linear trend described by the best-fit line",
            "The random variation that makes the cloud look 'fuzzy'",
            "The underlying relationship between the variables"
          ],
          "correctAnswers": [
            "The general upward or downward drift of the cloud",
            "The linear trend described by the best-fit line",
            "The underlying relationship between the variables"
          ],
          "explanation": "Signal is the pattern or relationship we want to model; Noise is the scatter or error around that pattern."
        },
        {
          "id": "q15",
          "type": "single",
          "prompt": "If a data point lies exactly on the regression line, what is its residual value?",
          "options": [
            "1.0",
            "It depends on the slope",
            "0",
            "-1.0"
          ],
          "correctAnswers": [
            "0"
          ],
          "explanation": "The residual is $y - \\hat{y}$. If the point is on the line, the observed value ($y$) and predicted value ($\\hat{y}$) are identical."
        },
        {
          "id": "q16",
          "type": "multiple",
          "prompt": "When moving from a 'Loose' cloud to a 'Tight' cloud of points (with the same slope), what remains unchanged?",
          "options": [
            "The direction of the trend (positive or negative)",
            "The predictability of Y given X",
            "The general 'Signal' or aggregate rate of change",
            "The magnitude of the residuals",
            "The correlation strength"
          ],
          "correctAnswers": [
            "The direction of the trend (positive or negative)",
            "The general 'Signal' or aggregate rate of change"
          ],
          "explanation": "Tightness (strength) changes predictability and residual size, but the direction and the slope (rate of change) can remain exactly the same."
        },
        {
          "id": "q17",
          "type": "single",
          "prompt": "What does the 'Pencil Test' suggest about the nature of a best-fit line?",
          "options": [
            "It should be drawn as a curve to connect all points",
            "It acts as a visual 'average' of the trend in the data",
            "It should always start at the origin (0,0)",
            "It is only valid if it passes through at least 50% of the points"
          ],
          "correctAnswers": [
            "It acts as a visual 'average' of the trend in the data"
          ],
          "explanation": "The Pencil Test is a heuristic for finding the 'central tendency' of a bivariate relationship."
        },
        {
          "id": "q18",
          "type": "animation",
          "prompt": "As you move the rigid rod (the line) away from the cluster of points, why does the 'tension' in the system increase so rapidly?",
          "options": [
            "Because the springs pull with a force that scales linearly with distance",
            "Because the energy in the springs is proportional to the square of their stretch distance",
            "Because the number of points increases as the rod moves further away",
            "Because the rod becomes heavier the further it moves from the center"
          ],
          "correctAnswers": [
            "Because the energy in the springs is proportional to the square of their stretch distance"
          ],
          "explanation": "The physics analogy of springs represents the 'Least Squares' method, where larger residuals contribute disproportionately more 'tension' or 'cost' to the system.",
          "scene": "scatter-cloud"
        }
      ]
    },
    {
      "examId": "unit2",
      "unitId": "unit2",
      "title": "OLS Mechanics and Derivation Assessment",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In the formal definition of a residual $e = y - \\hat{y}$, what does the term $\\hat{y}$ represent?",
          "options": [
            "The ground truth value observed in the dataset",
            "The horizontal distance from the y-axis",
            "The predicted value generated by the regression model",
            "The slope of the line of best fit"
          ],
          "correctAnswers": [
            "The predicted value generated by the regression model"
          ],
          "explanation": "In regression notation, y represents the observed data point (ground truth) and y-hat represents the value predicted by the model (mx + b)."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Why is the 'Sum of Errors' (simply adding raw residuals) considered a 'broken' metric for evaluating a model's fit?",
          "options": [
            "Positive and negative residuals can cancel each other out",
            "It can result in a total error of zero even if the line is far from all points",
            "It is computationally more expensive than squaring the errors",
            "It fails to capture the direction of the error relative to the line",
            "A zero sum does not necessarily indicate a perfect fit"
          ],
          "correctAnswers": [
            "Positive and negative residuals can cancel each other out",
            "It can result in a total error of zero even if the line is far from all points",
            "A zero sum does not necessarily indicate a perfect fit"
          ],
          "explanation": "Simple summation allows large positive and negative residuals to cancel out, potentially yielding a sum of zero despite poor predictive performance."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "Ordinary Least Squares (OLS) measures the ____ distance between an observed data point and the regression line.",
          "options": [],
          "correctAnswers": [
            "vertical",
            "perpendicular to the x-axis"
          ],
          "placeholder": "Enter direction"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "What is a primary advantage of using a 'smooth' parabolic cost function (SSE) over an absolute error function (MAE) for optimization?",
          "options": [
            "It is less sensitive to extreme outliers in the dataset",
            "It has a defined derivative at every point, including the minimum",
            "It ensures the intercept is always a positive value",
            "It is easier for humans to calculate by hand without a calculator"
          ],
          "correctAnswers": [
            "It has a defined derivative at every point, including the minimum"
          ],
          "explanation": "Squared error functions are differentiable everywhere, whereas absolute error functions have a 'V-shape' where the derivative is undefined at the tip.",
          "caption": "U-shaped vs V-shaped cost functions"
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "Which of the following are properties of the OLS cost function?",
          "options": [
            "It is convex, meaning it has a single global minimum",
            "It is non-differentiable at the point of zero error",
            "It penalizes large residuals more heavily than small ones",
            "It is often referred to as a 'One-Bowl' function",
            "It produces multiple local minima in simple linear regression"
          ],
          "correctAnswers": [
            "It is convex, meaning it has a single global minimum",
            "It penalizes large residuals more heavily than small ones",
            "It is often referred to as a 'One-Bowl' function"
          ],
          "explanation": "OLS cost functions are convex (bowl-shaped) with one global minimum and use squaring to apply a heavy penalty to large errors."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "Setting the partial derivative of the SSE with respect to $\\beta_0$ to zero results in a normal equation where the sum of the ____ must equal zero.",
          "options": [],
          "correctAnswers": [
            "residuals",
            "errors",
            "raw residuals"
          ],
          "placeholder": "term name"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "When taking the partial derivative of $SSE = \\sum(y_i - (\\beta_0 + \\beta_1x_i))^2$ with respect to $\\beta_0$, what happens to the exponent?",
          "options": [
            "It is eliminated and replaced by a square root",
            "It remains as a square throughout the entire derivation",
            "It moves to the front as a multiplier (2) due to the power rule",
            "It becomes a subscript for the beta parameters"
          ],
          "correctAnswers": [
            "It moves to the front as a multiplier (2) due to the power rule"
          ],
          "explanation": "Using the chain rule and power rule, the derivative of $u^2$ is $2u \\cdot u'$. This '2' is later simplified out when setting the equation to zero."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "In the context of the OLS objective function, which statements about 'Closed-Form Solutions' are true?",
          "options": [
            "They require an iterative 'guess and check' search algorithm",
            "They allow us to jump straight to the answer using a matrix formula",
            "They are only possible when the cost function is differentiable",
            "They are slower to compute than gradient descent on small datasets",
            "The Normal Equations provide the basis for this solution"
          ],
          "correctAnswers": [
            "They allow us to jump straight to the answer using a matrix formula",
            "They are only possible when the cost function is differentiable",
            "The Normal Equations provide the basis for this solution"
          ],
          "explanation": "Closed-form solutions (like the Normal Equations) use calculus to solve for parameters directly in one step, requiring differentiability."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "When the residual $e$ is positive, it means the observed data point lies ____ the regression line.",
          "options": [],
          "correctAnswers": [
            "above",
            "higher than"
          ],
          "placeholder": "above/below"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "If a data point is located at $(3, 10)$ and the regression model predicts $\\hat{y} = 12$ for $x = 3$, what is the residual?",
          "options": [
            "2",
            "-2",
            "12",
            "10"
          ],
          "correctAnswers": [
            "-2"
          ],
          "explanation": "Residual $e = y - \\hat{y} = 10 - 12 = -2$. The negative sign indicates an over-prediction."
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "What are the components required to construct the Sum of Squared Errors (SSE) formula?",
          "options": [
            "The observed dependent variable values ($y_i$)",
            "The model parameters (slope and intercept)",
            "The independent variable values ($x_i$)",
            "The perpendicular distance to the regression line",
            "The summation operator ($\\sum$)"
          ],
          "correctAnswers": [
            "The observed dependent variable values ($y_i$)",
            "The model parameters (slope and intercept)",
            "The independent variable values ($x_i$)",
            "The summation operator ($\\sum$)"
          ],
          "explanation": "SSE is the sum of the squared differences between observed y and the prediction (which is a function of x, slope, and intercept)."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "A ____ function is preferred in OLS because it ensures that there is only one 'bottom' or global minimum, making optimization reliable.",
          "options": [],
          "correctAnswers": [
            "convex"
          ],
          "placeholder": "Enter property"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "Why is OLS described as being 'sensitive to outliers'?",
          "options": [
            "Because it uses absolute values which ignore the sign of the error",
            "Because the squaring of residuals weights large distances disproportionately high",
            "Because it only considers the vertical distance rather than horizontal",
            "Because the intercept must always pass through the mean of the data"
          ],
          "correctAnswers": [
            "Because the squaring of residuals weights large distances disproportionately high"
          ],
          "explanation": "Since error is squared, a residual of 10 adds 100 to the cost, while a residual of 1 adds only 1. This forces the line to move significantly to accommodate outliers."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "If you move the regression line and the 'total area of error squares' decreases, what can you conclude?",
          "options": [
            "The model's fit has improved",
            "The Sum of Squared Errors (SSE) has decreased",
            "The Mean Absolute Error (MAE) must also have decreased",
            "The new line is closer to the global minimum of the cost function",
            "The residuals for every single point must have decreased"
          ],
          "correctAnswers": [
            "The model's fit has improved",
            "The Sum of Squared Errors (SSE) has decreased",
            "The new line is closer to the global minimum of the cost function"
          ],
          "explanation": "Decreasing the total area (SSE) indicates a better fit. Note that some individual residuals might increase as long as the aggregate decrease is larger."
        },
        {
          "id": "q15",
          "type": "fill",
          "prompt": "The process of finding where the slope of the cost function is ____ allows us to solve for the best $\\beta_0$ and $\\beta_1$.",
          "options": [],
          "correctAnswers": [
            "zero",
            "0"
          ],
          "placeholder": "value"
        },
        {
          "id": "q16",
          "type": "single",
          "prompt": "What mathematical rule is primarily used to take the derivative of the term $(y_i - (\\beta_0 + \\beta_1x_i))^2$?",
          "options": [
            "The Quotient Rule",
            "The Chain Rule",
            "The Product Rule",
            "The Integration by Parts"
          ],
          "correctAnswers": [
            "The Chain Rule"
          ],
          "explanation": "The Chain Rule is used to differentiate a 'nested' function where an outer function (the square) contains an inner function (the linear model)."
        },
        {
          "id": "q17",
          "type": "multiple",
          "prompt": "Which terms are treated as 'constants' when taking the partial derivative of the SSE cost function with respect to the slope ($\\beta_1$)?",
          "options": [
            "The observed values $y_i$",
            "The input values $x_i$",
            "The slope $\\beta_1$",
            "The intercept $\\beta_0$",
            "The number of data points $n$"
          ],
          "correctAnswers": [
            "The observed values $y_i$",
            "The input values $x_i$",
            "The intercept $\\beta_0$",
            "The number of data points $n$"
          ],
          "explanation": "In partial differentiation, we only treat the variable of interest ($\\beta_1$) as a variable; all other parameters and the static dataset ($x, y$) are treated as constants."
        },
        {
          "id": "q18",
          "type": "single",
          "prompt": "What is the result of $\\frac{\\partial}{\\partial \\beta_0} [ -(\\beta_0) ]$ inside the SSE partial derivative calculation?",
          "options": [
            "0",
            "1",
            "-1",
            "$-x_i$"
          ],
          "correctAnswers": [
            "-1"
          ],
          "explanation": "The derivative of $-\\beta_0$ with respect to $\\beta_0$ is $-1$. This negative sign is a common source of error in manual OLS derivation."
        },
        {
          "id": "q19",
          "type": "multiple",
          "prompt": "How does the 'Geometric' view of OLS help understand the model compared to a purely algebraic view?",
          "options": [
            "It visualizes the 'cost' as physical surface area",
            "It explains why the line is 'pulled' by far-away points",
            "It proves that the residual is always a positive number",
            "It helps identify the optimal line by looking for the minimum total area",
            "It shows that the vertical distance is the only way to measure error"
          ],
          "correctAnswers": [
            "It visualizes the 'cost' as physical surface area",
            "It explains why the line is 'pulled' by far-away points",
            "It helps identify the optimal line by looking for the minimum total area"
          ],
          "explanation": "The geometric view uses areas of squares to represent costs, providing intuition on outlier sensitivity and the goal of minimization.",
          "caption": "Geometric representation of squared residuals"
        },
        {
          "id": "q20",
          "type": "animation",
          "prompt": "As the animation sweeps the regression line away from the optimal position toward a single outlier, why does the 'total area' of the squares grow at an accelerating rate?",
          "options": [
            "Because the side length of every square increases proportionally with the slope change",
            "Because squaring the distance means the penalty for the outlier increases quadratically as it moves further from the line",
            "Because the number of data points increases as the line moves through the coordinate plane",
            "Because absolute distances are converted into a 'V-shaped' function which is harder to minimize"
          ],
          "correctAnswers": [
            "Because squaring the distance means the penalty for the outlier increases quadratically as it moves further from the line"
          ],
          "explanation": "As seen in the animation, when a point becomes an outlier (increasing its residual), the area of its associated square grows much faster than the distance itself ($e^2$).",
          "scene": "concept"
        }
      ]
    },
    {
      "examId": "unit3",
      "unitId": "unit3",
      "title": "Multiple Regression Mastery Exam",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a Multiple Linear Regression model with two predictors (X1 and X2), what does the regression 'line' actually become geometrically?",
          "options": [
            "A curved surface that bends to minimize residuals",
            "A flat 2D plane suspended in 3D space",
            "Two separate lines that never intersect",
            "A single point representing the average of all variables"
          ],
          "correctAnswers": [
            "A flat 2D plane suspended in 3D space"
          ],
          "explanation": "With two predictors and one outcome, the model defines a flat 2D plane. It remains 'linear' because the surface is not curved, even though it exists in three dimensions.",
          "caption": "A 3D visualization of a regression plane fitting a cloud of data points."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are requirements for the 'Intercept Trick' to work in matrix notation (Y = Xβ + ε)?",
          "options": [
            "The first column of the Design Matrix X must consist entirely of 1s",
            "The Parameter Vector β must include an extra element (β0) for the intercept",
            "The Target Vector Y must be transformed into logarithmic scale",
            "The number of rows in X must equal the number of parameters",
            "The Design Matrix must have dimensions N x (p+1)"
          ],
          "correctAnswers": [
            "The first column of the Design Matrix X must consist entirely of 1s",
            "The Parameter Vector β must include an extra element (β0) for the intercept",
            "The Design Matrix must have dimensions N x (p+1)"
          ],
          "explanation": "The 'Intercept Trick' allows the intercept to be estimated alongside other coefficients by prepending a column of 1s to the matrix, increasing the column count (p) by 1."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The 'ceteris paribus' condition in MLR allows us to interpret a coefficient as the effect of one predictor while holding all other predictors ____.",
          "options": [],
          "correctAnswers": [
            "constant",
            "fixed",
            "equal"
          ],
          "placeholder": "e.g., constant"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "Why is the OLS solution geometrically described as an 'Orthogonal Projection'?",
          "options": [
            "Because it minimizes the horizontal distance to the X-axis",
            "Because the shortest distance from the observed Y to the predictor plane is a perpendicular line",
            "Because the predictor vectors must be at 90-degree angles to each other",
            "Because the residuals are always parallel to the regression plane"
          ],
          "correctAnswers": [
            "Because the shortest distance from the observed Y to the predictor plane is a perpendicular line"
          ],
          "explanation": "OLS finds the point in the column space (the plane) closest to the actual data point Y; the shortest distance between a point and a plane is always the orthogonal (perpendicular) segment.",
          "caption": "Vector projection showing Y, Y-hat, and the orthogonal residual vector."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "A researcher has a categorical variable 'Season' with four levels: Spring, Summer, Fall, and Winter. To avoid the 'Dummy Variable Trap' in a standard regression, which of the following must be true?",
          "options": [
            "Only 3 dummy variables should be included in the model",
            "All 4 dummy variables should be included alongside the intercept",
            "One season must be chosen as the reference level and omitted from the dummies",
            "The intercept must be removed if all 4 dummy variables are used",
            "The categorical variable must be converted to a single continuous 1-4 scale"
          ],
          "correctAnswers": [
            "Only 3 dummy variables should be included in the model",
            "One season must be chosen as the reference level and omitted from the dummies",
            "The intercept must be removed if all 4 dummy variables are used"
          ],
          "explanation": "To avoid perfect multicollinearity (the Dummy Variable Trap), you need k-1 dummies if an intercept is present. Alternatively, you can use k dummies if you remove the intercept."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "In the matrix equation Y = Xβ + ε, the vector ____ represents the vertical distances between the observed data and the predicted hyperplane.",
          "options": [],
          "correctAnswers": [
            "epsilon",
            "ε",
            "error",
            "residuals"
          ],
          "placeholder": "Symbol or name"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "If you have a dataset with 500 observations and 10 independent variables, what are the dimensions of the Design Matrix X (including the intercept)?",
          "options": [
            "500 x 10",
            "10 x 500",
            "500 x 11",
            "501 x 10"
          ],
          "correctAnswers": [
            "500 x 11"
          ],
          "explanation": "The matrix has N rows (500) and p+1 columns (10 predictors + 1 for the intercept)."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "When interpreting a partial regression coefficient in a model with multiple predictors, which of the following statements are correct?",
          "options": [
            "It represents the unique contribution of that variable to the model",
            "It is always smaller than the simple correlation coefficient between Y and that variable",
            "It represents the change in Y for a one-unit change in X, holding other variables constant",
            "It can have a different sign (+/-) than the simple correlation coefficient",
            "It measures the total variance shared by all predictors"
          ],
          "correctAnswers": [
            "It represents the unique contribution of that variable to the model",
            "It represents the change in Y for a one-unit change in X, holding other variables constant",
            "It can have a different sign (+/-) than the simple correlation coefficient"
          ],
          "explanation": "Partial coefficients isolate the unique effect. This can lead to 'Simpson's Paradox' or suppressor effects where the sign changes or the magnitude increases compared to a simple model."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "When using a dummy variable for 'Gender' (0=Male, 1=Female) in a model for Salary, the coefficient for Female represents the ____ in the mean salary compared to Males.",
          "options": [],
          "correctAnswers": [
            "difference",
            "change",
            "offset",
            "shift"
          ],
          "placeholder": "e.g., difference"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "What does the 'Hat Matrix' (H) do in the context of the geometry of OLS?",
          "options": [
            "It calculates the standard error of the coefficients",
            "It projects the target vector Y onto the column space of X",
            "It transforms non-linear data into a linear format",
            "It removes outliers from the design matrix"
          ],
          "correctAnswers": [
            "It projects the target vector Y onto the column space of X"
          ],
          "explanation": "The Hat Matrix is the projection matrix that maps the observed Y values to the predicted values (Y-hat), effectively 'putting a hat on Y'."
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "Which of the following are components of the Matrix OLS Equation Y = Xβ + ε?",
          "options": [
            "Y: A vector of N observations",
            "X: An N x (p+1) Design Matrix",
            "β: A vector of p coefficients",
            "ε: A vector of N residuals",
            "H: The Hat Matrix"
          ],
          "correctAnswers": [
            "Y: A vector of N observations",
            "X: An N x (p+1) Design Matrix",
            "ε: A vector of N residuals"
          ],
          "explanation": "While H and β are part of the broader framework, the specific 3-term OLS equation is Y (target), Xβ (model), and ε (error). Note: β actually has p+1 elements including the intercept."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "The total volume of the 'Column Space' of X contains all possible ____ combinations of the predictor variables.",
          "options": [],
          "correctAnswers": [
            "linear"
          ],
          "placeholder": "Type of combination"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "If X1 and X2 are perfectly correlated (collinear), what happens to the matrix (XᵀX)?",
          "options": [
            "It becomes a diagonal matrix",
            "It becomes non-invertible (singular)",
            "Its values all double",
            "It becomes the identity matrix"
          ],
          "correctAnswers": [
            "It becomes non-invertible (singular)"
          ],
          "explanation": "Perfect collinearity means the columns of X are not linearly independent, which makes the XᵀX matrix singular. This prevents the calculation of the OLS solution via the Normal Equation."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "If we add a suppressor variable to a regression model, what might happen to the original predictor's coefficient?",
          "options": [
            "The coefficient's magnitude could increase",
            "The coefficient's sign could flip from positive to negative",
            "The coefficient will always drop to exactly zero",
            "The statistical significance of the predictor might increase",
            "The coefficient will stay exactly the same"
          ],
          "correctAnswers": [
            "The coefficient's magnitude could increase",
            "The coefficient's sign could flip from positive to negative",
            "The statistical significance of the predictor might increase"
          ],
          "explanation": "Suppressor variables can 'clean up' the variance in other predictors, leading to larger, more significant, or even sign-flipped coefficients compared to simple correlations."
        },
        {
          "id": "q15",
          "type": "fill",
          "prompt": "The mathematical operation that 'puts a hat on Y' is the ____ matrix.",
          "options": [],
          "correctAnswers": [
            "Hat",
            "Projection"
          ],
          "placeholder": "Name of matrix"
        },
        {
          "id": "q16",
          "type": "single",
          "prompt": "In N-dimensional space, a 'Hyperplane' is best described as:",
          "options": [
            "A multi-dimensional curve that passes through every data point",
            "A 'flat' mathematical object with one fewer dimension than the space it inhabits",
            "The collection of all points where the error is exactly zero",
            "A spherical boundary that encloses the data"
          ],
          "correctAnswers": [
            "A 'flat' mathematical object with one fewer dimension than the space it inhabits"
          ],
          "explanation": "A hyperplane is the generalization of a line (1D) in a 2D space or a plane (2D) in a 3D space to higher dimensions, maintaining the property of being 'flat' (linear)."
        },
        {
          "id": "q17",
          "type": "multiple",
          "prompt": "Which statements are true regarding the interpretation of the intercept (β0) in a model with dummy variables?",
          "options": [
            "It represents the predicted value of Y when all continuous predictors are zero and we are in the reference category",
            "It is the average of all possible outcomes",
            "It shifts vertically when we change the reference level",
            "It is always zero if we use the 'Intercept Trick'",
            "It represents the mean of the reference group if no continuous variables are present"
          ],
          "correctAnswers": [
            "It represents the predicted value of Y when all continuous predictors are zero and we are in the reference category",
            "It shifts vertically when we change the reference level",
            "It represents the mean of the reference group if no continuous variables are present"
          ],
          "explanation": "The intercept is the baseline. When categories are involved, it specifically represents the baseline for the omitted reference group."
        },
        {
          "id": "q18",
          "type": "animation",
          "prompt": "Based on the simulation of adding a second, highly correlated variable (X2) to an existing model (Y ~ X1), why does the confidence interval for the first coefficient (β1) expand so significantly?",
          "options": [
            "Because the total variance of the target variable Y increases when we add more predictors to the model.",
            "Because the 'floor' or plane defined by X1 and X2 becomes unstable, as there is little unique information to anchor its orientation.",
            "Because the model is forced to switch from a linear plane to a non-linear curved surface to accommodate both variables.",
            "Because the intercept trick fails when two columns in the design matrix have different mean values."
          ],
          "correctAnswers": [
            "Because the 'floor' or plane defined by X1 and X2 becomes unstable, as there is little unique information to anchor its orientation."
          ],
          "explanation": "When predictors are highly correlated (collinear), they define nearly the same line in space rather than a sturdy plane. This makes the resulting 'projection' extremely sensitive to small changes in data, leading to high variance in coefficient estimates.",
          "scene": "concept"
        }
      ]
    },
    {
      "examId": "unit4",
      "unitId": "unit4",
      "title": "Model Health Diagnostic Exam",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "If a residual plot displays a clear 'U-shaped' pattern rather than a random cloud, what is the most likely diagnostic conclusion?",
          "options": [
            "The model is suffering from heteroscedasticity.",
            "The relationship between the variables is likely non-linear, such as quadratic.",
            "The model has too many predictors for the amount of data available.",
            "The global F-test will automatically be non-significant."
          ],
          "correctAnswers": [
            "The relationship between the variables is likely non-linear, such as quadratic."
          ],
          "explanation": "A curved pattern in residuals indicates that the linear model is systematically wrong in its functional form, often missing a polynomial term (like x-squared).",
          "caption": "A residual plot showing a non-linear U-shaped pattern."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are consequences of heteroscedasticity in a linear regression model? Select all that apply.",
          "options": [
            "The estimated slope coefficients (Betas) become biased and incorrect.",
            "The standard errors of the coefficients are calculated incorrectly.",
            "The p-values for the individual t-tests become unreliable.",
            "The Gauss-Markov theorem conditions are violated.",
            "The R-squared value will always drop to near zero."
          ],
          "correctAnswers": [
            "The standard errors of the coefficients are calculated incorrectly.",
            "The p-values for the individual t-tests become unreliable.",
            "The Gauss-Markov theorem conditions are violated."
          ],
          "explanation": "Heteroscedasticity doesn't bias the coefficients themselves, but it breaks the assumption of constant variance, leading to incorrect uncertainty estimates (Standard Errors) and false significance (p-values)."
        },
        {
          "id": "q3",
          "type": "single",
          "prompt": "What is the specific Null Hypothesis (H0) tested by the Global F-test in a multiple regression model?",
          "options": [
            "The intercept is equal to the average of Y.",
            "At least one of the slope coefficients is equal to zero.",
            "All slope coefficients are simultaneously equal to zero.",
            "The R-squared value is exactly 1.0."
          ],
          "correctAnswers": [
            "All slope coefficients are simultaneously equal to zero."
          ],
          "explanation": "The F-test is an 'omnibus' test that checks if any of the predictors have power; its null hypothesis is that every single slope is zero (the 'mean-only' model)."
        },
        {
          "id": "q4",
          "type": "multiple",
          "prompt": "When interpreting a p-value of 0.03 for a regression coefficient, which statements are statistically accurate?",
          "options": [
            "There is a 3% chance that the null hypothesis is true.",
            "If the null hypothesis were true, there is a 3% chance of seeing an effect this large or larger by luck.",
            "The variable is guaranteed to be practically important in a real-world context.",
            "We have sufficient evidence to reject the null hypothesis at the 0.05 alpha level.",
            "The model is 97% accurate at predicting the outcome."
          ],
          "correctAnswers": [
            "If the null hypothesis were true, there is a 3% chance of seeing an effect this large or larger by luck.",
            "We have sufficient evidence to reject the null hypothesis at the 0.05 alpha level."
          ],
          "explanation": "A p-value measures the probability of data given the null, not the probability of the null itself. It also doesn't indicate practical importance or model accuracy."
        },
        {
          "id": "q5",
          "type": "single",
          "prompt": "A researcher adds 10 random, irrelevant variables to a model. What will most likely happen to the R-squared and the Adjusted R-squared?",
          "options": [
            "Both will stay exactly the same.",
            "R-squared will increase, while Adjusted R-squared will likely decrease.",
            "R-squared will decrease, while Adjusted R-squared will increase.",
            "Both are guaranteed to increase because more data is always better."
          ],
          "correctAnswers": [
            "R-squared will increase, while Adjusted R-squared will likely decrease."
          ],
          "explanation": "R-squared always increases (or stays the same) when variables are added, but Adjusted R-squared penalizes the addition of predictors that do not improve the model enough to offset the loss in degrees of freedom."
        },
        {
          "id": "q6",
          "type": "multiple",
          "prompt": "Which visual features in a residual plot would suggest that the OLS assumptions are being met?",
          "options": [
            "A clear funnel shape expanding to the right.",
            "Points randomly scattered above and below the zero line.",
            "A consistent vertical spread (constant variance) across all x-values.",
            "No discernible geometric patterns or curves.",
            "A strong linear trend passing through the residuals."
          ],
          "correctAnswers": [
            "Points randomly scattered above and below the zero line.",
            "A consistent vertical spread (constant variance) across all x-values.",
            "No discernible geometric patterns or curves."
          ],
          "explanation": "A 'healthy' model produces residuals that look like white noise—no patterns, no curves, and no changing variance (homoscedasticity)."
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "Why is the Global F-test considered the 'gatekeeper' of regression analysis?",
          "options": [
            "It determines if the residuals are normally distributed.",
            "It checks if the intercept is significantly different from the mean.",
            "If the F-test is not significant, individual t-tests should not be interpreted.",
            "It is the only test that can detect non-linearity in the data."
          ],
          "correctAnswers": [
            "If the F-test is not significant, individual t-tests should not be interpreted."
          ],
          "explanation": "If the model as a whole is not better than a random guess (failed F-test), any 'significant' individual t-tests are likely spurious results or noise."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "Which factors contribute to a smaller (more precise) Standard Error for a regression coefficient?",
          "options": [
            "A larger sample size (n).",
            "Higher residual variance (noise).",
            "Lower residual variance (noise).",
            "A smaller number of predictors.",
            "A higher p-value."
          ],
          "correctAnswers": [
            "A larger sample size (n).",
            "Lower residual variance (noise)."
          ],
          "explanation": "Standard Error shrinks when you have more data (n) or less unexplained noise (residual variance) in the model."
        },
        {
          "id": "q9",
          "type": "single",
          "prompt": "What does a T-statistic of 5.0 generally communicate about a coefficient estimate?",
          "options": [
            "The slope is 5 units steep.",
            "The estimate is 5 standard errors away from the null hypothesis of zero.",
            "There is a 5% chance the effect is real.",
            "The model explains 5% of the total variance."
          ],
          "correctAnswers": [
            "The estimate is 5 standard errors away from the null hypothesis of zero."
          ],
          "explanation": "The T-statistic is a signal-to-noise ratio representing the distance of the estimate from zero in units of standard error."
        },
        {
          "id": "q10",
          "type": "multiple",
          "prompt": "Why is it dangerous to rely solely on R-squared to judge model health?",
          "options": [
            "R-squared can be high even if the model violates linearity assumptions.",
            "R-squared does not account for the number of predictors used.",
            "A high R-squared guarantees that the p-values are reliable.",
            "R-squared does not detect heteroscedasticity.",
            "R-squared measures the bias of the coefficients."
          ],
          "correctAnswers": [
            "R-squared can be high even if the model violates linearity assumptions.",
            "R-squared does not account for the number of predictors used.",
            "R-squared does not detect heteroscedasticity."
          ],
          "explanation": "R-squared is a measure of fit, not validity. A model can fit 'well' (high R-squared) while still being fundamentally flawed due to non-linearity or non-constant variance."
        },
        {
          "id": "q11",
          "type": "single",
          "prompt": "If you have a very large sample size (e.g., n=1,000,000), what is a common risk when interpreting p-values?",
          "options": [
            "P-values will become impossible to calculate.",
            "Even tiny, practically useless effects may become 'statistically significant'.",
            "The null hypothesis becomes more likely to be true.",
            "The F-test will always fail regardless of the data."
          ],
          "correctAnswers": [
            "Even tiny, practically useless effects may become 'statistically significant'."
          ],
          "explanation": "With huge samples, the standard error becomes so small that almost any tiny deviation from zero results in a low p-value, even if the effect size is irrelevant in practice."
        },
        {
          "id": "q12",
          "type": "multiple",
          "prompt": "Which of the following would be an appropriate 'remedy' to investigate if you detect a funnel shape in your residuals?",
          "options": [
            "Applying a log transformation to the dependent variable.",
            "Adding more irrelevant variables to increase R-squared.",
            "Checking for a missing interaction term or predictor.",
            "Using Weighted Least Squares (WLS).",
            "Ignoring it, as it doesn't affect coefficient bias."
          ],
          "correctAnswers": [
            "Applying a log transformation to the dependent variable.",
            "Checking for a missing interaction term or predictor.",
            "Using Weighted Least Squares (WLS)."
          ],
          "explanation": "Transformations and specialized regression techniques like WLS are standard ways to address heteroscedasticity."
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "In the Global F-test, what does 'Mean Square Regression' (MSR) represent?",
          "options": [
            "The average amount of error per data point.",
            "The total variance in the dependent variable.",
            "The explained variance adjusted for the number of predictors.",
            "The probability that the null hypothesis is false."
          ],
          "correctAnswers": [
            "The explained variance adjusted for the number of predictors."
          ],
          "explanation": "MSR is the Sum of Squares Regression (SSR) divided by the degrees of freedom (k), serving as a 'fairness' adjustment for model complexity."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "Which statements about residuals in an Ordinary Least Squares (OLS) model are true?",
          "options": [
            "The sum of residuals is always zero.",
            "A positive residual means the model under-predicted the actual value.",
            "A negative residual means the actual value was higher than predicted.",
            "Residuals represent the 'information' the model could not explain.",
            "The standard deviation of residuals is always 1.0."
          ],
          "correctAnswers": [
            "The sum of residuals is always zero.",
            "A positive residual means the model under-predicted the actual value.",
            "Residuals represent the 'information' the model could not explain."
          ],
          "explanation": "In OLS, residuals sum to zero. Since e = y - ŷ, a positive value means y > ŷ (under-prediction)."
        },
        {
          "id": "q15",
          "type": "single",
          "prompt": "What is the primary visual indicator of 'Influential Points' in a diagnostic context?",
          "options": [
            "Points that are perfectly on the regression line.",
            "A group of points forming a vertical line in the residuals.",
            "Individual points far from the zero line that significantly change the slope.",
            "Points clustered at the origin (0,0)."
          ],
          "correctAnswers": [
            "Individual points far from the zero line that significantly change the slope."
          ],
          "explanation": "Influential points are outliers that have enough 'leverage' to pull the regression line towards them, distorting the model for the rest of the data.",
          "caption": "Scatter plot showing an influential outlier."
        },
        {
          "id": "q16",
          "type": "single",
          "prompt": "What does a p-value of 0.85 for a specific coefficient suggest?",
          "options": [
            "The variable is highly significant.",
            "The variable explains 85% of the outcome.",
            "We fail to reject the null hypothesis; the variable's effect is indistinguishable from zero.",
            "The model is 85% likely to be the 'true' model."
          ],
          "correctAnswers": [
            "We fail to reject the null hypothesis; the variable's effect is indistinguishable from zero."
          ],
          "explanation": "A high p-value means the observed data is very likely under the null hypothesis (Beta=0), meaning we lack evidence of a relationship."
        },
        {
          "id": "q17",
          "type": "single",
          "prompt": "When comparing two models with a different number of predictors, which metric is most appropriate for a fair comparison?",
          "options": [
            "Standard R-squared",
            "Adjusted R-squared",
            "The sum of residuals",
            "The intercept value"
          ],
          "correctAnswers": [
            "Adjusted R-squared"
          ],
          "explanation": "Adjusted R-squared accounts for the number of predictors, making it the correct metric for comparing models of different complexities."
        },
        {
          "id": "q18",
          "type": "single",
          "prompt": "How does the F-test differ from a T-test in regression?",
          "options": [
            "The T-test is for the whole model; the F-test is for one variable.",
            "The F-test assesses joint significance; the T-test assesses individual significance.",
            "The F-test measures bias; the T-test measures variance.",
            "The T-test is only used when the sample size is under 30."
          ],
          "correctAnswers": [
            "The F-test assesses joint significance; the T-test assesses individual significance."
          ],
          "explanation": "T-tests evaluate individual predictors, while the F-test evaluates the group of predictors collectively."
        },
        {
          "id": "q19",
          "type": "single",
          "prompt": "If your F-test p-value is 0.0001 but all your individual T-test p-values are above 0.10, what is a likely cause?",
          "options": [
            "The model has no predictive power.",
            "Multicollinearity (predictors are highly correlated with each other).",
            "The sample size is too large.",
            "The residuals are perfectly homoscedastic."
          ],
          "correctAnswers": [
            "Multicollinearity (predictors are highly correlated with each other)."
          ],
          "explanation": "Multicollinearity can cause the F-test to show the group is significant, even while individual variables struggle to show unique significance because they 'share' the explanatory power."
        },
        {
          "id": "q20",
          "type": "animation",
          "prompt": "Watch the residual plot evolve as the data points follow a specific trend. Based on the changing behavior of the residuals, which of the following best explains why the model's reliability is compromised?",
          "options": [
            "The increasing vertical spread of the residuals as the fitted values increase indicates that the standard errors of the coefficients are no longer constant and reliable.",
            "The curvature in the residuals suggests that the model has successfully captured all linear information, leaving only random noise behind.",
            "The clustering of residuals around the zero line indicates that the model is biased because it consistently over-predicts for middle-range values.",
            "The horizontal band of residuals proves that the variance is changing, which violates the fundamental Gauss-Markov assumption of linearity."
          ],
          "correctAnswers": [
            "The increasing vertical spread of the residuals as the fitted values increase indicates that the standard errors of the coefficients are no longer constant and reliable."
          ],
          "explanation": "The simulation shows a 'funnel' or 'megaphone' shape, which is the hallmark of heteroscedasticity. This phenomenon means the uncertainty (variance) is not uniform across all levels of prediction, which invalidates standard errors and p-values even if the line itself isn't biased.",
          "scene": "concept"
        }
      ]
    },
    {
      "examId": "unit5",
      "unitId": "unit5",
      "title": "Unit 5 Comprehensive Assessment: Interpreting Software Summaries",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "You are reviewing a statsmodels summary table and notice a high coefficient for a predictor, but its T-statistic is 0.45. What is the most likely conclusion?",
          "options": [
            "The variable has a massive impact on the dependent variable.",
            "The relationship is statistically significant at the 95% level.",
            "The 'noise' (Standard Error) is large relative to the 'signal' (Estimate).",
            "The R-squared of the model must be near 1.0."
          ],
          "correctAnswers": [
            "The 'noise' (Standard Error) is large relative to the 'signal' (Estimate)."
          ],
          "explanation": "The T-statistic is the ratio of the Estimate to the Standard Error. A T-stat near zero (like 0.45) indicates that the uncertainty (noise) is large enough to drown out the estimated effect (signal)."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are true regarding the 95% Confidence Interval (CI) in a regression output?",
          "options": [
            "It identifies the range where 95% of individual data points are located.",
            "If the interval includes zero, the effect is generally considered not statistically significant.",
            "A narrower interval indicates a more precise estimate of the slope.",
            "The interval width is primarily determined by the R-squared value.",
            "It represents the range of plausible values for the true population parameter."
          ],
          "correctAnswers": [
            "If the interval includes zero, the effect is generally considered not statistically significant.",
            "A narrower interval indicates a more precise estimate of the slope.",
            "It represents the range of plausible values for the true population parameter."
          ],
          "explanation": "The CI refers to the estimate of the parameter, not the distribution of individual data points. A zero-crossing suggests the effect could be null, and narrowness reflects precision via lower Standard Errors."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "In Multiple Linear Regression, the ____ R-squared is the preferred metric because it penalizes the addition of predictors that do not improve the model's explanatory power.",
          "options": [],
          "correctAnswers": [
            "Adjusted",
            "adj",
            "adjusted r-squared"
          ],
          "placeholder": "Enter metric name"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "When comparing two nested models using AIC (Akaike Information Criterion), Model A has an AIC of 450 and Model B has an AIC of 435. Which model is preferred?",
          "options": [
            "Model A, because a higher AIC indicates more information is captured.",
            "Model B, because a lower AIC indicates less information loss and better efficiency.",
            "Neither, AIC cannot be used to compare models with different numbers of predictors.",
            "Model B, but only if its R-squared is also higher than Model A's."
          ],
          "correctAnswers": [
            "Model B, because a lower AIC indicates less information loss and better efficiency."
          ],
          "explanation": "AIC follows the 'Lower is Better' rule. A lower score represents a more efficient balance between model fit and complexity (fewer parameters)."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "In the R 'tidymodels' ecosystem, specifically using the 'broom' package, which functions are used to turn model objects into clean data frames?",
          "options": [
            "tidy()",
            "glance()",
            "summary()",
            "fit()",
            "extract()"
          ],
          "correctAnswers": [
            "tidy()",
            "glance()"
          ],
          "explanation": "In broom, tidy() extracts coefficient-level data (estimates, p-values), while glance() extracts model-level statistics (AIC, BIC, R-squared) into a single-row tibble."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "To programmatically access the p-values of a fitted statsmodels object named 'results' in Python, a developer should use the attribute results.____.",
          "options": [],
          "correctAnswers": [
            "pvalues"
          ],
          "placeholder": "attribute_name"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "You add a random variable, 'Daily Rainfall in London', to a model predicting 'Local Bakery Sales in Tokyo'. What will happen to the Multiple R-squared?",
          "options": [
            "It will definitely decrease.",
            "It will stay exactly the same.",
            "It will likely increase slightly due to random chance alignment.",
            "It will drop to zero because the variables are unrelated."
          ],
          "correctAnswers": [
            "It will likely increase slightly due to random chance alignment."
          ],
          "explanation": "Multiple R-squared never decreases when variables are added; even noise variables will 'soak up' a tiny amount of variance by pure coincidence, which is why Adjusted R-squared is used to detect this."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "Which of the following are considered 'The Big Three' metrics in a regression coefficient table?",
          "options": [
            "Estimate (Coefficient)",
            "Standard Error",
            "T-statistic",
            "AIC",
            "Log-Likelihood"
          ],
          "correctAnswers": [
            "Estimate (Coefficient)",
            "Standard Error",
            "T-statistic"
          ],
          "explanation": "The 'Big Three' represent the core logic of individual predictor testing: the slope, its uncertainty, and the resulting signal-to-noise ratio."
        },
        {
          "id": "q9",
          "type": "single",
          "prompt": "What is the primary conceptual difference between AIC and BIC in model selection?",
          "options": [
            "AIC is for R-squared; BIC is for Adjusted R-squared.",
            "BIC applies a harsher penalty for additional parameters as the sample size increases.",
            "AIC is used only for linear models, while BIC is used for non-linear models.",
            "BIC prefers more complex models than AIC does."
          ],
          "correctAnswers": [
            "BIC applies a harsher penalty for additional parameters as the sample size increases."
          ],
          "explanation": "While both penalize complexity, BIC's penalty is tied to the log of the sample size (n), making it more conservative and likely to choose simpler models as data volume grows."
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "Because the denominator grows with the number of trials while the gap itself grows more slowly, the two measure different things",
          "options": [
            "A",
            "B",
            "C",
            "D"
          ],
          "correctAnswers": [
            "A"
          ],
          "explanation": "test"
        }
      ]
    },
    {
      "examId": "unit6",
      "unitId": "unit6",
      "title": "Complexity and Interaction Assessment",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "In a regression model predicting housing prices using both 'Number of Rooms' and 'Total Square Footage', you observe that both variables are individually insignificant despite a high R-squared. What is the most likely geometric explanation?",
          "options": [
            "The predictor vectors are orthogonal, causing the projection to fail.",
            "The predictor vectors are nearly parallel, making the 'best fit' plane unstable.",
            "The target vector is perpendicular to the plane formed by the predictors.",
            "The predictors have different units, which prevents the matrix from being inverted."
          ],
          "correctAnswers": [
            "The predictor vectors are nearly parallel, making the 'best fit' plane unstable."
          ],
          "explanation": "When predictors are highly correlated (collinear), their vectors are nearly parallel. This creates a 'wobbly' plane where small data changes drastically shift coefficient estimates, leading to high standard errors and loss of individual significance.",
          "caption": "3D visualization of multicollinearity showing two nearly parallel predictor vectors and an unstable regression plane."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "A researcher calculates VIF for a model and finds several variables above 10. Which of the following are appropriate next steps?",
          "options": [
            "Remove all variables with a VIF above 5 simultaneously and rerun the model.",
            "Remove the variable with the highest VIF and recalculate VIFs for the remaining set.",
            "Combine the redundant variables into a single index or average.",
            "Ignore the VIF if the goal of the model is purely predictive and not interpretative.",
            "Increase the sample size to automatically reduce the VIF values."
          ],
          "correctAnswers": [
            "Remove the variable with the highest VIF and recalculate VIFs for the remaining set.",
            "Combine the redundant variables into a single index or average.",
            "Ignore the VIF if the goal of the model is purely predictive and not interpretative."
          ],
          "explanation": "VIF removal should be iterative (one by one) because removing one can lower others. Combining variables is a valid way to preserve information. Finally, multicollinearity affects coefficient stability but not necessarily prediction accuracy."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The Variance Inflation Factor (VIF) for a specific predictor is calculated using the formula 1 / (1 - ____), where the missing term represents the strength of the relationship between that predictor and all other predictors.",
          "options": [],
          "correctAnswers": [
            "R-squared",
            "R^2",
            "R squared"
          ],
          "placeholder": "Enter the statistic"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "You are modeling the effect of 'Ad Spend' on 'Revenue' and suspect a synergy between 'Radio' and 'TV' ads. In an interaction model, what does a non-zero coefficient for the product term (Radio * TV) indicate?",
          "options": [
            "The effect of Radio ads is constant across all levels of TV ad spend.",
            "The total revenue is simply the sum of Radio and TV effects.",
            "The slope of the Radio effect changes depending on the amount spent on TV.",
            "Radio and TV ads are perfectly correlated."
          ],
          "correctAnswers": [
            "The slope of the Radio effect changes depending on the amount spent on TV."
          ],
          "explanation": "An interaction term implies that the relationship between one predictor and the outcome is conditional on the value of another predictor, resulting in non-parallel slopes in a visualization.",
          "caption": "Interaction plot showing non-parallel lines for different levels of a second variable."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "According to the Hierarchy Principle, if you include an interaction term (X1 * X2) in your regression model, which of the following must also be included even if their p-values are high?",
          "options": [
            "The main effect X1",
            "The main effect X2",
            "The intercept term",
            "The squared term X1^2",
            "The correlation coefficient r"
          ],
          "correctAnswers": [
            "The main effect X1",
            "The main effect X2",
            "The intercept term"
          ],
          "explanation": "The Hierarchy Principle dictates that main effects (X1 and X2) and the intercept must remain in the model to ensure the interaction is interpretable and the model is mathematically sound."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "If a regression equation is Y = 5 + 2(X1) + 3(X2) + 0.5(X1*X2), what is the effective slope of X1 when X2 is equal to 10? Answer: ____",
          "options": [],
          "correctAnswers": [
            "7"
          ],
          "placeholder": "Calculate the slope"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "Why is 'Mean-Centering' recommended before creating interaction terms in a regression model?",
          "options": [
            "It eliminates the data-driven multicollinearity between unrelated variables.",
            "It makes the 'main effect' coefficients represent the effect at the average value of the other predictor.",
            "It changes the distribution of the data from skewed to normal.",
            "It increases the R-squared of the model significantly."
          ],
          "correctAnswers": [
            "It makes the 'main effect' coefficients represent the effect at the average value of the other predictor."
          ],
          "explanation": "Mean-centering shifts the interpretation of the main effects. Without centering, the coefficient of X1 is its effect when X2 is zero (which might be an impossible or unhelpful value). Centered, it represents the effect of X1 when X2 is at its average."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "Which of the following are consequences of 'Structural Multicollinearity' created by interaction terms?",
          "options": [
            "Increased standard errors for the main effect coefficients.",
            "A decrease in the overall predictive accuracy (R-squared) of the model.",
            "Coefficients that may have counter-intuitive signs (e.g., negative instead of positive).",
            "A singular matrix error that prevents the model from running entirely.",
            "High VIF scores for the main effects and the interaction term."
          ],
          "correctAnswers": [
            "Increased standard errors for the main effect coefficients.",
            "Coefficients that may have counter-intuitive signs (e.g., negative instead of positive).",
            "High VIF scores for the main effects and the interaction term."
          ],
          "explanation": "Structural multicollinearity is a byproduct of the math (X and X*Z are naturally related). It inflates VIF and standard errors, making main effects 'wobbly' and sometimes giving them non-sensical signs unless centering is used."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "If two predictor vectors are perfectly ____ (at a 90-degree angle), the multicollinearity is zero and the VIF for both variables will be 1.0.",
          "options": [],
          "correctAnswers": [
            "orthogonal",
            "perpendicular",
            "independent"
          ],
          "placeholder": "Geometric term"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "In the 'Two Drivers, One Steering Wheel' analogy, what represents the 'Coefficient' in a regression model?",
          "options": [
            "The direction the car is traveling.",
            "The total force applied to the wheel.",
            "The specific credit or influence assigned to one driver's hand.",
            "The resistance of the road against the tires."
          ],
          "correctAnswers": [
            "The specific credit or influence assigned to one driver's hand."
          ],
          "explanation": "The analogy illustrates that if both drivers (variables) move the wheel (Y) exactly the same way, the model cannot decide how much 'credit' (coefficient) to give to each individual variable."
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "How does 'Centering' differ from 'Standardizing' (Z-scores) in the context of interaction terms?",
          "options": [
            "Centering only shifts the mean; Standardizing shifts the mean and scales by the standard deviation.",
            "Standardizing removes all multicollinearity, while centering only removes structural multicollinearity.",
            "Centering preserves the original units of measurement, making it easier for business communication.",
            "Standardizing is required for interaction terms, while centering is optional.",
            "Centering always results in a mean of zero, while standardizing results in a mean of zero and a standard deviation of one."
          ],
          "correctAnswers": [
            "Centering only shifts the mean; Standardizing shifts the mean and scales by the standard deviation.",
            "Centering preserves the original units of measurement, making it easier for business communication.",
            "Centering always results in a mean of zero, while standardizing results in a mean of zero and a standard deviation of one."
          ],
          "explanation": "Centering is a linear shift that simplifies interpretation without losing the context of the original units (like dollars or years), whereas standardization changes the scale to units of standard deviation."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "Multicollinearity primarily inflates the ____ of the coefficient estimates, making it difficult to achieve statistical significance.",
          "options": [],
          "correctAnswers": [
            "standard error",
            "variance",
            "standard errors"
          ],
          "placeholder": "Statistical term"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "What happens to the VIF of a variable if the R-squared of the auxiliary regression (predicting that variable using others) increases from 0.5 to 0.8?",
          "options": [
            "The VIF doubles from 2 to 4.",
            "The VIF increases from 2 to 5.",
            "The VIF decreases from 2 to 1.25.",
            "The VIF remains unchanged because VIF is independent of R-squared."
          ],
          "correctAnswers": [
            "The VIF increases from 2 to 5."
          ],
          "explanation": "VIF = 1 / (1 - R^2). At 0.5, VIF = 1/0.5 = 2. At 0.8, VIF = 1/0.2 = 5."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "Which scenarios are examples of 'it depends' logic that would best be modeled by an interaction term?",
          "options": [
            "The effectiveness of a medication depends on the patient's body weight.",
            "The price of a house is the sum of the land value and the construction cost.",
            "The impact of education on salary is higher for people with 20 years of experience than for those with 2 years.",
            "Total calories consumed is the sum of calories from proteins, fats, and carbs.",
            "A website's conversion rate increases when both a discount and a countdown timer are present, more so than the sum of their individual effects."
          ],
          "correctAnswers": [
            "The effectiveness of a medication depends on the patient's body weight.",
            "The impact of education on salary is higher for people with 20 years of experience than for those with 2 years.",
            "A website's conversion rate increases when both a discount and a countdown timer are present, more so than the sum of their individual effects."
          ],
          "explanation": "Interactions model synergistic or conditional effects where variables 'talk' to each other, rather than simply adding up independently."
        },
        {
          "id": "q15",
          "type": "fill",
          "prompt": "If you drop a high-VIF variable from a model, the R-squared of the model will usually ____ (increase/decrease/stay nearly the same).",
          "options": [],
          "correctAnswers": [
            "stay nearly the same",
            "stay the same",
            "decrease slightly"
          ],
          "placeholder": "Effect on R-squared"
        },
        {
          "id": "q16",
          "type": "single",
          "prompt": "You add an interaction term to a model. The R-squared increases, but the individual p-values for the main effects both become 0.45. What should you do?",
          "options": [
            "Remove the main effects since they are no longer statistically significant.",
            "Keep the main effects to adhere to the Hierarchy Principle.",
            "Remove the interaction term because it 'broke' the main effects.",
            "Standardize the target variable Y to fix the p-values."
          ],
          "correctAnswers": [
            "Keep the main effects to adhere to the Hierarchy Principle."
          ],
          "explanation": "The Hierarchy Principle requires main effects to be present when an interaction is present. Their high p-values are likely due to structural multicollinearity, but they are necessary for the model's logical structure."
        },
        {
          "id": "q17",
          "type": "multiple",
          "prompt": "In a model with a continuous variable (Experience) and a categorical variable (Gender, where Male=1), an interaction term (Experience * Gender) allows for which of the following?",
          "options": [
            "Different intercepts for Males and Females.",
            "Different slopes for Males and Females.",
            "A single slope that represents the average of both groups.",
            "The ability to see if the 'return on experience' differs by gender.",
            "The elimination of all gender-based bias in the model."
          ],
          "correctAnswers": [
            "Different slopes for Males and Females.",
            "The ability to see if the 'return on experience' differs by gender."
          ],
          "explanation": "An interaction with a dummy variable specifically allows the slope of the continuous variable to change across categories. Note: Different intercepts are provided by the main effect of Gender, not the interaction term itself.",
          "caption": "Plot showing varying slopes for different categorical groups."
        },
        {
          "id": "q18",
          "type": "single",
          "prompt": "Using the partial derivative approach for the model Y = β0 + β1X1 + β2X2 + β3(X1X2), what is the formula for the 'instantaneous' effect of X2?",
          "options": [
            "β2 + β3",
            "β2 + β3X1",
            "β1 + β3X2",
            "β2 + β1X1"
          ],
          "correctAnswers": [
            "β2 + β3X1"
          ],
          "explanation": "Taking the partial derivative of Y with respect to X2 yields β2 + β3X1, meaning the slope of X2 depends on the value of X1."
        },
        {
          "id": "q19",
          "type": "multiple",
          "prompt": "When is it acceptable to keep a high-VIF variable in a model?",
          "options": [
            "When the variable is a control variable essential to the research question.",
            "When the high VIF is 'structural' (due to interaction terms) and has been addressed by centering.",
            "When the model is only being used for prediction and individual coefficients aren't interpreted.",
            "When the VIF is exactly 11.0 and the sample size is small.",
            "When the p-value of the high-VIF variable is already 0.001."
          ],
          "correctAnswers": [
            "When the variable is a control variable essential to the research question.",
            "When the high VIF is 'structural' (due to interaction terms) and has been addressed by centering.",
            "When the model is only being used for prediction and individual coefficients aren't interpreted."
          ],
          "explanation": "High VIF is not a 'death sentence' if the goal is prediction, if it's a known byproduct of interactions, or if the variable is theoretically mandatory for the study."
        },
        {
          "id": "q20",
          "type": "animation",
          "prompt": "As the correlation between the two independent variables increases, why does the uncertainty (standard error) of the coefficients grow so significantly?",
          "options": [
            "Because the model loses total variance, making it impossible to calculate a mean.",
            "Because the model cannot distinguish which variable is responsible for changes in Y when they move in unison.",
            "Because the interaction term between the variables becomes perfectly zero at high correlation levels.",
            "Because the intercept must shift to the origin, forcing the slopes to compensate by increasing."
          ],
          "correctAnswers": [
            "Because the model cannot distinguish which variable is responsible for changes in Y when they move in unison."
          ],
          "explanation": "The simulation shows that as correlation increases, the individual 'credit' assigned to each variable fluctuates wildly. This is the 'Two Drivers, One Steering Wheel' analogy: the math cannot isolate the effect of one hand if both move identically.",
          "scene": "scatter-cloud"
        }
      ]
    },
    {
      "examId": "unit7",
      "unitId": "unit7",
      "title": "Unit 7 Comprehensive Exam: Robustness and Regularization",
      "questions": [
        {
          "id": "q1",
          "type": "single",
          "prompt": "When observing a high-degree polynomial that passes through every training data point but fails to predict new observations accurately, what is the model 'hallucinating'?",
          "options": [
            "The population mean",
            "The irreducible error",
            "The underlying signal",
            "Random noise"
          ],
          "correctAnswers": [
            "Random noise"
          ],
          "explanation": "Overfitting occurs when a model is flexible enough to mistake random fluctuations (noise) for genuine underlying patterns (signal)."
        },
        {
          "id": "q2",
          "type": "multiple",
          "prompt": "Which of the following are components of the total Mean Squared Error (MSE) in the Bias-Variance Decomposition?",
          "options": [
            "Bias squared",
            "Variance",
            "Standard Error",
            "Irreducible Error",
            "Multicollinearity"
          ],
          "correctAnswers": [
            "Bias squared",
            "Variance",
            "Irreducible Error"
          ],
          "explanation": "Total Error is mathematically decomposed into the square of the Bias, the Variance of the model, and the Irreducible Error (noise)."
        },
        {
          "id": "q3",
          "type": "fill",
          "prompt": "The 'Goldilocks' point where the sum of Bias and Variance is minimized is located at the bottom of the ____ curve.",
          "options": [],
          "correctAnswers": [
            "U-shaped",
            "total error",
            "validation error",
            "cross-validation error"
          ],
          "explanation": "As complexity increases, bias drops and variance rises; the total error curve forms a 'U' shape where the minimum represents the optimal balance.",
          "placeholder": "Shape or type of curve"
        },
        {
          "id": "q4",
          "type": "single",
          "prompt": "What is the primary geometric reason Lasso regression can set coefficients to exactly zero while Ridge regression cannot?",
          "options": [
            "The L1 constraint has sharp corners on the axes.",
            "The L2 constraint is larger than the L1 constraint.",
            "The L1 penalty is squared, making it more aggressive.",
            "Lasso uses a circular constraint that avoids the origin."
          ],
          "correctAnswers": [
            "The L1 constraint has sharp corners on the axes."
          ],
          "explanation": "The 'diamond' shape of the L1 norm has vertices on the axes; elliptical OLS contours are mathematically likely to hit these corners first, resulting in zero coefficients.",
          "caption": "Geometric comparison of L1 (diamond) and L2 (circle) constraints in coefficient space."
        },
        {
          "id": "q5",
          "type": "multiple",
          "prompt": "Why is it critical to scale or standardize features before applying Ridge or Lasso regression?",
          "options": [
            "The penalty term is applied to the magnitude of the coefficients.",
            "Variables with larger scales will be penalized more heavily regardless of their importance.",
            "It prevents the model from capturing the irreducible error.",
            "It ensures that lambda is set to a value between 0 and 1."
          ],
          "correctAnswers": [
            "The penalty term is applied to the magnitude of the coefficients.",
            "Variables with larger scales will be penalized more heavily regardless of their importance."
          ],
          "explanation": "Regularization penalties are sensitive to the scale of coefficients; if one feature is in 'dollars' and another in 'years', the one with the smaller numerical range (and thus larger coefficient) is unfairly penalized."
        },
        {
          "id": "q6",
          "type": "fill",
          "prompt": "The condition where a model has 100 predictors but only 5 are actually relevant is known as ____, and is best handled by Lasso.",
          "options": [],
          "correctAnswers": [
            "sparsity",
            "a sparse model",
            "feature sparsity"
          ],
          "explanation": "Sparsity refers to models where many potential predictors have zero influence; Lasso's ability to zero-out coefficients makes it ideal for this.",
          "placeholder": "Characteristic of the model"
        },
        {
          "id": "q7",
          "type": "single",
          "prompt": "In K-fold cross-validation, what happens to the 'K' individual models after the optimal lambda is identified?",
          "options": [
            "They are averaged together to create the final ensemble.",
            "They are discarded and a final model is trained on the full dataset.",
            "The model with the lowest individual error is selected for production.",
            "They are used to calculate the irreducible error of the system."
          ],
          "correctAnswers": [
            "They are discarded and a final model is trained on the full dataset."
          ],
          "explanation": "K-fold is used only to estimate the performance of a lambda value. Once the best lambda is found, we use all available data to train the final production model."
        },
        {
          "id": "q8",
          "type": "multiple",
          "prompt": "A model with High Bias and Low Variance is likely suffering from which of the following?",
          "options": [
            "Underfitting",
            "Overfitting",
            "An overly simplistic view of the data",
            "An over-sensitivity to small data fluctuations",
            "A lack of flexibility"
          ],
          "correctAnswers": [
            "Underfitting",
            "An overly simplistic view of the data",
            "A lack of flexibility"
          ],
          "explanation": "High bias indicates the model cannot capture the signal (underfitting), while low variance means it is stable but consistently wrong."
        },
        {
          "id": "q9",
          "type": "fill",
          "prompt": "In the Bias-Variance tradeoff, the 'Irreducible Error' represents the ____ that no model can ever overcome.",
          "options": [],
          "correctAnswers": [
            "floor",
            "minimum error",
            "limit",
            "noise floor"
          ],
          "explanation": "Irreducible error is the noise inherent in the data collection or the universe; it acts as the absolute minimum error possible for any model.",
          "placeholder": "A synonym for 'limit' or 'bottom'"
        },
        {
          "id": "q10",
          "type": "single",
          "prompt": "What happens to the coefficients in a Ridge regression model as lambda approaches infinity?",
          "options": [
            "They all become exactly zero.",
            "They approach zero but remain non-zero.",
            "They expand to match the OLS estimates.",
            "They oscillate between positive and negative values."
          ],
          "correctAnswers": [
            "They approach zero but remain non-zero."
          ],
          "explanation": "Because the L2 penalty is a smooth curve (circle), it continuously shrinks coefficients but lacks the 'corners' required to force them to exactly zero."
        },
        {
          "id": "q11",
          "type": "multiple",
          "prompt": "When dealing with two highly correlated features, how do Ridge and Lasso behave differently?",
          "options": [
            "Ridge tends to keep both and shrink them proportionally.",
            "Lasso may arbitrarily pick one and set the other to zero.",
            "Ridge will set both to zero to avoid multicollinearity.",
            "Lasso will always keep both to maximize interpretability."
          ],
          "correctAnswers": [
            "Ridge tends to keep both and shrink them proportionally.",
            "Lasso may arbitrarily pick one and set the other to zero."
          ],
          "explanation": "Ridge distributes the penalty across correlated features, while Lasso's selection property often forces one to zero, which can be arbitrary."
        },
        {
          "id": "q12",
          "type": "fill",
          "prompt": "The L2 penalty used in Ridge regression is defined as the sum of the ____ of the coefficients.",
          "options": [],
          "correctAnswers": [
            "squares",
            "squared values"
          ],
          "explanation": "Ridge (L2) penalizes the sum of the squared coefficients, whereas Lasso (L1) penalizes the sum of the absolute values.",
          "placeholder": "Mathematical operation"
        },
        {
          "id": "q13",
          "type": "single",
          "prompt": "If your model has high variance, which of the following actions is most appropriate?",
          "options": [
            "Increase the model complexity.",
            "Increase the lambda penalty.",
            "Decrease the lambda penalty.",
            "Remove the regularization term entirely."
          ],
          "correctAnswers": [
            "Increase the lambda penalty."
          ],
          "explanation": "High variance indicates overfitting; increasing the lambda penalty (regularization) adds 'stiffness' to the model and reduces its sensitivity to noise."
        },
        {
          "id": "q14",
          "type": "multiple",
          "prompt": "Which statements are true regarding the tuning parameter lambda (λ)?",
          "options": [
            "It is learned automatically via Ordinary Least Squares.",
            "It is typically selected using a logarithmic grid search.",
            "A lambda of zero is equivalent to standard OLS regression.",
            "As lambda increases, model bias typically decreases."
          ],
          "correctAnswers": [
            "It is typically selected using a logarithmic grid search.",
            "A lambda of zero is equivalent to standard OLS regression."
          ],
          "explanation": "Lambda is a hyperparameter set by the user (often via grid search). When lambda is zero, there is no penalty, making it OLS."
        },
        {
          "id": "q15",
          "type": "single",
          "prompt": "Which visual analogy is best used to describe Bias and Variance?",
          "options": [
            "A scale weighing two different objects",
            "A bullseye target with scatter patterns",
            "A bridge with structural supports",
            "A car navigating a winding road"
          ],
          "correctAnswers": [
            "A bullseye target with scatter patterns"
          ],
          "explanation": "The bullseye represents the true value; bias is how far off-center you are on average, and variance is how scattered your shots are.",
          "caption": "The standard bullseye analogy for bias and variance."
        },
        {
          "id": "q16",
          "type": "multiple",
          "prompt": "Identify the primary benefits of using Lasso regression over Ridge regression.",
          "options": [
            "It provides automated feature selection.",
            "It produces simpler, more interpretable models.",
            "It is better at handling multicollinearity by keeping all variables.",
            "It can handle datasets where most predictors are noise."
          ],
          "correctAnswers": [
            "It provides automated feature selection.",
            "It produces simpler, more interpretable models.",
            "It can handle datasets where most predictors are noise."
          ],
          "explanation": "Lasso's L1 penalty creates sparsity, which effectively selects features and ignores noise, unlike Ridge which retains everything."
        },
        {
          "id": "q17",
          "type": "single",
          "prompt": "What is 'data leakage' in the context of hyperparameter tuning?",
          "options": [
            "When the test set is used to help select the best lambda.",
            "When the training set is too small to build a model.",
            "When irreducible error becomes larger than variance.",
            "When Ridge regression is applied to non-linear data."
          ],
          "correctAnswers": [
            "When the test set is used to help select the best lambda."
          ],
          "explanation": "Data leakage occurs when information from the evaluation set 'leaks' into the training process, leading to over-optimistic performance estimates."
        },
        {
          "id": "q18",
          "type": "animation",
          "prompt": "As the tuning parameter lambda increases from zero to a very large value, why does the model's prediction error on new data typically decrease before eventually increasing again?",
          "options": [
            "The model initially sheds its sensitivity to noise, but eventually loses its ability to capture the actual signal.",
            "The penalty term increases the bias of the model indefinitely until the variance reaches zero.",
            "The OLS contours expand to find a better fit while the penalty term restricts the growth of noise.",
            "Higher lambda values eliminate the irreducible error, allowing the model to focus purely on the signal."
          ],
          "correctAnswers": [
            "The model initially sheds its sensitivity to noise, but eventually loses its ability to capture the actual signal."
          ],
          "explanation": "Initially, increasing lambda reduces high variance (overfitting to noise). However, too much regularization increases bias so much that the model can no longer represent the true relationship (underfitting).",
          "scene": "concept"
        }
      ]
    }
  ]
};

export const EXAM_SESSIONS = [PYTHAGOREAN_EXAM, REGRESSION_EXAM];
