<template>
  <div class="allCodes">
    <router-link :to="{ name: 'code', params: { code: code.id } }" tag="div" v-for="code in allCodes" :key="code.id" class="allCodes__code">
      <h6>{{ code.name | placeholder(code.content) | truncate(45) }}</h6>
      <small>{{ code.type }}, {{ code.createdAt | formatDate }}</small>
    </router-link>
  </div>
</template>

<script>
import allCodes from '~/apollo/allCodes.graphql'

export default {
  head: {
    title: 'Popular snippets'
  },
  apollo: {
    allCodes: {
      query: allCodes,
      variables: {
        orderBy: 'views_DESC',
        first: 20,
        private: false
      },
      prefetch: true
    }
  }
}
</script>

<style lang="scss">
@import 'assets/variables.scss';

.allCodes {
  display: flex;
  flex-wrap: wrap;
  &__code {
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 3px;
    margin-right: 16px;
    margin-top: 16px;
    h6 {
      color: #777;
      font-size: 14px;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid darken($primary, 3%);
    }
  }
}
</style>
