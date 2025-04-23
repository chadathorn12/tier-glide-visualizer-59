import { useState, useEffect } from "react";
import MembershipTier from "@/components/MembershipTier";
import { Moon, Sun } from "lucide-react";
import MainNav from "@/components/MainNav";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
    const validTheme = storedTheme === "dark" ? "dark" : "light";
    setTheme(validTheme);
    document.documentElement.classList.toggle("dark", validTheme === "dark");
    
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
      <MainNav />
      
      <main className="min-h-screen pt-20">
        <section className="w-full">
          <MembershipTier />
        </section>
      </main>

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
