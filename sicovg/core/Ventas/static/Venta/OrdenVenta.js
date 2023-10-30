var validarBotones = 0;
var tblOrdenes;
var contadorFilas = 0;
var selectEquipos = "";
var valoresGenerados = {};
$(function () {
    selectEquipos = RProductos();
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
            {"data": ""}, // Color -5
            {"data": ""},// plan -4
            {"data": ""}, // DE sin iva -2
            {"data": ""}, // Comentario -2
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
                        input = '<input type="text" readonly  style="padding: 0px;font-size: 15px;width: 170px;" value="' + data + '" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    } else {
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="Pendiente" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
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
                        var input = '<input type="text" readonly  value="' + data + '" style="padding: 0px;" class="form-control input-sm" name="Precio' + i.row + '" id="Precio' + i.row + '">';
                    } else {
                        var input = '<input type="text" readonly value="" style="padding: 0px;" class="form-control input-sm" name="Precio' + i.row + '" id="Precio' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-4],
                 class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                       if (data) {
                           var input = '<input type="number" value="' + data + '" min="0" style="padding: 0px;" class="form-control input-sm cantidad" name="Precio' + i.row + '" id="Precio' + i.row + '">';
                       } else {
                           var input = '<input type="number" value="" min="0" style="padding: 0px;" class="form-control input-sm cantidad" name="Precio' + i.row + '" id="Precio' + i.row + '">';
             }
        return input;
    },
},
            {
                targets: [-3],
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
                targets: [-2],
                class: 'text-center',
                orderable: false,
        render: function (data, type, row, i) {
    var id = i.row;
    var comentario = valoresGenerados[id] ? valoresGenerados[id].nombreProducto : '';
    var input = '<input type="text" value="' + comentario + '" style="padding: 0px;" class="form-control input-sm comentario" data-id="' + id + '" name="Comentario' + id + '" id="Comentario' + id + '">';
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

    $('#button').click(function () {
        var table = document.getElementById("data");
        alert(table.rows.length - 0);
        var data = tblOrdenes.$('input, select').serialize();
        return false;
    });

  // Declara una variable para mantener el conteo de filas
var contadorFilas = 0;
$('#addRow').on('click', function (e) {
        e.preventDefault();
        // Agrega una nueva fila a la tabla
        tblOrdenes.row.add({}).draw();

        // Incrementa el contador de filas
        contadorFilas++;

        // Inicializa los valores para la nueva fila
        var id = contadorFilas;
        valoresGenerados[id] = {
            nombreProducto: '',
            precioTotal: 0,
            precioUnitario: 0,
            comentario: ''
        };

        console.log('Número total de filas: ' + contadorFilas);
    });

    $('#data tbody').on('click', 'a[rel="delete"]', function () {
        var tr = tblOrdenes.cell($(this).closest('td, li')).index();
        var id = tr.row; // Obtén el ID de la fila antes de eliminarla
        var orden = tblOrdenes.row(tr.row).data();
        alert_action('Notificación', '¿Estás seguro de eliminar esta fila?',
            function () {
                // Restablece el contador de filas después de eliminar una fila
                contadorFilas--;


                tblOrdenes.row(tr.row).remove().draw();

                // Actualiza los elementos del DOM con los nuevos índices
                for (var i = id; i < contadorFilas; i++) {
                    document.getElementById("mov" + (i + 1)).setAttribute("name", "mov" + i);
                    document.getElementById("mov" + (i + 1)).setAttribute("id", "mov" + i);
                    document.getElementById("Precio" + (i + 1)).setAttribute("name", "Precio" + i);
                    document.getElementById("Precio" + (i + 1)).setAttribute("id", "Precio" + i);
                    document.getElementById("Descripcion" + (i + 1)).setAttribute("name", "Descripcion" + i);
                    document.getElementById("Descripcion" + (i + 1)).setAttribute("id", "Descripcion" + i);
                    document.getElementById("Productos" + (i + 1)).setAttribute("name", "Productos" + i);
                    document.getElementById("Productos" + (i + 1)).setAttribute("id", "Productos" + i);
                    document.getElementById("Comentario" + (i + 1)).setAttribute("name", "Comentario" + i);
                    document.getElementById("Comentario" + (i + 1)).setAttribute("id", "Comentario" + i);
                    document.getElementById("plan" + (i + 1)).setAttribute("name", "plan" + i);
                    document.getElementById("plan" + (i + 1)).setAttribute("id", "plan" + i);
                }
            }, function () {

            });
    });
    function RProductos() {
        var data = {action: 'RProductos'};
        $.post(window.location.pathname, data, function (res) {
            selectEquipos = res;
            return res;
        });
        return [];
    }

   function Productos(id) {
    var Productos = '<select class="form-group-sm producto-select" style="font-size: 15px; margin: 1px;"  name="producto' + id + '" id="producto' + id + '">';
    for (const clave in selectEquipos) {
        var nombreProducto = selectEquipos[clave].NombresProducto;
        var precioProducto = selectEquipos[clave].PrecioUnitario;
        Productos += '<option data-precio="' + precioProducto + '">' + nombreProducto + '</option>';
        console.log('Nombre del producto: ' + nombreProducto);
    }

    Productos += '</select>';
    return Productos;
}

$(document).on('change', '.producto-select', function() {
    var selectedOption = $(this).find(':selected');
    var precioUnitario = selectedOption.data('precio');
    var id = $(this).attr('id').replace('producto', '');
    var totalP = // Obtén el número de fila
    $('#Precio' + id).val(precioUnitario);
});
 $(document).on('change', '.comentario', function() {
    var id = $(this).data('id');
    var nombreProducto = valoresGenerados[id] ? valoresGenerados[id].nombreProducto : '';
    console.log('Nombre del producto para la fila ' + id + ': ' + nombreProducto);
});


 // Crea un objeto para almacenar los valores generados
var valoresGenerados = {};

 $(document).on('change', '.cantidad', function () {
        var cantidad = $(this).val();
        var id = $(this).attr('id').replace('Precio', '');
        var nombreProducto = $('#producto' + id + ' option:selected').text();
        var precioUnitario = parseFloat($('#producto' + id + ' option:selected').data('precio'));
        var precioTotal = cantidad * precioUnitario;
        $('#Descripcion' + id).val(precioTotal);



        valoresGenerados[id] = {
            movimiento: $('#mov'+id).val(),
            nombreProducto: nombreProducto,
            precioTotal: precioTotal,
            precioUnitario: precioUnitario,
            comentario: $('#Comentario' + id).val(),
        };

        console.log(' ID de fila: ' + id + '\nMovimiento: ' + valoresGenerados[id].movimiento + ', \nNombre del producto: ' + nombreProducto + ', \nPrecio total: ' + precioTotal + ', \nPrecio unitario: ' + precioUnitario + ', \nComentario: ' + valoresGenerados[id].comentario + ', \nCantidad: ' + cantidad);
    });


    $('#btnGuardar').on('click', function () {
        document.getElementById('action').value = 'guardarOrden';
    });
});


