
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PaymentVerification = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
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
        return prevProgress + 25/30; // Completes in about 30 seconds
      });
    }, 250);
    
    return () => {
      clearInterval(timer);
    };
  }, [navigate]);
  
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verifying Your Payment</CardTitle>
          <CardDescription className="text-center">
            Please wait while we verify your payment. This may take a few moments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-muted-foreground">
            Estimated time: 30 seconds
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerification;
