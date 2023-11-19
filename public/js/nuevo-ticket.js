//referencias
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('#btnCrear')




const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

   
});




btnCrear.addEventListener( 'click', () => {

   
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        console.log(ticket);
    });

});