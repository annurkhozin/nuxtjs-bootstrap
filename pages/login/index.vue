<template>
  <div>
    <div
      class="d-flex justify-content-end"
      style="position: absolute; right: 10%"
    >
      <LangToggle />
      <DarkLightMode />
    </div>
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
            <nuxt-link :to="currentLang + 'home'" class="link-menu">
              {{ $t('Home') }}
            </nuxt-link>
            <nuxt-link :to="currentLang + 'about'" class="link-menu">
              {{ $t('About') }}
            </nuxt-link>
          </div>
        </b-col>
        <b-col class="col-12 col-sm-8 col-md-5 offset-sm-2 offset-md-0">
          <div
            class="box-login shadow justify-content-center align-items-center"
          >
            <b-form method="post" @submit.prevent="sendAuth">
              <div class="text-center m-4">
                <Logo class="logo mb-2" />
                <p>
                  <strong> {{ $t('Hi_friend') }}</strong
                  ><br />
                  {{ $t('Sub_hi_friend') }}.
                </p>
              </div>
              <b-alert
                :show="error === '' ? false : true"
                variant="danger"
                fade
                >{{ error }}</b-alert
              >
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
                  :placeholder="$t('Password')"
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
                <nuxt-link :to="currentLang + 'login/forgot'" class="txt-forgot"
                  >{{ $t('Forgot_password') }} ?</nuxt-link
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
                    pill
                    :disabled="busy"
                    variant="success"
                    type="submit"
                  >
                    {{ $t('Login') }}
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
import DarkLightMode from '~/components/DarkLightMode'
import LangToggle from '~/components/LangToggle'
export default {
  name: 'Login',
  auth: false,
  components: {
    Logo,
    LoginVector,
    Clock,
    DarkLightMode,
    LangToggle,
  },
  data() {
    return {
      currentLang:
        this.$i18n.defaultLocale === this.$i18n.locale
          ? '/'
          : '/' + this.$i18n.locale + '/',
      showPassword: false,
      passwordFieldType: 'password',
      auth: {},
      time: '',
      busy: false,
      error: '',
    }
  },
  head() {
    return {
      title: this.$t('Login'),
      meta: [
        {
          hid: 'login',
          name: 'login',
          content: 'Halaman login aplikasi',
        },
      ],
    }
  },
  mounted() {
    //KITA LAKUKAN PENGECEK, JIKA SUDAH LOGIN
    if (this.$auth.$state.loggedIn) {
      //MAKA REDIRECT KE HALAMAN UTAMA
      this.$router.replace(this.currentLang + 'home')
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
        this.error = 'Username / email wajid diisi'
      } else if (!this.auth.password) {
        this.$refs.password.$el.focus()
        this.error = 'Password wajid diisi'
      } else {
        try {
          //MELAKUKAN PROSES LOGIN, DENGAN MENGGUNAKAN STRATEGIES LOCAL YANG ADA DI NUXT CONFIG
          //DAN MENGIRIMKAN DATA BERUPA EMAIL DAN PASSWORD
          await this.$auth
            .loginWith('local', {
              data: this.auth,
            })
            .then(() => {
              this.busy = false
              this.$router.replace(this.currentLang + 'home')
            })
        } catch (e) {
          this.busy = false
          this.error = e.response.data.message[this.$i18n.locale]
        }
      }
    },
  },
}
</script>

<style scoped>
.btn-dark-mode {
  position: absolute;
  border: 1px solid #e3e3e3;
  border-radius: 15px;
  cursor: pointer;
  z-index: 99;
}
.dark-mode .btn-dark-mode {
  background-color: #1c3c56;
}
.light-mode .btn-dark-mode {
  background-color: aliceblue;
}
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
@media (max-width: 480px) {
  .container-login100 {
    padding: 0;
  }
}
</style>
