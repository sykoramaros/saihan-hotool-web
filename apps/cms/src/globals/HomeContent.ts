import type { GlobalConfig } from 'payload'

const articleFields = [
  { name: 'head', type: 'text' as const, localized: true },
  { name: 'paragraph', type: 'textarea' as const, localized: true },
  {
    name: 'image',
    type: 'upload' as const,
    relationTo: 'media' as const,
  },
]

export const HomeContent: GlobalConfig = {
  slug: 'home-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subhead',
      type: 'text',
      localized: true,
    },
    {
      name: 'firstArticle',
      type: 'group',
      fields: articleFields,
    },
    {
      name: 'secondArticle',
      type: 'group',
      fields: articleFields,
    },
    {
      name: 'thirdArticle',
      type: 'group',
      fields: articleFields,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
