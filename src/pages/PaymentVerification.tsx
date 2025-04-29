
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
    "Just a few more moments to complete your purchase.",
    "Your payment is being securely verified."
  ];
  
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  useEffect(() => {
    // Change quotes every 4 seconds with a fade effect
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  // Update the quote with a fade effect
  useEffect(() => {
    setCurrentQuote(quotes[quoteIndex]);
  }, [quoteIndex]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          // In a real app, this would be based on the actual payment verification
          // For this demo, we'll simulate a failed payment
          setTimeout(() => {
            navigate('/payment/failed');
          }, 1000);
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
      <Card className="w-full max-w-md border border-slate-200 shadow-md bg-white">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl text-slate-800">Verifying Your Payment</CardTitle>
          <p className="text-slate-600 mt-1">
            Please wait while we process your transaction
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Clean, elegant progress circle */}
          <div className="flex justify-center my-6">
            <div className="relative w-32 h-32">
              {/* Simple circle with clean design */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-slate-100" 
                  strokeWidth="8"
                  stroke="currentColor" 
                  fill="transparent" 
                  r="42" 
                  cx="50" 
                  cy="50" 
                />
                <circle 
                  className="text-slate-700" 
                  strokeWidth="8" 
                  strokeDasharray={264}
                  strokeDashoffset={264 - (progress / 100) * 264}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="42" 
                  cx="50" 
                  cy="50" 
                />
              </svg>
              {/* Inner content */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-bold text-slate-800">{Math.round(progress)}%</span>
                <div className="mt-1">
                  <Loader className="h-6 w-6 text-slate-600 animate-spin mx-auto" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-center text-sm italic text-slate-500 transition-opacity duration-500">{currentQuote}</p>
            
            {/* Clean verification steps with subtle animation */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
              {verificationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-center transition-all duration-300 ease-in-out
                    ${index <= currentStep ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors duration-500
                    ${index < currentStep 
                      ? 'bg-slate-700 text-white' 
                      : index === currentStep 
                        ? 'bg-slate-500 text-white animate-pulse' 
                        : 'bg-slate-200 text-slate-400'}`}>
                    {index < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm ${index <= currentStep ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 mt-4">
            <span>Processing...</span>
            <span>Estimated time: 30 seconds</span>
          </div>
          
          {/* Clean, simple progress bar at the bottom */}
          <div className="mt-2">
            <Progress value={progress} className="h-1 bg-slate-100" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerification;
