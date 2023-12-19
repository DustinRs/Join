function clearContacts(){
    contacts=[];
    return setContacts(contactKey, contacts);
}

function clearTasks(){
    allTasks=[];
    return setAllTasks(tasksKey, allTasks);
}