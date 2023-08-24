var tblEquipos;

$(function () {
    tblEquipos = $('#data').DataTable({
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
            dataSrc: "",
            headers: {
                'X-CSRFToken': csrftoken
            },
        },
        columns: [
            {"data": "idEquipo"},
            {"data": "modelo"},
            {"data": "idEquipo"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="/erp/equipos/update/' + row.idEquipo + '/" title="Editar" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a> ';
                    buttons += '<a rel="delete" title="Eliminar" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });
    tblEquipos.on('order.dt search.dt', function () {
        tblEquipos.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    $('#data tbody').on('click', 'a[rel="delete"]', function () {
        var tr = tblEquipos.cell($(this).closest('td, li')).index();
        var data = tblEquipos.row(tr.row).data();
        var parameters = {idEquipo: data.idEquipo, action: 'delete'}
        alert_action('Notificación', '¿Estás seguro?', function () {

            $.post(window.location.pathname, parameters, function (res) {
                tblEquipos.row(tr.row).remove().draw();
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
                return res;
            });
        },

            );
    });
});
