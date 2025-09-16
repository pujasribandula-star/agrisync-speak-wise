import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplets, MapPin, Thermometer, Eye, Upload, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const WaterDetection = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [waterData, setWaterData] = useState(null);
  const { toast } = useToast();
  const { translate } = useLanguage();

  const analyzeWater = () => {
    setAnalyzing(true);
    toast({
      title: translate('analyzing'),
      description: translate('analyzingWater'),
    });

    // Simulate water analysis
    setTimeout(() => {
      setWaterData({
        waterLevel: 75,
        quality: 'Good',
        pH: 6.8,
        minerals: 'Adequate',
        irrigation: 'Available',
        recommendedCrops: ['Rice', 'Sugarcane', 'Cotton', 'Wheat'],
        waterSource: 'Groundwater + Canal',
        seasonalAvailability: 'Year-round',
        location: 'Punjab, India'
      });
      setAnalyzing(false);
      toast({
        title: translate('analysisComplete'),
        description: translate('waterAnalysisResults'),
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">{translate('waterDetection')}</h1>
          <p className="text-muted-foreground">Analyze water availability and quality for your crops</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Smart Feature
        </Badge>
      </div>

      {/* Upload Section */}
      <Card className="p-6 shadow-feature">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-primary" />
          Water Analysis Input
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={analyzeWater}
            disabled={analyzing}
            className="h-24 flex-col space-y-2"
          >
            <Camera className="h-8 w-8 text-primary" />
            <span>Take Photo of Water Source</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={analyzeWater}
            disabled={analyzing}
            className="h-24 flex-col space-y-2"
          >
            <Upload className="h-8 w-8 text-primary" />
            <span>Upload Water Test Report</span>
          </Button>
        </div>

        <div className="mt-4 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">
            📍 Auto-detecting location for climate and water data analysis
          </p>
        </div>
      </Card>

      {/* Analysis Results */}
      {waterData && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Water Status */}
          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-primary" />
              Water Status
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Water Availability</span>
                  <span className="text-sm text-primary font-semibold">{waterData.waterLevel}%</span>
                </div>
                <Progress value={waterData.waterLevel} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Water Quality</p>
                  <p className="font-semibold text-green-600">{waterData.quality}</p>
                </div>
                
                <div className="p-3 bg-muted/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">pH Level</p>
                  <p className="font-semibold">{waterData.pH}</p>
                </div>
                
                <div className="p-3 bg-muted/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Minerals</p>
                  <p className="font-semibold">{waterData.minerals}</p>
                </div>
                
                <div className="p-3 bg-muted/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Irrigation</p>
                  <p className="font-semibold text-green-600">{waterData.irrigation}</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Location Analysis</span>
                </div>
                <p className="text-sm text-blue-700">{waterData.location}</p>
                <p className="text-xs text-blue-600 mt-1">Source: {waterData.waterSource}</p>
                <p className="text-xs text-blue-600">Availability: {waterData.seasonalAvailability}</p>
              </div>
            </div>
          </Card>

          {/* Crop Recommendations */}
          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              Recommended Crops
            </h3>
            
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">
                Based on your water availability and quality:
              </p>
              
              {waterData.recommendedCrops.map((crop, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-green-800">{crop}</p>
                      <p className="text-xs text-green-600">
                        {crop === 'Rice' && 'Perfect for high water areas • 3-4 months growth'}
                        {crop === 'Sugarcane' && 'Excellent water utilization • 12 months growth'}
                        {crop === 'Cotton' && 'Moderate water needs • 5-6 months growth'}
                        {crop === 'Wheat' && 'Low water requirement • 4-5 months growth'}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      {index === 0 ? 'Best Match' : 'Good'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Water Management Tips</span>
              </div>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Use drip irrigation to save 30-50% water</li>
                <li>• Mulching helps retain soil moisture</li>
                <li>• Plant during optimal season for water efficiency</li>
                <li>• Consider water-harvesting techniques</li>
              </ul>
            </div>
          </Card>
        </div>
      )}

      {/* Loading State */}
      {analyzing && (
        <Card className="p-8 shadow-feature">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Droplets className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold">Analyzing Water Data...</h3>
            <p className="text-muted-foreground">
              Checking water quality, availability, and generating crop recommendations
            </p>
            <Progress value={45} className="w-64 mx-auto" />
          </div>
        </Card>
      )}

      {/* Info Section */}
      <Card className="p-6 shadow-feature bg-gradient-to-r from-primary/5 to-accent/5">
        <h3 className="text-lg font-semibold mb-4">Water Detection Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">What we analyze:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Water availability and quality</li>
              <li>• pH levels and mineral content</li>
              <li>• Seasonal water patterns</li>
              <li>• Irrigation infrastructure</li>
              <li>• Ground water levels</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Smart recommendations:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Best crops for your water conditions</li>
              <li>• Water-efficient farming techniques</li>
              <li>• Irrigation scheduling and tips</li>
              <li>• Water conservation methods</li>
              <li>• Seasonal planting guidance</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};