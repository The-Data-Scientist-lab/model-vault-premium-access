
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ShieldCheck } from 'lucide-react';

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
          return 100; // Ensure progress never exceeds 100
        }
        
        const newProgress = Math.min(prevProgress + 25/30, 100); // Completes in about 30 seconds, never exceeds 100
        
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
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-md border border-slate-200 shadow-lg bg-white">
        <CardHeader className="text-center pb-4 border-b border-slate-100">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
              <ShieldCheck className="h-8 w-8 text-theme-primary" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-slate-800">Verifying Your Payment</CardTitle>
          <p className="text-slate-600 mt-2">
            Please wait while we securely process your transaction
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Improved progress circle - single clean circle */}
          <div className="flex justify-center my-6">
            <div className="relative w-40 h-40">
              {/* Background circle */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-slate-100" 
                  strokeWidth="8"
                  stroke="currentColor" 
                  fill="transparent" 
                  r="46" 
                  cx="50" 
                  cy="50" 
                />
                <circle 
                  className="text-theme-primary transition-all duration-500 ease-in-out" 
                  strokeWidth="8" 
                  strokeDasharray={290}
                  strokeDashoffset={290 - (Math.min(progress, 100) / 100) * 290}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="46" 
                  cx="50" 
                  cy="50" 
                />
              </svg>
              {/* Inner content */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-bold text-slate-800">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-center text-sm italic text-slate-500 transition-opacity duration-500">{currentQuote}</p>
            
            {/* Clean verification steps with subtle animation */}
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-lg border border-slate-100">
              {verificationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-center transition-all duration-300 ease-in-out
                    ${index <= currentStep ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors duration-500
                    ${index < currentStep 
                      ? 'bg-theme-primary text-white' 
                      : index === currentStep 
                        ? 'bg-slate-400 text-white animate-pulse' 
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
          <div className="mt-2 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-theme-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerification;
