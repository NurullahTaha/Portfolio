"use client";

import { signIn } from "next-auth/react"; // We need to export this from a client config or use the import
// Actually, in v5, for client components, we might need a SessionProvider.
// To keep it simple, I will use a standard form submission that posts to the auth endpoint or use the signIn helper differently.

// Let's use the simplest v5 approach: Server Action or just standard form.
// But since this is a client component for interactivity (loading states), I'll use a server action defined in a separate file or inline if possible.

// Simpler: Just a client form that calls the next-auth signIn method.
// We need to make sure we have the client-side library set up or use a server action.
// Let's use a server action in `app/actions.ts` to handle login to avoid client-side complexity.

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions"; // We'll create this

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pastel-black px-4">
      <div className="max-w-md w-full space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Admin Access</h2>
          <p className="mt-2 text-gray-400">Please sign in to manage your portfolio.</p>
        </div>
        
        <form action={dispatch} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-pastel-blue focus:border-pastel-blue focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-pastel-black bg-pastel-blue hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
          
          {errorMessage && (
            <div className="text-red-400 text-sm text-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
