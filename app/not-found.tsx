import { SadGrisho } from "./components/sad-grisho";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 overflow-x-clip p-6 text-center">
      <h1 className="text-4xl font-bold">Тази страница не бе намерена...</h1>
      <p className="text-xl">
        Страницата, която търсите още не е излязла от фабриката на Гришо 🔨
      </p>
      <div className="max-w-[13rem] py-10">
        <SadGrisho />
      </div>
    </main>
  );
}
