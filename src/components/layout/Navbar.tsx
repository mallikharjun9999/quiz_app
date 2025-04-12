import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-[rgba(80,126,111,1)] flex min-h-[72px] w-full flex-col items-stretch justify-center px-16 max-md:max-w-full max-md:px-5">
      <div className="flex w-full items-center gap-8 justify-center flex-wrap max-md:max-w-full">
        <div className="self-stretch flex min-w-60 flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
          <Link to="/">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/cc95ec7fca422430081dbd06d1db24fc625d4d37?placeholderIfAbsent=true"
              className="aspect-[2.33] object-contain w-[84px]"
              alt="Quiz Platform Logo"
            />
          </Link>
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-8 text-base text-white font-normal my-auto">
          <Link to="/" className="self-stretch gap-1 whitespace-nowrap my-auto">
            Home
          </Link>
          <Link
            to="/quizzes"
            className="self-stretch gap-1 whitespace-nowrap my-auto"
          >
            Quizzes
          </Link>
          <Link to="/about" className="self-stretch gap-1 my-auto">
            About Us
          </Link>
          <div className="self-stretch whitespace-nowrap w-[105px] my-auto">
            <div className="flex w-full items-center gap-1 justify-center">
              <span className="self-stretch my-auto">Categories</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/389b8b1b4209514aa8250b0e72873511fb605067?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                alt="Dropdown icon"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-4 text-base text-black font-medium whitespace-nowrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
          <Button variant="primary" size="sm">
            Start
          </Button>
        </div>
      </div>
    </nav>
  );
};
