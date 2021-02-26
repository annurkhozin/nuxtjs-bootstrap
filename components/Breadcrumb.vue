<template>
  <div>
    <b-breadcrumb class="bg-transparent" :items="items"> </b-breadcrumb>
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
}
</script>
