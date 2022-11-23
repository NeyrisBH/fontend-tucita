<template>
    <div class="container">
        <div class="card-header-flex">
            <h3>Doctores</h3>
            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#registerModal">Insertar</button>
        </div>
        <div class="car-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>IDENTIFICACION</th>
                        <th>TIPO</th>
                        <th>LUGAR</th>
                        <th>FECHA</th>
                        <th>PACIENTE</th>
                        <th>AREA</th>
                        <th>MEDICO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>identificacion</td>
                        <td>tipo</td>
                        <td>lugar</td>
                        <td>fecha</td>
                        <td>paciente</td>
                        <td>area</td>
                        <td>madico</td>
                        <td>
                            <div class="buttons-acciones">
                                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#editarModal">
                                    <img src="../assets/svg/edit.svg" alt="">
                                </button>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#eliminarModal">
                                    <img src="../assets/svg/delete.svg" alt="">
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titulo: 'TuCita.com'
        }
    }
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

    #editarModal {
        display: flexbox;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>