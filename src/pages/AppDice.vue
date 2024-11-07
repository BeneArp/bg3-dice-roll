<script>
import { store } from '../store';

    export default{
        name: "AppAbout",
        data(){
            return{
                
            }
        },

        components:{
            

        }
    }

</script>

<template>

    <div class="wrapper">

        <div class="dice-container base-container">

            <div class="dice-container overlay-container">

            </div>

        </div>

        <!-- sfondo dado -->
        <!-- <div class="sfondo sfondo-1"></div>

        <div class="sfondo sfondo-2">
            
            <div id="livello-difficolta">
                <h2>CLASSE</h2>
                <h2>DIFFICOLTÀ</h2>
                <h2 id="numero-pc"></h2>
            </div>    

            
            <div id="dado" onclick="fadeIn()">

                <h2 id="numero-utente"></h2>


                <img src="/img/209px-Scuffed_Metal_die.png" alt="">

            </div>

            <h2 id="esito"></h2>
            <h2 id="critico"></h2>

            <h3 id="clicca">Clicca <strong>sul dado per tirare</strong></h3>

        </div> -->

    </div>  

</template>

<style lang="scss" scoped>
   
   .wrapper{
        width: 100%;
        height: 950px;
        background-color: white;
        padding: 1em 0;

        .dice-container{
            margin: 0 auto;
            background: linear-gradient(-210deg, rgba(2,0,36,1) 0%, rgba(51,34,47,1));
            border-radius: 100px;
        }

        .base-container{
            width: 35%;
            height: 800px;
            border: 4px solid rgb(151 109 60);
            position: relative;
        }

        .overlay-container{
            width: 140%;
            height: 600px;
            border-left: 4px solid rgb(151 109 60);
            border-right: 4px solid rgb(151 109 60);
            position: absolute;
            left: -90%;
            top: 50%;
            transform: translate(50%, -50%);
        }
    }

    // .sfondo{
    //     margin: 5em auto;
    //     background: linear-gradient(-210deg, rgba(2,0,36,1) 0%, rgba(51,34,47,1));
    //     border-radius: 100px;
    // }

    // .sfondo-1{
    //     width: 800px;
    //     height: 800px;
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     border: 4px solid rgb(151 109 60);
    // }

    // .sfondo-2{
    //     position: absolute;
    //     left: 50%;
    //     transform: translate(-50%);
    //     width: 600px;
    //     height: 1100px;
    //     border-radius: 250px;
    //     border-top: 4px solid rgb(151 109 60);
    //     border-bottom: 4px solid rgb(151 109 60);
    //     text-align: center;
    // }


    // /* formattazione dado */
    // #dado{
    //     width: 90%;
    //     height: 49%;
    //     margin: 0 auto;
    //     position: relative;
    //     /* text-align: center;
    //     perspective: 1000px; */
    //}

</style>