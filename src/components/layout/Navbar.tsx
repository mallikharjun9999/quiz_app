
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Simple check if user is logged in (this would be replaced by actual auth state)
  const isLoggedIn = location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/";
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[rgba(80,126,111,1)] flex min-h-[72px] w-full flex-col items-stretch justify-center px-6 md:px-16 max-md:max-w-full">
      <div className="flex w-full items-center justify-between max-md:flex-wrap">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/cc95ec7fca422430081dbd06d1db24fc625d4d37?placeholderIfAbsent=true"
              className="aspect-[2.33] object-contain w-[84px]"
              alt="Quiz Platform Logo"
            />
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8 text-base text-white font-normal">
          <Link to="/" className="whitespace-nowrap">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/categories" className="whitespace-nowrap">
              Quizzes
            </Link>
          )}
          <Link to="/about" className="whitespace-nowrap">
            About Us
          </Link>
        </div>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4 text-base">
          {isLoggedIn ? (
            <Button variant="primary" size="sm" onClick={() => console.log("Logout")}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[rgba(80,126,111,1)] mt-2 pb-4">
          <div className="flex flex-col gap-4 text-white">
            <Link 
              to="/" 
              className="px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link 
                to="/categories" 
                className="px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Quizzes
              </Link>
            )}
            <Link 
              to="/about" 
              className="px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            
            <div className="flex flex-col gap-2 px-4 mt-2">
              {isLoggedIn ? (
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => {
                    console.log("Logout");
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
