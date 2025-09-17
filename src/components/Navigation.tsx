import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  userPhone?: string;
}

export const Navigation = ({ userPhone = "+91 98765-43210" }: NavigationProps) => {
  const { translate } = useLanguage();

  return (
    <nav className="bg-white shadow-soft border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌱</span>
            </div>
            <span className="text-2xl font-bold text-gradient">AgriAI</span>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Smart Farming
            </Badge>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Phone */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-primary/5 rounded-lg">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{userPhone}</span>
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
            
            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            
            {/* Profile */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};