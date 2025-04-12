
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    // Here you would typically call an API to handle the subscription
  };

  return (
    <footer className="bg-[rgba(4,56,40,1)] w-full overflow-hidden px-16 py-20 max-md:max-w-full">
      <div className="flex min-h-[248px] w-full gap-[40px_128px] flex-wrap max-md:max-w-full">
        <div className="min-w-60 w-[500px] max-md:max-w-full">
          <span className="text-white text-2xl font-bold">Quizzy</span>
          <p className="text-white text-base font-normal mt-6 max-md:max-w-full">
            Subscribe to our newsletter for the latest features and updates.
          </p>
          <div className="w-full mt-6 max-md:max-w-full">
            <form
              onSubmit={handleSubmit}
              className="flex w-full gap-4 text-base flex-wrap max-md:max-w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here"
                required
                className="self-stretch flex-1 shrink basis-6 bg-[rgba(255,255,255,0.1)] border min-w-60 gap-2 text-white font-normal px-3 py-2 rounded-md border-[rgba(255,255,255,0)] border-solid"
              />
              <Button variant="secondary" type="submit">
                Join
              </Button>
            </form>
            <p className="text-white text-xs font-normal mt-3 max-md:max-w-full">
              By subscribing, you consent to our Privacy Policy and receive
              updates.
            </p>
          </div>
        </div>
        <div className="flex min-w-60 gap-10 text-white flex-wrap flex-1 shrink basis-[0%] max-md:max-w-full">
          <div className="overflow-hidden flex-1 shrink basis-[0%]">
            <h3 className="text-base font-semibold">Helpful Links</h3>
            <nav className="w-full text-sm font-normal mt-4">
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                About Us
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full whitespace-nowrap py-2 block"
              >
                Support
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full whitespace-nowrap py-2 block"
              >
                Blog
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full whitespace-nowrap py-2 block"
              >
                Careers
              </a>
            </nav>
          </div>
          <div className="overflow-hidden flex-1 shrink basis-[0%]">
            <h3 className="text-base font-semibold">Connect With Us</h3>
            <nav className="w-full text-sm font-normal mt-4">
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                Facebook Page
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                Instagram Feed
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                Twitter Profile
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                LinkedIn Page
              </a>
              <a
                href="#"
                className="flex-1 shrink basis-[0%] w-full py-2 block"
              >
                YouTube Channel
              </a>
            </nav>
          </div>
          <div className="flex-1 shrink basis-[0%]">
            <h3 className="text-base font-semibold">Stay Updated</h3>
            <div className="w-full text-sm font-normal whitespace-nowrap mt-4">
              <a href="#" className="flex w-full items-center gap-3 py-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/7eff85afccde708c98e4d8750897c254b0d5da59?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                  alt="Facebook icon"
                />
                <span className="self-stretch my-auto">Facebook</span>
              </a>
              <a href="#" className="flex w-full items-center gap-3 py-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/9a2928b7560c6697202a95198a16b5ea9fad5488?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                  alt="Instagram icon"
                />
                <span className="self-stretch my-auto">Instagram</span>
              </a>
              <a href="#" className="flex w-full items-center gap-3 py-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/1250deda61f4a865f7da7fb7020f7aad80c594a5?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                  alt="Twitter icon"
                />
                <span className="self-stretch my-auto">Twitter</span>
              </a>
              <a href="#" className="flex w-full items-center gap-3 py-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/8c17768f954d83f05bd4553e782f2101c3729949?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                  alt="LinkedIn icon"
                />
                <span className="self-stretch my-auto">LinkedIn</span>
              </a>
              <a href="#" className="flex w-full items-center gap-3 py-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/1f67d0a6911a4bf39ff22ccf7dcdc401/4cb38112e7c4b932122181959a1917edb78a71e6?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
                  alt="YouTube icon"
                />
                <span className="self-stretch my-auto">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-sm text-white font-normal mt-20 max-md:max-w-full max-md:mt-10">
        <div className="border min-h-px w-full border-[rgba(255,255,255,0.2)] border-solid max-md:max-w-full" />
        <div className="flex w-full gap-[40px_100px] justify-between flex-wrap mt-8 max-md:max-w-full">
          <div>© 2025 Quizzy. All rights reserved.</div>
          <div className="flex min-w-60 gap-6 underline">
            <a
              href="#"
              className="underline decoration-solid decoration-auto underline-offset-auto"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="underline decoration-solid decoration-auto underline-offset-auto"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="underline decoration-solid decoration-auto underline-offset-auto"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
