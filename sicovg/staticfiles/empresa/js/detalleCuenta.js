var tablaDN;
$(function () {
    $('#buscarCP').on('click', function (e) {
        e.preventDefault();
        var cp = document.getElementById('id_codigoPostal').value;
        if (cp.length === 5) {
            var data = {action: 'search_cp', cp: cp}
            $.post(window.location.pathname, data, function (res) {
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
                document.getElementById('id_razonSocial').value = res.razonSocial;
                document.getElementById('id_cuenta').value = res.cuenta;
                document.getElementById('id_idCuenta').value = res.idCuenta;
                document.getElementById('id_RFC').value = res.RFC;
                document.getElementById('id_carrier').value = res.carrier;
                document.getElementById('id_calle').value = res.calle;
                document.getElementById('id_noExt').value = res.noExt;
                document.getElementById('id_noInt').value = res.noInt;
                document.getElementById('id_email').value = res.email;
                document.getElementById('id_domicilioFiscal').value = res.domicilioFiscal;
                document.getElementById('id_domicilioEntrega').value = res.domicilioEntrega;
                document.getElementById('id_representanteLegal').value = res.representanteLegal;
                document.getElementById('id_personaAutorizada1').value = res.personaAutorizada1;
                document.getElementById('id_personaAutorizada2').value = res.personaAutorizada2;
                document.getElementById('id_telefono1').value = res.telefono1;
                document.getElementById('id_telefono2').value = res.telefono2;
                document.getElementById('id_telefonoPersonaAutorizada1').value = res.telefonoPersonaAutorizada1;
                document.getElementById('id_telefonoPersonaAutorizada2').value = res.telefonoPersonaAutorizada2;
                document.getElementById('id_estado').value = res.estado;
                document.getElementById('id_municipio').value = res.municipio;
                document.getElementById('id_codigoPostal').value = res.codigoPostal;
                //  Poner valor al input select
                var option = document.createElement("option");
                option.text = res.colonia;
                document.getElementById('id_colonia').append(option);
                document.getElementById('encargado').value = res.encargado;
                document.getElementById('elite').value = res.elite;
                document.getElementById('segmento').value = res.segmento;
                document.getElementById('goOrden').setAttribute('href', 'orden/' + res.cuenta + "/");
                //$('select[name="codigoPostal"]').val(res.codigoPostal.idCodigoPostal).trigger('change.select2');
                llamarDN(res.idEmpresa);
            }
        });
    });

    //funcion de validaciones
    function validarFormulario() {
        var nombres = /^[a-zA-ZÀ-ÿ\s]{8,128}$/; // Letras y espacios, pueden llevar acentos.
        var telefono = /^\d{10}$/; //  10
        var idCuent = /^\d{9}$/; //  10
        var curp = /^[a-zA-ZÀ-ÿ\d]{10,13}$/; // Letras, numeros
        var correo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var social = /^.[a-zA-ZÀ-ÿ\s\d]{9,128}$/;
        var valCuenta = /^(\d|)*\.?(\d|)*\.?(\d)*\d$/;
        if (valCuenta.test(document.getElementById('id_cuenta').value)) {
            if (idCuent.test(document.getElementById('id_idCuenta').value)) {
                if (curp.test(document.getElementById('id_RFC').value)) {
                    if (correo.test(document.getElementById('id_email').value)) {
                        if (nombres.test(document.getElementById('id_representanteLegal').value)) {
                            if (telefono.test(document.getElementById('id_telefono1').value)) {
                                if (telefono.test(document.getElementById('id_telefono2').value)) {
                                    if (nombres.test(document.getElementById('id_personaAutorizada1').value)) {//
                                        if (telefono.test(document.getElementById('id_telefonoPersonaAutorizada1').value)) {
                                            if (nombres.test(document.getElementById('id_personaAutorizada2').value)) {//
                                                if (telefono.test(document.getElementById('id_telefonoPersonaAutorizada2').value)) {
                                                    return true;
                                                } else {
                                                    Swal.fire({
                                                        title: 'Error!',
                                                        text: 'TelefonoPersonaAutorizada2 inválido',
                                                        icon: 'error'
                                                    });
                                                }
                                            } else {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'PersonaAutorizada2 inválido',
                                                    icon: 'error'
                                                });
                                            }
                                        } else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'TelefonoPersonaAutorizada1 inválido',
                                                icon: 'error'
                                            });
                                        }
                                    } else {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'PersonaAutorizada1 inválido',
                                            icon: 'error'
                                        });
                                    }
                                } else {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Teléfono2 inválido',
                                        icon: 'error'
                                    });
                                }
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Teléfono1 inválido',
                                    icon: 'error'
                                });
                            }
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Representante legal inválido',
                                icon: 'error'
                            });
                        }
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Correo inválido',
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'RFC inválido',
                        icon: 'error'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Id de la Cuenta inválido, solo se permiten 9 números',
                    icon: 'error'
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Cuenta inválida, no se permite letras',
                icon: 'error'
            });
        }
        return false;
    }

    // Boton submit del formulario, para petición con ajax
    $('form').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        if (validarFormulario()) {
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                Swal.fire({
                    title: 'Alerta',
                    text: '¡Se ha guardado correctamente!',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        // location.href = '{{ list_url }}';
                    }
                });
            });
        }
    });

    // Ajax para los DN que se encuentran relacionados con la cuenta
    function llamarDN(idemp) {
        tablaDN = $('#data').DataTable({
            responsive: true,
            autoWidth: false,
            destroy: true,
            deferRender: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {
                    'action': 'searchDN',
                    'idEmpresa': idemp
                },
                dataSrc: ""
            },
            columns: [
                {"data": "idVenta"},
                {"data": "empresaDn.dn"},
                {"data": "plazo"},
                {"data": "plan.plan"},
                {"data": "fechaInicial"},
                {"data": "fechaTermino"},
                {"data": "idVenta"},
            ],
            columnDefs: [
                {
                    targets: [-1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        var buttons = '<a rel="orden" class="btn btn-success btn-xs"><i class="fas fa-plus-circle"></i></a> ';
                        return buttons;
                    }
                },
            ],
            initComplete: function (settings, json) {

            }
        });
        // Index a la primer columna de la tabla
        tablaDN.on('order.dt search.dt', function () {
            tablaDN.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    }

    // acción del boton orden, que permite enviar un ajax para evaluar su agregación a orden
    $('#data tbody')
        .on('click', 'a[rel="orden"]', function () {
            var tr = tablaDN.cell($(this).closest('td, li')).index();
            var data = tablaDN.row(tr.row).data();
            var dnOrden = data.empresaDn.dn;
            var fecha = data.fechaTermino;
            var data = {action: 'agregarOrden', dn: dnOrden, fechaTermino: fecha};
            $.post(window.location.pathname, data, function (res) {
                if (res.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.error,
                    });
                }
                if (res.message) {
                    Swal.fire(
                        '¡Correcto!',
                        res.message,
                        'success'
                    );
                }
            });
        });
});