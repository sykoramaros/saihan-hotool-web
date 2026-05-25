import type { CollectionConfig } from 'payload'

export const HorizontalScrollingContainers: CollectionConfig = {
  slug: 'horizontal-scrolling-containers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'roomKey',
      type: 'select',
      required: true,
      options: ['economy', 'superior', 'deluxe'],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'tablePersonTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'tableNightPriceTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'tableWeekPriceTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'tableRow',
      type: 'array',
      fields: [
        { name: 'personNumber', type: 'number', required: true },
        { name: 'nightPrice', type: 'number', required: true },
        { name: 'weekPrice', type: 'number', required: true },
      ],
    },
    {
      name: 'bookButton',
      type: 'text',
      localized: true,
    },
  ],
}
