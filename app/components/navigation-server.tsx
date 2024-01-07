import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/app/components/ui/navigation-menu";
import { cn } from "../utils";
import { MobileNavigationRoot, MobileNavLinkServer } from "./navigation-client";

export const NAVIGATION_CATEGORIES = [
  {
    category: "root",
    label: "Начало",
    links: [
      {
        label: "Програма",
        url: "/schedule",
        isVisible: false,
        isNew: false,
      },
      {
        label: "Отбори",
        url: "/teams",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Ментори",
        url: "/mentors",
        isVisible: false,
        isNew: false,
      },
      {
        label: "Теми",
        url: "/themes",
        isVisible: false,
        isNew: false,
      },
      {
        label: "Класация",
        url: "/rankings",
        isVisible: false,
        isNew: false,
      },
      {
        label: "С подкрепата на",
        url: "/partners",
        isVisible: true,
        isNew: false,
      },
    ],
  },
  {
    category: "about",
    label: "За Hack TUES",
    links: [
      {
        label: "Нашият екип",
        url: "/ourteam",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Регламент",
        url: "/regulation",
        isVisible: true,
        isNew: false,
      },
      {
        label: "ЧЗВ",
        url: "/faq",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Архив",
        url: "/archive",
        isVisible: false,
        isNew: false,
      },
      {
        label: "Спонсори § Партньори",
        url: "/partners",
        isVisible: true,
        isNew: false,
      },
    ],
  },
  // XXX: as const type errors, investigate?
]; // as const;

type Category = (typeof NAVIGATION_CATEGORIES)[number];
type CategoryId = Category["category"];

function getCategory(categoryId: CategoryId) {
  return NAVIGATION_CATEGORIES.find(
    (category) => category.category === categoryId,
  )!;
}

function getVisibleLinks(category: Category) {
  return category.links.filter((link) => link.isVisible);
}

function getAdditionalCategories() {
  return NAVIGATION_CATEGORIES.filter(
    (category) => category.category !== "root",
  ).filter((category) => {
    const visibleLinks = getVisibleLinks(category);
    return visibleLinks.length > 0;
  });
}

export const DesktopNavigation = ({ className }: { className: string }) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {getAdditionalCategories().map((category) => (
          <NavigationMenuItem key={category.category}>
            <NavigationMenuTrigger>{category.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex w-36 flex-col gap-1">
                {getVisibleLinks(category).map((link) => (
                  <li key={link.label} className="w-full">
                    <Link href={link.url} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-auto w-full p-3 text-center",
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        {getVisibleLinks(getCategory("root")).map((link) => (
          <NavigationMenuItem key={link.label}>
            <Link href={link.url} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const MobileNavigation = ({ className }: { className: string }) => {
  return (
    <MobileNavigationRoot className={className}>
      <nav className="flex flex-col items-center gap-7 text-center text-2xl font-medium">
        {getVisibleLinks(getCategory("root")).map((link) => (
          <MobileNavLinkServer
            key={link.label}
            href={link.url}
            className={cn(navigationMenuTriggerStyle(), "w-full text-lg")}
          >
            {link.label}
          </MobileNavLinkServer>
        ))}
        {getAdditionalCategories().map((category) => (
          <div key={category.category} className="flex flex-col gap-3">
            <p className="font-extrabold">{category.label}</p>
            {getVisibleLinks(category).map((link) => (
              <MobileNavLinkServer
                key={link.label}
                href={link.url}
                className={cn(navigationMenuTriggerStyle(), "w-full text-lg")}
              >
                {link.label}
              </MobileNavLinkServer>
            ))}
          </div>
        ))}
      </nav>
    </MobileNavigationRoot>
  );
};
