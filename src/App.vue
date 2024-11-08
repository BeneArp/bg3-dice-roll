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

    <!-- <div class="loader-container">
        <span class="loader"></span>
    </div> -->


    <div class="container">
        <router-view></router-view>
    </div>
    

</template>

<style lang="scss">

    .container{
        max-width: 1280px;
        margin: 4em auto;
    }
    
    .loader-container{

        width: 100%;
        height: 80vh;
        align-items: center;
        display: flex;

        .loader {
            // width: 48px;
            // height: 48px;
            margin: 0 auto;
            display: inline-block;
            position: relative;
        }
        .loader::after,
        .loader::before {
            content: '';  
            box-sizing: border-box;
            width: 80px;
            height: 80px;
            border: 2px solid rgba(120,116,140,1);
            position: absolute;
            left: 0;
            top: 0;
            animation: rotationBreak 3s ease-in-out infinite alternate;
        }
        .loader::after {
            border-color: rgb(219 194 146);
            animation-direction: alternate-reverse;
        }

        @keyframes rotationBreak {
            0% {
                transform: rotate(0);
            }
            25% {
                transform: rotate(90deg);
            }
            50% {
                transform: rotate(180deg);
            }
            75% {
                transform: rotate(270deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
    
</style>
