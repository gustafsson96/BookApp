// Function to handle login (POST request to backend login endpoint)
export async function login(email: string, password: string) {
    const response = await fetch("http://localhost:5252/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    return response.json();
  }

  // Function to register new user (POST request to backend register endpoint)
  export async function register(
    email: string,
    password: string,
    displayName: string
  ) {
    const response = await fetch("http://localhost:5252/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, displayName })
    });
  
    if (!response.ok) {
      throw new Error("Registration failed");
    }
  
    return response.json();
  }