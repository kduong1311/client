<template>
  <div class="container mt-5 mb-5">
    <div class="form-container">
      <h1 class="text-center mb-4">Edit Product</h1>
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
            rows="3"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="image">Product Image</label>
          <input
            type="file"
            id="image"
            @change="handleFileChange"
            class="form-control"
          />
        </div>
        <div class="text-center mt-2">
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'EditProduct',
  data() {
    return {
      product: {
        name: '',
        price: '',
        description: '',
        image: null
      }
    };
  },
  async mounted() {
    const productId = this.$route.params.id;
    await this.$store.dispatch('fetchProductById', productId);
    this.product = { ...this.$store.getters.product };
  },
  methods: {
    ...mapActions(['updateProduct']),
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.product.image = file;
      }
    },
    async submitForm() {
      const productId = this.$route.params.id;
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('description', this.product.description);
      if (this.product.image) {
        formData.append('image', this.product.image);
      }
      try {
        await this.updateProduct({ id: productId, product: formData });
        this.$router.push('/product/manage');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px; /* Adjust width as needed */
  margin: 0 auto; /* Center the container */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  margin-bottom: 0.5rem;
}

.btn-primary {
  width: 100%;
}
</style>
