import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

const protectedRoutes = ["/dashboard", "/chatbot", "/create-ticket", "/my-tickets", "/admin"]
const publicRoutes = ["/login"]
const unprotectedRoutes = ["/login", "/api"]

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const authToken = request.cookies.get("authToken")?.value

  // Skip middleware for unprotected routes
  if (unprotectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isProtectedRoute && authToken) {
    const payload = verifyToken(authToken)
    if (!payload) {
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("authToken")
      return response
    }

    if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // If accessing login page while authenticated, redirect to dashboard
  if (pathname === "/login" && authToken) {
    const payload = verifyToken(authToken)
    if (payload) {
      const redirectPath = payload.role === "ADMIN" ? "/admin" : "/dashboard"
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
