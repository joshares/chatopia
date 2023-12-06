// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// const secret = process.env.ACCESS_TOKEN_SECRET;

// export function middleware(request: NextRequest) {
//   console.log(secret);
//   const cookie = String(request.cookies.get("jwt"));

//   const url = request.nextUrl.clone();
//   if (url.pathname.includes("/chat")) {
//     console.log("ok o");
//     console.log(cookie);
//     if (cookie === "undefined") {
//       url.pathname = "/login";
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }
