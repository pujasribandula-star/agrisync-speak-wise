import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TestTube, 
  Bug, 
  TrendingUp, 
  Droplets, 
  Calendar,
  Layers,
  Mic,
  GraduationCap,
  ShoppingCart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeatureGridProps {
  onNavigate: (page: string) => void;
}

export const FeatureGrid = ({ onNavigate }: FeatureGridProps) => {
  const { translate } = useLanguage();

  const features = [
    {
      id: 'soil',
      title: translate('soilAnalysis'),
      description: 'Upload soil test reports for pH, NPK analysis and crop recommendations',
      icon: TestTube,
      image: '🌱',
      color: 'from-primary to-success',
      textColor: 'text-white',
      badge: 'AI Powered'
    },
    {
      id: 'pest',
      title: translate('pestIdentification'),
      description: 'Identify pests from images and get chemical/organic solutions',
      icon: Bug,
      image: '🐛',
      color: 'from-warning/80 to-orange-500',
      textColor: 'text-white',
      badge: 'Image Recognition'
    },
    {
      id: 'market',
      title: translate('marketWeather'),
      description: 'Real-time crop prices across India with weather forecasts',
      icon: TrendingUp,
      image: '📈',
      color: 'from-accent-bright to-blue-500',
      textColor: 'text-white',
      badge: 'Live Data'
    },
    {
      id: 'water',
      title: translate('waterDetection'),
      description: 'Analyze water availability and underground levels for farming',
      icon: Droplets,
      image: '💧',
      color: 'from-sky-400 to-cyan-500',
      textColor: 'text-white',
      badge: 'Satellite Data'
    },
    {
      id: 'schedule',
      title: translate('scheduleTracker'),
      description: 'AI-generated farming calendar with seasonal crop suggestions',
      icon: Calendar,
      image: '📅',
      color: 'from-success to-green-600',
      textColor: 'text-white',
      badge: 'Smart Planning'
    },
    {
      id: 'groundwater',
      title: 'Underground Water',
      description: 'Groundwater levels and best bore construction locations',
      icon: Layers,
      image: '🏗️',
      color: 'from-secondary-dark to-amber-600',
      textColor: 'text-white',
      badge: 'Geo Analysis'
    },
    {
      id: 'voice',
      title: translate('voiceAssistant'),
      description: 'ChatGPT-like AI assistant in your local language',
      icon: Mic,
      image: '🎤',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-white',
      badge: 'Voice AI'
    },
    {
      id: 'learning',
      title: translate('learningHub'),
      description: 'Learn modern farming techniques and irrigation methods',
      icon: GraduationCap,
      image: '🎓',
      color: 'from-indigo-500 to-blue-600',
      textColor: 'text-white',
      badge: 'Educational'
    },
    {
      id: 'shopping',
      title: 'Agri Marketplace',
      description: 'Buy seeds, fertilizers, pesticides and farming tools',
      icon: ShoppingCart,
      image: '🛒',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-white',
      badge: 'Shop Online'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <Card 
            key={feature.id}
            className="relative overflow-hidden shadow-feature hover:shadow-glow transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate(feature.id)}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`} />
            
            {/* Content */}
            <div className="relative p-6 h-48 flex flex-col justify-between">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">{feature.image}</span>
                  </div>
                  <Icon className={`h-6 w-6 ${feature.textColor}`} />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {feature.badge}
                </Badge>
              </div>

              {/* Middle Section */}
              <div className="space-y-2">
                <h3 className={`text-lg font-bold ${feature.textColor}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${feature.textColor} opacity-90 line-clamp-2`}>
                  {feature.description}
                </p>
              </div>

              {/* Bottom Section */}
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm self-start group-hover:bg-white/40 transition-all"
              >
                Open Feature →
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};