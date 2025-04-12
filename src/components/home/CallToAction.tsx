import React from "react";
import { Button } from "@/components/ui/Button";

export const CallToAction: React.FC = () => {
  return (
    <section className="flex flex-col relative min-h-[409px] w-full overflow-hidden justify-center px-16 py-28 max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/bee2c95bd961be01a50dd9962f1bd757d1ee1a7b?placeholderIfAbsent=true"
        className="absolute h-full w-full object-cover inset-0"
        alt="Background"
      />
      <div className="relative flex w-[768px] max-w-full flex-col items-stretch">
        <div className="w-full text-white font-normal max-md:max-w-full">
          <h2 className="text-5xl leading-[1.2] tracking-[-0.48px] max-md:max-w-full max-md:text-[40px]">
            Start Your Quiz Adventure Now
          </h2>
          <p className="text-lg mt-6 max-md:max-w-full">
            Dive into our exciting quiz categories and challenge your knowledge
            today!
          </p>
        </div>
        <div className="flex gap-4 text-base text-black font-medium whitespace-nowrap mt-8">
          <Button variant="primary">Start</Button>
          <Button variant="secondary">Explore</Button>
        </div>
      </div>
    </section>
  );
};
