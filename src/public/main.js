const noteForm = document.querySelector("#noteForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (savedId) {
    updateNote(savedId, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }
  
  //texto estatico solicitado en primer parcial =Aramy Rolon
  console.log("Hola Mundo");
  //texto estatico del primer parcial = Marcelo Molas
  console.log("Hola Profeeee");
	//texto estatico del primer parcial = Carin Martinez
  console.log("Hoy es sabado");
  title.value = "";
  description.value = "";

  title.focus();
});
