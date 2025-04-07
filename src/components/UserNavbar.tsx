
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const UserNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tests", path: "/tests" },
    { name: "Analytics", path: "/analytics" },
    { name: "Resources", path: "/resources" },
  ];

  const userNavOptions = [
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm" 
          : "bg-white"
      } transition-all duration-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 mr-2">TestAI</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              Start New Test
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userNavOptions.map((option, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={option.path}>{option.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="text-lg font-medium text-slate-800 hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t space-y-4">
                    {userNavOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={option.path}
                        className="block text-lg font-medium text-slate-800 hover:text-blue-600"
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
