$(function () {
    function validarFormulario() {
        var nombres = /^[a-zA-ZÀ-ÿ\s]{8,128}$/; // Letras y espacios, pueden llevar acentos.
        var telefono = /^\d{10}$/; //  10
        var idCuent = /^\d{9}$/; //  10
        var curp = /^[a-zA-ZÀ-ÿ\d]{10,13}$/; // Letras, numeros
        var correo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var social = /^.[a-zA-ZÀ-ÿ\s\d]{9,128}$/;
        var valCuenta = /^(\d|)*\.?(\d|)*\.?(\d)*\d$/;
                if (curp.test(document.getElementById('id_RFC').value)) {
                    if (correo.test(document.getElementById('id_email').value)) {
                            if (telefono.test(document.getElementById('id_telefono').value)) {
                                return true;
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Teléfono inválido',
                                    icon: 'error'
                                });
                            }

                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Correo inválido',
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'RFC inválido',
                        icon: 'error'
                    });
                }


        return false;
    }

    $('form').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        if (validarFormulario()) {
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                //location.href = '{{ list_url }}';
                Swal.fire({
                    title: 'Alerta',
                    text: '¡Se ha guardado correctamente!',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        location.href = '/erp/empresa/detalle/';
                    }
                });
            });
        }
    });
});

