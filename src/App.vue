<script>

import Navbar from './components/partials/Navbar.vue';

export default{
    name: 'App',
    components:{
      Navbar,
    },

}

</script>

<template>

    <Navbar></Navbar>

    <div class="container">
        <router-view></router-view>
    </div>
    

</template>

<style lang="scss">

    .container{
        max-width: 1280px;
        margin: 6em auto;
    }
  
</style>
