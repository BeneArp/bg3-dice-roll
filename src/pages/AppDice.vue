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
                rounds: JSON.parse(localStorage.getItem('rounds')),
                currentRound: {},
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
                    setTimeout(() =>  this.resultNumber = this.userNumber + this.bonus, 3690);
                }else{
                    //this.bonus = 0;
                    this.resultNumber = 0;
                }

                setTimeout(() =>  this.getResult(), 4200);
                
                setTimeout(() =>  this.registRound(), 4200);

                
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
                
            },

            registRound(){

                this.currentRound = {
                    classImg: this.userClass.logo,
                    className: this.userClass.name,
                    stat: this.originalStat,
                    pcNumber: this.pcNumber,
                    userNumber: this.userNumber,
                    userBonus: this.bonus,
                    result: ''
                }

                if(this.critic){
                    this.currentRound.result = this.result + ' CRITICO'

                }else{
                    this.currentRound.result = this.result
                }

                this.rounds.push(this.currentRound);

                localStorage.setItem('rounds', JSON.stringify(this.rounds));
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

        <div class="relative">

            <div  v-for="stat in this.userClass.stats">

            <div class="mx-auto mt-12 bonus" :class="!this.rolling && this.pcNumber !== '' && this.userNumber !== 1 && this.userNumber !== 20 ? 'bonus-effect' : ''" v-if="this.bonus !== 0 && stat.name === this.originalStat">

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

            <div class="sparkle-effect mx-auto w-fit" :class="!this.rolling && this.pcNumber !== '' && this.userNumber !== 1 && this.userNumber !== 20 ? 'bonus-sparks' : ''" v-if="this.bonus !== 0">

                <div class="big-spark mx-auto"></div>

                <div class="grid grid-cols-3 w-[18px] gap-2 mt-2 relative">
                    <div class="little-spark spark-1"></div>
                    <div class="little-spark spark-2"></div>
                    <div class="little-spark spark-3"></div>
                    <div class="little-spark spark-4"></div>
                    <div class="little-spark spark-5"></div>
                    <div class="little-spark spark-6"></div>
                    <div class="little-spark spark-7"></div>
                    <div class="little-spark spark-8"></div>
                    <div class="little-spark spark-9"></div>
                </div>

            </div>
        </div>
        
        
        <div class="error-container flex justify-center pt-[25em]" v-if="this.error !== ''">
            <router-link :to="{name:'home'}" class="text-2xl">{{ this.error }}</router-link>
        </div>

    </div>  

</template>

<style lang="scss" scoped>

    // EFFETTI
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

    .bonus-sparks{
        animation-name: move;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-delay: 1.5s;
    }

    @keyframes move {
        0%{
            opacity: 0;
        }

        30%{
            transform: translate(0px, -100px);
            opacity: 1;
        }

        50%{
            transform: translate(0px, -250px);
            z-index: 100;
        }

        90%{
            transform: translate(0px, -460px);
            opacity: 1;
        }

        100%{
            transform: translate(0px, -460px);
            opacity: 0;
        }
    }
    
    // MAIN
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

        // BONUS
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

        .sparkle-effect{
            position: absolute;
            top: 20px;
            left: 50%;
            z-index: -2;
            opacity: 0;

            .big-spark{
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: rgb(231 216 163);
                box-shadow:
                    0 0 16px 10px rgb(231 216 163), 
                    0 0 9.5px 7.5px rgb(198 182 120),
                    0 0 13.5px 9.25px rgb(97 85 49);
            }

            .little-spark{
                width: 1px;
                height: 1px;
                border-radius: 50%;
                background-color: rgb(226, 222, 209);
                box-shadow:
                    0 0 3px 4px rgb(226, 222, 209),
                    0 0 1px 1px rgb(231 216 163),
                    0 0 2px 2.5px rgb(97 85 49);
            }

            .spark-1{
                position: absolute;
                left: -8px;
                top: 10px;
                background-color: rgb(226, 215, 178);
                box-shadow:
                    0 0 4px 4.5px rgb(226, 215, 178),
                    0 0 1px 1px rgb(231 216 163),
                    0 0 2px 2.5px rgb(97 85 49);
            }

            .spark-2{
                position: absolute;
                left: 8px;
                top: 26px;
                background-color: rgb(240, 238, 231);
                box-shadow:
                    0 0 8px 7px rgb(240, 238, 231),
                    0 0 2px 2px rgb(161, 154, 127),
                    0 0 3px 3.5px rgb(107, 102, 85);
            }

            .spark-3{
                position: absolute;
                left: 15px;
                top: 10px;
                background-color: rgb(255, 225, 126);
                box-shadow:
                    0 0 2px 2.5px rgb(255, 225, 126),
                    0 0 2px 2px rgb(214, 194, 122),
                    0 0 3px 3.5px rgb(139, 112, 28);
            }

            .spark-4{
                position: absolute;
                left: -12px;
                top: 40px;
                background-color: rgb(255, 225, 126);
                box-shadow:
                    0 0 6px 5px rgb(255, 225, 126),
                    0 0 2px 2px rgb(214, 194, 122),
                    0 0 3px 3.5px rgb(139, 112, 28);
            }
            
            .spark-5{
                position: absolute;
                left: 12px;
                top: 50px;
                background-color: rgb(226, 215, 178);
                box-shadow:
                    0 0 6px 5px rgb(226, 215, 178),
                    0 0 2px 2px rgb(231 216 163),
                    0 0 3px 3.5px rgb(97 85 49);
            }

            .spark-6{
                position: absolute;
                right: -14px;
                top: -4px;
                background-color: rgb(240, 238, 231);
                box-shadow:
                    0 0 6px 5px rgb(240, 238, 231),
                    0 0 2px 2px rgb(161, 154, 127),
                    0 0 3px 3.5px rgb(107, 102, 85);
            }

            .spark-7{
                position: absolute;
                right: -16px;
                top: 38px;
                background-color: rgb(255, 225, 126);
                box-shadow:
                    0 0 12px 10px rgb(255, 225, 126),
                    0 0 2px 2px rgb(214, 194, 122),
                    0 0 3px 3.5px rgb(139, 112, 28);
            }

            .spark-8{
                position: absolute;
                right: -14px;
                top: 15px;
                background-color: rgb(255, 225, 126);
                box-shadow:
                    0 0 4px 4.5px rgb(255, 225, 126),
                    0 0 1.5px 1.5px rgb(214, 194, 122),
                    0 0 6px 6.5px rgb(139, 112, 28);
            }

            .spark-9{
                position: absolute;
                left: -20px;
                top: -9px;
                background-color: rgb(240, 238, 231);
                box-shadow:
                    0 0 8px 7px rgb(240, 238, 231),
                    0 0 2px 2px rgb(161, 154, 127),
                    0 0 3px 3.5px rgb(107, 102, 85);
            }
        }


        // DADO
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