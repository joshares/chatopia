import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import React from "react";
import Providers from "@/components/Providers";

// const queryClient = new QueryClient();

// hydrate(queryClient, dehydratedState);

export default function App({ Component, pageProps }: AppProps) {
  // const [queryClient] = React.useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           // With SSR, we usually want to set some default staleTime
  //           // above 0 to avoid refetching immediately on the client
  //           staleTime: 60 * 1000,
  //         },
  //       },
  //     })
  // );

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <Component {...pageProps} />
  //   </QueryClientProvider>
  // );

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
