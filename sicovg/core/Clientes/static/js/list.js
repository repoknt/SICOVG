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
            {"data": "idCliente"},
            {"data": "razonSocial"},
            {"data": "RFC"},
            {"data": "email"},
            {"data": "telefono"},
        ],
        columnDefs: [
            {
                targets: [4],
                class: 'text-center',
                orderable: false,

            },
            {
                targets: [5],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                   var buttons = '<a href="/Clientes/Update/' + row.idCliente + '/" class="btn btn-warning"><i class="fas-col fas fa-edit"></i></a> ';
                    buttons += '<a href="/Clientes/Delete/' + row.idCliente + '/" rel="delete" title="Eliminar usu" type="button" class="btn btn-danger  "><i class="fas-col fas fa-trash-alt"></i></a>';
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