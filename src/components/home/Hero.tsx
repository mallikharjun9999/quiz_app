import React from "react";
import { Button } from "@/components/ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="bg-[rgba(80,126,111,1)] flex w-full items-center gap-[40px_80px] overflow-hidden flex-wrap px-16 py-28 max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <div className="self-stretch flex min-w-60 flex-col items-stretch flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
        <div className="w-full text-white font-normal max-md:max-w-full">
          <h1 className="text-[56px] leading-[67px] tracking-[-0.56px] max-md:max-w-full max-md:text-[40px] max-md:leading-[54px]">
            Unlock Your Knowledge with Our Free Quizzes
          </h1>
          <p className="text-lg leading-[27px] mt-6 max-md:max-w-full">
            Join our engaging quiz platform tailored for both students and
            professionals. Test your skills across various categories and
            enhance your learning experience today!
          </p>
        </div>
        <div className="flex gap-4 text-base text-black font-medium mt-8">
          <Button variant="primary">Start</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/b6f78c5fb90c72b3a039f40f56b61aaea45c74de?placeholderIfAbsent=true"
        className="aspect-[0.96] object-contain w-full self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto max-md:max-w-full"
        alt="Quiz platform illustration"
      />
    </section>
  );
};
