import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  languages: Language[];
  translate: (key: string) => string;
}

const languages: Language[] = [
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    soilAnalysis: 'Soil Analysis',
    pestIdentification: 'Pest Identification',
    voiceAssistant: 'Voice Assistant',
    marketWeather: 'Market & Weather',
    learningHub: 'Learning Hub',
    scheduleTracker: 'Schedule Tracker',
    waterDetection: 'Water Detection',
    greeting: 'Hello! I am your agricultural assistant. You can ask me anything about farming.',
    listening: 'Listening...',
    speaking: 'AI is speaking...',
    ready: 'Ready',
    pressToSpeak: 'Press to speak',
    quickQuestions: 'Quick Questions',
    soilHealth: 'Soil Health',
    cropRecommendation: 'Crop Recommendation',
    waterAnalysis: 'Water Analysis',
    analyzing: 'Analyzing...',
    analysisComplete: 'Analysis Complete',
    waterAnalysisResults: 'Water analysis results ready',
    askQuestion: 'You can ask your question'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    soilAnalysis: 'मिट्टी विश्लेषण',
    pestIdentification: 'कीट पहचान',
    voiceAssistant: 'आवाज सहायक',
    marketWeather: 'बाजार और मौसम',
    learningHub: 'शिक्षा केंद्र',
    scheduleTracker: 'शेड्यूल ट्रैकर',
    waterDetection: 'पानी की खोज',
    greeting: 'नमस्कार! मैं आपका कृषि सहायक हूं। आप मुझसे खेती के बारे में कुछ भी पूछ सकते हैं।',
    listening: 'सुन रहा हूं...',
    speaking: 'AI बोल रहा है...',
    ready: 'तैयार है',
    pressToSpeak: 'बोलने के लिए दबाएं',
    quickQuestions: 'जल्दी पूछें',
    soilHealth: 'मिट्टी की सेहत',
    cropRecommendation: 'फसल सुझाव',
    waterAnalysis: 'पानी विश्लेषण',
    analyzing: 'विश्लेषण कर रहे हैं...',
    analysisComplete: 'विश्लेषण पूरा',
    waterAnalysisResults: 'पानी विश्लेषण परिणाम तैयार',
    askQuestion: 'आप अपना सवाल पूछ सकते हैं'
  },
  te: {
    dashboard: 'డ్యాష్‌బోర్డ్',
    soilAnalysis: 'నేల విశ్లేషణ',
    pestIdentification: 'కీటకాల గుర్తింపు',
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    marketWeather: 'మార్కెట్ & వాతావరణం',
    learningHub: 'అభ్యాస కేంద్రం',
    scheduleTracker: 'షెడ్యూల్ ట్రాకర్',
    waterDetection: 'నీటి గుర్తింపు',
    greeting: 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడిని. వ్యవసాయం గురించి ఏదైనా అడగవచ్చు.',
    listening: 'వింటున్నాను...',
    speaking: 'AI మాట్లాడుతోంది...',
    ready: 'సిద్ధంగా ఉంది',
    pressToSpeak: 'మాట్లాడటానికి నొక్కండి',
    quickQuestions: 'త్వరిత ప్రశ్నలు',
    soilHealth: 'నేల ఆరోగ్యం',
    cropRecommendation: 'పంట సిఫార్సు',
    waterAnalysis: 'నీటి విశ్లేషణ',
    analyzing: 'విశ్లేషిస్తున్నాం...',
    analysisComplete: 'విశ్లేషణ పూర్తయింది',
    waterAnalysisResults: 'నీటి విశ్లేషణ ఫలితాలు సిద్ధం',
    askQuestion: 'మీరు మీ ప్రశ్న అడగవచ్చు'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');

  const translate = (key: string): string => {
    return translations[selectedLanguage]?.[key] || translations.en[key] || key;
  };

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('selectedLanguage');
    if (saved && languages.find(l => l.code === saved)) {
      setSelectedLanguage(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      selectedLanguage,
      setSelectedLanguage,
      languages,
      translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};