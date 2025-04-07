
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import UserNavbar from "@/components/UserNavbar";

const NewTestPage = () => {
  const navigate = useNavigate();
  
  const [testType, setTestType] = useState("aptitude");
  const [difficulty, setDifficulty] = useState(50);
  const [duration, setDuration] = useState(30);
  const [questionCount, setQuestionCount] = useState(20);
  const [adaptiveTesting, setAdaptiveTesting] = useState(true);
  const [proctoring, setProctoring] = useState(true);
  const [aiExplanations, setAiExplanations] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const handleGenerateTest = () => {
    setGenerating(true);
    toast.success("Generating your personalized test...");
    
    setTimeout(() => {
      // In a real app, we would call the API to generate the test
      // For now, we'll simulate it with a timeout
      navigate("/test/custom-1");
    }, 3000);
  };
  
  const testTypes = [
    {
      id: "aptitude",
      name: "Aptitude Test",
      description: "Test your problem-solving and logical reasoning abilities",
      topics: ["Logical Reasoning", "Numerical Ability", "Verbal Ability", "Data Interpretation"]
    },
    {
      id: "coding",
      name: "Coding Test",
      description: "Test your programming and algorithmic skills",
      topics: ["Data Structures", "Algorithms", "Problem Solving", "Software Design"]
    },
    {
      id: "mixed",
      name: "Mixed Test",
      description: "Comprehensive test covering both aptitude and coding",
      topics: ["Algorithms", "Logical Reasoning", "System Design", "Software Engineering"]
    }
  ];
  
  const currentTestType = testTypes.find(type => type.id === testType) || testTypes[0];
  
  const formatDifficulty = (value: number) => {
    if (value < 33) return "Beginner";
    if (value < 66) return "Intermediate";
    return "Advanced";
  };
  
  const formatDuration = (value: number) => {
    return `${value} min`;
  };
  
  const popularTests = [
    {
      id: "1",
      title: "Data Structures & Algorithms",
      description: "Comprehensive test on fundamental DSA concepts",
      difficulty: "Intermediate",
      duration: 45,
      questions: 25
    },
    {
      id: "2",
      title: "SQL & Database Concepts",
      description: "Test your knowledge of SQL queries and database design",
      difficulty: "Beginner",
      duration: 30,
      questions: 20
    },
    {
      id: "3",
      title: "System Design Challenge",
      description: "Design scalable systems and architectures",
      difficulty: "Advanced",
      duration: 60,
      questions: 10
    },
    {
      id: "4",
      title: "Frontend Development",
      description: "JavaScript, HTML, CSS, and modern frameworks",
      difficulty: "Intermediate",
      duration: 40,
      questions: 30
    }
  ];
  
  return (
    <div className="min-h-screen bg-slate-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create New Test</h1>
          <p className="text-slate-600 mt-1">Generate a personalized test based on your preferences</p>
        </div>
        
        <Tabs defaultValue="custom" className="mb-8">
          <TabsList className="mb-8">
            <TabsTrigger value="custom">Custom Test</TabsTrigger>
            <TabsTrigger value="popular">Popular Tests</TabsTrigger>
            <TabsTrigger value="recommended">Recommended for You</TabsTrigger>
          </TabsList>
          
          <TabsContent value="custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Test Type</CardTitle>
                    <CardDescription>Select the type of test you want to take</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {testTypes.map((type) => (
                        <div 
                          key={type.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            testType === type.id 
                              ? "border-blue-500 bg-blue-50" 
                              : "border-slate-200 hover:border-blue-200"
                          }`}
                          onClick={() => setTestType(type.id)}
                        >
                          <h3 className="font-medium mb-1">{type.name}</h3>
                          <p className="text-sm text-slate-500">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Test Configuration</CardTitle>
                    <CardDescription>Customize your test parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Difficulty</Label>
                        <span className="text-sm font-medium">{formatDifficulty(difficulty)}</span>
                      </div>
                      <Slider 
                        value={[difficulty]} 
                        onValueChange={(values) => setDifficulty(values[0])} 
                        min={0} 
                        max={100} 
                        step={1}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Duration</Label>
                        <span className="text-sm font-medium">{formatDuration(duration)}</span>
                      </div>
                      <Slider 
                        value={[duration]} 
                        onValueChange={(values) => setDuration(values[0])} 
                        min={10} 
                        max={90} 
                        step={5}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Number of Questions</Label>
                        <span className="text-sm font-medium">{questionCount}</span>
                      </div>
                      <Slider 
                        value={[questionCount]} 
                        onValueChange={(values) => setQuestionCount(values[0])} 
                        min={5} 
                        max={50} 
                        step={5}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="adaptive-testing" className="block mb-1">Adaptive Testing</Label>
                          <p className="text-sm text-slate-500">Test difficulty adapts based on your answers</p>
                        </div>
                        <Switch 
                          id="adaptive-testing" 
                          checked={adaptiveTesting}
                          onCheckedChange={setAdaptiveTesting}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="proctoring" className="block mb-1">AI Proctoring</Label>
                          <p className="text-sm text-slate-500">Monitor test-taking for distractions</p>
                        </div>
                        <Switch 
                          id="proctoring" 
                          checked={proctoring}
                          onCheckedChange={setProctoring}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="ai-explanations" className="block mb-1">AI Explanations</Label>
                          <p className="text-sm text-slate-500">Get detailed explanations after the test</p>
                        </div>
                        <Switch 
                          id="ai-explanations" 
                          checked={aiExplanations}
                          onCheckedChange={setAiExplanations}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    onClick={handleGenerateTest}
                    disabled={generating}
                  >
                    {generating ? "Generating..." : "Generate Test"}
                  </Button>
                </div>
              </div>
              
              <div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Test Summary</CardTitle>
                    <CardDescription>Preview of your custom test</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">{currentTestType.name}</h3>
                      <p className="text-slate-600 text-sm">{currentTestType.description}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Topics</div>
                        <div className="flex flex-wrap gap-2">
                          {currentTestType.topics.map((topic, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-700"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">Difficulty</div>
                        <div className="font-medium">{formatDifficulty(difficulty)}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">Duration</div>
                        <div className="font-medium">{formatDuration(duration)}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">Questions</div>
                        <div className="font-medium">{questionCount}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">Features</div>
                        <div className="text-right">
                          {adaptiveTesting && <div className="text-xs font-medium text-blue-600">Adaptive</div>}
                          {proctoring && <div className="text-xs font-medium text-blue-600">Proctored</div>}
                          {aiExplanations && <div className="text-xs font-medium text-blue-600">AI Explanations</div>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTests.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <div className="text-slate-500">Duration</div>
                        <div className="font-medium">{test.duration} min</div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="text-slate-500">Questions</div>
                        <div className="font-medium">{test.questions}</div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="text-slate-500">Difficulty</div>
                        <div className={`font-medium ${
                          test.difficulty === "Beginner" ? "text-green-600" :
                          test.difficulty === "Intermediate" ? "text-amber-600" :
                          "text-red-600"
                        }`}>
                          {test.difficulty}
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate(`/test/${test.id}`)}
                      >
                        Start Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Tests</CardTitle>
                <CardDescription>Based on your previous performance and learning goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      id: "rec1",
                      title: "Graph Algorithms Challenge",
                      description: "Focus on improving your understanding of graph traversal and shortest path algorithms",
                      reason: "Based on your previous test performance in Algorithm Design",
                      difficulty: "Advanced",
                      duration: 40,
                      questions: 15
                    },
                    {
                      id: "rec2",
                      title: "Logical Reasoning Workout",
                      description: "Strengthen your logical reasoning and analytical thinking skills",
                      reason: "Supplements your technical skills for interview preparation",
                      difficulty: "Intermediate",
                      duration: 25,
                      questions: 20
                    },
                  ].map((test) => (
                    <div key={test.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{test.title}</h3>
                          <p className="text-slate-600 text-sm">{test.description}</p>
                          <div className="bg-blue-50 border border-blue-100 rounded-md px-3 py-1 text-xs text-blue-700 inline-block mt-2">
                            {test.reason}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
                          <div className="space-y-2 sm:mr-6">
                            <div className="text-xs text-slate-500">Difficulty</div>
                            <div className={`text-sm font-medium ${
                              test.difficulty === "Beginner" ? "text-green-600" :
                              test.difficulty === "Intermediate" ? "text-amber-600" :
                              "text-red-600"
                            }`}>
                              {test.difficulty}
                            </div>
                            <div className="text-xs text-slate-500">Duration</div>
                            <div className="text-sm font-medium">{test.duration} min</div>
                          </div>
                          
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 h-auto py-3"
                            onClick={() => navigate(`/test/${test.id}`)}
                          >
                            Start Test
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NewTestPage;
