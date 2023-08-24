$(function () {
    $('#tblLla').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
        initComplete: function (settings, JSON) {
        }
    });
    $('#form').on('submit', function (e) {
        e.preventDefault()
        var documento = document.getElementById('archivo').files;
        var nombre = documento[0].name;
        var extension = name.substring(name.lastIndexOf('.') + 1).toLowerCase;
        if (documento.length === 1) {
            if (extension === 'xlsx') {
                e.currentTarget.submit()
            } else {
                Swal.fire({
                    title: 'Error',
                    text: '¡Debes seleccionar un archivo Excel!',
                    icon: 'error',
                    timer: 6000,
                });
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: '¡Debes seleccionar solo un archivo!',
                icon: 'error',
                timer: 6000,
            });
        }
    })
});