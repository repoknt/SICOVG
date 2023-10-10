var tblListAgen;
$(function () {
    tblListAgen = $('#data').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        "scrollX": true,
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
            {"data": "idAgenda"},
            {"data": "empresa_al.razonSocial"},
            {"data": "empresa_al.RFC"},
            {"data": "empresa_al.cuenta"},
            {"data": "fechaLlamada"},
            {"data": "comentario"},
            {"data": "idAgenda"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                render: function (data, type, row) {
                    var buttons = '<a rel="realizada" title="Con ejecutivo" class="btn btn-info btn-group-sm"><i class="fas fa-user"></i></a>';
                    buttons += '<a rel="propuesta" title="Envía propuesta" class="btn btn-success btn-group-sm"><i class="fas fa-file-archive"></i></a>';
                    buttons += '<a rel="cancelada" title="Cancelada" class="btn btn-danger btn-group-sm"><i class="fas fa-user-slash"></i></a>';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });
    tblListAgen.on('order.dt search.dt', function () {
        tblListAgen.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    $('#data tbody').on('click', 'a[rel="realizada"]', function () {
        var tr = tblListAgen.cell($(this).closest('td, li')).index();
        var data = tblListAgen.row(tr.row).data();
        var parameters = {idAgenda: data.idAgenda, action: 'realizada'}
        $.post(window.location.pathname, parameters, function (res) {
            tblListAgen.row(tr.row).remove().draw();
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
    }).on('click', 'a[rel="cancelada"]', function () {
        var tr = tblListAgen.cell($(this).closest('td, li')).index();
        var data = tblListAgen.row(tr.row).data();
        var parameters = {idAgenda: data.idAgenda, action: 'cancelada'}
        $.post(window.location.pathname, parameters, function (res) {
            tblListAgen.row(tr.row).remove().draw();
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
    })
    .on('click', 'a[rel="propuesta"]', function () {
        var tr = tblListAgen.cell($(this).closest('td, li')).index();
        var data = tblListAgen.row(tr.row).data();
        var parameters = {idAgenda: data.idAgenda, action: 'propuesta'}
        $.post(window.location.pathname, parameters, function (res) {
            tblListAgen.row(tr.row).remove().draw();
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