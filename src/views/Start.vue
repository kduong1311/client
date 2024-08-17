<template>
    <div class="start-page d-flex justify-content-center align-items-center">
      <div class="text-center text-white">
        <h1 class="system-name display-4 mb-4"><Strong>BOOK A TRIP FOR YOUR LIFE</Strong></h1>
        <button class="btn btn-lg btn-primary start-button" @click="goToMain">Let's Start</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Start",
    methods: {
      goToMain() {
        this.$router.push('/homepage');
      }
    }
  };
  </script>
  
  <style scoped>
  body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Arial', sans-serif;
  overflow: hidden; /* Đảm bảo không có thanh cuộn */
}

.start-page {
  width: 100%;
  height: 100vh; /* Chiếm toàn bộ chiều cao của màn hình */
  background: url('../assets/pngtree-d-illustration-of-old-library-or-bookshop-with-many-books-on-image_16124328-fotor-20240807142751\ \(1\).png') no-repeat center center;
  background-size: cover; 
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.system-name {
  animation: fadeIn 2s ease-in-out;
}

.start-button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.start-button:hover {
  background-color: #ffcc00;
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

  </style>
  