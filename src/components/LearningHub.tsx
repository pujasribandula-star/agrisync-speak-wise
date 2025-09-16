import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, CheckCircle, MapPin, Lightbulb, Video, FileText } from "lucide-react";

export const LearningHub = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const methods = [
    {
      id: 'drip-irrigation',
      title: 'Drip Irrigation (ड्रिप सिंचाई)',
      category: 'Water Management',
      difficulty: 'Medium',
      duration: '15 min read',
      applicable: true,
      description: 'Water-efficient irrigation system that delivers water directly to plant roots',
      benefits: ['90% water saving', 'Higher yield', 'Reduced labor'],
      icon: '💧'
    },
    {
      id: 'hydroponics',
      title: 'Hydroponics (हाइड्रोपोनिक्स)',
      category: 'Soilless Farming',
      difficulty: 'Advanced',
      duration: '25 min read',
      applicable: false,
      description: 'Growing plants in nutrient-rich water without soil',
      benefits: ['Year-round production', '10x more yield', 'Pesticide-free'],
      icon: '🌱'
    },
    {
      id: 'crop-rotation',
      title: 'Crop Rotation (फसल चक्र)',
      category: 'Soil Health',
      difficulty: 'Easy',
      duration: '10 min read',
      applicable: true,
      description: 'Strategic sequence of crops to improve soil fertility and reduce pests',
      benefits: ['Better soil health', 'Natural pest control', 'Higher profits'],
      icon: '🔄'
    },
    {
      id: 'vertical-farming',
      title: 'Vertical Farming (लंबवत खेती)',
      category: 'Space Optimization',
      difficulty: 'Advanced',
      duration: '20 min read',
      applicable: false,
      description: 'Growing crops in vertically stacked layers using controlled environment',
      benefits: ['Space efficient', 'Weather independent', 'Higher productivity'],
      icon: '🏢'
    },
    {
      id: 'organic-farming',
      title: 'Organic Farming (जैविक खेती)',
      category: 'Sustainable Agriculture',
      difficulty: 'Medium',
      duration: '18 min read',
      applicable: true,
      description: 'Chemical-free farming using natural methods and organic inputs',
      benefits: ['Premium prices', 'Healthy produce', 'Eco-friendly'],
      icon: '🌿'
    },
    {
      id: 'precision-farming',
      title: 'Precision Farming (सटीक कृषि)',
      category: 'Technology',
      difficulty: 'Advanced',
      duration: '30 min read',
      applicable: true,
      description: 'Using GPS, sensors, and data analytics for optimized farming',
      benefits: ['Reduced inputs', 'Higher efficiency', 'Data-driven decisions'],
      icon: '📡'
    }
  ];

  const methodDetails = {
    'drip-irrigation': {
      what: 'ड्रिप इरिगेशन एक पानी बचाने वाली तकनीक है जहां पानी धीरे-धीरे पौधों की जड़ों में पहुंचाया जाता है।',
      why: 'यह पानी की 50-90% तक बचत करता है, फसल की गुणवत्ता बढ़ाता है, और खरपतवार कम करता है।',
      applicable: 'हरियाणा के लिए बहुत उपयुक्त है क्योंकि यहां पानी की कमी है और मिट्टी रेतीली है।',
      implementation: [
        '1. खेत का सर्वे कराएं और पाइप लाइन की डिजाइन बनवाएं',
        '2. मुख्य पाइप लाइन बिछाएं (90mm व्यास)',
        '3. सब-मेन पाइप (63mm) और लेटरल पाइप (16mm) जोड़ें',
        '4. ड्रिपर्स को 30-60 सेमी की दूरी पर लगाएं',
        '5. फिल्ट्रेशन सिस्टम और प्रेशर रेगुलेटर इंस्टॉल करें',
        '6. पहले साफ पानी चलाकर सिस्टम टेस्ट करें',
        '7. टाइमर लगाकर ऑटोमेटिक सिस्टम बनाएं'
      ],
      cost: 'लागत: ₹35,000-50,000 प्रति एकड़ (सब्सिडी मिलती है)',
      maintenance: 'महीने में एक बार फिल्टर साफ करें और ड्रिपर्स चेक करें'
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Scientific Learning Hub</h1>
          <p className="text-muted-foreground">Modern agriculture methods explained in your local language</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Unique Feature
        </Badge>
      </div>

      {selectedMethod ? (
        // Detailed Method View
        <div className="space-y-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedMethod(null)}
            className="mb-4"
          >
            ← Back to Methods
          </Button>

          <Card className="p-8 shadow-feature">
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-6xl mb-4">{methods.find(m => m.id === selectedMethod)?.icon}</div>
                <h2 className="text-3xl font-bold text-gradient mb-2">
                  {methods.find(m => m.id === selectedMethod)?.title}
                </h2>
                <p className="text-muted-foreground">
                  {methods.find(m => m.id === selectedMethod)?.description}
                </p>
              </div>

              {selectedMethod === 'drip-irrigation' && methodDetails[selectedMethod] && (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* What is it */}
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-primary">
                      <BookOpen className="h-5 w-5 mr-2" />
                      यह क्या है? (What is it?)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {methodDetails[selectedMethod].what}
                    </p>
                  </Card>

                  {/* Why important */}
                  <Card className="p-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-success">
                      <Lightbulb className="h-5 w-5 mr-2" />
                      यह क्यों जरूरी है? (Why important?)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {methodDetails[selectedMethod].why}
                    </p>
                  </Card>

                  {/* Applicability */}
                  <Card className="p-6 bg-gradient-to-br from-accent-bright/5 to-accent-bright/10 border-accent-bright/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-accent-bright">
                      <MapPin className="h-5 w-5 mr-2" />
                      आपके लिए उपयुक्त? (Suitable for you?)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {methodDetails[selectedMethod].applicable}
                    </p>
                  </Card>

                  {/* Cost & Maintenance */}
                  <Card className="p-6 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-warning">
                      <FileText className="h-5 w-5 mr-2" />
                      लागत व रखरखाव (Cost & Maintenance)
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{methodDetails[selectedMethod].cost}</p>
                      <p className="text-sm text-muted-foreground">{methodDetails[selectedMethod].maintenance}</p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Implementation Steps */}
              {selectedMethod === 'drip-irrigation' && (
                <Card className="p-6 shadow-feature">
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                    कैसे लगाएं? Step-by-Step Implementation
                  </h3>
                  <div className="space-y-4">
                    {methodDetails[selectedMethod].implementation.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted/10 rounded-lg">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-sm text-muted-foreground flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-center">
                <Button variant="default" size="lg">
                  <Video className="h-5 w-5 mr-2" />
                  Watch Video Tutorial
                </Button>
                <Button variant="outline" size="lg">
                  <FileText className="h-5 w-5 mr-2" />
                  Download Guide (PDF)
                </Button>
                <Button variant="success" size="lg">
                  Contact Expert
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        // Methods Grid View
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method, index) => (
            <Card 
              key={index} 
              className="p-6 shadow-feature hover:shadow-glow transition-spring cursor-pointer group"
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{method.icon}</div>
                  <div className="text-right space-y-1">
                    <Badge 
                      variant={method.applicable ? 'default' : 'secondary'}
                      className={method.applicable ? 'bg-success/10 text-success border-success/20' : ''}
                    >
                      {method.applicable ? 'Suitable' : 'Advanced'}
                    </Badge>
                    {method.applicable && (
                      <div className="flex items-center text-xs text-success">
                        <MapPin className="h-3 w-3 mr-1" />
                        For your region
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-smooth">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {method.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {method.benefits.map((benefit, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{method.category}</span>
                    <span>•</span>
                    <span>{method.difficulty}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {method.duration}
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  variant={method.applicable ? "default" : "outline"} 
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Learn Method
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Bottom CTA */}
      {!selectedMethod && (
        <Card className="p-8 shadow-feature bg-gradient-hero text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Modernize Your Farming?
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Our AI-powered platform explains each method in simple terms, tells you if it's suitable 
            for your location, and guides you through step-by-step implementation.
          </p>
          <div className="flex space-x-4 justify-center">
            <Button variant="secondary" size="lg">
              Talk to Agricultural Expert
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              Join Farmer Community
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};