
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';

// Mock UPI ID - replace with your actual UPI ID
const MERCHANT_UPI_ID = "example@upi";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'binance'>('upi');
  
  const { planTitle, planPrice, usdPrice, platformFee, usdPlatformFee, totalAmount, usdTotalAmount, modelId } = 
    location.state || { 
      planTitle: 'Basic Plan', 
      planPrice: 449, 
      usdPrice: 7,
      platformFee: 12, 
      usdPlatformFee: 3,
      totalAmount: 461, 
      usdTotalAmount: 10,
      modelId: 'default-model' 
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmitPayment = () => {
    // In a real app, you'd upload the screenshot to a server here
    navigate('/payment/verification');
  };

  const generateQRCodeUrl = (upiId: string, amount: number, desc: string) => {
    // This is a simple QR code generator for UPI. In a production app, use a proper UPI QR library
    const encodedDesc = encodeURIComponent(desc);
    return `upi://pay?pa=${upiId}&am=${amount}&pn=ModelVault&tn=${encodedDesc}`;
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Complete Your Payment</h1>
      
      <Tabs defaultValue={paymentMethod} className="w-full" onValueChange={(value) => setPaymentMethod(value as 'upi' | 'binance')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upi">Indian Payment (UPI)</TabsTrigger>
          <TabsTrigger value="binance">International (Binance)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>UPI Payment</CardTitle>
              <CardDescription>
                Scan the QR code or pay to UPI ID: {MERCHANT_UPI_ID}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center mb-4 bg-card">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${generateQRCodeUrl(MERCHANT_UPI_ID, totalAmount, `Payment for ${planTitle}`)}`} 
                    alt="Payment QR Code" 
                    className="max-w-full h-auto" 
                  />
                </div>
                <p className="text-center mb-4">Pay <span className="font-bold">₹{totalAmount}</span></p>
                <p className="text-sm text-muted-foreground mb-6">
                  (₹{planPrice} + ₹{platformFee} platform fee)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Payment Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Open your UPI app (Google Pay, PhonePe, etc.)</li>
                    <li>Scan QR code or pay to UPI ID: {MERCHANT_UPI_ID}</li>
                    <li>Enter amount: ₹{totalAmount}</li>
                    <li>Complete payment and take a screenshot</li>
                    <li>Upload screenshot below</li>
                  </ol>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Upload Payment Screenshot</label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-green-500">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-theme-primary hover:bg-theme-primary/90"
                disabled={!selectedFile}
                onClick={handleSubmitPayment}
              >
                Submit Payment Proof
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="binance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Binance Payment</CardTitle>
              <CardDescription>
                Complete your payment through Binance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                <div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center mb-4 bg-card">
                  {/* Placeholder for Binance QR code/details */}
                  <div className="h-48 w-48 flex items-center justify-center bg-muted/30 rounded">
                    <p className="text-center text-sm">Binance Payment Details</p>
                  </div>
                </div>
                <p className="text-center mb-4">Pay <span className="font-bold">${usdTotalAmount}</span></p>
                <p className="text-sm text-muted-foreground mb-6">
                  (${usdPrice} + ${usdPlatformFee} platform fee)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Payment Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Open your Binance app</li>
                    <li>Enter the provided Binance details</li>
                    <li>Enter amount: ${usdTotalAmount}</li>
                    <li>Complete payment and take a screenshot</li>
                    <li>Upload screenshot below</li>
                  </ol>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Upload Payment Screenshot</label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-green-500">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-theme-primary hover:bg-theme-primary/90"
                disabled={!selectedFile}
                onClick={handleSubmitPayment}
              >
                Submit Payment Proof
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPage;
