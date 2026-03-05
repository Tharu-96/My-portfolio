/**
 * Update these with your actual profile links and email.
 * For the contact form to work, create a free form at https://formspree.io
 * and add your Form ID to .env as: VITE_FORMSPREE_ID=your_form_id
 */
export const socialLinks = [
  {
    name: 'GitHub',
    handle: '@bipintharuGH',
    href: 'https://github.com/Tharu-96',
    icon: '↗',
  },
  {
    name: 'LinkedIn',
    handle: '@bipintharuLI',
    href: 'https://www.linkedin.com/in/bipin-tharu-938b28360/',
    icon: '↗',
  },
  {
    name: 'Instagram',
    handle: '@bipintharuIG',
    href: 'https://www.instagram.com/bipin_tharu96/',
    icon: '↗',
  },
  {
    name: 'Email',
    handle: 'bipin@gmail.com',
    href: 'mailto:bipintharu53@gmail.com',
    icon: '↗',
  },
] as const

// Extract Form ID from env — accepts either "abc123" or full URL "https://formspree.io/f/abc123"
function getFormspreeEndpoint(): string | null {
  const raw = import.meta.env.VITE_FORMSPREE_ID
  if (!raw || typeof raw !== 'string') return null
  const trimmed = raw.trim()
  const match = trimmed.match(/formspree\.io\/f\/([a-zA-Z0-9]+)/)
  const formId = match ? match[1] : trimmed.replace(/^\/+|\/+$/g, '')
  return formId ? `https://formspree.io/f/${formId}` : null
}
export const formspreeEndpoint = getFormspreeEndpoint()
