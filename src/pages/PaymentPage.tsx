
import { useState, useEffect } from 'react';
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { planTitle, planPrice, usdPrice, platformFee, usdPlatformFee, totalAmount, usdTotalAmount, modelId, paymentCountry } = 
    location.state || { 
      planTitle: 'Basic Plan', 
      planPrice: 449, 
      usdPrice: 7,
      platformFee: 12, 
      usdPlatformFee: 3,
      totalAmount: 461, 
      usdTotalAmount: 10,
      modelId: 'default-model',
      paymentCountry: 'india' 
    };
    
  // Set default payment method based on the country selected in the previous step
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'binance'>(paymentCountry === 'international' ? 'binance' : 'upi');
  
  // Set the correct tab based on country selection
  useEffect(() => {
    if (paymentCountry === 'international') {
      setPaymentMethod('binance');
    } else {
      setPaymentMethod('upi');
    }
  }, [paymentCountry]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 gradient-text">Complete Your Payment</h1>
      
      <Tabs defaultValue={paymentMethod} value={paymentMethod} className="w-full" onValueChange={(value) => setPaymentMethod(value as 'upi' | 'binance')}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upi" disabled={paymentCountry === 'international'}>Indian Payment (UPI)</TabsTrigger>
          <TabsTrigger value="binance" disabled={paymentCountry === 'india'}>International (Binance)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upi" className="mt-6">
          <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader className="bg-gradient-to-r from-theme-primary/10 to-theme-accent/10 rounded-t-lg">
              <CardTitle className="gradient-text">UPI Payment</CardTitle>
              <CardDescription>
                Scan the QR code or pay to UPI ID: {MERCHANT_UPI_ID}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center mb-4 bg-card shadow-inner">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${generateQRCodeUrl(MERCHANT_UPI_ID, totalAmount, `Payment for ${planTitle}`)}`} 
                    alt="Payment QR Code" 
                    className="max-w-full h-auto rounded-md" 
                  />
                </div>
                <div className="bg-theme-primary/10 px-4 py-2 rounded-full">
                  <p className="text-center font-medium">Pay <span className="font-bold text-theme-primary">₹{totalAmount}</span></p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  (₹{planPrice} + ₹{platformFee} platform fee)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-theme-primary">Payment Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <li>Open your UPI app (Google Pay, PhonePe, etc.)</li>
                    <li>Scan QR code or pay to UPI ID: <span className="font-medium">{MERCHANT_UPI_ID}</span></li>
                    <li>Enter amount: <span className="font-medium">₹{totalAmount}</span></li>
                    <li>Complete payment and take a screenshot</li>
                    <li>Upload screenshot below</li>
                  </ol>
                </div>
                
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <label className="block text-sm font-medium text-theme-primary">Upload Payment Screenshot</label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  
                  {previewUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Screenshot Preview:</p>
                      <div className="border rounded-md overflow-hidden max-h-48 flex items-center justify-center bg-white">
                        <img 
                          src={previewUrl} 
                          alt="Payment Screenshot" 
                          className="max-h-48 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedFile && !previewUrl && (
                    <p className="text-sm text-green-500">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-theme-primary/5 to-theme-accent/5 rounded-b-lg">
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
          <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader className="bg-gradient-to-r from-theme-primary/10 to-theme-accent/10 rounded-t-lg">
              <CardTitle className="gradient-text">Binance Payment</CardTitle>
              <CardDescription>
                Complete your payment through Binance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center mb-4 bg-card shadow-inner">
                  {/* Binance QR code */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=binance://pay?amount=${usdTotalAmount}&currency=USDT&recipient=YourBinanceID`} 
                    alt="Binance Payment QR Code" 
                    className="max-w-full h-auto rounded-md" 
                  />
                </div>
                <div className="bg-theme-primary/10 px-4 py-2 rounded-full">
                  <p className="text-center font-medium">Pay <span className="font-bold text-theme-primary">${usdTotalAmount}</span></p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  (${usdPrice} + ${usdPlatformFee} platform fee)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-theme-primary">Payment Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <li>Open your Binance app</li>
                    <li>Scan the QR code above</li>
                    <li>Enter amount: <span className="font-medium">${usdTotalAmount} USDT</span></li>
                    <li>Complete payment and take a screenshot</li>
                    <li>Upload screenshot below</li>
                  </ol>
                </div>
                
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <label className="block text-sm font-medium text-theme-primary">Upload Payment Screenshot</label>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  
                  {previewUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Screenshot Preview:</p>
                      <div className="border rounded-md overflow-hidden max-h-48 flex items-center justify-center bg-white">
                        <img 
                          src={previewUrl} 
                          alt="Payment Screenshot" 
                          className="max-h-48 max-w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedFile && !previewUrl && (
                    <p className="text-sm text-green-500">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-theme-primary/5 to-theme-accent/5 rounded-b-lg">
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
