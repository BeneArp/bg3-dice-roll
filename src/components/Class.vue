<script>
import {store} from '../store';

    export default {
        name: "Class",
        
        props:{
            classes: Object
        },

        mounted(){
            this.classes = store.classes;
            console.log(this.classes);
            
            
        }
    }

</script>

<template>

    <div v-for="item in this.classes" class="logo">
        <img :src="item.logo" :alt="item.name" class="mx-auto">

        <div class="hidden info">
            <h5 class="font-bold mx-auto mb-2"> {{ item.name }} </h5>
            <p>{{ item.description }}</p>
            <div class="grid grid-cols-6">

                <span class="font-bold">
                    <div class="mt-3">
                        FOR
                    </div>
                    <div class="mb-3">
                        {{ item.stats.forza }}
                    </div>
                </span>

                <span class="font-bold">
                    <div class="mt-3">
                        DES
                    </div>
                    <div class="mb-3">
                        {{ item.stats.destrezza }}
                    </div>
                </span>

                <span class="font-bold">
                    <div class="mt-3">
                        COS
                    </div>
                    <div class="mb-3">
                        {{ item.stats.costituzione }}
                    </div>
                </span>

                <span class="font-bold">
                    <div class="mt-3">
                        INT
                    </div>
                    <div class="mb-3">
                        {{ item.stats.intelligenza }}
                    </div>
                </span>

                <span class="font-bold">
                    <div class="mt-3">
                        SAG
                    </div>
                    <div class="mb-3">
                        {{ item.stats.saggezza }}
                    </div>
                </span>

                <span class="font-bold">
                    <div class="mt-3">
                        CAR
                    </div>
                    <div class="mb-3">
                        {{ item.stats.carisma }}
                    </div>
                </span>

            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .logo{
        position: relative;

        img{
            width: 90%;

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
        }

        &:hover .info{
            position: absolute;
            bottom: 50%;
            left: -100%;
            transform: translate(-30%, 50%);
            display: block;
        }
    }

</style>