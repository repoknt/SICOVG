//Se inicializa una variable contenedora para cada tabla
var tablaAbiertas;
var tablaDiferente;
var tablaDN;
//Se inicializa una función anonima
$(function () {
    listarAbiertas()
    listarOtras();

    function listarAbiertas() {
        tablaAbiertas = $('#tblAbiertas').DataTable({//se le asigna el nombre de la tabla a la variable contenedora
            //Se le dan propiedades a la tabla
            autoWidth: false,
            destroy: true,
            deferRender: true,
            scrollX: true,
            ajax: {
                //se define la url actual
                url: window.location.pathname,
                //se asigna el metodo de paso de parametros como POST
                type: 'POST',
                //se asigna la acción a evaluar en la vista
                data: {
                    'action': 'listarAbiertas'

                },
                dataSrc: ""
            },
            columns: [//se definen las columnas de la tabla
                {'data': 'folioOficial'},
                {'data': 'empresadn.empresa.razonSocial'},
                {'data': 'empresadn.empresa.cuenta'},
                {'data': 'empleado.full_name'},
                {'data': 'fechaOrden'},
                {'data': 'estatusReal'},
                {'data': 'folio'},
            ],
            columnDefs: [//Se procede a agregar un botón con código HTML
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var button = '<a href="#!" title="Detalle" class="btn btn-info form-control" rel="detalleOrdenAbierta"><i class="fas fa-info-circle"></i></a>';
                        return button;
                    }
                }
            ],
            initComplete: function (settings, JSON) {//Inicializa los componentes
            }
        });
    }

    function listarOtras() {
        tablaDiferente = $('#tblOtras').DataTable({//se le asigna el nombre de la tabla a la variable contenedora
            //Se le dan propiedades a la tabla
            "scrollX": true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                //se define la url actual
                url: window.location.pathname,
                //se asigna el metodo de paso de parametros como POST
                type: 'POST',
                //se asigna la acción a evaluar en la vista
                data: {
                    'action': 'listarOtras'

                },
                dataSrc: ""
            },
            columns: [//se definen las columnas de la tabla
                {'data': 'folioOficial'},
                {'data': 'empresadn.empresa.razonSocial'},
                {'data': 'empresadn.empresa.cuenta'},
                {'data': 'empleado.full_name'},
                {'data': 'fechaOrden'},
                {'data': 'estatusReal'},
                {'data': 'folio'},
            ],
            columnDefs: [//Se procede a agregar un botón con código HTML
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var button = '<a href="#!" title="Detalle" class="btn btn-info form-control" rel="detalleOrdenOtras"><i class="fas fa-info-circle"></i></a>';
                        return button;
                    }

                }

            ],
        });
    }

    //Se realiza un método paraq acción de dar click en botón de la tabla abiertas
    $('#tblAbiertas tbody').on('click', 'a[rel="detalleOrdenAbierta"]', function () {
        var tr = tablaAbiertas.cell($(this).closest('td', 'li')).index();
        var data = tablaAbiertas.row(tr.row).data();
        var datos = {action: 'detalleAbierta', folio: data.folio}
        detalleOrden(datos, data.estatusReal, data.folioOficial, data.idOrden);
        listarOtras();
        listarAbiertas();
    });
    //Se realiza un método paraq acción de dar click en botón de la tabla otras
    $('#tblOtras tbody').on('click', 'a[rel="detalleOrdenOtras"]', function () {
        var tr = tablaDiferente.cell($(this).closest('td', 'li')).index();
        var data = tablaDiferente.row(tr.row).data();
        var datos = {action: 'detalleAbierta', folio: data.folio}

        detalleOrden(datos, data.estatusReal, data.folioOficial, data.idOrden);
    });

    //Se realiza un AJAX para el paso de parametros de los formularios por el método POST
    function detalleOrden(datos, estatusReal, folioOficial, idOrden) {
        $.post(window.location.pathname, datos, function (res) {
            //Se asignan valores a las etiquetas por medio de si ID
            document.getElementById('vCuenta').textContent = res.empresa.cuenta;
            document.getElementById('vRazonSocial').textContent = res.empresa.razonSocial;
            document.getElementById('vTipoCliente').textContent = res.empresa.tipoCliente;
            document.getElementById('vRepresentante').textContent = res.empresa.representanteLegal;
            document.getElementById('vRFC').textContent = res.empresa.RFC;
            document.getElementById('vCarrier').textContent = res.empresa.carrier;

            document.getElementById('vEmail').textContent = res.empresa.email;
            document.getElementById('vTelefono1').textContent = res.empresa.telefono1;
            document.getElementById('vTelefono2').textContent = res.empresa.telefono2;
            document.getElementById('vDomicilioFiscal').textContent = res.empresa.domicilioFiscal;
            document.getElementById('vDomicilioEntrega').textContent = res.empresa.domicilioEntrega;
            document.getElementById('vPersonaAutorizada1').textContent = res.empresa.personaAutorizada1;
            document.getElementById('vPersonaAutorizada2').textContent = res.empresa.personaAutorizada2;

            document.getElementById('vTelefonoReferencia1').textContent = res.empresa.telefonoPersonaAutorizada1;
            document.getElementById('vTelefonoReferencia2').textContent = res.empresa.telefonoPersonaAutorizada2;
            document.getElementById('folioOrden').value = datos.folio;
            document.getElementById('iEstatusOrden').value = estatusReal;
            document.getElementById('iFolioOficial').value = folioOficial;

            //Se agrega el método que mostrara los DNS al clickear el botón de Info
            $('#cuerpoDN').html('');
            for (const clave in res.DNS) {
                var tr = "<tr><td>" + clave + "</td><td>" + res.empresa.cuenta + "</td><td>" + res.DNS[clave] + "</td></tr>";
                $('#cuerpoDN').append(tr);
            }
            ;
        });
    }

    //Se agrega el método para cambiar folio por medio del botón correspondiente
    $('#btnCambiarFolio').on('click', function () {
        var folio = document.getElementById('folioOrden').value;
        var folioOficial = document.getElementById('iFolioOficial').value;
        var cambiarFolio = {action: 'cambiarFolio', folio: folio, folioOficial: folioOficial};
        //Se realiza un AJAX con los folios para su cambio
        $.post(window.location.pathname, cambiarFolio, function (res) {
            //Mensaje de que la operación es correcta
            Swal.fire({
                title: '¡Correcto!',
                text: 'El folio se cambió correctamente',
                icon: 'success'
            });

        });
    });

    //Se agrega el método para cambiar el estatus(MÉTODO GENERAL) recibiendo parametros de otros metodos
    function cambiarEstatusGeneral(folio, estatus, comentario) {
        var campos = {action: 'cambiarEstatusGeneral', folio: folio, estatusReal: estatus, comentario: comentario};
        //Se agrega un AJAX para el paso de parametros
        $.post(window.location.pathname, campos, function (res) {
            //Mensaje de que la acción se realizó correctamente
            Swal.fire({
                title: 'Correcto',
                text: '¡Se ha guardado correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                    listarAbiertas();
                    listarOtras();
                }
            });
        });
    }

    //Método que pasa los parametros para el estatus INGRESO
    $('#ingreso').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se envian los parametros al método general
        cambiarEstatusGeneral(folio, 'INGRESO', 'SIN COMENTARIO');
    });
    //Método que pasa los parametros para el estatus VALIDAR CREDITO
    $('#validarCredito').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se envian los parametros al método general
        cambiarEstatusGeneral(folio, 'VALIDACION DE CREDITO', 'SIN COMENTARIO');
    });
    //Método que pasa los parametros para el estatus ALMACEN
    $('#almacen').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se envian los parametros al método general
        cambiarEstatusGeneral(folio, 'ALMACEN', 'SIN COMENTARIO');
    });
    //Método que pasa los parametros para el estatus FACTURAR
    $('#facturar').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se envian los parametros al método general
        cambiarEstatusGeneral(folio, 'FACTURADA', 'SIN COMENTARIO');
    });
    //Método que pasa los parametros para el estatus RECHAZO PRODUCTO
    $('#validacionDeProducto').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se envian los parametros al método general
        cambiarEstatusGeneral(folio, 'VALIDACION DE PRODUCTO', 'SIN COMENTARIO');

    });
    //Método que pasa los parametros para el estatus RECHAZO CREDITO
    $('#rechazoCredito').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se agrega un comentario personalizado
        var comentario = prompt('Ingresa un comentario');
        //Se envian los parametros al método general
        if (comentario) {
            cambiarEstatusGeneral(folio, 'RECHAZO DE CREDITO', comentario);
        }
    });
    //Método que pasa los parametros para el estatus RECHAZO ALMACEN
    $('#rechazoAlmacen').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se agrega un comentario personalizado
        var comentario = prompt('Ingresa un comentario');
        //Se envian los parametros al método general
        if (comentario) {
            cambiarEstatusGeneral(folio, 'RECHAZO DE ALMACEN', comentario);
        }
    });

    //Método que pasa los parametros para el estatus RECHAZO MESA DE CONTROL
    $('#rechazoMesaControl').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se agrega un comentario personalizado
        var comentario = prompt('Ingresa un comentario');
        //Se envian los parametros al método general
        if (comentario) {
            cambiarEstatusGeneral(folio, 'RECHAZO DE MESA DE CONTROL', comentario);
        }
    });
    $('#cancelarOrden').on('click', function () {
        //Se obtiene el folio de la Orden
        var folio = document.getElementById('folioOrden').value;
        //Se agrega un comentario personalizado
        var comentario = prompt('Ingresa un comentario');
        //Se envian los parametros al método general
        if (comentario) {
            cambiarEstatusGeneral(folio, 'ORDEN CANCELADA', comentario);
        }
    });
    /*
    * Realizamos el evento onsubmit para el formulario de subida de contrato para guardar el archivo en la DB
    * */
    $('#frmContrato').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de subir este contrato?', parameters, function () {
            Swal.fire({
                title: 'Alerta',
                text: '¡Se ha subido correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                    listarAbiertas();
                    listarOtras();
                }
            });
        });
    });

    $('#btnExpediente').on('click', function (e) {
        e.preventDefault();
        $('#modalExpediente').modal('show');
        var datos = {action: 'listarExpediente', folio: document.getElementById('folioOrden').value}
        $.post(window.location.pathname, datos, function (res) {
            if (!res.error) {
		console.log(res);
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
    // Quitar paginación de la tabla expedientes
    $('#tblExpediente').DataTable({
        "paging": false
    });

    // Metodo que permite evaluar si existe el documento para dar propiedades al boton de descarga
    function validarExpediente(input, archivo) {
        var boton = document.getElementById(input);
        if (archivo != '' && archivo != 'undefined' && archivo != '#!') {
            boton.setAttribute("target", "_blank");
            boton.setAttribute("href", archivo);
            boton.setAttribute("class", "btn btn-success");
        } else {
            boton.setAttribute("href", "#!");
            boton.removeAttribute("target");
            boton.setAttribute("class", "btn btn-danger");
        }
    }
});

