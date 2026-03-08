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
    updateIssueCount(issues);

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let issue of issues) {
        const div = document.createElement('div');

        const priorityClass = issue.priority === "high" ? "btn-error" : (issue.priority === "medium" ? "btn-warning" : "btn-soft text-gray-400");

        const borderTop = issue.status === "open" ? "border-t-green-600" : "border-t-purple-600";

        const getLabelInfo = (label) => {
            if (label === "bug") {
                return {
                    class: "btn-outline btn-error bg-red-100",
                    icon: `<i class="fa-solid fa-bug" style="color: rgb(234, 20, 20);"></i>`
                };
            }
            else if (label === "help wanted") {
                return {
                    class: "btn-outline btn-warning bg-amber-100",
                    icon: `<i class="fa-solid fa-life-ring" style="color: #d97706;"></i>`
                };
            }
            else if (label === "enhancement") {
                return {
                    class: "btn-outline btn-success bg-green-100",
                    icon: `<i class="fa-solid fa-wand-magic-sparkles" style="color: #00a96e;"></i>`
                };
            }
            else if (label === "documentation"){
                return {
                    class: "btn-outline btn-info bg-blue-100",
                    icon: ""
                };
            }
            else {
                return {
                    class: "btn-outline btn-secondary bg-red-100",
                    icon: ""
                };
            }
        };

        const labelsHTML = issue.labels.map(label => {
            const labelInfo = getLabelInfo(label);
            return `
                <button class="btn btn-sm h-6 rounded-2xl flex items-center gap-1 ${labelInfo.class}">
                    ${labelInfo.icon}
                    ${label.toUpperCase()}
                </button>
            `;
        }).join("");

        //  for bug <i class="fa-solid fa-bug" style="color: rgb(234, 20, 20);"></i>
        //  for help <i class="fa-solid fa-life-ring" style="color: #d97706;"></i>
        //  for enhancement <i class="fa-solid fa-wand-magic-sparkles" style="color: #00a96e;"></i>  

        div.innerHTML = `
            <div class="p-4 rounded-md border-t-4 space-y-2 shadow-xl ${borderTop}">
                <div class="flex justify-between">
                    <img src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
                    <button class="btn btn-sm w-20 h-6 rounded-2xl btn-soft ${priorityClass}">${issue.priority.toUpperCase()}</button>
                </div>
                <p class="text-[14px] font-semibold">${issue.title}</p>
                <p class="text-[12px] text-gray-400">${issue.description}</p>
                <div class="mb-3 flex gap-1">
                    ${labelsHTML}
                </div>
                <div class="py-4 border-t-2 border-t-gray-400/10">
                    <p class="text-[12px] text-gray-400">by ${issue.author}</p>
                    <p class="text-[12px] text-gray-400">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                </div>
            </div>
        `
        cardContainer.appendChild(div);
    }
}

// Issue counter
const updateIssueCount = (issues) => {
    const noOfIssues = document.getElementById("number-of-issues");
    noOfIssues.innerText = issues.length;
}

loadData();