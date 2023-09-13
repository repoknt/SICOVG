$(function () {
    function validarFormulario() {

        var nombres = /^[A-Za-z0-9\s]{1,180}$/; // Letras y espacios, pueden llevar acentos.
        var producto  = /^[A-Za-z0-9\s]{1,180}$/; // Letras y espacios, pueden llevar acentos.
        var categoria  = /^[A-Za-z0-9\s]{1,180}$/; // Letras y espacios, pueden llevar acentos.
      
                if (nombres.test(document.getElementById('id_NombresProducto').value)) {
                    if (producto.test(document.getElementById('id_Descripcion').value)) {
                            if (categoria.test(document.getElementById('id_Categoria').value)) {
                                return true;
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Categoria inválida',
                                    icon: 'error'
                                });
                            }

                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Decripcion no válida',
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Nombre inválido',
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
                        location.href = '/Inventario/List/';
                    }
                });
            });
        }
    });
});