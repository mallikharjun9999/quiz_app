
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CallToAction";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartQuiz = () => {
    if (user) {
      navigate('/categories');
    } else {
      navigate('/login');
    }
  };

  const handleViewResults = () => {
    if (user) {
      navigate('/results');
    } else {
      navigate('/login');
    }
  };

  // Expose the navigation functions to the Hero component
  React.useEffect(() => {
    // @ts-ignore
    window.quizzyNavigation = {
      startQuiz: handleStartQuiz,
      viewResults: handleViewResults,
      login: () => navigate('/login'),
      register: () => navigate('/register')
    };
    
    return () => {
      // @ts-ignore
      delete window.quizzyNavigation;
    };
  }, [user, navigate]);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
