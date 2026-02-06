const cl = console.log;

let todosArr = [
  { todoItem: 'CSS', todoId: '1' },
  { todoItem: 'JS and Es6', todoId: '2' }
];

const todoForm = document.getElementById('todoForm');

function createLists(arr) {
  let result = '<ul class="list-group">';

  arr.forEach(ele => {
    result += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${ele.todoId}">
        <strong>${ele.todoItem}</strong>
        <div>
          <i class="fa-solid fa-pen-to-square fa-2x text-primary editBtn" role="button"></i>
          <i class="fa-solid fa-trash-can fa-2x text-danger deleteBtn" role="button"></i>
        </div>
      </li>
    `;
  });

  result += '</ul>';

  const todoContainer = document.getElementById('todoContainer');
  todoContainer.innerHTML = result;
}

createLists(todosArr);



// ===============================
// ADD TODO
// ===============================
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const todoItemControl = document.getElementById('todoItem');
  const val = todoItemControl.value.trim();
  if (!val) return;

  let newObj = {
    todoItem: val,
    todoId: uuidv4()
  };

  todosArr.push(newObj);
  todoItemControl.value = '';
  createLists(todosArr);

  // ✅ center popup
  Swal.fire({
    icon: "success",
    title: "Todo added",
    showConfirmButton: false,
    timer: 1200,
    position: "center"
  });
});



// ===============================
// DELETE & EDIT
// ===============================
const todoContainer = document.getElementById('todoContainer');

todoContainer.addEventListener('click', function (e) {

  // DELETE
  if (e.target.classList.contains('deleteBtn')) {

    const li = e.target.closest('li');
    const id = li.getAttribute('data-id');

    Swal.fire({
      title: "Are you sure?",
      text: "Todo will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes delete"
    }).then((result) => {

      if (result.isConfirmed) {

        todosArr = todosArr.filter(todo => todo.todoId !== id);
        createLists(todosArr);

        Swal.fire({
          icon: "success",
          title: "Todo deleted",
          showConfirmButton: false,
          timer: 1200,
          position: "center"
        });
      }

    });
  }


  // EDIT
  if (e.target.classList.contains('editBtn')) {

    const li = e.target.closest('li');
    const id = li.getAttribute('data-id');

    let obj = todosArr.find(todo => todo.todoId === id);

    let updatedValue = prompt('Edit Todo', obj.todoItem);
    if (!updatedValue) return;

    obj.todoItem = updatedValue;
    createLists(todosArr);

    Swal.fire({
      icon: "success",
      title: "Todo updated",
      showConfirmButton: false,
      timer: 1200,
      position: "center"
    });
  }

});



// ===============================
// UUID FUNCTION
// ===============================
function uuidv4() {
  return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
