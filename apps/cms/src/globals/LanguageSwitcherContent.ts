import type { GlobalConfig } from 'payload'

export const LanguageSwitcherContent: GlobalConfig = {
  slug: 'language-switcher-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'languages',
      type: 'array',
      fields: [
        { name: 'languageName', type: 'text', required: true },
        { name: 'languageCode', type: 'text', required: true },
        {
          name: 'languageImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
