function newTask() {
	var task = prompt("Entrez une nouvelle tache");
	insertTask(task);
	saveCookie();
}

function insertTask(task, before = true) {
	var list = document.getElementById("ft_list");
	if (task != "") {
		var taskDiv = document.createElement("div");
		taskDiv.innerHTML = task;
		taskDiv.name = task;
		taskDiv.setAttribute("onclick", "delTask(this)")
		if (before)
			list.insertBefore(taskDiv, list.childNodes[0]);
		else
			list.appendChild(taskDiv);
	}
}

function delTask(task) {
	if (confirm("Etes vous sur de vouloir supprimer la tâche '" + task.innerHTML + "'")) {
		var list = document.getElementById("ft_list");
		list.removeChild(task);
		saveCookie();
	}
}

function saveCookie() {
	var list = document.getElementById("ft_list");
	var listChildren = list.children;
	var str = "";
	for (var i = 0; i < listChildren.length; i++) {
		str += listChildren[i].innerHTML + "|";
	}
	document.cookie = "tasks=" + str + "; expires=Thu, 18 Dec 2020 12:00:00 UTC";
}

function readCookie() {
	var cookie = document.cookie.split(";")[0];
	var name = cookie.split("=")[0];
	var cookieValue = cookie.split("=")[1];
	if (name == "tasks") {
		var tasks = cookieValue.split("|");
		tasks.forEach(function(item) {
			insertTask(item, false);
		});
	}
}

readCookie();
