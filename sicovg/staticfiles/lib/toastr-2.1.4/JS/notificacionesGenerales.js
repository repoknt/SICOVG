var notiPermiso;
$(function () {
    toastr.options = {
        //primeras opciones
        "closeButton": true, //boton cerrar
        "debug": false,
        "newestOnTop": true, //notificaciones mas nuevas van en la parte superior
        "progressBar": true, //barra de progreso hasta que se oculta la notificacion
        "preventDuplicates": false, //para prevenir mensajes duplicados
        "positionClass": "toast-top-right",
        "showDuration": "10000",
        "hideDuration": "4000",
        "timeOut": "8000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    };

    //  Evaluar el campo notipermisos para mostrar la notificación
    var noti = $('#NotiPermisos').val();
    if (noti === 1 || noti === '1') {
        toastr["info"]("Tienes peticiones pendientes", "Permisos Edición")
    }
});