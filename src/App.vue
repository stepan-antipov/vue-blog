<template>
  <div class="app">
    <header>
      <h1>Страница с постами</h1>
      <my-input :value="searchQuery" @input="setSearchValue" placeholder="Поиск..."/>
      <div>
        <my-button 
          @click="showDialog" 
          style="margin-right: 10px">
          Создать пост
        </my-button>
        <my-select 
          v-model="selectedSort"
          :options="sortOptions"
        />
      </div>
        <!-- <my-button @click="fetchPosts">Загрузить посты</my-button> -->
    </header>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    
    <post-list 
    @remove="removePost" 
    :posts="sortedAndSearchPosts"
    v-if="postLoading === false"
    />
    <div v-else>Идет загрузка</div>
  </div>
</template>

<script>
import PostForm from '@/Components/PostForm';
import PostList from '@/Components/PostList';
import axios from 'axios';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      postLoading: true,
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        { value: 'title', name: 'По названию' }, 
        { value: 'body', name: 'По содержанию' }
      ]
    };
  },
  methods: {
    createPost(post){
      this.posts.push(post)
      this.dialogVisible = false;

    },
    removePost(post){
      this.posts = this.posts.filter(elem => elem.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    setSearchValue(event) {
      this.searchQuery = event.target.value
    },
    async fetchPosts() {
      try {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = resp.data
      } catch(err) {
        console.log(err)
      } finally {
        this.postLoading = false
      }
    },
  },
  mounted() {
    this.fetchPosts();
  }, 
  computed: {
    selectedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchPosts() {
      return this.selectedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: end;
}

.app {
  padding: 15px;
}


</style>
