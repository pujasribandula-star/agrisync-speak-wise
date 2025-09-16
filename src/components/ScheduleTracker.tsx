import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Camera, AlertTriangle, CheckCircle, Clock, Leaf, Droplets, Bug } from "lucide-react";

export const ScheduleTracker = () => {
  const [selectedField, setSelectedField] = useState('field-a');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const fields = [
    { id: 'field-a', name: 'Field A - Wheat (गेहूं)', crop: 'wheat', stage: 'Growing', progress: 65 },
    { id: 'field-b', name: 'Field B - Mustard (सरसों)', crop: 'mustard', stage: 'Flowering', progress: 40 },
    { id: 'field-c', name: 'Field C - Gram (चना)', crop: 'gram', stage: 'Seedling', progress: 20 }
  ];

  const currentField = fields.find(f => f.id === selectedField);

  const schedule = [
    {
      date: '2024-09-16',
      task: 'Water irrigation',
      status: 'pending',
      priority: 'high',
      icon: Droplets,
      description: 'Deep watering required - soil moisture below 60%'
    },
    {
      date: '2024-09-18',
      task: 'Apply nitrogen fertilizer',
      status: 'scheduled',
      priority: 'medium',
      icon: Leaf,
      description: 'Urea application - 50kg per acre during tillering stage'
    },
    {
      date: '2024-09-20',
      task: 'Pest monitoring',
      status: 'scheduled',
      priority: 'high',
      icon: Bug,
      description: 'Check for aphids and stem borer - critical growth stage'
    },
    {
      date: '2024-09-15',
      task: 'Field preparation',
      status: 'completed',
      priority: 'medium',
      icon: Calendar,
      description: 'Soil preparation and bed formation completed'
    }
  ];

  const growthStages = [
    { name: 'Sowing', completed: true, date: '2024-08-15' },
    { name: 'Germination', completed: true, date: '2024-08-22' },
    { name: 'Tillering', completed: true, date: '2024-09-05' },
    { name: 'Booting', completed: false, expected: '2024-10-15' },
    { name: 'Flowering', completed: false, expected: '2024-11-01' },
    { name: 'Grain Filling', completed: false, expected: '2024-11-20' },
    { name: 'Maturity', completed: false, expected: '2024-12-10' }
  ];

  const predictions = [
    {
      type: 'warning',
      title: 'Pest Alert - Month 3',
      description: 'High probability of aphid attack in November. Prepare neem oil spray.',
      preventive: 'Apply preventive spray in last week of October',
      icon: AlertTriangle
    },
    {
      type: 'info',
      title: 'Nutrient Deficiency Risk',
      description: 'Potassium deficiency likely during grain filling stage.',
      preventive: 'Schedule potash application 2 weeks before flowering',
      icon: Leaf
    },
    {
      type: 'success',
      title: 'Optimal Harvest Window',
      description: 'Best harvest time predicted: Dec 10-15 based on current growth.',
      preventive: 'Arrange harvesting equipment in advance',
      icon: CheckCircle
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Schedule & Growth Tracker</h1>
          <p className="text-muted-foreground">AI-generated farming schedule with growth monitoring and predictions</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Unique Feature
        </Badge>
      </div>

      {/* Field Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {fields.map((field) => (
          <Card 
            key={field.id}
            className={`p-4 cursor-pointer transition-spring ${
              selectedField === field.id 
                ? 'shadow-glow border-2 border-primary' 
                : 'shadow-feature hover:shadow-soft'
            }`}
            onClick={() => setSelectedField(field.id)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{field.name}</h3>
                <Badge variant="secondary">{field.stage}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Growth Progress</span>
                  <span className="font-medium">{field.progress}%</span>
                </div>
                <Progress value={field.progress} className="h-2" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Schedule */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Farming Schedule - {currentField?.name}
          </h3>
          <div className="space-y-4">
            {schedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border">
                  <div className={`p-2 rounded-lg ${
                    item.status === 'completed' ? 'bg-success/10' :
                    item.status === 'pending' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      item.status === 'completed' ? 'text-success' :
                      item.status === 'pending' ? 'text-warning' :
                      'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{item.task}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={item.priority === 'high' ? 'destructive' : 'secondary'}
                          className={
                            item.priority === 'high' ? 'bg-warning/10 text-warning border-warning/20' : ''
                          }
                        >
                          {item.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {new Date(item.date).toLocaleDateString('en-GB')}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {item.status === 'pending' && (
                      <Button size="sm" className="mt-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Growth Tracking */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-success" />
            Growth Stage Tracking
          </h3>
          
          {/* Upload Image */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-3">
                Upload crop image for AI growth analysis
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="growth-image"
              />
              <label htmlFor="growth-image">
                <Button variant="outline" className="cursor-pointer" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </label>
            </div>
            {uploadedImage && (
              <div className="mt-4">
                <img src={uploadedImage} alt="Crop" className="w-full h-32 object-cover rounded-lg" />
                <div className="mt-2 p-3 bg-success/5 rounded-lg border border-success/20">
                  <p className="text-sm text-success font-medium">✅ AI Analysis: Healthy tillering stage</p>
                  <p className="text-xs text-muted-foreground">No nutrient deficiency detected. Growth on track.</p>
                </div>
              </div>
            )}
          </div>

          {/* Growth Stages */}
          <div className="space-y-3">
            {growthStages.map((stage, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  stage.completed 
                    ? 'bg-success text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stage.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${stage.completed ? 'font-medium' : 'text-muted-foreground'}`}>
                      {stage.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stage.completed ? stage.date : stage.expected}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Predictions */}
      <Card className="p-6 shadow-feature">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
          AI Predictions & Preventive Measures
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {predictions.map((prediction, index) => {
            const Icon = prediction.icon;
            return (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                prediction.type === 'warning' ? 'border-warning/20 bg-warning/5' :
                prediction.type === 'success' ? 'border-success/20 bg-success/5' :
                'border-primary/20 bg-primary/5'
              }`}>
                <div className="flex items-start space-x-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${
                    prediction.type === 'warning' ? 'text-warning' :
                    prediction.type === 'success' ? 'text-success' :
                    'text-primary'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-2">{prediction.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{prediction.description}</p>
                    <div className="p-2 bg-white/50 rounded text-xs font-medium">
                      💡 {prediction.preventive}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button variant="default" size="lg">
          <Clock className="h-5 w-5 mr-2" />
          Set Reminders
        </Button>
        <Button variant="outline" size="lg">
          Export Schedule
        </Button>
        <Button variant="success" size="lg">
          Share with Expert
        </Button>
      </div>
    </div>
  );
};