# Contact delivery and one-time activation

## Configured destinations

- WhatsApp: https://wa.link/rloavr
- Gmail recipient: emmanueldigital839@gmail.com (the supplied Gmail username plus `@gmail.com`)
- Website brief submission: https://formsubmit.co/ajax/emmanueldigital839@gmail.com

The same shared WhatsApp/Gmail choice component is used in the contact section, the FAQ's “Ask me directly” area, and the footer. Gmail opens an addressed compose window with an inquiry message; the visitor sends it. The existing WhatsApp short link is used exactly as supplied.

## Brief form

All five visible fields are required: name, email, Twitch channel URL, service, and project description. Whitespace-only names/descriptions and non-Twitch channel URLs are rejected. A valid submission posts all fields to FormSubmit, with the visitor's email as the reply-to address and the service in the subject. It does not require the visitor to open an email app. Advertising or Twitch credentials should never be entered.

While a request is pending, the form prevents duplicate submissions. It reports accepted submissions separately from errors, preserves details after failure, and allows a retry. An activation-required response is not displayed as successful delivery. Provider acceptance does not itself establish delivery to the recipient's inbox.

## Required owner action

FormSubmit requires one-time activation of the recipient address. After deployment, submit a brief through the live form using your own details, then check `emmanueldigital839@gmail.com` (including spam) for FormSubmit's activation email. Verify the sender and activate the form through that email. Submit a fresh brief afterward and confirm it arrives with every field and a usable reply-to address.

This activation requires access to the owner's email inbox; it cannot be completed through the repository. No activation/test email has been sent by the development tools. Live inbox delivery has not been verified. The code and mocked browser tests are complete, but automatic email delivery must not be described as verified until activation and an actual delivery check succeed.

## Evidence and limits

The provider's documentation endpoint could not be read from this managed environment because its network proxy denied the request (403). The integration uses FormSubmit's public JSON AJAX endpoint. Browser tests intercept provider calls and verify validation, recipient URL, full payload, loading state, success handling, failed requests, retry, and activation-required handling. Tests do not send messages or establish provider uptime, account activation, spam placement, or real inbox receipt.

The form names FormSubmit beside the submission control so visitors know that their project details pass through an external email-form service. It retains the existing WhatsApp and Gmail options for direct contact if submission is unavailable.
