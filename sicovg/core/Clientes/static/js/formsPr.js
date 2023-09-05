$(function () {
    $('#buscarCP').on('click', function (e) {
        e.preventDefault();
        var cp = document.getElementById('id_codigoPostal').value;
        if (cp.length === 5) {
            var data = {action: 'search_cp', cp: cp}
            $.post(window.location.pathname, data, function (res) {
             console.log('Response:', res);
                if (res) {
                    document.getElementById('id_estado').value = res.estado;
                    document.getElementById('id_municipio').value = res.municipio;
                    for (value in res.colonias.sort()) {
                        var option = document.createElement("option");
                        option.text = res.colonias[value];
                        document.getElementById('id_colonia').append(option);
                    }
                }
            });
        }
    });
});