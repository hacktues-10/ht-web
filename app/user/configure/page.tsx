"use client";

// pages/index.js
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Form from "./Form";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-4 w-full text-center">
          <h1 className="text-2xl font-semibold">
            Signed in as {session?.user?.email}.
          </h1>
          <button
            onClick={() => signOut()}
            className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
        <div className="w-full">
          <Form />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-lg font-semibold">Please sign in</p>
        <Link
          href="/api/auth/signin"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    );
  }
}
