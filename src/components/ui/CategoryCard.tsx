import React from "react";

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="min-w-60 flex-1 shrink basis-[0%]">
      <img
        src={icon}
        className="aspect-[1] object-contain w-12"
        alt={`${title} icon`}
      />
      <h3 className="text-[32px] leading-[42px] tracking-[-0.32px] mt-6">
        {title}
      </h3>
      <p className="text-base mt-6">{description}</p>
    </div>
  );
};
