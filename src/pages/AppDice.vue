<script>
import { store } from '../store';

    export default{
        name: "AppAbout",
        data(){
            return{
                stat: store.userStat.toUpperCase(),
                pcNumber: 0,
                userNumber: 1,
                // sides: 20,
                // initialSide: 1,
                // lastFace: undefined,
                // // timeoutId: undefined,
                // transitionDuration: 500,
                // animationDuration: 3000,
                rolling: false,
                loading: true,
            }
        },

        components:{
            

        },

        methods:{
            rollDice(){
                this.rolling = true;
                this.userNumber = Math.floor((Math.random() * 20) + 1);
                this.rolling = false
            }

            // randomFace() {
            //     var face = Math.floor(Math.random() * sides) + initialSide;
            //     this.lastFace = face == lastFace ? randomFace() : face;
            //     return face;
            // },

            // getNumber(){
            //     this.rolling = true;
            //     clearTimeout(timeoutId);

            //     var timeoutId = setTimeout(function () {
            //         this.rolling = false;

            //         rollTo(randomFace());
            //     }, this.animationDuration);

            //     return false;
            // }
        },

        mounted(){
            console.log(store.userClass);
            console.log(store.userStat);
            this.pcNumber = Math.floor((Math.random() * 20) + 1);
            this.randomFace;
            setTimeout(() => this.loading = false, 1000);
        }
    }

</script>

<template>

    <div class="loader-container" v-if="this.loading">
      <span class="loader"></span>
    </div>

    <div class="wrapper" v-else>

        <div class="text-center font-bold text-3xl mb-12">
            <h2>PROVA DI</h2>
            <h2>{{ stat }}</h2>
        </div>


        <div class="dice-container base-container">

            <div class="text-center font-bold text-3xl">
                <h2>CLASSE</h2>
                <h2>DIFFICOLTÀ</h2>
                <div class="text-7xl">
                    {{ pcNumber }}
                </div>
            </div>

            <div class="content">
                    <div class="die" :class="rolling ? 'rolling' : ''" @click="this.rollDice" :data-face="userNumber">
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
                </div>

            <div class="dice-container overlay-container"></div>

        </div>

    </div>  

</template>

<style lang="scss" scoped>
   
   .wrapper{
        cursor: default;
        font-family: "Alegreya Sans", sans-serif !important;
        font-weight: 700 !important;

        .dice-container{
            margin: 0 auto;
            background: linear-gradient(-210deg, rgba(2,0,36,1) 0%, rgba(51,34,47,1));
            border-radius: 100px;
        }

        .base-container{
            width: 35%;
            height: 850px;
            border-top: 4px solid rgb(187, 166, 73);
            border-bottom: 4px solid rgb(187, 166, 73);
            position: relative;
            border-radius: 300px;
            padding: 4em 0;
        }

        .overlay-container{
            width: 140%;
            height: 600px;
            border: 4px solid rgb(187, 166, 73);
            position: absolute;
            left: -90%;
            top: 50%;
            transform: translate(50%, -50%);
            z-index: -10;
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

        @keyframes roll {
            10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
            30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
            50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
            70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
            90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
        }

        body {
            background: #333;
            padding: 20px;
        }

        .content {
            margin: 20% auto;
            position: relative;
            width: $containerWidth;
            height: $containerHeight;
            perspective: 1500px;
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