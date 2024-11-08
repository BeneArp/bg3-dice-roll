<script>
import { store } from '../store';
   
    export default{
        name: "AppStats",

        data(){
            return{
                stats: ['Forza', 'Destrezza', 'Costituzione', 'Intelligenza', 'Saggezza', 'Carisma'],
                userStat: '',
                loading: true,
            }
        },  

        components:{
           
        },

        methods:{
            getUserStat(stat){
                this.userStat = stat;
                store.userStat = this.userStat;
                console.log(store.userStat);
            },

            randomStat(){
                this.userStat = this.stats[(Math.floor(Math.random() * this.stats.length))];
                store.userStat = this.userStat;
                console.log(store.userStat);
            }
        },

        mounted(){
            console.log(store.userClass);
            setTimeout(() => this.loading = false, 1000);
            
        }
    }

</script>

<template>

    <div class="loader-container" v-if="this.loading">
      <span class="loader"></span>
    </div>

    <div v-else>
        <h1 class="mb-8 mx-auto w-fit">Scegli la statisica su cui effettuare il tiro</h1>

        <div class="rounded-lg w-full main-container p-5 pt-10 pb-10  items-stretch gap-8 text-center">
        
            <router-link :to="{name:'roll'}" class="grid grid-cols-3">
                <h2 class="font-bold text-3xl" v-for="stat in this.stats" @click="this.getUserStat(stat)">{{ stat }}</h2>
            </router-link>
            
            <router-link :to="{name:'roll'}">
                <h2 class="font-bold text-3xl" @click="this.randomStat">Casuale</h2>
            </router-link>
            
        </div>
    </div>


</template>


<style lang="scss" scoped>
 .main-container{
    background: rgb(24,20,14);
    background: radial-gradient(circle, rgba(24,20,14,0.8) 0%, rgba(7,7,4,0.8) 100%);
    border-top: 2px solid rgb(219 194 146);
    border-bottom: 2px solid rgb(219 194 146);

    h2{
        cursor: pointer;
        margin: 3em 0;
        transition: all 0.8s;

        &:hover{
            color: rgb(219 194 146);
        }
    }
  }

  .loader-container{
    width: 100%;
    height: 70vh;
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