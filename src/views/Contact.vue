<template>
    <section class="vh-100" style="background-color: #f4f5f7;">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-8 mb-4 mb-lg-0"> <!-- Increased container size -->
            <div class="card mb-3" style="border-radius: .5rem;">
              <div class="row g-0">
                <!-- Header Section -->
                <div class="col-md-4 pt-3 gradient-custom text-center text-white" style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                  <div class="avatar-container">
                    <!-- QR code as a larger square image -->
                    <img :src="zaloQRCode" alt="QR Code" class="img-fluid" />
                  </div>
                  <h5 class="pt-5">{{ companyName }}</h5>
                </div>
                <!-- Contact Information Section -->
                <div class="col-md-8">
                  <div class="card-body p-4">
                    <h2>Contact Information</h2>
                    <hr class="mt-0 mb-4">
                    <div class="row pt-1">
                      <div class="col-6 mb-3">
                        <h6>Hotline</h6>
                        <p class="text-muted">{{ hotline }}</p>
                      </div>
                      <div class="col-6 mb-3">
                        <h6>Address</h6>
                        <p class="text-muted">{{ address }}</p>
                      </div>
                      <div class="col-6 mb-3">
                        <h6>Follow Us</h6>
                        <div class="social-media">
                          <a :href="facebookUrl" target="_blank" class="social-icon">
                            <i class="fab fa-facebook fa-2x"></i>
                          </a>
                          <a :href="emailUrl" target="_blank" class="social-icon">
                            <i class="fas fa-envelope fa-2x"></i>
                          </a>
                        </div>
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
  export default {
    name: 'ContactPage',
    data() {
      return {
        companyName: 'TKD Book Store',
        hotline: '1900 0091',
        address: 'The Dome, Henry Tudor Court, Avery Hill Road, SE9 2UG',
        facebookUrl: 'https://www.facebook.com/duong.trankhanh.982/',
        emailUrl: 'mailto: mail.google.com',
        zaloQRCode: 'https://server-xwi5.onrender.com/uploads/z5729553862710_d09fe491c7e9d4484a7951004cfa5409.jpg',
        error: null
      };
    }
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
    width: 170px; 
    height: 200px; 
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0; 
    overflow: hidden;
    margin: auto;
    background-color: #fff;
  }
  .avatar-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .alert {
    margin-top: 20px;
  }
  .social-media {
    display: flex;
    gap: 15px;
  }
  .social-icon {
    text-decoration: none;
  }
  .social-icon i {
    color: #3b5998; /* Facebook color */
  }
  .social-icon i.fas.fa-envelope {
    color: #000; /* Email icon color */
  }
  </style>
  