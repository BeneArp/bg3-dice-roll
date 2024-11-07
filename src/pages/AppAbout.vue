<script>

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


</template>

<style lang="scss" scoped>
    @use '../styles/partials/variables' as *;

    .advantages-info{
        background: linear-gradient($white, $light-grey);
        padding: 2em 0 4em 0;
        position: relative;
        

        #circle-green-decoration{
            position: absolute;
            top: 50%;
            left: 25%;
        }

        #circle-violet-decoration{
            position: absolute;
            bottom: 2%;
            right: 26%;
        }
    }

</style>