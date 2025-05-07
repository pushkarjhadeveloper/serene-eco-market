
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Banknote, QrCode, IndianRupee, Check, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Card details form validation schema
const cardFormSchema = z.object({
  cardName: z.string().min(2, "Name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cardCvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  saveCard: z.boolean().optional(),
});

// UPI form validation schema
const upiFormSchema = z.object({
  upiId: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Enter a valid UPI ID (e.g. name@bank)"),
});

// Address form validation schema
const addressFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  addressLine1: z.string().min(5, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

type CardFormValues = z.infer<typeof cardFormSchema>;
type UPIFormValues = z.infer<typeof upiFormSchema>;
type AddressFormValues = z.infer<typeof addressFormSchema>;

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isAddressValid, setIsAddressValid] = useState<boolean>(false);
  const [isPaymentValid, setIsPaymentValid] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState<boolean>(false);
  const [upiVerified, setUpiVerified] = useState<boolean>(false);
  const [upiName, setUpiName] = useState<string>("");
  const [useQrCode, setUseQrCode] = useState<boolean>(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Pre-filled UPI ID
  const predefinedUpiId = "9911258992.wa.ecz@waicici";
  const upiOwnerName = "SANTOSH KUMAR JHA";
  const upiMobileNumber = "+91 99112 58992";

  // Card payment form
  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      saveCard: false,
    }
  });

  // UPI payment form
  const upiForm = useForm<UPIFormValues>({
    resolver: zodResolver(upiFormSchema),
    defaultValues: {
      upiId: predefinedUpiId,
    }
  });

  // Address form
  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    }
  });

  const handleVerifyUpiManually = () => {
    // Since this is a pre-defined UPI, we'll just set it as verified
    setUpiVerified(true);
    setUpiName(upiOwnerName);
    toast({
      title: "UPI Verified",
      description: "UPI ID verified successfully.",
    });
  };

  const handleContinue = () => {
    if (paymentMethod === "card") {
      const isCardValid = cardForm.formState.isValid;
      if (!isCardValid) {
        cardForm.trigger();
        return;
      }
      setIsPaymentValid(true);
    } else if (paymentMethod === "upi") {
      if (useQrCode) {
        // QR code scanning is considered pre-verified since it's our own QR code
        setIsPaymentValid(true);
      } else if (!upiVerified) {
        toast({
          variant: "destructive",
          title: "UPI not verified",
          description: "Please verify your UPI ID before continuing.",
        });
        return;
      } else {
        setIsPaymentValid(true);
      }
    } else if (paymentMethod === "cod") {
      setIsPaymentValid(true);
    }

    const isAddressFormValid = addressForm.formState.isValid;
    if (!isAddressFormValid) {
      addressForm.trigger();
      return;
    }
    setIsAddressValid(true);

    setIsReviewOpen(true);
  };

  const handlePlaceOrder = () => {
    setIsReviewOpen(false);
    setIsThankYouOpen(true);
  };

  const closeThankYouDialog = () => {
    setIsThankYouOpen(false);
    navigate("/");
  };

  // Sample cart items for review
  const cartItems = [
    { name: "Bamboo End Table", price: "₹9,999", quantity: 1 },
    { name: "Organic Cotton Throw Pillow", price: "₹3,499", quantity: 2 },
    { name: "Reclaimed Wood Shelf", price: "₹6,499", quantity: 1 },
  ];
  
  return (
    <Layout>
      <div className="eco-container py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-eco-moss mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Address Section */}
            <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 overflow-hidden p-6">
              <h2 className="text-xl font-medium text-eco-moss mb-6 flex items-center">
                <MapPin className="mr-2" size={20} />
                Shipping Address
              </h2>
              
              <Form {...addressForm}>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={addressForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={addressForm.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="House No, Building Name, Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addressForm.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Landmark, Area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={addressForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input placeholder="6-digit pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
            
            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 overflow-hidden p-6">
              <h2 className="text-xl font-medium text-eco-moss mb-6">Payment Method</h2>
              
              <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="card" className="flex items-center">
                    <CreditCard className="mr-2" size={16} />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="upi" className="flex items-center">
                    <QrCode className="mr-2" size={16} />
                    UPI
                  </TabsTrigger>
                  <TabsTrigger value="cod" className="flex items-center">
                    <IndianRupee className="mr-2" size={16} />
                    Cash on Delivery
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="card">
                  <Form {...cardForm}>
                    <form className="space-y-4">
                      <FormField
                        control={cardForm.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="Name as appears on card" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cardForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={cardForm.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cardForm.control}
                          name="cardCvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          className="mr-2"
                          {...cardForm.register("saveCard")}
                        />
                        <label htmlFor="saveCard" className="text-sm text-eco-bark">
                          Save card for future payments
                        </label>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="upi">
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="bg-gray-100 p-4 rounded-lg flex-shrink-0 md:max-w-[280px] w-full">
                        <div className="text-center">
                          <h3 className="font-medium text-eco-moss mb-2">Scan QR Code</h3>
                          <div className="bg-white p-3 rounded-lg mb-3 inline-block">
                            <img 
                              src="/lovable-uploads/d669c61b-4b00-4761-9231-2d69541047fb.png" 
                              alt="UPI QR Code" 
                              className="w-full max-w-[220px] mx-auto"
                            />
                          </div>
                          <div className="text-sm text-eco-bark">
                            <p className="font-medium">{upiOwnerName}</p>
                            <p className="text-xs mb-2">UPI ID: {predefinedUpiId}</p>
                            <p className="text-xs">{upiMobileNumber}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow space-y-4 w-full">
                        <div className="mb-4">
                          <div className="flex items-center mb-3">
                            <input 
                              type="radio" 
                              id="scanQr" 
                              name="upiMethod" 
                              className="mr-2" 
                              checked={useQrCode} 
                              onChange={() => setUseQrCode(true)}
                            />
                            <label htmlFor="scanQr" className="text-sm font-medium text-eco-bark">
                              Scan QR code with any UPI app
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="enterUpi" 
                              name="upiMethod" 
                              className="mr-2" 
                              checked={!useQrCode} 
                              onChange={() => setUseQrCode(false)}
                            />
                            <label htmlFor="enterUpi" className="text-sm font-medium text-eco-bark">
                              Enter UPI ID manually
                            </label>
                          </div>
                        </div>
                        
                        {!useQrCode && (
                          <Form {...upiForm}>
                            <form className="space-y-4">
                              <div className="flex items-end gap-4">
                                <div className="flex-grow">
                                  <FormField
                                    control={upiForm.control}
                                    name="upiId"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>UPI ID</FormLabel>
                                        <FormControl>
                                          <Input placeholder="name@upi" {...field} disabled={upiVerified} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <Button 
                                  onClick={handleVerifyUpiManually} 
                                  type="button"
                                  variant="outline"
                                  className="border-eco-sage text-eco-moss"
                                  disabled={upiVerified}
                                >
                                  {upiVerified ? "Verified" : "Verify"}
                                  {upiVerified && <Check size={16} className="ml-2" />}
                                </Button>
                              </div>
                              
                              {upiVerified && (
                                <div className="bg-eco-sage/10 border border-eco-sage/30 rounded-md p-3">
                                  <p className="text-sm text-eco-moss">
                                    <span className="font-medium">Verified Name:</span> {upiName}
                                  </p>
                                </div>
                              )}
                            </form>
                          </Form>
                        )}
                        
                        {useQrCode && (
                          <div className="bg-eco-sage/10 border border-eco-sage/30 rounded-md p-3">
                            <p className="text-sm text-eco-moss">
                              <strong>How to pay:</strong>
                            </p>
                            <ol className="text-sm text-eco-bark list-decimal ml-5 mt-2 space-y-1">
                              <li>Open any UPI app on your phone (Google Pay, PhonePe, Paytm, etc.)</li>
                              <li>Choose "Scan QR" option in your app</li>
                              <li>Scan the QR code shown</li>
                              <li>Verify the name ({upiOwnerName}) and complete the payment</li>
                              <li>Once payment is complete, click "Continue" below</li>
                            </ol>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="cod">
                  <div className="bg-eco-sage/10 border border-eco-sage/30 rounded-md p-4">
                    <div className="flex items-start">
                      <Banknote className="mr-3 text-eco-moss mt-1" size={20} />
                      <div>
                        <h3 className="font-medium text-eco-moss">Cash on Delivery</h3>
                        <p className="text-sm text-eco-bark mt-1">
                          Pay with cash when your order is delivered. A convenience fee of ₹40 will be added to your order.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleContinue} className="eco-button">
                Continue
              </Button>
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-eco-sand/30 p-6 sticky top-24">
              <h2 className="text-xl font-medium text-eco-moss mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-eco-bark">
                      {item.name} <span className="text-eco-sage">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-eco-moss">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-eco-sand/30 pt-4 space-y-3 text-eco-bark">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹19,996</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹299</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹3,599</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between">
                    <span>COD Fee</span>
                    <span>₹40</span>
                  </div>
                )}
                
                <div className="border-t border-eco-sand/30 pt-3 mt-3 flex justify-between font-medium text-eco-moss">
                  <span>Total</span>
                  <span>₹{paymentMethod === "cod" ? "23,934" : "23,894"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Review Dialog */}
        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">Review Your Order</DialogTitle>
              <DialogDescription>
                Please review your order details before placing your order.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-eco-moss mb-2">Shipping Address</h3>
                <div className="bg-eco-sand/10 rounded-md p-3 text-sm">
                  <p className="font-medium">
                    {addressForm.getValues("fullName")}
                  </p>
                  <p>{addressForm.getValues("addressLine1")}</p>
                  {addressForm.getValues("addressLine2") && (
                    <p>{addressForm.getValues("addressLine2")}</p>
                  )}
                  <p>
                    {addressForm.getValues("city")}, {addressForm.getValues("state")} - {addressForm.getValues("pincode")}
                  </p>
                  <p>Phone: {addressForm.getValues("phone")}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-eco-moss mb-2">Payment Method</h3>
                <div className="bg-eco-sand/10 rounded-md p-3 text-sm">
                  {paymentMethod === "card" && (
                    <p>
                      Card payment - {cardForm.getValues("cardNumber").slice(-4).padStart(16, '*')}
                    </p>
                  )}
                  {paymentMethod === "upi" && (
                    <p>UPI payment - {useQrCode ? "QR Code scan" : upiForm.getValues("upiId")}</p>
                  )}
                  {paymentMethod === "cod" && (
                    <p>Cash on Delivery</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-eco-moss mb-2">Order Items</h3>
                <div className="bg-eco-sand/10 rounded-md p-3 text-sm">
                  <div className="space-y-2">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-eco-sand/30 mt-3 pt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{paymentMethod === "cod" ? "23,934" : "23,894"}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handlePlaceOrder} className="eco-button">
                  Place Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Thank You Dialog */}
        <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
          <DialogContent className="max-w-md text-center">
            <div className="py-6">
              <div className="w-20 h-20 rounded-full bg-eco-sage/20 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-eco-sage" />
              </div>
              <h2 className="text-2xl font-serif text-eco-moss mb-4">Thank You for Your Order!</h2>
              <p className="text-eco-bark mb-6">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>
              <p className="font-medium text-eco-moss mb-8">
                Order #: SR{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <Button onClick={closeThankYouDialog} className="eco-button">
                Continue Shopping
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
