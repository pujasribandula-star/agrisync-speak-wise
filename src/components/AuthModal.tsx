import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'language'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent Successfully",
        description: `Verification code sent to +91 ${phoneNumber}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setStep('language');
      toast({
        title: "Phone Verified",
        description: "Please select your preferred language",
      });
    }, 1000);
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    const selectedLang = languages.find(l => l.code === langCode);
    
    toast({
      title: "Language Selected",
      description: `Platform will now operate in ${selectedLang?.name}`,
    });
    
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {step === 'phone' && <Smartphone className="h-5 w-5 text-primary" />}
            {step === 'otp' && <MessageSquare className="h-5 w-5 text-primary" />}
            {step === 'language' && <Globe className="h-5 w-5 text-primary" />}
            <span>
              {step === 'phone' && 'Enter Mobile Number'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'language' && 'Select Language'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Phone Number Step */}
          {step === 'phone' && (
            <div className="space-y-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground">
                  We'll send a verification code to authenticate your account securely.
                </p>
              </Card>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0">
                    <span className="text-sm text-muted-foreground">+91</span>
                  </div>
                  <Input
                    id="phone"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-l-none"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSendOTP} 
                disabled={isLoading || phoneNumber.length < 10}
                variant="hero"
                className="w-full"
              >
                {isLoading ? "Sending OTP..." : "Send Verification Code"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <div className="space-y-4">
              <Card className="p-4 bg-accent/5 border-accent/20">
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to +91 {phoneNumber}
                </p>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                variant="success"
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => setStep('phone')}
                className="w-full text-sm"
              >
                Change phone number
              </Button>
            </div>
          )}

          {/* Language Selection Step */}
          {step === 'language' && (
            <div className="space-y-4">
              <Card className="p-4 bg-success/5 border-success/20">
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language. All features, voice assistant, and content will adapt to your selection.
                </p>
              </Card>

              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {languages.map((lang) => (
                  <Card
                    key={lang.code}
                    className={`p-3 cursor-pointer transition-spring hover:shadow-soft border-2 ${
                      selectedLanguage === lang.code 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/30'
                    }`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </div>
                    {selectedLanguage === lang.code && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Selected
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};