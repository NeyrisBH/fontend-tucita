<template>
    <div class="login">
        <h1 class="title">Inicio de sesión - TuCita.com</h1>
        <form action class="form">
            <label class="form-label" for="#id">Usuario:</label>
            <input v-model="usuario" class="form-input" type="text" id="usuario" required placeholder="Usuario">
            <label class="form-label" for="#contraseña">Contraseña:</label>
            <input v-model="clave" class="form-input" type="password" id="contraseña" placeholder="Contraseña">
            <input @click="solicitarToken" class="form-submit" type="button" value="Iniciar sesión">
        </form>
    </div>
</template>


<script>
export default {
    data() {
        return {
            usuario: '',
            clave: '',
            idTarea: null,
            token: localStorage.getItem('token')
        }
    },
    methods: {
        solicitarToken() {
            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
                body: JSON.stringify({
                    usuario: this.usuario,
                    clave: this.clave,
                })
            };
            fetch("http://localhost:8080/api/token", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        console.log("Error de token");
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    } else {
                        const data = await response.json();
                        this.token = data.token,
                        localStorage.setItem('token', this.token);
                        this.$router.push('/citas');
                    }
                })
        }
    }
}
</script>

<style scoped>
.login {
    padding: 10rem;
}

.title {
    text-align: center;
}

.form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
}

.form-label:first-of-type {
    margin-top: 0rem;
}

.form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
}

.form-input:focus {
    outline: 0;
    border-color: #0077ff;
}

.form-submit {
    background: #1a5faf;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
}

.form-submit:hover {
    background: #2b76cc;
}
</style>