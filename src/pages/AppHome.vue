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
        }
        
    }
}

</script>


<template>

    <div class="rounded-lg w-full main-container p-5 grid grid-cols-4 items-stretch gap-8">
      <Class :classes="classes"></Class>
    </div>
  
  </template>


<style scoped lang="scss">
 .main-container{
    background: rgb(24,20,14);
    background: radial-gradient(circle, rgba(24,20,14,1) 0%, rgba(7,7,4,1) 100%);
    border-top: 2px solid rgb(219 194 146);
    border-bottom: 2px solid rgb(219 194 146);
  }
</style>

