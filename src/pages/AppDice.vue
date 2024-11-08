<script>
import { store } from '../store';

    export default{
        name: "AppAbout",
        data(){
            return{
                
            }
        },

        components:{
            

        },

        mounted(){
            console.log(store.userClass);
            console.log(store.userStat); 
        }
    }

</script>

<template>

    <div class="wrapper">

        <div class="dice-container base-container">

            <div class="dice-container overlay-container">

                <div class="content">
                    <div class="die">
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

            </div>

        </div>

    </div>  

</template>

<style lang="scss" scoped>
   
   .wrapper{
        width: 100%;
        height: 950px;
        //background-color: white;
        padding: 1em 0;

        .dice-container{
            margin: 0 auto;
            background: linear-gradient(-210deg, rgba(2,0,36,1) 0%, rgba(51,34,47,1));
            border-radius: 100px;
        }

        .base-container{
            width: 35%;
            height: 800px;
            border: 4px solid rgb(187, 166, 73);
            position: relative;
        }

        .overlay-container{
            width: 140%;
            height: 600px;
            border-left: 4px solid rgb(187, 166, 73);
            border-right: 4px solid rgb(187, 166, 73);
            position: absolute;
            left: -90%;
            top: 50%;
            transform: translate(50%, -50%);
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
        //     30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
        //     50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
        //     70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
        //     90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
        // }

        body {
            background: #333;
            padding: 20px;
        }

        .content {
            margin: 28% auto;
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
            
            // &.rolling {
            //     animation: roll $animationDuration linear;
            // }
            
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

</style>