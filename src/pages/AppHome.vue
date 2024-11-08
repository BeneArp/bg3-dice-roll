<script>
import {store} from '../store';
import Class from '../components/Class.vue'

export default {
    name: 'AppHome',
    components: {
        Class
    },

    data(){
      return{
          classes: store.classes,
          loading: true,
      }
      
    },

    methods:{
          getUserClass(item){
              this.userClass = item;
              store.userClass = this.userClass;
              console.log(store.userClass);
              
          }
          
        },

      mounted(){
          this.classes = store.classes;
          setTimeout(() => this.loading = false, 1000);
          //console.log(this.classes);            
      }
}

</script>


<template>

    <div class="loader-container" v-if="this.loading">
      <span class="loader"></span>
    </div>

    <div v-else>
      <h1 class="mb-8 mx-auto w-fit">Scegli una classe</h1>

      <div class="rounded-lg w-full main-container p-5 grid grid-cols-4 items-stretch gap-8">
        <!-- <Class :classes="classes"></Class> -->

        <router-link :to="{name:'stats'}" v-for="item in this.classes" class="logo">

          <div @click="this.getUserClass(item)">

              <img :src="item.logo" :alt="item.name" class="mx-auto">

              <div class="hidden info">
                  <h5 class="font-bold mx-auto mt-2 mb-2 text-2xl"> {{ item.name }} </h5>
                  <p>{{ item.description }}</p>
                  <div class="grid grid-cols-6">

                      <span class="font-bold">
                          <div class="mt-3 text-yellow-200">
                              FOR
                          </div>
                          <div class="mb-3">
                              {{ item.stats.forza }}
                          </div>
                      </span>

                      <span class="font-bold">
                          <div class="mt-3 text-yellow-200">
                              DES
                          </div>
                          <div class="mb-3">
                              {{ item.stats.destrezza }}
                          </div>
                      </span>

                      <span class="font-bold">
                          <div class="mt-3 text-yellow-200">
                              COS
                          </div>
                          <div class="mb-3">
                              {{ item.stats.costituzione }}
                          </div>
                      </span>

                      <span class="font-bold">
                          <div class="mt-3 text-yellow-200">
                              INT
                          </div>
                          <div class="mb-3">
                              {{ item.stats.intelligenza }}
                          </div>
                      </span>

                      <span class="font-bold">
                          <div class="mt-3 text-yellow-200">
                              SAG
                          </div>
                          <div class="mb-3">
                              {{ item.stats.saggezza }}
                          </div>
                      </span>

                      <span class="font-bold">
                          <div class="mt-3 text-yellow-200">
                              CAR
                          </div>
                          <div class="mb-3">
                              {{ item.stats.carisma }}
                          </div>
                      </span>

                  </div>
              </div>
          </div>

        </router-link>

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

