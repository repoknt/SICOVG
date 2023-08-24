var tblTodo;
$(function () {
    function buscarLibres() {
        tblTodo = $('#data').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'buscarLibres',
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresaDn.empresa.cuenta"},
                {"data": "empresaDn.empresa.RFC"},
                {"data": "empresaDn.empresa.tipoCliente"},
                {"data": "plan.plan"},
                {"data": "empresaDn.dn"},
                {"data": "empresaDn.empresa.activo"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "plazo"},
                {"data": "mesesRestantes"},
                {"data": "empleado.full_name"},
                {"data": "empresaDn.empresa.cuenta"},
            ],
            columnDefs: [ //Se procede a agregar un botón con código HTML
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var buttons = '<a href="#!" rel="detalle" title="Detalle" type="button" class="btn btn-success btn-xs btn-flat"><i class="fas fa-clipboard"></i></a> ';
                        buttons += '<a href="/erp/cancelarLineas/' + data + '" target="_blank" rel="cancelar" title="Cancelar Linea" type="button" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-ban"></i></a> ';
                        buttons += '<a href="#!" rel="paternidad" title="Cambiar Paternidad" type="button" class="btn btn-dark btn-xs btn-flat"><i class="fas fa-user"></i></a> ';
                        return buttons;
                    }
                }
            ],

            initComplete: function (settings, json) {
            }
        });
    }

    function buscarTablaPorAccion(action) {
        tblTodo = $('#data').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': action,
                    'ejecutivo': document.getElementById('slcEmpleado').value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresaDn.empresa.cuenta"},
                {"data": "empresaDn.empresa.RFC"},
                {"data": "empresaDn.empresa.tipoCliente"},
                {"data": "plan.plan"},
                {"data": "empresaDn.dn"},
                {"data": "empresaDn.empresa.activo"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "plazo"},
                {"data": "mesesRestantes"},
                {"data": "empleado.full_name"},
                {"data": "empresaDn.empresa.cuenta"},
            ],
            columnDefs: [ //Se procede a agregar un botón con código HTML
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var buttons = '<a href="#!" rel="detalle" title="Detalle" type="button" class="btn btn-success btn-xs btn-flat"><i class="fas fa-clipboard"></i></a> ';
                        buttons += '<a href="/erp/cancelarLineas/' + data + '" target="_blank" rel="cancelar" title="Cancelar Linea" type="button" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-ban"></i></a> ';
                        buttons += '<a href="#!" rel="paternidad" title="Cambiar Paternidad" type="button" class="btn btn-dark btn-xs btn-flat"><i class="fas fa-user"></i></a> ';
                        return buttons;
                    }
                }
            ],
            initComplete: function (settings, json) {
            }
        });
    }

    function buscarTodo() {
        tblTodo = $('#data').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'buscarTodo',
                    'cuenta': document.getElementById('bCuenta').value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresaDn.empresa.cuenta"},
                {"data": "empresaDn.empresa.RFC"},
                {"data": "empresaDn.empresa.tipoCliente"},
                {"data": "plan.plan"},
                {"data": "empresaDn.dn"},
                {"data": "empresaDn.empresa.activo"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "plazo"},
                {"data": "mesesRestantes"},
                {"data": "empleado.full_name"},
                {"data": "empresaDn.empresa.cuenta"},
            ],
            columnDefs: [ //Se procede a agregar un botón con código HTML
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var buttons = '<a href="#!" rel="detalle" title="Detalle" type="button" class="btn btn-success btn-xs btn-flat"><i class="fas fa-clipboard"></i></a> ';
                        buttons += '<a href="/erp/cancelarLineas/' + data + '" target="_blank" rel="cancelar" title="Cancelar Linea" type="button" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-ban"></i></a> ';
                        buttons += '<a href="#!" rel="paternidad" title="Cambiar Paternidad" type="button" class="btn btn-dark btn-xs btn-flat"><i class="fas fa-user"></i></a> ';
                        return buttons;
                    }
                }
            ],

            initComplete: function (settings, json) {
            }
        });
    }

    $('#btnBuscarTodo').on('click', function (e) {
        e.preventDefault();
        validacion = /^(\d|)*\.?(\d|)*\.?(\d)*\d$/;
        if (validacion.test(document.getElementById('bCuenta').value)) {
            mensajeDeEspera();
            buscarTodo();
            document.getElementById("titulo1").textContent = "Todas las Cuentas";
        } else {
            mensajeDeCuentaNecesaria();
        }
    });

    $('#btnLibres').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        buscarLibres();
        document.getElementById("titulo1").textContent = "Cuentas Libres";
    });

    $('#btnCuentas').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        //buscarPorEjecutivo();
        buscarTablaPorAccion('buscarPorEjecutivo');
        document.getElementById("titulo1").textContent = "Cuentas por Ejecutivo";
    });

    $('#btnSinPaternidad').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        // buscarPorPaternidad();
        buscarTablaPorAccion('buscarPorPaternidad');
        document.getElementById("titulo1").textContent = "Cuentas sin Paternidad";
    });

    $('#btnPorRenovar').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        //buscarPorRenovacion();
        buscarTablaPorAccion('buscarPorRenovacion');
        document.getElementById("titulo1").textContent = "Cuentas por Renovar";
    });

    $('#btnCanceladas').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        buscarTablaPorAccion('buscarLineasCanceladas');
        document.getElementById("titulo1").textContent = "Líneas canceladas";
    });

    function mensajeDeEspera() {
        Swal.fire({
            title: 'Buscando Cuentas',
            text: '¡Espere un momento, estamos buscando los registros!',
            icon: 'success',
            timer: 3000,
        });
    }

    function mensajeDeCuentaNecesaria() {
        Swal.fire({
            title: 'Cuenta Invalida',
            text: '¡Debes ingresar una cuenta valida!',
            icon: 'error',
            timer: 6000,
        });
    }

    /*
     * Botón que permitira habilitar el cambio de paternidad*/
    $('#data tbody').on('click', 'a[rel="paternidad"]', function () {
        var tr = tblTodo.cell($(this).closest('td')).index();
        var data = tblTodo.row(tr.row).data();
        document.getElementById("cuenta").value = data.empresaDn.empresa.cuenta;
        $('#modalPaternidad').modal('show');
    });
    /*
     * Botón que efectua el cambio de paternidad y envio se parametros con POST
     * */
    $('#cambiar').on('click', function (e) {
        e.preventDefault();
        var datos = {
            action: 'cambioP',
            cuenta: document.getElementById("cuenta").value,
            tPaternidad: document.getElementById("tPaternidad").value
        };
        $.post(window.location.pathname, datos, function (res) {
            $('#modalPaternidad').modal('hide');
            Swal.fire({
                title: 'Correcto',
                text: '¡Se ha atualizado correctamente!',
                icon: 'success',
                timer: 2000,
            });
        });
    });
    /*
     * Envío de parametros para detalle de Cuenta
     * */
    $('#data tbody').on('click', 'a[rel="detalle"]', function () {
        //Extraemos los valores de la fila
        var tr = tblTodo.cell($(this).closest('td', 'li')).index();
        var data = tblTodo.row(tr.row).data();
        // Mostramos el modal
        $('#modalDetalle').modal('show');
        var datos = {action: 'detalleC', cuenta: data.empresaDn.empresa.cuenta};
        //Metodo post y muestra de parametros
        $.post(window.location.pathname, datos, function (res) {
            if (res) {
                document.getElementById('numeroLineas').textContent = res.numeroLineas;
                document.getElementById('ideal').textContent = res.ideal;
                document.getElementById('total').textContent = res.total;
                document.getElementById('politica').textContent = res.politica;
            }
        });
    });
});