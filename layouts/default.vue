<template>
  <div>
    <noscript>
      <strong
        >We're sorry but this site doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      >
    </noscript>

    <div :class="this.$store.state.darkMode ? 'dark-mode' : 'light-mode'">
      <Navbar v-if="this.$auth.$state.loggedIn" />
      <div class="d-flex pt-2">
        <Sidebar v-if="this.$auth.$state.loggedIn" />
        <main class="content w-100">
          <div class="container">
            <Nuxt />
          </div>
        </main>
        <div class="side-menu-backdrop" @click="sidebarMenu"></div>
      </div>
      <vue-confirm-dialog />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
export default {
  name: 'Default',
  components: {
    Navbar,
    Sidebar,
  },

  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },

  methods: {
    ...mapMutations(['SET_SIDEBAR']),
    sidebarMenu() {
      this.SET_SIDEBAR(!this.$store.state.showSidebar)
    },
  },
}
</script>

<style>
aside {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 1020;
  width: 240px;
  margin: 0 auto;
  overflow: none;
  transition: 0.3s ease-in-out;
  transform: translate3d(-240px, 0, 0);
  transition-duration: 0;
  border-right-color: rgb(177 177 177 / 30%);
}

aside.open:not(.mobile) + .content {
  margin-left: 240px;
}

aside.mobile {
  transition-duration: 0.2s;
  z-index: 1050;
}

aside.mobile.open ~ .side-menu-backdrop {
  opacity: 1;
  visibility: visible;
}

.side-menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 1040;
}
</style>
