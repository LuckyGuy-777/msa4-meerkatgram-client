<script setup>
const props = defineProps({
  'type' : String,
  'placeholder' : String,
  'readonly' : Boolean,
  'required' : Boolean,
});

// 부모의 v-model과 연결되는 반응형 변수(v3.4+)
const model = defineModel();

</script>

<template>
  <input 
    :type="props.type"
    :readonly="props.readonly"
    :required="props.required"
    :placeholder="props.placeholder"
    v-model="model"  
  >

</template>

<style scoped>
input {
  padding: 0 10px;
  width: 300px;
  height: 85px;
  font-size: 24px;
  outline: none;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
  display: flex;
  align-items: center;

}
</style>


<!-- 

const props = defineProps({
  'type' : String,
  'placeholder' : String,
  'readonly' : Boolean,
  'required' : Boolean,
});  속성으로 전달될 값들

const model = defineModel(); 부모쪽에서 자동으로 연결
부모의 v-model과 연결되는 반응형 변수(v3.4+)

-->
