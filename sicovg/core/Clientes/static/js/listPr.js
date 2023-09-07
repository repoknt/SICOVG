var tblUser;

$(function () {
    tblUser = $('#data').DataTable({
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
            {"data": "id"},
            {"data": "razonSocial"},
            {"data": "RFC"},
            {"data": "cuenta"},
            {"data": "codigoPostal"},
            {"data": "municipio"},
            {"data": "estado"},
            {"data": "colonia"},
            {"data": "email"},
            {"data": "telefono"},
        ],
        columnDefs: [
            {
                targets: [9],
                class: 'text-center',
                orderable: false,

            },
            {
                targets: [10],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="/Proovedores/Update/' + row.id + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas-col fas fa-edit"></i></a> ';
                    buttons += '<a href="/Proovedores/Delete/' + row.id + '/" rel="delete" title="Eliminar usu" type="button" class="btn btn-danger btn-xs btn-flat"><i class="fas-col fas fa-trash-alt"></i></a>';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });

    // $('#data tbody')
    //     .on('click', 'a[rel="delete"]', function () {
    //         var tr = tblUser.cell($(this).closest('td, li')).index();
    //         var data = tblUser.row(tr.row).data();
    //         $.ajax({
    //             url: window.location.path,
    //             type: 'POST',
    //             data: {
    //                 'action': 'searchdata2'
    //             },
    //             dataType: 'json',
    //             processData: false,
    //             contentType: false,
    //         })
    //     });
});