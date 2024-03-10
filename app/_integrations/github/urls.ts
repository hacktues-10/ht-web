import { env } from "process";

export const githubNewInstallationUrl = `https://github.com/apps/${env.NEXT_PUBLIC_GITHUB_APP_SLUG}/installations/new`;
