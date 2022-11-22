<template>
    <div id="app">
        <router-view>
            <div id="nav">
                <router-link to="/">Inicio</router-link>
                <router-link to="/pacientes">Inicio</router-link>
                <router-link to="/doctores">Inicio</router-link>
            </div>
        </router-view>
    </div>
</template>

<script>
export default {
    data() {
        return { titulo: 'TuCita.com' }
    }
}
</script>

<style scoped>

</style>