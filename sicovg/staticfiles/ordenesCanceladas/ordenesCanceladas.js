var tblTodo;
$(function () {
    function buscarEjecutivo() {
        tblTodo = $('#data').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'ejec',
                    'ejecutivo': document.getElementById('slcEmpleado').value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresadn.empresa.cuenta"},
                {"data": "empresadn.empresa.RFC"},
                {"data": "empresadn.empresa.razonSocial"},
                {"data": "fechaOrden"},
                {"data": "fechaActualizacion"},
                {"data": "empleado.full_name"},
                {"data": "comentario"},
                {"data": "analista"},
            ],
            initComplete: function (settings, json) {
            }
        });
    }

    function buscarCuentas() {
        tblTodo = $('#data').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'cuent',
                    'cuenta': document.getElementById('bCuenta').value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresadn.empresa.cuenta"},
                {"data": "empresadn.empresa.RFC"},
                {"data": "empresadn.empresa.razonSocial"},
                {"data": "fechaOrden"},
                {"data": "fechaActualizacion"},
                {"data": "empleado.full_name"},
                {"data": "comentario"},
                {"data": "analista"},
            ],
            initComplete: function (settings, json) {
            }
        });
    }

    function buscarTodos() {
        tblTodo = $('#data').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'todo',
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresadn.empresa.cuenta"},
                {"data": "empresadn.empresa.RFC"},
                {"data": "empresadn.empresa.razonSocial"},
                {"data": "fechaOrden"},
                {"data": "fechaActualizacion"},
                {"data": "empleado.full_name"},
                {"data": "comentario"},
                {"data": "analista"},
            ],
            initComplete: function (settings, json) {
            }
        });
    }

    $('#btnEjec').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        buscarEjecutivo();
        document.getElementById("titulo1").textContent = "Buscar Ejecutivo";
    });

    $('#btnCuenta').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        buscarCuentas();
        document.getElementById("titulo1").textContent = "Buscar Cuenta";
    });

    $('#btnTodo').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        buscarTodos();
        document.getElementById("titulo1").textContent = "Buscar Todo";
    });

    function mensajeDeEspera() {
        Swal.fire({
            title: 'Buscando Cuentas',
            text: '¡Espere un momento, estamos buscando los registros!',
            icon: 'success',
            timer: 3000,
        });
    }
});