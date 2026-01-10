// Quick test file for authentication API
// Run in browser console or as a standalone script

const API_BASE_URL = 'https://ejiwirjgosdyeulhcejt.supabase.co/functions/v1/auth';

// Test Signup
async function testSignup() {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123',
        first_name: 'Test',
        last_name: 'User',
        role: 'candidate'
      }),
    });

    const data = await response.json();
    console.log('Signup Response:', data);
    
    if (response.ok) {
      console.log('✅ Signup successful!');
      return data;
    } else {
      console.error('❌ Signup failed:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Signup error:', error);
    return null;
  }
}

// Test Login
async function testLogin(email = 'nikolicnikola5551@gmail.com', password = 'nikola123') {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log('Login Response:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Access Token:', data.access_token);
      console.log('User:', data.user);
      return data;
    } else {
      console.error('❌ Login failed:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    return null;
  }
}

// Run tests
async function runTests() {
  console.log('🧪 Testing Authentication API...\n');
  
  console.log('1️⃣ Testing Login with existing user...');
  const loginResult = await testLogin();
  
  if (loginResult) {
    console.log('\n✅ All tests passed!');
  } else {
    console.log('\n❌ Some tests failed');
  }
}

// Uncomment to run tests
// runTests();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testSignup, testLogin, runTests };
}
