
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Loader } from 'lucide-react';

const PaymentVerification = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const verificationSteps = [
    "Initializing payment verification...",
    "Checking payment details...",
    "Validating transaction ID...",
    "Confirming payment amount...",
    "Finalizing verification..."
  ];
  
  const quotes = [
    "Almost there! We're processing your payment.",
    "Thank you for your patience. This won't take long.",
    "We're working hard to verify your transaction.",
    "Just a few more moments to complete your purchase."
  ];
  
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  
  useEffect(() => {
    // Change quotes every 5 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prevQuote => {
        const currentIndex = quotes.indexOf(prevQuote);
        return quotes[(currentIndex + 1) % quotes.length];
      });
    }, 5000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          // In a real app, this would be based on the actual payment verification
          // For this demo, we'll simulate a failed payment
          navigate('/payment/failed');
          return 100;
        }
        
        const newProgress = prevProgress + 25/30; // Completes in about 30 seconds
        
        // Update steps based on progress
        if (newProgress > 20 && currentStep < 1) {
          setCurrentStep(1);
        } else if (newProgress > 40 && currentStep < 2) {
          setCurrentStep(2);
        } else if (newProgress > 60 && currentStep < 3) {
          setCurrentStep(3);
        } else if (newProgress > 80 && currentStep < 4) {
          setCurrentStep(4);
        }
        
        return newProgress;
      });
    }, 250);
    
    return () => {
      clearInterval(timer);
    };
  }, [navigate, currentStep]);
  
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-md border-none shadow-lg bg-white">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl gradient-text">Verifying Your Payment</CardTitle>
          <p className="text-muted-foreground mt-1">
            Please wait while we process your transaction
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Animated progress circle */}
          <div className="flex justify-center my-6">
            <div className="relative w-32 h-32">
              {/* Outer circle */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-slate-200" 
                  strokeWidth="8"
                  stroke="currentColor" 
                  fill="transparent" 
                  r="42" 
                  cx="50" 
                  cy="50" 
                />
                <circle 
                  className="text-theme-primary" 
                  strokeWidth="8" 
                  strokeDasharray={264}
                  strokeDashoffset={264 - (progress / 100) * 264}
                  strokeLinecap="round" 
                  stroke="url(#gradient)" 
                  fill="transparent" 
                  r="42" 
                  cx="50" 
                  cy="50" 
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF3366" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner content */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                <div className="mt-1">
                  <Loader className="h-6 w-6 text-theme-primary animate-spin mx-auto" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-center text-sm italic text-muted-foreground">{currentQuote}</p>
            
            {/* Verification steps */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
              {verificationSteps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 
                    ${index <= currentStep 
                      ? 'bg-theme-primary text-white' 
                      : 'bg-slate-200 text-slate-400'}`}>
                    {index < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Estimated time: 30 seconds
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerification;
