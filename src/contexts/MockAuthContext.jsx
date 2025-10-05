import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsSignedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const signIn = {
    create: async ({ identifier, password }) => {
      if (identifier && password) {
        const mockUser = {
          id: '1',
          fullName: 'John Doe',
          emailAddress: identifier,
          emailAddresses: [{ emailAddress: identifier }],
          createdAt: new Date().toISOString(),
          imageUrl: null
        };
        
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsSignedIn(true);
        
        return { status: 'complete' };
      }
      throw new Error('Invalid credentials');
    },
    authenticateWithRedirect: async ({ strategy, redirectUrl }) => {
      const mockUser = {
        id: '1',
        fullName: 'Google User',
        emailAddress: 'user@gmail.com',
        emailAddresses: [{ emailAddress: 'user@gmail.com' }],
        createdAt: new Date().toISOString(),
        imageUrl: null
      };
      
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsSignedIn(true);
      
      return { status: 'complete' };
    }
  };

  const signUp = {
    create: async ({ emailAddress, password, firstName, lastName }) => {
      if (emailAddress && password && firstName) {
        const mockUser = {
          id: '1',
          fullName: `${firstName} ${lastName}`.trim(),
          emailAddress: emailAddress,
          emailAddresses: [{ emailAddress: emailAddress }],
          createdAt: new Date().toISOString(),
          imageUrl: null
        };
        
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsSignedIn(true);
        
        return { status: 'complete' };
      }
      throw new Error('Registration failed');
    }
  };

  const signOut = async () => {
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        isSignedIn,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
