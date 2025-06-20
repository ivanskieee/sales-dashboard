import { useState, createContext, useContext } from "react";
import Dashboard from "./pages/Dashboard";

// Theme Context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}