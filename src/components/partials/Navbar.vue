<script>
    //import {store} from '../../store';

    export default{
        name: 'Navbar',

        // props:{
        //     class:Object
        // },
        
        data(){
            return{
                userClass: '',
            }
        },

        mounted(){
            this.userClass = JSON.parse(localStorage.getItem('userClass'))
            
        }
    }

</script>

<template>

    <header>
        <ul>
            <li>
                <router-link :to="{name:'home'}">Classi</router-link>
            </li>
            <li>
                <router-link :to="{name:'stats'}">Statistiche</router-link>
            </li>
            <li>
                <router-link :to="{name:home}">Storico</router-link>
            </li>
            <li v-if="this.userClass !== ''">
                <div class="class-pic">
                    <img :src="this.userClass.logo" :alt="this.userClass.name">

                    <div class="hidden info">

                        <h5 class="font-bold mx-auto mt-2 mb-2 text-2xl"> {{ this.userClass.name }} </h5>
                        <p>{{ this.userClass.description }}</p>

                        <div class="grid grid-cols-6">

                            <span class="font-bold" v-for="stat in this.userClass.stats">
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
            </li>
        </ul>
    </header>

</template>

<style lang="scss" scoped>

    header{
        background: rgb(24,20,14);
        background: radial-gradient(circle, rgba(24,20,14,1) 0%, rgba(7,7,4,1) 100%);
        border-bottom: 2px solid rgb(219 194 146);
        padding: 1em;
        width: 100%;

        ul{
            margin: 0 auto;
            width: fit-content;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 3em;

            li{
                transition: all 0.5s;

                    &:hover{
                    color: rgb(219 194 146);
                }

                .class-pic{
                    background-color: rgba(51,34,47,0.5);
                    border: 1px solid rgba(219, 194, 146, 0.3);
                    padding: 0.2em;
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                    position: relative;

                    // .hidden{
                    //     display: none;
                    // }

                    .info{
                        background: rgb(24,20,14);
                        background: radial-gradient(circle, rgba(24,20,14,1) 0%, rgba(7,7,4,1) 100%);
                        border: 2px solid rgb(219 194 146);
                        border-radius: 8px;
                        padding: 0.5em 2em;
                        z-index: 50;
                        min-width: 350px;
                        text-align: center;
                        cursor: default;
                    }

                    &:hover .info{
                        position: absolute;
                        top: 150%;
                        left: -50%;
                        transform: translate(-35%, 0%);
                        display: block;
                    }
                }
            }

        }
    }

</style>