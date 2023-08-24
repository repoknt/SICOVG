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

});