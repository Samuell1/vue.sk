<template>
  <div>
    <div class="header">
      <router-link class="header__logo" to="/">
        <span>Vue.sk</span>
      </router-link>
      <search></search>
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
import Search from '~/components/Search.vue'

export default {
  components: {
    Panel,
    Search
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
      color: $link;
      &:hover {
        color: $linkHover;
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
