// Public contact destinations. FormSubmit requires one-time recipient activation.
export const siteConfig = {
  name: "Emmanuel",
  email: "emmanueldigital839@gmail.com",
  whatsapp: "https://wa.link/rloavr",
  formEndpoint: "https://formsubmit.co/ajax/emmanueldigital839@gmail.com",
  fiverr: null,
  socials: { twitch: null, instagram: null, discord: null },
};
export function gmailComposeUrl(
  subject = "Twitch services inquiry",
  body = "Hi Emmanuel! I found your website and I’m interested in your Twitch services. Can we discuss what would work best for my channel?",
) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: siteConfig.email,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params}`;
}
