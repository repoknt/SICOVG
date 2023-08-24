var tblCuen;

$(function () {
    tblCuen = $('#tblCuentas').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
    });
    $('#tblCuentas tbody').on('click', 'a[rel="cambiarCuenta"]', function () {
        var tr = tblCuen.cell($(this).closest('td, li')).index();
        var data = tblCuen.row(tr.row).data();
        console.log(data);
        var fila = parseInt(tr.row) + parseInt(1);
        var ncuenta = document.getElementById('ncuenta' + fila).value;
            if (ncuenta === null) {
            Swal.fire(
                '¡Error!',
                'Por favor ingresa lo solicitado para actualizar la cuenta',
                'error'
            );
        } else {
                var datos = {
                    action: 'Actualizar',
                    empresa: data[0],
                    ncuenta: ncuenta
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