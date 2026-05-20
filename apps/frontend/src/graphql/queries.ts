import { gql } from "graphql-request"

export const NAVBAR_CONTENT = gql`
  query NavbarContent($locale: LocaleInputType) {
    NavbarContent(locale: $locale) {
      logo {
        url
        alt
      }
      title
      home
      info
      pricing
      gallery
      contact
    }
  }
`

export const HOME_CONTENT = gql`
  query HomeContent($locale: LocaleInputType) {
    HomeContent(locale: $locale) {
      title
      subhead
      firstArticle {
        head
        paragraph
        image {
          url
          alt
        }
      }
      secondArticle {
        head
        paragraph
        image {
          url
          alt
        }
      }
      thirdArticle {
        head
        paragraph
        image {
          url
          alt
        }
      }
      gallery {
        image {
          url
          alt
        }
      }
    }
  }
`

export const PRICING_CONTENT = gql`
  query PricingContent($locale: LocaleInputType) {
    HorizontalScrollingContainers(locale: $locale) {
      docs {
        id
        image {
          url
          alt
        }
        title
        tablePersonTitle
        tableNightPriceTitle
        tableWeekPriceTitle
        tableRow {
          personNumber
          nightPrice
          weekPrice
        }
        bookButton
      }
    }
  }
`

export const FOOTER_CONTENT = gql`
  query FooterContent($locale: LocaleInputType) {
    FooterContent(locale: $locale) {
      buttonTitle
      name
      addressLine1
      addressLine2
      dataProtections
      copyright
      allRights
    }
  }
`

export const ORDER_MODAL_CONTENT = gql`
  query OrderModalContent($locale: LocaleInputType) {
    OrderModalContent(locale: $locale) {
      email
      address
      city
      country
      checkInDate
      checkOutDate
      roomType
      economy
      superior
      deluxe
      checkMeOut
      bookButton
    }
  }
`

export const COOKIES_MODAL_CONTENT = gql`
  query CookiesModalContent($locale: LocaleInputType) {
    CookiesModalContent(locale: $locale) {
      image {
        url
        alt
      }
      title
      text
      acceptButton
    }
  }
`

export const LANGUAGE_SWITCHER_CONTENT = gql`
  query LanguageSwitcherContent {
    LanguageSwitcherContent {
      languages {
        languageName
        languageCode
        languageImage {
          url
          alt
        }
      }
    }
  }
`
