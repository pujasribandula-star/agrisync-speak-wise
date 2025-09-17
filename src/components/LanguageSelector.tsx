import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage, languages } = useLanguage();

  return (
    <div className="bg-primary/5 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 py-3">
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">भाषा चुनें / Select Language:</span>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  selectedLanguage === lang.code 
                    ? 'bg-primary text-primary-foreground shadow-soft' 
                    : 'hover:bg-primary/10'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-xs">{lang.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};