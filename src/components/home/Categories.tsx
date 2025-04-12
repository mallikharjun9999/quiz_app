import React from "react";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/ui/CategoryCard";

export const Categories: React.FC = () => {
  const categories = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/1ac710e76281eb9472b9b5455f035f0217c6c214?placeholderIfAbsent=true",
      title: "General Knowledge: Test Your Trivia Skills",
      description: "Challenge yourself with a variety of trivia questions.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/db5a86794d0a531d9cc5e0022e29ffb7e034b278?placeholderIfAbsent=true",
      title: "Technical: Sharpen Your Professional Expertise",
      description: "Stay ahead in your field with specialized quizzes.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/89b52f27f1f8db70a1bc64474fe20433563ef2f3?placeholderIfAbsent=true",
      title: "Science: Discover the Wonders of Nature",
      description: "Explore fascinating scientific concepts and discoveries.",
    },
  ];

  return (
    <section className="bg-white flex w-full flex-col overflow-hidden items-stretch text-black px-16 py-28 max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <div className="flex w-full gap-[40px_80px] flex-wrap max-md:max-w-full">
        <div className="flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="text-base font-semibold whitespace-nowrap">
            Quizzes
          </div>
          <h2 className="text-5xl font-normal leading-[58px] tracking-[-0.48px] mt-4 max-md:max-w-full max-md:text-[40px] max-md:leading-[54px]">
            Explore Our Engaging Quiz Categories
          </h2>
        </div>
        <div className="text-lg font-normal leading-[27px] flex-1 shrink basis-[0%] max-md:max-w-full">
          <p>
            Dive into our diverse quiz categories tailored for every learner.
            Whether you're looking to test your knowledge in General Knowledge,
            hone your skills in Technical subjects, or explore the wonders of
            Science, we have something for everyone. Each category is designed
            to challenge and entertain, making learning fun and interactive.
          </p>
        </div>
      </div>
      <div className="w-full font-normal mt-20 max-md:max-w-full max-md:mt-10">
        <div className="flex w-full gap-[40px_48px] flex-wrap max-md:max-w-full">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6 text-base text-black font-medium mt-20 max-md:mt-10">
        <Button variant="secondary">Start</Button>
        <button className="self-stretch flex items-center gap-2 overflow-hidden justify-center my-auto rounded-md">
          <span className="self-stretch my-auto">Learn More</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/ba94817adcc30c0700233c50d316fbd7b08f5bc2?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
            alt="Learn more icon"
          />
        </button>
      </div>
    </section>
  );
};
