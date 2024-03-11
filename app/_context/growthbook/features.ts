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

  "show-instagram-mobile": boolean;
  "show-facebook-mobile": boolean;
  "show-linkedin-mobile": boolean;
  "show-youtube-mobile": boolean;
  "show-tiktok-mobile": boolean;
  "show-linktree-mobile": boolean;
  "show-twitter-mobile": boolean;
  "show-email-mobile": boolean;

  "show-full-schedule": boolean;

  "landing-subtitle": string;
  "landing-cta": {};
  "landing-countdown": {};
};

export type HTFeature = keyof HTFeatures;
