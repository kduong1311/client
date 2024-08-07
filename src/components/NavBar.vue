<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <i class="fab fa-github fa-2x mx-3 ps-1"></i>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="me-3">
            <div class="form-white input-group" style="width: 250px;">
              <input type="search" class="form-control rounded" placeholder="Search here..."
                aria-label="Search" aria-describedby="search-addon" />
            </div>
          </form>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/homepage">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/words">Words</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/services">Services</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/start">Contact</router-link>
            </li>
          </ul>
          <ul class="navbar-nav d-flex flex-row ms-auto me-3">
            <li class="nav-item me-3 me-lg-0" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">
                <button class="btn btn-primary">Login</button>
              </router-link>
            </li>
            <li class="nav-item dropdown me-3 me-lg-0" v-if="isAuthenticated">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img style="width: 40px;" src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-hacker-avatars-flat-icons-pack-people-456327.png" class="rounded-circle" alt="User Avatar">
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
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    methods: {
      ...mapActions(['logout']),
      handleLogout() {
        this.logout().then(() => {
          this.$router.push('/'); // Chuyển hướng đến trang login sau khi đăng xuất
        });
      },
    },
  };
  </script>
  
  <style scoped>
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
  </style>
  