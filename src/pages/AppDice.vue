<script>
import { Logger } from 'sass';
import { store } from '../store';

    export default{
        name: "AppAbout",
        data(){
            return{
                stat: store.userStat.toUpperCase(),
                originalStat: store.userStat,
                userClass: store.userClass,
                pcNumber: '',
                userNumber: 20,
                resultNumber: 0,
                result: '',
                critic: false,
                rolling: false,
                loading: true,
                bonus: 0,
                error: '',
            }
        },

        components:{
            

        },

        methods:{
            rollDice(){
                this.pcNumber = Math.floor((Math.random() * 20) + 1);
                this.result = '';
                this.resultNumber = 0;
                this.rolling = true;
                this.userNumber = Math.floor((Math.random() * 20) + 1);
                setTimeout(() => this.rolling = false, 2000);

                // controllo che il numero dell'utente non sia un 1 o un 20
                if(this.userNumber !== 1 && this.userNumber !== 20){
                    setTimeout(() =>  this.resultNumber = this.userNumber + this.bonus, 4000);
                }else{
                    //this.bonus = 0;
                    this.resultNumber = 0;
                }

                setTimeout(() =>  this.getResult(), 4200);
            },
            getBonus(){

                if(this.userClass.stats){
                    // ciclo le statistiche della classe scelta dall'utente
                    this.userClass.stats.forEach(stat => {
                        
                        // prendo il nome della statistica che corrisponde a quella scelta dall'utente
                        if(stat.name === store.userStat){

                            //console.log(stat.name);
                            // assegno un bonus di un punto per ogni due numeri sopra il 10
                            if(stat.value >= 12){
                                // arrotondo il bonus per difetto
                                this.bonus = Math.floor((stat.value - 10)/2);
                                //console.log(this.bonus);

                            // se il valore della statistica è minore di 10 assegno un malus con la stessa logica del bonus
                            }else if(stat.value <= 8){
                                this.bonus = -( Math.floor((10 - stat.value)/2));
                                //console.log(this.bonus);   
                            }else{
                                this.bonus = 0;
                            }
                        }
                    });

                }else{
                    this.error = 'Devi prima selezionare una classe'
                }

                
            },

            getResult(){
                if(this.userNumber === 20){
                    this.result = 'SUCCESSO'
                    this.critic = true

                }else if(this.userNumber === 1){
                    this.result = 'FALLIMENTO'
                    this.critic = true

                }else if(this.resultNumber >= this.pcNumber){
                    this.result = 'SUCCESSO'
                    this.critic = false

                }else{
                    this.result = 'FALLIMENTO'
                    this.critic = false

                }

                console.log(this.result);
                
            }
        },

        mounted(){
            //console.log(this.userClass.stats);
            //console.log(store.userStat);
            // this.pcNumber = Math.floor((Math.random() * 20) + 1);
            this.randomFace;
            setTimeout(() => this.loading = false, 1000);
            this.error = '';
            this.getBonus();
        }
    }

</script>

<template>

    <div class="loader-container" v-if="this.loading">
      <span class="loader"></span>
    </div>

    <div class="wrapper rounded-lg" v-else>

        <div class="text-center font-bold text-3xl mb-8 mt-8">
            <h2>PROVA DI</h2>
            <h2>{{ stat }}</h2>
        </div>


        <div class="dice-container base-container">

            <div class="text-center font-bold text-3xl">
                <h2>CLASSE</h2>
                <h2>DIFFICOLTÀ</h2>
                <div class="text-7xl min-h-20">
                    {{ pcNumber }}
                </div>
            </div>

            <div class="content">
                <div class="die" :class = "(this.rolling) ? 'roll' : ''" @click="this.rollDice" :data-face="userNumber">
                    <figure class="face face-1"></figure>
                    <figure class="face face-2"></figure>
                    <figure class="face face-3"></figure>
                    <figure class="face face-4"></figure>
                    <figure class="face face-5"></figure>
                    <figure class="face face-6"></figure>
                    <figure class="face face-7"></figure>
                    <figure class="face face-8"></figure>
                    <figure class="face face-9"></figure>
                    <figure class="face face-10"></figure>
                    <figure class="face face-11"></figure>
                    <figure class="face face-12"></figure>
                    <figure class="face face-13"></figure>
                    <figure class="face face-14"></figure>
                    <figure class="face face-15"></figure>
                    <figure class="face face-16"></figure>
                    <figure class="face face-17"></figure>
                    <figure class="face face-18"></figure>
                    <figure class="face face-19"></figure>
                    <figure class="face face-20"></figure>
                </div>
                <figure class="bonus-number fade-in" v-if="!this.rolling && this.resultNumber !== 0 && this.result !== 1 && this.resultNumber !== 20">
                    <div  @click="this.rollDice">
                        <span :class="this.result === 'FALLIMENTO' ? 'text-red-700' : ''">
                            {{this.resultNumber}}
                        </span>
                    </div>
                </figure>
            </div>

            <div class="roll-result text-center mt-20 text-4xl fade-in" v-if="this.result">
                <h2 :class="this.result === 'FALLIMENTO' ? 'text-red-700' : ''">{{ this.result }}</h2>
                <h2 :class="this.result === 'FALLIMENTO' ? 'text-red-700' : ''" class="pt-1" v-if="this.critic">CRITICO</h2>
            </div>

            <div class="dice-container overlay-container"></div>

        </div>

        <div  v-for="stat in this.userClass.stats">

            <div class="mx-auto mt-12 bonus" :class="!this.rolling && this.userNumber !== 0 ? 'bonus-effect' : ''" v-if="this.bonus !== 0 && stat.name === this.originalStat">
            
                <div class="text-white text-3xl">
                    <span v-if="this.bonus >= 1" class="text-xl">+</span>
                    {{ this.bonus }}
                </div>
                <div><img class="mx-auto" :src="stat.logo" :alt="stat.name"></div>
                <div class="pb-2 text-xl">{{ stat.name }}</div>
    
                <div class="bonus-overlay mx-auto"></div>
                <div class="bonus-overlay-arrow mx-auto"></div>
            </div>

        </div>
        
        <div class="error-container flex justify-center pt-[25em]" v-if="this.error !== ''">
            <router-link :to="{name:'home'}" class="text-2xl">{{ this.error }}</router-link>
        </div>

    </div>  

</template>

<style lang="scss" scoped>

    .fade-in {
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.5s;
    }

    @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    .bonus-effect{
        animation-name: scale;
        animation-duration: 0.8s;
        animation-timing-function: linear;
        animation-delay: 0.8s;
    }

    @keyframes scale {
        0%{
            transform: scale(1);
        }

        30%{
            transform: scale(1.4);
        }

        90%{
            transform: scale(1.4);
        }

        100%{
            transform: scale(1);
        }
    }
    
   .wrapper{
        cursor: default;

        .error-container{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.4);
            }

        .dice-container{
            margin: 0 auto;
            background: linear-gradient(-210deg, rgba(2,0,36,1) 0%, rgba(51,34,47,1));
            border-radius: 100px;
        }

        .base-container{
            width: 30%;
            height: 750px;
            border-top: 4px solid rgb(187, 166, 73);
            border-bottom: 4px solid rgb(187, 166, 73);
            position: relative;
            border-radius: 300px;
            padding: 4em 0;
        }

        .overlay-container{
            width: 135%;
            height: 580px;
            border: 2px solid rgb(187, 166, 73);
            position: absolute;
            left: -85%;
            top: 50%;
            transform: translate(50%, -50%);
            z-index: -10;
        }

        .bonus{
            background: linear-gradient(0deg, rgba(2,0,36,0.5) 0%,rgba(51,34,47,1));
            width: 11%;
            border: solid 2px transparent;
            border-radius: 12px;
            background-image: linear-gradient( rgba(51,34,47,1) 0%, rgba(2,0,36,0.5)), 
                                linear-gradient(to bottom, rgba(187, 166, 73, 0.8), rgba(0, 0, 0, 0));
            background-origin: border-box;
            background-clip: content-box, border-box;
            border-bottom: none;
            position: relative;
            text-align: center;
            color: rgb(187, 166, 73) !important;

            .bonus-overlay{
                width: 0; 
                height: 0; 
                border-left:8px solid transparent;
                border-right:8px solid transparent;
                
                border-bottom:8px solid rgb(187, 166, 73);
                position: absolute;
                top: -5%;
                left: 50%;

                transform: translate(-50%);
                z-index: 12;
            }

            .bonus-overlay-arrow{
                width: 0; 
                height: 0; 
                border-left: 14px solid transparent;
                border-right: 14px solid transparent;
                
                border-bottom: 14px solid rgba(51,34,47,1);
                position: absolute;
                top: -4%;
                left: 50%;

                transform: translate(-50%);
                z-index: 12;
            }

            img{
                width: 65%;
            }
        }


        // dado
        $containerWidth: 200px;
        $containerHeight: $containerWidth;

        $faceWidth:  $containerWidth*0.5;
        $faceHeight: $faceWidth*0.86;

        $transitionDuration: 0.5s;
        $animationDuration:  3s;

        $angle: 53deg;
        $ringAngle: -11deg;
        $sideAngle: 360deg/5;
        $opacity: 0.75;
        $color: rgba(120,116,140,$opacity);
        //$color: radial-gradient(circle, rgba(49,45,60,1) 0%, rgba(120,116,140,1) 100%);

        $rotateX: -$angle;
        $translateZ: $faceWidth*0.335;
        $translateY: -$faceHeight*0.15;
        $translateRingZ: $faceWidth*0.75;
        $translateRingY: $faceHeight*0.78 + $translateY;
        $translateLowerZ: $translateZ;
        $translateLowerY: $faceHeight*0.78 + $translateRingY;

        // @keyframes roll {
        //     10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
        //     100% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) }
        //     50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
        //     70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
        //     90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
        // }

        .roll{
            animation-name: rotate;
            animation-duration: 2s;
            animation-timing-function: linear;
        }

        @keyframes rotate {
            10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
            30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) }
            50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(0px) translateY(0px) }
            70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
            90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
        }

        body {
            background: #333;
            padding: 20px;
        }

        .content {
            margin: 15% auto;
            position: relative;
            width: $containerWidth;
            height: $containerHeight;
            perspective: 1500px;
        }

        .bonus-number{
            $horizontalMargin: -$faceWidth*0.5;
                
            position: absolute;
            left: 50%;
            top: 22.5%;
            margin: 0 $horizontalMargin;
            border-left: $faceWidth*0.5 solid transparent;
            border-right: $faceWidth*0.5 solid transparent;
            border-bottom: $faceHeight solid transparent;
            width: 0px;
            height: 0px;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            
            div {
                position: absolute;
                top: $faceHeight*0.25;
                left: -$faceWidth;
                color: #fff;
                text-shadow: 1px 1px 3px #000;
                font-size: $faceHeight*0.5;
                text-align: center;
                line-height: $faceHeight*0.9;
                width: $faceWidth*2;
                height: $faceHeight;
                //margin-bottom: 0.2em

                span{
                    // width:fit-content;
                    display: inline-block;
                    height: 62.5px;
                    width: 58.5px;
                    background-color: #615c74;
                    //background-color: red;
                    padding: 0 10px;
                    border-radius: 50%;
                }
            }
        }

        .die {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform $transitionDuration ease-out;
            cursor: pointer;
            
            transform: rotateX($rotateX);
            
            &.rolling {
                animation: roll 300 linear;
            }
            
            @for $i from 1 through 5 {
                &[data-face="#{$i}"] {
                    $angleMultiplier: $i - 1;
                    transform: rotateX(-$angle) rotateY($sideAngle * $angleMultiplier);
                }
            }
            
            @for $i from 16 through 20 {
                &[data-face="#{$i}"] {
                    $angleMultiplier: $i - 15;
                    transform: rotateX(-$angle + 180deg) rotateY(-$sideAngle * $angleMultiplier);
                }
            }
            
            @for $i from 6 through 10 {
                &[data-face="#{$i}"] {
                    $angleMultiplier: $i - 6;
                    transform: rotateX(-$ringAngle) rotateZ(180deg) rotateY($sideAngle * $angleMultiplier);
                }
            }
            
            @for $i from 11 through 15 {
                &[data-face="#{$i}"] {
                    $angleMultiplier: $i - 8;
                    transform: rotateX(-$ringAngle) rotateY(-$sideAngle * $angleMultiplier - $sideAngle/2);
                }
            }
            
            .face {
                $horizontalMargin: -$faceWidth*0.5;
                
                position: absolute;
                left: 50%;
                top: 0;
                margin: 0 $horizontalMargin;
                border-left: $faceWidth*0.5 solid transparent;
                border-right: $faceWidth*0.5 solid transparent;
                border-bottom: $faceHeight solid $color;
                width: 0px;
                height: 0px;
                transform-style: preserve-3d;
                backface-visibility: hidden;
                
                counter-increment: steps 1;
            
                &:before {
                    content: counter(steps);
                    position: absolute;
                    top: $faceHeight*0.25;
                    left: -$faceWidth;
                    color: #fff;
                    text-shadow: 1px 1px 3px #000;
                    font-size: $faceHeight*0.5;
                    text-align: center;
                    line-height: $faceHeight*0.9;
                    width: $faceWidth*2;
                    height: $faceHeight;
                }
                
                @for $i from 1 through 5 {
                    &:nth-child(#{$i}) {
                        $angleMultiplier: $i - 1;
                        transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateZ) translateY($translateY) rotateX($angle);
                    }
                }
                
                @for $i from 16 through 20 {
                    &:nth-child(#{$i}) {
                        $angleMultiplier: $i - 18;
                        transform: rotateY($sideAngle * $angleMultiplier + $sideAngle/2) translateZ($translateLowerZ) translateY($translateLowerY) rotateZ(180deg) rotateX($angle);
                    }
                }
                
                @for $i from 6 through 10 {
                    &:nth-child(#{$i}) {
                        $angleMultiplier: $i - 11;
                        transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateRingZ) translateY($translateRingY) rotateZ(180deg) rotateX($ringAngle);
                    }
                }
                
                @for $i from 11 through 15 {
                    &:nth-child(#{$i}) {
                        $angleMultiplier: $i - 8;
                        transform: rotateY($sideAngle * $angleMultiplier + $sideAngle/2) translateZ($translateRingZ) translateY($translateRingY) rotateX($ringAngle);
                    }
                }
            }

            h2 {
                color: #fafafa;
            }

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                
                > li {
                    display: inline-block;
                    margin: 10px 10px;
                }
            }

            a {
                text-align: center;
                color: #fff;
                text-decoration: none;
                font-size: 25px;
                font-weight: bold;
                padding: 5px 15px;
                width: 40px;
                display: inline-block;
                border: 1px solid #dcdcdc;
                border-radius: 4px;
                background-color: #999;
                    
                &.active {
                    background-color: #333;
                }
                    
                &:hover {
                    background-color: #666;
                }
                    
                &.randomize {
                    width: auto;
                    margin: 20px 10px;
                }
            }
            
        }


        .content:after {
            content: "";
            display: block;
            position: relative;
            width: 380px;
            height: 380px;
            top: 30px;
            margin-left: -96px;
            background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%);
            background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%);
            -webkit-transform: scaleY(0.3);
            transform: scaleY(0.3);
        }

    }


    // loader
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