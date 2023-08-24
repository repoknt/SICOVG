var tblOrd;

$(function () {
    tblOrd = $('#tblOrdenes').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
    });
    $('#tblOrdenes tbody').on('click', 'a[rel="cambiarOrden"]', function () {
        var tr = tblOrd.cell($(this).closest('td, li')).index();
        var data = tblOrd.row(tr.row).data();
        console.log(data);
        var fila = parseInt(tr.row) + parseInt(1);
        var estatusReal = document.getElementById('estatusReal' + fila).value;
        var comentario = document.getElementById('comentario' + fila).value;
            if (estatusReal === null || comentario === null) {
            Swal.fire(
                '¡Error!',
                'Por favor ingresa lo solicitado para actualizar la orden',
                'error'
            );
        } else {
                var datos = {
                    action: 'Actualizar',
                    orden: data[0],
                    estatusReal: estatusReal,
                    comentario: comentario
                }
                // funcion POST
                $.post(window.location.pathname, datos, function (res) {
                    if (res.message) {
                        Swal.fire(
                            '¡Actualizado!',
                            res.message,
                            'success'
                        );
                    }
                });
            }
    });
});