
// In a real app, this would be an API call to the UPI verification API
// For now, we'll simulate the verification with a simple function

// Simulated database of UPI IDs and names
const upiDatabase = {
  // Common UPI IDs with realistic Indian names
  "user@upi": "Amit Sharma",
  "rahul@upi": "Rahul Kumar", 
  "priya@okaxis": "Priya Singh",
  "sandeep@ybl": "Sandeep Patel",
  "neha@icici": "Neha Gupta",
  "vijay@sbi": "Vijay Reddy",
  "anjali@paytm": "Anjali Desai",
  "aditya@gpay": "Aditya Joshi",
  "divya@ybl": "Divya Sharma",
  "ravi@okhdfcbank": "Ravi Verma"
};

export const verifyUpiId = async (upiId: string): Promise<{success: boolean, name?: string, error?: string}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!upiId) {
    return { success: false, error: "Please enter a UPI ID" };
  }
  
  // Basic UPI format validation
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  if (!upiRegex.test(upiId)) {
    return { success: false, error: "Invalid UPI ID format" };
  }
  
  // Check our simulated database
  const name = upiDatabase[upiId.toLowerCase() as keyof typeof upiDatabase];
  
  if (name) {
    return { success: true, name };
  } else {
    // In a real app, you'd call the actual UPI verification API
    // For demo purposes, let's generate a reasonable name
    const randomName = getRandomIndianName();
    return { success: true, name: randomName };
  }
};

// Helper function to generate random Indian names for demo purposes
const getRandomIndianName = (): string => {
  const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Arjun", "Kabir", "Reyansh", "Ayaan", "Atharv",
    "Ishaan", "Vihaan", "Aanya", "Aadhya", "Saanvi", "Myra", "Pari", "Ananya",
    "Aditi", "Kiara", "Advika", "Diya"
  ];
  
  const lastNames = [
    "Sharma", "Patel", "Singh", "Kumar", "Shah", "Verma", "Gupta", "Joshi",
    "Reddy", "Desai", "Malhotra", "Chopra", "Bhatia", "Kaur", "Mehta", "Agarwal",
    "Iyer", "Kapoor", "Nair", "Chauhan"
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};
