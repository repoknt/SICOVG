$(function () {
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
                    location.href = '/Agendacalend/agendarLlamada/';
                    }
                });
            });
    });
});