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
            {"data": "first_name"},
            {"data": "last_name"},
            {"data": "username"},
            {"data": "tipoEmpleado"},
            {"data": "date_joined"},
            {"data": "id"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="/user/update/' + row.id + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a> ';
                    buttons += '<a href="/user/delete/' + row.id + '/" rel="delete" title="Eliminar" type="button" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';
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