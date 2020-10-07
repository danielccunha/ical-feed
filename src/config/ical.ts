interface IICalConfig {
  domain: string
  url: string
  prodId: string
}

const port = process.env.PORT || 3333

export default {
  domain: process.env.ICAL_DOMAIN || 'localhost',
  url: process.env.ICAL_URL || `http://localhost:${port}`,
  prodId: process.env.ICAL_PROD_ID
} as IICalConfig
