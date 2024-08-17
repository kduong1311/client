<template>
    <section>
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card" style="border-radius: 15px;">
              <div class="card-body p-4">
                <h2 class="text-uppercase text-center mb-4">Update Profilee</h2>
  
                <form @submit.prevent="submitUpdate">
  
                  <div class="form-outline mb-3">
                    <input v-model="localProfile.username" type="text" id="username" class="form-control form-control-sm" placeholder="Username" required />
                  </div>
  
                  <div class="form-outline mb-3">
                    <input v-model="localProfile.fullname" type="text" id="fullname" class="form-control form-control-sm" placeholder="Full Name" required />
                  </div>
  
                  <div class="form-outline mb-3">
                    <input v-model="localProfile.age" type="number" id="age" class="form-control form-control-sm" placeholder="Age" required />
                  </div>
  
                  <div class="form-outline mb-3">
                    <input v-model="localProfile.phoneNumber" type="text" id="phone" class="form-control form-control-sm" placeholder="Phone Number" required />
                  </div>
  
                  <div class="form-outline mb-3">
                    <input @change="onFileChange" type="file" id="avatar" class="form-control form-control-sm" />
                  </div>
  
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-success btn-block btn-sm gradient-custom-4 text-body no-underline">Update</button>
                  </div>
  
                </form>
  
                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                <div v-if="success" class="alert alert-success mt-3">
                  {{ success }}
                </div>
  
              </div>
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
        localProfile: {
          username: '',
          fullname: '',
          age: '',
          phoneNumber: '',
          avatar: null,
        }
      };
    },
    computed: {
      ...mapGetters(['error', 'success', 'profile']),
    },
    created() {
      this.$store.dispatch('fetchProfile').then(() => {
        // Sao chép dữ liệu từ Vuex store vào dữ liệu component
        this.localProfile = { ...this.localProfile, ...this.profile };
      });
    },
    methods: {
      ...mapActions(['updateProfile', 'clearMessages']),
      onFileChange(event) {
        this.localProfile.avatar = event.target.files[0];
      },
      async submitUpdate() {
        this.clearMessages();
        try {
          const formData = new FormData();
          formData.append('username', this.localProfile.username);
          formData.append('fullname', this.localProfile.fullname);
          formData.append('age', this.localProfile.age);
          formData.append('phoneNumber', this.localProfile.phoneNumber);
          formData.append('avatar', this.localProfile.avatar);
  
          await this.updateProfile(formData);
        } catch (error) {
          this.$store.commit('SET_ERROR', error.message || 'An error occurred during profile update.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #0080ff;
  }
  
  .gradient-custom-4 {
    background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
  }
  
  .card {
    border-radius: 15px;
  }
  
  .btn-success {
    background-color: #4caf50;
    border: none;
  }
  
  .btn-success:hover {
    background-color: #45a049;
  }
  
  .text-body {
    color: #007bff !important;
  }
  
  .text-body:hover {
    text-decoration: underline;
  }
  
  .text-white {
    color: white !important;
  }
  
  .alert {
    margin-top: 15px;
  }
  
  .no-underline {
    text-decoration: none;
  }
  
  .container {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  </style>
  