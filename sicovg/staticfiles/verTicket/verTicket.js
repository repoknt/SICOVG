var tblTicket;
$(function () {
    tblTicket = $('#tblTicket').DataTable({
        "scrollX": true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'searchTickets'
            },
            dataSrc: "",
            headers: {
                'X-CSRFToken': csrftoken
            },
        },
        columns: [
            {"data": "idTicket"},
            {"data": "empresadn.empresa.razonSocial"},
            {"data": "empresadn.empresa.cuenta"},
            {"data": "movimiento"},
            {"data": "comentario"},
            {"data": "estatus"},
            {"data": "manager"},
            {"data": "folio"},
            {"data": "fechaActualizacion"},
            {"data": "estatus"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = "";
                    buttons = '<a href="#!" rel="detalleTicket" class="btn btn-info btn-xs btn-flat"><i class="fas fa-eye"></i></a> ';
                    buttons += '<a href="#!" rel="detalleArchivos" class="btn btn-success btn-xs btn-flat"><i class="fas fa-file-archive"></i></a> ';
                    if (data === "RECHAZO") {
                        buttons += '<a href="/atencionclientes/updateTicket/' + row.idTicket + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a> ';
                    }
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });


    $('#tblTicket tbody').on('click', 'a[rel="detalleTicket"]', function () {
        var tr = tblTicket.cell($(this).closest('td', 'li')).index();
        var data = tblTicket.row(tr.row).data();
        msjSuccess("Datos Adicionales del Ticket", "Nip y Vigencia: " + data.nipVigencia +
            "<br>Propuesta: " + data.propuesta + "<br>Clave de Recuperación: " + data.claveRecuperacion);

    });

    $('#tblTicket tbody').on('click', 'a[rel="detalleArchivos"]', function () {
        var tr = tblTicket.cell($(this).closest('td', 'li')).index();
        var data = tblTicket.row(tr.row).data();
        console.log(data);
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {
                action: "verArchivos",
                idTicket: data.idTicket,
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
        }).done(function (res) {
            if (!res.error) {
                if (!res.error) {
                    console.log(res);
                    comprobarArchivo("fileArchivo4", res.archivo4);
                    comprobarArchivo("fileArchivo5", res.archivo5);
                    comprobarArchivo("fileArchivo6", res.archivo6);
                    $('#modalArchivos').modal('show');
                }
            }
        });
    });

    function comprobarArchivo(input, archivo) {
        var buton = document.getElementById(input);
        if (archivo != "#!") {
            buton.setAttribute("class", "btn btn-success");
            buton.setAttribute("href", archivo);
            buton.setAttribute("target", "_blank");
        } else {
            buton.setAttribute("class", "btn btn-danger");
        }
    }

    function msjSuccess(title, body) {
        Swal.fire(
            title,
            body,
            'question'
        )
    }
});