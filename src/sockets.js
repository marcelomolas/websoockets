import { v4 as uuid } from "uuid";

let hosps = [
  {
    id: uuid(),
    titulo: "hospital 1",
    camas: [
      {
        id:uuid(),
        ocupada:true,
      },
      {
        id:uuid(),
        ocupada:false,
      },
      {
        id:uuid(),
        ocupada:false,
      },
    ]
  },
  {
    id: uuid(),
    titulo: "hospital 2",
    camas: [
      {
        id:uuid(),
        ocupada:false,
      },
      {
        id:uuid(),
        ocupada:false,
      },
    ]
  },
  {
    id: uuid(),
    titulo: "hospital 3",
    camas: [
      {
        id:uuid(),
        ocupada:true,
      },
    ]
  }
];

const log = [];


export default (io) => {
  io.on("connection", (socket) => {

    console.log("nuevo socket connectado:", socket.id);

    // El estatus del hospital lo calcula el cliente
    socket.emit("server:loadhosps",hosps);

    //anhadir cama
    socket.on("client:addcama", (hospId) => {
      console.log(hospId);
      const cama = {id:uuid(),ocupada:false};
      hosps = hosps.map((hosp) => {
        if (hosp.id === hospId) {
          hosp.camas.push(cama);
        }
        return hosp;
      });
      log.push({fecha : Date.now(), hospital: hospId, cama: cama.id, operacion: "anhadir cama"});
      io.emit("server:loadhosps", hosps);
    });

    //eliminar cama
    socket.on("client:deletecama", (hospId,camaId) => {
      console.log(hospId);
      console.log(camaId);

      hosps = hosps.map((hosp) => {
        if (hosp.id === hospId) {
          hosps.camas = hosps.camas.filter((cama) => cama.id !== camaId);
        }
        return hosp;
      });
      log.push({fecha : Date.now(), hospital: hospId, cama: camaId, operacion: "Eliminar cama"});
      io.emit("server:loadhosps", hosps);
    });

    //ocupar cama
    socket.on("client:ocuparcama", (hospId,camaId) => {
      console.log(hospId);
      console.log(camaId);

      hosps = hosps.map((hosp) => {
        if (hosp.id === hospId) {
          hosps.camas = hosps.camas.map((cama) => {
            if(cama.id === camaId){
              cama.ocupada = true
            }
          })
        }
        return hosp;
      });
      log.push({fecha : Date.now(), hospital: hospId, cama: cama.id, operacion: "ocupar cama"});
      io.emit("server:loadhosps", hosps);
    });

    //desocupar cama
    socket.on("client:desocuparcama", (hospId,camaId) => {
      console.log(hospId);
      console.log(camaId);

      hosps = hosps.map((hosp) => {
        if (hosp.id === hospId) {
          hosps.camas = hosps.camas.map((cama) => {
            if(cama.id === camaId){
              cama.ocupada = false
            }
          })
        }
        return hosp;
      });
      log.push({fecha : Date.now(), hospital: hospId, cama: cama.id, operacion: "desocupar cama"});
      io.emit("server:loadhosps", hosps);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
