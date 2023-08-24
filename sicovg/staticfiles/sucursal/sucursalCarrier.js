var tblAzul;
var tblRojo;
$(function () {
    function totalAzul(){
        tblAzul = $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'azul',
                },
                dataSrc: "",
                headers: {
                    'X-CSRFToken': csrftoken
                },
            },
            columns: [
                {"data": "razonSocial"},
                {"data": "cuenta"},
                {"data": "RFC"},
                {"data": "carrier"},
                {"data": "personaAutorizada1"},
                {"data": "telefono1"},
            ],

        });
    }
    function totalRojo(){
        tblItsmo = $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'rojo',
                },
                dataSrc: "",
                headers: {
                    'X-CSRFToken': csrftoken
                },
            },
            columns: [
                {"data": "razonSocial"},
                {"data": "cuenta"},
                {"data": "RFC"},
                {"data": "carrier"},
                {"data": "personaAutorizada1"},
                {"data": "telefono1"},
            ],

        });
    }
    $('#btnAzul').on('click', function () {
        totalAzul();
    });
    $('#btnRojo').on('click', function () {
        totalRojo();
    });
});