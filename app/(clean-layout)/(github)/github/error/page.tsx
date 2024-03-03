"use client";

import { Metadata } from "next";

import { CloseButton } from "../_components/close-button";

export const metadata: Metadata = {
  title: "Нещо се обърка!",
  description: "Нещо се обърка!",
};

export default function GitHubErrorPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">Нещо се обърка!</h1>
      Моля, опитайте отново. Ако проблемът продължи, свържете се с нас.
      <CloseButton />
    </>
  );
}
