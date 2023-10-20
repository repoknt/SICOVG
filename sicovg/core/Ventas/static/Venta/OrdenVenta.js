var validarBotones = 0;
var tblOrdenes;
var contador = 0;
var i = 0;
var selectEquipos = "";
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
            {"data": ""}, // Movimiento -14
            {"data": "movimiento"}, // Movimiento -13
            {"data": "empresadn.dn"}, // -12
            {"data": "plazo"}, // Plazo forzoso -11
            {"data": ""}, // Equipo -10
            {"data": ""}, // Color -9
            {"data": ""},// plan -8
            {"data": ""},// plazo -7
            {"data": ""}, // DE sin iva -6
            {"data": ""}, // ADDON -5
            {"data": "de"}, // DE -4
            {"data": "ac"}, // AC -3
            {"data": "dm"}, // DM -2
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
                        input = '<input type="text" readonly style="padding: 0px;font-size: 15px;width: 170px;" value="ADICION" class="form-control" name="mov' + i.row + '" id="mov' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    if (data) {
                        input = '<input type="text" readonly style="padding: 0px;width:120px;" value="' + data + '" class="form-control" name="dn' + i.row + '" id="dn' + i.row + '">';
                    } else {
                        input = '<input type="text" readonly  style="padding: 0px;width:120px;" value="NA" class="form-control" name="dn' + i.row + '" id="dn' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-11],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    if (data) {
                        var input = '<input type="text"  readonly value="' + data + '" style="padding: 0px;" class="form-control input-sm" name="plazoF' + i.row + '" id="plazoF' + i.row + '">';
                    } else {
                        var input = '<input type="text"  readonly value="0" style="padding: 0px;" class="form-control input-sm" name="plazoF' + i.row + '" id="plazoF' + i.row + '">';
                    }
                    return input;
                },
            },
            {
                targets: [-10],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return equipos(i.row);
                },
            },
            {
                targets: [-9],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return colores(i.row);
                },
            },
            {
                targets: [-8],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return planes(i.row);
                },
            },
            {
                targets: [-7],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return plazo(i.row);
                },
            },
            {
                targets: [-6],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    input = '<input class="form form-control" value="0" type="text" name="IVA' + i.row + '" id="IVA' + i.row + '" style="padding: 0px;width:75px;" required>';
                    return input;
                },
            },
            {
                targets: [-5],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    return addons(i.row);
                },
            },
            {
                targets: [-4],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    input = DE(i.row);
                    return input;
                }
            },
            {
                targets: [-3],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    input = AC(i.row);
                    return input;
                }
            },
            {
                targets: [-2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row, i) {
                    var input = "";
                    input = DM(i.row);
                    return input;
                }
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

    // Campos para formato de formulario
    function addons(id) {
        var addon = '<select  class="form-group-sm" style="font-size: 10px; margin: 0px;" id="addon' + id + '" name="addon' + id + '">' +
            '<option value="CTRL">CTRL</option>' +
            '<option value="LIBRE">LIBRE</option>' +
            '<option value="LIBRE MPP">LIBRE MPP</option>' +
            '<option value="CTRL MPP">CTRL MPP</option>' +
            ' </select>';
        return addon;
    }

    function DE(id) {
        var DE = '<select  class="form-group-sm" style="font-size: 10px; margin: 0px;" id="DE' + id + '" name="DE' + id + '">' +
            '<option>0</option>' +
            '<option>5</option>' +
            '<option>10</option>' +
            '<option>15</option>' +
            '<option>20</option>' +
            '<option>25</option>' +
            '<option>30</option>' +
            '<option>35</option>' +
            '<option>40</option>' +
            '<option>45</option>' +
            '<option>50</option>' +
            '<option>55</option>' +
            '<option>60</option>' +
            '<option>65</option>' +
            '<option>70</option>' +
            '<option>75</option>' +
            '<option>80</option>' +
            '<option>85</option>' +
            '<option>90</option>' +
            '<option>95</option>' +
            '<option>100</option>' +
            ' </select>';
        return DE;
    }

    function AC(id) {
        var AC = '<select  class="form-group-sm" style="font-size: 10px; margin: 0px;" id="AC' + id + '" name="AC' + id + '">' +
            '<option>0</option>' +
            '<option>5</option>' +
            '<option>10</option>' +
            '<option>15</option>' +
            '<option>20</option>' +
            '<option>25</option>' +
            '<option>30</option>' +
            '<option>35</option>' +
            '<option>40</option>' +
            '<option>45</option>' +
            '<option>50</option>' +
            '<option>55</option>' +
            '<option>60</option>' +
            '<option>65</option>' +
            '<option>70</option>' +
            '<option>75</option>' +
            '<option>80</option>' +
            '<option>85</option>' +
            '<option>90</option>' +
            '<option>95</option>' +
            ' </select>';
        return AC;
    }

    function DM(id) {
        var DM = '<select  class="form-group-sm" style="font-size: 10px; margin: 0px;" id="DM' + id + '" name="DM' + id + '">' +
            '<option>0</option>' +
            '<option>1</option>' +
            '<option>2</option>' +
            '<option>3</option>' +
            '<option>4</option>' +
            '<option>5</option>' +
            '<option>6</option>' +
            '<option>7</option>' +
            '<option>8</option>' +
            '<option>9</option>' +
            '<option>10</option>' +
            '<option>11</option>' +
            '<option>12</option>' +
            '<option>13</option>' +
            '<option>14</option>' +
            '<option>15</option>' +
            '<option>16</option>' +
            '<option>17</option>' +
            '<option>18</option>' +
            '<option>19</option>' +
            '<option>20</option>' +
            '<option>21</option>' +
            '<option>22</option>' +
            '<option>23</option>' +
            '<option>24</option>' +
            '<option>25</option>' +
            ' </select>';
        return DM;
    }

    function colores(id) {
        var colores = '<select style="font-size: 10px; margin: 0px;" id="color' + id + '" name="color' + id + '">' +
            '<option value="AZUL">AZUL</option>\n' +
            '<option value="BLANCO">BLANCO</option>\n' +
            '<option value="CAFE">CAFE</option>\n' +
            '<option value="DORADO">DORADO</option>\n' +
            '<option value="GRAFITO">GRAFITO</option>\n' +
            '<option value="GRIS">GRIS</option>\n' +
            '<option value="MOKA">MOKA</option>\n' +
            '<option value="NARANJA">NARANJA</option>\n' +
            '<option value="NEGRO">NEGRO</option>\n' +
            '<option value="PLATA">PLATA</option>\n' +
            '<option value="ROJO">ROJO</option>\n' +
            '<option value="ROSA">ROSA</option>\n' +
            '<option value="SILVER">SILVER</option>\n' +
            '<option value="VERDE">VERDE</option>\n' +
            '<option value="VIOLETA">VIOLETA</option>' +
            '<option value="ORO">ORO</option>' +
            '<option value="MEDIA NOCHE">MEDIA NOCHE</option>' +
            '</select>';
        return colores;
    }

    function planes(id) {
        var planes = '<select  class="form-group-sm" name="plan' + id + '" id="plan' + id + '" style="font-size: 10px;" >' +
            '<option value="CT NEG 199 V4">CT NEG 199 V4</option>\n' +
            '<option value="CT NEG 239 V4">CT NEG 239 V4</option>\n' +
            '<option value="CT NEG 299 V4">CT NEG 299 V4</option>\n' +
            '<option value="CT NEG 399 V4">CT NEG 399 V4</option>\n' +
            '<option value="CT NEG 499 V4">CT NEG 499 V4</option>\n' +
            '<option value="CT NEG 599 V4">CT NEG 599 V4</option>\n' +
            '<option value="CT NEG 699 V4">CT NEG 699 V4</option>\n' +
            '<option value="CT NEG 799 V4">CT NEG 799 V4</option>\n' +
            '<option value="CT NEG 899 V4">CT NEG 899 V4</option>\n' +
            '<option value="CT NEG 999 V4">CT NEG 999 V4</option>\n' +
            '<option value="CT NEG 1299 V4">CT NEG 1299 V4</option>\n' +
            '<option value="CT NEG 1499 V4">CT NEG 1499 V4</option>\n' +
            '<option value="INTERNET CT NEG 49">INTERNET CT NEG 49</option>\n' +
            '<option value="INTERNET CT NEG 59">INTERNET CT NEG 59</option>\n' +
            '<option value="INTERNET CT NEG 79">INTERNET CT NEG 79</option>\n' +
            '<option value="INTERNET CT NEG 109">INTERNET CT NEG 109</option>\n' +
            '<option value="INTERNET CT NEG 139">INTERNET CT NEG 139</option>\n' +
            '<option value="INTERNET CT NEG 199">INTERNET CT NEG 199</option>\n' +
            '<option value="INTERNET CT NEG 299">INTERNET CT NEG 299</option>\n' +
            '<option value="INTERNET CT NEG 399">INTERNET CT NEG 399</option>\n' +
            '<option value="INTERNET CT NEG 499">INTERNET CT NEG 499</option>\n' +
            '<option value="INTERNET CT NEG 699">INTERNET CT NEG 699</option>\n' +
            '<option value="INTERNET CT NEG 899">INTERNET CT NEG 899</option>\n' +
            '<option value="INTERNET CT NEG 999">INTERNET CT NEG 999</option>\n' +
            '<option value="INTERNET CT NEG 1399">INTERNET CT NEG 1399</option>\n' +
            '<option value="INTERNET CT NEG 1999">INTERNET CT NEG 1999</option>\n' +
            '<option value="INTERNET CT NEG CTRL 199">INTERNET CT NEG CTRL 199</option>\n' +
            '<option value="INTERNET CT NEG CTRL 299">INTERNET CT NEG CTRL 299</option>\n' +
            '<option value="INTERNET CT NEG CTRL 399">INTERNET CT NEG CTRL 399</option>\n' +
            '<option value="INTERNET CT NEG CTRL 499">INTERNET CT NEG CTRL 499</option>\n' +
            '<option value="INTERNET CT NEG CTRL 699">INTERNET CT NEG CTRL 699</option>\n' +
            '<option value="INTERNET CT NEG CTRL 899">INTERNET CT NEG CTRL 899</option>\n' +
            '<option value="INTERNET CT NEG CTRL 999">INTERNET CT NEG CTRL 999</option>\n' +
            '<option value="INTERNET CT NEG CTRL 1399">INTERNET CT NEG CTRL 1399</option>\n' +
            '<option value="INTERNET CT NEG CTRL 1999">INTERNET CT NEG CTRL 1999</option>' +
            '</select>';
        return planes
    }

//Funcion que recupera los registros de la tabla EQUIPOS
    function recuperarEquipos() {
        var data = {action: 'buscarEquipos'};
        $.post(window.location.pathname, data, function (res) {
            selectEquipos = res;
            return res;
        });
        return [];
    }

//funcion que muestra los registros en un select
    function equipos(id) {
        var equipos = '<select class="form-group-sm" style="font-size: 10px; margin: 0px;"  name="equipo' + id + '" id="equipo' + id + '">';
        for (const clave in selectEquipos) {
            equipos += '<option>' + selectEquipos[clave].modelo + '</option>';
        }
        equipos += '</select>';
        return equipos;
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
        if (validarBotones < 2) {
            boton.disabled = true;
        } else {
            boton.disabled = false;
        }
    }

    validarBotonGuardarOden();
});
