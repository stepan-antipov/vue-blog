<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="list">
      <post-item 
      v-for="post in posts" 
      :post="post" 
      :key="post.id"
      @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h1 v-else style="color: red">Список постов пуст!</h1>
</template>


<script>
import PostItem from "./PostItem";
export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};

</script>


<style scoped>
 .list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(80px);
}
.list-move {
  transition: transform 0.4s;
}
</style>
