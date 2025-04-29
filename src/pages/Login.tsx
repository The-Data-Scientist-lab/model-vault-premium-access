
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Info, Mail, Phone, Calendar } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 18;
  }, { message: "You must be at least 18 years old" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState("login");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [ageError, setAgeError] = useState<string | null>(null);
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("Login form submitted:", data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      login({
        email: data.email,
        name: data.email.split('@')[0],
      });
      
      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const age = parseInt(data.age);
      if (age < 18) {
        setAgeError("You must be at least 18 years old to use this service");
        setIsLoading(false);
        return;
      }

      console.log("Signup form submitted:", data);
      
      // Show verification step
      setShowVerification(true);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleVerification = () => {
    if (verificationCode.length === 6) {
      // Simulate verification
      toast.success("Account created successfully!");
      setIsLoading(false);
      setShowVerification(false);
      setTabValue("login");
    } else {
      toast.error("Please enter a valid verification code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-md border border-slate-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Welcome to ModelVault
          </CardTitle>
          <CardDescription className="text-slate-500">
            {tabValue === "login" 
              ? "Sign in to access exclusive content" 
              : "Create an account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showVerification ? (
            <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-slate-400">
                              <Mail className="ml-3 h-4 w-4 text-slate-500" />
                              <Input placeholder="your@email.com" {...field} className="border-0 focus-visible:ring-0" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="text-right">
                      <Button variant="link" className="text-slate-500 p-0 h-auto" onClick={() => toast.info("Password reset functionality will be added soon")}>
                        Forgot password?
                      </Button>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-slate-400">
                              <Mail className="ml-3 h-4 w-4 text-slate-500" />
                              <Input placeholder="your@email.com" {...field} className="border-0 focus-visible:ring-0" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={signupForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-slate-400">
                                <Phone className="ml-3 h-4 w-4 text-slate-500" />
                                <Input placeholder="+1 (555) 000-0000" {...field} className="border-0 focus-visible:ring-0" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signupForm.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-slate-400">
                                <Calendar className="ml-3 h-4 w-4 text-slate-500" />
                                <Input type="number" placeholder="21" {...field} className="border-0 focus-visible:ring-0" />
                              </div>
                            </FormControl>
                            {ageError && <p className="text-sm font-medium text-red-500 mt-1">{ageError}</p>}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-start space-x-2 text-sm text-slate-600">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-500" />
                      <p>By signing up, you agree to our Terms of Service and Privacy Policy. You must be at least 18 years old.</p>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-slate-800 mb-1">Verify Your Email</h3>
                <p className="text-sm text-slate-500">We've sent a verification code to your email. Please enter it below.</p>
              </div>
              
              <div className="flex justify-center my-4">
                <InputOTP maxLength={6} value={verificationCode} onChange={setVerificationCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                onClick={handleVerification}
                className="w-full bg-slate-800 hover:bg-slate-700"
                disabled={verificationCode.length !== 6}
              >
                Verify Account
              </Button>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-slate-500"
                  onClick={() => setShowVerification(false)}
                >
                  Go back
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        {!showVerification && (
          <CardFooter>
            <div className="w-full text-center text-sm text-slate-500">
              {tabValue === "login" ? (
                <p>Don't have an account? <Button variant="link" className="p-0 h-auto text-slate-700" onClick={() => setTabValue("signup")}>Sign up</Button></p>
              ) : (
                <p>Already have an account? <Button variant="link" className="p-0 h-auto text-slate-700" onClick={() => setTabValue("login")}>Login</Button></p>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Login;
