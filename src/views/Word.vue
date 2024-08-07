<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Word List</h1>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="(word, i) in words" :key="i">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ word.english }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ word.german }}</h6>
              <div class="btn-group">
                <button class="btn btn-primary" @click="showWord(word)">Show</button>
                <button class="btn btn-warning" @click="editWord(word)">Edit</button>
                <button class="btn btn-danger" @click="deleteWord(word)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ViewAllVocabs, DeleteVocab } from '../helper/api';
  
  export default {
    name: 'Word',
    data() {
      return {
        words: []
      };
    },
    async mounted() {
      this.words = await ViewAllVocabs();
    },
    methods: {
      async showWord(word) {
        // Xử lý việc hiển thị thông tin từ thẻ
        console.log('Show word:', word);
      },
      async editWord(word) {
        // Xử lý việc chỉnh sửa từ thẻ
        console.log('Edit word:', word);
      },
      async deleteWord(word) {
        // Xử lý việc xóa từ thẻ
        await DeleteVocab(word.id);
        this.words = this.words.filter(w => w.id !== word.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-group .btn {
    flex: 1;
    margin: 0 0.5rem;
  }
  </style>
  