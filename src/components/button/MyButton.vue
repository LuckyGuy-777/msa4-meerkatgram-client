<script setup>

// 이름 : 데이터타입  지정해주면 된다고함. props
const props = defineProps({
  'btnType' : {
    // props 도 객체 형식으로 줄 수 있다고함. { } 을 사용해서.
    
    // 부모에서 버튼타입이 주어지지 않을 경우, button 으로 주어짐. 
    type: String, 
    default: 'button'
  }, // 'button', 'submit', 'reset'
  'size' : String,  // 'big' , 'middle' , 'small'
  'color' : String, // 'black' , 'white' , 'gray'
  'content' : String,
});
</script>

<template>
  <button
   :type="props.btnType" 
   :class="[props.color, props.size]">
   {{props.content }}</button>
</template>

<style scoped>
button {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.big {
  width: 350px;
  height: 45px;
  font-size: 20px;

}

.middle {
  width: 300px;
  height: 70px;
  font-size: 40px;
}

.small {
  width: 90px;
  height: 45px;
  font-size: 20px;
}


.black {
  background-color: var(--personal-color-black);
  color: var(--personal-color-white);
} 

.gray {
  background-color: var(--personal-color-gray);
  color: var(--personal-color-white);
}

.white {
  background-color: var(--personal-color-white);
  color: var(--personal-color-black);
}
</style>
