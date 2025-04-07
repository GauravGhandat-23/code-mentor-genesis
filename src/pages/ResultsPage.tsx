
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import UserNavbar from "@/components/UserNavbar";
import { useGroqClient } from "@/hooks/useGroqClient";

const ResultsPage = () => {
  const { testId } = useParams();
  const groqClient = useGroqClient();
  
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState<any>(null);
  const [explanationLoading, setExplanationLoading] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setResultData({
        title: "Advanced Algorithm Concepts",
        totalQuestions: 5,
        correctAnswers: 3,
        score: 60,
        timeSpent: "22:15",
        date: "April 7, 2025",
        questions: [
          {
            id: 1,
            question: "What is the time complexity of the quicksort algorithm in the average case?",
            yourAnswer: "O(n log n)",
            correctAnswer: "O(n log n)",
            isCorrect: true,
            explanation: "",
            points: 20,
            type: "mcq"
          },
          {
            id: 2,
            question: "Explain how the Dijkstra's algorithm works and when it might fail.",
            yourAnswer: "Dijkstra's algorithm is a shortest path algorithm that uses a priority queue to find the shortest path from a source node to all other nodes in a graph. It fails when there are negative edge weights.",
            correctAnswer: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph. It uses a priority queue to greedily select the next vertex with the minimum distance. The algorithm fails when the graph contains negative edge weights because it can lead to incorrect path selections.",
            isCorrect: false,
            explanation: "",
            points: 10,
            earnedPoints: 6,
            type: "text"
          },
          {
            id: 3,
            question: "Implement a function to find the longest common subsequence of two strings.",
            yourAnswer: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}`,
            correctAnswer: "Correct implementation of LCS using dynamic programming",
            isCorrect: true,
            explanation: "",
            points: 30,
            earnedPoints: 30,
            type: "code"
          },
          {
            id: 4,
            question: "Which of the following is NOT a valid approach for balancing a binary search tree?",
            yourAnswer: "B-tree splitting",
            correctAnswer: "Heap insertion",
            isCorrect: false,
            explanation: "",
            points: 20,
            earnedPoints: 0,
            type: "mcq"
          },
          {
            id: 5,
            question: "Describe the advantages and disadvantages of using a hash table compared to a balanced binary search tree.",
            yourAnswer: "Hash tables have O(1) lookup time but don't preserve order. BSTs have O(log n) lookup but maintain sorted order.",
            correctAnswer: "Hash tables provide average O(1) time complexity for search, insert and delete operations, but they don't preserve element ordering and can degrade to O(n) in worst cases with poor hash functions. BSTs guarantee O(log n) operations and maintain sorted order, allowing for efficient range queries, but have higher space overhead and are generally slower for single-element operations.",
            isCorrect: true,
            explanation: "",
            points: 20,
            earnedPoints: 15,
            type: "text"
          }
        ]
      });
      setLoading(false);
    }, 1500);
  }, [testId]);
  
  const generateExplanation = async (questionId: number) => {
    setExplanationLoading(prev => ({ ...prev, [questionId]: true }));
    
    const question = resultData.questions.find((q: any) => q.id === questionId);
    
    try {
      // In a real implementation, we would call the Groq API here
      // This is a mock implementation
      console.log(`Generating explanation for question ${questionId} using Groq API`);
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated explanation
      let explanation = "";
      
      if (question.type === "mcq" && question.id === 1) {
        explanation = "The time complexity of QuickSort is O(n log n) in the average case. This is because:\n\n1. Each partition divides the array into two parts\n2. In an average scenario, these partitions are reasonably balanced\n3. The algorithm performs log n levels of recursive calls\n4. At each level, n elements are processed\n\nThis gives us a time complexity of O(n log n). In the worst case (when the pivot is always the smallest or largest element), QuickSort degrades to O(n²).";
      } else if (question.type === "mcq" && question.id === 4) {
        explanation = "The correct answer is 'Heap insertion'. This is because:\n\n- Heaps are not designed to balance binary search trees. They are a different data structure entirely with different properties.\n- AVL rotations, Red-Black tree insertions, and B-tree splitting are all valid techniques for maintaining balance in their respective tree structures.\n- AVL trees use rotations to rebalance after insertions or deletions.\n- Red-Black trees use color properties and rotations to maintain balance.\n- B-trees use splitting and merging of nodes to maintain balance, particularly in disk-based storage systems.";
      } else if (question.type === "text" && question.id === 2) {
        explanation = "Dijkstra's algorithm is a greedy algorithm that finds the shortest path from a source node to all other nodes in a weighted graph. It works as follows:\n\n1. Initialize distances of all vertices as infinite and distance of source as 0\n2. Create a priority queue and insert the source vertex with distance 0\n3. While the priority queue is not empty:\n   a. Extract the minimum distance vertex\n   b. For each adjacent vertex, update its distance if going through the current vertex yields a shorter path\n\nDijkstra's algorithm fails when there are negative edge weights because it assumes that adding an edge to a path cannot decrease the path's length. With negative edges, a longer path might actually be shorter in total weight, which violates the greedy choice property that Dijkstra relies on.\n\nFor graphs with negative edges, the Bellman-Ford algorithm should be used instead.";
      } else if (question.type === "text" && question.id === 5) {
        explanation = "Hash Tables vs. Balanced BSTs:\n\n**Hash Table Advantages:**\n- O(1) average time complexity for insert, delete, and search operations\n- Generally simpler implementation for basic use cases\n- Lower memory overhead per element when implemented efficiently\n- Better cache performance for lookups due to direct addressing\n\n**Hash Table Disadvantages:**\n- Does not maintain element ordering\n- Cannot efficiently support range queries or finding closest elements\n- Performance degrades with poor hash functions or high collision rates\n- Worst-case time complexity can be O(n) if many collisions occur\n- May require periodic rehashing as it fills up\n\n**BST Advantages:**\n- Maintains elements in sorted order\n- Supports efficient range queries (e.g., find all elements between x and y)\n- Can find floor/ceiling values efficiently\n- Guaranteed O(log n) operations regardless of input distribution\n- No issues with hash collisions or functions\n\n**BST Disadvantages:**\n- Operations are O(log n) rather than O(1)\n- Higher memory overhead due to pointers/references\n- More complex implementation, especially for self-balancing trees\n- May suffer from cache inefficiency due to pointer chasing\n\nChoosing between them depends on whether you need ordered traversal, range queries, or guaranteed worst-case performance (BST) versus fastest average lookup with no ordering requirements (hash table).";
      } else if (question.type === "code") {
        explanation = "Your implementation of the Longest Common Subsequence is correct and efficient. Here's a detailed explanation:\n\n1. You've correctly used a 2D dynamic programming approach where dp[i][j] represents the length of LCS of text1[0...i-1] and text2[0...j-1].\n\n2. The recurrence relation is properly implemented:\n   - If the current characters match (text1[i-1] === text2[j-1]), we add 1 to the LCS of the strings without these characters: dp[i][j] = dp[i-1][j-1] + 1\n   - If they don't match, we take the maximum LCS when excluding either the current character from text1 or text2: dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])\n\n3. Time complexity is O(m×n) where m and n are the lengths of the input strings.\n4. Space complexity is also O(m×n) for the DP table.\n\nPossible optimization: If space is a concern, you could optimize to use only O(min(m,n)) space by keeping just two rows of the DP table in memory at a time.";
      }
      
      // Update the question with the explanation
      const updatedQuestions = resultData.questions.map((q: any) => {
        if (q.id === questionId) {
          return { ...q, explanation };
        }
        return q;
      });
      
      setResultData({
        ...resultData,
        questions: updatedQuestions
      });
      
    } catch (error) {
      console.error("Error generating explanation:", error);
    } finally {
      setExplanationLoading(prev => ({ ...prev, [questionId]: false }));
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-4">Loading Results...</div>
          <Progress value={30} className="w-80 h-2" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Test Results</h1>
            <p className="text-slate-600 mt-1">{resultData.title} • {resultData.date}</p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
            <Button 
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              asChild
            >
              <Link to="/dashboard">
                Back to Dashboard
              </Link>
            </Button>
            
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link to="/new-test">
                Start Another Test
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{resultData.score}%</div>
              <Progress value={resultData.score} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Correct Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {resultData.correctAnswers}/{resultData.totalQuestions}
              </div>
              <Progress 
                value={(resultData.correctAnswers / resultData.totalQuestions) * 100} 
                className="h-2 mt-2 bg-green-100" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Time Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">{resultData.timeSpent}</div>
              <div className="text-sm text-slate-500 mt-2">minutes</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">Top 35%</div>
              <div className="text-sm text-slate-500 mt-2">among peers</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="questions" className="mb-8">
          <TabsList className="mb-8">
            <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
            <TabsTrigger value="summary">Performance Summary</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions">
            <div className="space-y-8">
              {resultData.questions.map((question: any, index: number) => (
                <Card key={question.id} className={`border-l-4 ${
                  question.isCorrect 
                    ? "border-l-green-500" 
                    : "border-l-red-500"
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        question.isCorrect 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {question.isCorrect 
                          ? `Correct (${question.earnedPoints || question.points}/${question.points})` 
                          : `Incorrect (${question.earnedPoints || 0}/${question.points})`
                        }
                      </div>
                    </div>
                    <CardDescription className="text-base font-medium text-slate-700">
                      {question.question}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-500 mb-2">Your Answer:</div>
                      <div className={`p-3 rounded-md ${
                        question.isCorrect 
                          ? "bg-green-50 border border-green-100" 
                          : "bg-red-50 border border-red-100"
                      }`}>
                        {question.type === "code" ? (
                          <pre className="whitespace-pre-wrap text-sm font-mono">{question.yourAnswer}</pre>
                        ) : (
                          <div className="whitespace-pre-wrap">{question.yourAnswer}</div>
                        )}
                      </div>
                    </div>
                    
                    {!question.isCorrect && (
                      <div>
                        <div className="text-sm font-medium text-slate-500 mb-2">Correct Answer:</div>
                        <div className="p-3 bg-green-50 border border-green-100 rounded-md whitespace-pre-wrap">
                          {question.correctAnswer}
                        </div>
                      </div>
                    )}
                    
                    {!question.explanation && (
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                        onClick={() => generateExplanation(question.id)}
                        disabled={explanationLoading[question.id]}
                      >
                        {explanationLoading[question.id] ? "Generating Explanation..." : "Generate AI Explanation"}
                      </Button>
                    )}
                    
                    {question.explanation && (
                      <div>
                        <div className="text-sm font-medium text-slate-500 mb-2">AI Explanation:</div>
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                          <div className="whitespace-pre-wrap text-slate-700">{question.explanation}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                  <CardDescription>Breakdown of your performance by topic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { topic: "Algorithm Complexity", score: 90 },
                    { topic: "Graph Algorithms", score: 60 },
                    { topic: "Dynamic Programming", score: 85 },
                    { topic: "Data Structures", score: 40 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium">{item.topic}</div>
                        <div className="text-sm font-medium">{item.score}%</div>
                      </div>
                      <Progress 
                        value={item.score} 
                        className={`h-2 ${
                          item.score >= 80 ? "bg-green-100" : 
                          item.score >= 60 ? "bg-amber-100" : 
                          "bg-red-100"
                        }`} 
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skill Assessment</CardTitle>
                  <CardDescription>Evaluation of your coding abilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { 
                        skill: "Problem Understanding", 
                        score: 4, 
                        feedback: "Good grasp of problem requirements but occasionally missed some constraints." 
                      },
                      { 
                        skill: "Algorithm Selection", 
                        score: 3, 
                        feedback: "Chose appropriate algorithms for most problems but could optimize further." 
                      },
                      { 
                        skill: "Code Implementation", 
                        score: 4, 
                        feedback: "Clean, working code with good structure and variable naming." 
                      },
                      { 
                        skill: "Time/Space Optimization", 
                        score: 2, 
                        feedback: "Solutions work but aren't always optimized for performance." 
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{item.skill}</div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-4 h-4 rounded-full mx-0.5 ${
                                  i < item.score ? "bg-blue-500" : "bg-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{item.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Learning Recommendations</CardTitle>
                <CardDescription>Based on your test performance, we recommend the following resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Focus Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          area: "Graph Algorithms",
                          description: "Work on understanding Dijkstra's algorithm more thoroughly"
                        },
                        {
                          area: "Data Structure Selection",
                          description: "Practice choosing between hash tables and BSTs based on requirements"
                        },
                      ].map((item, index) => (
                        <Card key={index} className="border border-amber-200">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{item.area}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-slate-600">{item.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Recommended Resources</h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: "Understanding Graph Algorithms",
                          type: "Video Course",
                          difficulty: "Intermediate",
                          link: "#"
                        },
                        {
                          title: "Data Structures: Hash Tables vs. Trees",
                          type: "Interactive Tutorial",
                          difficulty: "Advanced",
                          link: "#"
                        },
                        {
                          title: "Practice Problems: Binary Search Trees",
                          type: "Coding Exercises",
                          difficulty: "Intermediate",
                          link: "#"
                        },
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="p-4 border rounded-md hover:bg-slate-50 transition-colors flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-slate-500 mt-1">
                              {item.type} • {item.difficulty}
                            </div>
                          </div>
                          <Button asChild variant="ghost" className="text-blue-600 hover:text-blue-800">
                            <Link to={item.link}>
                              View Resource
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Next Test Recommendations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Graph Algorithms Deep Dive",
                          description: "Focus on shortest path algorithms and their applications",
                          difficulty: "Advanced"
                        },
                        {
                          title: "Tree-based Data Structures",
                          description: "Comprehensive test on different tree implementations",
                          difficulty: "Intermediate"
                        },
                      ].map((item, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex justify-between items-center">
                            <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                              item.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                              item.difficulty === "Intermediate" ? "bg-amber-100 text-amber-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {item.difficulty}
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                              Take Test
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResultsPage;
