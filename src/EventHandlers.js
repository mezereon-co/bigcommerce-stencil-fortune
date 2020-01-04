export default {
  created() {
    if (this.$bus) this.$bus.on('overlay-close', this.overlayClose)
  },
  methods: {
    overlayClose() {
      const overlay = document.querySelectorAll('.search-overlay')
      if (overlay) {
        overlay.forEach(item => {
          item.classList.remove('visible')
        })
      }
    }
  }
}
