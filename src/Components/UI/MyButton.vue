<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style>
button {
  margin-top: 15px;
  border: 1px solid teal;
  background-color: white;
  padding: 10px 15px;
  color: teal;
}
</style>