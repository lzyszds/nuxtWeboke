export default {

  "popBottom": () => {
    const initial = ref({
      y: 100,
      opacity: 0,
    })

    const enter = (delay: number) => {
      return ref({
        y: 0,
        opacity: 1,
        transition: {
          delay: delay
        }
      })
    }
    return {
      initial,
      enter,
    }
  }

}
