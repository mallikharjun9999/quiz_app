
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface ResultsState {
  score: number;
  totalQuestions: number;
  answers: (string | null)[];
  questions: Question[];
  categoryId: string;
  categoryName: string;
  categorySlug: string;
}

interface PastResult {
  id: string;
  score: number;
  total_questions: number;
  created_at: string;
  category_name: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pastResults, setPastResults] = useState<PastResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  const state = location.state as ResultsState;
  
  useEffect(() => {
    const fetchPastResults = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('results')
          .select(`
            id,
            score,
            total_questions,
            created_at,
            categories:category_id(name)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        const formattedResults = data.map(result => ({
          id: result.id,
          score: result.score,
          total_questions: result.total_questions,
          created_at: new Date(result.created_at).toLocaleDateString(),
          category_name: result.categories?.name || 'Unknown'
        }));
        
        setPastResults(formattedResults);
      } catch (error) {
        console.error('Error fetching past results:', error);
        toast({
          title: "Error",
          description: "Failed to load your quiz history",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPastResults();
  }, [user]);
  
  // If someone navigates directly to this page without taking a quiz
  if (!state || !state.questions) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[rgba(230,236,234,1)]">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No Results to Display</h2>
            <p className="mb-6">You need to complete a quiz to view detailed results.</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/categories')}
            >
              Go to Quiz Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { score, totalQuestions, answers, questions, categoryName } = state;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine result message
  let resultMessage = "";
  let messageColor = "";
  
  if (percentage >= 80) {
    resultMessage = "Excellent! You're a quiz master!";
    messageColor = "text-green-600";
  } else if (percentage >= 60) {
    resultMessage = "Good job! You have solid knowledge.";
    messageColor = "text-blue-600";
  } else if (percentage >= 40) {
    resultMessage = "Not bad, but there's room for improvement.";
    messageColor = "text-yellow-600";
  } else {
    resultMessage = "You might want to study more on this topic.";
    messageColor = "text-red-600";
  }
  
  // Function to share results
  const shareResults = () => {
    const shareText = `I scored ${score}/${totalQuestions} (${percentage}%) on the ${categoryName} quiz in Quizzy! Try it yourself!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Quizzy Results',
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback
      toast({
        title: "Share",
        description: "Copy this text to share: " + shareText
      });
    }
  };

  // Map option values to their display text for the current questions
  const getOptionText = (question: Question, optionValue: string | null) => {
    if (!optionValue) return "Not answered";
    
    switch (optionValue) {
      case 'option_a': return question.option_a;
      case 'option_b': return question.option_b;
      case 'option_c': return question.option_c;
      case 'option_d': return question.option_d;
      default: return "Unknown option";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-[rgba(230,236,234,1)] py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="mb-8">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl">Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-48 h-48 mb-6">
                  <div className="w-full h-full rounded-full bg-gray-200"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{percentage}%</div>
                      <div className="text-lg">{score}/{totalQuestions}</div>
                      <div className="text-md">{categoryName}</div>
                    </div>
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold ${messageColor}`}>
                  {resultMessage}
                </h3>
              </div>
              
              <div className="space-y-4 mt-8" id="results-container">
                <h3 className="text-xl font-semibold mb-4">Question Summary</h3>
                
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correct_option;
                  
                  return (
                    <div 
                      key={question.id}
                      className={`p-4 border rounded-lg ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="font-medium mb-2">
                        {index + 1}. {question.question_text}
                      </div>
                      
                      <div className="text-sm">
                        <div className="mb-1">
                          <span className="font-semibold">Your answer: </span>
                          {getOptionText(question, userAnswer)}
                        </div>
                        
                        {!isCorrect && (
                          <div className="text-green-700">
                            <span className="font-semibold">Correct answer: </span>
                            {getOptionText(question, question.correct_option)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Past Quiz Results */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Your Quiz History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center my-8">
                  <div className="w-8 h-8 border-4 border-[rgba(80,126,111,1)] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : pastResults.length === 0 ? (
                <p className="text-center text-gray-600 my-4">No past quiz results found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Score</th>
                        <th className="border p-2 text-left">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastResults.map((result) => (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="border p-2">{result.created_at}</td>
                          <td className="border p-2">{result.category_name}</td>
                          <td className="border p-2">{result.score}/{result.total_questions}</td>
                          <td className="border p-2">
                            {Math.round((result.score / result.total_questions) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              onClick={() => navigate('/categories')}
              id="take-another-quiz"
            >
              Take Another Quiz
            </Button>
            
            <Button
              variant="secondary"
              onClick={shareResults}
              id="share-results"
            >
              Share Results
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
