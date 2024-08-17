<template>
  <div class="homepage">
    <div class="container text-center mt-0">
    <h1 class="display-4">TKD Shop</h1>
    <p class="lead">
      Welcome to our bookstore! Discover a world of literature with our curated selection of books.
      From bestsellers to hidden gems, find your next great read with ease.
    </p>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&display=swap');

.homepage {
  height: 100vh; 
  background-image: url('https://static.vecteezy.com/system/resources/thumbnails/013/651/331/small_2x/graphic-design-illustration-of-a-stack-of-encyclopedia-books-background-with-blank-area-free-vector.jpg');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
}

.container {
  max-width: 100%;
  margin-top: 90px;
}

.display-4 {
  padding-top: 20vh;
  font-family: 'Lora', serif;
  font-weight: 700; 
}

.lead {
  font-family: 'Lora', serif;
  font-weight: 400; 
  font-size: 1.25rem; 
}
</style>
