$(document).ready(function () {
    // Función para cargar los datos de la tabla inicialmente
    function cargarDatos(boton) {
        $.ajax({
            url: '/Ventas/seguimientoVentas/?boton=' + boton,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Llena la tabla con los datos recibidos
                $('#data tbody').empty();
                $.each(data, function (index, item) {
                    var estadoButton = '';

                    // Verificar si el estado es 'Completada' o 'Cancelada'
                    if (item.estatus === 'Completada' || item.estatus === 'Cancelada' || item.estatus === 'Devuelta' || item.estatus === 'Reembolsada') {
                        // Enviar solo texto
                        estadoButton = `<span style="font-weight: bold;">${item.estatus}</span>`;
                    } else {
                        // Crear el botón
                        estadoButton = `<button class="btn custom-button" data-toggle="modal" data-target="#miModal" 
                        data-idventa="${item.idVenta}" data-razon-social="${item.clienteId__razonSocial}" data-rfc="${item.clienteId__RFC}" 
                        data-telefono="${item.clienteId__telefono}" data-estatus="${item.estatus}" 
                        data-comentario="${item.comentario}" 
                        style="background-color: #004680 !important; color: white !important;">${item.estatus}</button>`;
                    }

                    // Agregar fila a la tabla
                    $('#data tbody').append(`
                        <tr>
                            <td>${item.idVenta}</td>
                            <td>${item.clienteId__razonSocial}</td>
                            <td>${item.clienteId__RFC}</td>
                            <td>${item.clienteId__telefono}</td>
                            <td>${item.comentario}</td>
                            <td>${estadoButton}</td>
                            ${item.estatus === 'Completada' ?
                                `<td>
                                <button class="btn btn-success btn-sm devuelta-button" data-idventa="${item.idVenta}">Devuelta</button>
                                <button class="btn btn-warning btn-sm reembolsada-button" data-idventa="${item.idVenta}">Reembolsada</button>
                            </td>` :
                                item.estatus !== 'Reembolsada' && item.estatus !== 'Devuelta' && item.estatus !== 'Cancelada' ?
                                    `<td><button class="btn btn-danger cancelar-button" data-idventa="${item.idVenta}">Cancelar</button></td>` :
                                    '<td></td>'
                            }
                            </td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }






    
    // Llama a cargarDatos para mostrar la tabla inicialmente
    cargarDatos('default'); // 'default' representa la consulta predeterminada

    // Agrega eventos de clic a tus botones de filtro
    $('#btnPendiente').click(function () {
        cargarDatos('pendiente'); // 'pendiente' representa la consulta para el botón "Pendiente"
    });

    $('#btnEsperaPago').click(function () {
        cargarDatos('espera_pago'); // 'espera_pago' representa la consulta para el botón "En espera de pago"
    });

    $('#btnProceso').click(function () {
        cargarDatos('proceso'); // 'proceso' representa la consulta para el botón "En proceso"
    });


    $('#btnRevision').click(function () {
        cargarDatos('revision'); // 'proceso' representa la consulta para el botón "En proceso"
    });
    $('#btnEnviada').click(function () {
        cargarDatos('enviada'); // 'proceso' representa la consulta para el botón "En proceso"
    });
    $('#btnEntregada').click(function () {
        cargarDatos('entregada'); // 'proceso' representa la consulta para el botón "En proceso"
    });
    $('#btnCompletada').click(function () {
        cargarDatos('completada'); // 'proceso' representa la consulta para el botón "En proceso"
    });
    $('#btnRembolsada').click(function () {
        cargarDatos('rembolsada'); // 'proceso' representa la consulta para el botón "En proceso"
    });
    $('#btnDevuelta').click(function () {
        cargarDatos('devuelta'); // 'proceso' representa la consulta para el botón "En proceso"
    });
    $('#btnCancelada').click(function () {
        cargarDatos('cancelada'); // 'proceso' representa la consulta para el botón "En proceso"
    });




    

    $(document).on('click', '.custom-button', function () {
        // Obtener los datos de los atributos data del botón
        var razonSocial = $(this).data('razon-social');
        var rfc = $(this).data('rfc');
        var telefono = $(this).data('telefono');
        var estatus = $(this).data('estatus');
        var comentario = $(this).data('comentario');
        var idVenta = $(this).data('idventa');
    



        // Depurar los datos obtenidos
        console.log("Razón Social:", razonSocial);
        console.log("RFC:", rfc);
        console.log("Teléfono:", telefono);
        console.log("Estatus:", estatus);
        console.log("Comentario:", comentario);
    
        // Llenar los campos del modal con los datos
        $('#idVenta').val(idVenta);
        $('#razonSocial').val(razonSocial);
        $('#rfc').val(rfc);
        $('#telefono').val(telefono);
        $('#estatus').val(estatus);
        $('#comentarioTextarea').val(comentario);
    

        
 $('#miModal').modal('show');



        
       
    });





     
    
 // Agrega un controlador de eventos para el botón "Guardar Cambios"
 $('#guardarCambios').click(function () {
    // Obtener los valores de los campos del modal
    var idVenta = $('#idVenta').val();
    var nuevoEstatus = determinarNuevoEstatus($('#estatus').val()); // Necesitas implementar la función determinarNuevoEstatus
    var comentario = $('#comentarioTextarea').val();
    

    // Realizar la solicitud AJAX para guardar los cambios
    $.ajax({
        url: '/Ventas/guardarCambios/',
        type: 'POST',
        data: {
            idVenta: idVenta,
            nuevoEstatus: nuevoEstatus,
            comentario: comentario,
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
        },
        success: function (data) {
            // Manejar la respuesta del servidor, por ejemplo, actualizar la tabla
            cargarDatos('default');

            Swal.fire({
                title: 'Alerta',
                text: '¡Se ha guardado correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                
                }
            });




            // Cerrar el modal después de guardar los cambios
            $('#miModal').modal('hide');
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// Función para determinar el nuevo estatus basado en el estatus actual
function determinarNuevoEstatus(estatusActual) {
    switch (estatusActual) {
        case 'Pendiente':
            return 'En espera de pago';
        case 'En espera de pago':
            return 'En proceso';
        case 'En proceso':
            return 'En revisión';
        case 'En revisión':
            return 'Enviada';
        case 'Enviada':
            return 'Entregada';
        case 'Entregada':
            return 'Completada';
        default:
            return estatusActual; // No se puede cambiar si ya está completada
    }
}



$(document).on('click', '.devuelta-button', function () {
    var idVenta = $(this).data('idventa');
    $('#comentarioModal').modal('show');

    $('#guardarComentario').off('click').on('click', function () {
        var comentario = $('#comentarioTextareaModal').val();
        guardarComentario(idVenta, 'Devuelta', comentario);
        $('#comentarioModal').modal('hide');
    });
});

$(document).on('click', '.reembolsada-button', function () {
    var idVenta = $(this).data('idventa');
    $('#comentarioModal').modal('show');

    $('#guardarComentario').off('click').on('click', function () {
        var comentario = $('#comentarioTextareaModal').val();
        guardarComentario(idVenta, 'Reembolsada', comentario);
        $('#comentarioModal').modal('hide');
    });
});



$(document).on('click', '.cancelar-button', function () {
    var idVenta = $(this).data('idventa');
    $('#comentarioModal').modal('show');

    $('#guardarComentario').off('click').on('click', function () {
        var comentario = $('#comentarioTextareaModal').val();
        guardarComentario(idVenta, 'Cancelada', comentario);
        $('#comentarioModal').modal('hide');
    });
});


function guardarComentario(idVenta, nuevoEstatus, comentario) {
    // Realiza la solicitud AJAX para guardar el comentario y actualizar el estado
    $.ajax({
        url: '/Ventas/guardarComentario/',  // Ajusta la ruta según tu configuración
        type: 'POST',
        data: {
            idVenta: idVenta,
            nuevoEstatus: nuevoEstatus,
            comentario: comentario,
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
        },
        success: function (data) {
            // Manejar la respuesta del servidor, por ejemplo, actualizar la tabla
            cargarDatos('default');

            Swal.fire({
                title: 'Alerta',
                text: '¡Se ha guardado el comentario y actualizado el estado correctamente!',
                icon: 'success',
                timer: 2000,
                onClose: () => {
                    // Puedes realizar acciones adicionales después de cerrar la alerta
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}




$('#btnTodo').click(function () {
    // Obtén los valores de la lista desplegable y el cuadro de texto
    var tipoCampo = $('#tipoCampo').val();
    var valor = $('#valor').val();

    // Realiza la solicitud AJAX para buscar y cargar los datos
    $.ajax({
        url: '/Ventas/buscarDatos/',
        type: 'POST',  // Ajusta el tipo de solicitud según tus necesidades
        data: {
            tipoCampo: tipoCampo,
            valor: valor,
            csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]').val(),
        },
        success: function (data) {
           
            if (data.length > 0) {
            // Llenar la tabla con los datos recibidos
            $('#data tbody').empty();
                $.each(data, function (index, item) {
                    var estadoButton = '';

                    // Verificar si el estado es 'Completada' o 'Cancelada'
                    if (item.estatus === 'Completada' || item.estatus === 'Cancelada' || item.estatus === 'Devuelta' || item.estatus === 'Reembolsada') {
                        // Enviar solo texto
                        estadoButton = `<span style="font-weight: bold;">${item.estatus}</span>`;
                    } else {
                        // Crear el botón
                        estadoButton = `<button class="btn custom-button" data-toggle="modal" data-target="#miModal" 
                        data-idventa="${item.idVenta}" data-razon-social="${item.clienteId__razonSocial}" data-rfc="${item.clienteId__RFC}" 
                        data-telefono="${item.clienteId__telefono}" data-estatus="${item.estatus}" 
                        data-comentario="${item.comentario}" 
                        style="background-color: #004680 !important; color: white !important;">${item.estatus}</button>`;
                    }

                    // Agregar fila a la tabla
                    $('#data tbody').append(`
                        <tr>
                            <td>${item.idVenta}</td>
                            <td>${item.clienteId__razonSocial}</td>
                            <td>${item.clienteId__RFC}</td>
                            <td>${item.clienteId__telefono}</td>
                            <td>${item.comentario}</td>
                            <td>${estadoButton}</td>
                            ${item.estatus === 'Completada' ?
                                `<td>
                                <button class="btn btn-success btn-sm devuelta-button" data-idventa="${item.idVenta}">Devuelta</button>
                                <button class="btn btn-warning btn-sm reembolsada-button" data-idventa="${item.idVenta}">Reembolsada</button>
                            </td>` :
                                item.estatus !== 'Reembolsada' && item.estatus !== 'Devuelta' && item.estatus !== 'Cancelada' ?
                                    `<td><button class="btn btn-danger cancelar-button" data-idventa="${item.idVenta}">Cancelar</button></td>` :
                                    '<td></td>'
                            }
                            </td>
                        </tr>
                    `);
                });
            } else {
                // Mostrar mensaje de error con SweetAlert
                Swal.fire({
                    title: 'Alerta',
                    text: 'No se encontraron resultados.',
                    icon: 'error',
                    timer: 2000,
                    onClose: () => {
                        // Puedes realizar acciones adicionales después de cerrar la alerta
                    }
                });
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error.responseText);
          
            
        }
    });
});


});
