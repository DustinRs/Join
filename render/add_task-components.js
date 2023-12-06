function renderAddTaskSections(){
    return/*html*/`
    <h1 class="title">Add Task</h1>
        <div class="sections">
      <div class="leftSection">
        <p>Title<span class="span">*</span></p>
        <input id="title" type="text" placeholder="Enter a title" required/>

        <p>Description</p>
        <textarea id="description" placeholder="Enter a Description" cols="30" rows="10" required></textarea>

        <p>Assigned to</p>
        <div class="selectContainer">
        <select class="select-box" id="assign" >
          <option value="" style="display: none;">Select contacts to assign</option>

        </select>
        <div class="divIcon"><i><img src="/assets/img/arrow_drop_down.png" alt=""></i></div>
        </div>
      </div>

      <div class="border"></div>

      <div class="rightSection">
        <p>Due date<span class="span">*</span></p>
        <input id="date" type="date" required/>

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
        
        <div class="selectContainer">
          <select  class="select-box" id="category" required>
            <option value="" style="display: none;">Select task category</option>
            <option value="technical-task">Technical Task</option>
            <option value="user-story">User Story</option>
          </select>
          <div class="divIcon"><i><img src="/assets/img/arrow_drop_down.png" alt=""></i></div>
          </div>
        <p>Subtasks</p>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons">
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
        <div class="selectContainer">
        <input class="select-box" id="subTask" type="text" placeholder="Add new subtask" />
        <div class="divIcon"><i><img src="/assets/img/board-plus.png" alt=""></i></div>
          </div>
         </div>
      </div>
      <div class="bottomSection">
      <p ><span class="span">*</span>This field is required</p>
      <div>
        <button class="clearButton">Clear <img src="/assets/img/btn-x.png" alt="" /></button>
        <button class="createTaskButton" onclick="addTask()">Create Task <img src="/assets/img/checkbtn-checkmark.png" alt="" /></button>
      </div>
    </div>
    `
}

//überall status suchen