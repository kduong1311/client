<template>
  <div class="app">
    <NavBar v-if="showNavBar" />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  computed: {
    showNavBar() {
      return this.$route.name !== 'Start';
    },
    showFooter() {
      return this.$route.name !== 'Start';
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Đảm bảo chiều cao tối thiểu của app là chiều cao của màn hình */
}

.main-content {
  flex: 1; /* Chiếm không gian còn lại giữa header và footer */
}

footer {
  flex-shrink: 0; /* Đảm bảo footer không bị thu nhỏ */
  padding: 1rem; /* Ví dụ: Khoảng cách bên trong footer */
  text-align: center; /* Canh giữa nội dung trong footer */
}
</style>
