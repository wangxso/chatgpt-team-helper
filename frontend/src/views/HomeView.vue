<template>
  <RedeemShell :maxWidth="'max-w-[1320px]'" showUserStatusBar>
    <section class="home-hero rounded-[32px] border border-white/10 px-6 py-8 shadow-[0_30px_120px_rgba(3,7,18,0.55)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(109,224,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(83,114,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(25,211,166,0.14),transparent_28%)]"></div>
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

      <div class="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-stretch">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 rounded-full border border-[#6de0ff]/25 bg-[#0f1b2e] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.24em] text-[#dff8ff]">
            <span class="h-2 w-2 rounded-full bg-[#6DE0FF] shadow-[0_0_16px_rgba(109,224,255,0.95)]"></span>
            Team 服务中心
          </div>

          <div class="max-w-[720px] space-y-5">
            <h1 class="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-[68px]">
              更快购买，<br class="hidden sm:block" />
              更快兑换 ChatGPT Team。
            </h1>
            <p class="max-w-[640px] text-[15px] leading-7 text-[#e6eefc] sm:text-[17px]">
              提供购买、兑换、开放账号与售后入口，首页直接展示商品价格与库存状态，帮助用户快速完成下单与兑换流程。
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <RouterLink
              to="/purchase"
              class="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#f7fbff] px-6 text-[15px] font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-white"
            >
              立即购买
            </RouterLink>
            <RouterLink
              to="/redeem/common"
              class="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#8bb7ff]/35 bg-[#101b30] px-6 text-[15px] font-semibold text-[#eff6ff] transition hover:-translate-y-0.5 hover:border-[#8bb7ff]/55 hover:bg-[#15233d]"
            >
              输入兑换码
            </RouterLink>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in capabilityItems"
              :key="item.label"
              class="rounded-[24px] border border-white/10 bg-[#0e1728] p-4 backdrop-blur-xl"
            >
              <p class="text-[12px] uppercase tracking-[0.22em] text-[#98a8c7]">{{ item.label }}</p>
              <p class="mt-3 text-[18px] font-semibold text-white">{{ item.value }}</p>
              <p class="mt-2 text-[13px] leading-6 text-[#d2ddef]">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[28px] border border-white/10 bg-[#09111f] p-5 backdrop-blur-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[12px] uppercase tracking-[0.24em] text-[#6DE0FF]">Featured Plan</p>
              <h2 class="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-white">
                {{ primaryPlan?.productName || '正在加载商品信息' }}
              </h2>
            </div>
            <span class="rounded-full border border-emerald-300/25 bg-emerald-300/12 px-3 py-1 text-[12px] font-medium text-[#d9ffec]">
              {{ primaryPlan ? availabilityText(primaryPlan.availableCount) : '读取中' }}
            </span>
          </div>

          <div class="mt-8 flex items-end justify-between gap-4">
            <div>
              <p class="text-[13px] text-[#9eb0cb]">当前价格</p>
              <p class="mt-2 text-[44px] font-semibold tracking-[-0.05em] text-white">
                {{ primaryPlan ? `¥${primaryPlan.amount}` : '--' }}
              </p>
            </div>
            <div class="rounded-[20px] border border-white/10 bg-[#121f35] px-4 py-3 text-right">
              <p class="text-[12px] uppercase tracking-[0.18em] text-[#9eb0cb]">订单类型</p>
              <p class="mt-2 text-[14px] font-medium text-[#f8fbff]">{{ primaryPlan ? orderTypeText(primaryPlan.orderType) : '--' }}</p>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <div class="feature-row">
              <span class="feature-dot bg-[#6DE0FF]"></span>
              <span>{{ primaryPlan?.orderType === 'no_warranty' ? '不支持退款与补号' : '支持退款或补号处理' }}</span>
            </div>
            <div class="feature-row">
              <span class="feature-dot bg-[#7CFFB2]"></span>
              <span>支付完成后自动流转订单，无需人工确认</span>
            </div>
            <div class="feature-row">
              <span class="feature-dot bg-[#89A4FF]"></span>
              <span>支持直接购买，也支持已有兑换码快速核销</span>
            </div>
          </div>

          <RouterLink
            v-if="primaryPlan"
            :to="{ name: 'purchase-product', params: { productKey: primaryPlan.key } }"
            class="mt-8 inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#baf1ff_0%,#8ca7ff_48%,#86efac_100%)] px-5 text-[14px] font-semibold text-[#07111f] transition hover:-translate-y-0.5"
          >
            查看这个商品
          </RouterLink>
          <div
            v-else
            class="mt-8 inline-flex min-h-[50px] w-full items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-5 text-[14px] text-[#b7c6dc]"
          >
            正在加载商品
          </div>

          <div class="mt-8 space-y-3">
            <div
              v-for="plan in secondaryPlans"
              :key="plan.key"
              class="rounded-[22px] border border-white/10 bg-[#101a2d] p-4 transition hover:border-[#6de0ff]/30 hover:bg-[#13213a]"
            >
              <RouterLink :to="{ name: 'purchase-product', params: { productKey: plan.key } }" class="flex items-center justify-between gap-4">
                <div class="min-w-0">
                  <p class="truncate text-[15px] font-medium text-white">{{ plan.productName }}</p>
                  <p class="mt-1 text-[13px] text-[#c9d6ea]">{{ orderTypeText(plan.orderType) }} / {{ availabilityText(plan.availableCount) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[18px] font-semibold text-white">¥{{ plan.amount }}</p>
                  <p class="mt-1 text-[12px] uppercase tracking-[0.14em] text-[#6DE0FF]">查看</p>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="errorMessage" class="rounded-[24px] border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-100 backdrop-blur-xl">
      {{ errorMessage }}
    </div>

    <section class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div class="rounded-[28px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl sm:p-8">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-[12px] uppercase tracking-[0.22em] text-[#98a8c7]">Products</p>
              <h2 class="mt-3 text-[30px] font-semibold tracking-[-0.03em] text-white">全部商品</h2>
            </div>
            <RouterLink to="/purchase" class="text-[14px] font-medium text-[#6DE0FF] transition hover:text-white">进入商品页</RouterLink>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <RouterLink
            v-for="plan in plans"
            :key="plan.key"
            :to="{ name: 'purchase-product', params: { productKey: plan.key } }"
            class="product-card group"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="text-[12px] uppercase tracking-[0.18em] text-[#98a8c7]">{{ orderTypeText(plan.orderType) }}</p>
                <h3 class="mt-3 text-[19px] font-semibold leading-7 text-white">{{ plan.productName }}</h3>
              </div>
              <span class="rounded-full border border-[#8bb7ff]/20 bg-[#13213a] px-3 py-1 text-[12px] text-[#eef5ff]">
                {{ Number(plan.availableCount || 0) > 0 ? '可购买' : '缺货' }}
              </span>
            </div>
            <div class="mt-8 flex items-end justify-between gap-4">
              <div>
                <p class="text-[12px] uppercase tracking-[0.16em] text-[#98a8c7]">Price</p>
                <p class="mt-2 text-[34px] font-semibold tracking-[-0.04em] text-white">¥{{ plan.amount }}</p>
              </div>
              <p class="text-[13px] font-medium text-[#6DE0FF] transition group-hover:translate-x-1">立即查看</p>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-[28px] border border-white/10 bg-[#08101c] p-6 backdrop-blur-2xl">
          <p class="text-[12px] uppercase tracking-[0.24em] text-[#98a8c7]">Workflow</p>
          <h2 class="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-white">三步完成兑换</h2>
          <div class="mt-8 space-y-5">
            <div v-for="step in steps" :key="step.id" class="flex gap-4">
              <div class="flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-[#8bb7ff]/25 bg-[#13213a] text-[14px] font-semibold text-[#dff8ff]">
                {{ step.id }}
              </div>
              <div>
                <p class="text-[16px] font-medium text-white">{{ step.title }}</p>
                <p class="mt-1 text-[13px] leading-6 text-[#d2ddef]">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[28px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-[12px] uppercase tracking-[0.22em] text-[#98a8c7]">Channels</p>
              <h2 class="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-white">快捷入口</h2>
            </div>
            <RouterLink to="/redeem/common" class="text-[14px] font-medium text-[#6DE0FF] transition hover:text-white">通用兑换</RouterLink>
          </div>
          <div class="mt-8 grid grid-cols-2 gap-3">
            <RouterLink
              v-for="(channel, key) in quickChannels"
              :key="key"
              :to="`/redeem/${key}`"
              class="rounded-[22px] border border-white/10 bg-[#101a2d] px-4 py-5 text-[14px] font-medium text-[#f8fbff] transition hover:-translate-y-0.5 hover:border-[#6de0ff]/30 hover:bg-[#13213a]"
            >
              {{ channel }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </RedeemShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import RedeemShell from '@/components/RedeemShell.vue'
import { purchaseService, type PurchaseMeta, type PurchasePlan } from '@/services/api'

const meta = ref<PurchaseMeta | null>(null)
const errorMessage = ref('')
const loading = ref(false)

const plans = computed<PurchasePlan[]>(() => meta.value?.plans || [])
const primaryPlan = computed<PurchasePlan | null>(() => plans.value[0] || null)
const secondaryPlans = computed<PurchasePlan[]>(() => plans.value.slice(1, 4))

const quickChannels: Record<string, string> = {
  common: '通用兑换',
  xianyu: '闲鱼兑换',
  xhs: '小红书兑换',
  'open-accounts': '开放账号',
}

const capabilityItems = computed(() => [
  {
    label: 'Plans',
    value: `${plans.value.length || '--'} 个商品`,
    desc: '购买商品与兑换入口集中展示，减少跳转成本。',
  },
  {
    label: 'Inventory',
    value: primaryPlan.value ? availabilityText(primaryPlan.value.availableCount) : '库存同步中',
    desc: '首页直接显示库存状态，便于用户快速判断是否可下单。',
  },
  {
    label: 'Delivery',
    value: '自动处理',
    desc: '支付完成后自动处理订单，缩短等待时间。',
  },
])

const steps = [
  {
    id: '01',
    title: '选择购买或直接兑换',
    desc: '新用户从商品卡片进入下单，已有兑换码则直接走通用或渠道兑换入口。',
  },
  {
    id: '02',
    title: '支付后系统自动处理',
    desc: '订单成功后由当前站点逻辑自动分发，首页只负责把这条路径讲清楚。',
  },
  {
    id: '03',
    title: '后台查看订单与状态',
    desc: '用户可以进入后台查看订单、账号、积分及后续售后处理记录。',
  },
]

const orderTypeText = (orderType?: string) => {
  if (orderType === 'no_warranty') return '无质保'
  if (orderType === 'warranty') return '质保'
  return '商品'
}

const availabilityText = (count?: number | string | null) => {
  const normalized = Number(count || 0)
  if (normalized > 0) return `库存 ${normalized}`
  return '暂时缺货'
}

const loadMeta = async () => {
  if (loading.value) return
  loading.value = true
  errorMessage.value = ''
  try {
    meta.value = await purchaseService.getMeta()
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.error || '加载商品信息失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadMeta()
})
</script>

<style scoped>
.home-hero {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(8, 15, 29, 0.96) 0%, rgba(4, 10, 20, 0.98) 100%),
    radial-gradient(circle at top left, rgba(109, 224, 255, 0.18), transparent 28%);
}

.feature-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  line-height: 1.7;
}

.feature-dot {
  height: 8px;
  width: 8px;
  flex: none;
  border-radius: 999px;
  box-shadow: 0 0 16px currentColor;
}

.product-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 26px;
  padding: 22px;
  background:
    linear-gradient(180deg, rgba(19, 33, 58, 0.98) 0%, rgba(13, 24, 44, 0.98) 100%);
  backdrop-filter: blur(24px);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(109, 224, 255, 0.24);
  background:
    linear-gradient(180deg, rgba(23, 42, 72, 0.98) 0%, rgba(16, 31, 55, 0.98) 100%);
  box-shadow: 0 24px 70px rgba(2, 6, 23, 0.35);
}
</style>
