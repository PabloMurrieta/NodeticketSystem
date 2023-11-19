import json from '../db/data.json' assert { type: 'json' };
import path  from 'path';
import * as url from 'url';
import fs from 'fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

class Ticket{

    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio ;
    }
}

class TikecktControl {

    constructor(){

        //Ultimo ticket
        this.ultimo     = 0;
        //Fecha
        this.hoy        = new Date().getDate();// 11
        //tickects pendientes
        this.tickets    = [];
        //Ultimos 4 
        this.ultimos4   = [];
        
        this.init();
    }

    get toJson(){
        
        return{
            ultimo   : this.ultimo,
            hoy      : this.hoy,
            tickets  : this.tickets,
            ultimos4 : this.ultimos4
        }
    
    }

    init(){
        const {hoy, tickets, ultimo, ultimos4 } = json;

        if(hoy == this.hoy){
            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            //Es otro dia
            this.guardarDB();
        }


      }

    guardarDB(){

        const dbpath = path.join(__dirname,'../db/data.json');
        fs.writeFileSync(dbpath,JSON.stringify(this.toJson) );


    }

    siguiente(){
        //crear el siguiente 
        this.ultimo += 1;
        // crearnuevo usando la clase
        //Le mandamos el numero siendo this.ultimo +1 y el escriotrio en null porque no tiene n
        const ticket = new  Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        // guardar en db
        this.guardarDB;

        return 'Ticket' + ticket.numero;
    }

    atenderTicket(escriotrio){
        //No tenemos tickets
        if(this.tickets.length == 0){
            return null;
        }

        //Borrar primer elemento
        const ticket = this.tickets.shift();

        ticket.escriotrio = escriotrio,

        //Agregar al arreglo
        this.ultimos4.unshift(ticket);
        //vaidar que sean menos de 4


        if(this.ultimos4.length > 4){

            this.ultimos4.splice(-1,1);

        }

        this.guardarDB();

        return ticket;

    }

}


export default TikecktControl