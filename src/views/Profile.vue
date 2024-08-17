<template>
  <section class="vh-100" style="background-color: #f4f5f7;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-8 mb-4 mb-lg-0">
          <div v-if="user" class="card mb-3" style="border-radius: .5rem;">
            <div class="row g-0">
              <!-- Avatar and Header Section -->
              <div class="col-md-4 pt-3 gradient-custom text-center text-white" style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                <!-- Fixed size container for avatar -->
                <div class="avatar-container">
                  <img :src="getAvatarUrl(user.avatar)" alt="Avatar" class="img-fluid" />
                </div>
                <h5 class="pt-5">{{ user.fullname }}</h5>
                <router-link to="/editprofile"><i class="far fa-edit mb-5"></i></router-link>
              </div>
              <!-- User Information Section -->
              <div class="col-md-8">
                <div class="card-body p-4">
                  <h2>PROFILE</h2>
                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Username</h6>
                      <p class="text-muted">{{ user.username }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Age</h6>
                      <p class="text-muted">{{ user.age }}</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Phone Number</h6>
                      <p class="text-muted">{{ user.phoneNumber }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      user: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['fetchProfile']),
  async getUserProfile() {
    try {
      // fetchProfile was commit data in store,  get the data from store now
      await this.fetchProfile();
      this.user = this.$store.getters.profile;
    } catch (error) {
      this.error = error.response ? error.response.data.msg : 'Failed to load profile';
      console.error(this.error);
    }
  },
  getAvatarUrl(avatar) {
    return avatar ? `http://localhost:5000/${avatar}` : null;
  },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getUserProfile();
    } else {
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.gradient-custom {
  background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));
}
.card {
  border-radius: .5rem;
}
.card-body {
  padding: 1.5rem;
}
.avatar-container {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  background-color: #fff; /* Optional: for better contrast */
}
.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
img {
  max-width: 100%;
  height: auto;
}
.alert {
  margin-top: 20px;
}
</style>
