import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

type WrapperProps = {
  children: ReactNode;
};

export default function Layout({ children }: WrapperProps) {
  return (
    <main className="max-h-screen overflow-scroll">
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
