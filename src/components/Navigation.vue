<template>
  <div class="bg-gray-100">

    <main class="p-6 max-w-5xl mx-auto  ">
      <nav class="flex justify-between items-center">
        <div >
          <h1>Mini Github</h1>
        </div>
        <div>
          <ul class="flex items-center justify-center gap-4 ">

            <li>
              <router-link to="" class="router-link">User</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  </div>
</template>
<style scoped>
    a {
  position: relative;
  margin: 0 10px;
  text-decoration: none;
  color: black;
  padding-bottom: 4px; /* space for the border */
}

/* underline effect only when active */
a.router-link-active {
  border-bottom: 2px solid red;
}

</style>
