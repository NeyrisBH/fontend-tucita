<template>
    <section class="container-fluid">
        <div class="card-header-flex">
            <h3>Tareas</h3>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#tareaModal"
                @click="abrirModalRegistrar()">Insertar</button>
        </div>
        <div class="car-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DESCRIPCION</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tarea in tareas">
                        <td>{{ tarea.id }}</td>
                        <td>{{ tarea.descripcion }}</td>
                        <td>{{ tarea.estado }}</td>
                        <td>
                            <div class="buttons-acciones">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#tareaModal" @click="abrirModalEditar(tarea)">
                                    <img src="../assets/svg/edit.svg" alt="">
                                </button>
                                <button type="button" class="btn btn-danger" @click="eliminarConfTarea(tarea.id)">
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
    <div class="modal fade" id="tareaModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel"
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
                            <label for="id">Id</label>
                            <input v-model="id" type="number" class="form-control" id="id" name="id">
                        </div>
                        <div class="col-md-12">
                            <label for="descripcion">Descripción</label>
                            <input v-model="descripcion" type="text" class="form-control" id="descripcion"
                                name="descripcion">
                        </div>
                        <div class="col-md-12">
                            <label for="estado">Estado</label>
                            <input v-model="estado" type="text" class="form-control" id="estado" name="estado">
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button @click="crearTarea" class="btn btn-primary" v-if="btnCrear">Guardar</button>
                        <button @click="actualizarTarea(id)" class="btn btn-primary"
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
            tareas: [],
            btnCrear: false,
            btnActualizar: false,
            id: 0,
            descripcion: '',
            estado: '',
            token: localStorage.getItem('token'),
            continuar: false,
        };
    },
    methods: {
        limpiarForm() {
            this.id = null,
                this.descripcion = '',
                this.estado = ''
        },
        async consultaTareas() {
            const authorization = "Bearer "+ this.token;
            const opciones = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization,
                }
            };
            fetch("http://localhost:8080/api/tareas", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        console.log(error.message);
                        throw error;
                    }
                    else {
                        this.tareas = await response.json();
                    }
                });
        },
        async crearTarea() {
            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjo5ZTJjOTkxZi1iNzk5LTRkMzgtYmJkOC00ZGEyOTk3ZWU1NGM="
                },
                body: JSON.stringify({
                    id: this.id,
                    descripcion: this.descripcion,
                    estado: this.estado
                })
            };
            fetch("http://localhost:8080/api/tareas", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.limpiarForm();
                        this.consultaTareas();
                    }
                });
        },
        async actualizarTarea(id) {
            const opciones = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjplYzNmNjIxZi03YWIxLTQxZDctODJmNi1iZjY4ZjZiMDVmZTE="
                },
                body: JSON.stringify({
                    id: this.id,
                    descripcion: this.descripcion,
                    estado: this.estado
                })
            };
            fetch(`http://localhost:8080/api/tareas/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.consultaTareas();
                    }
                });
        },
        async eliminarTarea(id) {
            this.solicitarToken();
            const authorization = "Bearer "+this.token;
            const opciones = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": authorization
                }
            };
            fetch(`http://localhost:8080/api/tareas/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.consultaTareas();
                    }
                });
        },
        eliminarConfTarea(id) {
            if (!confirm('¿Esta seguro de eliminar la tarea?')) return;

            this.eliminarTarea(id);
        },
        abrirModalRegistrar() {
            this.id = null,
                this.descripcion = '',
                this.estado = '',
                this.tituloModal = "Registrar Tareas",
                this.btnCrear = true;
            this.btnActualizar = false;
        },
        abrirModalEditar(data) {
            this.id = data.id,
                this.descripcion = data.descripcion,
                this.estado = data.estado,
                this.tituloModal = "Editar Cita",
                this.btnCrear = false;
            this.btnActualizar = true;
        },
        // solicitarToken(){
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
        //     .then(async (response) => {
        //         if (!response.ok) {
        //             console.log("Error de token");
        //             const error = new Error(response.statusText);
        //             error.json = response.json();
        //             throw error;
        //         } else {
        //             const data = await response.json();
        //             this.token = data.token,
        //             localStorage.setItem('token', this.token);
        //             this.consultaTareas();
        //         }
        //     })
        // }
    },
    beforeMount(){
        this.consultaTareas();
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