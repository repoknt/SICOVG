var tblCentasSub;
var tblHistorial;
$(function () {
    function cuentasSubidas(){
        tblCentasSub = $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'searchdata',
                    'empleado': document.getElementById("empleado").value,
                    'fecha': document.getElementById("fecha").value,
                },
                dataSrc: ""
            },
            columns: [
                {"data": "empresadn.empresa.razonSocial"},
                {"data": "empresadn.empresa.cuenta"},
                {"data": "empresadn.dn"}, 
            ],
    
        });
    }
    $('#cuentasSubidas').on('click', function () {
        cuentasSubidas();
    });
    $('#empleado').on('change', function (){
        var empleado= document.getElementById('empleado').value;
        document.getElementById('historial').setAttribute("href","/erp/historialCuentasSubidas/"+empleado+"/")
    });
    $('#historial').on('click', function () {
        historialCuentasSubidas();
    });
});