<template>
  <div>
    <b-navbar
      toggleable="md"
      class="navbar-top fixed-top py-0 py-md-1 d-none d-md-block d-md-block"
    >
      <b-container>
        <b-navbar-brand to="/" class="d-none d-md-block d-md-block"
          ><span class="str">App Name</span></b-navbar-brand
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
          <b-navbar-nav v-if="this.$auth.$state.loggedIn">
            <b-nav-item class="menu" @click="sidebarMenu"
              ><b-icon-grid class="icon"></b-icon-grid>
              <span class="str">Menu</span>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item> </b-nav-item>

            <b-nav-item-dropdown
              v-if="this.$auth.$state.loggedIn"
              right
              no-caret
              class="flex"
            >
              <template #button-content>
                <b-icon-bell class="icon"></b-icon-bell>
                <span class="notification-badge badge badge-danger">3</span>
              </template>
              <b-dropdown-item
                v-for="(n, index) in 10"
                :key="index"
                v-b-tooltip.hover.leftbottom="n"
                to="profile"
              >
                <span class="h-1x">
                  an you replace var dropdownMenu =
                  $(dropdownContainer.nodeName)
                </span>
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown
              v-if="this.$auth.$state.loggedIn"
              right
              no-caret
            >
              <template #button-content>
                <div class="d-flex">
                  <div
                    class="avatar gd-success"
                    style="width: 24px; height: 24px; font-size: 16px"
                  >
                    <span v-if="!photo_user && nama_user" style="color: #fff">
                      {{ nama_user.substring(0, 1).toUpperCase() }}
                    </span>
                    <img
                      v-if="photo_user"
                      :src="photo_user"
                      :alt="nama_user"
                      class="rounded-circle mx-2 flex-shrink-0"
                      style="width: 24px; height: 24px"
                    />
                  </div>
                  <div class="str align-self-center">&nbsp;{{ nama_user }}</div>
                </div>
              </template>

              <b-dropdown-item to="profile"
                ><b-icon-person scale="0.8"></b-icon-person>
                Profil</b-dropdown-item
              >
              <b-dropdown-item to="setting"
                ><b-icon-gear scale="0.8"></b-icon-gear>
                Pengaturan</b-dropdown-item
              >
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout"
                ><b-icon-power scale="0.8"></b-icon-power>
                Keluar</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-navbar
      :class="showNavbar ? 'scrolled-down' : 'scrolled-up'"
      class="fixed-bottom shadow py-1 py-md-1 d-block d-md-none d-lg-none d-xl-none navbar-bottom"
    >
      <b-navbar-nav class="nav-justified">
        <b-nav-item to="/">
          <b-icon-house class="white"></b-icon-house>
        </b-nav-item>
        <b-nav-item
          ><b-icon-grid class="white" @click="sidebarMenu"></b-icon-grid>
        </b-nav-item>

        <b-nav-item-dropdown
          v-if="this.$auth.$state.loggedIn"
          right
          dropup
          no-caret
        >
          <template #button-content>
            <b-icon-three-dots-vertical
              class="white"
            ></b-icon-three-dots-vertical>
          </template>

          <b-dropdown-item to="profile"
            ><b-icon-person scale="0.8"></b-icon-person> Profil</b-dropdown-item
          >
          <b-dropdown-item to="setting"
            ><b-icon-gear scale="0.8"></b-icon-gear> Pengaturan</b-dropdown-item
          >
          <b-dropdown-item @click="logout"
            ><b-icon-power scale="0.8"></b-icon-power> Keluar</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const OFFSET = 5

export default {
  name: 'Navbar',
  components: {},
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      nama_user: this.$auth.$state.user.nama,
      jabatan_user: this.$auth.$state.user.jabatan,
      photo_user: this.$auth.$state.user.photo,
    }
  },

  mounted() {
    this.lastScrollPosition = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
    const viewportMeta = document.createElement('meta')
    viewportMeta.name = 'viewport'
    viewportMeta.content = 'width=device-width, initial-scale=1'
    document.head.appendChild(viewportMeta)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    ...mapMutations(['SET_SIDEBAR']),
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
    sidebarMenu() {
      this.SET_SIDEBAR(!this.$store.state.showSidebar)
    },
    onScroll() {
      if (window.pageYOffset < 0) {
        return
      }
      if (Math.abs(window.pageYOffset - this.lastScrollPosition) < OFFSET) {
        return
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition
      this.lastScrollPosition = window.pageYOffset
    },
  },
}
</script>

<style scoped>
.navbar {
  z-index: 1030;
}
.dark-mode .navbar {
  background-color: #375268;
}
.light-mode .navbar {
  background-color: rgb(252, 252, 252);
}
.navbar-bottom {
  margin-bottom: 10px;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 50px;
  font-size: 1rem;
}
.navbar-bottom,
.navbar-bottom::before {
  background: linear-gradient(to right, #50c088 0%, #51c48a 80%, #4eb883 100%);
}

.navbar-bottom:before {
  content: '';
  display: inline-block;
  height: 40px;
  position: absolute;
  top: -3px;
  left: 10%;
  right: 10%;
  z-index: -1;
  border-radius: 50px;
  filter: blur(10px) brightness(0.95);
  transform-style: preserve-3d;
  transition: all 0.3s ease-out;
}

.scrolled-down {
  transform: translateY(0);
  transition: all 0.7s ease-in-out;
}
.scrolled-up {
  margin-bottom: -10px;
  transform: translateY(100%);
  transition: all 0.7s ease-in-out;
}

span.notification-badge {
  position: relative;
  top: -10px;
  right: 13px;
  border-radius: 50%;
}
.navbar-bottom .navbar-nav .nuxt-link-exact-active:hover,
.navbar-bottom .navbar-nav .nuxt-link-exact-active:focus {
  color: white;
}
</style>
