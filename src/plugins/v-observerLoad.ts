
const observerLoadBody = {
  mounted(el: Element, binding: any) {
    const observer = new IntersectionObserver((entries: any) => {
      const { isIntersecting } = entries[0];
      const { setLoading } = useLoadingStore();

      if (isIntersecting) {
        setTimeout(() => {
          setLoading(isIntersecting);
        }, 500);
        observer.disconnect();
      }
    });
    observer.observe(el);

  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('observerLoad', observerLoadBody);
});
