
import { useState, useEffect } from "react";
import MembershipTier from "@/components/MembershipTier";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
    }
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <MembershipTier />
      
      {/* Theme toggle */}
      <button 
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="fixed bottom-6 right-6 p-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg z-50"
        aria-label="Toggle dark mode"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default Index;
