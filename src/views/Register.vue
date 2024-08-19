<template>
  <section>
    <div class="mask d-flex align-items-center gradient-custom-3">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 col-md-6 col-lg-5 col-xl-4">
            <div class="card" style="border-radius: 15px;">
              <div class="card-body p-4">
                <h2 class="text-uppercase text-center mb-4">Create an account</h2>

                <form @submit.prevent="register">

                  <div class="form-outline mb-3">
                    <input v-model="username" type="text" id="form3Example1cg" class="form-control form-control-sm" placeholder="Username" required />
                  </div>

                  <div class="form-outline mb-3">
                    <input v-model="fullname" type="text" id="form3Example2cg" class="form-control form-control-sm" placeholder="Full Name" required />
                  </div>

                  <div class="form-outline mb-3">
                    <input v-model.number="age" type="number" id="form3Example3cg" class="form-control form-control-sm" placeholder="Age" required />
                  </div>

                  <div class="form-outline mb-3">
                    <input v-model="phone" type="text" id="form3Example4cg" class="form-control form-control-sm" placeholder="Phone Number" required />
                  </div>

                  <div class="form-outline mb-3">
                    <input v-model="password" type="password" id="form3Example5cg" class="form-control form-control-sm" placeholder="Password" required />
                  </div>

                  <div class="form-outline mb-3">
                    <input v-model="repeatPassword" type="password" id="form3Example6cdg" class="form-control form-control-sm" placeholder="Repeat Password" required />
                  </div>

                  <div class="form-outline mb-3">
                    <input @change="onFileChange" type="file" id="form3Example7cdg" class="form-control form-control-sm" />
                  </div>

                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-success btn-block btn-sm gradient-custom-4 text-body no-underline">Register</button>
                  </div>

                  <p class="text-center text-muted mt-3 mb-0">Already have an account? <a @click.prevent="redirectToLogin" href="#!" class="fw-bold text-body"><u>Login here</u></a></p>

                </form>

                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
                <div v-if="success" class="alert alert-success mt-3">
                  {{ success }} <a @click.prevent="redirectToLogin" href="#" class="alert-link">Login here</a>.
                </div>

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
      username: '',
      fullname: '',
      age: '',
      phone: '',
      password: '',
      repeatPassword: '',
      avatar: null,
    };
  },
  computed: {
    ...mapGetters(['error', 'success']),
  },
  methods: {
    ...mapActions(['register', 'clearMessages']),
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Check file size
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
          this.$store.commit('SET_ERROR', 'choose file lower than 2MB.');
          return;
        }
        // Check file type (optional)
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          this.$store.commit('SET_ERROR', 'Only PNG or JPG');
          return;
        }
        this.avatar = file;
      }
    },
    async register() {
      this.clearMessages();

      // Validate password
      if (this.password !== this.repeatPassword) {
        this.$store.commit('SET_ERROR', 'Password not match!');
        return;
      }


    // Validate age
    const ageNumber = Number(this.age);
    if (isNaN(ageNumber) || ageNumber <= 16) {
      this.$store.commit('SET_ERROR', 'Invalid age! age > 16!');
      return;
    }

      try {
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('fullname', this.fullname);
        formData.append('age', ageNumber);
        formData.append('phoneNumber', this.phone); 
        formData.append('password', this.password);
        if (this.avatar) {
          formData.append('avatar', this.avatar);
        }

        for (let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
      }
      await this.$store.dispatch('register', formData);
      } catch (error) {
        this.$store.commit('SET_ERROR', error.message || 'Register Error');
      }
    },
    redirectToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
body {
  background-color: #0080ff;
}

.gradient-custom-3 {
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));
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
