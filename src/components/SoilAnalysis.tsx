import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, MapPin, TrendingUp, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SoilAnalysis = () => {
  const [uploadedReport, setUploadedReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedReport(file.name);
      setIsAnalyzing(true);
      
      toast({
        title: "Analyzing Soil Report",
        description: "AI is extracting data from your soil test report",
      });

      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        toast({
          title: "Analysis Complete",
          description: "Soil analysis and crop recommendations ready",
        });
      }, 4000);
    }
  };

  const soilMetrics = [
    { name: 'pH Level', value: 6.8, ideal: '6.0-7.5', status: 'good' },
    { name: 'Nitrogen (N)', value: 245, ideal: '200-300 kg/ha', status: 'good' },
    { name: 'Phosphorus (P)', value: 15, ideal: '20-30 kg/ha', status: 'low' },
    { name: 'Potassium (K)', value: 180, ideal: '150-250 kg/ha', status: 'good' },
    { name: 'Organic Carbon', value: 0.45, ideal: '0.5-1.0%', status: 'low' },
    { name: 'EC (Salinity)', value: 0.3, ideal: '<0.8 dS/m', status: 'good' }
  ];

  const cropRecommendations = [
    { name: 'Wheat (गेहूं)', suitability: 95, season: 'Rabi', expectedYield: '45-50 quintals/ha' },
    { name: 'Mustard (सरसों)', suitability: 88, season: 'Rabi', expectedYield: '15-18 quintals/ha' },
    { name: 'Gram (चना)', suitability: 82, season: 'Rabi', expectedYield: '20-25 quintals/ha' },
    { name: 'Barley (जौ)', suitability: 78, season: 'Rabi', expectedYield: '40-45 quintals/ha' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Soil Analysis</h1>
          <p className="text-muted-foreground">AI-powered soil health assessment and crop recommendations</p>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          Location: Haryana, India
        </Badge>
      </div>

      {!analysisComplete && (
        <Card className="p-8 shadow-feature text-center">
          <div className="max-w-md mx-auto">
            {!uploadedReport ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-earth rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload Soil Test Report</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your soil test report (PDF, image, or document) for AI analysis
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="soil-report-upload"
                />
                <label htmlFor="soil-report-upload">
                  <Button variant="earth" size="lg" className="cursor-pointer">
                    <FileText className="h-5 w-5 mr-2" />
                    Choose File
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                {isAnalyzing ? (
                  <>
                    <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Analyzing Soil Report</h3>
                    <p className="text-muted-foreground">
                      AI is extracting nutrient data from: {uploadedReport}
                    </p>
                    <Progress value={75} className="w-full" />
                    <p className="text-sm text-muted-foreground">Processing soil composition data...</p>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </Card>
      )}

      {analysisComplete && (
        <>
          {/* Soil Health Metrics */}
          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Soil Health Analysis
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {soilMetrics.map((metric, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <Badge 
                      variant={metric.status === 'good' ? 'default' : 'outline'}
                      className={
                        metric.status === 'good' 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-warning/10 text-warning border-warning/20'
                      }
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold text-primary mb-1">
                    {metric.value}{metric.name.includes('%') ? '%' : ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Ideal: {metric.ideal}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Crop Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 shadow-feature">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-success" />
                Recommended Crops
              </h3>
              <div className="space-y-4">
                {cropRecommendations.map((crop, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-soft transition-smooth">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{crop.name}</h4>
                      <Badge variant="secondary">{crop.season}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Suitability</span>
                        <span className="font-medium text-success">{crop.suitability}%</span>
                      </div>
                      <Progress value={crop.suitability} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Expected yield: {crop.expectedYield}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 shadow-feature">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-accent-bright" />
                Improvement Recommendations
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                  <h4 className="font-medium text-warning mb-2">Immediate Action</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Add phosphorus fertilizer (DAP - 50 kg/acre)</li>
                    <li>• Increase organic matter with compost</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">Long-term Strategy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Regular application of farmyard manure</li>
                    <li>• Crop rotation with legumes</li>
                    <li>• Consider drip irrigation for water efficiency</li>
                  </ul>
                </div>

                <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                  <h4 className="font-medium text-success mb-2">Climate Consideration</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on Haryana's climate, winter crops (Rabi) are most suitable. 
                    Current soil conditions favor wheat cultivation.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button variant="default" size="lg">
              Save Analysis Report
            </Button>
            <Button variant="outline" size="lg">
              Share with Expert
            </Button>
            <Button variant="success" size="lg">
              Buy Recommended Fertilizers
            </Button>
          </div>
        </>
      )}
    </div>
  );
};