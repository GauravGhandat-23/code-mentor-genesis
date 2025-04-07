
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import UserNavbar from "@/components/UserNavbar";
import { useGroqClient } from "@/hooks/useGroqClient";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const groqClient = useGroqClient();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [proctoringWarnings, setProctoringWarnings] = useState<string[]>([]);
  
  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setTestData({
        title: "Advanced Algorithm Concepts",
        description: "Test your knowledge of advanced algorithms and their applications",
        duration: 30,
        questions: [
          {
            id: 1,
            question: "What is the time complexity of the quicksort algorithm in the average case?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            type: "mcq"
          },
          {
            id: 2,
            question: "Explain how the Dijkstra's algorithm works and when it might fail.",
            type: "text"
          },
          {
            id: 3,
            question: "Implement a function to find the longest common subsequence of two strings.",
            type: "code",
            language: "javascript",
            templateCode: "function longestCommonSubsequence(text1, text2) {\n  // Your code here\n}"
          },
          {
            id: 4,
            question: "Which of the following is NOT a valid approach for balancing a binary search tree?",
            options: ["AVL rotation", "Red-Black tree insertion", "Heap insertion", "B-tree splitting"],
            type: "mcq"
          },
          {
            id: 5,
            question: "Describe the advantages and disadvantages of using a hash table compared to a balanced binary search tree.",
            type: "text"
          }
        ]
      });
      setLoading(false);
    }, 1000);
    
    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.warning("Time's up! Submitting your answers...");
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Proctoring simulation
    const proctoringInterval = setInterval(() => {
      const randomCheck = Math.random();
      if (randomCheck > 0.95) {
        const warning = "Focus detected away from the test window";
        setProctoringWarnings(prev => [...prev, warning]);
        toast.warning(warning);
      }
    }, 15000);
    
    return () => {
      clearInterval(timer);
      clearInterval(proctoringInterval);
    };
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerChange = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };
  
  const handleCodeChange = (code: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: code
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    toast.success("Submitting your test...");
    
    // In a real app, we would submit the answers to the backend
    // Simulate API call
    setTimeout(() => {
      navigate(`/results/${testId}`);
    }, 2000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-4">Loading Test...</div>
          <Progress value={30} className="w-80 h-2" />
        </div>
      </div>
    );
  }
  
  const currentQ = testData.questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-slate-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{testData.title}</h1>
              <p className="text-slate-600 mt-1">{testData.description}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className={`px-4 py-2 rounded-md 
                ${timeLeft < 300 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}
                font-medium`}
              >
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress 
              value={((currentQuestion + 1) / testData.questions.length) * 100} 
              className="h-2" 
            />
            <div className="text-sm text-slate-500 mt-2">
              Question {currentQuestion + 1} of {testData.questions.length}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg mb-4">{currentQ.question}</div>
                
                {currentQ.type === "mcq" && (
                  <div className="space-y-3">
                    {currentQ.options.map((option: string, index: number) => (
                      <div 
                        key={index}
                        className={`p-3 border rounded-md transition-all cursor-pointer 
                          ${answers[currentQuestion] === option 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-slate-200 hover:border-blue-200"}`}
                        onClick={() => handleAnswerChange(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                
                {currentQ.type === "text" && (
                  <textarea 
                    className="w-full p-3 border border-slate-200 rounded-md h-32"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                  />
                )}
                
                {currentQ.type === "code" && (
                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    <div className="bg-slate-800 text-white text-xs px-4 py-2">
                      {currentQ.language}
                    </div>
                    <textarea 
                      className="w-full p-3 font-mono text-sm h-64 bg-slate-900 text-slate-50"
                      value={answers[currentQuestion] || currentQ.templateCode}
                      onChange={(e) => handleCodeChange(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion < testData.questions.length - 1 ? (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitTest}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Test"}
                </Button>
              )}
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {testData.questions.map((_: any, index: number) => (
                    <Button 
                      key={index}
                      variant={currentQuestion === index ? "default" : answers[index] ? "outline" : "secondary"}
                      className={`w-10 h-10 p-0 ${
                        currentQuestion === index 
                          ? "bg-blue-600" 
                          : answers[index] 
                            ? "border-green-500 text-green-700" 
                            : "bg-slate-100 text-slate-700"
                      }`}
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="text-sm font-medium mb-2">Proctoring Status</div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm mb-3">
                    Proctoring Active
                  </div>
                  
                  {proctoringWarnings.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Warnings</div>
                      <div className="max-h-36 overflow-y-auto">
                        {proctoringWarnings.map((warning, i) => (
                          <div key={i} className="p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-xs mb-2">
                            {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
