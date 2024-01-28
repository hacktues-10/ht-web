import { Metadata } from "next";
import Link from "next/link";

import { Card } from "~/app/components/ui/card";

export const metadata: Metadata = {
  title: "Регламент",
  description: "Регламентът на Hack TUES X",
};

export default function Regulations() {
  return (
    <Card className="h-full w-full max-w-6xl justify-center text-center ">
      <div className="p-5 pt-0 font-sans sm:p-10 sm:pt-5">
        <div className="m-5 text-4xl font-extrabold">
          <h1>Регламент</h1>
        </div>
        <div className="p-5 text-left">
          <p className="mb-6 text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
            Скъпи ТУЕС-ари, поздравяваме Ви за решението да се включите в
            предизвикателството, което предлага училищният хакатон. Тук ще
            намерите цялата информация, необходима за участие в хакатона и
            неговото провеждане.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Какво е Hack TUES Х?
          </h2>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-6">
            &emsp;Hack TUES е хакатон (състезание с компютърни проекти), в което
            отборите имат по-малко от 3 дни да направят авторски
            софтуерен/хардуерен проект по зададена от организаторите тема,
            използвайки всякакви технологии. Организира се ежегодно от ученици
            (най-често в 11-ти клас) от ТУЕС.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Как да участвате?
          </h2>
          <h3 className="mt-2 scroll-m-20 text-2xl tracking-tight">
            &emsp;Регистрация
          </h3>
          <p className="mb-3 leading-7 [&:not(:first-child)]:mt-6">
            &emsp;&emsp;• Ако сте ученик от 8 до 12 клас в ТУЕС, можете да се
            регистрирате за участие на страницата за регистрация, след нейното
            отваряне на <strong>29 януари от 20:00 часа</strong>!
          </p>
          <p className="mb-3 leading-7 [&:not(:first-child)]:mt-3">
            &emsp;&emsp;• Ако сте завършил възпитаник на ТУЕС,вече не можете да
            се регистрирате, защото регистрацията е <strong>затворена</strong>.
          </p>
          <p className="mb-8 leading-7 [&:not(:first-child)]:mt-3">
            &emsp;&emsp;• Регистрацията става чрез имейл адрес. След това ще
            трябва да попълните нужната информация и да влезете в Discord
            сървъра. Влизането в Discord сървъра на събитието е задължително.
          </p>
          <h3 className="mt-2 scroll-m-20 text-2xl tracking-tight">
            &nbsp;&nbsp;&nbsp;&nbsp;Създаване и потвърждаване на отбор.
          </h3>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-6">
            &emsp;&emsp;За да създадете отбор, трябва да отидете на страницата
            за отбори и да натиснете бутона &quot;Създай отбор&quot;. След
            попълване на името и информация на отбора ще имате възможност да
            поканите своите съотборници. Броят на участници в един отбор на
            завършили възпитаници може да бъде между 2 и 3, а на текущи ученици
            на ТУЕС е между 3 и 5. Всеки отбор, който има нужният брой участници
            се приема за потвърден.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Ментори
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            &emsp;• Всеки ученически отбор разполага с един ментор, който е част
            от отбора.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-3">
            &emsp;• В случай, че Вашият ментор не може да помогне с проблем,
            който имате, всеки друг може да се отзове на помощ, след като
            опишете проблема си, свързан с проекта. Комуникацията с менторите ще
            се осъществява на живо или чрез дискорд.
          </p>
          {/* <p className="leading-7 [&:not(:first-child)]:mt-3">
            &emsp;Освен ИТ-специалисти сред менторите тази година ще има и тематични
            ментори. Те няма да Ви помагат с техническите проблеми, но ще бъдат
            на Ваше разположение, за да доразвиете идеята на проектите си спрямо
            темата и Вашите цели.
          </p> */}
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-3">
            &emsp;• Целта на менторите е да Ви напътстват по време на работните
            дни.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Отговорност
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            &emsp;Участниците са длъжни да се съобразяват с програмата за
            провеждане на хакатона (откриване, време за работа, представяне пред
            журито и др.) и да спазват всички инструкции на организаторите на
            събитието и доброволците, които помагат за организирането му.
          </p>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-3">
            &emsp;Организаторите не носят отговорност за Вашата комуникация със
            съотборниците Ви по време на хакатона.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Дисквалификация
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            &emsp;• Ако даден проект не е авторски, съответният отбор може да
            бъде дисквалифициран.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            &emsp;• При предоставяне на недостоверни данни, организаторският
            екип има правото да не ви допусне до участие в събитието.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-3">
            &emsp;• Организаторите на събитието могат да дисквалифицират
            участник, ако поведението на участника е непристойно или пречи на
            провеждането на хакатона.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-3">
            &emsp;• Организаторите си запазват правото да дисквалифицират отбор,
            ако проектът им не е подходящ за събитието, има неморално съдържание
            или зловредна цел.
          </p>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-3">
            &emsp;• Отбор, който не изпълнява инструкциите на организаторите,
            може да бъде дисквалифициран.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Тормоз
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            &emsp;Не се толерира тормоз над екипа на Hack TUES X, доброволците и
            участниците в събитието под каквато и да е форма.
          </p>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-3">
            &emsp;Ако сте подложен на тормоз, забележите, че някой друг е
            подложен на тормоз или имате някакви други проблеми, моля свържете
            се с член от екипа на хакатона незабавно.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Политика за бисквитки и поверителност
          </h2>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-6">
            &emsp;За да подобрим представянето на уеб сайта си и Вашето
            потребителско преживяване, понякога използваме HTTP-бисквитки (HTTP
            cookies), или просто бисквитки. С използването на сайта Вие се
            съгласявате с това.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Какво представляват бисквитките?
          </h2>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-6">
            &emsp;Бисквитките са малки текстови файлове, които се запазват на
            Вашия компютър или мобилно устройство, когато посещавате нашия уеб
            сайт. Те позволяват на уеб сайта да запаметява Вашите действия и
            предпочитания за определен период от време, за да не се налага да ги
            въвеждате всеки път, когато посещавате сайта или преминавате от една
            страница към друга, което ни помага да Ви предоставяме съдържание,
            което смятаме, че ще бъде полезно и интересно за Вас.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0">
            Лични данни от бисквитките
          </h2>
          <p className="mb-6 leading-7 [&:not(:first-child)]:mt-6">
            &emsp;Личните данни, събрани от бисквитките, се използват единствено
            и само за осъществяването на конкретни функции в сайта, свързани със
            самия потребител.
          </p>
        </div>
      </div>
    </Card>
  );
}
