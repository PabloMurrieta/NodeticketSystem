import TikecktControl from "../models/ticket-control.js";

const ticketControl = new TikecktControl();


const socketController = (socket) => {
    



    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente;
        callback(siguiente)

        //TODO- noficar que hay un nuevo ticket pendiente de asignar
        


    })

}



export {
    socketController
}

