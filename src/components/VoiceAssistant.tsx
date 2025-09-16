import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Languages, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const { toast } = useToast();
  const { selectedLanguage, setSelectedLanguage, languages, translate } = useLanguage();

  // Initialize conversation with greeting in selected language
  useEffect(() => {
    setConversation([{
      type: 'assistant',
      message: translate('greeting'),
      timestamp: new Date()
    }]);
  }, [selectedLanguage, translate]);

  // Get friendly responses based on language
  const getFriendlyResponse = (userMessage: string) => {
    const responses = {
      hi: {
        greeting: ["नमस्कार! मैं यहाँ आपकी मदद के लिए हूँ। 😊", "हाय! कैसे हैं आप? मैं आपका खेती का दोस्त हूँ! 🌱"],
        pest: "अरे यार, कीड़े की समस्या तो बहुत परेशान करने वाली है! 😟 लेकिन चिंता मत करिए, मैं आपकी पूरी मदद करूंगा। पहले तो नीम का तेल try करके देखिए - 10ml प्रति लीटर पानी में मिलाकर शाम को spray करें। यह बिलकुल natural है और कीड़ों को भगा देता है। 🌿",
        soil: "वाह! मिट्टी की जांच कराना बहुत smart बात है! 👍 अच्छी मिट्टी = अच्छी फसल। NPK test जरूर कराएं, और pH भी check करें। अगर मिट्टी acidic है तो lime डालें, alkaline है तो organic matter बढ़ाएं। 🌱",
        water: "पानी तो life है खेती की! 💧 आपके area में कितना पानी available है? Rice के लिए ज्यादा पानी चाहिए, wheat कम में काम चल जाता है। drip irrigation use करें तो 50% तक पानी बचा सकते हैं! 💪",
        weather: "मौसम की बात करते हैं! ☀️🌧️ बारिश के बाद fungicide spray जरूर करें, नहीं तो fungus लग सकता है। और गर्मी में सुबह-शाम ही पानी दें, दोपहर में नहीं।",
        default: "हम्म, interesting सवाल है! 🤔 मैं आपकी पूरी help करना चाहता हूँ। थोड़ा और detail में बताइए ताकि मैं बेहतर advice दे सकूं। आपका farming friend हूँ मैं! 😊"
      },
      en: {
        greeting: ["Hello there! I'm here to help you with all your farming needs! 😊", "Hi! How are you doing? I'm your friendly farming assistant! 🌱"],
        pest: "Oh no, pest problems can be really frustrating! 😟 But don't worry, I'm here to help you out completely. First, try neem oil - mix 10ml per liter of water and spray in the evening. It's completely natural and will drive away the pests! 🌿",
        soil: "Wow! Getting your soil tested is a really smart move! 👍 Good soil = Good crops. Make sure to get NPK test done, and check pH too. If soil is acidic, add lime; if alkaline, increase organic matter. 🌱",
        water: "Water is life for farming! 💧 How much water is available in your area? Rice needs more water, wheat works with less. Use drip irrigation and you can save up to 50% water! 💪",
        weather: "Let's talk about weather! ☀️🌧️ After rain, definitely spray fungicide, otherwise fungus can develop. And in summer, water only in morning-evening, not in afternoon.",
        default: "Hmm, that's an interesting question! 🤔 I really want to help you completely. Tell me a bit more in detail so I can give better advice. I'm your farming friend! 😊"
      },
      te: {
        greeting: ["నమస్కారం! నేను మీ వ్యవసాయ అన్ని అవసరాలకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను! 😊", "హాయ! ఎలా ఉన్నారు? నేను మీ స్నేహపూర్వక వ్యవసాయ సహాయకుడిని! 🌱"],
        pest: "అయ్యో, కీటకాల సమస్యలు చాలా బాధాకరం అవుతాయి! 😟 కానీ చింతించకండి, నేను మీకు పూర్తిగా సహాయం చేస్తాను. మొదట వేప నూనె ప్రయత్నించండి - లీటరు నీటికి 10ml కలిపి సాయంత్రం స్ప్రే చేయండి. ఇది పూర్తిగా సహజమైనది మరియు కీటకాలను తోలుతుంది! 🌿",
        default: "హమ్, ఆసక్తికరమైన ప్రశ్న! 🤔 నేను మీకు పూర్తిగా సహాయం చేయాలని అనుకుంటున్నాను. కొంచెం వివరంగా చెప్పండి, అప్పుడు నేను మంచి సలహా ఇవ్వగలను. నేను మీ వ్యవసాయ స్నేహితుడిని! 😊"
      }
    };
    
    const langResponses = responses[selectedLanguage] || responses.en;
    
    if (userMessage.toLowerCase().includes('pest') || userMessage.includes('कीड़े') || userMessage.includes('కీటకాలు')) {
      return langResponses.pest;
    } else if (userMessage.toLowerCase().includes('soil') || userMessage.includes('मिट्टी') || userMessage.includes('నేల')) {
      return langResponses.soil;
    } else if (userMessage.toLowerCase().includes('water') || userMessage.includes('पानी') || userMessage.includes('నీరు')) {
      return langResponses.water;
    } else if (userMessage.toLowerCase().includes('weather') || userMessage.includes('मौसम') || userMessage.includes('వాతావరణం')) {
      return langResponses.weather;
    } else if (userMessage.toLowerCase().includes('hello') || userMessage.includes('नमस्कार') || userMessage.includes('హలో')) {
      return langResponses.greeting[Math.floor(Math.random() * langResponses.greeting.length)];
    }
    
    return langResponses.default;
  };

  const quickQuestions = [
    { text: "मेरी फसल में पीले पत्ते क्यों हो रहे हैं?", translation: "Why are my crop leaves turning yellow?" },
    { text: "कौन सी खाद सबसे अच्छी है?", translation: "Which fertilizer is the best?" },
    { text: "बारिश के बाद क्या करना चाहिए?", translation: "What should I do after rain?" },
    { text: "मिट्टी की जांच कैसे करें?", translation: "How to test soil?" }
  ];

  const startListening = () => {
    setIsListening(true);
    toast({
      title: translate('listening'),
      description: translate('askQuestion'),
    });

    // Simulate speech recognition
    setTimeout(() => {
      setIsListening(false);
      const sampleQuestions = {
        hi: "मेरी गेहूं की फसल में कीड़े लग गए हैं, क्या करूं?",
        en: "My wheat crop has pests, what should I do?",
        te: "నా గోధుమ పంటలో కీటకాలు ఉన్నాయి, ఏమి చేయాలి?"
      };
      
      const userMessage = sampleQuestions[selectedLanguage] || sampleQuestions.en;
      
      setConversation(prev => [...prev, {
        type: 'user',
        message: userMessage,
        timestamp: new Date()
      }]);
      
      // Generate AI response with friendly tone
      setTimeout(() => {
        setIsSpeaking(true);
        const assistantResponse = getFriendlyResponse(userMessage);
        
        setConversation(prev => [...prev, {
          type: 'assistant',
          message: assistantResponse,
          timestamp: new Date()
        }]);
        
        setTimeout(() => {
          setIsSpeaking(false);
        }, 4000);
      }, 1500);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const sendTextMessage = () => {
    if (!textInput.trim()) return;
    
    const userMessage = textInput;
    setTextInput('');
    
    setConversation(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    // Generate friendly AI response
    setTimeout(() => {
      setIsSpeaking(true);
      const assistantResponse = getFriendlyResponse(userMessage);
      
      setConversation(prev => [...prev, {
        type: 'assistant',
        message: assistantResponse,
        timestamp: new Date()
      }]);
      
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }, 1000);
  };

  const askQuickQuestion = (question: string) => {
    setConversation(prev => [...prev, {
      type: 'user',
      message: question,
      timestamp: new Date()
    }]);

    setTimeout(() => {
      setIsSpeaking(true);
      const response = getFriendlyResponse(question);
      
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
          <h1 className="text-3xl font-bold text-gradient">{translate('voiceAssistant')}</h1>
          <p className="text-muted-foreground">24/7 talking agriculture expert in your local language</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          ChatGPT-like AI
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
              {isListening ? translate('listening') : translate('pressToSpeak')}
            </p>
          </div>

          {/* Status */}
          <div className="mt-6 p-3 rounded-lg bg-primary/5">
            <div className="flex items-center space-x-2">
              {isSpeaking ? (
                <>
                  <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm text-primary">{translate('speaking')}</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{translate('ready')}</span>
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

          {/* Text Input */}
          <div className="flex space-x-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={selectedLanguage === 'hi' ? "यहाँ टाइप करें..." : selectedLanguage === 'te' ? "ఇక్కడ టైప్ చేయండి..." : "Type here..."}
              onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
              className="flex-1"
            />
            <Button onClick={sendTextMessage} disabled={!textInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Questions */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{translate('quickQuestions')}:</p>
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