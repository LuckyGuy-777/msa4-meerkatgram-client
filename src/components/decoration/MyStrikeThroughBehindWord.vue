<script setup>
const props = defineProps({
  'content': String,
})
</script>

<template>
<span>{{ props.content }}</span>
</template>

<style scoped>
span {
  min-width: 320px;
  display: flex;
  align-items: center;
  color: var(--personal-color-gray);
  font-size: 30px;
  gap: 10px;
}

span::before, span::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: var(--personal-color-gray);
}
</style>


<!-- 

or 문구 스타일

span {
  min-width: 320px;
  display: flex;
  align-items: center;
  color: var(--personal-color-gray);
  font-size: 30px;
  gap: 10px;
} 

or 옆의 가로줄 스타일
span::before, span::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: var(--personal-color-gray);
}  



-->
