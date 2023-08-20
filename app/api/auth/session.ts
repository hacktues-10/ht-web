import { getServerSession } from "next-auth";

import { authOptions } from "./options";

export function getHTSession() {
  return getServerSession(authOptions);
}
