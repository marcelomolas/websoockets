"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = require("uuid");

var hosps = [{
  id: (0, _uuid.v4)(),
  titulo: "hospital 1",
  camas: [{
    id: (0, _uuid.v4)(),
    ocupada: true
  }, {
    id: (0, _uuid.v4)(),
    ocupada: false
  }, {
    id: (0, _uuid.v4)(),
    ocupada: false
  }]
}, {
  id: (0, _uuid.v4)(),
  titulo: "hospital 2",
  camas: [{
    id: (0, _uuid.v4)(),
    ocupada: false
  }, {
    id: (0, _uuid.v4)(),
    ocupada: false
  }]
}, {
  id: (0, _uuid.v4)(),
  titulo: "hospital 3",
  camas: [{
    id: (0, _uuid.v4)(),
    ocupada: true
  }]
}];
var log = [];

var _default = function _default(io) {
  io.on("connection", function (socket) {
    console.log("nuevo socket connectado:", socket.id); // El estatus del hospital lo calcula el cliente

    socket.emit("server:loadhosps", hosps); //anhadir cama

    socket.on("client:addcama", function (hospId) {
      console.log(hospId);
      var cama = {
        id: (0, _uuid.v4)(),
        ocupada: false
      };
      hosps = hosps.map(function (hosp) {
        if (hosp.id === hospId) {
          hosp.camas.push(cama);
        }

        return hosp;
      });
      log.push({
        fecha: Date.now(),
        hospital: hospId,
        cama: cama.id,
        operacion: "anhadir cama"
      });
      io.emit("server:loadhosps", hosps);
    }); //eliminar cama

    socket.on("client:deletecama", function (hospId, camaId) {
      console.log(hospId);
      console.log(camaId);
      hosps = hosps.map(function (hosp) {
        if (hosp.id === hospId) {
          hosps.camas = hosps.camas.filter(function (cama) {
            return cama.id !== camaId;
          });
        }

        return hosp;
      });
      log.push({
        fecha: Date.now(),
        hospital: hospId,
        cama: camaId,
        operacion: "Eliminar cama"
      });
      io.emit("server:loadhosps", hosps);
    }); //ocupar cama

    socket.on("client:ocuparcama", function (hospId, camaId) {
      console.log(hospId);
      console.log(camaId);
      hosps = hosps.map(function (hosp) {
        if (hosp.id === hospId) {
          hosps.camas = hosps.camas.map(function (cama) {
            if (cama.id === camaId) {
              cama.ocupada = true;
            }
          });
        }

        return hosp;
      });
      log.push({
        fecha: Date.now(),
        hospital: hospId,
        cama: cama.id,
        operacion: "ocupar cama"
      });
      io.emit("server:loadhosps", hosps);
    }); //desocupar cama

    socket.on("client:desocuparcama", function (hospId, camaId) {
      console.log(hospId);
      console.log(camaId);
      hosps = hosps.map(function (hosp) {
        if (hosp.id === hospId) {
          hosps.camas = hosps.camas.map(function (cama) {
            if (cama.id === camaId) {
              cama.ocupada = false;
            }
          });
        }

        return hosp;
      });
      log.push({
        fecha: Date.now(),
        hospital: hospId,
        cama: cama.id,
        operacion: "desocupar cama"
      });
      io.emit("server:loadhosps", hosps);
    });
    socket.on("disconnect", function () {
      console.log(socket.id, "disconnected");
    });
  });
};

exports["default"] = _default;