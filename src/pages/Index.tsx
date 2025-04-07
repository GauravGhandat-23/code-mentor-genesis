
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformFeatures from "@/components/PlatformFeatures";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            AI-Driven Mock Tests <span className="text-blue-600">Personalized</span> For You
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mb-8">
            Improve your aptitude and coding skills with adaptive tests powered by AI that evolve with your learning journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Our Platform?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our AI-powered platform adapts to your learning style and helps you improve faster through personalized feedback.
              </p>
            </div>
            <PlatformFeatures />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our platform adapts to your learning journey in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Take Personalized Tests",
                  description: "Our AI generates questions based on your skill level and learning goals",
                  icon: "📝",
                },
                {
                  title: "Real-time Feedback",
                  description: "Get instant guidance and proctoring during your test sessions",
                  icon: "⚡",
                },
                {
                  title: "Learn From Explanations",
                  description: "Receive detailed AI-powered explanations and tips for improvement",
                  icon: "💡",
                }
              ].map((item, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  <CardHeader className="pb-2">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <CardTitle className="text-xl font-bold text-slate-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials/CTA Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Boost Your Skills?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Join thousands of students improving their aptitude and coding skills through personalized, AI-driven practice.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
              onClick={() => navigate("/signup")}
            >
              Start Your First Test
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
