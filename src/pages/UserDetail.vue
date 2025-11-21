<template>
  <Container>

    <!-- Page Title -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold mb-4">User Detail</h1>
      <button @click="$router.back()" class="mb-8 mt-5 bg-blue-600 p-2 px-4 rounded text-white">
        Back
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-xl text-gray-500 mb-4">
      Loading user detail...
    </div>

    <!-- User Card -->
    <div v-if="user" class="max-w-md p-4 rounded-lg shadow-lg mx-auto mt-3">

      <!-- Avatar -->
      <div class="flex justify-center mb-4">
        <img :src="user.avatar_url" class="w-32 h-32 rounded-full border" alt="Avatar">
      </div>

      <!-- Name -->
      <h2 class="text-xl font-bold text-center mb-1">
        {{ user.name || 'No full name provided' }}
      </h2>

      <!-- Username -->
      <p class="text-center text-gray-600 mb-3">
        @{{ user.login }}
      </p>

      <!-- Bio -->
      <p class="text-gray-700 mb-4">
        {{ user.bio || 'No bio available' }}
      </p>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="p-2 shadow rounded">
          <p class="font-bold">{{ user.followers }}</p>
          <p class="text-sm text-gray-600">Followers</p>
        </div>

        <div class="p-2 shadow rounded">
          <p class="font-bold">{{ user.following }}</p>
          <p class="text-sm text-gray-600">Following</p>
        </div>

        <div class="p-2 shadow rounded">
          <p class="font-bold">{{ user.public_repos }}</p>
          <p class="text-sm text-gray-600">Repos</p>
        </div>
      </div>

      <!-- GitHub button -->
      <div class="text-center mt-4">
        <a
          :href="user.html_url"
          target="_blank"
          class="inline-flex items-center gap-2 px-4 py-2 border rounded-lg font-semibold
                 border-gray-300 bg-white hover:bg-gray-100 transition"
        >
          <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.58.1.8-.25.8-.56v-1.98c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.38.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.12-.12-.29-.52-1.47.12-3.05 0 0 .97-.3 3.18 1.2a10.9 10.9 0 0 1 5.8 0c2.2-1.5 3.17-1.2 3.17-1.2.65 1.58.25 2.76.12 3.05.75.82 1.2 1.86 1.2 3.12 0 4.44-2.7 5.4-5.26 5.67.42.36.8 1.1.8 2.23v3.3c0 .3.2.66.8.55A10.98 10.98 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
              clip-rule="evenodd"
            />
          </svg>

          View on GitHub
        </a>
      </div>
    </div>

    <!-- Repo List -->
    <div v-if="repos.length" class="max-w-2xl mx-auto mt-8">
      <h2 class="text-xl font-bold mb-4">Repositories</h2>

      <div v-for="repo in repos" :key="repo.id"
           class="p-4 mb-3 shadow rounded-lg bg-white">

        <h3 class="text-lg font-semibold mb-1">
          {{ repo.name }}
        </h3>


        <div class="flex items-center justify-between gap-3 mb-2">
          <p class="text-gray-700 mb-2">
            {{ repo.description?.slice(0, 60) }}{{ repo.description?.length > 60 ? '...' : '' }}
          </p>
          <span class="text-yellow-500 font-bold">⭐ {{ repo.stargazers_count }}</span>
        </div>

        <a
          :href="repo.html_url"
          target="_blank"
          class="p-2 px-4 bg-blue-500 text-white rounded mt-2 inline-block"
        >
          Open Repository
        </a>
      </div>
    </div>

  </Container>
</template>

<script>
import Container from '@/components/Container.vue'
import axios from 'axios'

// API
const User_API = 'https://api.github.com/users/{username}'
const Repo_API = 'https://api.github.com/users/{username}/repos'

export default {
  components: { Container },

  data() {
    return {
      loading: false,
      user: null,
      repos: [] // store user repositories
    }
  },

  methods: {
    // Fetch user detail
    async fetchUserDetail(username) {
      try {
        this.loading = true
        const url = User_API.replace('{username}', username)
        const response = await axios.get(url)

        this.user = response.data
        this.loading = false
      } catch (err) {
        console.error("Error fetching detail:", err)
        this.loading = false
      }
    },

    // Fetch repositories
    async fetchUserRepos(username) {
      try {
        const url = Repo_API.replace('{username}', username)
        const response = await axios.get(url)

        this.repos = response.data
      } catch (err) {
        console.error("Error fetching repos:", err)
      }
    }
  },

  mounted() {
    const username = this.$route.params.id || 'octocat'
    this.fetchUserDetail(username)
    this.fetchUserRepos(username) // fetch repos too
  }
}
</script>
