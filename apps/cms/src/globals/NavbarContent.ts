import type { GlobalConfig } from 'payload'

export const NavbarContent: GlobalConfig = {
  slug: 'navbar-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'home',
      type: 'text',
      localized: true,
    },
    {
      name: 'info',
      type: 'text',
      localized: true,
    },
    {
      name: 'pricing',
      type: 'text',
      localized: true,
    },
    {
      name: 'gallery',
      type: 'text',
      localized: true,
    },
    {
      name: 'contact',
      type: 'text',
      localized: true,
    },
  ],
}
