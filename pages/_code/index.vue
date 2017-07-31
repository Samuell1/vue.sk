<template>
  <section class="detail" v-if="Code && loading == 0">
    <div class="detail__info">
      <h4>{{ Code.name | placeholder(Code.content) | truncate(30) }}</h4>
      <ul>
        <li>Created at: {{ Code.createdAt }}</li>
        <li>Private: {{ Code.private }}</li>
        <li>Type: {{ Code.type.detected }}</li>
        <li>Views: {{ Code.views }}</li>
      </ul>
    </div>
    <div class="detail__code">
      <highlight :code="Code.content"></highlight>
    </div>
  </section>
</template>

<script>
import Highlight from 'vue-highlight-component'

import CodeGql from '~/graphql/Code.graphql'
import updateCodeGql from '~/graphql/updateCode.graphql'

export default {
  components: {
    Highlight
  },
  head () {
    return {
      title: this.Code ? this.Code.name || this.truncate(this.Code.content) : 'NULL'
    }
  },
  data () {
    return {
      loading: 0
    }
  },
  apollo: {
    Code: {
      query: CodeGql,
      prefetch: ({ route }) => ({ id: route.params.code }),
      variables () {
        return { id: this.$route.params.code }
      },
      loadingKey: 'loading',
      error (error) {
        error({ statusCode: 404, message: error })
      },
      result ({ data, loader, networkStatus }) {
        // TODO +1 to views
        // this.$apollo.mutate({
        //   mutation: updateCodeGql,
        //   variables: {
        //     id: this.$route.params.code,
        //     views: 0
        //   }
        // }).then((response) => {
        //   console.error(response)
        // }).catch((error) => {
        //   console.error(error)
        // })
      }
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
