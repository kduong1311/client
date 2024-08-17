<template>
  <section class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm" style="width: 100%; max-width: 400px;">
      <div class="row g-0">
        <div class="col d-flex align-items-center">
          <div class="card-body p-4">
            <h2 class="text-center mb-4" style="color: #ffffff;">LOGIN</h2>
            <form @submit.prevent="handleLogin">
              <div class="form-outline mb-3">
                <input 
                  v-model="username" 
                  type="text" 
                  id="username" 
                  class="form-control form-control-lg" 
                  placeholder="Username" 
                  required 
                />
              </div>

              <div class="form-outline mb-3">
                <input 
                  v-model="password" 
                  type="password" 
                  id="password" 
                  class="form-control form-control-lg" 
                  placeholder="Password" 
                  required 
                />
              </div>

              <div class="pt-1 mb-3">
                <button 
                  type="submit" 
                  class="btn btn-dark btn-lg btn-block" 
                >
                  Login
                </button>
              </div>
              <p class="mb-4 text-center" style="color: #ffffff">
                Don't have an account? 
                <router-link to="/register" style="color: #ffffff;">Register Here</router-link>
              </p>
            </form>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['error']),
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.$store.commit('CLEAR_MESSAGES'); 
      try {
        await this.login({ username: this.username, password: this.password });
        if (!this.error) {
          this.$router.push('/homepage');
        }
      } catch (err) {
        this.error = error.message || 'An error occurred during Login';
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #23303e;
}

.card {
  background-color: #ff00008f;
  border: none;
}

.btn-dark {
  background-color: #2200ff;
  border-color: #000;
  color: #ffffff;
  font-weight: bold;
}

.btn-dark:hover {
  background-color: #333;
  border-color: #333;
}

.text-black {
  color: #000 !important;
}

.text-muted {
  color: #6c757d !important;
}
</style>
