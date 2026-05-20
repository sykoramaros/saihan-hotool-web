import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
const monorepoRoot = path.resolve(dirname, '../..')

const payloadPackages = ['@payloadcms/ui', '@payloadcms/richtext-lexical', 'payload'] as const

const cmsRelToRoot = path.relative(monorepoRoot, dirname)

const webpackAliases = Object.fromEntries(
  payloadPackages.map((pkg) => [pkg, path.resolve(dirname, `node_modules/${pkg}`)])
)

const turbopackAliases = Object.fromEntries(
  payloadPackages.map((pkg) => [pkg, `./${cmsRelToRoot}/node_modules/${pkg}`])
)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    webpackConfig.resolve.alias = { ...webpackConfig.resolve.alias, ...webpackAliases }
    return webpackConfig
  },
  turbopack: {
    root: monorepoRoot,
    resolveAlias: turbopackAliases,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
