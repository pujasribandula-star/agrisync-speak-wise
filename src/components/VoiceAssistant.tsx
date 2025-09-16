import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const [conversation, setConversation] = useState([
    {
      type: 'assistant',
      message: 'नमस्कार! मैं आपका कृषि सहायक हूं। आप मुझसे खेती के बारे में कुछ भी पूछ सकते हैं।',
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const quickQuestions = [
    { text: "मेरी फसल में पीले पत्ते क्यों हो रहे हैं?", translation: "Why are my crop leaves turning yellow?" },
    { text: "कौन सी खाद सबसे अच्छी है?", translation: "Which fertilizer is the best?" },
    { text: "बारिश के बाद क्या करना चाहिए?", translation: "What should I do after rain?" },
    { text: "मिट्टी की जांच कैसे करें?", translation: "How to test soil?" }
  ];

  const startListening = () => {
    setIsListening(true);
    toast({
      title: "सुन रहा हूं...",
      description: "आप अपना सवाल पूछ सकते हैं",
    });

    // Simulate listening
    setTimeout(() => {
      setIsListening(false);
      const userMessage = "मेरी गेहूं की फसल में कीड़े लग गए हैं, क्या करूं?";
      setConversation(prev => [...prev, {
        type: 'user',
        message: userMessage,
        timestamp: new Date()
      }]);
      
      // Simulate AI response
      setTimeout(() => {
        setIsSpeaking(true);
        const assistantResponse = "गेहूं में कीड़े लगने पर सबसे पहले आप नीम का तेल का छिड़काव करें। 10 मिली नीम का तेल प्रति लीटर पानी में मिलाकर शाम के समय छिड़काव करें। यदि समस्या बनी रहे तो इमिडाक्लोप्रिड का उपयोग करें।";
        
        setConversation(prev => [...prev, {
          type: 'assistant',
          message: assistantResponse,
          timestamp: new Date()
        }]);
        
        setTimeout(() => {
          setIsSpeaking(false);
        }, 3000);
      }, 1000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const askQuickQuestion = (question: string) => {
    setConversation(prev => [...prev, {
      type: 'user',
      message: question,
      timestamp: new Date()
    }]);

    // Simulate AI response
    setTimeout(() => {
      setIsSpeaking(true);
      let response = "";
      
      if (question.includes("पीले पत्ते")) {
        response = "पत्ते पीले होने के कई कारण हो सकते हैं - नाइट्रोजन की कमी, पानी की कमी या ज्यादा पानी, या कोई बीमारी। मिट्टी की जांच कराएं और उचित खाद डालें।";
      } else if (question.includes("खाद")) {
        response = "मिट्टी की जांच के आधार पर खाद चुनें। सामान्यतः NPK (10:26:26) अच्छी है। जैविक खाद भी मिलाएं जैसे गोबर की खाद या कंपोस्ट।";
      } else if (question.includes("बारिश")) {
        response = "बारिश के बाद खेत में जमा पानी निकालें, मिट्टी को हवादार बनाएं, और फंगीसाइड का छिड़काव करें ताकि बीमारी न लगे।";
      } else {
        response = "मिट्टी की जांच के लिए नजदीकी कृषि विभाग या प्रयोगशाला में नमूना ले जाएं। pH, NPK, और जैविक कार्बन की जांच जरूरी है।";
      }
      
      setConversation(prev => [...prev, {
        type: 'assistant',
        message: response,
        timestamp: new Date()
      }]);
      
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">AI Voice Assistant</h1>
          <p className="text-muted-foreground">24/7 talking agriculture expert in your local language</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          Unique Feature
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Voice Controls */}
        <Card className="p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Mic className="h-5 w-5 mr-2 text-primary" />
            Voice Controls
          </h3>
          
          {/* Language Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">भाषा चुनें / Select Language</label>
            <div className="grid grid-cols-1 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? "default" : "outline"}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="justify-start"
                  size="sm"
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Button */}
          <div className="text-center space-y-4">
            <Button
              variant={isListening ? "destructive" : "voice"}
              size="fab"
              onClick={isListening ? stopListening : startListening}
              className="w-20 h-20 shadow-glow"
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              {isListening ? "बोलिए... / Speaking..." : "माइक दबाएं / Press to speak"}
            </p>
          </div>

          {/* Status */}
          <div className="mt-6 p-3 rounded-lg bg-primary/5">
            <div className="flex items-center space-x-2">
              {isSpeaking ? (
                <>
                  <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm text-primary">AI बोल रहा है...</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">तैयार है</span>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Conversation */}
        <Card className="md:col-span-2 p-6 shadow-feature">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            बातचीत / Conversation
          </h3>
          
          <div className="h-80 overflow-y-auto space-y-3 mb-4 p-3 bg-muted/10 rounded-lg">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white shadow-soft border'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString('hi-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">जल्दी पूछें:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => askQuickQuestion(q.text)}
                  className="justify-start text-left h-auto p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{q.text}</p>
                    <p className="text-xs text-muted-foreground">{q.translation}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Features */}
      <Card className="p-6 shadow-feature bg-gradient-to-r from-primary/5 to-accent/5">
        <h3 className="text-lg font-semibold mb-4">Voice Assistant Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">What I can help with:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pest and disease identification</li>
              <li>• Fertilizer recommendations</li>
              <li>• Weather-based advice</li>
              <li>• Crop selection guidance</li>
              <li>• Market price information</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Language Support:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Hindi, Telugu, Tamil, Kannada</li>
              <li>• Malayalam, Gujarati, Marathi</li>
              <li>• Bengali, Punjabi, and more</li>
              <li>• Voice input and output</li>
              <li>• Local dialect understanding</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};