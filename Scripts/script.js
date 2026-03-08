const loadData = () => {
    spinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => segragateIssues(json.data))
}

const allIssues = [];
const openIssues = [];
const closedIssues = [];
let filterCards = [];

const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

const spinner = (status) => {
    if(status) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issue-container").classList.add("hidden");
    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("issue-container").classList.remove("hidden");
    }
}

const segragateIssues = (issues) => {
    for (let issue of issues) {
        allIssues.push(issue);
        (issue.status === 'open' ? openIssues.push(issue) : closedIssues.push(issue));
    }
    displayIssues();
}

// Issue counter
const updateIssueCount = (issues) => {
    const noOfIssues = document.getElementById("number-of-issues");
    noOfIssues.innerText = issues.length;
}

const loadIssueDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayModalInfo(details.data);
}

const displayModalInfo = (issue) => {

    const infoContainer = document.getElementById("info-container");

    const statusBadge =
        issue.status === "open"
            ? `<span class="badge badge-success text-white">Opened</span>`
            : `<span class="badge badge-secondary text-white">Closed</span>`;

    const priorityBadge =
        issue.priority === "high"
            ? "badge-error"
            : issue.priority === "medium"
                ? "badge-warning"
                : "badge-neutral";

    const labelsHTML = issue.labels.map(label => {

        if (label === "bug") {
            return `<span class="badge badge-outline badge-error gap-1 badge-sm bg-red-100">
                        <i class="fa-solid fa-bug"></i> BUG
                    </span>`;
        }

        else if (label === "help wanted") {
            return `<span class="badge badge-outline badge-warning gap-1  badge-sm bg-amber-100">
                        <i class="fa-solid fa-life-ring"></i> HELP WANTED
                    </span>`;
        }

        else if (label === "enhancement") {
            return `<span class="badge badge-outline badge-success gap-1  badge-sm bg-green-100">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
                    </span>`;
        }
        else if (label === "documentation") {
            return `<span class="badge badge-outline badge-info  badge-sm bg-blue-100">
                        DOCUMENTATION
                    </span>`
        }
        else {
            return `<span class="badge badge-outline badge-secondary  badge-sm bg-pink-100">
                        GOOD FIRST ISSUE
                    </span>`
        }

    }).join("");

    infoContainer.innerHTML = `
    
        <h2 class="text-2xl font-bold mb-2">${issue.title}</h2>

        <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
            ${statusBadge}
            <span>Opened by ${issue.author}</span>
            <span>•</span>
            <span>${new Date(issue.createdAt).toLocaleDateString("en-US")}</span>
        </div>

        <div class="flex gap-2 mb-4">
            ${labelsHTML}
        </div>

        <p class="text-gray-600 mb-6">
            ${issue.description}
        </p>

        <div class="bg-gray-100 rounded-lg p-4 flex justify-between items-center">

            <div>
                <p class="text-sm text-gray-500">Assignee:</p>
                <p class="font-semibold">
                    ${issue.assignee ? issue.assignee : issue.author}
                </p>
            </div>

            <div>
                <p class="text-sm text-gray-500">Priority:</p>
                <span class="badge ${priorityBadge} text-white uppercase">
                    ${issue.priority}
                </span>
            </div>

        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-sm btn-primary">Close</button>
            </form>
        </div>

    `;

    document.getElementById("my_modal_5").showModal();
};

const displayIssues = () => {
    updateIssueCount(allIssues);

    btnOpen.classList.remove("btn-primary");
    btnClosed.classList.remove("btn-primary");
    btnAll.classList.add("btn-primary");

    btnOpen.classList.add("btn-outline");
    btnClosed.classList.add("btn-outline");
    btnAll.classList.remove("btn-outline");


    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let issue of allIssues) {

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
            else if (label === "documentation") {
                return {
                    class: "btn-outline btn-info bg-blue-100",
                    icon: ""
                };
            }
            else {
                return {
                    class: "btn-outline btn-secondary bg-pink-100",
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
            <div onclick="loadIssueDetail(${issue.id})" class="p-4 rounded-md border-t-4 space-y-2 shadow-xl ${borderTop}">
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
    spinner(false);
}


const displayOpenIssues = () => {
    spinner(true);
    updateIssueCount(openIssues);

    btnAll.classList.remove("btn-primary");
    btnClosed.classList.remove("btn-primary");
    btnOpen.classList.add("btn-primary");

    btnAll.classList.add("btn-outline");
    btnClosed.classList.add("btn-outline");
    btnOpen.classList.remove("btn-outline");

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let issue of openIssues) {

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
            else if (label === "documentation") {
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
            <div onclick="loadIssueDetail(${issue.id})" class="p-4 rounded-md border-t-4 space-y-2 shadow-xl ${borderTop}">
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
    spinner(false);
}


const displayClosedIssues = () => {
    spinner(true);
    updateIssueCount(closedIssues);

    btnAll.classList.remove("btn-primary");
    btnOpen.classList.remove("btn-primary");
    btnClosed.classList.add("btn-primary");

    btnAll.classList.add("btn-outline");
    btnOpen.classList.add("btn-outline");
    btnClosed.classList.remove("btn-outline");

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let issue of closedIssues) {

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
            else if (label === "documentation") {
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
            <div onclick="loadIssueDetail(${issue.id})" class="p-4 rounded-md border-t-4 space-y-2 shadow-xl ${borderTop}">
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
    spinner(false);
}

const searchRes = () => {
    spinner(true);
    updateIssueCount(filterCards);

    btnOpen.classList.remove("btn-primary");
    btnClosed.classList.remove("btn-primary");
    btnAll.classList.remove("btn-primary");

    btnOpen.classList.add("btn-outline");
    btnClosed.classList.add("btn-outline");
    btnAll.classList.add("btn-outline");


    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let issue of filterCards) {

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
            else if (label === "documentation") {
                return {
                    class: "btn-outline btn-info bg-blue-100",
                    icon: ""
                };
            }
            else {
                return {
                    class: "btn-outline btn-secondary bg-pink-100",
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
            <div onclick="loadIssueDetail(${issue.id})" class="p-4 rounded-md border-t-4 space-y-2 shadow-xl ${borderTop}">
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
    spinner(false);
}

document.getElementById("search-input").addEventListener("input", () => {
    const input = document.getElementById("search-input").value.toLowerCase();

    if (input === "" || input === null) {
        displayIssues();
    } else {
        filterCards = allIssues.filter((issue) => {
            return issue.title.toLowerCase().includes(input);
        });
        searchRes();
    }
});

loadData();