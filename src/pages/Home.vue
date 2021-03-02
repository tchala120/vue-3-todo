<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2>Vue 3 with Typescript, Eslint, Prettier, Jest and Ant Design UI</h2>
    <h1><strong>Template</strong></h1>
    <a href="https://github.com/tchala120">
      <a-button class="github-button">Github <GithubOutlined /></a-button>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { GithubOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'Home',
  components: {
    GithubOutlined,
  },
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .github-button {
    margin-top: 2rem;
  }
}
</style>
