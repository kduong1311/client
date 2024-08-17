<template>
  <div class="container mt-3">
    <div class="banner mb-3">
      <img src="https://server-xwi5.onrender.com/uploads/Screenshot 2024-08-10 002838.png" alt="Banner" class="img-fluid">
    </div>
    <div class="buttonnew d-flex justify-content-between mb-3">
      <router-link to="/products/new" class="btn btn-primary">Add New Product</router-link>

      <!-- Mục lọc category -->
      <div class="sort-select me-3">
        <select v-model="categorySelect" class="form-select">
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
    
    <div class="product-table">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in filteredProductsByCat" :key="product._id">
            <td>{{ truncatedName(product.name) }}</td>
            <td>${{ product.price }}</td>
            <td>{{ truncatedDescription(product.description) }}</td>
            <td>{{ product.category }}</td>
            <td><img :src="getImageUrl(product.image)" alt="Product Image" class="table-img"></td>
            <td>
              <button 
                class="btn btn-info"
                @click="handleRowClick(product._id)"
                :disabled="!isAuthenticated"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ManageProduct', 
  data() {
    return {
      selectedSortOrder: '', // Variable for sort order
      categorySelect: '', // Variable for selected category
      categories: ['IT', 'economic', 'comic'] // List of categories
    };
  },
  computed: {
    ...mapGetters(['filteredProducts', 'isAuthenticated']),
    filteredProductsByCat() {
      // Filter products based on selected category
      if (this.categorySelect == "") {
        return this.filteredProducts;
      }
      return this.filteredProducts.filter(product => product.category.includes(this.categorySelect));
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
      return description.length > 50 ? description.substring(0, 50) + '...' : description;
    },
    truncatedName(name) {
      return name.length > 40 ? name.substring(0, 40) + '...' : name;
    },
    handleRowClick(productId) {
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
  max-height: calc(100vh - 100px);
}

.banner {
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
}

.table-img {
  width: 100px;
  height: auto;
}

.table td,
.table th {
  vertical-align: middle;
}

.btn-info {
  cursor: pointer;
}
</style>
