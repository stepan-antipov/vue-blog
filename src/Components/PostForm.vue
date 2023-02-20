<template>
  <form @submit.prevent>
    <h2>Добавить пост</h2>
    <my-input
      v-model:value="post.title"
      placeholder="Названиее поста"
    />
    <my-input
      v-model:value="post.body"
      placeholder="Описаниее поста"
    />
    <my-button 
      class="btn" 
      @click="createPost"
      >
      Добавить
    </my-button>
  </form>
</template>


<script>
export default {
   data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
   },
   methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
   }
};
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: flex-end;
}
</style>
