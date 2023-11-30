"use client";

import { Button } from "~/app/components/ui/button";
import { testInsertProject } from "../../../actions";

function b() {
  const c = async () => {
    await testInsertProject();
  };

  c();
}

export default async function newProject() {
  return <Button onClick={b}>NATISNI</Button>;
}
