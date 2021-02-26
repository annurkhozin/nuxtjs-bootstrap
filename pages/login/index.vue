<template>
  <div>
    <div class="container-login100">
      <div class="wrap-login100">
        <b-col class="col-7 d-none d-md-block d-md-block">
          <div class="clock">
            <Clock
              size="100px"
              border="none"
              bg="radial-gradient(circle, #ecffe5, #fffbe1, #38ff91)"
              :time="time"
            />
          </div>
          <LoginVector class="login-vector" />
          <div class="text-center div-menu">
            <nuxt-link to="/" class="link-menu"> Home </nuxt-link>
            <nuxt-link to="panduan" class="link-menu"> Panduan </nuxt-link>
          </div>
        </b-col>
        <b-col class="col-12 col-sm-8 col-md-5 offset-sm-2 offset-md-0">
          <div class="box-login justify-content-center align-items-center">
            <b-form method="post" @submit.prevent="sendAuth">
              <div class="text-center m-4">
                <Logo class="logo mb-2" />
                <p>
                  <strong> Hai sobat,</strong><br />
                  silahkan masuk terlebih dahulu
                </p>
              </div>
              <b-input-group class="mb-4" size="sm">
                <b-input-group-append is-text>
                  <b-icon-person class="icon"></b-icon-person>
                </b-input-group-append>
                <b-form-input
                  ref="username"
                  v-model="auth.username"
                  placeholder="Email"
                  type="email"
                  style="border-left: 0"
                  required
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mb-2" size="sm">
                <b-input-group-append is-text>
                  <b-icon-lock class="icon"></b-icon-lock>
                </b-input-group-append>
                <b-form-input
                  ref="password"
                  v-model="auth.password"
                  :type="passwordFieldType"
                  placeholder="Password"
                  style="border-left: 0"
                  class="border-right-0"
                  required
                ></b-form-input>
                <span class="input-group-append">
                  <div
                    class="input-group-text bg-transparent"
                    type="button"
                    @click="btnPassword"
                  >
                    <b-icon-eye-slash
                      v-if="!showPassword"
                      scale="0.9"
                      class="icon"
                    ></b-icon-eye-slash>
                    <b-icon-eye
                      v-if="showPassword"
                      scale="0.9"
                      class="icon"
                    ></b-icon-eye>
                  </div>
                </span>
              </b-input-group>
              <div class="text-right mb-4">
                <nuxt-link to="forgot-password" class="txt-forgot"
                  >Lupa password ?</nuxt-link
                >
              </div>
              <div class="text-center">
                <b-overlay
                  :show="busy"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                  class="d-inline-block"
                >
                  <b-button
                    ref="button"
                    pill
                    size="sm"
                    :disabled="busy"
                    variant="success"
                    type="submit"
                  >
                    Masuk
                  </b-button>
                </b-overlay>
              </div>
            </b-form>
            <p class="line">&nbsp;</p>
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import Clock from 'vue-clock2'
import Logo from '~/components/Logo'
import LoginVector from '~/components/LoginVector'
export default {
  name: 'Login',
  auth: false,
  components: {
    Logo,
    LoginVector,
    Clock,
  },
  data() {
    return {
      showPassword: false,
      passwordFieldType: 'password',
      auth: {},
      time: '',
      busy: false,
    }
  },
  head: {
    title: 'Login',
    meta: [
      {
        hid: 'login',
        name: 'login',
        content: 'Halaman login aplikasi',
      },
    ],
  },
  mounted() {
    //KITA LAKUKAN PENGECEK, JIKA SUDAH LOGIN
    if (this.$auth.$state.loggedIn) {
      //MAKA REDIRECT KE HALAMAN UTAMA ATAU DASHBOARD
      this.$router.push('/')
    }
  },
  methods: {
    btnPassword() {
      if (this.showPassword === true) {
        this.showPassword = false
        this.passwordFieldType = 'password'
      } else {
        this.showPassword = true
        this.passwordFieldType = 'text'
      }
    },
    //JIKA TOMBOL LOGIN DITEKAN, MAKA METHOD INI AKAN DIJALANKAN
    async sendAuth() {
      this.busy = true
      if (!this.auth.username) {
        this.$refs.username.$el.focus()
      } else if (!this.auth.password) {
        this.$refs.password.$el.focus()
      } else {
        try {
          //MELAKUKAN PROSES LOGIN, DENGAN MENGGUNAKAN STRATEGIES LOCAL YANG ADA DI NUXT CONFIG
          //DAN MENGIRIMKAN DATA BERUPA EMAIL DAN PASSWORD
          await this.$auth
            .loginWith('local', {
              data: this.auth,
            })
            .then(() => {
              this.$router.push('/')
              //this.$toast.success('Berhasil masuk')
            })
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },
  },
}
</script>

<style scoped>
.clock {
  height: 20%;
  width: 20%;
  right: 10%;
  top: -15px;
  z-index: 9999;
  position: absolute;
}
.clock .clock-circle {
  width: 10px;
  height: 10px;
  border: 1px solid #666;
}
.login-vector {
  position: absolute;
  bottom: 0;
}
.logo {
  display: block;
  width: 30%;
}
.box-login {
  top: 50vh;
  min-width: 80%;
  min-height: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.wrap-login100 {
  width: 960px;
  min-height: 70vh;
  background: #fff;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 50px 10px 40px 10px;
}

.dark-mode .wrap-login100 {
  background-color: #2f495e;
}
.light-mode .wrap-login100 {
  background-color: #fff;
}

.txt-forgot {
  font-size: 0.8rem;
}
.div-menu {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.link-menu {
  padding: 5px;
}
</style>
