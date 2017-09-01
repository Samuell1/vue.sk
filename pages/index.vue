<template>
  <section class="code">
    <textarea name="code" v-model="data.content" placeholder="Paste some code here .... "></textarea>
    <div class="code__actions">
      <input v-model="data.name" type="text" placeholder="Name your snippet">
      <span class="checkbox">
        <input id="private" type="checkbox" v-model="data.private">
        <label for="private">Private?</label>
      </span>
      <button class="button button--green" @click="createCode" :disabled="!this.data.content">Create snippet</button>
    </div>
  </section>
</template>

<script>
import createCodeGql from '~/apollo/createCode.graphql'
import allCodes from '~/apollo/allCodes.graphql'
import detectLang from 'lang-detector'

export default {
  head: {
    title: 'Create snippet'
  },
  data () {
    return {
      data: {
        name: '',
        private: false,
        content: ''
      }
    }
  },
  methods: {
    createCode () {
      if (this.data.content) {
        const type = detectLang(this.data.content)
        this.$apollo.mutate({
          mutation: createCodeGql,
          variables: {
            ...this.data,
            type: type || null
          },
          update: (store, { data: { createCode } }) => {
            const data = store.readQuery({
              query: allCodes,
              variables: {
                orderBy: 'createdAt_DESC',
                first: 20,
                private: createCode.private
              }
            })
            data.allCodes.unshift(createCode)
            store.writeQuery({
              query: allCodes,
              variables: {
                orderBy: 'createdAt_DESC',
                first: 20,
                private: createCode.private
              },
              data
            })
          }
        }).then((response) => {
          this.$router.push({ name: 'code', params: { code: response.data.createCode.id } })
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.code {
  position: relative;
  height: 100%;
  &__actions {
    position: absolute;
    top: 0px;
    right: 0px;
    .checkbox {
      cursor: pointer;
      margin-right: 16px;
      label {
        cursor: pointer;
      }
    }
  }
  textarea {
    font-size: 16px;
    color: #555;
    border: 0;
    width: 100%;
    height: 100%;
    resize: none;
  }
}

</style>
