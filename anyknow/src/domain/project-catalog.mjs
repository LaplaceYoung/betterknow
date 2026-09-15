/** Leftover project-stage dumps (stored steps only, no leftover html). */

export const PYTHAGOREAN_PROJECT = {
  "id": "pythagorean",
  "aliases": [
    "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2"
  ],
  "title": "The Visual Pythagorean Toolkit",
  "description": "Create a comprehensive visual guide and calculation toolkit that demonstrates the Pythagorean Theorem through geometric construction, logical proof, and real-world distance calculation.",
  "stages": [
    {
      "stageId": "22b6a5c6-6ce5-47fb-b516-b5b679b84f74",
      "unitId": "unit1",
      "title": "Constructing the Area Model",
      "description": "Draw a right-angled triangle on grid paper and construct squares on all three sides to visually verify that the sum of the areas of the two smaller squares equals the area of the largest square.",
      "deliverable": "A labeled 'Geometric Area Diagram' illustrating the physical a² + b² = c² relationship.",
      "steps": [
        {
          "id": "step1",
          "title": "Project introduction",
          "prompt": "Welcome to the first stage of your journey to master geometry! Over the course of this project, you are going to build a comprehensive 'Theorem Portfolio'—a professional-grade visual guide that proves the Pythagorean Theorem through art, logic, and math. By the end, you'll have transformed abstract formulas into a hand-drawn geometric guide and a real-world calculation toolkit. We are starting today by grounding the theorem in physical reality. You've already learned how to identify the legs and the hypotenuse; now, you'll prove how their areas interact by building a geometric model.",
          "required": false,
          "require": "text"
        },
        {
          "id": "step2",
          "title": "Select your triangle",
          "prompt": "To build a visual model that is easy to verify, we need to pick a triangle where the side lengths are 'clean' whole numbers. Think back to our sessions on the 'Grid-Count' verification. Which specific whole-number leg lengths (the sides that make the right angle) will you use for your diagram to ensure the hypotenuse also results in a whole number? Briefly state your chosen side lengths for side 'a' and side 'b' and explain why you chose them for a grid-based drawing.",
          "required": true,
          "require": "text",
          "instruction": "Submit the side lengths for your two legs (e.g., 3 and 4). Good work identifies a 'Pythagorean Triple' that fits easily on a piece of grid paper for counting."
        },
        {
          "id": "step3",
          "title": "Construct the base triangle",
          "prompt": "Now, take a piece of grid paper and a ruler. In the center of your page, draw your right-angled triangle using the dimensions you just selected. It is vital that you use the grid lines to ensure your 'anchor' angle is exactly 90 degrees—remember, if the corner isn't square, the area equality won't work! Label the two legs as 'a' and 'b' and the hypotenuse as 'c'.",
          "required": false,
          "require": "text"
        },
        {
          "id": "step4",
          "title": "Build the side-squares",
          "prompt": "This is the 'Aha!' moment where we turn lines into 2D space. Using each side of your triangle as a base, draw a perfect square extending outward. If side 'a' is 3 units long, draw a 3x3 square attached to it. Do the same for side 'b' and side 'c'. At this point, your drawing should look like a triangle with three 'boxes' growing out of its sides. Inside each square, write the total number of grid units it contains (for example, write '9' inside the 3x3 square).",
          "required": false,
          "require": "text"
        },
        {
          "id": "step5",
          "title": "Submit your area diagram",
          "prompt": "Finalize your 'Geometric Area Diagram' by adding a title and a brief note at the bottom that shows the math: Area A + Area B = Area C. Make sure your lines are clean and your labels are legible, as this will be the first page of your final Portfolio. Take a clear photo or scan of your completed drawing to show that the squares are constructed accurately on the triangle's sides.",
          "required": true,
          "require": "image",
          "instruction": "Upload an image of your hand-drawn diagram. A successful submission must show a clear right triangle, three accurately drawn squares proportional to the sides, and the grid-count/area labeled inside each square."
        },
        {
          "id": "step6",
          "title": "Reflect on the area fit",
          "prompt": "Great work completing the first piece of your portfolio! Before we move on to formal proofs in the next stage, look at your drawing. Why was it important that we used a right-angled triangle specifically? Based on what you saw when counting the grid squares, what would happen to the area of the largest square if we 'opened up' the right angle to be 100 degrees instead of 90?",
          "required": true,
          "require": "text",
          "instruction": "Type a short reflection. Good work explains that the area of the hypotenuse square would grow larger than the sum of the legs (an 'area deficit') if the angle were obtuse."
        }
      ]
    },
    {
      "stageId": "b3d45b68-6d8d-4166-8675-4dacb86c7c03",
      "unitId": "unit2",
      "title": "The Rearrangement Proof Map",
      "description": "Create a two-frame visual proof using the 'Behold!' method, showing how four identical right triangles can be rearranged within a larger square to isolate a² + b² and c² respectively.",
      "deliverable": "A 'Visual Proof Illustration' with step-by-step annotations explaining the logical transition from geometry to the algebraic formula.",
      "steps": [
        {
          "id": "step1",
          "title": "Recap and orient",
          "prompt": "In the previous stage, you constructed a 'Geometric Area Model' to visualize the squares of a, b, and c. You've also recently explored the 'Large Square Construction,' where four congruent triangles are arranged inside a square with side length (a+b). Now, we are going to combine these concepts to create the 'Rearrangement Proof Map.' This deliverable is a visual bridge that proves the Pythagorean Theorem through logic rather than just measurement, moving us closer to the final 'Theorem Portfolio.'",
          "required": false,
          "require": "text"
        },
        {
          "id": "step2",
          "title": "Sketch the 'c-square' frame",
          "prompt": "Start your 'Visual Proof Illustration' by drawing a large square frame. Inside this frame, place your four identical right triangles in the corners so that their hypotenuses (c) form a tilted square in the center. This is your first 'room' in the comparison. Label the sides of the triangles (a and b), the side of the inner square (c), and most importantly, label the total side of the large outer frame as (a+b). What is the total area of the 'empty space' in the middle of this specific arrangement?",
          "required": true,
          "require": "text",
          "instruction": "Identify the area of the central shape in this first configuration. A good answer will state the area in terms of 'c' (e.g., c²)."
        },
        {
          "id": "step3",
          "title": "Map the 'a² + b²' frame",
          "prompt": "Now, draw a second, identical large square frame (side a+b) right next to the first one. This time, 'slide' the four triangles into the corners to form two rectangles. This rearrangement reveals two new empty squares: one small square with side 'a' and one larger square with side 'b'. Because the outer frame is the same size and we are using the same four triangles, the total 'empty' area here must be identical to the 'c-square' from the first frame.",
          "required": false,
          "require": "text"
        },
        {
          "id": "step4",
          "title": "Annotate the logical transition",
          "prompt": "To make this a formal proof map, you must explain the 'Invariant Area' logic. Add annotations between your two frames. Use arrows to show how the triangles 'moved' and write a brief explanation of why the area of the tilted square in Frame 1 must equal the sum of the two squares in Frame 2. Explain this using the concept of subtraction: (Total Area) - (4 Triangles) = (Leftover Area).",
          "required": true,
          "require": "text",
          "instruction": "Write a 2-3 sentence explanation of the 'Invariant Area' logic. Good work clearly states that because the total area and the triangle areas remain constant, the leftover space (c² vs a² + b²) must be equal."
        },
        {
          "id": "step5",
          "title": "Submit your Visual Proof Illustration",
          "prompt": "It's time to finalize the 'Rearrangement Proof Map' for your portfolio. Ensure both frames are clearly drawn, colors are used to distinguish 'a', 'b', and 'c' areas, and your logical annotations are legible. This document serves as the geometric 'Eureka' moment that justifies the algebraic formula we will calculate in the final unit.",
          "required": true,
          "require": "pdf",
          "instruction": "Submit a single-page PDF containing your two-frame rearrangement illustration. It should include: 1) Two identical (a+b) outer squares, 2) Four congruent triangles in two different configurations, 3) Labels for areas a², b², and c², and 4) Written annotations explaining the logical transition."
        },
        {
          "id": "step6",
          "title": "Reflect on the 'Behold!' method",
          "prompt": "This method of proof is often called 'Behold!' because the truth of the theorem becomes obvious just by looking at the rearrangement. How does seeing the area shift physically change your understanding of the formula a² + b² = c² compared to just memorizing it? Reflecting on this will help you explain the logic to others in the final project stage.",
          "required": true,
          "require": "text",
          "instruction": "Provide a brief reflection on your personal 'aha' moment during this construction. There are no wrong answers, but good work connects the physical movement of the shapes to the mathematical identity."
        }
      ]
    },
    {
      "stageId": "e1a49345-1469-405b-90e2-840456e3f4e5",
      "unitId": "unit3",
      "title": "The Spatial Problem Solver",
      "description": "Apply the theorem to solve a set of practical challenges, including finding the diagonal distance across a room (3D) and determining shortest paths on a map (2D).",
      "deliverable": "A 'Computational Solutions Worksheet' featuring solved real-world distance problems and identified Pythagorean triples.",
      "steps": [
        {
          "id": "step1",
          "title": "Recap & Orient",
          "prompt": "You have already mastered the visual and logical foundations of the Pythagorean Theorem by constructing area models and mapping out rearrangement proofs. Now, we move from 'seeing' to 'solving.' In this final stage, you will apply the theorem to navigate the coordinate plane and calculate distances in 3D space. You are building the final piece of your Theorem Portfolio: the Computational Solutions Worksheet.",
          "required": false,
          "require": "text"
        },
        {
          "id": "step2",
          "title": "Identify Pythagorean Triples",
          "prompt": "Before tackling complex maps, let's sharpen your 'recognition' skills. Pythagorean triples like 3-4-5 and 5-12-13 are mathematical shortcuts that let you solve problems instantly without a calculator. Based on what we covered about scaling principles, identify which of these three sets is a true Pythagorean triple: [6, 8, 10], [5, 10, 15], or [7, 10, 12]. Briefly explain your choice by showing the calculation (a² + b² = c²).",
          "required": true,
          "require": "text",
          "instruction": "Type the correct set of numbers and include the simple math (e.g., X² + Y² = Z²) that proves they form a right triangle. A good response correctly identifies the triple and verifies the equality."
        },
        {
          "id": "step3",
          "title": "Map a 2D Distance",
          "prompt": "Imagine a map where a park entrance is at coordinates (1, 2) and a fountain is at (4, 6). To find the 'as the crow flies' distance, you must visualize an 'invisible triangle.' The horizontal leg (Delta X) is the distance between x-coordinates, and the vertical leg (Delta Y) is the distance between y-coordinates. Calculate the lengths of these two legs, then use the Distance Formula—which is just the Pythagorean Theorem in disguise—to find the total distance between the two points.",
          "required": true,
          "require": "text",
          "instruction": "Submit your step-by-step calculation. Include the lengths of the two legs you found and the final distance result. Good work clearly shows the 'Square, Sum, Root' process."
        },
        {
          "id": "step4",
          "title": "Solve the 3D Space Diagonal",
          "prompt": "Now, let’s go 3D. To find the longest diagonal inside a room (a rectangular prism), you actually apply the theorem twice. First, find the diagonal of the floor using the length and width. Then, use that floor diagonal as a 'leg' and the room's height as the other 'leg' to find the final space diagonal. Imagine a box that is 3ft long, 4ft wide, and 12ft high. Calculate the distance from one bottom corner to the opposite top corner.",
          "required": true,
          "require": "text",
          "instruction": "Submit the two-step calculation: (1) the length of the floor diagonal and (2) the final 3D diagonal. A successful response shows both intermediate and final values."
        },
        {
          "id": "step5",
          "title": "Submit the Solutions Worksheet",
          "prompt": "It is time to finalize your 'Computational Solutions Worksheet.' Combine your 2D coordinate calculations, your 3D room diagonal solution, and your identified Pythagorean triples into a single, clearly labeled document. This worksheet serves as the practical proof of your mastery, demonstrating that you can use the theorem as a diagnostic and navigational tool in the real world.",
          "required": true,
          "require": "pdf",
          "instruction": "Upload your 'Computational Solutions Worksheet' as a PDF. It should include the 2D map problem, the 3D room diagonal problem, and a list of at least three Pythagorean triples. Each solution should be clearly labeled with the steps you took to reach the answer."
        },
        {
          "id": "step6",
          "title": "Reflect on Practical Utility",
          "prompt": "Congratulations! You have completed all components of the Visual Pythagorean Toolkit. From drawing squares to calculating 3D vectors, you’ve seen how one simple geometric relationship governs almost all spatial logic. Reflect briefly on which application—the 2D distance formula or the 3D space diagonal—you find most useful for your daily life or future career interest (such as construction, coding, or navigation).",
          "required": false,
          "require": "text"
        }
      ]
    }
  ]
};

export const REGRESSION_PROJECT = {
  "id": "regression",
  "aliases": [
    "706d4d5c-1b4d-4707-abb0-45fc9b1f4926"
  ],
  "title": "Housing Market Pulse: Building a Predictive Analytics Engine",
  "description": "In this project, you will transition from a simple geometric understanding of property values to building a production-ready regularized regression model. Using a real-world housing dataset, you will develop a Python-based diagnostic and prediction script that accounts for physical attributes, neighborhood interactions, and noise reduction through Lasso/Ridge techniques.",
  "stages": [
    {
      "stageId": "4f6e3324-1b05-4636-90f2-53cdc5b0ceef",
      "unitId": "unit1",
      "title": "Visualizing the Baseline",
      "description": "Apply the physical intuition of the 'best fit line' by plotting the relationship between living area square footage and sale price. You will manually estimate the line and then verify it using a simple scatter plot with a regression trendline.",
      "deliverable": "Initial EDA (Exploratory Data Analysis) script and a baseline scatter plot with a manually fitted trendline.",
      "steps": [
        {
          "id": "step1",
          "title": "Project Launch & Orientation",
          "prompt": "Welcome to your first project stage! Over the course of this project, you are going to build a 'Housing Market Pulse'—a production-ready predictive engine that uses Python to forecast property values using advanced regression techniques. By the end, you’ll have a professional Jupyter Notebook that doesn't just predict prices, but uses diagnostic plots to explain why those prices were chosen. Today, we start by grounding our data in reality. We’ll take the concepts of 'tension' and 'equilibrium' from our lessons on physics-based regression and apply them to a real housing dataset by visualizing the relationship between living area and sale price.",
          "required": false,
          "require": "text"
        },
        {
          "id": "step2",
          "title": "Load and Inspect the Data",
          "prompt": "To begin, you need to look at your raw materials. Load your housing dataset using Python and identify the two variables we are focusing on: 'GrLivArea' (Above grade living area square feet) and 'SalePrice'. Before plotting, take a quick look at the first few rows and calculate the mean for both. Remember our session on 'Natural Equilibrium'—the line of best fit must pass through the centroid (the mean of X and the mean of Y). Based on the means you just calculated, what is the 'center point' coordinates that our future regression line must pass through?",
          "required": true,
          "require": "text",
          "instruction": "Provide the mean value for 'GrLivArea' and 'SalePrice' as a coordinate pair (X, Y). This shows you have identified the 'fulcrum' of your data."
        },
        {
          "id": "step3",
          "title": "Visualize the Cloud",
          "prompt": "Now, let’s create a scatterplot of 'GrLivArea' vs. 'SalePrice'. As you look at the resulting 'cloud' of points, think back to our session on 'Patterns in the Cloud'. Does the data show a positive, negative, or null trend? Is the relationship 'tight' like a cigar, suggesting a strong correlation, or is it a loose cluster? Identifying the shape first ensures that a linear model is actually the right tool for the job. Take a screenshot of your scatterplot to document the raw distribution.",
          "required": true,
          "require": "image",
          "instruction": "Upload a screenshot of your initial scatterplot. It should clearly show 'GrLivArea' on the X-axis and 'SalePrice' on the Y-axis with no trendlines added yet."
        },
        {
          "id": "step4",
          "title": "Perform the Pencil Test",
          "prompt": "It’s time to apply the 'Pencil Test.' Using an image editor or by manually sketching over your plot, draw a single straight line that you believe best represents the data. Try to balance the 'tension'—the total vertical distance of points above your line should roughly equal the distance of points below. Avoid the 'Outlier Trap' by not letting a single extreme property pull your line too far away from the main cluster. Once you've drawn your manual line, estimate its slope: for every additional 500 square feet, how much does the price seem to increase?",
          "required": true,
          "require": "text",
          "instruction": "Provide your estimated slope (e.g., '$50,000 per 500 sq ft') and a brief sentence explaining how you balanced the line between the 'main cluster' and any outliers."
        },
        {
          "id": "step5",
          "title": "Verify with a Trendline",
          "prompt": "Finally, let's compare your intuition with a calculated baseline. Use a plotting library (like Seaborn's regplot) to overlay a regression trendline on your scatterplot. This line is calculated by minimizing the sum of squared residuals—the very 'potential energy' we discussed in the physics analogy. Look at where the calculated line differs from your manual 'Pencil Test' line. This comparison helps you understand how the mathematical 'Tug-of-War' handles data points differently than the human eye.",
          "required": false,
          "require": "text"
        },
        {
          "id": "step6",
          "title": "Submit Baseline EDA",
          "prompt": "You have successfully moved from abstract physics analogies to a concrete visual model of housing data. This baseline is the 'North Star' for the rest of our project; as we add more complex features and regularization later, we will always come back to this simple relationship to ensure our model stays grounded. Combine your code and your final plot featuring the automated trendline for submission.",
          "required": true,
          "require": "file",
          "instruction": "Submit your Python script or Jupyter Notebook (.ipynb) containing the data loading, the mean calculations, and the final scatterplot with the regression trendline. Good work will show clean axes labels and a clearly visible trendline through the data cloud."
        }
      ]
    }
  ]
};

export const PROJECT_SESSIONS = [PYTHAGOREAN_PROJECT, REGRESSION_PROJECT];
