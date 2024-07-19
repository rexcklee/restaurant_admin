import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

// Define the type for the context value
interface AuthContextValue {
  token: string | null;
  setToken: (newToken: string | null) => void;
  currentUser: string | null;
  setCurrentUser: (newCurrentUser: string | null) => void;
}

// Create the AuthContext with the specified type
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [currentUser, setCurrentUser_] = useState<string | null>(
    JSON.parse(localStorage.getItem("currentUser")!)
  );

  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const setCurrentUser = (newCurrentUser: string | null) => {
    setCurrentUser_(newCurrentUser);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [token, currentUser]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      currentUser,
      setCurrentUser,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
