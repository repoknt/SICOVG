var tblUser;

$(function () {
    tblUser = $('#data').DataTable({
           responsive: false,
       autoWidth: false,
        destroy: false,
        deferRender: true,
        scrollX: true,
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
            {"data": "idInventario"},
            {"data": "NombresProducto"},
            {"data": "Descripcion"},
            {"data": "Categoria"},
            {"data": "NumeroDeSerie"},
            {"data": "CantidadDeStock"},
            {"data": "PrecioUnitario"},
            {"data": "PrecioDeCompra"},
            {"data": "FechaDeCompra"},
            {"data": "NivelDeReordenamiento"},
        ],
        columnDefs: [
            {
                targets: [6],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var precioUnitario = row.PrecioUnitario + " MXN" ; // Formatea el valor
                    return precioUnitario;
                },
            },
             {
                targets: [7],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var PrecioDeCompra = row.PrecioDeCompra + " MXN" ; // Formatea el valor
                    return PrecioDeCompra;
                },
            },
            {
                targets: [10],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="/Inventario/Update/' + row.idInventario + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas-col fas fa-edit"></i></a> ';
                    buttons += '<a href="/Inventario/Delete/' + row.idInventario + '/" rel="delete" title="Eliminar usu" type="button" class="btn btn-danger btn-xs btn-flat"><i class="fas-col fas fa-trash-alt"></i></a>';
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