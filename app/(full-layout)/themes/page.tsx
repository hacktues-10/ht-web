import { IfHTFeatureOff, IfHTFeatureOn } from "~/app/_integrations/components";
import { ComingSoonPage } from "~/app/components/coming-soon/coming-soon-page";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { FeatureMainTheme, FeatureSubtheme } from "./_features/dynamic";
import { ThemesContainer } from "./display";

export default function ThemesPage() {
  return (
    <>
      <IfHTFeatureOff feature="main-theme">
        <ComingSoonPage />
      </IfHTFeatureOff>
      <IfHTFeatureOn feature="main-theme">
        <div className="flex w-full flex-col items-center gap-11">
          <FeatureMainTheme feature="main-theme" />
          <Tabs className="content-center" defaultValue="students">
            <TabsList className="mx-auto flex w-min" defaultValue="students">
              <TabsTrigger value="students">Ученици</TabsTrigger>
              <TabsTrigger value="alumni">Завършили</TabsTrigger>
            </TabsList>
            <TabsContent value="students" tabIndex={-1}>
              <ThemesContainer>
                <FeatureSubtheme feature="subtheme1" />
                <FeatureSubtheme feature="subtheme2" />
                <FeatureSubtheme feature="subtheme3" />
              </ThemesContainer>
            </TabsContent>
            <TabsContent value="alumni" tabIndex={-1}>
              <ThemesContainer>
                <FeatureSubtheme feature="subtheme-alumni" />
              </ThemesContainer>
            </TabsContent>
          </Tabs>
          <div className="hidden pt-10 md:block" />
        </div>
      </IfHTFeatureOn>
    </>
  );
}
