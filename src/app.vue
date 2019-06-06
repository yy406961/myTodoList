<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default {
    data() {
        return {
            text: 'abcaaaa'
        }
    },
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>

<style lang="stylus" scoped>
#app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    // background-color rgba(255,255,255,.1)
    // opacity .9
    z-index -1
}
#loading {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(255,255,255,.3)
    z-index 99
    display flex
    align-items center
    justify-content center
}
</style>
