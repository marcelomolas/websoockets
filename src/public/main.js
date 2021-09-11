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
  
  title.value = "";
  description.value = "";

  title.focus();
});
