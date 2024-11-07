<script>
    import {store} from '../../store';

    export default{
        name: 'Navbar',
        
        data(){
            return{
                
            }
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
        </ul>
    </header>

</template>

<style lang="scss" scoped>

    header{
        background: rgb(24,20,14);
        background: radial-gradient(circle, rgba(24,20,14,1) 0%, rgba(7,7,4,1) 100%);
        border-bottom: 2px solid rgb(219 194 146);
        padding: 2em;
        width: 100%;

        ul{
            margin: 0 auto;
            width: fit-content;
            font-size: 18px;
            display: flex;
            gap: 3em;

            li{
                transition: all 0.5s;

                    &:hover{
                    color: rgb(219 194 146);
                }
            }

        }
    }

</style>