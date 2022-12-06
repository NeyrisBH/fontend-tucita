<template>
    <div id="app">
        <Header v-if="$route.meta.header !== 1"/>
        <div class="row">
            <RouterView />
        </div>
        <Footer v-if="$route.meta.header !== 1"/>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            titulo: 'TuCita.com',
            token: localStorage.getItem('token')
        }

    },
    methods: {
        // solicitarToken() {
        //     const opciones = {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Cache-Control": "no-cache",
        //         },
        //         body: JSON.stringify({
        //             usuario: "usuario1",
        //             clave: "claveUsuario1",
        //             idTarea: 1
        //         })
        //     };
        //     fetch("http://localhost:8080/api/token", opciones)
        //         .then(async (response) => {
        //             if (!response.ok) {
        //                 console.log("Error de token");
        //                 const error = new Error(response.statusText);
        //                 error.json = response.json();
        //                 throw error;
        //             } else {
        //                 const data = await response.json();
        //                 this.token = data.token,
        //                     localStorage.setItem('token', this.token);
        //             }
        //         })
        // }
    },
    // beforeMount() {
    //     this.solicitarToken();
    // }
}

</script>

<style scoped>
.row {
    margin: 0;
    padding: 0;
}
</style>