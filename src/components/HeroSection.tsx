import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Smartphone, Brain, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="pt-32 pb-20 px-4 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="px-4 py-2 bg-primary/10 text-primary border-primary/20">
              AI-Powered Agriculture Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Farming Made 
              <span className="text-gradient block mt-2">
                Smart & Simple
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Revolutionary AI platform designed for farmers. Get instant pest identification, 
              soil analysis, market insights, and expert guidance in your local language.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={onGetStarted} className="shadow-glow">
                <Smartphone className="h-5 w-5 mr-2" />
                Start with Mobile Login
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Pest ID Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12+</div>
                <div className="text-sm text-muted-foreground">Local Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Assistant</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 shadow-feature hover:shadow-glow transition-spring bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI Pest Detection</h3>
              <p className="text-sm text-muted-foreground">
                Describe or upload pest images for instant identification and treatment recommendations
              </p>
            </Card>

            <Card className="p-6 shadow-feature hover:shadow-glow transition-spring bg-gradient-to-br from-accent-bright/5 to-accent-bright/10 border-accent-bright/20">
              <div className="w-12 h-12 bg-gradient-sky rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Soil Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Upload soil test reports and get AI-powered crop recommendations for your land
              </p>
            </Card>

            <Card className="p-6 shadow-feature hover:shadow-glow transition-spring bg-gradient-to-br from-success/5 to-success/10 border-success/20">
              <div className="w-12 h-12 bg-gradient-growth rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Market Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Real-time crop prices and demand forecasting to maximize your profits
              </p>
            </Card>

            <Card className="p-6 shadow-feature hover:shadow-glow transition-spring bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
              <div className="w-12 h-12 bg-gradient-earth rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Local Language</h3>
              <p className="text-sm text-muted-foreground">
                Complete platform available in 12+ local languages with voice support
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};