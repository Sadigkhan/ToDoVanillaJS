window.addEventListener('DOMContentLoaded', function() {
    let toDoInput = document.querySelector(".ToDoInput");
    let submitButton = document.querySelector(".submit_button");
    let toDoList = document.querySelector(".ToDoList");
    let completedList = document.querySelector(".CompletedList");
  
    //Local Storage-de her hansi bir task varsa onu cekirik
    if (localStorage.getItem('tasks')) {
      // Tasklarin cekilmesi prossesi
      const tasks = JSON.parse(localStorage.getItem('tasks'));
  
      // Tasklar icinde donub HTML elemntlerini yaradirig
      tasks.forEach(function(task) {
        if (task.checked) {
          createCompletedTaskElement(task);
        } else {
          createTaskElement(task);
        }
      });
    }
  

    // Submit buttonu kliklendikde geden prossesler
    submitButton.onclick = function(e) {
      e.preventDefault();
  
      if (toDoInput.value === "") {
        alert("Please enter a task");
      } else {
        // Task obyekti yaradilir
        const task = {
          text: toDoInput.value,
          checked: false
        };
  
        // Task local storage-e elave edilir
        if (localStorage.getItem('tasks')) {
          const tasks = JSON.parse(localStorage.getItem('tasks'));
          tasks.push(task);
          localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
          localStorage.setItem('tasks', JSON.stringify([task]));
        }
  
        // Task elementi yaradilir ve ekranda gosterilir
        createTaskElement(task);
  
        // Input temizlenir
        toDoInput.value = "";
      }
    };
  


    // Task elementi yaradilmasi
    function createTaskElement(task) {
      let todoItem = document.createElement("div");
      let toDoCheckbox = document.createElement("input");
      let todoText = document.createElement("p");
      let todoDelete = document.createElement("button");
      todoDelete.textContent = "X";
  
      toDoCheckbox.type = "checkbox";
  
      toDoCheckbox.classList.add("ToDoCheckbox");
      todoItem.classList.add("ToDoItem");
      todoText.classList.add("ToDoText");
      todoDelete.classList.add("ToDoDelete");
  
      todoItem.appendChild(toDoCheckbox);
      todoItem.appendChild(todoText);
      todoItem.appendChild(todoDelete);
  
      toDoList.appendChild(todoItem);
  
      todoText.textContent = task.text;
      toDoCheckbox.checked = task.checked;
  
      // Add event listener to update local storage when checkbox is clicked
      toDoCheckbox.addEventListener('change', function() {
        task.checked = toDoCheckbox.checked;
        updateLocalStorage();
        if (task.checked) {
          createCompletedTaskElement(task);
          todoItem.remove();
        }
      });
  
      // Add event listener to delete the task and update local storage
      todoDelete.addEventListener('click', function() {
        todoItem.remove();
  
        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks'));
  
        // Find the task index
        const index = tasks.findIndex(function(item) {
          return item.text === task.text;
        });
  
        // Remove the task from the tasks array
        tasks.splice(index, 1);
  
        // Update local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
    }
  

    // Tamamlanmis task elementi yaradilmasi
    function createCompletedTaskElement(task) {
      let completedItem = document.createElement("div");
      let completedCheckbox = document.createElement("input");
      let completedText = document.createElement("p");
      let completedDelete = document.createElement("button");
      completedDelete.textContent = "X";
  
      completedCheckbox.type = "checkbox";
      completedCheckbox.checked = true;
  
      completedCheckbox.classList.add("CompletedCheckbox");
      completedItem.classList.add("CompletedItem");
      completedText.classList.add("CompletedText");
      completedDelete.classList.add("CompletedDelete");
  
      completedItem.appendChild(completedCheckbox);
      completedItem.appendChild(completedText);
      completedItem.appendChild(completedDelete);
  
      completedList.appendChild(completedItem);
  
      completedText.textContent = task.text;
  
      // Checkbox deyisimi ucun event listener elave edilir
      completedCheckbox.addEventListener('change', function() {
        task.checked = completedCheckbox.checked;
        updateLocalStorage();
        if (!task.checked) {
          createTaskElement(task);
          completedItem.remove();
        }
      });
  
      // Silinme ucun event listener elave edilir ve local storage yenilenir
      completedDelete.addEventListener('click', function() {
        completedItem.remove();
  
        // Local storage-den tasklarin cekilmesi
        const tasks = JSON.parse(localStorage.getItem('tasks'));
  
        // Task indexinin tapilmasi
        const index = tasks.findIndex(function(item) {
          return item.text === task.text;
        });
  
        // Arrayden silinme
        tasks.splice(index, 1);
  
        //Yenilenme
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
    }
  
    // Local storage-deki tasklarin yenilenmesi
    function updateLocalStorage() {
      const tasks = Array.from(document.querySelectorAll('.ToDoItem, .CompletedItem')).map(function(item) {
        const textElement = item.querySelector('.ToDoText, .CompletedText');
        const checkboxElement = item.querySelector('.ToDoCheckbox, .CompletedCheckbox');
  
        return {
          text: textElement.textContent,
          checked: checkboxElement.checked
        };
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  