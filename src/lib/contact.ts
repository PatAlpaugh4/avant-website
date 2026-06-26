// Single source of truth for all contact details.
// Replaces the former call-booking flow (email/phone instead of calendar booking).

export const CONTACT_EMAIL = "patricka@avantai.ca";
export const CONTACT_PHONE = "(705) 984-5337";
export const CONTACT_PHONE_TEL = "tel:+17059845337";

/** Base mailto link, optionally with a prefilled subject line. */
export function mailto(subject?: string): string {
    return subject
        ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
        : `mailto:${CONTACT_EMAIL}`;
}

/** Convenience constant for the bare mailto with no subject. */
export const CONTACT_MAILTO = mailto();
