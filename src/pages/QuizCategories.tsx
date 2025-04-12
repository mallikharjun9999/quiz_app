
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

const QuizCategories: React.FC = () => {
  const navigate = useNavigate();
  
  const categories: Category[] = [
    {
      id: "general-knowledge",
      title: "General Knowledge",
      description: "Test your overall knowledge with these general trivia questions.",
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/1ac710e76281eb9472b9b5455f035f0217c6c214?placeholderIfAbsent=true",
      slug: "general-knowledge"
    },
    {
      id: "science",
      title: "Science",
      description: "Explore the wonders of science with these challenging questions.",
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/89b52f27f1f8db70a1bc64474fe20433563ef2f3?placeholderIfAbsent=true",
      slug: "science"
    },
    {
      id: "history",
      title: "History",
      description: "Journey through time with questions about historical events and figures.",
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/db5a86794d0a531d9cc5e0022e29ffb7e034b278?placeholderIfAbsent=true",
      slug: "history"
    },
    {
      id: "tech",
      title: "Technology",
      description: "Stay updated with the latest in technology through these quizzes.",
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/492dfda08112d4d9b01e6f7e1654f59e7b35dcb9?placeholderIfAbsent=true",
      slug: "technology"
    },
    {
      id: "movies",
      title: "Movies & TV",
      description: "Test your knowledge of films, actors, and television shows.",
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/3f6600c59324407f3e813fae4f3e515310e5c3f0?placeholderIfAbsent=true",
      slug: "movies-tv"
    },
    {
      id: "sports",
      title: "Sports",
      description: "Challenge yourself with questions about various sports and athletes.",
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/1ac710e76281eb9472b9b5455f035f0217c6c214?placeholderIfAbsent=true",
      slug: "sports"
    }
  ];

  const handleCategorySelect = (categorySlug: string) => {
    navigate(`/quiz/${categorySlug}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-[rgba(230,236,234,1)] py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10">Select a Quiz Category</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCategorySelect(category.slug)}
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <img 
                    src={category.icon} 
                    alt={`${category.title} icon`}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizCategories;
