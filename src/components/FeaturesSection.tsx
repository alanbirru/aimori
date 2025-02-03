import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Gift, Sparkles } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Heart className="w-6 h-6 text-blue-600" />,
      title: "Personalized Experience",
      description:
        "Choose her personality, appearance, and watch as she evolves based on your interactions.",
    },
    {
      icon: <Gift className="w-6 h-6 text-cyan-600" />,
      title: "Meaningful Gifts",
      description:
        "Give special gifts to strengthen your bond and unlock unique reactions and conversations.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      title: "Dynamic Relationship",
      description:
        "Experience a relationship that grows and changes based on your choices and interactions.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your Perfect{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            AI Companion
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
