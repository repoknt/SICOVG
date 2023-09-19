$(function () {
    $('#buscarCP').on('click', function (e) {
        e.preventDefault();
        var cp = document.getElementById('id_codigoPostal').value;
        if (cp.length === 5) {
            var data = { action: 'search_cp', cp: cp };
            $.post(window.location.pathname, data, function (res) {
                console.log('Response:', res);
                if (res.error) {
                    Swal.fire({
           title: 'Error!',
           text: 'El código postal es incorrecto o no existe.',
           icon: 'error'
           });
                } else if (res) {
                    document.getElementById('id_estado').value = res.estado;
                    document.getElementById('id_municipio').value = res.municipio;
                    // Limpia las opciones anteriores en el select de colonias
                    document.getElementById('id_colonia').innerHTML = '';
                    res.colonias.sort().forEach(function (value) {
                        var option = document.createElement("option");
                        option.text = value;
                        document.getElementById('id_colonia').append(option);
                    });
                }
            });
        }
    });
});
