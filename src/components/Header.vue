<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">
                <img src="../assets/images/logo.png" alt="">
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li v-if="authorities.includes('Admin')" class="nav-item">
                        <RouterLink to="/doctores" class="nav-link">Doctores</RouterLink>
                    </li>
                    <li v-if="authorities.includes('Admin') || authorities.includes('Doctor')" class="nav-item">
                        <RouterLink to="/pacientes" class="nav-link">Pacientes</RouterLink>
                    </li>
                    <li v-if="authorities.includes('Admin') || authorities.includes('Doctor') || authorities.includes('Paciente')" class="nav-item">
                        <RouterLink to="/citas" class="nav-link">Citas</RouterLink>
                    </li>
                    <li v-if="authorities.includes('Admin')" class="nav-item">
                        <RouterLink to="/usuarios" class="nav-link">Usuarios</RouterLink>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <RouterLink to="/" @click="cerrarSesion()" v-if="(token != null)"  class="btn btn-outline-secondary my-2 my-sm-0" type="button">Cerrar sesión
                    </RouterLink>
                    <RouterLink to="/login" v-else  class="btn btn-outline-secondary my-2 my-sm-0" type="button">Iniciar sesión
                    </RouterLink>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        const token = localStorage.getItem('token');
        const payload = token == null ? null : JSON.parse(atob(token.split('.')[1]));
        const authorities = payload == null ? [] : Array.from(payload.authorities);
        return {
            token,
            authorities
        }
    },
    methods: {
        cerrarSesion(){
            localStorage.removeItem('token')
        }
    }
}
</script>

<style scoped>
.navbar {
    background-color: #d1d1da;
    font-weight: 500;
    font-size: medium;
}

.navbar-brand img {
    max-width: 80px;
    margin-left: 40px;
}
</style>