import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
type validateFormtype = {
  error: string;
};

export default function FormErrors({ error }: validateFormtype) {
  return (
    <main className="text-red-200 mt-2 p-1 pr-3 z-10 inline-block absolute bg-red-500 rounded-lg top-full left-0">
      <div className="border-8 border-b-red-500 border-transparent absolute left-4 -top-4"></div>
      <div className="lowercase flex items-center gap-2 ">
        <RiErrorWarningLine />
        <p className="text-xs">{error}</p>
      </div>
    </main>
  );
}
