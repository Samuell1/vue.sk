<template>
  <div class="panel">
    <div class="panel__title">Last snippets</div>
    <div v-for="code in allCodes" :key="code.id" @click="$router.push({ name: 'code', params: { code: code.id } })" class="panel__item" >
      <h6>{{ code.name | placeholder(code.content) | truncate(40) }}</h6>
      <small>{{ code.createdAt }}, {{ code.type.detected }}</small>
    </div>
  </div>
</template>

<script>
import allCodes from '~/graphql/allCodes.graphql'

export default {
  apollo: {
    allCodes: {
      query: allCodes,
      variables: {
        orderBy: 'createdAt_DESC',
        first: 20
      },
      prefetch: true
    }
  }
}
</script>

<style lang="scss">
.panel {
  &__title {
    padding: 16px;
    font-size: 14px;
    color: #333;
    text-transform: uppercase;
  }
  &__item {
    padding: 8px 16px;
    cursor: pointer;
    h6 {
      color: #777;
      font-size: 14px;
    }
    &:hover {
      background: #e5e5e5;
    }
  }
}
</style>
