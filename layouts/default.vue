<template>
  <div>
    <div class="header">
      <router-link class="header__logo" to="/">
        <span>Vue.sk</span>
      </router-link>
      <div class="header__search">
        <div class="icon"><i class="material-icons">search</i></div>
        <svg v-show="loading > 0" class="spinner" width="16px" height="16px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
        <input v-model="search" type="text" @focus="focus = true" placeholder="Search codes..." :class="{ 'focus': !!search }">
        <div v-if="search" class="header__search__results" :class="{ 'header__search__results--show': focus }">
          <template v-if="searchedCodes.length">
            <div @click.prevent.stop="openSnippet(code.id)" class="header__search__results__item" v-for="code in searchedCodes" :key="code.id">
              <h6>{{ code.name | placeholder(code.content) | truncate(45) }}</h6>
              <small>{{ code.type.detected }}, {{ code.createdAt | formatDate }}</small>
            </div>
          </template>
          <div v-else class="header__search__results__item">
            Nothing found.
          </div>
        </div>
      </div>
      <div class="header__menu">
        <router-link class="link" :to="{ name: 'index' }" exact>
          Create snippet
        </router-link>
        <router-link class="link" :to="{ name: 'popular' }">
          Popular snippets
        </router-link>
        <router-link class="link" :to="{ name: 'pinned' }">
          Pinned snippets
        </router-link>
        <span class="spacer"></span>
        <a class="link" href="https://nuxtjs.org">
          Nuxt.js
        </a>
        <a class="link" href="https://vuejs.org">
          Vue.js
        </a>
      </div>
    </div>

    <section class="main">
      <div class="main__content">
        <nuxt/>
      </div>
      <div class="main__panel">
        <panel></panel>
      </div>
    </section>
  </div>
</template>

<script>
import Panel from '~/components/Panel.vue'

import allCodes from '~/graphql/allCodes.graphql'

export default {
  components: {
    Panel
  },
  data () {
    return {
      focus: false,
      search: '',
      searchedCodes: null,
      loading: 0
    }
  },
  apollo: {
    searchedCodes: {
      query: allCodes,
      variables () {
        return {
          content_contains: this.search,
          name_contains: this.search,
          orderBy: 'createdAt_DESC',
          first: 6
        }
      },
      fetchPolicy: 'cache-and-network',
      loadingkey: 'loading',
      update: (data) => data.allCodes
    }
  },
  methods: {
    openSnippet (id) {
      this.focus = false
      this.$router.push({ name: 'code', params: { code: id } })
    }
  }
}
</script>


<style lang="scss">
@import 'assets/variables.scss';

.main {
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  &__content {
    padding: 16px;
    flex: 1;
  }
  &__panel {
    width: 300px;
    min-height: 100%;
    background: #F3F3F3;
  }
}

.header {
  background-color: #fff;
  height: 60px;
  padding: 10px 16px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  border-bottom: 1px solid #eee;
  &__search {
    position: relative;
    margin-left: 16px;
    .spinner {
      position: absolute;
      right: 24px;
      height: 100%;
      top: 0;
      bottom: 0;
    }
    .icon {
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      i {
        font-size: 16px;
      }
    }
    &__results {
      display: none;
      width: 300px;
      position: absolute;
      box-shadow: 0px 1px 4px #ddd;
      background: #fff;
      top: 40px;
      left: 0px;
      &--show {
        display: block;
      }
      &__item {
        padding: 8px 16px;
        cursor: pointer;
        h6 {
          color: #777;
          font-size: 14px;
        }
        &:hover {
          background: #f5f5f5;
        }
      }
    }
    input {
      border: 1px solid #eee;
      outline: 0;
      border-radius: 16px;
      padding: 6px 10px 6px 26px;
      color: #777;
      width: 200px;
      transition: all .3s ease;
      &:focus {
        border: 1px solid #ccc;
      }
      &.focus {
        width: 300px;
      }
    }
  }
  &__menu {
    display: flex;
    align-items: center;
    margin-left: auto;
    .spacer {
      width: 1px;
      height: 30px;
      margin: 16px;
      background: #eee;
    }
    .link {
      padding: 16px;
      color: #415b76;
      &:hover {
        color: #1a2531;
      }
      &.nuxt-link-active {
        color: darken($primary, 3%);
      }
    }
  }
  &__logo {
    display: inline-block;
    font-size: 1.5em;
    color: #2c3e50;
    font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 500;
  }
}

.page-enter-active, .page-leave-active {
  transition: all .2s;
}
.page-enter {
  opacity:   0;
}
</style>
