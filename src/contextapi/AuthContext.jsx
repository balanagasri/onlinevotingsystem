import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) {
  // Load initial state from localStorage or default to false
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isVoterLoggedIn, setIsVoterLoggedIn] = useState(() => {
    return localStorage.getItem('isVoterLoggedIn') === 'true';
  });

  const [isCandidateLoggedIn, setIsCandidateLoggedIn] = useState(() => {
    return localStorage.getItem('isCandidateLoggedIn') === 'true';
  });

  // Add adminId state, initialized from localStorage or null if not present
  const [adminId, setAdminId] = useState(() => {
    return localStorage.getItem('adminId') || null;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isVoterLoggedIn', isVoterLoggedIn);
    localStorage.setItem('isCandidateLoggedIn', isCandidateLoggedIn);
    localStorage.setItem('adminId', adminId || ''); // Save adminId to localStorage
  }, [isAdminLoggedIn, isVoterLoggedIn, isCandidateLoggedIn, adminId]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isVoterLoggedIn,
        setIsVoterLoggedIn,
        isCandidateLoggedIn,
        setIsCandidateLoggedIn,
        adminId, // Expose adminId
        setAdminId, // Expose setAdminId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);