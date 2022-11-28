<template>
    <div class="container">
        <div class="card-header-flex">
            <h3>Pacientes</h3>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#pacienteModal"
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
                        <th>EMAIL</th>
                        <th>FECHA DE NACIMIENTO</th>
                        <th>GENERO</th>
                        <th>CIUDAD</th>
                        <th>DIRECCION</th>
                        <th>CODIGO</th>
                        <th>USUARIO</th>
                        <th>CONTRASEÑA</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in pacientes">
                        <td>{{ paciente.id }}</td>
                        <td>{{ paciente.nombrePaciente }}</td>
                        <td>{{ paciente.apellidoPaternoPaciente }}</td>
                        <td>{{ paciente.apellidoMaternoPaciente }}</td>
                        <td>{{ paciente.telefonoPaciente }}</td>
                        <td>{{ paciente.emailPaciente }}</td>
                        <td>{{ paciente.fechaNacimientoPaciente }}</td>
                        <td>{{ paciente.generoPaciente }}</td>
                        <td>{{ paciente.ciudadResidenciaPaciente }}</td>
                        <td>{{ paciente.direccionResidenciaPaciente }}</td>
                        <td>{{ paciente.codigoAfiliacionPaciente }}</td>
                        <td>{{ paciente.usuarioPaciente }}</td>
                        <td>*********</td>
                        <td>
                            <div class="buttons-acciones">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#pacienteModal" @click="abrirModalEditar(paciente)">
                                    <img src="../assets/svg/edit.svg" alt="">
                                </button>
                                <button type="button" class="btn btn-danger" @click="eliminarConfPaciente(paciente.id)">
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
    <div class="modal fade" id="pacienteModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel"
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
                            <input v-model="nombrePaciente" type="text" class="form-control" id="nombres"
                                name="descripcion">
                        </div>
                        <div class="col-md-6">
                            <label for="primerApellido">Primer apellido</label>
                            <input v-model="apellidoPaternoPaciente" type="text" class="form-control"
                                id="primerApellido" name="primerApellido">
                        </div>
                        <div class="col-md-6">
                            <label for="segundoApellido">Segundo apellido</label>
                            <input v-model="apellidoMaternoPaciente" type="text" class="form-control"
                                id="segundoApellido" name="segundoApellido">
                        </div>
                        <div class="col-md-6">
                            <label for="telefono">Telefono</label>
                            <input v-model="telefonoPaciente" type="number" class="form-control" id="telefono"
                                name="telefono">
                        </div>
                        <div class="col-md-6">
                            <label for="correo">Correo electronico</label>
                            <input v-model="emailPaciente" type="text" class="form-control" id="correo" name="correo">
                        </div>
                        <div class="col-md-6">
                            <label for="fechaNacimiento">Fecha de nacimiento</label>
                            <input v-model="fechaNacimientoPaciente" type="date" class="form-control"
                                id="fechaNacimiento" name="fechaNacimiento">
                        </div>
                        <div class="col-md-6">
                            <label for="genero">Genero</label>
                            <input v-model="generoPaciente" type="text" class="form-control" id="genero" name="genero">
                        </div>
                        <div class="col-md-6">
                            <label for="ciudad">Ciudad</label>
                            <input v-model="ciudadResidenciaPaciente" type="text" class="form-control" id="ciudad"
                                name="ciudad">
                        </div>
                        <div class="col-md-6">
                            <label for="direción">Dirección</label>
                            <input v-model="direccionResidenciaPaciente" type="text" class="form-control" id="direción"
                                name="direción">
                        </div>
                        <div class="col-md-6">
                            <label for="codigoAfiliacion">Codigo de afiliación</label>
                            <input v-model="codigoAfiliacionPaciente" type="number" class="form-control"
                                id="direcodigoAfiliacionción" name="codigoAfiliacion">
                        </div>
                        <div class="col-md-6">
                            <label for="usuario">Usuario</label>
                            <input v-model="usuarioPaciente" type="text" class="form-control" id="usuario"
                                name="usuario">
                        </div>
                        <div class="col-md-6">
                            <label for="usuario">Contraseña</label>
                            <input v-model="contraseñaPaciente" type="password" class="form-control" id="contraseña"
                                name="contraseña">
                        </div>
                        <div class="col-md-6">
                            <label for="usuario">Confirmar contraseña</label>
                            <input v-model="contraseñaTemporal" type="password" class="form-control"
                                id="contraseñaTemporal" name="contraseñaTemporal">
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button @click="validarPaiente" class="btn btn-primary" v-if="btnCrear">Guardar</button>
                        <button @click="validarPacienteActualizar" class="btn btn-primary" v-if="btnActualizar">Actualizar</button>
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
            pacientes: [],
            btnCrear: false,
            btnActualizar: false,
            id: null,
            nombrePaciente: '',
            apellidoPaternoPaciente: '',
            apellidoMaternoPaciente: '',
            telefonoPaciente: null,
            emailPaciente: '',
            fechaNacimientoPaciente: '',
            generoPaciente: '',
            ciudadResidenciaPaciente: '',
            direccionResidenciaPaciente: '',
            codigoAfiliacionPaciente: null,
            usuarioPaciente: '',
            contraseñaPaciente: '',
            contraseñaTemporal: ''
        };
    },
    methods: {
        async consultaPacientes() {
            const opciones = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjpkZTAzMDgyNy0yZTI5LTQxMGUtYTgxNi0zMzUzMjlhNWU5YzI="
                }
            };
            fetch("http://localhost:8080/api/pacientes", opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        console.log(error.message);
                        throw error;
                    }
                    else {
                        this.pacientes = await response.json();
                    }
                });
        },
        limpiarForm(){
            this.id = null,
            this.nombrePaciente = '',
            this.apellidoPaternoPaciente = '',
            this.apellidoMaternoPaciente = '',
            this.telefonoPaciente = null,
            this.emailPaciente = '',
            this.fechaNacimientoPaciente = '',
            this.generoPaciente = '',
            this.ciudadResidenciaPaciente = '',
            this.direccionResidenciaPaciente = '',
            this.codigoAfiliacionPaciente = null,
            this.usuarioPaciente = '',
            this.contraseñaPaciente = '',
            this.contraseñaTemporal = ''
        },
        async crearPaciente() {
            const opciones = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjpkZTAzMDgyNy0yZTI5LTQxMGUtYTgxNi0zMzUzMjlhNWU5YzI="
                },
                body: JSON.stringify({
                    id: this.id,
                    nombrePaciente: this.nombrePaciente,
                    apellidoPaternoPaciente: this.apellidoPaternoPaciente,
                    apellidoMaternoPaciente: this.apellidoMaternoPaciente,
                    telefonoPaciente: this.telefonoPaciente,
                    emailPaciente: this.emailPaciente,
                    fechaNacimientoPaciente: this.fechaNacimientoPaciente,
                    generoPaciente: this.generoPaciente,
                    ciudadResidenciaPaciente: this.ciudadResidenciaPaciente,
                    direccionResidenciaPaciente: this.direccionResidenciaPaciente,
                    codigoAfiliacionPaciente: this.codigoAfiliacionPaciente,
                    usuarioPaciente: this.usuarioPaciente,
                    contraseñaPaciente: this.contraseñaPaciente
                })
            };
            fetch("http://localhost:8080/api/pacientes", opciones)
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
                        this.consultaPacientes();
                    }
                });
        },
        validarPaiente(){
            if (this.contraseñaPaciente == this.contraseñaTemporal) {
                this.crearPaciente();
            } else {
                alert('Las contraseñas no conciden');
            }
        },
        async actualizarPaciente(id) {
            const opciones = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic Basic dXNlcjplYzNmNjIxZi03YWIxLTQxZDctODJmNi1iZjY4ZjZiMDVmZTE="
                },
                body: JSON.stringify({
                    id: this.id,
                    nombrePaciente: this.nombrePaciente,
                    apellidoPaternoPaciente: this.apellidoPaternoPaciente,
                    apellidoMaternoPaciente: this.apellidoMaternoPaciente,
                    telefonoPaciente: this.telefonoPaciente,
                    emailPaciente: this.emailPaciente,
                    fechaNacimientoPaciente: this.fechaNacimientoPaciente,
                    generoPaciente: this.generoPaciente,
                    ciudadResidenciaPaciente: this.ciudadResidenciaPaciente,
                    direccionResidenciaPaciente: this.direccionResidenciaPaciente,
                    codigoAfiliacionPaciente: this.codigoAfiliacionPaciente,
                    usuarioPaciente: this.usuarioPaciente,
                    contraseñaPaciente: this.contraseñaPacientes
                })
            };
            fetch(`http://localhost:8080/api/pacientes/d/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.consultaPacientes();
                    }
                });
        },
        async eliminarPaciente(id) {
            const opciones = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    "Authorization": "Basic dXNlcjpkZTAzMDgyNy0yZTI5LTQxMGUtYTgxNi0zMzUzMjlhNWU5YzI="
                }
            };
            fetch(`http://localhost:8080/api/pacientes/d/${id}`, opciones)
                .then(async (response) => {
                    if (!response.ok) {
                        const error = new Error(response.statusText);
                        error.json = response.json();
                        throw error;
                    }
                    else {
                        const data = await response.json();
                        console.log(data);
                        this.consultaPacientes();
                    }
                });
        },
        eliminarConfPaciente(id) {
            if (!confirm('¿Esta seguro de eliminar el paciente?')) return;

            this.eliminarPaciente(id);
        },
        validarPacienteActualizar() {
            if (this.contraseñaPaciente == this.contraseñaTemporal) {
                this.actualizarPaciente(this.id);
            } else {
                alert('Las contraseñas no conciden');
            }
        },
        abrirModalRegistrar() {
            this.id = null,
            this.nombrePaciente = '',
            this.apellidoPaternoPaciente = '',
            this.apellidoMaternoPaciente = '',
            this.telefonoPaciente = null,
            this.emailPaciente = '',
            this.fechaNacimientoPaciente = '',
            this.generoPaciente = '',
            this.ciudadResidenciaPaciente = '',
            this.direccionResidenciaPaciente = '',
            this.codigoAfiliacionPaciente = null,
            this.usuarioPaciente = '',
            this.contraseñaPaciente = '',
            this.contraseñaTemporal = '',
            this.tituloModal = "Registrar Paciente",
            this.btnCrear = true;
            this.btnActualizar = false;
        },
        abrirModalEditar(data) {
            this.id = data.id,
            this.nombrePaciente = data.nombrePaciente,
            this.apellidoPaternoPaciente = data.apellidoPaternoPaciente,
            this.apellidoMaternoPaciente = data.apellidoMaternoPaciente,
            this.telefonoPaciente = data.telefonoPaciente,
            this.emailPaciente = data.emailPaciente,
            this.fechaNacimientoPaciente = data.fechaNacimientoPaciente,
            this.generoPaciente = data.generoPaciente,
            this.ciudadResidenciaPaciente = data.ciudadResidenciaPaciente,
            this.direccionResidenciaPaciente = data.direccionResidenciaPaciente,
            this.codigoAfiliacionPaciente = data.codigoAfiliacionPaciente,
            this.usuarioPaciente = data.usuarioPaciente,
            this.contraseñaPaciente = data.contraseñaPaciente,
            this.contraseñaTemporal = data.contraseñaTemporal,
            this.tituloModal = "Editar Medico",
            this.btnCrear = false;
            this.btnActualizar = true;
        }
    },
    beforeMount() {
        this.consultaPacientes();
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
    font-size: 12px;
}

.car-body th {
    font-weight: 900;
}

#editarModal {
    display: flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>