<template>
    <section class="container-fluid">
        <div class="card-header-flex">
            <h3>Tareas</h3>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#usuarioModal"
                @click="abrirModalRegistrar()">Insertar</button>
        </div>
        <div class="car-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>USUARIO</th>
                        <th>CALVE</th>
                        <th>ID</th>
                        <th>ROL</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usuarios">
                        <td>{{ user.usuario }}</td>
                        <td>******</td>
                        <td>{{ user.idUsuario }}</td>
                        <td>{{ user.rol }}</td>
                        <td>
                            <div class="buttons-acciones">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#usuarioModal" @click="abrirModalEditar(user)">
                                    <img src="../assets/svg/edit.svg" alt="">
                                </button>
                                <button type="button" class="btn btn-danger" @click="eliminarConfUsuario(user.usuario)">
                                    <img src="../assets/svg/delete.svg" alt="">
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>


    <!-- Modal - Register -->
    <div class="modal fade" id="usuarioModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content container">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ tituloModal }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-4 container-fr">
                        <div class="col-md-12">
                            <label for="usuario">Usuario</label>
                            <input v-model="usuario" type="text" class="form-control" id="usuario" name="usuario">
                        </div>
                        <div class="col-md-12">
                            <label for="clave">Contraseña</label>
                            <input v-model="clave" type="password" class="form-control" id="clave" name="clave">
                        </div>
                        <div class="col-md-12">
                            <label for="idUsuario">ID</label>
                            <input v-model="idUsuario" type="number" class="form-control" id="idUsuario"
                                name="idUsuario">
                        </div>
                        <div class="col-md-12">
                            <label for="rol">Rol</label>
                            <!-- <input v-model="rol" type="text" class="form-control" id="rol" name="rol"> -->
                            <select v-model="rol" class="form-control" id="sel1">
                                <option>Admin</option>
                                <option>Paciente</option>
                                <option>Doctor</option>
                            </select>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button @click="crearUsuario" class="btn btn-primary" v-if="btnCrear">Guardar</button>
                        <button @click="actualizarUsuario(usuario)" class="btn btn-primary"
                            v-if="btnActualizar">Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titulo: "TuCita.com",
            tituloModal: '',
            usuarios: [],
            btnCrear: false,
            btnActualizar: false,
            usuario: '',
            clave: '',
            idUsuario: null,
            rol: '',
            token: localStorage.getItem('token')
        };
    },
    methods: {
        limpiarForm() {
            this.usuario = '',
                this.clave = '',
                this.idUsuario = null,
                this.rol = ''
        },
        async consultaUsurios() {
            const authorization = "Bearer " + this.token;
            const opciones = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization,
                }
            };
            fetch("http://localhost:8080/api/usuarios", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        console.log(error.message);
                        throw error;
                    }
                    else {
                        this.usuarios = await response.json();
                    }
                });
        },
        async crearUsuario() {
            const authorization = "Bearer " + this.token;
            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                },
                body: JSON.stringify({
                    usuario: this.usuario,
                    clave: this.clave,
                    idUsuario: this.idUsuario,
                    rol: this.rol
                })
            };
            fetch("http://localhost:8080/api/usuarios", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        this.limpiarForm();
                        this.consultaUsurios();
                    }
                });
        },
        async actualizarUsuario(usuario) {
            const authorization = "Bearer " + this.token;
            const opciones = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                },
                body: JSON.stringify({
                    usuario: this.usuario,
                    clave: this.clave,
                    idUsuario: this.idUsuario,
                    rol: this.rol
                })
            };
            fetch(`http://localhost:8080/api/usuarios/${usuario}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        this.consultaUsurios();
                    }
                });
        },
        async eliminarUsuario(usuario) {
            const authorization = "Bearer " + this.token;
            const opciones = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                }
            };
            fetch(`http://localhost:8080/api/usuarios/${usuario}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        this.consultaUsurios();
                    }
                });
        },
        eliminarConfUsuario(usuario) {
            if (!confirm('¿Esta seguro de eliminar la tarea?')) return;

            this.eliminarUsuario(usuario);
        },
        abrirModalRegistrar() {
            this.usuario = '',
                this.clave = '',
                this.idUsuario = null,
                this.rol = '',
                this.tituloModal = "Registrar Usuarios",
                this.btnCrear = true;
            this.btnActualizar = false;
        },
        abrirModalEditar(data) {
            this.usuario = data.usuario,
                this.clave = data.clave,
                this.idUsuario = data.idUsuario,
                this.rol = data.rol,
                this.tituloModal = "Editar Usuario",
                this.btnCrear = false;
            this.btnActualizar = true;
        }
    },
    beforeMount() {
        this.consultaUsurios();
    },
    components: {}
}
</script>

<style scoped>
.buttons-acciones {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}

.buttons-acciones button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-header-flex {
    margin: 10px 50px;
    display: grid;
    grid-template-columns: 70% 30%;
}

.car-body {
    margin: 20px 100px;
}

.container-fluid {
    margin: 0;
    padding: 0;
    width: 95%;
}

.row {
    margin: 0;
    padding: 0;
}

#editarModal {
    display: flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>