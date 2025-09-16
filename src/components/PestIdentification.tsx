import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Camera, MessageCircle, Sparkles, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PestIdentification = () => {
  const [step, setStep] = useState<'input' | 'ai-image' | 'confirmation' | 'solution'>('input');
  const [pestDescription, setPestDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiGeneratedImage, setAiGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDescriptionSubmit = async () => {
    if (!pestDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe the pest issue you're facing",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setStep('ai-image');
    
    // Simulate AI image generation
    setTimeout(() => {
      setAiGeneratedImage('/placeholder.svg'); // In real app, this would be AI-generated
      setIsProcessing(false);
      toast({
        title: "AI Analysis Complete",
        description: "Generated image based on your description",
      });
    }, 3000);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setIsProcessing(true);
      setStep('confirmation');
      
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Image Analyzed",
          description: "AI has identified the pest in your image",
        });
      }, 2000);
    }
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      setStep('solution');
      toast({
        title: "Pest Confirmed",
        description: "Generating targeted treatment recommendations",
      });
    } else {
      setStep('input');
      toast({
        title: "Let's try again",
        description: "Please provide more details or upload a different image",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Pest Identification</h1>
          <p className="text-muted-foreground">AI-powered pest detection with visual confirmation</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Unique Feature
        </Badge>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center space-x-4">
        {['Input', 'AI Analysis', 'Confirmation', 'Solution'].map((stepName, index) => {
          const currentStepIndex = ['input', 'ai-image', 'confirmation', 'solution'].indexOf(step);
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          
          return (
            <div key={stepName} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-success text-white' :
                isActive ? 'bg-primary text-white' : 
                'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              <span className={`text-sm ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {stepName}
              </span>
              {index < 3 && <div className="w-8 h-px bg-border" />}
            </div>
          );
        })}
      </div>

      {/* Input Step */}
      {step === 'input' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary" />
              Describe Your Pest Issue
            </h3>
            <Textarea
              placeholder="Describe what you see: leaf damage, insect appearance, crop symptoms, etc."
              value={pestDescription}
              onChange={(e) => setPestDescription(e.target.value)}
              className="min-h-32 mb-4"
            />
            <Button 
              onClick={handleDescriptionSubmit}
              variant="growth"
              className="w-full"
              disabled={!pestDescription.trim()}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Image
            </Button>
          </Card>

          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-primary" />
              Upload Pest Image
            </h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Click to upload or drag and drop your pest image
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="pest-upload"
              />
              <label htmlFor="pest-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Image
                </Button>
              </label>
            </div>
          </Card>
        </div>
      )}

      {/* AI Image Generation Step */}
      {step === 'ai-image' && (
        <Card className="p-8 shadow-feature text-center">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">AI Generating Pest Image</h3>
              <p className="text-muted-foreground">
                Creating visual representation based on: "{pestDescription}"
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Does this match your pest issue?</h3>
              <div className="max-w-md mx-auto">
                <img 
                  src={aiGeneratedImage || '/placeholder.svg'} 
                  alt="AI Generated Pest" 
                  className="w-full rounded-lg shadow-soft"
                />
              </div>
              <p className="text-muted-foreground">
                AI generated image based on: "{pestDescription}"
              </p>
              <div className="flex space-x-4 justify-center">
                <Button 
                  variant="success" 
                  onClick={() => handleConfirmation(true)}
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Yes, This Matches
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleConfirmation(false)}
                  size="lg"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  No, Try Again
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Solution Step */}
      {step === 'solution' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-4 text-success">
              Pest Identified: Aphids (हरा तेला)
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <h4 className="font-medium text-success mb-2">Organic Treatment</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Neem oil spray (नीम का तेल)</li>
                  <li>• Soap water solution</li>
                  <li>• Introduce ladybugs</li>
                </ul>
              </div>
              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                <h4 className="font-medium text-warning mb-2">Chemical Treatment</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Imidacloprid 17.8% SL</li>
                  <li>• Thiamethoxam 25% WG</li>
                  <li>• Follow dosage instructions</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-feature">
            <h3 className="text-lg font-semibold mb-4">Prevention Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs text-primary font-medium">1</span>
                </div>
                <p className="text-sm">Regular monitoring of crop health</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs text-primary font-medium">2</span>
                </div>
                <p className="text-sm">Maintain proper plant spacing</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs text-primary font-medium">3</span>
                </div>
                <p className="text-sm">Encourage natural predators</p>
              </div>
            </div>
            <Button variant="default" className="w-full mt-6">
              Save Treatment Plan
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};