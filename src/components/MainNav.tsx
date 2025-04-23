
import { Home, Gift } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const location = useLocation();
  
  const items = [
    {
      title: "หน้าหลัก",
      href: "/",
      icon: Home
    },
    {
      title: "แลกของรางวัล",
      href: "/rewards",
      icon: Gift
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              BUS Rewards
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 flex items-center gap-2",
                  location.pathname === item.href
                    ? "text-foreground font-semibold"
                    : "text-foreground/60"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
