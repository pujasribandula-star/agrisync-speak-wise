import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroSection } from "@/components/HeroSection";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { AuthModal } from "@/components/AuthModal";
import { Navigation } from "@/components/Navigation";
import { LanguageSelector } from "@/components/LanguageSelector";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PestIdentification } from "@/components/PestIdentification";
import { SoilAnalysis } from "@/components/SoilAnalysis";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { MarketWeather } from "@/components/MarketWeather";
import { LearningHub } from "@/components/LearningHub";
import { ScheduleTracker } from "@/components/ScheduleTracker";
import { WaterDetection } from "@/components/WaterDetection";
import { GroundwaterAnalysis } from "@/components/GroundwaterAnalysis";
import { AgriMarketplace } from "@/components/AgriMarketplace";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-gradient-subtle">
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

          <HeroSection onGetStarted={() => setShowAuth(true)} />
          <FeatureShowcase />

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
    }

    // Authenticated user pages
    switch (currentPage) {
      case 'pest':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <PestIdentification />
          </div>
        );
      case 'soil':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <SoilAnalysis />
          </div>
        );
      case 'voice':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <VoiceAssistant />
          </div>
        );
      case 'market':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <MarketWeather />
          </div>
        );
      case 'learning':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <LearningHub />
          </div>
        );
      case 'schedule':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <ScheduleTracker />
          </div>
        );
      case 'water':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <WaterDetection />
          </div>
        );
      case 'groundwater':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <GroundwaterAnalysis />
          </div>
        );
      case 'shopping':
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <AgriMarketplace />
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-subtle">
            <Navigation />
            <LanguageSelector />
            <FeatureGrid onNavigate={setCurrentPage} />
          </div>
        );
    }
  };

  return renderPage();
};

export default Index;