<script>
import {store} from '../store';

export default {
    name: 'AppMatchHistory',

    data(){
      return{
          rounds: JSON.parse(localStorage.getItem('rounds')),
          loading: true,
      }
      
    },

    methods:{
          
        },

      mounted(){
          setTimeout(() => this.loading = false, 1000);
          console.log(this.rounds);            
      }
}

</script>


<template>

    <div class="loader-container" v-if="this.loading">
      <span class="loader"></span>
    </div>

    <div v-else class="mt-12 pt-2">
      <h1 class="mb-8 mx-auto w-fit">Storico partite</h1>

      <div class="rounded-lg w-full main-container p-5">

        <div class="grid grid-cols-7 items-center text-center text-xl p-2 pb-4 border-b-2 border-amber-200">
          <div>Classe</div>
          <div>Nome</div>
          <div>Statistica</div>
          <div>Difficoltà classe</div>
          <div>Risultato dado</div>
          <div>Bonus classe</div>
          <div>Risultato</div>
        </div>

        <div class="grid grid-cols-7 items-center text-center text-xl p-2 border-bottom" v-for="round in this.rounds">
          <div cla>
            <img :src="round.classImg" :alt="round.className">
          </div>
          

          <span>{{ round.className }}</span>
          <span>{{ round.stat }}</span>
          <span>{{ round.pcNumber }}</span>
          <span :class="round.result === 'FALLIMENTO' || round.result === 'FALLIMENTO CRITICO' ? 'text-red-600' : '' ">{{ round.userNumber }}</span>
          <span :class="round.result === 'SUCCESSO CRITICO' || round.result === 'FALLIMENTO CRITICO' ? 'line-through' : '' ">{{ round.userBonus }}</span>
          <span :class="round.result === 'FALLIMENTO' || round.result === 'FALLIMENTO CRITICO' ? 'text-red-600' : '' ">{{ round.result }}</span>
        </div>
        <!-- <Class :classes="classes"></Class> -->

        <!-- <router-link :to="{name:'stats'}" v-for="item in this.classes" class="logo" @click="$emit('chooseClass')">

          <div @click="this.getUserClass(item)">

              <img :src="item.logo" :alt="item.name" class="mx-auto">

              <div class="hidden info">
                  <h5 class="font-bold mx-auto mt-2 mb-2 text-2xl"> {{ item.name }} </h5>
                  <p>{{ item.description }}</p>
                  <div class="grid grid-cols-6">

                    <span class="font-bold" v-for="stat in item.stats">
                        <div class="mt-3 text-yellow-200">
                            {{ stat.lable }}
                        </div>
                        <div class="mb-3">
                            {{ stat.value }}
                        </div>
                    </span>

                  </div>
              </div>
          </div>

        </router-link> -->

      </div>
    </div>

  
  </template>


<style scoped lang="scss">
 .main-container{
    background: rgb(24,20,14);
    background: radial-gradient(circle, rgba(24,20,14,0.8) 0%, rgba(7,7,4,0.8) 100%);
    border-top: 2px solid rgb(219 194 146);
    border-bottom: 2px solid rgb(219 194 146);

    .logo{
        position: relative;

        img{
            width: 90%;
            transition: scale 0.8s;
            cursor: pointer;

            &:hover{
                scale: 1.2;
            }
        }

        .info{
            background: rgb(24,20,14);
            background: radial-gradient(circle, rgba(24,20,14,1) 0%, rgba(7,7,4,1) 100%);
            border: 2px solid rgb(219 194 146);
            border-radius: 8px;
            padding: 0.5em 2em;
            z-index: 50;
            width: 400px;
            text-align: center;
            cursor: default;
        }

        &:hover .info{
            position: absolute;
            bottom: 50%;
            left: -100%;
            transform: translate(-30%, 50%);
            display: block;
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

