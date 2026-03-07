const loadData = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayIssues(json.data))
}


// {
// "id": 38,
// "title": "Add version control for documents",
// "description": "Implement version history so users can track changes and revert to previous versions.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "medium",
// "author": "version_vince",
// "assignee": "",
// "createdAt": "2024-01-21T10:15:00Z",
// "updatedAt": "2024-01-21T10:15:00Z"
// },

const displayIssues = (issues) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let issue of issues) {
        const div = document.createElement('div');

        const priorityClass = issue.priority === "high" ? "btn-error" : (issue.priority === "medium" ? "btn-warning" : "btn-soft text-gray-400");
        const borderTop = issue.status === "open" ? "border-t-green-600" : "border-t-purple-600" 

        div.innerHTML = `
            <div class="p-4 rounded-md border-t-4 space-y-2 shadow-xl ${borderTop}">
                <div class="flex justify-between">
                    <img src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                    <button class="btn btn-sm w-20 h-6 rounded-2xl btn-soft ${priorityClass}">${issue.priority.toUpperCase()}</button>
                </div>
                <p class="text-[14px] font-semibold">${issue.title}</p>
                <p class="text-[12px] text-gray-400">${issue.description}</p>
                <div class="mb-3">
                    <button class="btn btn-sm h-6 rounded-2xl btn-outline btn-warning bg-amber-100">HIGH</button>
                    <button class="btn btn-sm h-6 rounded-2xl btn-outline btn-warning bg-amber-100">Bug</button>
                </div>
                <div class="py-4 border-t-2 border-t-gray-400/10">
                    <p class="text-[12px] text-gray-400">Auther Name</p>
                    <p class="text-[12px] text-gray-400">Date</p>
                </div>
            </div>
        `
        cardContainer.appendChild(div);
    }
}

loadData();