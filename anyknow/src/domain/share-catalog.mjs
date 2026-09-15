/** Leftover share dumps, system/tool prompts already stripped. */

export const PONG = {
  "id": "4e1e93da-fa83-4196-bd61-539eb25aa5f3",
  "title": "Pong Command Response",
  "messages": [
    {
      "role": "user",
      "text": "Reply with exactly: PONG"
    },
    {
      "role": "assistant",
      "text": "PONG"
    }
  ]
};

export const QUICKSORT = {
  "id": "quicksort",
  "title": "Quicksort Partition Animation",
  "messages": [
    {
      "role": "user",
      "text": "Visualize how quicksort partitions an array with an animation"
    },
    {
      "role": "assistant",
      "text": "Quicksort is a highly efficient, \"divide and conquer\" sorting algorithm. At its heart lies the **partition** process—a clever way of organizing elements so that the algorithm can solve smaller sub-problems independently.\n\n### What is Partitioning?\n\n<div content-section=\"definition\">\n<p><strong>Partitioning</strong> is the procedure of rearranging an array (or a portion of it) around a specific element called the <strong>pivot</strong>. After a partition, the pivot is in its final sorted position, with all smaller elements to its left and all larger elements to its right.</p>\n</div>\n\nThink of partitioning like a librarian organizing a shelf of books by height. They pick one book as a reference (the pivot). Every book shorter than the reference goes to the left side, and every book taller goes to the right. Even if the left and right groups aren't perfectly sorted yet, the reference book itself is exactly where it needs to be.\n\n### How the Partition Mechanism Works\n\nTo understand the movement, we usually look at the **Lomuto Partition Scheme**, which is one of the most common ways to implement this logic. Here is how it flows:\n\n1.  **Select a Pivot:** Usually, the last element in the array is chosen as the pivot.\n2.  **The Pointer Chase:** We use two pointers. One pointer ($j$) scans through the array looking for elements smaller than the pivot. The other pointer ($i$) marks the \"boundary\" of the smaller-element zone.\n3.  **Swapping:** Whenever $j$ finds an element smaller than the pivot, we expand the \"small zone\" by incrementing $i$ and swapping the elements at $i$ and $j$.\n4.  **The Final Swap:** Once $j$ reaches the end, the pivot is swapped into the position right after the \"small zone.\"\n\n<div content-section=\"important_takeaways\">\n<ul>\n<li><strong>The Pivot's Finality:</strong> Once a partition is complete, the pivot element never moves again. It is officially \"sorted.\"</li>\n<li><strong>Divide and Conquer:</strong> The algorithm then repeats this same process on the left and right sub-arrays until the entire list is organized.</li>\n<li><strong>In-place:</strong> One of Quicksort's biggest advantages is that it sorts the array without needing extra memory for new lists.</li>\n</ul>\n</div>\n\n### Visualizing the Partition in Action\n\nTo help you see exactly how these pointers move and how the \"swapping\" happens in real-time, I have prepared an animation of the process. Pay close attention to how the \"pivot\" (highlighted) stays at the end until its final spot is cleared for it.\n\nThe logic we just observed is summarized in the following flow, which shows how the algorithm recursively breaks the problem down:\n\nI have finished explaining the partitioning mechanism and providing the visualization you requested. You can now explore how this logic scales to larger datasets or move on to comparing Quicksort with other algorithms like Mergesort."
    }
  ]
};

export const SOCIOLOGY_COURSE = {
  "id": "mkt-sociology",
  "title": "Introduction to Sociology",
  "description": "A comprehensive exploration of the fundamental concepts, theories, and research methods in sociology. This course examines how social structures, culture, and institutions shape individual lives and collective behavior, providing students with the 'sociological imagination' necessary to analyze the world around them.",
  "units": [
    {
      "title": "The Sociological Perspective",
      "lectures": 3
    },
    {
      "title": "Culture and the Self",
      "lectures": 3
    },
    {
      "title": "Inequality",
      "lectures": 3
    },
    {
      "title": "Institutions",
      "lectures": 3
    },
    {
      "title": "Deviance and Social Change",
      "lectures": 3
    }
  ]
};

export const SHARE_CONVERSATIONS = [PONG, QUICKSORT];
export const SHARE_COURSES = [SOCIOLOGY_COURSE];