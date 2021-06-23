// targeting the parent element
const taskContainer = document.querySelector('.task__container');


// global 
const globalStore = [];

// a function for creating a new card
const newCard = ({ id, imageUrl, taskTitle, taskType, taskDescription }) => `<div class="col-lg-4 col-md-6" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  </div>
  <img
    src=${imageUrl}
    class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;


const loadData = () => {

  // access localstorage
  // localStorage.getItem("tasky") ===  localStorage.tasky
  const getInitialData = localStorage.tasky;  // if null, then
  if (!getInitialData) return;

  // convert stringified-object to object
  const { cards } = JSON.parse(getInitialData);

  // map around the array to generate HTML card and inject it to DOM
  cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
  });
};

// create a function which will trigerred on clicking on save changes in the modal
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,   // generating a unique id for each card
    imageUrl: document.getElementById('imageurl').value,
    taskTitle: document.getElementById('tasktitle').value,
    taskType: document.getElementById('tasktype').value,
    taskDescription: document.getElementById('taskdescription').value
  };

  const createNewCard = newCard(taskData);
  taskContainer.insertAdjacentHTML("beforeend", createNewCard);

  globalStore.push(taskData);

  //  API  -> add t localStorage
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }))
  // provide some unique identification, i.e key, here key is "tasky", 

};

// const deleteCard( ()=>{

// })