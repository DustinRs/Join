let allTasks = [];
const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

function addTask() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let prio = document.getElementById('urgent').value;
    let category = document.getElementById('category').value;
    let subTask = document.getElementById('subTask').value;
    let task = {
        'title': title,
        'description': description,
        'date': date,
        'prio': prio,
        'category': category,
        'subTask': subTask
    };
    console.log(task);
    allTasks.push(task);



    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);

}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString) || [];
}

function checkBoxClicked(id) {
    let checkbox = document.getElementById(id);
    if (checkbox.checked) {
        console.log(checkbox.value);
        
    }
}

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}
