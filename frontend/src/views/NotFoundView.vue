<script setup lang="ts">
import RedeemShell from '@/components/RedeemShell.vue'
</script>

<template>
  <RedeemShell :maxWidth="'max-w-[920px]'" showUserStatusBar>
    <section class="rounded-[32px] border border-white/10 bg-[#08111f] px-8 py-10 shadow-[0_30px_120px_rgba(3,7,18,0.55)]">
      <div class="inline-flex items-center gap-2 rounded-full border border-[#fda4af]/25 bg-[#2c131a] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.24em] text-[#ffe4e6]">
        <span class="h-2 w-2 rounded-full bg-[#fda4af]"></span>
        404
      </div>
      <h1 class="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">页面不存在</h1>
      <p class="mt-5 max-w-[720px] text-[15px] leading-7 text-[#d2ddef] sm:text-[17px]">
        你访问的地址无法找到。可以返回首页继续查看 Team Helper 的商品页、价格说明、常见问题和联系支持信息。
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/" class="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#f7fbff] px-6 text-[15px] font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-white">
          返回首页
        </a>
        <a href="/purchase" class="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#8bb7ff]/35 bg-[#101b30] px-6 text-[15px] font-semibold text-[#eff6ff] transition hover:-translate-y-0.5 hover:border-[#8bb7ff]/55 hover:bg-[#15233d]">
          查看商品页
        </a>
        <a href="/faq" class="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#8bb7ff]/35 bg-[#101b30] px-6 text-[15px] font-semibold text-[#eff6ff] transition hover:-translate-y-0.5 hover:border-[#8bb7ff]/55 hover:bg-[#15233d]">
          常见问题
        </a>
      </div>
    </section>
  </RedeemShell>
</template>
