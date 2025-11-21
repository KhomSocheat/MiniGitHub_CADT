<template>
  <Container>
    <div class="flex items-center justify-between mb-4">
      <h1>User Page</h1>
      <div class="flex items-center justify-center gap-2">
        <h1>Show: </h1>
        <select class="p-1 rounded bg-blue-500 text-white px-3" v-model="selectedNumber" @change="fetchUsers(selectedNumber)">
          <option value="10" >10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
    <div>
      <div v-if="loading" class="text-xl text-gray-500 mb-3">Loading...</div>
       <div v-for="user in users"
     :key="user.id"
     class="p-5 my-3 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all">

    <!-- Loading -->

    <!-- Card Header -->
    <div class="flex items-center gap-4">
      <!-- Avatar -->
      <img :src="user.avatar_url"
           alt="User Avatar"
           class="w-16 h-16 rounded-full border shadow-sm" />

      <!-- User Info -->
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ user.login }}</h2>
        <!-- <p class="text-sm text-gray-500"><strong>Type:</strong> {{ user.type }}</p> -->
      </div>
    </div>

    <!-- Profile Link -->
    <div class="mt-3">
      <button class="text-blue-600 font-medium underline hover:text-blue-800" @click="navigateToUserDetail(user.login)">
         View GitHub Profile →
    </button>
    </div>
</div>

    </div>

  </Container>
</template>
<script>
import Container from '@/components/Container.vue'
import axios from 'axios';
const User_API = 'https://api.github.com/users?since=0&per_page={number}';



export default {
  components: {
    Container
  },
  data(){
    return{
        loading: false,
        users : [],
        selectedNumber: 10
    }
  },
  methods:{
    async fetchUsers(number){
        try{
            this.loading = true;
            const url = User_API.replace('{number}', number);
            const response = await axios.get(url);
            this.users = response.data;
            console.log(this.users);
            this.loading = false;
        }catch(error){
            console.error('Error fetching users:', error);
            this.loading = false;
        }
    },
    navigateToUserDetail(id){
      this.$router.push({ name: 'UserDetail', params: { id: id } });
    }
  },
  mounted(){
    this.fetchUsers(this.selectedNumber);
  }
}
</script>
