
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const PlatformFeatures = () => {
  const features = [
    {
      title: "AI-Personalized Testing",
      description: "Tests adapt to your skill level and learning style for maximum improvement",
      icon: "🧠",
      benefits: [
        "Questions tailored to your knowledge gaps",
        "Difficulty adjusts based on your performance",
        "Focus on areas that need improvement"
      ]
    },
    {
      title: "Real-time Proctoring",
      description: "AI monitors your test-taking to ensure fair and focused assessment",
      icon: "👁️",
      benefits: [
        "Prevents distractions and tab switching",
        "Detects unusual patterns and activities",
        "Provides a realistic exam environment"
      ]
    },
    {
      title: "Intelligent Explanations",
      description: "Get detailed, AI-generated explanations tailored to your learning style",
      icon: "💡",
      benefits: [
        "Step-by-step solution breakdowns",
        "Alternative approaches to problems",
        "Custom tips based on your mistakes"
      ]
    },
    {
      title: "Progress Analytics",
      description: "Track your improvement with detailed performance insights",
      icon: "📊",
      benefits: [
        "Visual progress tracking over time",
        "Skill gap analysis and recommendations",
        "Comparative benchmarking"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="text-4xl mb-4">{feature.icon}</div>
            <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
            <CardDescription className="text-slate-600">{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feature.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0">
                    <Check className="h-4 w-4 text-teal-500" />
                  </span>
                  <span className="text-sm text-slate-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlatformFeatures;
