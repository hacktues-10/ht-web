export type HTFeatures = {
  "create-team": boolean;
  "update-team-details": boolean;
  "update-team-members": boolean;
  "create-project": boolean;
  "show-mentors": boolean;
  "register-mentors": boolean;
  "choose-mentor": boolean;
  "show-teams": boolean;

  "register-alumni": boolean;
  "register-students": boolean;

  "signin-alumni": boolean;
  "signin-students": boolean;

  "show-instagram": boolean;
  "show-facebook": boolean;
  "show-linkedin": boolean;
  "show-youtube": boolean;
  "show-tiktok": boolean;
  "show-linktree": boolean;
  "show-twitter": boolean;
  "show-email": boolean;
};

export type HTFeature = keyof HTFeatures;
