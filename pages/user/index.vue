<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <div class="mb-3 d-none d-md-block d-md-block">
      <b-button variant="success btn-dashed shadow">Tambah</b-button>
    </div>
    <b-row>
      <b-col align-self="start">
        <label class="mr-sm-2 str" for="inline-form-custom-select-pref"
          >Tampilkan&nbsp;
        </label>
        <b-form-select
          id="inline-form-custom-select-pref"
          v-model="limitData"
          size="sm"
          class="mr-sm-2 mb-sm-0 col-5 col-sm-6 col-md-3"
          :options="[50, 100, 500]"
          :value="50"
          @change="getUsers"
        ></b-form-select>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <b-input-group size="sm" class="col-12 col-md-8">
          <b-form-input
            v-model="searchData"
            placeholder="Pencarian..."
            @input="getUsers"
          ></b-form-input>
          <span class="input-group-append">
            <div
              class="input-group-text bg-transparent"
              type="button"
              @click="getUsers"
            >
              <b-icon-search class="icon"></b-icon-search>
            </div>
          </span>
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mt-3 list-row block">
      <b-col v-if="!recordShow" class="text-center str">
        <span> Tidak ada data ditemukan.</span>
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
            variant="outline-success"
            @click="getUsers"
          >
            muat ulang
          </b-button>
        </b-overlay>
      </b-col>
      <b-col
        v-for="(user, index) in users"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="pr-2 pl-2"
      >
        <div class="list-item">
          <div>
            <a href="javascript:void();"
              ><span class="w-48 avatar" :class="bgAvatar()">
                <span v-if="!user.photo && user.nama">
                  {{ user.nama.substring(0, 1).toUpperCase() }}
                </span>
                <img
                  v-if="photo_user"
                  :src="photo_user"
                  :alt="nama_user"
                  class="rounded-circle mx-2 flex-shrink-0"
                  style="width: 48px; height: 48px" /></span
            ></a>
          </div>
          <div class="flex">
            <a
              href="javascript:void();"
              class="item-author str font-weight-bold"
              >{{ user.nama }}</a
            >
            <div class="item-except text-sm h-1x str">
              {{ user.jabatan }}
            </div>
          </div>
          <b-col
            class="text-right"
            v-if="id_user_login != user._id"
            style="position: absolute"
          >
            <b-button
              variant="danger"
              size="sm"
              class="btn-action"
              @click="userAction(user._id, '(' + user.code + ') ' + user.nama)"
            >
              <b-icon-trash></b-icon-trash>
            </b-button>
            <b-button variant="success" size="sm" class="btn-action">
              <b-icon-pencil-square></b-icon-pencil-square>
            </b-button>
            <span class="d-inline d-md-none d-lg-none d-xl-none">
              <b-icon-three-dots-vertical
                class="icon"
                scale="1.3"
              ></b-icon-three-dots-vertical>
            </span>
          </b-col>
        </div>
      </b-col>
    </b-row>
    <b-col v-if="recordShow" class="text-center mt-3 str">
      <span>Ditampilkan {{ recordShow + ' dari ' + recordsTotal }} data.</span>
      <b-overlay
        v-if="showLoadMore"
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
          variant="outline-success"
          @click="loadMore"
        >
          lebih banyak
          <b-icon-chevron-double-down
            animation="cylon-vertical"
          ></b-icon-chevron-double-down>
        </b-button>
      </b-overlay>
    </b-col>
    <b-row class="mb-5"></b-row>
    <b-row
      style="font-size: 3rem"
      class="fab d-block d-md-none d-lg-none d-xl-none"
    >
      <b-icon
        icon="plus"
        class="rounded-circle bg-success shadow p-2"
        variant="light"
      ></b-icon>
    </b-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import demoAccount from '~/plugins/alert-demo-account'
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'User',
  auth: true,
  components: {
    Breadcrumb,
  },

  data() {
    return {
      id_user_login: this.$auth.$state.user._id,
      users: [],
      recordsTotal: 0,
      recordShow: 0,
      limitData: 50,
      pagination: 1,
      searchData: '',
      busy: false,
      showLoadMore: false,
      colorAvatar: ['gd-primary', 'gd-success', 'gd-info', 'gd-warning'],
      breadcrumb: [
        {
          text: 'Beranda',
          to: '/',
        },
        {
          text: 'Pengguna',
          active: true,
        },
      ],
    }
  },
  head: {
    title: 'Daftar Pengguna',
    meta: [
      {
        hid: 'users',
        name: 'users',
        content: 'Halaman daftar pengguna',
      },
    ],
  },
  computed: {},
  created() {
    this.getUsers()
    this.sidebarMenu(false)
  },
  methods: {
    ...mapMutations(['SET_SIDEBAR']),

    async userAction(id, fullname) {
      if (this.$auth.$state.user.demo_account) {
        demoAccount.alert()
      } else {
        await this.$confirm({
          title: '⛔ ' + fullname,
          message:
            'Akun akan di Non-aktifkan. Hal ini akan menyebabkan akun tersebut tidak dapat masuk ke Sistem.',
          button: {
            no: 'Kembali',
            yes: 'Lanjutkan',
          },
          callback: (confirm) => {
            if (confirm) {
              alert('OK')
            }
          },
        })
      }
    },
    sidebarMenu(payload) {
      this.SET_SIDEBAR(payload)
    },
    async getUsers() {
      this.busy = true
      this.pagination = 1
      const users = await this.$axios.$get('/api/users', {
        params: {
          pagination: this.pagination,
          limit: this.limitData,
          search: this.searchData,
        },
      })
      this.recordsTotal = users.recordsTotal
      this.users = users.data
      this.recordShow = this.users.length
      this.hideLoadMore()
      this.busy = false
    },
    async loadMore() {
      this.busy = true
      const users = await this.$axios.$get('/api/users', {
        params: {
          pagination: this.pagination,
          limit: this.limitData,
          search: this.searchData,
        },
      })
      this.recordsTotal = users.recordsTotal
      this.users = [...this.users, ...users.data]
      this.recordShow = this.users.length
      this.hideLoadMore()
      this.pagination = this.pagination + 1
      this.busy = false
    },
    hideLoadMore() {
      if (this.lengthData > this.users.length) {
        this.showLoadMore = true
      } else {
        this.showLoadMore = false
      }
    },
    bgAvatar() {
      return this.colorAvatar[
        Math.floor(Math.random() * this.colorAvatar.length)
      ]
    },
  },
}
</script>

<style scoped>
.btn-action {
  visibility: hidden;
}

.list-item:hover {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.list-item:hover .btn-action {
  position: relative;
  visibility: visible;
  transition: all 0.2s linear;
}

.list-item {
  cursor: pointer;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  margin-bottom: 1rem;
}

.list-row .list-item {
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-align: center;
  align-items: center;
}

.list-row .list-item > * {
  padding: 0.5rem;
}

.no-wrap {
  white-space: nowrap;
}

.text-gd {
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  text-fill-color: transparent;
}

.text-sm {
  font-size: 0.825rem;
}

.w-48 {
  width: 48px !important;
  height: 48px !important;
}
a:link {
  text-decoration: none;
}
</style>
