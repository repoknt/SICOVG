$(function () {
    $('#form-cambiar').on('submit', function (e) {
        e.preventDefault();
        var data = $('#form-cambiar').serialize();
        $.post(window.location.pathname, data, function (res, est, jqXHR) {
            if (res.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.error,
                });
            }
            if (res.razonSocial != null) {
                document.getElementById('ejecutivo').value = res.encargado;
                document.getElementById('razon').value = res.razonSocial;
                document.getElementById('rfc').value = res.RFC;
                document.getElementById('carrier').value = res.carrier;
                document.getElementById('serial').value = res.idEmpresa;
            }
        });
    });

    $('#btnCambiar').on('click', function (e) {
        e.preventDefault();
        var serial = document.getElementById("serial").value;
        var slcEmpleado = document.getElementById("slcEmpleado").value;
        var data = {action: "cambiarCuenta", serial: serial, slcEmpleado: slcEmpleado}
        $.post(window.location.pathname, data, function (res) {
            if (res.message) {
                Swal.fire(
                    '¡Correcto!',
                    res.message,
                    'success'
                );
            }
        });
    });
});