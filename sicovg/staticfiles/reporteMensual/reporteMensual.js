$(function () {
    $('#tblReporte').DataTable({
        autoWidth: false,
        destroy: true,
        deferRender: true,
        scrollX: true,
        initComplete: function (settings, JSON) {
        }
    });

    $('#btnExportar').on('click', function () {
        document.getElementById('action').value = 'exportarPDF';
    });
    $('#btnGuardarReporte').on('click', function () {
        document.getElementById('action').value = 'guardar';
    });
    $('#duplicarContenido').on('click', function () {
        (async () => {
            const {value: formValues} = await Swal.fire({
                title: 'Llenado Rápido',
                html:
                    '<label for="txtComentario" class="form-label">Fila a clonar:</label>' +
                    '<input id="swal-input1" class="swal2-input" placeholder="Fila a clonar">' +
                    '<label for="txtComentario" class="form-label">Desde:</label>' +
                    '<input id="swal-input2" class="swal2-input" placeholder="Desde">' +
                    '<label for="txtComentario" class="form-label">Hasta:</label>' +
                    '<input id="swal-input3" class="swal2-input" placeholder="Hasta">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value
                    ]
                }
            })
            var filaM = document.getElementById('swal-input1').value;
            var filaI = document.getElementById('swal-input2').value;
            var filaT = document.getElementById('swal-input3').value;
            if (filaM && filaI && filaT) {
                duplicarContenido(filaM, filaI, filaT);
            }
        })()
    });

    function duplicarContenido(filaM, filaI, filaT) {
        var filaMaestra = parseInt(filaM);
        var filaInicial = parseInt(filaI);
        var filaTermino = parseInt(filaT);
        var plaza = document.getElementById("plaza" + filaMaestra).value;
        var coordinador = document.getElementById("coordinador" + filaMaestra).value;
        for (var i = filaInicial; i <= filaTermino; i++) {
            document.getElementById("plaza" + i).value = plaza;
            document.getElementById("coordinador" + i).value = coordinador;
        }
    }
});