// Copy pasted from https://github.com/octokit/webhooks.js/blob/bb573c836ab7fc591ab630361f14811afdfaa83f/src/generated/webhook-identifiers.ts
// Huuuge hack to get the event names from the octokit/webhooks.js package
// because it doesn't export them :|

export const webhookEventNames = [
  "branch_protection_rule",
  "check_run",
  "check_suite",
  "code_scanning_alert",
  "commit_comment",
  "create",
  "delete",
  "dependabot_alert",
  "deploy_key",
  "deployment",
  "deployment_protection_rule",
  "deployment_review",
  "deployment_status",
  "discussion",
  "discussion_comment",
  "fork",
  "github_app_authorization",
  "gollum",
  "installation",
  "installation_repositories",
  "installation_target",
  "issue_comment",
  "issues",
  "label",
  "marketplace_purchase",
  "member",
  "membership",
  "merge_group",
  "meta",
  "milestone",
  "org_block",
  "organization",
  "package",
  "page_build",
  "ping",
  "project",
  "project_card",
  "project_column",
  "projects_v2_item",
  "public",
  "pull_request",
  "pull_request_review",
  "pull_request_review_comment",
  "pull_request_review_thread",
  "push",
  "registry_package",
  "release",
  "repository",
  "repository_dispatch",
  "repository_import",
  "repository_vulnerability_alert",
  "secret_scanning_alert",
  "secret_scanning_alert_location",
  "security_advisory",
  "sponsorship",
  "star",
  "status",
  "team",
  "team_add",
  "watch",
  "workflow_dispatch",
  "workflow_job",
  "workflow_run",
] as const;
