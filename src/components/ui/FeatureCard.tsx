import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  actionText: string;
  actionIcon: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  actionText,
  actionIcon,
}) => {
  return (
    <div className="min-w-60 flex-1 shrink basis-[0%]">
      <div className="flex w-full flex-col items-stretch text-black font-normal text-center">
        <img
          src={icon}
          className="aspect-[1] object-contain w-12 self-center"
          alt={`${title} icon`}
        />
        <div className="flex w-full flex-col mt-6">
          <h3 className="text-2xl leading-[34px] tracking-[-0.24px]">
            {title}
          </h3>
          <p className="text-base leading-6 mt-6">{description}</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center text-base text-black font-medium whitespace-nowrap mt-8">
        <button className="flex items-center gap-2 overflow-hidden justify-center rounded-md">
          <span className="self-stretch my-auto">{actionText}</span>
          <img
            src={actionIcon}
            className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
            alt="Action icon"
          />
        </button>
      </div>
    </div>
  );
};
