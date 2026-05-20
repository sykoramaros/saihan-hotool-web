import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { HorizontalScrollingContainers } from '@/collections/HorizontalScrollingContainers'
import { NavbarContent } from '@/globals/NavbarContent'
import { HomeContent } from '@/globals/HomeContent'
import { FooterContent } from '@/globals/FooterContent'
import { OrderModalContent } from '@/globals/OrderModalContent'
import { CookiesModalContent } from '@/globals/CookiesModalContent'
import { LanguageSwitcherContent } from '@/globals/LanguageSwitcherContent'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: ['cs', 'mn'],
    defaultLocale: 'cs',
    fallback: true,
  },
  collections: [Users, Media, HorizontalScrollingContainers],
  globals: [
    NavbarContent,
    HomeContent,
    FooterContent,
    OrderModalContent,
    CookiesModalContent,
    LanguageSwitcherContent,
  ],
  cors: [
    'http://localhost:5175',
    'http://localhost:5174',
    process.env.FRONTEND_URL ?? '',
  ].filter(Boolean),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? (() => { throw new Error('PAYLOAD_SECRET env var is required') })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL ?? (() => { throw new Error('DATABASE_URL env var is required') })(),
    },
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [],
})
