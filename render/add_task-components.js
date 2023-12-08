function renderAddTaskSections() {
  return/*html*/`
<h1 class="title">Add Task</h1>
<div class="sections">
    <div class="leftSection">
        <p>Title<span class="span">*</span></p>
        <div class="input-group sub-container">
            <input id="title" class="form-control subtask-input" type="text" placeholder="Enter a title" required />
        </div>
        <p>Description</p>
        <div id="area-container" class="input-group sub-container">
            <textarea id="description" class="form-control subtask-input" placeholder="Enter a Description" cols="30"
                rows="10" required></textarea>
        </div>
        <p>Assigned to</p>
        <div class="relative">
            <div id="assign-select" class="input-group sub-container">
                <input class="form-control subtask-input contact-assign-select select" onclick="openList('assign-select','assign','assign-ul','assign-icon')"
                    placeholder="Select contacts to assign" id="assign">
                <button id="assign-icon" class="divIcon" onclick="openList('assign-select','assign','assign-ul','assign-icon')"><img src="/assets/img/arrow_drop_down.png" alt=""></button>
            </div>
            <div id="assign-ul" class="ul-parent d-none">
                <ul class="drop-down-select-container ">
                    <li class=contact>
                        <div class="profile">
                            <div class="icon">*Bild*</div>
                            <div class="name">*Name*</div>
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="check1">
                            <img id="img-box1" src="/assets/img/checkbox.png" onclick="checkboxClick(1)" alt="checkbox">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="border"></div>
    <div class="rightSection">
        <p>Due date<span class="span">*</span></p>
        <div class="input-group sub-container">
            <input id="date" class="form-control subtask-input" type="date" required />
        </div>
        <p>Prio</p>
        <div id="prio">
            <div class="prio Urgent">
                <label>
                    <input id="urgent" type="checkbox" value="Urgent" onclick="checkBoxClicked('urgent')">
                    <span>Urgent <img class="prioImgs" src="/assets/img/urgent-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Medium">
                <label>
                    <input id="medium" type="checkbox" value="Medium" onclick="checkBoxClicked('medium')">
                    <span>Medium <img class="prioImgs" src="/assets/img/medium-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Low">
                <label>
                    <input id="low" type="checkbox" value="Low" onclick="checkBoxClicked('low')">
                    <span>Low <img class="prioImgs" src="/assets/img/low-priority.png" alt=""></span>
                </label>
            </div>
        </div>
        <p>Category<span class="span">*</span></p>

        <div class="relative">
            <div id="category-select"  class="input-group sub-container">
                <input class="form-control subtask-input contact-assign-select select" value=""
                    placeholder="Select task category" id="category"  onclick="openList('category-select','category','category-ul','category-icon')" readonly required>
                <button id="category-icon" class="divIcon" onclick="openList('category-select','category','category-ul','category-icon')"><img src="/assets/img/arrow_drop_down.png" alt=""></button>
            </div>
            <div id="category-ul" class="ul-parent d-none">
                <ul class="drop-down-select-container">
                    <li class=contact>
                        <div class="profile">
                            <div class="name" onclick="setValue('Technical Task');closeList('category-select','category','category-ul','category-icon')">Technical Task</div>
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="check3">
                        </div>
                    </li>
                    <li class=contact>
                        <div class="profile">
                            <div class="name" onclick="setValue('User Story');closeList('category-select','category','category-ul','category-icon')">User Story</div>
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="check2">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <p>Subtasks</p>
        <div id="sub-container" class="input-group sub-container">
            <input id="subtask-input" type="text" class="form-control subtask-input" placeholder="Substask"
                aria-label="Recipient's username with two button addons"
                onclick="subTaskActive()">
            <button class="btn btn-outline-secondary sub-active" onclick="subTaskActive()" id="sub-plus" type="button"><img id="sub-btn-plus"
                    src="/assets/img/dark-plus.png" alt="" ></button>
                    <div id="sub-btn" class="d-flex d-none">
                        <button class="btn sub-active" id="cross-btn" type="button" onclick="subTaskClose()"><img id="cross"
                                src="/assets/img/btn-x.png" alt=""></button>
                        <div id="border"></div>
                        <button class="btn sub-active" id="check-btn" type="button"><img id="add-subtask"
                                src="/assets/img/darkCheckmark.png" alt=""></button>
                    </div>
                </div>
    </div>
</div>
</div>
<div class="bottomSection">
    <p><span class="span">*</span>This field is required</p>
    <div>
        <button class="clearButton">Clear <img src="/assets/img/btn-x.png" alt="" /></button>
        <button class="createTaskButton" onclick="addTask()">Create Task <img src="/assets/img/checkbtn-checkmark.png"
                alt="" /></button>
    </div>
</div>
`}