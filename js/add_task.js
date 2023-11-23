let allTasks = [];

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