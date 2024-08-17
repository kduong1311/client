<template>
  <div class="container mt-3">
    <h1 class="text-center mb-4">Product Details</h1>
    <div v-if="product" class="detail-container">
      <div class="image-section">
        <img :src="getImageUrl(product.image)" alt="Product Image" class="product-image">
      </div>
      <div class="info-section">
        <h5 class="product-name">{{ product.name }}</h5>
        <h5 class="product-price">Price: ${{ product.price }}</h5>
        <p class="product-description">Description: {{ product.description }}</p>
        <div class="button-group">
          <router-link v-if="isAdmin" :to="{ path: `/products/edit/${product._id}` }" class="btn btn-warning">Edit</router-link>
          <button v-if="isAdmin" class="btn btn-danger" @click="deleteProduct(product._id)">Delete</button>
          <router-link :to="getBackToListPath" class="btn btn-secondary">Back to List</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null
    };
  },
  computed: {
    ...mapGetters(['products', 'role']), // Assuming you have a getter for the user's role
    isAdmin() {
      return this.role === 'admin'; // Replace with the appropriate role check
    },
    getBackToListPath() {
      return this.isAdmin ? '/product/manage' : '/products';
    }
  },
  async mounted() { 
    const productId = this.$route.params.id;
    await this.$store.dispatch('fetchProductById', productId);
    this.product = this.$store.getters.product;
  },
  methods: {
    ...mapActions(['deleteProduct']),
    getImageUrl(image) {
      return `http://localhost:5000/${image}`; // Adjust based on your setup
    },
    async deleteProduct(productId) {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (confirmDelete) {
        try {
          await this.$store.dispatch('deleteProduct', productId);
          this.$router.push(this.getBackToListPath);
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    }
  }
}
</script>

<style scoped>
.detail-container {
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.image-section {
  flex: 0 0 300px;
  padding: 10px;
}

.product-image {
  width: 200px;
  height: auto;
  border-radius: 8px;
}

.info-section {
  flex: 1;
  padding: 10px;
}

.product-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.25rem;
  color: red;
  margin-bottom: 1rem;
}

.product-description {
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 10px;
}

.button-group .btn {
  margin: 0;
}
</style>
