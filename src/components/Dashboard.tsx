import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  TestTube, 
  Bug, 
  TrendingUp, 
  Cloud, 
  Mic, 
  ShoppingCart, 
  BookOpen,
  Calendar,
  Settings,
  Bell,
  Home
} from "lucide-react";
import { PestIdentification } from "@/components/PestIdentification";
import { SoilAnalysis } from "@/components/SoilAnalysis";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { MarketWeather } from "@/components/MarketWeather";
import { LearningHub } from "@/components/LearningHub";
import { ScheduleTracker } from "@/components/ScheduleTracker";

type DashboardView = 'home' | 'soil' | 'pest' | 'market' | 'voice' | 'shopping' | 'learning' | 'schedule';

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [notifications] = useState(3);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard', color: 'primary' },
    { id: 'soil', icon: TestTube, label: 'Soil Analysis', color: 'earth' },
    { id: 'pest', icon: Bug, label: 'Pest ID', color: 'growth', badge: 'New' },
    { id: 'market', icon: TrendingUp, label: 'Market & Weather', color: 'sky' },
    { id: 'voice', icon: Mic, label: 'AI Assistant', color: 'voice' },
    { id: 'shopping', icon: ShoppingCart, label: 'Agri Shop', color: 'earth' },
    { id: 'learning', icon: BookOpen, label: 'Learn', color: 'growth' },
    { id: 'schedule', icon: Calendar, label: 'Schedule', color: 'primary' }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'soil':
        return <SoilAnalysis />;
      case 'pest':
        return <PestIdentification />;
      case 'market':
        return <MarketWeather />;
      case 'voice':
        return <VoiceAssistant />;
      case 'learning':
        return <LearningHub />;
      case 'schedule':
        return <ScheduleTracker />;
      default:
        return <DashboardHome onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Top Navigation */}
      <nav className="bg-white shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentView('home')}
                className="text-lg font-bold text-gradient hover:bg-primary/5"
              >
                AgriAI
              </Button>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                हिंदी में
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-soft border-r min-h-screen">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setCurrentView(item.id as DashboardView)}
                  className={`w-full justify-start space-x-3 ${
                    isActive ? 'shadow-soft' : 'hover:bg-primary/5'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {'badge' in item && item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Floating Voice Button */}
      <Button
        variant="voice"
        size="fab"
        className="fixed bottom-6 right-6 shadow-glow"
        onClick={() => setCurrentView('voice')}
      >
        <Mic className="h-6 w-6" />
      </Button>
    </div>
  );
};

const DashboardHome = ({ onNavigate }: { onNavigate: (view: DashboardView) => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Welcome back, Farmer</h1>
          <p className="text-muted-foreground">Here's what's happening with your crops today</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-feature">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
              <TestTube className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Soil Health</p>
              <p className="text-xl font-semibold text-success">Good</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-feature">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-sky rounded-lg flex items-center justify-center">
              <Cloud className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weather</p>
              <p className="text-xl font-semibold text-accent-bright">28°C</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-feature">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-earth rounded-lg flex items-center justify-center">
              <Bug className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pest Alerts</p>
              <p className="text-xl font-semibold text-warning">2 New</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-feature">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Price</p>
              <p className="text-xl font-semibold text-primary">₹2,850/qt</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="growth" 
              className="w-full justify-start"
              onClick={() => onNavigate('pest')}
            >
              <Bug className="h-4 w-4 mr-2" />
              Identify Pest Issue
            </Button>
            <Button 
              variant="earth" 
              className="w-full justify-start"
              onClick={() => onNavigate('soil')}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Analyze Soil Report
            </Button>
            <Button 
              variant="sky" 
              className="w-full justify-start"
              onClick={() => onNavigate('market')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Check Market Prices
            </Button>
          </div>
        </Card>

        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-primary/5 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Water irrigation - Field A</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-warning/5 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm">Apply fertilizer - Field B</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-success/5 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">Harvest monitoring - Field C</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => onNavigate('schedule')}
          >
            View Full Schedule
          </Button>
        </Card>
      </div>
    </div>
  );
};