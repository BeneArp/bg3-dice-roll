<script>
    import {store} from '../../store';

    export default{
        name: 'Navbar',
        
        data(){
            return{
                userClass: store.userClass
            }
        },

        mounted(){
            console.log(this.userClass);
            
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
            <li>
                <div class="class-pic">
                    <img :src="this.userClass.logo" :alt="this.userClass.name">

                    
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
                    border: 1px solid rgba(51,34,47,0.5);
                    padding: 0.2em;
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                }
            }

        }
    }

</style>