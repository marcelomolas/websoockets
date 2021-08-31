"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notesList = document.querySelector("#notes");
var savedId = "";

var noteUI = function noteUI(hosp) {
  var div = document.createElement("div");
  div.innerHTML = "\n  <div class=\"card card-body rounded-0 animate__animated animate__fadeInUp mb-2\">\n      <div class=\"d-flex justify-content-between\">\n          <h1 class=\"card-title h3\">".concat(hosp.titulo, "</h1>\n          <div>\n              <button class=\"btn btn-secondary update\" data-id=\"").concat(hosp.id, "\">editar camas</button>\n          </div>\n      </div>\n      <p>").concat(hosp.porcentaje, "% de camas ocupadas</p>\n  </div>\n");
  var btnUpdate = div.querySelector(".update");
  btnUpdate.addEventListener("click", function () {
    socket.emit("client:getnote", btnUpdate.dataset.id);
  });
  return div;
};

var renderNotes = function renderNotes(notes) {
  savedId = "";
  notesList.innerHTML = "";
  var notes = notes.map(function (hosp) {
    var cont = 0;

    for (i = 0; i < hosp.camas.length; i++) {
      if (hosp.camas[i].ocupada) cont++;
    }

    return _objectSpread(_objectSpread({}, hosp), {}, {
      "porcentaje": Math.round(cont / hosp.camas.length * 100)
    });
  });
  console.log(notes);
  notes.forEach(function (note) {
    notesList.append(noteUI(note));
  });
};

var appendNote = function appendNote(note) {
  notesList.append(noteUI(note));
};