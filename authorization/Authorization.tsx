// "use client";
// import {
//   GetServerSideProps,
//   GetServerSidePropsContext,
//   GetServerSidePropsResult,
// } from "next";

// export async function protectRoutes(context: GetServerSidePropsContext) {
//   const session = context.req.cookies;
//   console.log(session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }
