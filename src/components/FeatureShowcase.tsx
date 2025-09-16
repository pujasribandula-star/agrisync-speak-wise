import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  TestTube, 
  Bug, 
  TrendingUp, 
  Cloud, 
  Mic, 
  ShoppingCart, 
  BookOpen,
  Calendar,
  Leaf
} from "lucide-react";

export const FeatureShowcase = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile OTP Authentication",
      description: "Simple mobile number + OTP login designed for farmers",
      gradient: "gradient-primary",
      category: "Security"
    },
    {
      icon: TestTube,
      title: "AI Soil Analysis",
      description: "Upload soil test reports, get crop recommendations based on location and climate",
      gradient: "gradient-earth",
      category: "Analysis"
    },
    {
      icon: Bug,
      title: "Smart Pest Identification",
      description: "Upload images or describe pests, AI generates confirmation images and suggests treatments",
      gradient: "gradient-growth",
      category: "Unique Feature",
      isUnique: true
    },
    {
      icon: TrendingUp,
      title: "Market Price Forecast",
      description: "Real-time local market prices and demand trend predictions",
      gradient: "gradient-sky",
      category: "Market Intelligence"
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description: "Daily/weekly forecasts with crop recommendations based on upcoming weather",
      gradient: "gradient-sky",
      category: "Weather"
    },
    {
      icon: Mic,
      title: "Voice AI Assistant",
      description: "24/7 talking assistant in local dialects, explains everything conversationally",
      gradient: "gradient-primary",
      category: "Unique Feature",
      isUnique: true
    },
    {
      icon: ShoppingCart,
      title: "Agri Marketplace",
      description: "In-app shopping for seeds, fertilizers, pesticides, sensors, and tools",
      gradient: "gradient-earth",
      category: "Shopping"
    },
    {
      icon: BookOpen,
      title: "Scientific Learning Hub",
      description: "Modern agriculture methods explained in local language with step-by-step guides",
      gradient: "gradient-growth",
      category: "Unique Feature",
      isUnique: true
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-generated farming schedule with growth tracking and stage-based predictions",
      gradient: "gradient-primary",
      category: "Unique Feature",
      isUnique: true
    },
    {
      icon: Leaf,
      title: "Multi-Language Support",
      description: "Complete platform adaptation to farmer's selected local language",
      gradient: "gradient-sky",
      category: "Accessibility"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Complete Farming Solution</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything a modern farmer needs in one intelligent platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 shadow-feature hover:shadow-glow transition-spring group cursor-pointer border-2 hover:border-primary/20"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-${feature.gradient} rounded-lg group-hover:scale-110 transition-spring`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
                        {feature.title}
                      </h3>
                      {feature.isUnique && (
                        <Badge 
                          variant="outline" 
                          className="bg-primary/10 text-primary border-primary/30 text-xs"
                        >
                          Unique
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom highlight */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-hero text-white shadow-glow">
            <h3 className="text-2xl font-bold mb-4">
              Designed Specifically for Farmers
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Our platform bridges the technology gap with intuitive design, local language support, 
              and features that solve real farming challenges.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};