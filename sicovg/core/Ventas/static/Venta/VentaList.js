var tablaDN;
var validarBotones = 0;
var tblOrdenes;
var contador = 0;
var i = 0;
var selectEquipos = "";
$(function () {

    // Boton que permite enviar el ajax para extraer los datos de la empresa
    $('#btnDetalle').click(function (e) {
        e.preventDefault();
        var campo = $('#tipoCampo').val();
        var valor = $('#valor').val();
        var action = 'BuscarCuenta';
        var data = {campo: campo, valor: valor, action: action};
        $.post(window.location.pathname, data, function (res) {
            if (res.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La cuenta no existe, verifique que sea valida',
                })
            } else {
            document.getElementById('razonSocial').value = res.razonSocial;
            document.getElementById('cuenta').value = res.cuenta;
            document.getElementById('RFC').value = res.RFC;
            document.getElementById('codigoPostal').value = res.codigoPostal;
            document.getElementById('estado').value = res.estado;
            document.getElementById('municipio').value = res.municipio;
            document.getElementById('colonia').value = res.colonia;
            document.getElementById('telefono').value = res.telefono;
            document.getElementById('email').value = res.email;


            }
        });
    });

    //funcion de validaciones
    function validarFormulario() {
        var nombres = /^[a-zA-ZÀ-ÿ\s]{8,128}$/; // Letras y espacios, pueden llevar acentos.
        var telefono = /^\d{10}$/; //  10
        var idCuent = /^\d{9}$/; //  10
        var curp = /^[a-zA-ZÀ-ÿ\d]{10,13}$/; // Letras, numeros
        var correo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var social = /^.[a-zA-ZÀ-ÿ\s\d]{9,128}$/;
        var valCuenta = /^(\d|)*\.?(\d|)*\.?(\d)*\d$/;
        if (valCuenta.test(document.getElementById('id_cuenta').value)) {
            if (idCuent.test(document.getElementById('id_idCuenta').value)) {
                if (curp.test(document.getElementById('id_RFC').value)) {
                    if (correo.test(document.getElementById('id_email').value)) {
                        if (nombres.test(document.getElementById('id_representanteLegal').value)) {
                            if (telefono.test(document.getElementById('id_telefono1').value)) {
                                if (telefono.test(document.getElementById('id_telefono2').value)) {
                                    if (nombres.test(document.getElementById('id_personaAutorizada1').value)) {//
                                        if (telefono.test(document.getElementById('id_telefonoPersonaAutorizada1').value)) {
                                            if (nombres.test(document.getElementById('id_personaAutorizada2').value)) {//
                                                if (telefono.test(document.getElementById('id_telefonoPersonaAutorizada2').value)) {
                                                    return true;
                                                } else {
                                                    Swal.fire({
                                                        title: 'Error!',
                                                        text: 'TelefonoPersonaAutorizada2 inválido',
                                                        icon: 'error'
                                                    });
                                                }
                                            } else {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'PersonaAutorizada2 inválido',
                                                    icon: 'error'
                                                });
                                            }
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'TelefonoPersonaAutorizada1 inválido',
                                                icon: 'error'
                                            });
                                        }
                                    } else {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'PersonaAutorizada1 inválido',
                                            icon: 'error'
                                        });
                                    }
                                } else {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Teléfono2 inválido',
                                        icon: 'error'
                                    });
                                }
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Teléfono1 inválido',
                                    icon: 'error'
                                });
                            }
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Representante legal inválido',
                                icon: 'error'
                            });
                        }
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Correo inválido',
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'RFC inválido',
                        icon: 'error'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Id de la Cuenta inválido, solo se permiten 9 números',
                    icon: 'error'
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Cuenta inválida, no se permite letras',
                icon: 'error'
            });
        }
        return false;
    }

    // Boton submit del formulario, para petición con ajax
    $('form').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        if (validarFormulario()) {
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                Swal.fire({
                    title: 'Alerta',
                    text: '¡Se ha guardado correctamente!',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        // location.href = '{{ list_url }}';
                    }
                });
            });
        }
    });

    // Ajax para los DN que se encuentran relacionados con la cuenta
    function llamarDN(idemp) {
        tablaDN = $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'searchDN',
                    'idEmpresa': idemp
                },
                dataSrc: ""
            },
            columns: [
                {"data": "idVenta"},
                {"data": "ClienteId_id"},
                {"data": "plazo"},
                {"data": "plan.plan"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "idVenta"},
            ],
            columnDefs: [
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var buttons = '<a rel="orden" class="btn btn-success btn-xs"><i class="fas fa-plus-circle"></i></a> ';
                        return buttons;
                    }
                },
            ],
            initComplete: function (settings, json) {

            }
        });
        // Index a la primer columna de la tabla
        tablaDN.on('order.dt search.dt', function () {
            tablaDN.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    }

    // acción del boton orden, que permite enviar un ajax para evaluar su agregación a orden
    $('#data tbody')
        .on('click', 'a[rel="orden"]', function () {
            var tr = tablaDN.cell($(this).closest('td, li')).index();
            var data = tablaDN.row(tr.row).data();
            var dnOrden = data.empresaDn.dn;
            var fecha = data.fechaTermino;
            var data = {action: 'agregarOrden', dn: dnOrden, fechaTermino: fecha};
            $.post(window.location.pathname, data, function (res) {
                if (res.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.error,
                    });
                }
                if (res.message) {
                    Swal.fire(
                        '¡Correcto!',
                        res.message,
                        'success'
                    );
                }
            });
        });
});

$(function () {
    selectEquipos = recuperarEquipos();
    // Definición de tabla ordenes
    tblOrdenes = $('#data').DataTable({
        "scrollX": true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        "paging": false,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'allOrden',
            },
            dataSrc: ""
        },
        columns: [
            {"data": ""}, // ID
            {"data": "movimiento"}, // Movimiento -5
            {"data": ""}, // Nom Producto -4
            {"data": ""}, // cantidad -5
            {"data": ""}, // Comentario -4
            {"data": ""}, // Precio  Unitario -3
            {"data": ""}, // Precio Total -2
            {"data": ""}, //X -1

        ],
        columnDefs: [
            {
                targets: [0],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return i.row + 1;
                },
            },
            {
                targets: [1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    if (data) {
                        if (row.estatusReal === "RECHAZO DE ALMACEN") {
                            data = "RECHAZO DE ALMACEN";
                        }
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="' + data + '" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    } else {
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="        NUEVA VENTA" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-6],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return Productos(i.row);
                },
            },
            {
                targets: [-5],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    input = '<input class="form form-control" value="1" type="text" name="IVA' + i.row + '" id="IVA' + i.row + '" style="padding: 0px;width:75px;" required>';
                    return input;
                },
            },
              {
                targets: [-4],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    if (data) {
                        if (row.estatusReal === "RECHAZO DE ALMACEN") {
                            data = "RECHAZO DE ALMACEN";
                        }
                        input = '<input type="text"  style="padding: 0px;font-size: 15px;width: 300px;" value="' + data + '" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    } else {
                        input = '<input type="text"  style="padding: 0px;font-size: 15px;width: 300px;" value="" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    }
                    return input;
                },
            },
              {
                targets: [-3],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    if (data) {
                        if (row.estatusReal === "RECHAZO DE ALMACEN") {
                            data = "RECHAZO DE ALMACEN";
                        }
                        input = '<input type="text" style="padding: 0px;font-size: 15px;width: 170px;" value="' + data + '" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    } else {
                        input = '<input type="text" style="padding: 0px;font-size: 15px;width: 170px;" value="" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    }
                    return input;
                },
            },
              {
                targets: [-2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    if (data) {
                        if (row.estatusReal === "RECHAZO DE ALMACEN") {
                            data = "RECHAZO DE ALMACEN";
                        }
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="' + data + '" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    } else {
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function () {
                    var buttons = '<a rel="delete" class="btn btn-danger btn-xs" title="Borrar"><i class="fas fa-trash"></i></a> ';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {
        }

    });

    tblOrdenes.on('order.dt search.dt', function () {
        tblOrdenes.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    // Boton para envio de documentos
    $('#button').click(function () {
        var table = document.getElementById("data");
        alert(table.rows.length - 1);
        var data = tblOrdenes.$('input, select').serialize();
        return false;
    });

    // Boton de agregar Fila
    $('#addRow').on('click', function (e) {
        e.preventDefault();
        tblOrdenes.row.add({}).draw();
        validarBotonGuardarOden();
    });

    // Eliminar fila
    $('#data tbody')
        .on('click', 'a[rel="delete"]', function () {
            var tr = tblOrdenes.cell($(this).closest('td, li')).index();
            var orden = tblOrdenes.row(tr.row).data();
            alert_action('Notificación', '¿Estas seguro de eliminar está fila?',
                function () {
                    if (orden.movimiento === 'RENOVACION') {
                        var data = {action: "removeOrden", id: orden.idOrden}
                        $.post(window.location.pathname, data, function (res) {
                        });
                    }
                    tblOrdenes.row(tr.row).remove().draw();
                    var numFilas = tblOrdenes.rows().count();
                    var indice = tr.row;
                    for (var i = tr.row + 1; i <= numFilas; i++) {
                        document.getElementById("mov" + i).setAttribute("name", "mov" + indice);
                        document.getElementById("mov" + i).setAttribute("id", "mov" + indice);
                        document.getElementById("dn" + i).setAttribute("name", "dn" + indice);
                        document.getElementById("dn" + i).setAttribute("id", "dn" + indice);
                        document.getElementById("plazoF" + i).setAttribute("name", "plazoF" + indice);
                        document.getElementById("plazoF" + i).setAttribute("id", "plazoF" + indice);
                        document.getElementById("equipo" + i).setAttribute("name", "equipo" + indice);
                        document.getElementById("equipo" + i).setAttribute("id", "equipo" + indice);
                        document.getElementById("color" + i).setAttribute("name", "color" + indice);
                        document.getElementById("color" + i).setAttribute("id", "color" + indice);
                        document.getElementById("plan" + i).setAttribute("name", "plan" + indice);
                        document.getElementById("plan" + i).setAttribute("id", "plan" + indice);
                        document.getElementById("plazo" + i).setAttribute("name", "plazo" + indice);
                        document.getElementById("plazo" + i).setAttribute("id", "plazo" + indice);
                        document.getElementById("IVA" + i).setAttribute("name", "IVA" + indice);
                        document.getElementById("IVA" + i).setAttribute("id", "IVA" + indice);
                        document.getElementById("addon" + i).setAttribute("name", "addon" + indice);
                        document.getElementById("addon" + i).setAttribute("id", "addon" + indice);
                        document.getElementById("DE" + i).setAttribute("name", "DE" + indice);
                        document.getElementById("DE" + i).setAttribute("id", "DE" + indice);
                        document.getElementById("AC" + i).setAttribute("name", "AC" + indice);
                        document.getElementById("AC" + i).setAttribute("id", "AC" + indice);
                        document.getElementById("DM" + i).setAttribute("name", "DM" + indice);
                        document.getElementById("DM" + i).setAttribute("id", "DM" + indice);

                        indice++;
                        tr.row++;
                    }
                }, function () {

                });
            validarBotonGuardarOden();
        });

    // Duplicar contenido del usuario
    $('#duplicarContenido').on('click', function () {
        (async () => {

            const {value: formValues} = await Swal.fire({
                title: 'Llenado Rápido',
                html:
                    '<label for="txtComentario" class="form-label">Fila a clonar:</label>' +
                    '<input id="swal-input1" class="swal2-input" placeholder="Fila a clonar">' +
                    '<label for="txtComentario" class="form-label">Desde:</label>' +
                    '<input id="swal-input2" class="swal2-input" placeholder="Desde">' +
                    '<label for="txtComentario" class="form-label">Hasta:</label>' +
                    '<input id="swal-input3" class="swal2-input" placeholder="Hasta">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value
                    ]
                }

            })
            var filaM = document.getElementById('swal-input1').value;
            var filaI = document.getElementById('swal-input2').value;
            var filaT = document.getElementById('swal-input3').value;
            if (filaM && filaI && filaT) {
                duplicarContenido(filaM, filaI, filaT);
            }
        })()
    });

    function duplicarContenido(filaM, filaI, filaT) {
        var filaMaestra = filaM - 1;
        var filaInicial = filaI - 1;
        var filaTermino = filaT - 1;

        var equipo = document.getElementById("equipo" + filaMaestra).value;
        var color = document.getElementById("color" + filaMaestra).value;
        var plan = document.getElementById("plan" + filaMaestra).value;
        var plazo = document.getElementById("plazo" + filaMaestra).value;
        var AddOn = document.getElementById("addon" + filaMaestra).value;
        var DE = document.getElementById("DE" + filaMaestra).value;
        var AC = document.getElementById("AC" + filaMaestra).value;
        var DM = document.getElementById("DM" + filaMaestra).value;
        var sinIva = document.getElementById("IVA" + filaMaestra).value;
        for (var i = filaInicial; i <= filaTermino; i++) {
            document.ready = document.getElementById("equipo" + i).value = equipo;
            document.ready = document.getElementById("color" + i).value = color;
            document.ready = document.getElementById("plan" + i).value = plan;
            document.ready = document.getElementById("plazo" + i).value = plazo;
            document.ready = document.getElementById("addon" + i).value = AddOn;
            document.getElementById("DE" + i).value = DE;
            document.getElementById("AC" + i).value = AC;
            document.getElementById("DM" + i).value = DM;
            document.getElementById("IVA" + i).value = sinIva;
        }
    }

    function recuperarEquipos() {
        var data = {action: 'buscarEquipos'};
        $.post(window.location.pathname, data, function (res) {
            selectEquipos = res;
            return res;
        });
        return res = [];
    }

//funcion que muestra los registros en un select
    function Productos(idInventario) {
        var Productos = '<select class="form-group-sm" style="font-size: 10px; margin: 0px;"  name="equipo' + idInventario + '" id="equipo' + idInventario + '">';
        for (const clave in selectEquipos) {
            Productos += '<option>' + selectEquipos[clave].modelo + '</option>';

        }
        selectEquipos += '</select>';
        return Productos;
    }


    function plazo(id) {
        var plazos = '<select class="form-group" style="font-size: 10px;" name="plazo' + id + '" id="plazo' + id + '">' +
            '<option value="12">12</option>' +
            '<option value="18">18</option>' +
            '<option value="24">24</option>' +
            '<option value="36">36</option>' +
            '</select>';
        return plazos;
    }

    $('#formatoEntrega').on('click', function () {
        document.getElementById('action').value = 'formatoEntrega';
        validarBotones++;
        validarBotonGuardarOden();
    });
    $('#formatoRojo').on('click', function () {
        document.getElementById('action').value = 'formatoRojo';
        validarBotones++;
        validarBotonGuardarOden();
    });
    $('#controlRenovaciones').on('click', function () {
        document.getElementById('action').value = 'controlRenovaciones';
    });
    $('#btnGuardar').on('click', function () {
        document.getElementById('action').value = 'guardarOrden';
    });

    function validarBotonGuardarOden() {
        var boton = document.getElementById('btnGuardar');
    }

    validarBotonGuardarOden();
});
