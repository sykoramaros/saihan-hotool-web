import type { GlobalConfig } from 'payload'

export const CookiesModalContent: GlobalConfig = {
  slug: 'cookies-modal-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'title', type: 'text', localized: true },
    { name: 'text', type: 'textarea', localized: true },
    { name: 'acceptButton', type: 'text', localized: true },
  ],
}
