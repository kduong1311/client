<template>
  <div class="app">
    <NavBar v-if="showNavBar" class="navbar-fixed" />
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

.navbar-fixed {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.main-content {
  flex: 1; 
  margin-top: 60px; /* Adjust this value based on your navbar height */
}

footer {
  flex-shrink: 0; 
  padding: 1rem; 
  text-align: center;
}
</style>
