function changeToInput(id) {
    selected.subtasks.innerHTML = '';
    subtaskslist.map((item, index) => {
        if (id === index) {
            createSubtaskinput(index);
        } else {
            selected.subtasks.innerHTML += `<li class="subtaskitem" id="${index}">${item}</li>`;
        }
        editButtonfunctions();
    });
}

/**
 * Eventlistener for the editbuttons - deletes or saves the subtask
 */
function editButtonfunctions() {
    subtasksbuttons = document.querySelectorAll('.editbutton').forEach((button) => {
        button.addEventListener('click', (event) => {
            if (button.src.includes('trash')) {
                deleteSubtask(parseInt(button.parentNode.id));
            } else if (button.src.includes('okay')) {
                saveSubtask(parseInt(button.parentNode.id));
            }
        });
    });
}

function changeli() {
    listedsubtasks = document.querySelectorAll('.subtaskitem').forEach((item) => {
        item.addEventListener('dblclick', (event) => {
            changeToInput(parseInt(item.id));
        });
    });
}