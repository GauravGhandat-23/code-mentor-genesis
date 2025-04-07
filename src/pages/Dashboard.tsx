
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BarChart, PieChart } from "@/components/ui/chart";
import UserNavbar from "@/components/UserNavbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");

  const mockPerformanceData = {
    aptitude: 72,
    coding: 68,
    recentTests: [
      { id: 1, title: "Advanced SQL Concepts", date: "April 5, 2025", score: 78, total: 100 },
      { id: 2, title: "Data Structures", date: "April 3, 2025", score: 65, total: 100 },
      { id: 3, title: "Logical Reasoning", date: "March 30, 2025", score: 82, total: 100 },
    ],
    skillBreakdown: [
      { name: "Problem Solving", value: 75 },
      { name: "Data Structures", value: 65 },
      { name: "Algorithms", value: 70 },
      { name: "SQL", value: 80 },
      { name: "Reasoning", value: 85 },
    ]
  };

  const recommendendTests = [
    { 
      id: 1, 
      title: "Advanced Algorithms", 
      description: "Challenge yourself with complex algorithmic problems",
      duration: 45,
      difficulty: "Hard"
    },
    { 
      id: 2, 
      title: "Data Structure Fundamentals", 
      description: "Strengthen your understanding of essential data structures",
      duration: 30,
      difficulty: "Medium"
    },
    { 
      id: 3, 
      title: "SQL Mastery", 
      description: "Test your database query optimization skills",
      duration: 25,
      difficulty: "Medium"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <UserNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Track your progress and start new tests</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/new-test")}
          >
            Start New Test
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Overview Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Aptitude</CardTitle>
              <CardDescription>Based on all aptitude tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{mockPerformanceData.aptitude}%</div>
              <Progress value={mockPerformanceData.aptitude} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Coding Proficiency</CardTitle>
              <CardDescription>Based on all coding tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600 mb-2">{mockPerformanceData.coding}%</div>
              <Progress value={mockPerformanceData.coding} className="h-2 bg-teal-100" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tests Completed</CardTitle>
              <CardDescription>Your testing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600 mb-2">12</div>
              <div className="text-sm text-slate-500">Last test: 2 days ago</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="mb-8"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommended">Recommended Tests</TabsTrigger>
            <TabsTrigger value="history">Test History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Breakdown</CardTitle>
                  <CardDescription>Your strengths and areas for improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <BarChart
                      data={mockPerformanceData.skillBreakdown.map(skill => ({
                        name: skill.name,
                        value: skill.value,
                      }))}
                      index="name"
                      categories={["value"]}
                      colors={["blue"]}
                      yAxisWidth={40}
                      showLegend={false}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Topic Distribution</CardTitle>
                  <CardDescription>Topics you've covered in tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 flex items-center justify-center">
                    <PieChart
                      data={[
                        { name: "Algorithms", value: 30 },
                        { name: "Data Structures", value: 25 },
                        { name: "SQL", value: 20 },
                        { name: "Reasoning", value: 15 },
                        { name: "Math", value: 10 },
                      ]}
                      index="name"
                      categories={["value"]}
                      colors={["#3B82F6", "#14B8A6", "#8B5CF6", "#F97316", "#EF4444"]}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendendTests.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm text-slate-500 mb-4">
                      <div>Duration: {test.duration} min</div>
                      <div className={`font-medium ${
                        test.difficulty === "Easy" ? "text-green-600" :
                        test.difficulty === "Medium" ? "text-amber-600" :
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Test History</CardTitle>
                <CardDescription>Your last 10 completed tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-500">Test Name</th>
                        <th className="text-center py-3 px-4 font-medium text-slate-500">Date</th>
                        <th className="text-center py-3 px-4 font-medium text-slate-500">Score</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPerformanceData.recentTests.map((test) => (
                        <tr key={test.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-900">{test.title}</td>
                          <td className="py-3 px-4 text-center text-slate-500">{test.date}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`font-medium ${
                              (test.score / test.total) >= 0.8 ? "text-green-600" :
                              (test.score / test.total) >= 0.6 ? "text-amber-600" :
                              "text-red-600"
                            }`}>
                              {test.score}/{test.total}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                              onClick={() => navigate(`/results/${test.id}`)}
                            >
                              View Results
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
