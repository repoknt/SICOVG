$(function () {
    evaluarSelect();

    $("form").on('submit', function (e) {
        e.preventDefault();
        var razon = document.getElementById("txtRazon").value;
        var persona = document.getElementById("txtPersona").value;
        var tel = document.getElementById("txtTelefono").value;

        if (razon === "" || razon == null || razon === "NULL") {
            msjError("Falta la razón social");
        } else if (persona === "" || persona == null || persona === "NULL") {
            msjError("Falta la persona Autoriazada")
        } else if (tel === "" || tel == null || tel === "NULL") {
            msjError("Falta el telefono de referencia");
        } else {
            var parameters = new FormData(this);
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                Swal.fire({
                    title: 'Alerta',
                    text: '¡Se ha guardado correctamente!',
                    icon: 'success',
                    timer: 2000,
                    onClose: () => {
                        location.href = '/atencionclientes/verTicket/';
                    }
                });
            });
        }
    });

    $('#btnBuscarCuenta').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: {
                "action": "buscarCuenta",
                "cuenta": document.getElementById("txtCuenta").value,
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
        }).done(function (data) {
            if (data.error) {
                msjError(data.error);
            } else {
                document.getElementById("txtRazon").value = data.razonSocial;
                document.getElementById("txtPersona").value = data.personaAutorizada;
                document.getElementById("txtTelefono").value = data.telAutorizada;
                for (value in data.dns.sort()) {
                    var option = document.createElement("option");
                    option.text = data.dns[value];
                    document.getElementById('txtDN').append(option);
                }
            }
        });
    });

    $('#slcMovimiento').on('change', function (e) {
        cambiarnombreLbl("lblDN", "DN");
        cambiarnombreLbl("lblArchivo1", "Archivo 1");
        cambiarnombreLbl("lblArchivo2", "Archivo 2");
        cambiarnombreLbl("lblArchivo3", "Archivo 3");
        evaluarSelect();
    });

    function evaluarSelect() {
        var slcMov = document.getElementById("slcMovimiento").value;
        if (slcMov == "REMPLAZO DE TARJETA SIM POR ROBO O EXTRAVÍO") {
            componentesRemplazoTarjeta();
        } else if (slcMov == "SWITCHEO DE LÍNEA") {
            switcheo();
        } else if (slcMov == "LIBERACIÓN DE EQUIPO") {
            liberacionEquipo()
        } else if (slcMov == "ACLARACIÓN DE FACTURA") {
            cambiarnombreLbl("lblArchivo1", "Factura");
        } else if (slcMov == "CANCELACIÓN DE LÍNEAS" || slcMov == "INCREMENTAR PLAN TARIFARIO O QUITAR CONTROL") {
            liberacionEquipo();
        } else if (slcMov == "PORTABILIDAD") {
            cambiarnombreLbl("lblDN", "Número Provisional");
            cambiarnombreLbl("lblArchivo1", "INE del Representante legal");
        } else if (slcMov == "CAMBIO DE NÚMERO O LADA") {
            cambiarnombreLbl("lblArchivo1", "Carta Membretada");
            cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
        } else if (slcMov == "RETROCESO DE PORTABILIDAD") {
            retroceso();
        } else if (slcMov == "SEGURO DE EQUIPO") {
            cambiarnombreLbl("lblArchivo1", "Carta Membretada");
            cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
        } else if (slcMov == "CONTRATACIÓN DE CONTROL") {
            cambiarnombreLbl("lblArchivo1", "Carta Membretada");
            cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
        } else if (slcMov == "DETALLE DE CONSUMO") {
            cambiarnombreLbl("lblArchivo1", "Carta Membretada");
            cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
        }
    }

    function retroceso() {
        cambiarnombreLbl("lblArchivo1", "Carta Membretada");
        cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
        cambiarnombreLbl("lblArchivo3", "Tarjeta SIM nueva");
    }

    function liberacionEquipo() {
        cambiarnombreLbl("lblArchivo1", "Carta Membretada");
        cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
    }

    function switcheo() {
        cambiarnombreLbl("lblArchivo1", "Tarjeta SIM nueva");
    }

    function componentesRemplazoTarjeta() {
        cambiarnombreLbl("lblArchivo1", "Carta Membretada");
        cambiarnombreLbl("lblArchivo2", "INE del Representante legal");
        cambiarnombreLbl("lblArchivo3", "Tarjeta SIM nueva");
    }

    function cambiarnombreLbl(lblId, valor) {
        document.getElementById(lblId).textContent = valor;
    }

    $('#btnQuestion').on('click', function (e) {
        e.preventDefault();
        var slcMov = document.getElementById("slcMovimiento");
        if (slcMov.value === "SUSPENCIÓN DE LÍNEA") {
            msjQuestion(slcMov.value, "Mientras el servicio esta suspendido. \n" +
                "No se puede usar ni comprar con tu número, tu numero permanecera suspendido hasta que lo reactives.\n" +
                "Tus cargos mensuales del plan continúan.");
        } else if (slcMov.value === "REMPLAZO DE TARJETA SIM POR ROBO O EXTRAVÍO") {
            msjQuestion(slcMov.value, "Para recuperar el servicio de tu línea telefonica es necesario adquirir una tarjeta\n" +
                "SIM VIRGEN del lado ROJO/EMPRESARIAL en el centro de atención más cercano.\n" +
                "NOTA: \n" +
                "1.-EN DADO CASO DE NO PODER ACUDIR EL REPRESENTANTE LEGAL SERA NECESARIO QUE PRESENTE UNA CARTA PODER LA PERSONA QUE IRA DIRECTAMENTE A RECOGER LA TARJETA SIM JUNTO CON LA COPIA DE LA INE DEL REPRESENTE LEGAL REGISTRADO EN LA CUENTA.\n" +
                "2.- SI NO CUENTAS CON LA CLAVE DE RECUPERACIÓN FAVOR DE INDICARLO EN LA CARTA.");
        } else if (slcMov.value === "SWITCHEO DE LÍNEA") {
            msjQuestion(slcMov.value, "Activa la nueva tarjeta SIM que llego en tu renovación.\n" +
                "NOTA: SE RECOMIENDA ADJUNTAR ANEXO MULTILINEA");
        } else if (slcMov.value === "LIBERACIÓN DE EQUIPO") {
            msjQuestion(slcMov.value, "Para la liberación de un equipo en caso de no poderlo realizar en la pagina de AT&T debes de corroborar que ya haya finalizado su plazo forzoso para dicho movimiento.");
        } else if (slcMov.value === "MANTENIMIENTO DE LÍNEA") {
            msjQuestion(slcMov.value, "En esta opción puedes reportar si alguna línea presenta fallas en su servicio de voz y datos.");
        } else if (slcMov.value === "ACLARACIÓN DE FACTURA") {
            msjQuestion(slcMov.value, "Si te llegaron cargos adicionales en la factura no renocidos te apoyamos para hacer el ajuste correspondiente");
        } else if (slcMov.value === "FALLA DE MENSAJES Y MENSAJES CORTOS") {
            msjQuestion(slcMov.value, "En esta opción puedes reportar si alguna línea presenta fallas para recibir y enviar mensajes de texto.");
        } else if (slcMov.value === "CANCELACIÓN DE LÍNEAS") {
            msjQuestion(slcMov.value, "Para cancelar líneas de una cuenta es importante especificar lo siguiente: \n" +
                "Si el representate legal es hombre el ejecutivo debe de comunicarse al *611 en donde lo estarán canalizando con el área de gestiones especiales para comenzar con el tramite.\n" +
                "\n" +
                "Una vez este realizada la llamada enviar la documentación correspondiente.\n");
        } else if (slcMov.value === "PROMESA DE PAGO") {
            msjQuestion(slcMov.value, "Si tu fecha  límite de pago llego y te quitaron el servicio se puede solicitar una promesa de pago la cual tiene una vigencia de 72 hrs.\n" +
                "\n" +
                "Nota: Si en este lapso no se respeta este convenio y no se realiza el pago no será posible solicitar nuevamente esta solicitud hasta dentro de 3 meses. ");
        } else if (slcMov.value === "INCREMENTAR PLAN TARIFARIO O QUITAR CONTROL") {
            msjQuestion(slcMov.value, "Al quitarle el control a un línea es necesario subirlo al plan que sigue, de lo contrario no se puede.\n" +
                "\n" +
                "NOTA: Al momento de solicitar este movimiento tener en consideración que al realizar cambios que no estaban en el contrato pierde toda promoción adquirida, ejemplo: el doble de GB.");
        } else if (slcMov.value === "PORTABILIDAD") {
            msjQuestion(slcMov.value, "La portabilidad nos ayuda a cambiarnos de compañía sin perder nuestro número preferido");
        } else if (slcMov.value === "CAMBIO DE NÚMERO O LADA") {
            msjQuestion(slcMov.value, "Solicita un nuevo número telefonico ");
        } else if (slcMov.value === "RETROCESO DE PORTABILIDAD") {
            msjQuestion(slcMov.value, "Si portaron tu línea sin tu consentimiento solicita el reverso.");
        } else if (slcMov.value === "DETALLE DE CONSUMO ") {
            msjQuestion(slcMov.value, "Aquí puedes solicitar el desglose de llamadas o datos consumidos.");
        } else if (slcMov.value === "SEGURO DE EQUIPO") {
            msjQuestion(slcMov.value, "Este servicio te respalda en caso de robo, fallas o daños fuera de la garantía que regularmente te ofrece la marca de tu Smartphone.\n" +
                "*Este movimiento se puede realizar solo en los primeros 30 días despues de la renovación*");
        } else if (slcMov.value === "CONTRATACIÓN DE CONTROL") {
            msjQuestion(slcMov.value, "El Add On Control te permite limitar el consumo de datos de navegación incluidos mensualmente en tu plan para evitar cargos adicionales en tu factura.\n" +
                "NOTA: En dado caso de que la línea aún no concluya su plazo será necesario incrementar el plan para dicho movimiento.");
        }
    });

    function msjError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }

    function msjQuestion(title, msj) {
        Swal.fire(
            title,
            msj,
            'question'
        )
    }
});