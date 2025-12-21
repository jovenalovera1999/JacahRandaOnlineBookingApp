export const redirectToGoogleLogin = () => {
  const currentPath = window.location.pathname;
  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/auth/google/redirect?redirect_to=${encodeURIComponent(currentPath)}`;
  window.location.href = url;
};
