
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

const QuizCategories: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('categories')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data.length === 0) {
          setCategories([]);
          setError("No quiz categories available at the moment. Please check back later.");
          return;
        }
        
        // Add default descriptions and slugs if not provided from the DB
        const processedCategories = data.map(cat => ({
          ...cat,
          slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
          description: cat.description || `Test your knowledge in ${cat.name} with these challenging questions.`,
          icon: cat.icon || "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/1ac710e76281eb9472b9b5455f035f0217c6c214?placeholderIfAbsent=true"
        }));
        
        setCategories(processedCategories);
      } catch (error: any) {
        console.error('Error fetching categories:', error);
        setError("Failed to load quiz categories. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load quiz categories",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId: string, categorySlug: string) => {
    navigate(`/quiz/${categorySlug}`, { state: { categoryId } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-[rgba(230,236,234,1)] py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10">Select a Quiz Category</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-[rgba(80,126,111,1)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <p>Please try again later or contact support if the problem persists.</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center">
              <p className="text-xl">No quiz categories available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCategorySelect(category.id, category.slug)}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <img 
                      src={category.icon} 
                      alt={`${category.name} icon`}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizCategories;
