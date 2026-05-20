import type { GlobalConfig } from 'payload'

export const OrderModalContent: GlobalConfig = {
  slug: 'order-modal-content',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'email', type: 'text', localized: true },
    { name: 'address', type: 'text', localized: true },
    { name: 'city', type: 'text', localized: true },
    { name: 'country', type: 'text', localized: true },
    { name: 'checkInDate', type: 'text', localized: true },
    { name: 'checkOutDate', type: 'text', localized: true },
    { name: 'roomType', type: 'text', localized: true },
    { name: 'economy', type: 'text', localized: true },
    { name: 'superior', type: 'text', localized: true },
    { name: 'deluxe', type: 'text', localized: true },
    { name: 'checkMeOut', type: 'text', localized: true },
    { name: 'bookButton', type: 'text', localized: true },
  ],
}
