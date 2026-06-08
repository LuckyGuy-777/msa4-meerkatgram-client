<script setup>
import MyButton from '../../components/button/MyButton.vue';


</script>

<template>
  



<MyButton
  :color="'gray'"
  :size="'middle'"
  :content="'Write'"
  @click="getNextPage()" 
/>

</template>

<style scoped>

</style>
