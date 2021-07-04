<template>
  <div>
    <b-dropdown variant="link" right no-caret>
      <template #button-content>
        <img
          :src="$i18n.localeProperties.flag"
          :alt="$i18n.localeProperties.name"
        />
        <span class="str">{{ $i18n.locale.toUpperCase() }}</span>
      </template>

      <b-dropdown-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        ><img :src="locale.flag" :alt="locale.name" />
        {{ locale.name }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
img {
  height: 20px;
}
</style>
