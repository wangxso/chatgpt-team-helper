import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { useAppConfigStore } from '@/stores/appConfig'
import { initInterfaceScale } from '@/lib/interfaceScale'
import { pinia } from '@/stores/pinia'

const defaultSeo = {
  title: 'Team Helper - ChatGPT Team 购买与兑换平台',
  description: 'Team Helper 是一个面向 ChatGPT Team 场景的购买、兑换、订单处理与账号协作平台，提供商品查看、兑换入口、开放账号与售后说明。',
  robots: 'index,follow',
  image: 'https://team.wangxso.com/icon.jpg',
}

const getSiteOrigin = () => {
  if (typeof window === 'undefined') return 'https://team.wangxso.com'
  return window.location.origin || 'https://team.wangxso.com'
}

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value)
  })
}

const ensureCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

const ensureSchema = (schema?: Record<string, any> | Array<Record<string, any>> | null) => {
  const existing = document.getElementById('page-schema')
  if (!schema) {
    existing?.remove()
    return
  }

  const script = existing || document.createElement('script')
  script.id = 'page-schema'
  script.setAttribute('type', 'application/ld+json')
  script.textContent = JSON.stringify(schema)
  if (!existing) {
    document.head.appendChild(script)
  }
}

const applyRouteSeo = (to: any) => {
  const meta = (to?.meta || {}) as Record<string, any>
  const title = String(meta.title || defaultSeo.title)
  const description = String(meta.description || defaultSeo.description)
  const robots = String(meta.robots || defaultSeo.robots)
  const canonical = new URL(String(meta.canonical || to.fullPath || '/'), getSiteOrigin()).toString()
  const image = String(meta.image || defaultSeo.image)
  const ogTitle = String(meta.ogTitle || title)
  const ogDescription = String(meta.ogDescription || description)
  const twitterTitle = String(meta.twitterTitle || ogTitle)
  const twitterDescription = String(meta.twitterDescription || ogDescription)

  document.title = title
  ensureMetaTag('meta[name="description"]', { name: 'description', content: description })
  ensureMetaTag('meta[name="robots"]', { name: 'robots', content: robots })
  ensureMetaTag('meta[property="og:type"]', { property: 'og:type', content: String(meta.ogType || 'website') })
  ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Team Helper' })
  ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: ogTitle })
  ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: ogDescription })
  ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonical })
  ensureMetaTag('meta[property="og:image"]', { property: 'og:image', content: image })
  ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: String(meta.twitterCard || 'summary_large_image') })
  ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: twitterTitle })
  ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: twitterDescription })
  ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  ensureCanonical(canonical)
  ensureSchema(meta.schema || null)
}

const app = createApp(App)

app.use(pinia)
app.use(router)

router.afterEach((to) => {
  applyRouteSeo(to)
})

initInterfaceScale()

const bootstrap = async () => {
  const appConfigStore = useAppConfigStore(pinia)
  await appConfigStore.loadConfig()
  await router.isReady()
  applyRouteSeo(router.currentRoute.value)
  app.mount('#app')
}

bootstrap()
