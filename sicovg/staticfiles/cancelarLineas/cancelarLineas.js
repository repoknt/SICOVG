var tblCancelaciones;
$(function () {
    tblCancelaciones = $('#data').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
    })

    function cancelarTodo(comentario) {
        var campos = {action: 'cancelarTodo', comentario: comentario};
        //Se agrega un AJAX para el paso de parametros
        $.post(window.location.pathname, campos, function (res) {
            //Mensaje de que la acción se realizó correctamente
            Swal.fire({
                title: 'Correcto',
                text: '¡Se han cancelado todas las lineas!',
                icon: 'success',
                timer: 3000,
                onClose: () => {
                    location.href = '/erp/cuentasDeLaPlaza/';
                }
            });
        });
    }

    $('#btnCancelarTodas').on('click', function (e) {
        e.preventDefault();
        //Se agrega un comentario personalizado
        var comentario = prompt('Ingresa un comentario');
        //Se envian los parametros al método general
        if (comentario) {
            cancelarTodo(comentario);
        }
    });

    $('#data tbody').on('click', 'a[rel="cancelarUna"]', function () {
        var comentario = prompt('INGRESA UN COMENTARIO');
        var tr = tblCancelaciones.cell($(this).closest('td, li')).index();
        var data = tblCancelaciones.row(tr.row).data();
        if (comentario) {
            var dn = data[2];
            var campos = {action: 'cancelarUna', dn: dn, comentario: comentario}
            $.post(window.location.pathname, campos, function (res) {
                //Mensaje de que la acción se realizó correctamente
                Swal.fire({
                    title: 'Correcto',
                    text: '¡Se ha cancelado una linea!',
                    icon: 'success',
                    timer: 3000,
                });
            });
            tblCancelaciones.row(tr.row).remove().draw();
        }
    });
});