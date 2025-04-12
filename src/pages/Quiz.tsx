
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
}

const Quiz: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategoryAndQuestions = async () => {
      if (!categoryId) {
        toast({
          title: "Error",
          description: "Category ID is missing. Please select a category again.",
          variant: "destructive"
        });
        navigate('/categories');
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch category name
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('name')
          .eq('id', categoryId)
          .single();
        
        if (categoryError) {
          throw categoryError;
        }
        
        setCategoryName(categoryData.name);
        
        // Fetch questions for this category
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .eq('category_id', categoryId)
          .limit(5);
        
        if (questionsError) {
          throw questionsError;
        }
        
        if (questionsData.length === 0) {
          toast({
            title: "No questions found",
            description: `No questions available for ${categoryData.name} category.`,
            variant: "destructive"
          });
          navigate('/categories');
          return;
        }
        
        setQuestions(questionsData);
        // Initialize answers array with nulls
        setAnswers(new Array(questionsData.length).fill(null));
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        toast({
          title: "Error",
          description: "Failed to load quiz questions",
          variant: "destructive"
        });
        navigate('/categories');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryAndQuestions();
  }, [categoryId, navigate]);

  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          // Time's up for this question, move to next
          handleNextQuestion();
          return 30; // Reset timer
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answers[currentQuestionIndex + 1]);
      setTimer(30); // Reset timer
    } else {
      // End of quiz
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    // Calculate score
    const score = answers.reduce((total, answer, index) => {
      if (answer === questions[index]?.correct_option) {
        return total + 1;
      }
      return total;
    }, 0);

    // Save result to Supabase
    if (user) {
      try {
        const { error } = await supabase
          .from('results')
          .insert([
            {
              user_id: user.id,
              category_id: categoryId,
              score: score,
              total_questions: questions.length
            }
          ]);
          
        if (error) {
          console.error('Error saving quiz result:', error);
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      }
    }

    // Navigate to results page with score and answers
    navigate('/results', { 
      state: { 
        score,
        totalQuestions: questions.length,
        answers,
        questions,
        categoryId,
        categoryName,
        categorySlug
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[rgba(230,236,234,1)]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[rgba(80,126,111,1)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold">Loading Quiz...</h2>
            <p>Please wait while we prepare your questions</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[rgba(230,236,234,1)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
            <p className="mb-4">There are no questions available for this category.</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/categories')}
            >
              Return to Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Map options to array for easier rendering
  const options = [
    { value: 'option_a', label: currentQuestion.option_a },
    { value: 'option_b', label: currentQuestion.option_b },
    { value: 'option_c', label: currentQuestion.option_c },
    { value: 'option_d', label: currentQuestion.option_d }
  ].filter(option => option.label); // Filter out any empty options

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-[rgba(230,236,234,1)] py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="text-lg font-semibold flex items-center">
              <span className={`mr-2 ${timer <= 10 ? 'text-red-600' : ''}`}>Time: {timer}s</span>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">{currentQuestion.question_text}</h2>
              
              <div className="space-y-4" id="options-container">
                {options.map((option, index) => (
                  <div
                    key={option.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOption === option.value
                        ? 'bg-[rgba(80,126,111,0.2)] border-[rgba(80,126,111,1)]'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(option.value)}
                    id={`option-${index}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedOption === option.value
                          ? 'bg-[rgba(80,126,111,1)] text-white'
                          : 'border border-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div>{option.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => navigate('/categories')}
              id="quit-button"
            >
              Quit Quiz
            </Button>
            
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              id="next-button"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
