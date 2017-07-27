const addTask = document.querySelector(".add-tasks");
let uList = document.querySelector("#list");
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

function addToList(e) {
	e.preventDefault();
	let text = document.querySelector("[name=newTask]").value;
	const newTask = {
		text,
		done: false
	};
	taskArray.push(newTask);
	localStorage.setItem("tasks", JSON.stringify(taskArray));
	this.reset();
	trifecta();
}

function toggleChecked(e) {
	if (!e.target.matches("input")) return; // skip this unless it's an input
	const el = e.target;
	const index = el.dataset.index;
	taskArray[index].done = !taskArray[index].done;
	localStorage.setItem("tasks", JSON.stringify(taskArray));
	trifecta();
}

function deleteTask(e) {
	if (!e.target.matches("div")) return; // skip this unless it's a div
	const elId = e.target.id;
	const parentEl = e.target.parentElement;
	taskArray.splice(elId, 1);
	localStorage.setItem("tasks", JSON.stringify(taskArray));
	setTimeout(function () {
		parentEl.classList.add("easeOut");
	},0);
	parentEl.addEventListener("transitionend", function() {
		trifecta();
	});
}

function populateList(tasks, tasksList) {
	tasksList.innerHTML = tasks.map((task, i) => {
		return `
		<li>
			<input type="checkbox" data-index=${i} id="task${i}" ${task.done ? "checked" : ""} />
        	<label for="task${i}">${task.text}</label>
			<div id="${i}" class="delete"> 🗑️ </div>
        </li>
    	`;
	}).join("");
}

function toggleGrey() {
	let label;
	taskArray.forEach((task, i) => {
		if (task.done === true) {
			label = document.querySelector(`label[for="task${i}"]`);
			label.classList.add("greyedOut");
		}
	});
}

function hookEvents() {
	const delButtons = document.querySelectorAll(".delete");
	delButtons.forEach(delButton => {
		delButton.addEventListener("click", deleteTask);
	});
}

function trifecta() {
	populateList(taskArray, uList);
	toggleGrey();
	hookEvents();
}

addTask.addEventListener("submit", addToList);
uList.addEventListener("click", toggleChecked);
trifecta();
