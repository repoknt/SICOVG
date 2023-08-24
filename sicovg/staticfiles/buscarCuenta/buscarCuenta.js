var tblTodo;
// var tblRenovar;
// var tblPaternidad;
$(function () {
    //JSON y funciones de los botones de BuscarTodo
    function buscarTodo() {
        tblTodo = $('#data').DataTable({
            //responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'todo',
                    'tipoCampo': document.getElementById("tipoCampo").value,
                    'valor': document.getElementById("valor").value,
                    'cuenta': document.getElementById("cuenta").value,
                    'idU': document.getElementById("idU").value
                },
                dataSrc: "",
                headers: {
                    'X-CSRFToken': csrftoken
                },
            },
            columns: [
                {"data": "empresaDn.empresa.razonSocial"},
                {"data": "empresaDn.empresa.tipoCliente"},
                {"data": "empresaDn.empresa.cuenta"},
                {"data": "empresaDn.empresa.RFC"},
                {"data": "empresaDn.dn"},
                {"data": "empresaDn.empresa.activo"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "plan.plan"},
                {"data": "plazo"},
                {"data": "mesesRestantes"},
                {"data": "empleado.id"},
            ],
            columnDefs: [
                {
                    targets: [-1],
                    class: 'text-center',
                    render: function (data, type, row) {
                        if (data == idU.value) {
                            var buttons = '<a href="#!" rel="detalle" title="Detalle" type="button" class="btn btn-success btn-xs btn-flat"><i class="fas fa-clipboard"></i></a> ';
                            buttons += '<a href="/erp/cancelarLineas/' + row.empresaDn.empresa.cuenta + '/" target="_blank" rel="cancelar" title="Cancelar Linea" type="button" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-ban"></i></a> ';
                            buttons += '<a href="#!" rel="paternidad" title="Cambiar Paternidad" type="button" class="btn btn-dark btn-xs btn-flat"><i class="fas fa-user"></i></a> ';
                        } else {
                            var buttons = '<a href="#!" type="button" class="btn btn-success btn-xs btn-flat"></a> ';
                        }
                        return buttons;
                    }
                },
            ],
            initComplete: function (settings, json) {
                if (json[0]) {
                    document.getElementById("empleadoA").textContent = json[0].empleado.full_name;
                    document.getElementById("cuenta").value = json[0].empresaDn.empresa.cuenta;
                    document.getElementById("tipoTabla").textContent = "Todo sobre cuenta ";
                    //document.getElementById("cuentas").textContent = json[0].empresaDn.empresa.cuenta;
                }
            }
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
    /*
    * Botón que buscara todo sobre la cuenta
    * */
    $('#btnTodo').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        buscarTodo();
    });

    //JSON y botones de Renovar
    function porRenovar() {
        tblTodo = $('#data').DataTable({
            //responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'renovar',
                    'idU': document.getElementById("idU").value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresaDn.empresa.razonSocial"},
                {"data": "empresaDn.empresa.tipoCliente"},
                {"data": "empresaDn.empresa.cuenta"},
                {"data": "empresaDn.empresa.RFC"},
                {"data": "empresaDn.dn"},
                {"data": "empresaDn.empresa.activo"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "plan.plan"},
                {"data": "plazo"},
                {"data": "mesesRestantes"},
                {"data": "empleado.id"},
            ],
            columnDefs: [
                {
                    targets: [-1],
                    class: 'text-center',
                    render: function (data, type, row) {
                        var buttons = '<a href="#!" rel="detalle" title="Detalle" type="button" class="btn btn-success btn-xs btn-flat"><i class="fas fa-clipboard"></i></a> ';
                        buttons += '<a href="/erp/cancelarLineas/' + row.empresaDn.empresa.cuenta + '/"  target="_blank" rel="cancelar" title="Cancelar Linea" type="button" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-ban"></i></a> ';
                        buttons += '<a href="#!" rel="paternidad" title="Cambiar Paternidad" type="button" class="btn btn-dark btn-xs btn-flat"><i class="fas fa-user"></i></a> ';
                        return buttons;
                    }
                },
            ],
            initComplete: function (settings, json) {
                if (json[0]) {
                    document.getElementById("empleadoA").textContent = json[0].empleado.full_name;
                    document.getElementById("tipoTabla").textContent = "Cuentas por Renovar"
                }
            }
        });
    }

    $('#btnRenovar').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        porRenovar();
    });

    //JSON y funciones de los botones de SIN PATERNIDAD
    function sinPaternidad() {
        tblTodo = $('#data').DataTable({
            //responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            "scrollX": true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'pater',
                    'idU': document.getElementById("idU").value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresaDn.empresa.razonSocial"},
                {"data": "empresaDn.empresa.tipoCliente"},
                {"data": "empresaDn.empresa.cuenta"},
                {"data": "empresaDn.empresa.RFC"},
                {"data": "empresaDn.dn"},
                {"data": "empresaDn.empresa.activo"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "plan.plan"},
                {"data": "plazo"},
                {"data": "mesesRestantes"},
                {"data": "empleado.id"},
            ],
            columnDefs: [
                {
                    targets: [-1],
                    class: 'text-center',
                    render: function (data, type, row) {
                        ;
                        if (data == idU.value) {
                            var buttons = '<a href="#!" rel="detalle" title="Detalle" type="button" class="btn btn-success btn-xs btn-flat"><i class="fas fa-clipboard"></i></a> ';
                            buttons += '<a href="/erp/cancelarLineas/' + row.empresaDn.empresa.cuenta + '/" target="_blank" title="Cancelar Linea" type="button" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-ban"></i></a> ';
                            buttons += '<a href="#!" rel="paternidad" title="Cambiar Paternidad" type="button" class="btn btn-dark btn-xs btn-flat"><i class="fas fa-user"></i></a> ';
                        } else {
                            var buttons = '<a href="#!" type="button" class="btn btn-success btn-xs btn-flat"></a> ';
                        }
                        return buttons;
                    }
                },
            ],
            initComplete: function (settings, json) {
                if (json[0]) {
                    document.getElementById("empleadoA").textContent = json[0].empleado.full_name;
                    document.getElementById("tipoTabla").textContent = "Cuentas sin Paternidad"
                }
            }
        });
    }

    // Boton que busca las cuentas sin paternidad del usuario en sesión
    $('#btnPaternidad').on('click', function (e) {
        e.preventDefault();
        mensajeDeEspera();
        sinPaternidad();
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