import Link from "next/link";

import FullLayout from "./(full-layout)/layout";
import { SadGrisho } from "./components/sad-grisho";
import { Button } from "./components/ui/button";

export default function NotFoundPage() {
  return (
    <FullLayout>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">Тази страница не бе намерена...</h1>
        <p className="text-xl">
          Страницата, която търсите още не е излязла от фабриката на Гришо 🔨
        </p>
        <div className="max-w-[13rem] py-10">
          <SadGrisho />
        </div>
        <Button asChild>
          <Link href="/">Към началната страница</Link>
        </Button>
      </div>
    </FullLayout>
  );
}
