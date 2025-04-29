
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
      <Card className="w-full max-w-md border border-slate-200 shadow-md bg-white">
        <CardHeader className="text-center pb-2 bg-slate-50 rounded-t-lg border-b border-slate-100">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-slate-700" />
            </div>
          </div>
          <CardTitle className="text-xl text-slate-800">Payment Verification Failed</CardTitle>
          <CardDescription className="mt-2 text-slate-600">
            We were unable to verify your payment. This could be due to one of the following reasons:
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ul className="space-y-3">
            {possibleReasons.map((reason, index) => (
              <li key={index} className="flex items-start bg-white p-3 rounded-lg border border-slate-100">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 mr-3">
                  {index + 1}
                </div>
                <span className="text-sm text-slate-700">{reason}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h3 className="text-sm font-medium text-slate-800 mb-2">What should you do now?</h3>
            <p className="text-sm text-slate-600">
              If you've already made the payment, please wait a few minutes and check if the payment is processed. 
              If not, you can apply for a refund or contact our support team for assistance.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 bg-slate-50 rounded-b-lg border-t border-slate-100">
          <Button asChild className="w-full bg-slate-800 hover:bg-slate-700 text-white shadow-sm">
            <Link to="/refund-request">
              Apply for Refund
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-slate-300 hover:bg-slate-100 text-slate-700">
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
