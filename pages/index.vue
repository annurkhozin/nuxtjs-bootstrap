<template>
  <div></div>
</template>

<script>
export default {
  auth: true,
  data() {
    return {
      currentLang:
        this.$i18n.defaultLocale === this.$i18n.locale
          ? '/'
          : '/' + this.$i18n.locale + '/',
    }
  },
  created() {
    this.$router.replace(this.currentLang + 'home')
  },
}
</script>

<style></style>
