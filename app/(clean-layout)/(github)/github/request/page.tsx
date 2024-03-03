import { CloseButton } from "../_components/close-button";

export const metadata = {
  title: "Заявката беше изпратена!",
  description: "Заявката беше изпратена!",
};

export default function GitHubRequestSentPage() {
  return (
    <>
      <h1 className="text-3xl font-extrabold">
        Заявката за свързване с GitHub беше изпратена!
      </h1>
      Трябва собственик на организацията да одобри заявката.
      <CloseButton />
    </>
  );
}
