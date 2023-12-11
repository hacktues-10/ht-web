"use client";

import { useRouter } from "next/navigation";
import invariant from "tiny-invariant";

import { createTeamAction } from "./actions";

export function CreateTeamForm() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target;
    invariant(form instanceof HTMLFormElement);
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");

    if (!name || typeof name !== "string" || typeof description !== "string") {
      return;
    }

    const res = await createTeamAction({ name, description });
    if (res.success) {
      router.push(`/teams/${res.team.id}`);
    }
  }

  return (
    <form
      className="mx-auto flex max-w-md flex-col gap-2 rounded-lg bg-gray-100 p-4 shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="py-3 text-center text-3xl font-bold">
        Създай нов отбор!!1!
      </h1>
      <input
        type="text"
        name="name"
        placeholder="Име на отбора"
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      />
      <textarea
        name="description"
        placeholder="Описание на отбора"
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Създай отбор
      </button>
    </form>
  );
}
