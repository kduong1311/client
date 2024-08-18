<template>
  <div class="container mt-3">
    <div class="banner mb-3">
      <img src="https://server-xwi5.onrender.com/uploads/Screenshot 2024-08-10 002838.png" alt="Banner" class="img-fluid">
    </div>
    <div class="buttonnew d-flex justify-content-between mb-3">

      <div class="sort-select">
        <select v-model="categorySelect" class="form-select me-4">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>

      <div class="sort-select">
        <select id="sortOrder" v-model="selectedSortOrder" @change="sortProducts" class="form-select">
          <option value="">None</option>
          <option value="asc">Price Low to High</option>
          <option value="desc">Price High to Low</option>
        </select>
      </div>
    </div>
    
    <div class="product-list">
      <div class="row">
        <div class="col-md-3 mb-3" v-for="(product, i) in filteredProductsByCat" :key="product._id">
          <div
            class="card-link"
            @click="handleCardClick(product._id)"
            :class="{ 'card-disabled': !isAuthenticated }"
          >
            <div class="card">
              <div class="card-img-container">
                <img :src="getImageUrl(product.image)" alt="Product Image" class="card-img-top">{{getImageUrl(product.image)}}
              </div>
              <div class="card-body">
                <p class="card-title">{{ truncatedName(product.name) }}</p>
                <h5 class="card-subtitle mb-2">${{ product.price }}</h5>
                <p class="card-description">{{ truncatedDescription(product.description) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Product',
  data() {
    return {
      selectedSortOrder: '',
      categorySelect: '',
      categories: ['IT', 'economic', 'comic']
    };
  },
  computed: {
    ...mapGetters(['filteredProducts', 'isAuthenticated']),
    filteredProductsByCat() {
      if (this.categorySelect == "") {
        return this.filteredProducts;
      }
      return this.filteredProducts.filter(product => product.category === this.categorySelect);
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProducts');
  },
  methods: {
    getImageUrl(image) {
      return `https://server-xwi5.onrender.com/${image}`;
    },
    truncatedDescription(description) {
      return description.length > 20 ? description.substring(0, 20) + '...' : description;
    },
    truncatedName(name) {
      return name.length > 12 ? name.substring(0, 12) + '...' : name;
    },
    handleCardClick(productId) {
      if (this.isAuthenticated) {
        this.$router.push(`/products/${productId}`);
      } else {
        alert('You need to be logged in to view this product.');
      }
    },
    sortProducts() {
      this.$store.dispatch('setSortOrder', this.selectedSortOrder);
    }
  }
}
</script>

<style scoped>
.container {
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}

.banner {
  padding-top: 15px;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.buttonnew {
  display: flex;
  align-items: center;
}

.sort-select {
  margin-left: auto;
  width: 200px; /* Adjust width as needed */
}

.card-img-container {
  display: flex;
  justify-content: center;
  padding: 5px;
}

.card-img-top {
  width: 130px;
  height: 170px;
}

.card-body {
  padding: 0.5rem;
}

.card-description {
  color: #333;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer; /* Show a pointer cursor to indicate clickability */
}
</style>
