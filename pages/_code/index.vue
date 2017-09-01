<template>
  <section class="detail" v-if="code && loading == 0">
    <div class="detail__info">
      <h4>{{ code.name | placeholder(code.content) | truncate(30) }}</h4>
      <ul>
        <li>Created at: {{ code.createdAt }}</li>
        <li>Private: {{ code.private }}</li>
        <li>Type: {{ code.type }}</li>
        <li>Views: {{ code.views }}</li>
      </ul>
    </div>
    <div class="detail__code">
      <highlight :code="code.content"></highlight>
    </div>
  </section>
</template>

<script>
import Highlight from 'vue-highlight-component'

import CodeGql from '~/apollo/Code.graphql'
import updateCodeGql from '~/apollo/updateCode.graphql'

export default {
  components: {
    Highlight
  },
  validate ({ params }) {
    return /^[a-z0-9]+$/i.test(params.code)
  },
  head () {
    return {
      title: this.code ? this.code.name || this.truncate(this.code.content) : 'Code'
    }
  },
  data () {
    return {
      loading: 0,
      code: null
    }
  },
  mounted () {
    this.incrementViews()
  },
  apollo: {
    code: {
      query: CodeGql,
      prefetch: ({ route }) => ({ id: route.params.code }),
      variables () {
        return { id: this.$route.params.code }
      },
      loadingKey: 'loading',
      update: data => data.Code
    }
  },
  methods: {
    async incrementViews () {
      await this.$apollo.mutate({
        mutation: updateCodeGql,
        variables: {
          id: this.code.id,
          views: this.code.views + 1
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import 'assets/variables.scss';

.detail {
  position: relative;
  display: flex;
  flex-direction: column;
  &__code {
    flex: 1;
    font-size: 15px;
    color: #666;
    code {
      padding: 0;
      margin: 0;
      background: none;
    }
  }
  &__info {
    margin-bottom: 16px;
    h4 {
      color: darken($primary, 5%);
    }
    ul {
      display: flex;
      flex-direction: row;
      list-style: none;
      padding: 6px 0;
      li {
        margin-right: 16px;
      }
    }
  }
}
</style>
