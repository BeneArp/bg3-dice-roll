<script>
import { store } from '../store';
   
    export default{
        name: "AppStats",

        data(){
            return{
                stats: ['Forza', 'Destrezza', 'Costituzione', 'Intelligenza', 'Saggezza', 'Carisma'],
                userStat: ''
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
        }
    }

</script>

<template>

<h1 class="mb-8 mx-auto w-fit">Scegli la statisica su cui effettuare il tiro</h1>

    <div class="rounded-lg w-full main-container p-5 pt-10 pb-10 grid grid-cols-3 items-stretch gap-8 text-center">
    
        <h2 class="font-bold text-3xl" v-for="stat in this.stats" @click="this.getUserStat(stat)">{{ stat }}</h2>
        <h2 class="font-bold text-3xl col-span-3" @click="this.randomStat">Casuale</h2>

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


</style>