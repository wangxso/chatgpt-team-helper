<script setup lang="ts">
import RedeemShell from '@/components/RedeemShell.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <RedeemShell :maxWidth="'max-w-[1120px]'" showUserStatusBar>
    <section class="rounded-[32px] border border-white/10 bg-[#08111f] px-6 py-8 shadow-[0_30px_120px_rgba(3,7,18,0.55)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div class="inline-flex items-center gap-2 rounded-full border border-[#6de0ff]/25 bg-[#0f1b2e] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.24em] text-[#dff8ff]">
        <span class="h-2 w-2 rounded-full bg-[#6DE0FF] shadow-[0_0_16px_rgba(109,224,255,0.95)]"></span>
        About Team Helper
      </div>
      <h1 class="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">Team Helper 是一个面向 ChatGPT Team 场景的购买与兑换平台</h1>
      <p class="mt-5 max-w-[760px] text-[15px] leading-7 text-[#d2ddef] sm:text-[17px]">
        平台把商品查看、下单、兑换码核销、订单处理、开放账号和售后入口集中到同一个站点，帮助用户更快完成购买、兑换和后续协作流程。
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/purchase" class="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#f7fbff] px-6 text-[15px] font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-white">
          查看商品页
        </RouterLink>
        <a href="/faq" class="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#8bb7ff]/35 bg-[#101b30] px-6 text-[15px] font-semibold text-[#eff6ff] transition hover:-translate-y-0.5 hover:border-[#8bb7ff]/55 hover:bg-[#15233d]">
          常见问题
        </a>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-[26px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl">
        <h2 class="text-[24px] font-semibold tracking-[-0.03em] text-white">它解决什么问题</h2>
        <p class="mt-4 text-[14px] leading-7 text-[#c9d6ea]">当用户需要购买 Team 商品、输入兑换码、查询订单或处理售后时，Team Helper 提供统一入口，而不是依赖分散的聊天记录、表单或人工转接。</p>
      </article>
      <article class="rounded-[26px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl">
        <h2 class="text-[24px] font-semibold tracking-[-0.03em] text-white">适合谁使用</h2>
        <p class="mt-4 text-[14px] leading-7 text-[#c9d6ea]">适合需要统一处理 Team 商品购买、兑换码核销、多渠道订单同步和开放账号管理的个人运营者与小型团队。</p>
      </article>
      <article class="rounded-[26px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl">
        <h2 class="text-[24px] font-semibold tracking-[-0.03em] text-white">当前公开能力</h2>
        <p class="mt-4 text-[14px] leading-7 text-[#c9d6ea]">站点当前公开展示商品信息、购买入口、兑换入口、价格说明、常见问题、联系支持与基础条款页面。</p>
      </article>
    </section>

    <section class="rounded-[28px] border border-white/10 bg-[#08101c] p-6 backdrop-blur-2xl sm:p-8">
      <p class="text-[12px] uppercase tracking-[0.24em] text-[#98a8c7]">Workflow</p>
      <h2 class="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-white">Team Helper 当前覆盖的主要流程</h2>
      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <div class="rounded-[22px] border border-white/10 bg-[#101a2d] p-5 text-[14px] leading-7 text-[#d2ddef]">在线查看商品与库存状态，并按商品页说明进入购买流程。</div>
        <div class="rounded-[22px] border border-white/10 bg-[#101a2d] p-5 text-[14px] leading-7 text-[#d2ddef]">使用邮箱、兑换码或订单号完成兑换与核销流程。</div>
        <div class="rounded-[22px] border border-white/10 bg-[#101a2d] p-5 text-[14px] leading-7 text-[#d2ddef]">在后台查看订单、账号、积分与后续售后处理记录。</div>
        <div class="rounded-[22px] border border-white/10 bg-[#101a2d] p-5 text-[14px] leading-7 text-[#d2ddef]">支持开放账号、候车室与多渠道订单接入能力。</div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="rounded-[26px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl">
        <h2 class="text-[24px] font-semibold tracking-[-0.03em] text-white">继续阅读公开信息页</h2>
        <p class="mt-4 text-[14px] leading-7 text-[#c9d6ea]">如果你想进一步了解购买规则、产品定位或支持渠道，可以继续查看价格说明、常见问题和联系支持页面。</p>
        <p class="mt-4 text-[14px] leading-7 text-[#dff8ff]">
          <a href="/pricing" class="text-[#6DE0FF] transition hover:text-white">价格说明</a>
          ·
          <a href="/faq" class="text-[#6DE0FF] transition hover:text-white">常见问题</a>
          ·
          <a href="/contact" class="text-[#6DE0FF] transition hover:text-white">联系支持</a>
        </p>
      </article>
      <article class="rounded-[26px] border border-white/10 bg-[#0a1220] p-6 backdrop-blur-2xl">
        <h2 class="text-[24px] font-semibold tracking-[-0.03em] text-white">外部资料</h2>
        <p class="mt-4 text-[14px] leading-7 text-[#c9d6ea]">你也可以通过项目公开仓库和社区资料继续了解 Team Helper 的外部引用来源。</p>
        <p class="mt-4 text-[14px] leading-7 text-[#dff8ff]">
          <a href="https://github.com/Kylsky/chatgpt-team-helper" class="text-[#6DE0FF] transition hover:text-white">GitHub 仓库</a>
          ·
          <a href="https://t.me/+W7iplSdBGXhlMDc1" class="text-[#6DE0FF] transition hover:text-white">Telegram 社群</a>
          ·
          <a href="https://linux.do/u/yelo/summary" class="text-[#6DE0FF] transition hover:text-white">Linux DO 页面</a>
        </p>
      </article>
    </section>
  </RedeemShell>
</template>
