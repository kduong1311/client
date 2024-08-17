<template>
  <nav class="navbar navbar-expand-lg navbar">
    <div style="margin-left: 50px;" class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex align-items-center me-3">
          <!-- Logo Section -->
          <router-link class="navbar-logo-link" to="/homepage">
            <img src="https://server-xwi5.onrender.com/uploads/Untitled-12.png" alt="Logo" class="navbar-logo"/>
          </router-link>
          <!-- Search Form -->
          <form @submit.prevent="handleSearch" v-if="role !== 'admin'" class="ms-3">
            <div class="input-group" style="width: 250px;">
              <input v-model="searchTerm" type="search" class="form-control rounded" placeholder="Search here..."
                aria-label="Search" aria-describedby="search-addon" />
            </div>
          </form>
        </div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/homepage">Home</router-link>
          </li>
          <li class="nav-item" v-if="(role === 'admin')">
            <router-link class="nav-link" to="/product/manage">Manage Book</router-link> 
          </li>
          <li class="nav-item" v-if="role === 'admin'">
            <router-link class="nav-link" to="/user/manage">Manage User</router-link>
          </li>
          <li class="nav-item" v-if=" role === 'user'">
            <router-link class="nav-link" to="/products" @click.native="handleProductsClick">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex flex-row ms-auto">
          <li class="nav-item me-3 me-lg-0" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">
              <button class="btn btn-primary">Login</button>
            </router-link>
          </li>
          <li class="nav-item dropdown me-3 me-lg-0" v-if="isAuthenticated">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img :src="avatarUrl" style="width: 40px; height: 40px" class="rounded-circle" alt="User Avatar">
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
              <li><router-link class="dropdown-item" to="/editprofile">Edit Profile</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button style="background-color: red;" class="dropdown-item" @click="handleLogout">Logout</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      searchTerm: '',
      user: null,
      roleNow: 'user',
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'role', 'avatar']),
    avatarUrl() {
      return this.avatar ? `https://server-xwi5.onrender.com/${this.avatar}` : "";
    }
  },
  methods: {
    ...mapActions(['logout', 'setSearchTerm', 'fetchProducts', 'fetchProfile']),
    handleLogout() {
      this.logout().then(() => {
        this.$router.push('/'); //redirect to home page
      });
    },
    handleSearch() {
      this.setSearchTerm(this.searchTerm);

      if (this.$route.path !== '/products') {
        this.$router.push('/products');
      } else {

        this.fetchProducts();
      }
    },
    handleProductsClick() {
      this.searchTerm = ''; 
      this.setSearchTerm(this.searchTerm); 
      this.fetchProducts(); 
    },

    async getUserProfile() {
      await this.fetchProfile();
      this.user = this.$store.getters.profile;
      this.roleNow = this.user.role
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getUserProfile()
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fix;
  z-index: 1000;
  background-color: red;
}
.navbar .navbar-brand {
  color: white;
}
.navbar .nav-link {
  color: white;
}
.navbar .nav-link:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
}
.navbar-logo {
  width: 50px; /* Adjust the size as needed */
  height: auto;
}
</style>
