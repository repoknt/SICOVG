var tblPermisos;
$(function () {
    verTablaPermisos();
    function verTablaPermisos() {
    tblPermisos = $('#data').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'searchdata'
            },
            dataSrc: ""
        },
        columns: [
            {"data": "idPermiso"},
            {"data": "fechaInasistencia"},
            {"data": "motivo"},
            {"data": "comentario"},
            {"data": "estatus"},
            {"data": "empleado.full_name"},
            {"data": "idPermiso"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                render: function (data, type, row) {
                    var buttons = '<a rel="aceptar" title="Aceptar" class="btn btn-success btn-group-sm"><i class="fas fa-check-circle"></i></a>';
                    buttons += '<a rel="rechazar" title="Rechazar" class="btn btn-danger btn-group-sm"><i class="fas fa-times"></i></a>';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });
    console.log(data);
    }

    tblPermisos.on('order.dt search.dt', function () {
        tblPermisos.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    $('#data tbody').on('click', 'a[rel="aceptar"]', function () {
        var tr = tblPermisos.cell($(this).closest('td, li')).index();
        var data = tblPermisos.row(tr.row).data();
        var comentario = prompt('Ingresa un comentario');
        var parameters = {idPermiso: data.idPermiso, action: 'aceptarPermiso', comentario: comentario}
        $.post(window.location.pathname, parameters, function (res) {
            tblPermisos.row(tr.row).remove().draw();
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
    }).on('click', 'a[rel="rechazar"]', function () {
        var tr = tblPermisos.cell($(this).closest('td, li')).index();
        var data = tblPermisos.row(tr.row).data();
        var comentario = prompt('Ingresa un comentario');
        var parameters = {idPermiso: data.idPermiso, action: 'rechazarPermiso', comentario: comentario}
        $.post(window.location.pathname, parameters, function (res) {
            tblPermisos.row(tr.row).remove().draw();
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