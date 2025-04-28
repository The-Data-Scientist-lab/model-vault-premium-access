
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  const possibleReasons = [
    "Invalid payment screenshot or QR code",
    "Payment amount doesn't match the plan price",
    "Transaction is pending or failed on banking side",
    "Payment details are not clear in the screenshot",
    "System couldn't verify the payment information"
  ];

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-center text-destructive">Payment Verification Failed</CardTitle>
          <CardDescription className="text-center">
            We were unable to verify your payment. This could be due to one of the following reasons:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {possibleReasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <span className="text-destructive mr-2">•</span>
                <span className="text-sm">{reason}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link to="/refund-request">
              Apply for Refund
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentFailed;
