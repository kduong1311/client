<template>
    <div class="form-white input-group" style="width: 250px;">
      <input
        type="search"
        v-model="query"
        @keyup.enter="handleSearch"
        class="form-control rounded"
        placeholder="Search here..."
        aria-label="Search"
        aria-describedby="search-addon"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: ''
      };
    },
    methods: {
      handleSearch() {
        this.$emit('search', this.query);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  