export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('transition', domOrderedAnimateDirective);
});

export const domOrderedAnimateDirective = {
  mounted(el: Element, binding: any) {
    if (!el || !binding) {
      console.error('Invalid element or binding provided.');
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const entry = entries[0];
        if (!entry) {
          console.error('No intersection entry found.');
          return;
        }
        const { isIntersecting } = entry;

        if (isIntersecting) {
          const isString = typeof binding.value === 'string';
          const animateClass = isString ? binding.value : (binding.value as { animateClass: string }).animateClass;

          el.classList.add('animate__animated');
          if (isString) {
            el.classList.add(animateClass);
          } else {
            const { animateClass, index, delay, maxDelay, firstRenderNumber } = binding.value as {
              animateClass: string;
              index: number;
              delay: number;
              maxDelay: number;
              firstRenderNumber: number;
            };

            el.classList.add(animateClass);
            let realDelay = Math.min(delay * index, maxDelay);

            if (index < firstRenderNumber) {
              realDelay = delay * index;
              console.log(`lzy index < firstRenderNumber:`, realDelay);
            }

            el.classList.remove('opacity-0');
            //@ts-ignore
            el.style.animationDelay = `${realDelay}ms`;
          }

          observer.unobserve(el);
        }
      }
    );

    observer.observe(el);
  }
};
