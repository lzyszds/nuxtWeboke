<template>
  <div class="w-screen h-screen bg-white overflow-x-hidden dark:bg-black dark:text-white transition-all font-sans">
    <AppHeader />
    <main class="container w-full md:max-w-7xl mx-auto pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
