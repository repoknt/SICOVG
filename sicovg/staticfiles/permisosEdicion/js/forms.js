var tblPermisos;
$(function () {
    verTablaPermisos();

    function verTablaPermisos() {
        tblPermisos = $('#data').DataTable({
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
                dataSrc: ""
            },
            columns: [
                {"data": "idPermiso"},
                {"data": "empresa.razonSocial"},
                {"data": "comentario"},
                {"data": "estatus"},
                {"data": "password"},
            ],
            initComplete: function (settings, json) {

            }
        });
    }

    $('form').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
            //location.href = '{{ list_url }}';
            Swal.fire({
                title: 'Alerta',
                text: '¡Se ha guardado correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                    verTablaPermisos();
                    document.getElementById("cuenta").value = "";
                    document.getElementById("comentario").value = "";
                }
            });
        });
    });
});