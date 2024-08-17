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
  min-height: 100vh; 
}

.main-content {
  flex: 1; 
}

footer {
  flex-shrink: 0; 
  padding: 1rem; 
  text-align: center;
}
</style>
