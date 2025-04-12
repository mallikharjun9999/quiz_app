
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[rgba(80,126,111,1)] flex min-h-[72px] w-full flex-col items-stretch justify-center px-6 md:px-16 max-md:max-w-full">
      <div className="flex w-full items-center justify-between max-md:flex-wrap">
        <div className="flex items-center">
          <Link to="/">
            <span className="text-white text-2xl font-bold">Quizzy</span>
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
          {user && (
            <>
              <Link to="/categories" className="whitespace-nowrap">
                Quizzes
              </Link>
              <Link to="/results" className="whitespace-nowrap">
                My Results
              </Link>
            </>
          )}
          <Link to="/about" className="whitespace-nowrap">
            About Us
          </Link>
        </div>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4 text-base">
          {user ? (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => signOut()}
              disabled={loading}
            >
              {loading ? "Loading..." : "Logout"}
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
            {user && (
              <>
                <Link 
                  to="/categories" 
                  className="px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quizzes
                </Link>
                <Link 
                  to="/results" 
                  className="px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Results
                </Link>
              </>
            )}
            <Link 
              to="/about" 
              className="px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            
            <div className="flex flex-col gap-2 px-4 mt-2">
              {user ? (
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Logout"}
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
