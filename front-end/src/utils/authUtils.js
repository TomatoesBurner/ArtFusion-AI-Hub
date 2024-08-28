// utils/authUtils.js
export const getGoogleAuthURL = () => {
  return (
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id:
        "232526547133-tgjc9s5mu4048t7gomf64tpo1gcceeod.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/auth/callback",
      response_type: "code",
      scope: "openid profile email",
      access_type: "offline", // Optional, use "offline" to get a refresh token
    }).toString()
  );
};
