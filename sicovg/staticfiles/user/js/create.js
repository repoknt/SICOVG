$(function () {
    function validarFormulario() {
        var telefonos = /^\d{10}$/;
        var nombres = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        var curp = /[A-Z0-9]{18}/;
        var rh = /[A-Z]{1,3}[+-]/;
        if (nombres.test(document.getElementById('id_first_name').value)) {

            if (nombres.test(document.getElementById('id_last_name').value)) {

                if (nombres.test(document.getElementById('id_last_name_m').value)) {

                    if (telefonos.test(document.getElementById('id_telefonoTrabajo').value)) {

                        if (telefonos.test(document.getElementById('id_telefonoPersonal').value)) {

                            if (curp.test(document.getElementById('id_curp').value)) {

                                if (rh.test(document.getElementById('id_factorRH').value)) {

                                    if (telefonos.test(document.getElementById('id_telefonoEmergencia').value)) {

                                        if (nombres.test(document.getElementById('id_puesto').value)) {

                                            if (nombres.test(document.getElementById('id_nombreReferencia').value)) {

                                                if (nombres.test(document.getElementById('id_parentesco').value)) {

                                                    return true;
                                                } else {
                                                    Swal.fire({
                                                        title: 'Error!',
                                                        text: 'El parentesco solo lleva letras mayusculas, sin carácteres especiales',
                                                        icon: 'error'
                                                    });

                                                }

                                            } else {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'El nombre de Referencia solo lleva letras mayusculas, sin carácteres especiales y deben ser 16 carácteres',
                                                    icon: 'error'
                                                });
                                            }
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El puesto solo lleva letras mayusculas, sin carácteres especiales y deben ser 16 carácteres',
                                                icon: 'error'
                                            });
                                        }

                                    } else {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'El telefono de Emergencia no puede llevar letras, espacios o carácteres especiales',
                                            icon: 'error'
                                        });
                                    }
                                } else {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'El factor RH solo lleva letras mayusculasy un operador',
                                        icon: 'error'
                                    });
                                }
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'El curp solo lleva letras mayusculas, sin carácteres especiales y deben ser 16 carácteres',
                                    icon: 'error'
                                });
                            }

                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'El telefono personal no puede llevar letras, espacios o carácteres especiales',
                                icon: 'error'
                            });
                        }

                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'El telefono del trabajo no puede llevar letras, espacios o carácteres especiales',
                            icon: 'error'
                        });
                    }

                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'El apellído materno no puede llevar números o carácteres especiales',
                        icon: 'error'
                    });
                }

            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'El apellído paterno no puede llevar números o carácteres especiales',
                    icon: 'error'
                });

            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'El nombre no puede llevar números ni carácteres especiales',
                icon: 'error'
            });

        }

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
                        //document.getElementById("frmActivo").reset();
                        location.href = '/user/list/';
                    }
                });
            });
        }
    });
});