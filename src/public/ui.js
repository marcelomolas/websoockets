const notesList = document.querySelector("#notes");

let savedId = "";

const noteUI = (hosp) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${hosp.titulo}</h1>
          <div>
              <button class="btn btn-secondary update" data-id="${hosp.id}">editar camas</button>
          </div>
      </div>
      <p>${hosp.porcentaje}% de camas ocupadas</p>
  </div>
`;
 
  const btnUpdate = div.querySelector(".update");

  btnUpdate.addEventListener("click", () => {
    socket.emit("client:getnote", btnUpdate.dataset.id);
  });

  return div;
};

const renderNotes = (notes) => {
  savedId = "";
  notesList.innerHTML = "";
  
  
  var notes = notes.map((hosp) => {
    var cont = 0;
    for(i = 0 ; i< hosp.camas.length ; i++){
      if(hosp.camas[i].ocupada)
        cont++;
    }
    return {...hosp, "porcentaje": Math.round(cont/hosp.camas.length*100)};
  });
  console.log(notes);
  notes.forEach((note) => {
    notesList.append(noteUI(note));
  });
};

const appendNote = (note) => {
  notesList.append(noteUI(note));
};
