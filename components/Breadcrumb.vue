<template>
  <div>
    <div class="d-flex mb-4">
      <b-breadcrumb class="bg-transparent" :items="items"> </b-breadcrumb>
      <div class="ml-auto align-self-center">
        <b-icon-arrow-repeat
          @click="refreshPage"
          class="icon btn"
          scale="1.5"
        ></b-icon-arrow-repeat>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    refreshPage() {
      window.location.reload()
    },
  },
}
</script>

<style scoped>
.breadcrumb {
  padding: 0.75rem 0;
  margin-bottom: 0;
}
</style>
