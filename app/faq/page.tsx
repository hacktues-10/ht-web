import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="h-full w-full max-w-6xl justify-center text-center ">
      <div className="rounded-3xl border-2 bg-slate-900 p-5 pt-0 font-sans sm:p-10 sm:pt-5">
        <div className="m-5 font-title text-4xl">
          <h1>Често задавани въпроси</h1>
        </div>
        <div className="text-left">
          <Accordion type="single" collapsible>
            <AccordionItem value="1">
              <AccordionTrigger>
                Как да създам отбор за HackTUES 10?
              </AccordionTrigger>
              <AccordionContent>
                След като си си създал акаунт, отиди в страницата за отбори и
                кликни “Създай отбор”, ако все още не си в отбор.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2">
              <AccordionTrigger>
                Кога е крайният срок за регистрация по отборите?
              </AccordionTrigger>
              <AccordionContent>
                Крайният срок за регистрация на участниците и създаване на отбор
                е на 18.02.2023г. включително.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3">
              <AccordionTrigger>
                Колко участници може да има в един отбор?
              </AccordionTrigger>
              <AccordionContent>
                Един отбор на текущи ученици може да се състои от 3 до 5
                участници. Отбор на минали възпитаници на ТУЕС може да се състои
                от 2 до 3 човека.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="4">
              <AccordionTrigger>
                Как се определя капитанът на отбора?
              </AccordionTrigger>
              <AccordionContent>
                Капитанът на отбора е създателят на съответния отбор. Той винаги
                може да предаде ролята си на някой друг участник от отбора.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="5">
              <AccordionTrigger>
                Как мога да се присъединя към отбор?
              </AccordionTrigger>
              <AccordionContent>
                Има 2 начина да влзеш в отбор. Единият начин е да отидеш на
                страницата на отбор и да поискаш да бъдеш приет от капитана.
                Другият начин е капитанът на дадения отбор може да те покани и
                чак тогава ще получиш нотификация на сайта, че имаш покана за
                отбор.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="6">
              <AccordionTrigger>
                Какво да направя, ако искам да напусна отбор?
              </AccordionTrigger>
              <AccordionContent>
                В случай че участник иска да напусне отбора си, в сайта на
                събитието, на страницата на съответния отбор, има опция
                “напусни”. След нейното избиране участникът престава да бъде
                член на отбора.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="7">
              <AccordionTrigger>
                Мога ли да изключа някой от отбора?
              </AccordionTrigger>
              <AccordionContent>
                Само капитанът може да изключи член на отбора.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="8">
              <AccordionTrigger>Мога ли да изтрия отбора си? </AccordionTrigger>
              <AccordionContent>
                Само ако си капитан чрез “изтрий” бутона на страницата на отбора
                си.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="9">
              <AccordionTrigger>
                Как ще протече самото събитие?
              </AccordionTrigger>
              <AccordionContent>
                Събитието ще се проведе на 13.03.2024 година и ще бъде с
                продължителност 3 дни. Награждаването е последния ден
                (16.03.2024).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="10">
              <AccordionTrigger>Какво трябва да носим?</AccordionTrigger>
              <AccordionContent>
                Лаптопи, разклонители и добро настроение.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="11">
              <AccordionTrigger>Ще има ли храна? АААААА</AccordionTrigger>
              <AccordionContent>
                Ще има обяд на 09, 10 и 11.03, както и Food Corner, където всеки
                може да си вземе каквото желае, както и чай, кафе и вода. Всеки
                е свободен да си донесе допълнително храна от вкъщи. Ако някой
                има специфичен хранителен режим, е препоръчително да си носи
                храна, съответстваща на нуждите му. Молим участниците да си
                носят шишета за вода, тъй като ще има машини, от които могат да
                си сипват.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="12">
              <AccordionTrigger>Как ще общуваме с ментора?</AccordionTrigger>
              <AccordionContent>
                Всеки отбор избира своя ментор малко преди началото на хакатона.
                Запознанството между отбора и съответния му ментор се
                осъществява през общите канали за комуникация в Discord сървъра
                на събитието и със старта на хакатона на живо. Общуването ще се
                осъществява на живо или в Discord сървара в посочените удобни
                часове за менторите. Преди хакатона е подготвен уъркшоп за
                работа с ментор.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="13">
              <AccordionTrigger>
                Какви са критериите за оценка?
              </AccordionTrigger>
              <AccordionContent>
                За повече информация за критериите за оценка може да видите
                регламента на HackTUES X на страницата Регламент.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="14">
              <AccordionTrigger>
                Ще бъда ли дисквалифициран, ако закъснея за работните дни и за
                полуфинала?
              </AccordionTrigger>
              <AccordionContent>
                Часовете за работа по проектите на територията на Форум Джон
                Атанасов в София Тех Парк са ориентировъчни. Всеки отбор ще бъде
                информиран за часа на представянето на проекта си на
                полуфиналите, като трябва да бъде във Форум Джон Атанасов поне
                20 минути по-рано. Ще получите повече информация с наближаването
                на събитието.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="15">
              <AccordionTrigger>
                Как ще се провеждат полуфиналите?
              </AccordionTrigger>
              <AccordionContent>
                Полуфиналите ще се проведат сутринта на 16.03 - последният ден
                на хакатона.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="16">
              <AccordionTrigger>Кога е финалът?</AccordionTrigger>
              <AccordionContent>
                Финалът ще се проведе следобед на 16.03 - последният ден на
                хакатона.
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="17">
              <AccordionTrigger>
                Какво ще стане, ако не попълня декларацията за информирано
                съгласие?
              </AccordionTrigger>
              <AccordionContent>
                Всеки участник трябва да попълни и изпрати декларацията за
                информирано съгласие, иначе няма да бъде допуснат до участие в
                хакатона.
              </AccordionContent>
            </AccordionItem> */}
            <AccordionItem value="18">
              <AccordionTrigger>Ще има ли награди?</AccordionTrigger>
              <AccordionContent>ДААААААААААА!</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
