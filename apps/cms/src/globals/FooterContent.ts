import type { GlobalConfig } from 'payload'

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'buttonTitle', type: 'text', localized: true },
    { name: 'name', type: 'text', localized: true },
    { name: 'addressLine1', type: 'text', localized: true },
    { name: 'addressLine2', type: 'text', localized: true },
    { name: 'dataProtections', type: 'text', localized: true },
    { name: 'copyright', type: 'text', localized: true },
    { name: 'allRights', type: 'text', localized: true },
  ],
}
