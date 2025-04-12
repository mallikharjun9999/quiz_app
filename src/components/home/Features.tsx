import React from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";

export const Features: React.FC = () => {
  const features = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/492dfda08112d4d9b01e6f7e1654f59e7b35dcb9?placeholderIfAbsent=true",
      title:
        "Explore Diverse Categories to Challenge Your Knowledge and Skills",
      description:
        "Our platform offers a user-friendly interface that makes quiz-taking enjoyable.",
      actionText: "Start",
      actionIcon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/15af63cf36b88b283f74e4625335e6ae9bf2e7b8?placeholderIfAbsent=true",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/1ac710e76281eb9472b9b5455f035f0217c6c214?placeholderIfAbsent=true",
      title: "Track Your Progress and Achievements with Ease and Clarity",
      description:
        "Stay motivated as you monitor your quiz performance and improvement.",
      actionText: "Learn",
      actionIcon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/633f57277afa3c060cc2379f9a703110f2cd0d8d?placeholderIfAbsent=true",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/3f6600c59324407f3e813fae4f3e515310e5c3f0?placeholderIfAbsent=true",
      title: "Join a Community of Learners and Compete with Friends",
      description:
        "Engage with others as you share your scores and challenge each other.",
      actionText: "Join",
      actionIcon: "https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/94dd9067984840c8d42cfa4e2c16f3d202c8ac22?placeholderIfAbsent=true",
    },
  ];

  return (
    <section className="bg-[rgba(230,236,234,1)] flex w-full flex-col overflow-hidden items-stretch px-16 py-28 max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <h2 className="text-black text-center text-[40px] font-normal leading-[48px] tracking-[-0.4px] self-center w-[768px] max-md:max-w-full">
        Discover Engaging Quizzes Tailored for Every Learning Style and Interest
      </h2>
      <div className="w-full mt-20 max-md:max-w-full max-md:mt-10">
        <div className="flex w-full gap-[40px_48px] justify-center flex-wrap max-md:max-w-full">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              actionText={feature.actionText}
              actionIcon={feature.actionIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
