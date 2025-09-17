import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Layers, 
  MapPin, 
  Droplets, 
  Construction, 
  Upload,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const GroundwaterAnalysis = () => {
  const [location, setLocation] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const { translate } = useLanguage();

  const analyzeGroundwater = () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter your location for groundwater analysis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        waterLevel: 45, // feet below ground
        quality: 'Good',
        flow: 2500, // liters per hour
        mineralContent: {
          tds: 320,
          hardness: 'Moderate',
          ph: 6.8
        },
        boreSuggestions: [
          { depth: '50-60 feet', cost: '₹25,000-30,000', success: '85%' },
          { depth: '80-100 feet', cost: '₹40,000-50,000', success: '95%' },
        ],
        riskFactors: ['Seasonal variation in summer', 'Minor iron content']
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const startVoiceInput = () => {
    setIsListening(true);
    toast({
      title: "Listening...",
      description: "Please speak your location"
    });
    
    // Simulate voice recognition
    setTimeout(() => {
      setLocation("Village Rampur, District Meerut, Uttar Pradesh");
      setIsListening(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient flex items-center">
            <Layers className="h-8 w-8 mr-3 text-primary" />
            Underground Water Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze groundwater levels and find best boring locations using satellite data
          </p>
        </div>
        <Badge variant="outline" className="bg-sky-500/10 text-sky-600 border-sky-500/20">
          Satellite Technology
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Location Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Enter your farm location (Village, District, State)
              </label>
              <div className="flex space-x-2">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Village Rampur, District Meerut, UP"
                  className="flex-1"
                />
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={isListening ? () => setIsListening(false) : startVoiceInput}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Land Documents (Optional)</label>
              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Upload revenue records or land ownership documents
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose Files
                </Button>
              </div>
            </div>

            <Button 
              onClick={analyzeGroundwater}
              disabled={isAnalyzing || !location.trim()}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Groundwater"} 
              <Droplets className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Construction className="h-5 w-5 mr-2 text-primary" />
            Analysis Results
          </h3>
          
          {!analysisResult && !isAnalyzing && (
            <div className="text-center py-8 text-muted-foreground">
              <Droplets className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Enter location to get groundwater analysis</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
              <p className="text-muted-foreground">Analyzing groundwater levels...</p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-4">
              {/* Water Level */}
              <div className="p-4 bg-sky-500/5 rounded-lg border border-sky-500/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Water Level</span>
                  <Badge variant="outline" className="bg-sky-500/10 text-sky-600">
                    {analysisResult.waterLevel} feet below
                  </Badge>
                </div>
              </div>

              {/* Water Quality */}
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Water Quality</span>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    {analysisResult.quality}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>TDS: {analysisResult.mineralContent.tds} ppm</p>
                  <p>pH: {analysisResult.mineralContent.ph}</p>
                  <p>Hardness: {analysisResult.mineralContent.hardness}</p>
                </div>
              </div>

              {/* Flow Rate */}
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Expected Flow</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {analysisResult.flow} L/hr
                  </Badge>
                </div>
              </div>

              {/* Bore Suggestions */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recommended Bore Depths:</h4>
                {analysisResult.boreSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-muted/10 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{suggestion.depth}</span>
                      <Badge variant="secondary">{suggestion.success} success</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimated cost: {suggestion.cost}
                    </p>
                  </div>
                ))}
              </div>

              {/* Risk Factors */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-warning" />
                  Risk Factors:
                </h4>
                {analysisResult.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Info className="h-3 w-3" />
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-feature">
          <h3 className="font-semibold mb-3 text-sky-600">Satellite Monitoring</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Track groundwater changes over time using satellite imagery
          </p>
          <Button variant="outline" size="sm" className="w-full">
            View Satellite Data
          </Button>
        </Card>

        <Card className="p-6 shadow-feature">
          <h3 className="font-semibold mb-3 text-primary">Nearby Wells</h3>
          <p className="text-sm text-muted-foreground mb-4">
            See water levels in neighboring farms and wells
          </p>
          <Button variant="outline" size="sm" className="w-full">
            View Nearby Data
          </Button>
        </Card>

        <Card className="p-6 shadow-feature">
          <h3 className="font-semibold mb-3 text-success">Expert Consultation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect with hydrogeology experts for detailed analysis
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Book Consultation
          </Button>
        </Card>
      </div>
    </div>
  );
};