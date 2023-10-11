var tblPer;
$(function () {
    verTablaPer();
    function verTablaPer() {
        tblPer = $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'mostrar'
                },
                dataSrc: ""
            },
            columns: [
                {"data": "idPermiso"},
                {"data": "fechaInasistencia"},
                {"data": "motivo"},
                {"data": "fechaCreacion"},
                {"data": "comentario"},
                {"data": "estatus"},
            ],
            initComplete: function (settings, json) {

            }
        });
        console.log(data);
    }

    $('form').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
            Swal.fire({
                title: 'Alerta',
                text: '¡Se ha guardado correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                    verTablaPer();
                    document.getElementById("fechaInasistencia").value = "";
                    document.getElementById("motivo").value = "";
                }
            });
        });
    });
});