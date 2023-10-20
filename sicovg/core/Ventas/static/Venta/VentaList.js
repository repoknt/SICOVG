var tablaDN;
$(function () {
    // Boton que permite enviar el ajax para extraer los datos de la empresa
    $('#btnDetalle').click(function (e) {
        e.preventDefault();
        var campo = $('#tipoCampo').val();
        var valor = $('#valor').val();
        var action = 'BuscarCuenta';
        var data = {campo: campo, valor: valor, action: action};
        $.post(window.location.pathname, data, function (res) {
            if (res.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.error,
                })
                document.getElementById('frmActivo').reset();
            } else {
                document.getElementById('tokenid').value = res.idEmpresa;
                document.getElementById('razonSocial').value = res.razonSocial;
                document.getElementById('cuenta').value = res.cuenta;
                document.getElementById('RFC').value = res.RFC;
                document.getElementById('codigoPostal').value = res.codigoPostal;
                document.getElementById('municipio').value = res.municipio;
                document.getElementById('estado').value = res.estado;
                document.getElementById('colonia').value = res.colonia;
                document.getElementById('email').value = res.email;
                document.getElementById('telefono').value = res.telefono;
                document.getElementById('goOrden').setAttribute('href', 'NuevaVenta/' + res.cuenta + "/");
            }
        });
    });
});