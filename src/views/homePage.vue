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
  height: 100vh; /* Chiều cao toàn màn hình */
  background-image: url('https://static.vecteezy.com/system/resources/thumbnails/013/651/331/small_2x/graphic-design-illustration-of-a-stack-of-encyclopedia-books-background-with-blank-area-free-vector.jpg');
  background-size: cover; /* Điều chỉnh hình nền để phủ toàn bộ trang */
  background-position: center; /* Căn giữa hình nền */
  background-repeat: no-repeat; /* Không lặp lại hình nền */
}

.container {
  max-width: 100%;
  margin-top: 90px;
}

.display-4 {
  padding-top: 20vh;
  font-family: 'Lora', serif;
  font-weight: 700; /* In đậm */
}

.lead {
  font-family: 'Lora', serif;
  font-weight: 400; /* Thông thường, có thể điều chỉnh theo ý muốn */
  font-size: 1.25rem; /* Kích thước chữ */
}
</style>
