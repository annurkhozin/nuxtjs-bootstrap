<template>
  <div>
    <Breadcrumb :items="breadcrumb" />
    <div v-if="roles.includes('create')">
      <div class="d-none d-md-block d-md-block">
        <b-button class="mb-3 shadow gd-success" size="sm">{{
          $t('New')
        }}</b-button>
      </div>
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

    <div v-if="roles.includes('read')">
      <b-row>
        <b-col align-self="start">
          <label class="mr-sm-1 str" for="inline-form-custom-select-pref"
            >{{ $t('Show') }}&nbsp;
          </label>
          <b-form-select
            id="inline-form-custom-select-pref"
            v-model="limitData"
            size="sm"
            class="str"
            :options="[50, 100, 500]"
            :value="50"
            @change="getUsers"
          ></b-form-select>
          <b-dropdown
            text="Filter"
            size="sm"
            :variant="
              this.$store.state.darkMode ? 'secondary' : 'outline-secondary'
            "
            class="col-2 pl-0 pr-0 str"
            v-show="!isSearch"
          >
            <b-form-checkbox
              v-model="filter.isActiveUser"
              size="sm"
              class="ml-2 mr-2 str"
              >{{ $t('Active_user') }}</b-form-checkbox
            >
            <b-form-checkbox
              v-model="filter.isActiveGroup"
              size="sm"
              class="ml-2 mr-2 str"
              >{{ $t('Active_group') }}</b-form-checkbox
            >
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="getUsers" style="font-size: 1rem"
              ><b-icon-check></b-icon-check> {{ $t('Done') }}</b-dropdown-item
            >
          </b-dropdown>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-input-group size="sm" class="col-12 col-md-6 pl-0 pr-0">
            <b-form-input
              v-model="filter.searchData"
              :placeholder="$t('Search') + '...'"
              @input="getUsers"
            ></b-form-input>
            <span class="input-group-append">
              <div
                class="input-group-text bg-transparent"
                type="button"
                @click="getUsers"
              >
                <b-icon-search class="icon" scale="0.8"></b-icon-search>
              </div>
            </span>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-3 list-row block">
        <b-col v-if="!recordShow" class="text-center str">
          <span> {{ $t('NoAvailable') }}</span>
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
              {{ $t('reload') }}
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
                    v-if="user.photo"
                    :src="user.photo"
                    :alt="user.nama"
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
                {{ user.group }}
              </div>
            </div>
            <b-col
              v-if="id_user_login != user._id"
              class="text-right"
              style="position: absolute"
            >
              <b-button
                v-if="roles.includes('delete')"
                size="sm"
                :variant="
                  $store.state.darkMode ? 'secondary' : 'outline-secondary'
                "
                class="btn-action"
                @click="
                  userAction(user._id, '(' + user.code + ') ' + user.nama)
                "
              >
                <b-icon-trash></b-icon-trash>
              </b-button>
              <b-button
                v-if="roles.includes('update')"
                size="sm"
                :variant="
                  $store.state.darkMode ? 'secondary' : 'outline-secondary'
                "
                class="btn-action"
              >
                <b-icon-person-badge></b-icon-person-badge>
              </b-button>
              <span class="d-inline d-sm-none d-md-none d-lg-none d-xl-none">
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
        <span
          >{{ $t('Showing') }}
          {{ recordShow + ' ' + $t('of') + ' ' + recordsTotal }} data.</span
        >
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
    </div>
    <b-row class="mb-5"></b-row>
  </div>
</template>

<script>
import demoAccount from '~/plugins/alert-demo-account'
import Breadcrumb from '~/components/Breadcrumb'
export default {
  name: 'User',
  auth: true,
  components: {
    Breadcrumb,
  },
  middleware: ['role'],
  data() {
    return {
      id_user_login: this.$auth.$state.user._id,
      roles: this.$store.state.roles,
      users: [],
      recordsTotal: 0,
      recordShow: 0,
      limitData: 50,
      pagination: 1,
      busy: false,
      showLoadMore: false,
      isSearch: false,
      filter: {
        searchData: '',
        isActiveUser: true,
        isActiveGroup: true,
      },
      colorAvatar: ['gd-primary', 'gd-success', 'gd-info', 'gd-warning'],
      breadcrumb: [
        {
          text: this.$t('Home'),
          to: 'home',
        },
        {
          text: this.$t('User'),
          active: true,
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('User'),
    }
  },

  computed: {},
  created() {
    this.getUsers()
  },
  methods: {
    async userAction(id, fullname) {
      if (this.$auth.$state.user.demo_account) {
        demoAccount.alert(
          this.$t('AlertDemoTitle'),
          this.$t('AlertDemoContent')
        )
      } else {
        await this.$confirm({
          title: '⛔ ' + fullname,
          message: this.$t('AlertDeleteContent'),
          button: {
            no: this.$t('Back'),
            yes: this.$t('Continue'),
          },
          callback: (confirm) => {
            if (confirm) {
              alert('OK')
            }
          },
        })
      }
    },
    async getUsers() {
      this.busy = true
      this.pagination = 1
      const users = await this.$axios.$get('/api/users', {
        params: {
          pagination: this.pagination,
          limit: this.limitData,
          filter: this.filter,
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
.custom-select {
  background: transparent;
  padding: 0.375rem;
  text-align: center;
  width: 50px;
}

.dark-mode .btn-filter {
  border: #eee;
}

@media (max-width: 575px) {
  .dark-mode .list-item {
    border-bottom: 1px solid rgba(136, 136, 136, 0.4);
  }
  .light-mode .list-item {
    border-bottom: 1px solid #eeeeee;
  }
  .custom-select {
    width: 40px;
  }
}
</style>
