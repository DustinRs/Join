function clearContacts(){
    contacts=[];
    return setContacts(contactKey, contacts);
}

function clearTasks(){
    subTasks=[];
    return setAllTasks(tasksKey, allTasks);
}