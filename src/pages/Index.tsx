import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Brain, Image, TrendingUp, Mic, BookOpen } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { AuthModal } from "@/components/AuthModal";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold text-gradient">AgriAI</span>
            </div>
            <Button 
              variant="hero" 
              onClick={() => setShowAuth(true)}
              className="shadow-glow"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection onGetStarted={() => setShowAuth(true)} />

      {/* Unique Features Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              Revolutionary Features
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              What Makes <span className="text-gradient">AgriAI</span> Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform includes unique features that no other farming app offers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Unique Feature 1: AI Pest Image Generation */}
            <Card className="p-8 shadow-feature hover:shadow-glow transition-spring">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-growth rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">AI Pest Image Confirmation</h3>
                  <p className="text-muted-foreground mb-4">
                    Describe your pest issue → AI generates how it looks → Confirm → Get targeted solutions
                  </p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Unique Feature
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Unique Feature 2: Scientific Learning */}
            <Card className="p-8 shadow-feature hover:shadow-glow transition-spring">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-sky rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Local Language Science Education</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn modern agriculture methods (hydroponics, drip irrigation) explained in your local language
                  </p>
                  <Badge variant="outline" className="bg-accent-bright/10 text-accent-bright border-accent-bright/20">
                    Unique Feature
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Unique Feature 3: Growth Stage Prediction */}
            <Card className="p-8 shadow-feature hover:shadow-glow transition-spring">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-earth rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Future Problem Prediction</h3>
                  <p className="text-muted-foreground mb-4">
                    AI predicts pest attacks and diseases based on growth stage and warns you weeks in advance
                  </p>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    Unique Feature
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Unique Feature 4: Voice Assistant in Local Language */}
            <Card className="p-8 shadow-feature hover:shadow-glow transition-spring">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-primary rounded-lg">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Local Dialect AI Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Talking AI assistant that explains everything in your local language, bridging the literacy gap
                  </p>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Unique Feature
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* All Features Overview */}
      <FeatureShowcase />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Transform Your Farming Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of farmers already using AgriAI to increase yields and reduce costs
          </p>
          <Button 
            variant="secondary" 
            size="xl"
            onClick={() => setShowAuth(true)}
            className="shadow-glow"
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
        onSuccess={() => {
          setIsAuthenticated(true);
          setShowAuth(false);
        }}
      />
    </div>
  );
};

export default Index;