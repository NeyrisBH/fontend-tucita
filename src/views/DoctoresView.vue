<template>
    <div class="container">
        <div class="card-header-flex">
            <h3>Doctores</h3>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#medicoModal"
                @click="abrirModalRegistrar()">Insertar</button>
        </div>
        <div class="car-body table-responsive container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRES</th>
                        <th>PRIMER APELLIDO</th>
                        <th>SEGUNDO APELLIDO</th>
                        <th>TELEFONO</th>
                        <th>AREA</th>
                        <th>REMISION</th>
                        <th>USUARIO</th>
                        <th>CONTRASEÑA</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doctor in doctores">
                        <td>{{ doctor.id }}</td>
                        <td>{{ doctor.nombreMedico }}</td>
                        <td>{{ doctor.apellidoPaternoMedico }}</td>
                        <td>{{ doctor.apellidoMaternoMedico }}</td>
                        <td>{{ doctor.telefonoMedico }}</td>
                        <td>{{ doctor.areaMedico }}</td>
                        <td>{{ doctor.remision }}</td>
                        <td>{{ doctor.usuarioMedico }}</td>
                        <td>*********</td>
                        <td>
                            <div class="buttons-acciones">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#medicoModal" @click="abrirModalEditar(doctor)">
                                    <img src="../assets/svg/edit.svg" alt="">
                                </button>
                                <button type="button" class="btn btn-danger" @click="eliminarConfMedico(doctor.id)">
                                    <img src="../assets/svg/delete.svg" alt="">
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


    <!-- Modal - Register -->
    <div class="modal fade" id="medicoModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content container">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{tituloModal}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <form class="row g-4 container-fr">
                        <div class="col-md-6">
                            <label for="id">Id</label>
                            <input v-model="id" type="number" class="form-control" id="id" name="id">
                        </div>
                        <div class="col-md-6">
                            <label for="nombres">Nombres</label>
                            <input v-model="nombreMedico" type="text" class="form-control" id="nombreMedico"
                                name="nombreMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="primerApellido">Primer apellido</label>
                            <input v-model="apellidoPaternoMedico" type="text" class="form-control" id="apellidoPaternoMedico"
                                name="apellidoPaternoMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="segundoApellido">Segundo apellido</label>
                            <input v-model="apellidoMaternoMedico" type="text" class="form-control" id="apellidoMaternoMedico"
                                name="apellidoMaternoMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="telefono">Telefono</label>
                            <input v-model="telefonoMedico" type="number" class="form-control" id="telefonoMedico"
                                name="telefonoMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="area">Area</label>
                            <input v-model="areaMedico" type="text" class="form-control" id="areaMedico" name="areaMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="remision">Remisión</label>
                            <input v-model="remision" type="text" class="form-control" id="remision" name="remision">
                        </div>
                        <div class="col-md-6">
                            <label for="usuario">Usuario</label>
                            <input v-model="usuarioMedico" type="text" class="form-control" id="usuarioMedico" name="usuarioMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="usuario">Contraseña</label>
                            <input v-model="contraseñaMedico" type="password" class="form-control" id="contraseñaMedico"
                                name="contraseñaMedico">
                        </div>
                        <div class="col-md-6">
                            <label for="usuario">Confirmar contraseña</label>
                            <input v-model="contraseñaTemporal" type="password" class="form-control"
                                id="contraseñaTemporal" name="contraseñaTemporal">
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button @click="validarMedico" class="btn btn-primary" v-if="btnCrear">Guardar</button>
                        <button @click="validarMedicoActualizar" class="btn btn-primary" v-if="btnActualizar">Actualizar</button>
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
            doctores: [],
            tituloModal: '',
            btnCrear: false,
            btnActualizar: false,
            id: null,
            nombreMedico: '',
            apellidoPaternoMedico: '',
            apellidoMaternoMedico: '',
            telefonoMedico: null,
            areaMedico: '',
            remision: '',
            usuarioMedico: '',
            contraseñaMedico: '',
            contraseñaTemporal: ''
        };
    },
    methods: {
        limpiarForm() {
            this.id = null,
                this.nombreMedico = '',
                this.apellidoPaternoMedico = '',
                this.apellidoMaternoMedico = '',
                this.telefonoMedico = null,
                this.areaMedico = '',
                this.remision = '',
                this.usuarioMedico = '',
                this.contraseñaMedico = '',
                this.contraseñaTemporal = ''
        },
        async consultaDoctores() {
            const opciones = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjpkMWQ2NjA3MS1jZTljLTQ5YjktOTJhNy0xM2E1MjUzNDQwMTY="
                }
            };
            fetch("http://localhost:8080/api/medico", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        console.log(error.message);
                        throw error;
                    }
                    else {
                        this.doctores = await response.json();
                        console.log(this.doctores);
                        console.log(this.doctores.length);
                        // console.log(this.citas[0].nombrePaciente);
                    }
                });
        },
        async crearMedico() {
            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjplYzNmNjIxZi03YWIxLTQxZDctODJmNi1iZjY4ZjZiMDVmZTE="
                },
                body: JSON.stringify({
                    id: this.id,
                    nombreMedico: this.nombreMedico,
                    apellidoPaternoMedico: this.apellidoPaternoMedico,
                    apellidoMaternoMedico: this.apellidoMaternoMedico,
                    telefonoMedico: this.telefonoMedico,
                    areaMedico: this.areaMedico,
                    remision: this.remision,
                    usuarioMedico: this.usuarioMedico,
                    contraseñaMedico: this.contraseñaMedico,
                    contraseñaTemporal: this.contraseñaTemporal
                })
            };
            fetch("http://localhost:8080/api/medico", opciones)
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
                        this.consultaDoctores();
                    }
                });
        },
        async actualizarMedico(id) {
            const opciones = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic Basic dXNlcjplYzNmNjIxZi03YWIxLTQxZDctODJmNi1iZjY4ZjZiMDVmZTE="
                },
                body: JSON.stringify({
                    id: this.id,
                    nombreMedico: this.nombreMedico,
                    apellidoPaternoMedico: this.apellidoPaternoMedico,
                    apellidoMaternoMedico: this.apellidoMaternoMedico,
                    telefonoMedico: this.telefonoMedico,
                    areaMedico: this.areaMedico,
                    remision: this.remision,
                    usuarioMedico: this.usuarioMedico,
                    contraseñaMedico: this.contraseñaMedico
                })
            };
            fetch(`http://localhost:8080/api/medico/d/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.consultaDoctores();
                    }
                });
        },
        validarMedico() {
            if (this.contraseñaMedico == this.contraseñaTemporal) {
                this.crearMedico();
            } else {
                alert('Las contraseñas no conciden');
            }
        },
        validarMedicoActualizar() {
            if (this.contraseñaMedico == this.contraseñaTemporal) {
                this.actualizarMedico(this.id);
            } else {
                alert('Las contraseñas no conciden');
            }
        },
        async eliminarMedico(id) {
            const opciones = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjpkZTAzMDgyNy0yZTI5LTQxMGUtYTgxNi0zMzUzMjlhNWU5YzI="
                }
            };
            fetch(`http://localhost:8080/api/medico/d/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.consultaDoctores();
                    }
                });
        },
        eliminarConfMedico(id) {
            if (!confirm('¿Esta seguro de eliminar el medico?')) return;

            this.eliminarMedico(id);
        },
        abrirModalRegistrar() {
            this.id = null,
            this.nombreMedico = '',
            this.apellidoPaternoMedico = '',
            this.apellidoMaternoMedico = '',
            this.telefonoMedico = null,
            this.areaMedico = '',
            this.remision = '',
            this.usuarioMedico = '',
            this.contraseñaMedico = '',
            this.contraseñaTemporal = ''
            this.tituloModal = "Registrar Medico",
                this.btnCrear = true;
            this.btnActualizar = false;
        },
        abrirModalEditar(data) {
            this.id = data.id,
                this.nombreMedico = data.nombreMedico,
                this.apellidoPaternoMedico = data.apellidoPaternoMedico,
                this.apellidoMaternoMedico = data.apellidoMaternoMedico,
                this.telefonoMedico = data.telefonoMedico,
                this.areaMedico = data.areaMedico,
                this.remision = data.remision,
                this.usuarioMedico = data.usuarioMedico,
                this.contraseñaMedico = data.contraseñaMedico,
                this.contraseñaTemporal = data.contraseñaTemporal,
                this.tituloModal = "Editar Medico",
                this.btnCrear = false;
            this.btnActualizar = true;
        }
    },
    beforeMount() {
        this.consultaDoctores();
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
    margin: 10px 30px;
    display: grid;
    grid-template-columns: 70% 30%;
}

.car-body {
    margin: 20px auto;
    font-size: 14px;
}

.car-body th {
    font-weight: 700;
}

#editarModal {
    display: flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>