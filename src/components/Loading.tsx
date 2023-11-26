"use client";
import { Skeleton } from "./ui/Skeleton";

export default function Loading() {
  return (
    <main className="flex w-full">
      <section className="md:w-2/5 w-full h-screen">
        <nav className="flex w-full justify-between h-20 p-2 items-center">
          <Skeleton className="rounded-full w-8 h-8" />
          <Skeleton className="w-[10rem] h-8" />
          <div className="flex gap-4 justify-center items-center">
            <Skeleton className="rounded-full w-8 h-8" />
            <Skeleton className="rounded-full w-8 h-8" />
          </div>
        </nav>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </section>
      <Skeleton className="w-3/5 md:block hidden h-screen"></Skeleton>
    </main>
  );
}
