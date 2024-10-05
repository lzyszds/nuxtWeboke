<script setup lang="ts">
import { gsap } from 'gsap';
const el = templateRef('el')
const appHeader = ref<any>(null)
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, { behavior: 'smooth' })
const route = useRoute()
const useDirectory = useDirectoryStore()

onMounted(async () => {
  let tl = gsap.timeline({ paused: true });
  tl.to(appHeader.value!.navbar, {
    backgroundColor: '#5161ce',
    ease: 'power2.inOut',
  }).to(appHeader.value!.navContainer, {
    duration: 0.22,
    delay: 0,
    transform: 'translateY(-48px)',
    ease: 'expo.out',
  }).to(appHeader.value!.navContainer.lastChild, {
    duration: 0.22,
    transform: 'translateY(0px)',
    ease: 'expo.out',
  })
  watchEffect(() => {
    if (y.value > 10) {
      tl.play()
    } else {
      tl.reverse()
    }
  })

  await nextTick()
  if (el.value) {
    useDirectory.scrollEl = el.value
  }
})


provide("windowY", y)
</script>


<template>
  <div ref="el"
    class=" w-screen h-screen bg-white overflow-x-hidden dark:bg-black dark:text-white transition-all font-sans"
    :class="{ 'bgLattice': route.name == 'detail-id' }">
    <AppHeader ref="appHeader" />
    <main class="container w-full md:max-w-7xl mx-auto pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
