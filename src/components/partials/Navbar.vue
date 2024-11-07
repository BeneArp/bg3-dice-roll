<script>

    export default{
        name: 'Navbar',
    }

</script>

<template>

    <header>
        <ul>
            <router-link :to="{name:home}">Classi</router-link>
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
            transition: all 0.5s;

            &:hover{
                color: rgb(219 194 146);
            }
        }
    }

</style>