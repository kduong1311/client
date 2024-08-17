<template>
    <div class="container mt-3">
      <h2>User Management</h2>
      <div class="user-table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in adjustedUsers" :key="user._id">
              <td>{{ user.username }}</td>
              <td>{{ user.fullname }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.role }}</td>
              <td><img :src="user.avatar" alt="Avatar" width="50"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'ManageUser',
    computed: {
      ...mapGetters(['users']),
      adjustedUsers() {
        return this.users.map(user => {
          return {
            ...user,
            avatar: this.AvatarUrl(user.avatar)
          };
        });
      }
    },
    methods: {
      AvatarUrl(url) {
        if (!url) {
          return 'default-avatar-url.png'; // Replace with your default avatar URL
        }
        return url.startsWith('http') ? url : `https://server-xwi5.onrender.com/${url}`;
      }
    },
    async mounted() {
      await this.$store.dispatch('fetchUsers');
      console.log(this.users); // Check if fullName, email, and phone exist
    }
  }
  </script>
  
  <style scoped>
  .container {
    margin-left: 45px;
    margin-right: 45px;
  }
  
  .user-table {
    margin-top: 20px;
  }
  </style>
  