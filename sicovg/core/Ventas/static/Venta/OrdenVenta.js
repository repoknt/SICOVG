var validarBotones = 0;
var tblOrdenes;
var contador = 0;
var i = 0;
var selectEquipos = "";
$(function () {
    selectEquipos = RProductos();
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
            {"data": ""}, // Movimiento -10
            {"data": "movimiento"}, // Movimiento -9
            {"data": ""}, // Equipo -6
            {"data": ""}, // Equipo -6
            {"data": ""}, // Color -5
            {"data": ""},// plan -4
            {"data": ""}, // DE sin iva -2
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
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="                Venta" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [2],
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
                    if (data) {
                        var input = '<input type="text"  readonly value="' + data + '" style="padding: 0px;" class="form-control input-sm" name="plazoF' + i.row + '" id="plazoF' + i.row + '">';
                    } else {
                        var input = '<input type="text"  readonly value="" style="padding: 0px;" class="form-control input-sm" name="plazoF' + i.row + '" id="plazoF' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-4],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    input = '<input class="form form-control" value="0" type="text" name="IVA' + i.row + '" id="IVA' + i.row + '" style="padding: 0px;width:75px;" required>';
                    return input;
                },
            },
            {
                targets: [-3],
                class: 'text-center',
                orderable: false,
               render: function (data, type, row, i) {
                    if (data) {
                        var input = '<input type="text"  readonly value="' + data + '" style="padding: 0px;" class="form-control input-sm" name="plazoF' + i.row + '" id="plazoF' + i.row + '">';
                    } else {
                        var input = '<input type="text"  readonly value="" style="padding: 0px;" class="form-control input-sm" name="plazoF' + i.row + '" id="plazoF' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-2],
                class: 'text-center',
                orderable: false,
            render: function (data, type, row, i) {
                    if (data) {
                        var input = '<input type="text"  readonly value="' + data + '" style="padding: 0px;" class="form-control input-sm" name="Descripcion' + i.row + '" id="Descripcion' + i.row + '">';
                    } else {
                        var input = '<input type="text"  readonly value="" style="padding: 0px;" class="form-control input-sm" name="Descripcion' + i.row + '" id="Descripcion' + i.row + '">';
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
                        document.getElementById("Descripcion" + i).setAttribute("name", "Descripcion" + indice);
                        document.getElementById("Descripcion" + i).setAttribute("id", "Descripcion" + indice);
                        document.getElementById("equipo" + i).setAttribute("name", "equipo" + indice);
                        document.getElementById("equipo" + i).setAttribute("id", "equipo" + indice);
                        document.getElementById("color" + i).setAttribute("name", "color" + indice);
                        document.getElementById("color" + i).setAttribute("id", "color" + indice);
                        document.getElementById("plan" + i).setAttribute("name", "plan" + indice);
                        document.getElementById("plan" + i).setAttribute("id", "plan" + indice);
                        indice++;
                        tr.row++;
                    }
                }, function () {

                });
        });


//Funcion que recupera los registros de la tabla EQUIPOS
    function RProductos() {
        var data = {action: 'RProductos'};
        $.post(window.location.pathname, data, function (res) {
            selectEquipos = res;
            return res;
        });
        return [];
    }

//funcion que muestra los registros en un select
    function Productos(id) {
        var Productos = '<select class="form-group-sm" style="font-size: 15px; margin: 1px;"  name="producto' + id + '" id="producto' + id + '">';
        for (const clave in selectEquipos) {
            Productos += '<option>' + selectEquipos[clave].NombresProducto + '</option>';
        }
        Productos += '</select>';
        return Productos;
    }



    $('#btnGuardar').on('click', function () {
        document.getElementById('action').value = 'guardarOrden';
    });
});
