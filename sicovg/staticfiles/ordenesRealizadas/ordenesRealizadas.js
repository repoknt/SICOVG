var tblOrdFact;
var tblSegOrd;
var tblOrdEjec;

$(function () {
    // Bloques de código que permiten darle propiedades a las DATA TABLE
    tblOrdFact = $('#tablaUno').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
        //responsive: true,
    });
    tblSegOrd = $('#tablaDos').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        //responsive: true,
        scrollX: true,
    });
    tblOrdEjec = $('#tablaTres').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
        //responsive: true,
    });


    // Método de facturación del DN en cuestión
    $('#tablaUno tbody').on('click', 'a[rel="facturarLinea"]', function () {
        var tr = tblOrdFact.cell($(this).closest('td, li')).index();
        var data = tblOrdFact.row(tr.row).data();
        var fila = parseInt(tr.row) + parseInt(1);
        var fechaTermino = document.getElementById('fechaTermino' + fila).value;
        var fecha = document.getElementById('fechaInicio' + fila).value;
        if (fechaTermino === "" || fecha === "" || fechaTermino === null || fecha === null) {
            Swal.fire(
                '¡Error!',
                'Por favor ingresa lo solicitado para facturar la linea',
                'error'
            );
        } else {
            // diccionario de envio
            var datos = {
                action: 'facturarLinea',
                orden: data[0],
                fechaInicio: fecha,
                fechaTermino: fechaTermino,
                nuevoDN: traerDN(data[2], fila)
            }
            // funcion POST
            $.post(window.location.pathname, datos, function (res) {
                if (res.message) {
                    Swal.fire(
                        '¡Correcto!',
                        res.message,
                        'success'
                    );
                    // Quitar propiedad rel para evitar evento facturar linea
                    document.getElementById('btnFac' + fila).setAttribute("rel", "");
                    location.reload();
                }
            });
        }
    });

    // Método de entregar
    $('#tablaUno tbody').on('click', 'a[rel="entregar"]', function () {
        var tr = tblOrdFact.cell($(this).closest('td, li')).index();
        var data = tblOrdFact.row(tr.row).data();
        var fila = parseInt(tr.row) + parseInt(1);
            var datos = {
                action: 'entregar',
                orden: data[0],
            }
            // funcion POST
            $.post(window.location.pathname, datos, function (res) {
                if (res.message) {
                    Swal.fire(
                        '¡Correcto!',
                        res.message,
                        'success'
                    );

                    // Quitar propiedad rel para evitar evento facturar linea
                    document.getElementById('btnEnt' + fila).setAttribute("rel", "");
                    location.reload();
                }
            });
    });

    /* Método que recupera el DN de la tabla en base al botón de acción*/
    function traerDN(movimiento, fila) {
        if (movimiento.toUpperCase() === 'ADICION') {
            return document.getElementById('nuevoDN' + fila).value;
        }
        return "";
    }

    /*
    Método que permite regresar la ordena estatus abierta
     */
    $('#tablaDos tbody').on('click', 'a[rel="regresarOrden"]', function () {
        var tr = tblSegOrd.cell($(this).closest('td, li')).index();
        var data = tblSegOrd.row(tr.row).data();
        console.log(data);
        alert_action('Notificación', '¿Seguro de Regresar la Orden?', function () {
            var datos = {action: 'regresarOden', folio: data[2]}
            $.post(window.location.pathname, datos, function () {
                tblSegOrd.row(tr.row).remove().draw();
            });
        }, function () {

        });
    });

    /*
    Método que permite listar el expediente
     */
    $('#tablaTres tbody').on('click', 'a[rel="bajarExpediente"]', function (e) {
        e.preventDefault();
        var tr = tblOrdEjec.cell($(this).closest('td, li')).index();
        var data = tblOrdEjec.row(tr.row).data();
        $('#modalExpediente').modal('show');
        var datos = {action: 'listarExpediente', folio: data[3]}
        $.post(window.location.pathname, datos, function (res) {
            if (!res.error) {
                validarExpediente("fileIdentificacion", res.identifacion);
                validarExpediente("fileListaNominal", res.listaNominal);
                validarExpediente("fileFormatoRojo", res.formatoRojo);
                validarExpediente("fileFormatoEntrega", res.formatoEntrega);
                validarExpediente("fileFolioProducto", res.folioProducto);
                validarExpediente("fileEstadosCuenta", res.estadosCuenta);
                validarExpediente("fileComprobante", res.comprobante);
                validarExpediente("fileActaConstitutiva", res.actaConstitutiva);
                validarExpediente("fileEstadoFiscal", res.estadoFiscal);
                validarExpediente("fileInvCampo", res.invCampo);
                validarExpediente("fileControlDeRenovaciones", res.controlRenovaciones);
                validarExpediente("fileFormatoSae", res.formatoSae);
                validarExpediente("fileLayoutAzul", res.layoutAzul);
            }
        });
    });

    function validarExpediente(input, archivo) {
        var extension = archivo.substr(-3)
        var boton = document.getElementById(input);
        if (archivo != '' && archivo != 'undefined' && archivo != '#!') {
            boton.setAttribute("href", archivo);
            boton.setAttribute("class", "btn btn-success");
            if (extension === 'pdf') {
                boton.setAttribute('target', '_blank');
            }
        } else {
            boton.setAttribute("href", "#!");
            boton.setAttribute("class", "btn btn-danger");
        }
    }
    //modal contrato 2
    $('#tablaDos tbody').on('click', 'a[rel="bajarContrato"]', function (e) {
        e.preventDefault();
        var tr = tblSegOrd.cell($(this).closest('td, li')).index();
        var data = tblSegOrd.row(tr.row).data();
        $('#modalContrato').modal('show');
        var datos = {action: 'listarContrato', folio: data[2]}
        $.post(window.location.pathname, datos, function (res) {
            if (!res.error) {
                validarContrato("fileContrato", res.contrato);
                validarContrato("fileContrato2", res.contrato2);
                validarContrato("fileContrato3", res.contrato3);
                validarContrato("fileContrato4", res.contrato4);
            }
        });
    });
    function validarContrato(input, archivo) {
        var extension = archivo.substr(-3)
        var boton = document.getElementById(input);
        if (archivo != '' && archivo != 'undefined' && archivo != '#!') {
            boton.setAttribute("href", archivo);
            boton.setAttribute("class", "btn btn-success");
            if (extension === 'pdf') {
                boton.setAttribute('target', '_blank');
            }
        } else {
            boton.setAttribute("href", "/erp/ordenesRealizadas/#!");
            boton.setAttribute("class", "btn btn-danger");
        }
    }
});
