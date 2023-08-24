$(function () {
    var tblPendiente;
    var ticketJson;
    ticketsPendientes();

    function ticketsPendientes() {

        tblPendiente = $('#tblPendientes').DataTable({
            autoWidth: false,
            destroy: true,
            deferRender: true,
            scrollX: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'lstTicketPendientes'
                },
                dataSrc: "",
                headers: {
                    'X-CSRFToken': csrftoken
                },
            },
            columns: [
                {'data': 'idTicket'},
                {'data': 'empresadn.empresa.razonSocial'},
                {'data': 'empresadn.empresa.cuenta'},
                {'data': 'movimiento'},
                {'data': 'empleado.full_name'},
                {'data': 'estatus'},
                {'data': 'manager'},
                {'data': 'folio'},
                {'data': 'fechaCreacion'},
                {'data': 'idTicket'},
            ], columnDefs: [//Se procede a agregar un botón con código HTML
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var button = '<a href="#!" title="Detalle" class="btn btn-info form-control" rel="detalleTicketPendiente"><i class="fas fa-info-circle"></i></a>';
                        return button;
                    }
                }
            ],
            initComplete: function (settings, JSON) {
            }
        });
    }

    $('#tblPendientes tbody').on('click', 'a[rel="detalleTicketPendiente"]', function () {
        var tr = tblPendiente.cell($(this).closest('td', 'li')).index();
        ticketJson = tblPendiente.row(tr.row).data();
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {
                "action": "detalleTicket",
                "ticket": ticketJson.idTicket,
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
        }).done(function (res) {
            if (res.error) {
                msjError(res.error);
            } else {
                console.log(ticketJson.empresadn.empresa.personaAutoriazada1);
                console.log(ticketJson.empresadn.empresa);
                document.getElementById("blbPersona").textContent = ticketJson.empresadn.empresa.personaAutorizada1;
                document.getElementById("lblTelRef").textContent = ticketJson.empresadn.empresa.telefonoPersonaAutorizada1;
                document.getElementById("blbPuesto").textContent = ticketJson.puesto;
                document.getElementById("blbPropuesta").textContent = ticketJson.propuesta;
                document.getElementById("lblClave").textContent = ticketJson.claveRecuperacion;
                document.getElementById("blbNumExt").textContent = ticketJson.numeroExterno;
                document.getElementById("lblNip").textContent = ticketJson.nipVigencia;
                document.getElementById("lblComentario").textContent = ticketJson.comentario;
                document.getElementById("ticket").value = ticketJson.idTicket;
                validarArchivo("archivo1", res.archivo1);
                validarArchivo("archivo2", res.archivo3);
                validarArchivo("archivo3", res.archivo2);
            }
        });
    });

    function validarArchivo(input, archivo) {
        var boton = document.getElementById(input);
        if (archivo != '' && archivo != 'undefined' && archivo != '#!') {
            boton.setAttribute("href", archivo);
            boton.setAttribute("class", "btn btn-success");
        } else {
            boton.setAttribute("href", "#!");
            boton.setAttribute("class", "btn btn-danger");
        }
    }

    $('#btnProceso').on("click", function (e) {
        document.getElementById("estatus").value = "PROCESO";
    });

    $('#btnRechazo').on("click", function (e) {
        document.getElementById("estatus").value = "RECHAZO";
    });

    $('#btnRealizado').on("click", function (e) {
        document.getElementById("estatus").value = "REALIZADO";
    });

    $('#frmArchivos').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
            Swal.fire({
                title: 'Alerta',
                text: '¡Se ha guardado correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                    ticketsPendientes()
                }
            });
        });
    });

    function cambiarEstatus(parametros) {
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: parametros,
            headers: {
                'X-CSRFToken': csrftoken
            },
        }).done(function (res) {
            if (res.error) {
                msjError(res.error);
            } else {
                msjSuccess("Estatus Actualizado");
                ticketsPendientes();
            }
        });
    }


    function msjError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }

    function msjSuccess(mensaje) {
        Swal.fire(
            '¡Correcto!',
            mensaje,
            'success'
        )
    }
});