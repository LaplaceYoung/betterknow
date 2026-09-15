/** Leftover Course Blueprint tree (system internals stripped). */

export const LINEAR_REGRESSION_BLUEPRINT = {
  "courseUuid": "blueprint-linear-regression",
  "courseTitle": "Linear Regression: From Intuition to Practice",
  "courseDescription": "This course takes a logic-first approach to statistical modeling, bridging the gap between physical intuition and professional data science. Starting with the geometric 'Aha!' moments of best-fit lines, you will move through the formal derivation of Ordinary Least Squares, master the interpretation of multiple variables, and learn to diagnose models like a pro. By the end, you'll be able to read complex software outputs in Python or R and apply robust techniques like Ridge and Lasso to real-world, messy datasets.",
  "outputLanguage": "English",
  "tags": [
    "Statistics",
    "Data Science",
    "Machine Learning",
    "Linear Models",
    "Predictive Modeling"
  ],
  "units": [
    {
      "unitId": "unit1",
      "title": "The Geometric Anchor: Intuition of the Best Fit Line",
      "description": "Before touching equations, we establish a physical and visual understanding of what a 'line of best fit' actually represents in a sea of data points.",
      "lectures": [
        {
          "lectureId": "unit1Lecture1",
          "title": "Visualizing Relationships in Data",
          "order": 1,
          "description": "This lecture introduces the concept of statistical relationships through visualization, helping you see patterns in noise before we define them mathematically.",
          "sessions": [
            {
              "sessionId": "b38a83f7-1f82-4f7c-a309-3598f1ac9e7a",
              "title": "Patterns in the Cloud: Scatterplots and Correlation",
              "session_type": "whiteboard",
              "description": "This session teaches you how to interpret the structure of bivariate data by observing scatterplots and the concept of trend. You will gain the ability to distinguish between positive, negative, and null relationships si",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Identify the direction of relationship in three different scatterplots.",
                  "Estimate the strength of correlation based on the 'tightness' of the point cluster."
                ]
              }
            },
            {
              "sessionId": "6dcdbc8c-6993-4810-a663-69cad7be444e",
              "title": "The Pencil Test: Manually Fitting a Trend",
              "session_type": "whiteboard",
              "description": "In this session, you will learn the heuristic process of 'eyeballing' a line of best fit by trying to balance a line through a cloud of points. You will be able to explain the trade-offs involved when a line captures som",
              "depthTags": [
                "intuition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Sketch a line of best fit through a provided set of 10 data points.",
                  "Explain why you chose the slope and height of your line compared to a peer's version."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit1Lecture2",
          "title": "The Geometry of Errors",
          "order": 2,
          "description": "We define what it means for a line to be 'wrong' by looking at the vertical distances between the data and our model.",
          "sessions": [
            {
              "sessionId": "7bcb07a2-ba95-4139-a713-a0c60ba9cad5",
              "title": "Vertical Gaps: Defining the Residual",
              "session_type": "whiteboard",
              "description": "This session introduces the 'residual' as the vertical distance between an observed point and the prediction line. You will understand how to measure the 'error' for a single point and recognize that the line is essentia",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Calculate vertical distances for three points given a line's position.",
                  "Identify which points on a graph are contributing the most 'error' to a model."
                ]
              }
            },
            {
              "sessionId": "e752a915-d53d-4cd7-bbd6-933d153839a9",
              "title": "The Tug-of-War: Balancing Total Error",
              "session_type": "whiteboard",
              "description": "This session explains the 'best' line as a state of equilibrium where the errors are minimized collectively. You will learn why we cannot simply sum raw errors to find the best fit, as positive and negative errors would ",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Given a small dataset, show how moving the line to fix one error might increase another.",
                  "Propose a method to handle negative errors so they don't cancel out positive ones."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit1Lecture3",
          "title": "The Physical Model of Regression",
          "order": 3,
          "description": "We use a physical analogy—springs and levers—to solidify the intuition of how a regression line reacts to data.",
          "sessions": [
            {
              "sessionId": "b44ac772-4b9e-4f2b-9254-3342a480ee6b",
              "title": "Springs and Tension: A Physics Analogy",
              "session_type": "whiteboard",
              "description": "This session teaches you to visualize data points as fixed anchors connected to a rigid rod (the line) by elastic springs. You will see how the rod naturally settles into the position of least tension, which corresponds ",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Predict how the 'rod' would move if a point far away was added to the system.",
                  "Identify the 'high tension' points in a provided diagram."
                ]
              }
            },
            {
              "sessionId": "4820d42a-7a2b-4d22-98e0-686408627512",
              "title": "Leverage and Influence: When One Point Rules",
              "session_type": "whiteboard",
              "description": "This session explores how points at the edges of the data range have more 'leverage' over the slope than points in the middle. You will gain the ability to predict which data points are most influential and understand th",
              "depthTags": [
                "intuition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Analyze a plot and circle the point with the highest leverage.",
                  "Sketch the likely change in slope if a specific high-leverage point were removed."
                ]
              }
            }
          ]
        }
      ],
      "projects": [
        {
          "stage_id": "4f6e3324-1b05-4636-90f2-53cdc5b0ceef",
          "stage_title": "Visualizing the Baseline"
        }
      ],
      "exams": [
        {
          "examId": "e0",
          "title": "Geometric Intuition Proficiency Exam"
        }
      ]
    },
    {
      "unitId": "unit2",
      "title": "The Mechanics of OLS: Why We Square the Errors",
      "description": "We transition from intuition to formal math using whiteboard sessions to derive the Ordinary Least Squares (OLS) method and the cost function.",
      "lectures": [
        {
          "lectureId": "unit2Lecture1",
          "title": "Defining the Cost Function: The Math of 'Better'",
          "order": 1,
          "description": "This lecture translates the visual intuition of a 'best fit' line into a formal mathematical objective function that we can optimize.",
          "sessions": [
            {
              "sessionId": "884adde8-dbbb-492a-aed5-6972fde047f9",
              "title": "Residuals: The Language of Error",
              "session_type": "whiteboard",
              "description": "This session teaches you the formal definition of a residual as the vertical distance between an observed data point and the model's prediction. You will learn how to notationally represent error for individual points, w",
              "depthTags": [
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Calculate residuals for three given points relative to a provided line equation.",
                  "Identify the difference between positive and negative residuals on a scatter plot."
                ]
              }
            },
            {
              "sessionId": "6caa0b32-3665-42cb-8e1d-2ab0ff1c0bbb",
              "title": "The Objective Function: Aggregating Error",
              "session_type": "whiteboard",
              "description": "This session introduces the concept of an objective function, specifically the Sum of Errors, and explores why simply adding up raw residuals fails as a metric. By the end of this session, you will understand why we cann",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Demonstrate how a line with large errors can result in a Sum of Errors of zero.",
                  "Argue why 'Mean Absolute Error' and 'Sum of Squared Errors' are both valid attempts to fix the cancellation problem."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit2Lecture2",
          "title": "The Choice of Squares: OLS vs. Alternatives",
          "order": 2,
          "description": "We explore the mathematical and practical reasons why squaring residuals (Ordinary Least Squares) is the gold standard in regression analysis.",
          "sessions": [
            {
              "sessionId": "ffb1c1f7-44a9-41ef-8604-e04f2c20b1f9",
              "title": "The Geometry of Squared Errors",
              "session_type": "whiteboard",
              "description": "In this session, you will learn how squaring a residual transforms it into an area (a square), and how minimizing the total area provides a unique mathematical solution. You will be able to explain how the squaring proce",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Draw squares on a scatter plot based on residual lengths to visualize the total area to be minimized.",
                  "Contrast the impact of a residual of 2 vs. 4 on the total cost function value."
                ]
              }
            },
            {
              "sessionId": "d7239551-3a08-4b27-b8be-a0aaaec46be8",
              "title": "Mathematical Elegance of OLS",
              "session_type": "whiteboard",
              "description": "This session explains why we prefer squared errors for their mathematical properties, specifically their smoothness and the ability to find a closed-form solution using calculus. You will understand why modern data scien",
              "depthTags": [
                "advanced"
              ],
              "practice": {
                "tasks": [
                  "Sketch a quadratic cost curve and identify the minimum point.",
                  "Explain why a 'V-shaped' absolute error curve is harder to optimize than a 'U-shaped' squared error curve."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit2Lecture3",
          "title": "The Calculus of Regression: Finding the Minimum",
          "order": 3,
          "description": "This lecture guides you through the step-by-step derivation of the slope and intercept formulas using partial derivatives.",
          "sessions": [
            {
              "sessionId": "26ab5be2-d182-42cb-98c2-944975f91c2d",
              "title": "Setting up the Normal Equations",
              "session_type": "whiteboard",
              "description": "You will learn how to take the partial derivatives of the Sum of Squared Errors with respect to the intercept and slope parameters. This session enables you to set the resulting 'Normal Equations' to zero, a foundational",
              "depthTags": [
                "derivation"
              ],
              "practice": {
                "tasks": [
                  "Write out the full Sum of Squared Errors (SSE) equation for two parameters.",
                  "Perform the first derivative step for the intercept (beta0)."
                ]
              }
            },
            {
              "sessionId": "672aa1b4-f350-479e-826b-1bcc12ab4519",
              "title": "The Final Formulas: Slope and Intercept",
              "session_type": "whiteboard",
              "description": "In this session, you will complete the algebraic derivation to arrive at the closed-form solutions for the slope (beta1) and intercept (beta0). You will gain the ability to manually calculate a regression line for a smal",
              "depthTags": [
                "derivation",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Solve for beta1 given a small 3-point dataset using the derived formulas.",
                  "Verify that the resulting line passes through the mean of X and the mean of Y."
                ]
              }
            }
          ]
        }
      ],
      "projects": [
        {
          "stage_id": "d4fa4781-05f5-4273-8bc1-818363eb4764",
          "stage_title": "Implementing the OLS Core"
        }
      ],
      "exams": [
        {
          "examId": "e1",
          "title": "OLS Mechanics and Derivation Assessment"
        }
      ]
    },
    {
      "unitId": "unit3",
      "title": "Expanding the Lens: Multiple Linear Regression (MLR)",
      "description": "Move beyond the 2D plane to understand how multiple variables interact and what it truly means to 'hold other variables constant.'",
      "lectures": [
        {
          "lectureId": "unit3Lecture1",
          "title": "The Transition to Multi-Dimensionality",
          "order": 1,
          "description": "This lecture explains the conceptual jump from a single predictor to multiple predictors, focusing on the visual and geometric intuition of fitting a plane rather than a line.",
          "sessions": [
            {
              "sessionId": "2a8918ce-3935-44ba-8139-24c5c9f20f3b",
              "title": "From Lines to Hyperplanes",
              "session_type": "whiteboard",
              "description": "This session will teach you how to visualize data relationships when more than one independent variable is involved. You will understand how the 'line of best fit' evolves into a flat surface or hyperplane in high-dimens",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Sketch a 3D plot with two predictors and identify where the 'residual' distance to the plane is measured.",
                  "Explain why we cannot easily visualize a model with four or more predictors."
                ]
              }
            },
            {
              "sessionId": "90999b8d-28f2-4c3b-82ae-f6f18f3474b8",
              "title": "The Matrix Representation of MLR",
              "session_type": "whiteboard",
              "description": "In this session, you will learn the compact mathematical notation used to represent multiple variables simultaneously using vectors and matrices. You will be able to interpret the OLS equation in its matrix form, which i",
              "depthTags": [
                "definition",
                "derivation"
              ],
              "practice": {
                "tasks": [
                  "Write out the dimensions for the X matrix and Y vector for a dataset with 100 rows and 3 predictors.",
                  "Identify the intercept term's representation in the design matrix."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit3Lecture2",
          "title": "Interpreting Partial Coefficients",
          "order": 2,
          "description": "This lecture focuses on the specific meaning of regression weights when other variables are present in the model, addressing the common 'ceteris paribus' interpretation.",
          "sessions": [
            {
              "sessionId": "bd3f6096-2b50-4839-af45-64de8b4603d5",
              "title": "The 'Holding Others Constant' Intuition",
              "session_type": "whiteboard",
              "description": "This session explores what happens to a coefficient's meaning when a second variable is added to the model. You will gain a deep understanding of partial slopes and how they differ from simple correlation coefficients. T",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Contrast the slope of X1 in a simple model vs. its slope in an MLR model with a correlated X2.",
                  "Verbally explain a coefficient to a non-technical stakeholder using the 'all else equal' phrasing."
                ]
              }
            },
            {
              "sessionId": "742a8f3a-49a1-40b9-83de-513dc0228ba3",
              "title": "The Geometry of Projections",
              "session_type": "whiteboard",
              "description": "You will learn how MLR works through the lens of linear algebra, specifically the projection of the target vector onto the column space of predictors. You will be able to visualize the OLS solution as the point in the 'p",
              "depthTags": [
                "derivation",
                "advanced"
              ],
              "practice": {
                "tasks": [
                  "Draw a vector diagram showing the projection of Y onto a 2D subspace.",
                  "Identify the geometric relationship between the residual vector and the predictor space."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit3Lecture3",
          "title": "The Addition of Categorical Predictors",
          "order": 3,
          "description": "Regression isn't just for continuous numbers; this lecture introduces how to incorporate qualitative information using indicator variables.",
          "sessions": [
            {
              "sessionId": "4f11afac-15a8-4f36-8927-8ea17b75d5c1",
              "title": "Dummy Variables and Reference Levels",
              "session_type": "whiteboard",
              "description": "This session teaches you how to convert categories (like 'City' or 'Gender') into numbers that a regression model can process. You will learn how to set a reference level and interpret the resulting intercept shifts. Thi",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Create a dummy coding scheme for a variable with three levels: Red, Green, Blue.",
                  "Calculate the predicted value for a specific category based on the dummy coefficients."
                ]
              }
            },
            {
              "sessionId": "6f99ca46-c205-41b6-9c42-e7feb1b178af",
              "title": "Parallel Slopes Models",
              "session_type": "whiteboard",
              "description": "You will explore models that combine a continuous predictor with a categorical one, visualizing how the regression line 'jumps' for different groups. You will be able to identify when groups share the same relationship w",
              "depthTags": [
                "intuition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Sketch two parallel lines representing two different categorical groups in a model.",
                  "Explain why the slopes are assumed to be equal in this specific model type."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit3Lecture4",
          "title": "The Concept of Interaction",
          "order": 4,
          "description": "This lecture introduces the idea that the effect of one variable might depend on the value of another, moving beyond simple additive models.",
          "sessions": [
            {
              "sessionId": "7219b276-487e-4836-a4a1-9896350a3fc6",
              "title": "When Slopes Are Not Parallel",
              "session_type": "whiteboard",
              "description": "In this session, you will learn to identify cases where a 'one-size-fits-all' slope is insufficient to describe data relationships. You will understand how interaction terms allow the relationship between X and Y to chan",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Identify a real-world scenario (e.g., medicine dosage) where an interaction likely exists.",
                  "Draw a cross-over interaction plot."
                ]
              }
            },
            {
              "sessionId": "3866adb8-2d10-4f5e-928f-3afecf196255",
              "title": "Interpreting Interaction Coefficients",
              "session_type": "whiteboard",
              "description": "This session provides the formal method for reading and explaining interaction terms in a regression output. You will be able to calculate the 'conditional' slope for different subgroups and explain the results in plain ",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Derive the conditional slope equation from a model with an interaction term.",
                  "Explain a negative interaction coefficient between two positive predictors."
                ]
              }
            }
          ]
        }
      ],
      "projects": [
        {
          "stage_id": "383c87c4-4411-4aaa-8328-8826ab252456",
          "stage_title": "The Multi-Dimensional Upgrade"
        }
      ],
      "exams": [
        {
          "examId": "e2",
          "title": "Multiple Regression Mastery Exam"
        }
      ]
    },
    {
      "unitId": "unit4",
      "title": "Diagnostic Thinking: Assessing Model Health",
      "description": "Learn to look beyond R-squared. We dive into residual plots, p-values, and the F-test to determine if a model is trustworthy or misleading.",
      "lectures": [
        {
          "lectureId": "unit4Lecture1",
          "title": "The Truth in the Residuals",
          "order": 1,
          "description": "Before trusting a single number, we look at the 'noise' left behind by the model. This lecture focuses on visualizing error patterns to identify fundamental model failures.",
          "sessions": [
            {
              "sessionId": "4f108e72-27e1-4afc-b49f-abf53bcb2389",
              "title": "Anatomy of a Residual Plot",
              "session_type": "whiteboard",
              "description": "This session teaches you how to construct and interpret a residual plot as the primary diagnostic tool for regression. You will learn to recognize what a 'healthy' plot looks like—a random cloud of points—and why any dis",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Identify three common visual patterns in residual plots that indicate a bad model fit.",
                  "Sketch a residual plot for a model that has failed to capture a non-linear relationship."
                ]
              }
            },
            {
              "sessionId": "4b8aac3d-3a96-4b6b-b69a-934ed286770d",
              "title": "Detecting Heteroscedasticity",
              "session_type": "whiteboard",
              "description": "In this session, we tackle the problem of 'unequal variance' or heteroscedasticity. You will learn to spot the classic 'funnel' shape in residual plots and understand why this makes your standard errors and p-values unre",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Contrast a homoscedastic residual plot with a heteroscedastic one.",
                  "Explain why heteroscedasticity doesn't bias the coefficients but does break the hypothesis tests."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit4Lecture2",
          "title": "Statistical Significance and the P-Value Logic",
          "order": 2,
          "description": "We move from visual inspection to formal hypothesis testing to determine if the relationship we've found is real or just a coincidence of the data.",
          "sessions": [
            {
              "sessionId": "f4d725c5-a085-4503-89df-8427a9e67dae",
              "title": "The Null Hypothesis for Regression Coefficients",
              "session_type": "whiteboard",
              "description": "This session introduces the formal logic of the T-test applied to regression coefficients. You will learn how to set up the null hypothesis (that the slope is zero) and how the T-statistic measures the distance between y",
              "depthTags": [
                "definition",
                "derivation"
              ],
              "practice": {
                "tasks": [
                  "Formulate the null and alternative hypotheses for a specific slope coefficient.",
                  "Calculate a T-statistic given a coefficient estimate and its standard error."
                ]
              }
            },
            {
              "sessionId": "c951c1b6-2257-4a42-af6a-ce2c84fdc69f",
              "title": "Interpreting P-Values Without the Myths",
              "session_type": "whiteboard",
              "description": "You will learn the precise definition of a P-value and, more importantly, what it is not. This session clarifies the 0.05 threshold and teaches you how to interpret 'significance' in the context of the effect size. This ",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Draft a one-sentence interpretation of a p-value of 0.03 for a specific variable.",
                  "Explain the difference between statistical significance and practical importance."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit4Lecture3",
          "title": "Evaluating the Model as a Whole",
          "order": 3,
          "description": "While individual variables might be significant, we need a way to test if the entire collection of predictors provides real value.",
          "sessions": [
            {
              "sessionId": "87c683f7-c33f-40f0-b71c-8843c429595f",
              "title": "The Global F-Test",
              "session_type": "whiteboard",
              "description": "This session teaches you how to perform the F-test to assess the overall model significance. You will learn how this 'omnibus' test compares your model against a 'mean-only' model to see if your predictors collectively r",
              "depthTags": [
                "definition",
                "derivation"
              ],
              "practice": {
                "tasks": [
                  "Compare the utility of a T-test versus an F-test in Multiple Linear Regression.",
                  "Identify a scenario where individual variables are insignificant but the F-test is significant."
                ]
              }
            },
            {
              "sessionId": "17231e28-6fc7-4c9a-8678-1fff5c25db2c",
              "title": "The R-Squared Trap",
              "session_type": "whiteboard",
              "description": "You will learn the definition of R-squared and Adjusted R-squared, specifically focusing on why a high R-squared can be deceptive. This session teaches you how to use R-squared as a measure of fit while maintaining the '",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Calculate Adjusted R-squared and explain why it penalizes adding useless variables.",
                  "Provide an example of a high R-squared model that is fundamentally flawed."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit4Lecture4",
          "title": "Assumptions and Influential Points",
          "order": 4,
          "description": "We conclude the diagnostic unit by checking the distribution of our errors and identifying data points that might be pulling the line too hard.",
          "sessions": [
            {
              "sessionId": "46f96c2c-907a-412c-9f77-c9d0c2b40402",
              "title": "Normality of Residuals",
              "session_type": "whiteboard",
              "description": "This session explores the assumption that residuals are normally distributed. You will learn to use Q-Q plots and histograms to check this assumption and understand why it matters for the validity of your hypothesis test",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Interpret a Q-Q plot showing heavy tails.",
                  "Discuss how the Central Limit Theorem helps when residuals aren't perfectly normal."
                ]
              }
            },
            {
              "sessionId": "6404844f-4fcd-4aa3-97d3-9254a1d844e9",
              "title": "Outliers, Leverage, and Influence",
              "session_type": "whiteboard",
              "description": "You will learn the difference between an outlier (y-direction) and a high-leverage point (x-direction), and how to identify points that have a disproportionate influence on your model's results. This session teaches you ",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Define leverage and influence in your own words.",
                  "Sketch a scenario where a single outlier significantly changes the slope of the regression line."
                ]
              }
            }
          ]
        }
      ],
      "projects": [
        {
          "stage_id": "bf175c0e-4f0f-4adf-a343-6cd6d59371d3",
          "stage_title": "Model Stress Test & Diagnostics"
        }
      ],
      "exams": [
        {
          "examId": "e3",
          "title": "Model Health Diagnostic Exam"
        }
      ]
    },
    {
      "unitId": "unit5",
      "title": "From Math to Software: Mastering Model Outputs",
      "description": "A hands-on walkthrough of standardized output tables from tools like R (tidymodels) and Python (statsmodels) to bridge the gap to practice.",
      "lectures": [
        {
          "lectureId": "unit5Lecture1",
          "title": "Anatomy of a Regression Summary",
          "order": 1,
          "description": "This lecture demystifies the dense text output generated by statistical software, teaching you how to quickly locate and verify the most critical numbers.",
          "sessions": [
            {
              "sessionId": "5e796e43-8ad3-47c2-9a89-1f5553ecad23",
              "title": "The Big Three: Coefficients, SE, and T-Stats",
              "session_type": "whiteboard",
              "description": "In this session, you will learn to navigate the central table of a regression output, focusing on the estimate, standard error, and the resulting t-statistic. You will gain the ability to explain how these three numbers ",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Locate the coefficient for a specific predictor in a provided screenshot of a statsmodels table.",
                  "Calculate a t-statistic manually using the provided Estimate and Std. Error values."
                ]
              }
            },
            {
              "sessionId": "45d76172-0f49-411a-a8a1-f6bf2372a869",
              "title": "The Confidence Interval: Range of Plausibility",
              "session_type": "whiteboard",
              "description": "This session teaches you how to interpret the 95% confidence interval columns found in modern software summaries. You will be able to determine whether an effect is not only statistically significant but also practically",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Identify if a coefficient is significant by checking if the confidence interval crosses zero.",
                  "Compare two models' intervals to determine which estimate is more precise."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit5Lecture2",
          "title": "Global Metrics: Is the Model Any Good?",
          "order": 2,
          "description": "Moving beyond individual variables, this lecture focuses on the 'Top-Level' metrics that describe the overall health and fit of the entire regression model.",
          "sessions": [
            {
              "sessionId": "46bbc38d-9806-4a0c-acc7-e1fb4de61de9",
              "title": "Deconstructing R-Squared and Adjusted R-Squared",
              "session_type": "whiteboard",
              "description": "This session explains the difference between the standard R-squared and the Adjusted R-squared reported in software summaries. You will learn why Adjusted R-squared is the more honest metric in Multiple Linear Regression",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Compare R-squared vs. Adjusted R-squared for a model with 20 predictors.",
                  "Predict how R-squared changes when a random noise variable is added to the model."
                ]
              }
            },
            {
              "sessionId": "bbffc0dd-8782-4dd5-adf6-a6579fbdbfd5",
              "title": "Information Criteria: Intro to AIC and BIC",
              "session_type": "whiteboard",
              "description": "You will be introduced to AIC and BIC, the metrics used for model comparison that you will see in every professional stats summary. You will gain the ability to use these scores to select the 'best' model among several c",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Rank three different model summaries from best to worst using only AIC values.",
                  "Identify which criterion (AIC or BIC) provides a harsher penalty for model size."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit5Lecture3",
          "title": "Workflow Integration: From Code to Insights",
          "order": 3,
          "description": "This lecture focuses on the practical execution in Python and R, ensuring you can generate these summaries yourself and extract the data programmatically.",
          "sessions": [
            {
              "sessionId": "2168349d-cae0-4a40-b39b-1023b29c6bc5",
              "title": "Generating Reports in Python and R",
              "session_type": "whiteboard",
              "description": "In this session, you will see the specific code snippets required to run a regression and print a summary using Python's statsmodels and R's tidymodels. You will be able to set up a basic modeling workflow and interpret ",
              "depthTags": [
                "application"
              ],
              "practice": {
                "tasks": [
                  "Write the line of code in Python to extract the p-values from a fitted model object.",
                  "Identify the R function used to turn a messy summary into a clean tibble."
                ]
              }
            },
            {
              "sessionId": "f5169a93-f1a8-4656-b7d1-41eab45e59ee",
              "title": "Standard Errors and Robust Options",
              "session_type": "whiteboard",
              "description": "This session introduces the concept of 'Robust' standard errors, which often appear as options in software like Stata or R. You will learn why a practitioner might click the 'robust' button and how it changes the interpr",
              "depthTags": [
                "advanced",
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Spot the difference in SE values between a standard OLS run and a robust HC3 run.",
                  "Explain when to use robust errors based on a residual plot."
                ]
              }
            }
          ]
        }
      ],
      "projects": [],
      "exams": [
        {
          "examId": "e4",
          "title": "Unit 5 Comprehensive Assessment: Interpreting Software Summaries"
        }
      ]
    },
    {
      "unitId": "unit6",
      "title": "Real-World Complexity: Collinearity and Interactions",
      "description": "We tackle the problems that arise with messy, real-world data, including variables that move together and effects that depend on one another.",
      "lectures": [
        {
          "lectureId": "unit6Lecture1",
          "title": "The Problem of Overlapping Information: Multicollinearity",
          "order": 1,
          "description": "This lecture explains what happens when predictors are highly correlated and why this destabilizes our model estimates.",
          "sessions": [
            {
              "sessionId": "19c32b95-c889-4026-81ab-3cc143939be0",
              "title": "The Geometry of Redundancy",
              "session_type": "whiteboard",
              "description": "This session teaches you how to visualize multicollinearity as overlapping vectors in high-dimensional space. You will understand why the model struggles to assign 'credit' to individual variables when they move in uniso",
              "depthTags": [
                "intuition",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Identify perfectly collinear variables in a sample data frame.",
                  "Sketch the projection of a response variable onto two nearly parallel predictor vectors."
                ]
              }
            },
            {
              "sessionId": "ba462aad-ffaf-45cd-889d-ce46dfec1eb9",
              "title": "Detecting Hidden Correlation with VIF",
              "session_type": "whiteboard",
              "description": "This session introduces the Variance Inflation Factor (VIF) as a mathematical diagnostic for redundancy. You will learn how to calculate and interpret VIF scores to decide when a variable must be removed or combined, mov",
              "depthTags": [
                "derivation",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Calculate VIF for a simple three-variable system.",
                  "Determine the exclusion threshold for a real-world messy dataset summary."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit6Lecture2",
          "title": "Synergy in Data: Modeling Interactions",
          "order": 3,
          "description": "We move beyond additive models to explore cases where the effect of one variable depends on the level of another.",
          "sessions": [
            {
              "sessionId": "f7d8678a-8dbc-4e97-89d5-3cad1200c181",
              "title": "The Intuition of Synergy",
              "session_type": "whiteboard",
              "description": "This session teaches you the conceptual difference between additive effects and interaction effects using real-world examples like dosage and body weight. You will learn to recognize when simple addition fails to capture",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Compare additive vs interaction predictions for a specific data point.",
                  "Identify real-world examples where 'it depends' logic applies."
                ]
              }
            },
            {
              "sessionId": "bb79f685-db10-448c-998c-be9536b825a0",
              "title": "Mathematical Formulation of Interaction Terms",
              "session_type": "whiteboard",
              "description": "This session covers the technical side of adding product terms (X1 * X2) to your regression equation. You will gain the ability to derive the changing slope of one variable relative to another, enabling you to build more",
              "depthTags": [
                "derivation",
                "definition"
              ],
              "practice": {
                "tasks": [
                  "Write out the full regression equation for a model with two continuous predictors and their interaction.",
                  "Calculate the partial derivative of the response with respect to one variable."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit6Lecture3",
          "title": "Interpreting Complex Models in Practice",
          "order": 4,
          "description": "A practical focus on how to explain interaction coefficients and multicollinearity impacts to stakeholders.",
          "sessions": [
            {
              "sessionId": "2319da45-6aa7-4e9f-b755-5ca698eb3141",
              "title": "Centering Variables for Clarity",
              "session_type": "whiteboard",
              "description": "This session teaches you the technique of mean-centering continuous variables before creating interactions. You will learn how this reduces structural multicollinearity and makes the 'main effect' coefficients much easie",
              "depthTags": [
                "application",
                "advanced"
              ],
              "practice": {
                "tasks": [
                  "Transform a raw dataset into mean-centered variables.",
                  "Re-interpret a coefficient from a centered model."
                ]
              }
            },
            {
              "sessionId": "842b57ed-f6f9-4125-823f-babcd1d364bb",
              "title": "The Hierarchy Principle",
              "session_type": "whiteboard",
              "description": "This session explains why you must almost always include main effects when including an interaction term. You will learn the 'Hierarchy Principle' of modeling, which ensures your models remain mathematically sound and lo",
              "depthTags": [
                "definition",
                "application"
              ],
              "practice": {
                "tasks": [
                  "Evaluate a provided model summary for violations of hierarchy.",
                  "Correct a 'bad' model by re-adding missing main effects."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit6Lecture4",
          "title": "Practical Diagnostic Workflow",
          "order": 5,
          "description": "This lecture synthesizes the unit's concepts into a step-by-step checklist for cleaning and validating a multiple regression model.",
          "sessions": [
            {
              "sessionId": "0c30a67c-4a16-48aa-b4c9-4138139f5c8e",
              "title": "The Multi-Step Diagnostic Checklist",
              "session_type": "whiteboard",
              "description": "This session teaches you a systematic workflow for checking VIF, adding interactions, and checking residual health in sequence. You will walk away with a professional-grade protocol for refining models, bridging the gap ",
              "depthTags": [
                "application"
              ],
              "practice": {
                "tasks": [
                  "Sequence a series of diagnostic tests for a new dataset.",
                  "Propose a fix for a model with high VIF and non-linear patterns."
                ]
              }
            }
          ]
        }
      ],
      "projects": [
        {
          "stage_id": "f7b8e98b-a4ee-4136-9681-5004d9552bde",
          "stage_title": "Collinearity Filtering"
        }
      ],
      "exams": [
        {
          "examId": "e5",
          "title": "Complexity and Interaction Assessment"
        }
      ]
    },
    {
      "unitId": "unit7",
      "title": "Robustness and Regularization: Moving Toward Modern DS",
      "description": "An introduction to Ridge and Lasso regression as 'anchors' that prevent models from overreacting to noise in high-dimensional data.",
      "lectures": [
        {
          "lectureId": "unit7Lecture1",
          "title": "The Price of Complexity: The Bias-Variance Tradeoff",
          "order": 1,
          "description": "Before introducing solutions, we must understand the fundamental tension between a model's flexibility and its ability to generalize to new data.",
          "sessions": [
            {
              "sessionId": "7955b0d4-6aec-4d26-8bd8-291b9faf637f",
              "title": "Complexity and Overfitting",
              "session_type": "whiteboard",
              "description": "This session introduces the concept of overfitting through the lens of model complexity, teaching you how a model that follows data points too closely captures noise rather than signals. You will learn to identify the sy",
              "depthTags": [
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Sketch a high-degree polynomial fit vs. a linear fit and identify which captures noise.",
                  "Predict how a high-variance model would perform on a fresh test dataset."
                ]
              }
            },
            {
              "sessionId": "4400c825-7800-451e-b0fc-5eee10376482",
              "title": "The Bias-Variance Decomposition",
              "session_type": "whiteboard",
              "description": "In this session, we formally decompose total error into bias and variance, explaining the mathematical trade-off that occurs when you simplify or complicate a model. You will gain the ability to reason about where a mode",
              "depthTags": [
                "definition",
                "derivation"
              ],
              "practice": {
                "tasks": [
                  "Label a bullseye diagram with examples of high bias/low variance and low bias/high variance.",
                  "Calculate total error given hypothetical values for bias, variance, and irreducible error."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit7Lecture2",
          "title": "Shrinkage Methods: Ridge and Lasso",
          "order": 2,
          "description": "We introduce regularization as a mathematical penalty on large coefficients, effectively 'anchoring' the model to prevent extreme fluctuations.",
          "sessions": [
            {
              "sessionId": "ecfd55bf-72e3-4f1c-829a-28935f9eaa26",
              "title": "Ridge Regression and the L2 Penalty",
              "session_type": "whiteboard",
              "description": "This session covers Ridge regression, explaining how adding a squared penalty term to the OLS cost function shrinks coefficients toward zero. You will understand how this 'L2 norm' stabilizes models in the presence of mu",
              "depthTags": [
                "definition",
                "intuition"
              ],
              "practice": {
                "tasks": [
                  "Write the Ridge cost function by adding the penalty term to the OLS objective.",
                  "Describe the effect on coefficients as the tuning parameter lambda increases."
                ]
              }
            },
            {
              "sessionId": "9827cc7d-2523-4616-8be5-fe2843075d06",
              "title": "Lasso Regression and Feature Selection",
              "session_type": "whiteboard",
              "description": "We explore Lasso regression and its unique L1 penalty, which can force coefficients to be exactly zero. You will learn how Lasso acts as an automated feature selection tool, enabling you to simplify complex models and id",
              "depthTags": [
                "definition",
                "advanced"
              ],
              "practice": {
                "tasks": [
                  "Compare the L1 and L2 penalty shapes geometrically.",
                  "Identify a scenario where Lasso would be preferred over Ridge for model interpretability."
                ]
              }
            }
          ]
        },
        {
          "lectureId": "unit7Lecture3",
          "title": "Tuning and Validation: Finding the Right Balance",
          "order": 3,
          "description": "Learn the practical workflow for selecting the best regularization strength using modern cross-validation techniques.",
          "sessions": [
            {
              "sessionId": "8417398a-b253-4a07-8314-593269315056",
              "title": "Cross-Validation for Lambda Selection",
              "session_type": "whiteboard",
              "description": "This session teaches you how to use K-fold cross-validation to choose the optimal value for the tuning parameter lambda. You will learn the 'Goldilocks' principle of model tuning, ensuring you don't over-regularize (unde",
              "depthTags": [
                "application"
              ],
              "practice": {
                "tasks": [
                  "Draw the process of K-fold cross-validation.",
                  "Interpret a plot of cross-validated error vs. log(lambda) to pick the best model."
                ]
              }
            },
            {
              "sessionId": "04155065-34f2-4c74-b22c-1e8d1cce86ed",
              "title": "The Road Ahead: From Regression to Modern ML",
              "session_type": "whiteboard",
              "description": "In the final session of the course, we synthesize everything from the best-fit line to regularization, situating linear regression within the broader machine learning landscape. You will see how the foundations you've bu",
              "depthTags": [
                "intuition",
                "advanced"
              ],
              "practice": {
                "tasks": [
                  "Summarize the transition from simple OLS to regularized MLR.",
                  "Identify which course concepts apply to non-linear modeling."
                ]
              }
            }
          ]
        }
      ],
      "projects": [
        {
          "stage_id": "c149eb20-523a-47cd-9162-0468753f5e66",
          "stage_title": "Regularization for Robustness"
        }
      ],
      "exams": [
        {
          "examId": "e6",
          "title": "Unit 7 Comprehensive Exam: Robustness and Regularization"
        }
      ]
    }
  ]
};
