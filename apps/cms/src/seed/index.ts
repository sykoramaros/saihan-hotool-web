import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const LOCALES = ['cs', 'mn'] as const
type Locale = (typeof LOCALES)[number]

const data: Record<string, Record<Locale, unknown>> = {
  // ── NAVBAR ──────────────────────────────────────────────────────────────────
  'navbar-content': {
    cs: {
      title: 'Saihan Hotool',
      home: 'Domů',
      info: 'O nás',
      pricing: 'Ceník',
      gallery: 'Galerie',
      contact: 'Kontakt',
    },
    mn: {
      title: 'Сайхан Хотол',
      home: 'Нүүр',
      info: 'Бидний тухай',
      pricing: 'Үнэ',
      gallery: 'Галерей',
      contact: 'Холбоо барих',
    },
  },

  // ── HOME ────────────────────────────────────────────────────────────────────
  'home-content': {
    cs: {
      title: 'Vítejte v Saihan Hotool',
      subhead: 'Váš domov uprostřed mongolské přírody',
      firstArticle: {
        head: 'Ubytování v jurtě',
        paragraph:
          'Prožijte autentický zážitek v tradičních mongolských jurtách. Každá jurta je vybavena pro pohodlný pobyt.',
      },
      secondArticle: {
        head: 'Mongolská příroda',
        paragraph:
          'Obklopeni nekonečnou stepí, jezery a horami. Ideální místo pro turistiku, fotografování i odpočinek.',
      },
      thirdArticle: {
        head: 'Tradiční kuchyně',
        paragraph:
          'Ochutnejte autentická mongolská jídla připravená z čerstvých místních surovin.',
      },
    },
    mn: {
      title: 'Сайхан Хотолд тавтай морилно уу',
      subhead: 'Монголын байгалийн дунд таны гэр',
      firstArticle: {
        head: 'Гэрт байрлах',
        paragraph:
          'Уламжлалт монгол гэрт жинхэнэ туршлага авна уу. Тав тухтай байрлахад бэлтгэгдсэн.',
      },
      secondArticle: {
        head: 'Монголын байгаль',
        paragraph:
          'Тал хээр, нуур, уулаар хүрээлэгдсэн. Аялал, зургийн болон амралтад тохиромжтой.',
      },
      thirdArticle: {
        head: 'Уламжлалт хоол',
        paragraph:
          'Орон нутгийн шинэ түүхийн эдээр бэлтгэсэн жинхэнэ монгол хоолыг амтална уу.',
      },
    },
  },

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  'footer-content': {
    cs: {
      buttonTitle: 'Rezervovat',
      name: 'Saihan Hotool',
      addressLine1: 'Mongolsko',
      addressLine2: 'Övörkhangai aimag',
      dataProtections: 'Ochrana osobních údajů',
      copyright: `© ${new Date().getFullYear()} Saihan Hotool`,
      allRights: 'Všechna práva vyhrazena',
    },
    mn: {
      buttonTitle: 'Захиалах',
      name: 'Сайхан Хотол',
      addressLine1: 'Монгол улс',
      addressLine2: 'Өвөрхангай аймаг',
      dataProtections: 'Мэдээллийн нууцлал',
      copyright: `© ${new Date().getFullYear()} Сайхан Хотол`,
      allRights: 'Бүх эрх хуулиар хамгаалагдсан',
    },
  },

  // ── ORDER MODAL ─────────────────────────────────────────────────────────────
  'order-modal-content': {
    cs: {
      email: 'E-mail',
      address: 'Adresa',
      city: 'Město',
      country: 'Stát',
      checkInDate: 'Datum příjezdu',
      checkOutDate: 'Datum odjezdu',
      roomType: 'Typ ubytování',
      economy: 'Economy',
      superior: 'Superior',
      deluxe: 'Deluxe',
      checkMeOut: 'Vyřízení rezervace',
      bookButton: 'Rezervovat',
    },
    mn: {
      email: 'Имэйл',
      address: 'Хаяг',
      city: 'Хот',
      country: 'Улс',
      checkInDate: 'Ирэх огноо',
      checkOutDate: 'Явах огноо',
      roomType: 'Байрлалын төрөл',
      economy: 'Эконом',
      superior: 'Супериор',
      deluxe: 'Делюкс',
      checkMeOut: 'Захиалга баталгаажуулах',
      bookButton: 'Захиалах',
    },
  },

  // ── COOKIES MODAL ───────────────────────────────────────────────────────────
  'cookies-modal-content': {
    cs: {
      title: 'Používáme cookies',
      text: 'Tento web používá cookies pro zajištění nejlepšího zážitku. Pokračováním souhlasíte s jejich použitím.',
      acceptButton: 'Souhlasím',
    },
    mn: {
      title: 'Бид күүки ашигладаг',
      text: 'Энэ вэбсайт хамгийн сайн туршлагыг хангахын тулд күүки ашигладаг. Үргэлжлүүлснээр та зөвшөөрч байна.',
      acceptButton: 'Зөвшөөрч байна',
    },
  },
}

// ── LANGUAGE SWITCHER ─────────────────────────────────────────────────────────
// Not localized — set once
const languageSwitcherData = {
  languages: [
    { languageName: 'Čeština', languageCode: 'cs' },
    { languageName: 'Монгол', languageCode: 'mn' },
  ],
}

// ── HORIZONTAL SCROLLING CONTAINERS (pricing cards) ──────────────────────────
// title and labels are localized, but tableRow array is not
type PricingCard = {
  title: Record<Locale, string>
  tablePersonTitle: Record<Locale, string>
  tableNightPriceTitle: Record<Locale, string>
  tableWeekPriceTitle: Record<Locale, string>
  bookButton: Record<Locale, string>
  tableRow: { personNumber: number; nightPrice: number; weekPrice: number }[]
}

const pricingCards: PricingCard[] = [
  {
    title: { cs: 'Economy jurta', mn: 'Эконом гэр' },
    tablePersonTitle: { cs: 'Osob', mn: 'Хүн' },
    tableNightPriceTitle: { cs: 'Cena/noc (€)', mn: 'Шөнийн үнэ (€)' },
    tableWeekPriceTitle: { cs: 'Cena/týden (€)', mn: '7 хоногийн үнэ (€)' },
    bookButton: { cs: 'Rezervovat', mn: 'Захиалах' },
    tableRow: [
      { personNumber: 1, nightPrice: 35, weekPrice: 210 },
      { personNumber: 2, nightPrice: 55, weekPrice: 330 },
      { personNumber: 3, nightPrice: 70, weekPrice: 420 },
    ],
  },
  {
    title: { cs: 'Superior jurta', mn: 'Супериор гэр' },
    tablePersonTitle: { cs: 'Osob', mn: 'Хүн' },
    tableNightPriceTitle: { cs: 'Cena/noc (€)', mn: 'Шөнийн үнэ (€)' },
    tableWeekPriceTitle: { cs: 'Cena/týden (€)', mn: '7 хоногийн үнэ (€)' },
    bookButton: { cs: 'Rezervovat', mn: 'Захиалах' },
    tableRow: [
      { personNumber: 1, nightPrice: 50, weekPrice: 300 },
      { personNumber: 2, nightPrice: 75, weekPrice: 450 },
      { personNumber: 3, nightPrice: 95, weekPrice: 570 },
    ],
  },
  {
    title: { cs: 'Deluxe jurta', mn: 'Делюкс гэр' },
    tablePersonTitle: { cs: 'Osob', mn: 'Хүн' },
    tableNightPriceTitle: { cs: 'Cena/noc (€)', mn: 'Шөнийн үнэ (€)' },
    tableWeekPriceTitle: { cs: 'Cena/týden (€)', mn: '7 хоногийн үнэ (€)' },
    bookButton: { cs: 'Rezervovat', mn: 'Захиалах' },
    tableRow: [
      { personNumber: 1, nightPrice: 70, weekPrice: 420 },
      { personNumber: 2, nightPrice: 100, weekPrice: 600 },
      { personNumber: 3, nightPrice: 125, weekPrice: 750 },
    ],
  },
]

async function createPlaceholderMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  // 1x1 transparent PNG as placeholder
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64',
  )
  const media = await payload.create({
    collection: 'media',
    data: { alt: 'placeholder' },
    file: {
      data: png,
      mimetype: 'image/png',
      name: 'placeholder.png',
      size: png.length,
    },
  })
  return media.id
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding globals...')

  for (const [slug, localeData] of Object.entries(data)) {
    for (const locale of LOCALES) {
      await payload.updateGlobal({
        slug: slug as Parameters<typeof payload.updateGlobal>[0]['slug'],
        locale,
        data: localeData[locale] as Record<string, unknown>,
      })
      console.log(`  ✓ ${slug} [${locale}]`)
    }
  }

  console.log('Seeding language switcher...')
  await payload.updateGlobal({
    slug: 'language-switcher-content',
    data: languageSwitcherData,
  })
  console.log('  ✓ language-switcher-content')

  console.log('Seeding pricing cards...')
  const placeholderImageId = await createPlaceholderMedia(payload)
  for (const card of pricingCards) {
    const created = await payload.create({
      collection: 'horizontal-scrolling-containers',
      locale: 'cs',
      data: {
        image: placeholderImageId,
        title: card.title.cs,
        tablePersonTitle: card.tablePersonTitle.cs,
        tableNightPriceTitle: card.tableNightPriceTitle.cs,
        tableWeekPriceTitle: card.tableWeekPriceTitle.cs,
        bookButton: card.bookButton.cs,
        tableRow: card.tableRow,
      },
    })
    await payload.update({
      collection: 'horizontal-scrolling-containers',
      id: created.id,
      locale: 'mn',
      data: {
        title: card.title.mn,
        tablePersonTitle: card.tablePersonTitle.mn,
        tableNightPriceTitle: card.tableNightPriceTitle.mn,
        tableWeekPriceTitle: card.tableWeekPriceTitle.mn,
        bookButton: card.bookButton.mn,
      },
    })
    console.log(`  ✓ ${card.title.cs}`)
  }

  console.log('\nSeed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
