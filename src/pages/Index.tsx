
import { useState, useEffect } from "react";
import MembershipTier from "@/components/MembershipTier";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Check system preference for dark mode
  useEffect(() => {
    // Get stored theme or system preference
    const storedTheme = localStorage.getItem("theme") || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
    
    // Ensure the value is either "dark" or "light" before setting state
    const validTheme = storedTheme === "dark" ? "dark" : "light";
    setTheme(validTheme);
    document.documentElement.classList.toggle("dark", validTheme === "dark");
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  return (
    <div className={theme}>
      <MembershipTier />
      
      {/* Theme toggle with improved design */}
      <button 
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-gray-800" />
        ) : (
          <Sun className="w-5 h-5 text-gray-200" />
        )}
      </button>
    </div>
  );
};

export default Index;
