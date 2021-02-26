<template>
  <div>
    <b-navbar
      toggleable="md"
      class="navbar-top fixed-top py-0 py-md-1 overflow-auto d-none d-md-block d-md-block"
    >
      <b-container>
        <b-navbar-brand to="/" class="d-none d-md-block d-md-block str"
          >App Name</b-navbar-brand
        >
        <b-navbar-nav class="d-block d-md-none d-lg-none d-xl-none">
          <b-nav-item
            v-if="this.$route.name != 'index'"
            style="font-size: 1em"
            @click="actionBack"
            ><b-icon-chevron-double-left
              class="icon"
            ></b-icon-chevron-double-left>
            <span class="str">Kembali</span>
          </b-nav-item>
        </b-navbar-nav>
        <b-collapse
          id="nav-collapse"
          is-nav
          class="d-none d-md-block d-md-block"
        >
          <b-navbar-nav
            v-if="this.$store.state.dialogMenu && this.$auth.$state.loggedIn"
          >
            <b-nav-item v-b-modal.modal-menus class="menu"
              ><b-icon-grid class="icon"></b-icon-grid>
              <span class="str">Menu</span>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item> </b-nav-item>
            <b-nav-item
              v-if="this.$auth.$state.loggedIn"
              to="/profile"
              class="menu"
            >
              <b-icon-bell
                v-if="this.$route.name != 'profile'"
                class="icon"
              ></b-icon-bell>
              <b-icon-bell-fill
                v-if="this.$route.name == 'profile'"
                class="icon"
              ></b-icon-bell-fill>
              <span class="notification-badge badge badge-danger"
                >3</span
              > </b-nav-item
            ><b-nav-item
              v-if="this.$auth.$state.loggedIn"
              class="menu"
              to="setting"
              ><b-icon-gear class="icon"></b-icon-gear>
            </b-nav-item>
            <b-nav-item
              v-if="this.$auth.$state.loggedIn"
              to="/profile"
              class="menu"
            >
              <b-icon-person
                v-if="this.$route.name != 'profile'"
                class="icon"
              ></b-icon-person>
              <b-icon-person-fill
                v-if="this.$route.name == 'profile'"
                class="icon"
              ></b-icon-person-fill>
              <span class="str">Nur Khozin</span>
            </b-nav-item>

            <b-nav-item
              v-if="this.$auth.$state.loggedIn"
              class="menu"
              @click="logout"
              ><b-icon-power class="icon"></b-icon-power>
              <span class="str">keluar</span></b-nav-item
            >

            <b-nav-item @click="setBgMode">
              <div v-if="!this.$store.state.darkMode">
                <b-icon-brightness-high-fill
                  scale="1.5"
                  style="color: #fd9a73"
                ></b-icon-brightness-high-fill>
                <span class="str">Light</span>
              </div>
              <div v-if="this.$store.state.darkMode">
                <b-icon-moon scale="1.5" style="color: #ffc107"></b-icon-moon>
                <span class="str">Dark</span>
              </div>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-navbar
      class="fixed-bottom py-1 py-md-1 d-block d-md-none d-lg-none d-xl-none navbar-bottom"
    >
      <b-navbar-nav class="nav-justified">
        <b-nav-item to="/">
          <b-icon-house class="icon"></b-icon-house>
        </b-nav-item>
        <b-nav-item to="setting"
          ><b-icon-gear class="icon"></b-icon-gear>
        </b-nav-item>
        <b-nav-item
          ><b-icon-grid
            v-if="this.$store.state.dialogMenu"
            v-b-modal.modal-menus
            class="icon"
          ></b-icon-grid>
          <b-icon-list
            v-if="
              this.$store.state.sidebarMenu && !this.$store.state.dialogMenu
            "
            class="icon"
            @click="sidebarToggle"
          ></b-icon-list>
        </b-nav-item>
        <b-nav-item>
          <b-icon-bell class="icon"></b-icon-bell>
        </b-nav-item>
        <b-nav-item to="/profile">
          <b-icon-person class="icon"></b-icon-person>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <!-- <Menubar v-show="this.$store.state.dialogMenu" /> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
//import Menubar from '~/components/Menubar'

export default {
  name: 'Navbar',
  components: {
    //Menubar,
  },
  data() {
    return {
      sidebarMenu: this.$store.state.sidebarMenu,
      dialogMenu: this.$store.state.dialogMenu,
    }
  },
  methods: {
    ...mapMutations(['SET_SIDEBAR', 'SET_BG_MODE']),
    async logout() {
      await this.$confirm({
        title: 'Konfirmasi',
        message: `Yakin ingin keluar dari akun?`,
        button: {
          no: 'Tidak',
          yes: 'Ya',
        },
        callback: (confirm) => {
          if (confirm) {
            this.$auth.logout().then(() => {
              this.$router.push('/login')
            })
          }
        },
      })
    },
    actionBack() {
      this.$router.go(-1)
    },
    sidebarToggle() {
      if (this.$store.state.showSidebar) {
        localStorage.setItem('showSidebar', false)
        this.SET_SIDEBAR(false)
      } else {
        localStorage.setItem('showSidebar', true)
        this.SET_SIDEBAR(true)
      }
    },
    setBgMode() {
      if (this.$store.state.darkMode) {
        localStorage.setItem('darkMode', false)
        this.SET_BG_MODE(false)
      } else {
        localStorage.setItem('darkMode', true)
        this.SET_BG_MODE(true)
      }
    },
  },
}
</script>

<style scoped>
.dark-mode .navbar {
  background-color: #375268;
}
.dark-mode .navbar-top {
  border-bottom: 1px solid #2b4357;
}
.dark-mode .navbar-bottom {
  border-top: 1px solid #2b4357;
}
.light-mode .navbar-top {
  border-bottom: 1px solid #ebebeb;
}
.light-mode .navbar-bottom {
  border-top: 1px solid #ebebeb;
}
span.notification-badge {
  position: relative;
  top: -10px;
  right: 13px;
  border-radius: 50%;
}
/*.navbar-bottom .navbar-nav .nuxt-link-exact-active:hover,
.navbar-bottom .navbar-nav .nuxt-link-exact-active:focus {
  color: white;
}
.navbar-bottom .nuxt-link-exact-active {
  background: #5433ff;
  background: -webkit-linear-gradient(
    to right,
    #20bdff,
    #5433ff
  );
  background: linear-gradient(
    to right,
    #20bdff,
    #5433ff
  ); 

  color: white;
  border-radius: 40px;
} */
</style>
