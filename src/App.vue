<script>
//import {store} from './store';
import Navbar from './components/partials/Navbar.vue';

export default{
    name: 'App',
    components:{
      Navbar,
    },

    // data(){
    //     return{
    //         class: store.userClass,
    //     }
    // }

    methods:{
        reload(){
            window.location.href = "http://localhost:5173/stats"
        }
    }

}

</script>

<template>

    <Navbar></Navbar>

    <!-- <div class="loader-container">
        <span class="loader"></span>
    </div> -->


    <div class="container">
        <router-view @chooseClass="reload()"></router-view>
    </div>
    

</template>

<style lang="scss">

    .container{
        max-width: 1280px;
        margin: 2em auto;
    }
    
</style>
