<script setup>
import router from '../routes/router';
import { useAuthStore } from '../store/auth/useAuthStore';

// 유저정보 가지고 있음
const authStore = useAuthStore();

const newPost = () => {
  router.push('/posts/new')
}

</script>

<template>
<div>
<!-- userinfo 가 있는상황에서만 출력한다. -->
<div
  class="container"
  v-if="authStore.isLoggedIn && authStore.userInfo"
>

  <div class="profile-box">
    <div
     class="bg-image-circle profile"
     :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
     ></div>
  </div>

  <div class="info-box">
    <div class="nick">{{ authStore.userInfo.nick }}</div>
    <div class="write-count">posts {{ authStore.userInfo.countPosts }}</div>
    <div class="redirect-box">
      <div
       class="bg-image-square redirect-icon-posts-index"
       style="background-image: url('/icons/gallery.png');"
       ></div>
      <div
       class="bg-image-square redirect-icon-posts-create"
       style="background-image: url('/icons/plus-sign.png');"
       @click="newPost()"
       ></div>
      <div
       class="bg-image-square redirect-icon-posts-info"
       style="background-image: url('/icons/person.png');"
       ></div>
     </div>
    </div>
  </div>
  <hr>
</div>

</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.redirect-box {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 10px;
}

</style>


<!--    border-radius: 50%;  이미지 모서리를 둥글게 만드는것 -->
