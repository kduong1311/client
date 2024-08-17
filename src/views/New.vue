<template>
    <div class="container mt-4 mb-4">
      <h1 class="text-center mb-4">Add New Product</h1>
      <div class="form-container">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="form-group">
            <label for="name">Product Name</label>
            <input
              type="text"
              id="name"
              v-model="product.name"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="number"
              id="price"
              v-model="product.price"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="product.description"
              class="form-control"
              required
            ></textarea>

          <div class="form-group">
          <label for="category">Category</label>
          <select
            id="category"
            v-model="product.category"
            class="form-control"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="IT">Information Technology</option>
            <option value="economic">Economic</option>
            <option value="comic">Comic</option>
          </select>
        </div>
          </div>
          <div class="form-group">
            <label for="image">Product Image</label>
            <input
              type="file"
              id="image"
              @change="handleFileChange"
              class="form-control"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Add Book</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'AddNewProduct',
    data() {
      return {
        product: {
          name: '',
          price: '',
          description: '',
          category: '',
          image: null
        }
      };
    },
    methods: {
      ...mapActions(['addProduct']),
      handleFileChange(event) {
        this.product.image = event.target.files[0];
      },
      async submitForm() {
        const formData = new FormData();
        formData.append('name', this.product.name);
        formData.append('price', this.product.price);
        formData.append('description', this.product.description);
        formData.append('category', this.product.category)
        if (this.product.image) {
          formData.append('image', this.product.image);
        }
        try {
          await this.addProduct(formData);
          this.$router.push('/product/manage');
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem; /* Giảm padding để làm cho container nhỏ hơn */
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px; /* Giảm kích thước container */
    margin: 0 auto; /* Căn giữa container */
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .btn {
    margin-top: 1rem;
  }
  </style>
  