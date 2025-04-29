
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
  const possibleReasons = [
    "Transaction is pending or failed on banking side",
    "Payment details couldn't be verified in our system",
    "Network issue during payment processing",
    "Bank declined the transaction"
  ];

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="text-center pb-2 bg-gradient-to-r from-theme-primary/10 to-theme-accent/10 rounded-t-lg">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl text-destructive">Payment Verification Failed</CardTitle>
          <CardDescription className="mt-2">
            We were unable to verify your payment. This could be due to one of the following reasons:
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ul className="space-y-3">
            {possibleReasons.map((reason, index) => (
              <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive mr-3">
                  {index + 1}
                </div>
                <span className="text-sm">{reason}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">What should you do now?</h3>
            <p className="text-sm text-blue-700">
              If you've already made the payment, please wait a few minutes and check if the payment is processed. 
              If not, you can apply for a refund or contact our support team for assistance.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 bg-gradient-to-r from-theme-primary/5 to-theme-accent/5 rounded-b-lg">
          <Button asChild className="w-full bg-theme-primary hover:bg-theme-primary/90">
            <Link to="/refund-request">
              Apply for Refund
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-theme-primary/20 hover:bg-theme-primary/5">
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
