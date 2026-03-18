import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RedeemView from '../views/RedeemView.vue'
import GenericRedeemView from '../views/GenericRedeemView.vue'
import AccountRecoveryView from '../views/AccountRecoveryView.vue'
import LinuxDoRedeemView from '../views/LinuxDoRedeemView.vue'
import LinuxDoOpenAccountsView from '../views/LinuxDoOpenAccountsView.vue'
import XhsRedeemView from '../views/XhsRedeemView.vue'
import XianyuRedeemView from '../views/XianyuRedeemView.vue'
import PurchaseCatalogView from '../views/PurchaseCatalogView.vue'
import PurchaseProductView from '../views/PurchaseProductView.vue'
import OrderView from '../views/OrderView.vue'
import WaitingRoomView from '../views/WaitingRoomView.vue'
import MainLayout from '../views/MainLayout.vue'
import AccountsView from '../views/AccountsView.vue'
import UserManagementView from '../views/UserManagementView.vue'
import SettingsView from '../views/SettingsView.vue'
import RedemptionCodesView from '../views/RedemptionCodesView.vue'
import AppleShowcase from '../views/AppleShowcase.vue'
import WaitingRoomAdminView from '../views/WaitingRoomAdminView.vue'
import XhsOrdersView from '../views/XhsOrdersView.vue'
import XianyuOrdersView from '../views/XianyuOrdersView.vue'
import PurchaseOrdersView from '../views/PurchaseOrdersView.vue'
import CreditOrdersView from '../views/CreditOrdersView.vue'
import AccountRecoveryAdminView from '../views/AccountRecoveryAdminView.vue'
import StatsView from '../views/StatsView.vue'
import MyOrdersView from '../views/MyOrdersView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import PointsExchangeView from '../views/PointsExchangeView.vue'
import RoleManagementView from '../views/RoleManagementView.vue'
import MenuManagementView from '../views/MenuManagementView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { authService } from '@/services/api'
import FeatureDisabledView from '../views/FeatureDisabledView.vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { pinia } from '@/stores/pinia'

const buildBreadcrumbSchema = (items: Array<{ name: string, path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://team.wangxso.com${item.path}`,
  })),
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Team Helper - ChatGPT Team 购买与兑换平台',
        description: 'Team Helper 是一个面向 ChatGPT Team 场景的购买、兑换、订单处理与账号协作平台，帮助用户集中完成商品查看、下单、兑换和售后流程。',
        canonical: '/',
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              name: 'Team Helper',
              url: 'https://team.wangxso.com/',
              logo: 'https://team.wangxso.com/icon.jpg',
              sameAs: [
                'https://github.com/Kylsky/chatgpt-team-helper',
                'https://t.me/+W7iplSdBGXhlMDc1',
                'https://linux.do/u/yelo/summary'
              ]
            },
            {
              '@type': 'WebSite',
              name: 'Team Helper',
              url: 'https://team.wangxso.com/',
              inLanguage: 'zh-CN'
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Team Helper',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: 'https://team.wangxso.com/',
              description: '一个面向 ChatGPT Team 场景的购买、兑换、订单处理与账号协作平台。'
            }
          ]
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: '关于 Team Helper - ChatGPT Team 购买与兑换平台',
        description: '了解 Team Helper 的产品定位、适用场景，以及购买、兑换、订单处理和开放账号等公开能力。',
        canonical: '/about',
        schema: buildBreadcrumbSchema([
          { name: '首页', path: '/' },
          { name: '关于 Team Helper', path: '/about' },
        ]),
      },
    },
    {
      path: '/feature-disabled/:feature',
      name: 'feature-disabled',
      component: FeatureDisabledView,
      meta: {
        title: '功能未启用 - Team Helper',
        description: '该功能当前未启用，请返回首页查看其他公开页面或联系管理员。',
        robots: 'noindex,nofollow',
      },
    },
    {
      path: '/buy',
      name: 'purchase',
      redirect: { name: 'purchase-catalog' },
      meta: { featureKey: 'payment' }
    },
    {
      path: '/purchase',
      name: 'purchase-catalog',
      component: PurchaseCatalogView,
      meta: {
        featureKey: 'payment',
        title: '商品页 - Team Helper',
        description: '查看 Team Helper 当前可购买商品、价格和库存状态，并进入商品详情页完成下单。',
        canonical: '/purchase',
        schema: buildBreadcrumbSchema([
          { name: '首页', path: '/' },
          { name: '商品页', path: '/purchase' },
        ]),
      },
    },
    {
      path: '/purchase/:productKey',
      name: 'purchase-product',
      component: PurchaseProductView,
      meta: {
        featureKey: 'payment',
        title: '商品详情 - Team Helper',
        description: '查看商品详情、下单说明和实时状态。',
        robots: 'noindex,follow',
      },
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
      meta: {
        featureKey: 'payment',
        title: '订单查询 - Team Helper',
        description: '查询 Team Helper 订单状态与处理结果。',
        robots: 'noindex,nofollow',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录 - Team Helper',
        description: '登录 Team Helper 后台。',
        robots: 'noindex,nofollow',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: '注册 - Team Helper',
        description: '注册 Team Helper 账号。',
        robots: 'noindex,nofollow',
      },
    },
    {
      path: '/redeem/common',
      name: 'redeem',
      component: RedeemView,
    },
    {
      path: '/redeem/account-recovery',
      name: 'account-recovery',
      component: AccountRecoveryView,
    },
    {
      path: '/redeem/linux-do',
      name: 'linux-do-redeem',
      component: LinuxDoRedeemView,
    },
    {
      path: '/linux-do/open-accounts',
      redirect: '/redeem/open-accounts',
    },
    {
      path: '/redeem/open-accounts',
      name: 'linux-do-open-accounts',
      component: LinuxDoOpenAccountsView,
      meta: { featureKey: 'openAccounts' },
    },
    {
      path: '/redeem/xhs',
      name: 'xhs-redeem',
      component: XhsRedeemView,
      meta: { featureKey: 'xhs' },
    },
    {
      path: '/redeem/xianyu',
      name: 'xianyu-redeem',
      component: XianyuRedeemView,
      meta: { featureKey: 'xianyu' },
    },
    {
      path: '/redeem/:channelKey',
      name: 'generic-redeem',
      component: GenericRedeemView,
    },
    {
      path: '/waiting-room',
      name: 'waiting-room',
      component: WaitingRoomView,
    },
    {
      path: '/apple-showcase',
      name: 'apple-showcase',
      component: AppleShowcase,
    },
    {
      path: '/admin',  // 将管理后台路径改为 /admin
      component: MainLayout,
      meta: { requiresAuth: true },
      redirect: () => {
        const currentUser = authService.getCurrentUser()
        const roles = Array.isArray(currentUser?.roles) ? currentUser.roles.map(String) : []
        return roles.includes('super_admin') ? '/admin/accounts' : '/admin/user-info'
      },
      children: [
        {
          path: 'user-info',
          name: 'user-info',
          component: UserInfoView,
          meta: { requiredMenuKey: 'user_info' },
        },
        {
          path: 'my-orders',
          name: 'my-orders',
          component: MyOrdersView,
          meta: { requiredMenuKey: 'my_orders' },
        },
        {
          path: 'points-exchange',
          name: 'points-exchange',
          component: PointsExchangeView,
          meta: { requiredMenuKey: 'points_exchange' },
        },
        {
          path: 'accounts',
          name: 'accounts',
          component: AccountsView,
          meta: { requiredMenuKey: 'accounts' },
        },
        {
          path: 'account-recovery',
          name: 'account-recovery-admin',
          component: AccountRecoveryAdminView,
          meta: { requiredMenuKey: 'account_recovery', superAdminOnly: true },
        },
        {
          path: 'stats',
          name: 'stats',
          component: StatsView,
          meta: { requiredMenuKey: 'stats', superAdminOnly: true },
        },
        {
          path: 'users',
          name: 'user-management',
          component: UserManagementView,
          meta: { requiredMenuKey: 'user_management' },
        },
        {
          path: 'redemption-codes',
          name: 'redemption-codes',
          component: RedemptionCodesView,
          meta: { requiredMenuKey: 'redemption_codes' },
        },
        {
          path: 'xhs-orders',
          name: 'xhs-orders',
          component: XhsOrdersView,
          meta: { requiredMenuKey: 'xhs_orders', featureKey: 'xhs' },
        },
        {
          path: 'xianyu-orders',
          name: 'xianyu-orders',
          component: XianyuOrdersView,
          meta: { requiredMenuKey: 'xianyu_orders', featureKey: 'xianyu' },
        },
        {
          path: 'purchase-orders',
          name: 'purchase-orders',
          component: PurchaseOrdersView,
          meta: { requiredMenuKey: 'purchase_orders', featureKey: 'payment' },
        },
        {
          path: 'credit-orders',
          name: 'credit-orders',
          component: CreditOrdersView,
          meta: { requiredMenuKey: 'credit_orders', featureKey: 'openAccounts' },
        },
        {
          path: 'waiting-room',
          name: 'waiting-room-admin',
          component: WaitingRoomAdminView,
          meta: { requiredMenuKey: 'waiting_room' },
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
          meta: { requiredMenuKey: 'settings' },
        },
        {
          path: 'roles',
          name: 'role-management',
          component: RoleManagementView,
          meta: { requiredMenuKey: 'role_management', superAdminOnly: true },
        },
        {
          path: 'menus',
          name: 'menu-management',
          component: MenuManagementView,
          meta: { requiredMenuKey: 'menu_management', superAdminOnly: true },
        },
        {
          path: 'feature-disabled/:feature',
          name: 'admin-feature-disabled',
          component: FeatureDisabledView,
          meta: {
            title: '后台功能未启用 - Team Helper',
            description: '后台功能当前未启用。',
            robots: 'noindex,nofollow',
          },
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: '页面不存在 - Team Helper',
        description: '你访问的页面不存在，可以返回首页继续查看公开页面和商品入口。',
        robots: 'noindex,nofollow',
      },
    },
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const appConfigStore = useAppConfigStore(pinia)
  await appConfigStore.loadConfig()

  const requiredFeatureKey = String((to.meta as any)?.featureKey || '').trim()
  if (requiredFeatureKey) {
    const flags: any = appConfigStore.features || {}
    const enabled =
      requiredFeatureKey === 'xhs'
        ? flags.xhs !== false
        : requiredFeatureKey === 'xianyu'
          ? flags.xianyu !== false
          : requiredFeatureKey === 'payment'
            ? flags.payment !== false
            : requiredFeatureKey === 'openAccounts'
              ? flags.openAccounts !== false
              : true

    if (!enabled) {
      const query = { from: to.fullPath }
      if (to.path.startsWith('/admin')) {
        next({ name: 'admin-feature-disabled', params: { feature: requiredFeatureKey }, query })
        return
      }
      next({ name: 'feature-disabled', params: { feature: requiredFeatureKey }, query })
      return
    }
  }

  const isAuthenticated = authService.isAuthenticated()
  const currentUser = authService.getCurrentUser()
  const roles = Array.isArray(currentUser?.roles) ? currentUser.roles.map(String) : []
  const menus = Array.isArray(currentUser?.menus) ? currentUser.menus.map(String) : []
  const isSuperAdmin = roles.includes('super_admin')
  const defaultAdminPath = isSuperAdmin ? '/admin/accounts' : '/admin/user-info'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next(defaultAdminPath)
    return
  }

  const superAdminOnly = Boolean((to.meta as any)?.superAdminOnly)
  if (to.meta.requiresAuth && superAdminOnly && !isSuperAdmin) {
    next(defaultAdminPath)
    return
  }

  const requiredMenuKey = String((to.meta as any)?.requiredMenuKey || '').trim()
  if (to.meta.requiresAuth && requiredMenuKey) {
    const alwaysAllowed = requiredMenuKey === 'user_info' || requiredMenuKey === 'my_orders'
    if (!isSuperAdmin && !alwaysAllowed && !menus.includes(requiredMenuKey)) {
      next(defaultAdminPath)
      return
    }
  }

  next()
})

export default router
