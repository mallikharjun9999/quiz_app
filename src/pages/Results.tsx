
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ResultsState {
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  questions: Question[];
  categorySlug: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState;
  
  // If someone navigates directly to this page without taking a quiz
  if (!state || !state.questions) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-[rgba(230,236,234,1)]">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No Results to Display</h2>
            <p className="mb-6">You need to complete a quiz to view results.</p>
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
  
  const { score, totalQuestions, answers, questions, categorySlug } = state;
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
    const shareText = `I scored ${score}/${totalQuestions} (${percentage}%) on the ${categorySlug.replace('-', ' ')} quiz! Try it yourself!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Quiz Results',
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback
      alert("Copy this text to share: " + shareText);
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
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div 
                      key={question.id}
                      className={`p-4 border rounded-lg ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="font-medium mb-2">
                        {index + 1}. {question.question}
                      </div>
                      
                      <div className="text-sm">
                        <div className="mb-1">
                          <span className="font-semibold">Your answer: </span>
                          {userAnswer !== null 
                            ? question.options[userAnswer]
                            : "Not answered"}
                        </div>
                        
                        {!isCorrect && (
                          <div className="text-green-700">
                            <span className="font-semibold">Correct answer: </span>
                            {question.options[question.correctAnswer]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
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
