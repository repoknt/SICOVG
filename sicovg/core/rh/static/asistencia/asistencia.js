var tblOrd;

$(function () {
    tblOrd = $('#tblOrdenes').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
    });
     // Almacena los elementos registrados
    var registrados = [];
    $('#tblOrdenes tbody').on('click', 'a[rel="asistencia"]', function () {
        var tr = tblOrd.cell($(this).closest('td, li')).index();
        var data = tblOrd.row(tr.row).data();
        var fila = parseInt(tr.row) + parseInt(1);
        var datos = {
            action: 'Asistencia',
            id: data[0],
        }
        tblOrd.row(tr.row).remove().draw();
        // funcion POST
        $.post(window.location.pathname, datos, function (res) {
            if (res.message) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: res.message,
                    icon: 'success',
                    timer: 800,
                });
            }
        });
    });
    $('#tblOrdenes tbody').on('click', 'a[rel="retardo"]', function () {
        var tr = tblOrd.cell($(this).closest('td, li')).index();
        var data = tblOrd.row(tr.row).data();
        var fila = parseInt(tr.row) + parseInt(1);
        var datos = {
            action: 'Retardo',
            id: data[0],
        }
        tblOrd.row(tr.row).remove().draw();
        // funcion POST
        $.post(window.location.pathname, datos, function (res) {
            if (res.message) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: res.message,
                    icon: 'success',
                    timer: 800,
                });
            }
        });

    });
    $('#tblOrdenes tbody').on('click', 'a[rel="justificada"]', function () {
        var tr = tblOrd.cell($(this).closest('td, li')).index();
        var data = tblOrd.row(tr.row).data();
        var fila = parseInt(tr.row) + parseInt(1);
        var datos = {
            action: 'Justificada',
            id: data[0],
        }
        tblOrd.row(tr.row).remove().draw();
        // funcion POST
        $.post(window.location.pathname, datos, function (res) {
            if (res.message) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: res.message,
                    icon: 'success',
                    timer: 800,
                });
            }
        });

    });

    $('#tblOrdenes tbody').on('click', 'a[rel="falta"]', function () {
        var tr = tblOrd.cell($(this).closest('td, li')).index();
        var data = tblOrd.row(tr.row).data();
        var fila = parseInt(tr.row) + parseInt(1);
        var datos = {
            action: 'Falta',
            id: data[0],
        }
        tblOrd.row(tr.row).remove().draw();
        // funcion POST
        $.post(window.location.pathname, datos, function (res) {
            if (res.message) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: res.message,
                    icon: 'success',
                    timer: 800,
                });
            }
        });
    });
    
});