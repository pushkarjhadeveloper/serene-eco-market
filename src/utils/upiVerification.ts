
// In a real app, this would call an actual UPI verification API
// For this demo, we're simulating a more robust verification system

// Simulated database of UPI IDs and names (expanded with more realistic entries)
const upiDatabase: Record<string, string> = {
  // Common payment apps UPI handles with realistic Indian names
  "user@upi": "Amit Sharma",
  "rahul@upi": "Rahul Kumar", 
  "priya@okaxis": "Priya Singh",
  "sandeep@ybl": "Sandeep Patel",
  "neha@icici": "Neha Gupta",
  "vijay@sbi": "Vijay Reddy",
  "anjali@paytm": "Anjali Desai",
  "aditya@gpay": "Aditya Joshi",
  "divya@ybl": "Divya Sharma",
  "ravi@okhdfcbank": "Ravi Verma",
  
  // Additional UPI handles for major payment apps
  "ankit@oksbi": "Ankit Verma",
  "meera@okicici": "Meera Patel",
  "suresh@ybl": "Suresh Kumar",
  "pooja@paytm": "Pooja Sharma",
  "vikram@gpay": "Vikram Singh",
  "sneha@okhdfc": "Sneha Gupta",
  "rohit@upi": "Rohit Desai",
  "kavita@okhdfcbank": "Kavita Joshi",
  "arjun@ybl": "Arjun Nair",
  "ritika@okaxis": "Ritika Reddy"
};

// Bank-specific UPI handle patterns
const bankPatterns = {
  'okaxis': 'Axis Bank',
  'oksbi': 'State Bank of India',
  'okicici': 'ICICI Bank',
  'okhdfc': 'HDFC Bank',
  'okhdfcbank': 'HDFC Bank',
  'ybl': 'Yes Bank / PhonePe',
  'paytm': 'Paytm Payments Bank',
  'gpay': 'Google Pay',
  'upi': 'UPI'
};

export const verifyUpiId = async (upiId: string): Promise<{success: boolean, name?: string, error?: string, bankName?: string}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!upiId) {
    return { success: false, error: "Please enter a UPI ID" };
  }
  
  // Basic UPI format validation (username@handle)
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  if (!upiRegex.test(upiId)) {
    return { success: false, error: "Invalid UPI ID format" };
  }
  
  // Extract bank/payment app handle from UPI ID
  const handle = upiId.split('@')[1];
  const bankName = Object.entries(bankPatterns).find(([pattern]) => handle.includes(pattern))?.[1] || 'Unknown Bank';
  
  // Check our simulated database
  const name = upiDatabase[upiId.toLowerCase() as keyof typeof upiDatabase];
  
  if (name) {
    return { success: true, name, bankName };
  } else {
    // In a real app, this would make an API call to the RBI's UPI verification system
    // For demo purposes, we'll generate a reasonable name
    const randomName = getRandomIndianName();
    return { success: true, name: randomName, bankName };
  }
};

// Verify UPI Customer Number
export const verifyUpiCustomerNumber = async (customerNumber: string): Promise<{success: boolean, isValid?: boolean, error?: string}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!customerNumber) {
    return { success: false, error: "Please enter a customer number" };
  }
  
  // Basic validation for a 10-digit mobile number
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(customerNumber)) {
    return { success: false, error: "Invalid mobile number format. Please enter a valid 10-digit Indian mobile number." };
  }
  
  // In a real app, you would call the actual UPI verification API
  // For demo purposes, we'll assume most numbers are valid
  // We'll make numbers ending with "0000" invalid for testing
  const isValid = !customerNumber.endsWith("0000");
  
  return {
    success: true,
    isValid
  };
};

// Helper function to generate random Indian names for demo purposes
const getRandomIndianName = (): string => {
  const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Arjun", "Kabir", "Reyansh", "Ayaan", "Atharv",
    "Ishaan", "Vihaan", "Aanya", "Aadhya", "Saanvi", "Myra", "Pari", "Ananya",
    "Aditi", "Kiara", "Advika", "Diya", "Rajesh", "Sunita", "Manoj", "Alok",
    "Deepak", "Ramesh", "Suresh", "Anita", "Sanjay", "Rekha"
  ];
  
  const lastNames = [
    "Sharma", "Patel", "Singh", "Kumar", "Shah", "Verma", "Gupta", "Joshi",
    "Reddy", "Desai", "Malhotra", "Chopra", "Bhatia", "Kaur", "Mehta", "Agarwal",
    "Iyer", "Kapoor", "Nair", "Chauhan", "Patil", "Das", "Rao", "Mehra",
    "Trivedi", "Tiwari", "Chatterjee", "Bose", "Banerjee", "Jain"
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};
