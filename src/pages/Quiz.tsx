
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Quiz: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock questions based on category
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      // This would be replaced with a real API call to fetch questions
      // For now, we'll simulate a delay and use mock data
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for different categories
      const mockQuestions: Record<string, Question[]> = {
        'general-knowledge': [
          {
            id: 1,
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
          },
          {
            id: 2,
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Madrid", "Paris"],
            correctAnswer: 3
          },
          {
            id: 3,
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
          },
          {
            id: 4,
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3
          },
          {
            id: 5,
            question: "In which year did the Titanic sink?",
            options: ["1910", "1912", "1915", "1918"],
            correctAnswer: 1
          }
        ],
        'science': [
          {
            id: 1,
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "G"],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "Which of these is not a type of blood cell?",
            options: ["Red blood cell", "White blood cell", "Platelet", "Neuron"],
            correctAnswer: 3
          },
          {
            id: 3,
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correctAnswer: 2
          },
          {
            id: 4,
            question: "Which planet has the most moons?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correctAnswer: 1
          },
          {
            id: 5,
            question: "What is the most abundant gas in Earth's atmosphere?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            correctAnswer: 2
          }
        ],
        // Add more categories as needed
      };
      
      // Default to general knowledge if category not found
      setQuestions(mockQuestions[categorySlug || ''] || mockQuestions['general-knowledge']);
      setIsLoading(false);
    };
    
    loadQuestions();
  }, [categorySlug]);

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

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
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

  const finishQuiz = () => {
    // Calculate score
    const score = answers.reduce((total, answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        return total + 1;
      }
      return total;
    }, 0);

    // Navigate to results page with score and answers
    navigate('/results', { 
      state: { 
        score,
        totalQuestions: questions.length,
        answers,
        questions,
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
            <h2 className="text-2xl font-bold mb-4">Loading Quiz...</h2>
            <p>Please wait while we prepare your questions</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

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
              <h2 className="text-xl font-bold mb-6">{currentQuestion?.question}</h2>
              
              <div className="space-y-4" id="options-container">
                {currentQuestion?.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOption === index
                        ? 'bg-[rgba(80,126,111,0.2)] border-[rgba(80,126,111,1)]'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    id={`option-${index}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedOption === index
                          ? 'bg-[rgba(80,126,111,1)] text-white'
                          : 'border border-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div>{option}</div>
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
