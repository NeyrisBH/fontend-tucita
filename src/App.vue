<template>
    <div id="app">
        <Header v-if="$route.meta.header !== 1"/>
        <div v-if="token != ''" class="row">
            <RouterView />
        </div>
        <div v-else class="row">
            <RouterView />
        </div>
        <Footer v-if="$route.meta.header !== 1"/>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

setInterval(()=> {

},600000)

export default {
    name: 'App',
    components: {
    Header,
    Footer,
    Footer
},
    data() {
        return {
            titulo: 'TuCita.com',
            token: localStorage.getItem('token')
        }

    },
    // methods: {
    //     async actualizarToken() {
    //         const authorization = "Bearer "+ this.token;
    //         const opciones = {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Cache-Control": "no-cache",
    //                 "Authorization": authorization
    //             }
    //         };
    //         fetch("http://localhost:8080/api/token/refresh", opciones)
    //             .then(async (response) => {
    //                 if (!response.ok) {
    //                     const error = new Error(response.statusText);
    //                     error.json = response.json();
    //                     console.log(error.message);
    //                     throw error;
    //                 }
    //                 else {
    //                     const data = await response.json();
    //                     this.token = data.token,
    //                     localStorage.setItem('token', this.token);
    //                 }
    //             });
    //     }
    // },
    // beforeMount() {
    //     this.actualizarToken();
    // }
}

</script>

<style scoped>
.row {
    margin: 0;
    padding: 0;
}
</style>