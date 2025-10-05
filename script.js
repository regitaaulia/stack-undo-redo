let stack = [];
let redoStack = [];
let history = [];

function saveToLocalStorage() {
    localStorage.setItem("stack", JSON.stringify(stack));
    localStorage.setItem("redoStack", JSON.stringify(redoStack));
    localStorage.setItem("history", JSON.stringify(history));
}

function loadFromLocalStorage() {
    const stackData = localStorage.getItem("stack");
    const redoData = localStorage.getItem("redoStack");
    const historyData = localStorage.getItem("history");

    stack = stackData ? JSON.parse(stackData) : [];
    redoStack = redoData ? JSON.parse(redoData) : [];
    history = historyData ? JSON.parse(historyData) : [];

    updateDisplay();
}

function pushChange() {
    const input = document.getElementById("changeInput").value;
    if (input) {
        stack.push(input);
        history.push(input);
        redoStack = [];
        document.getElementById("changeInput").value = "";
        saveToLocalStorage();
        updateDisplay();
    }
}

function popChange() {
    if (stack.length > 0) {
        const change = stack.pop();
        redoStack.push(change);
        alert("Undo perubahan: " + change);
        saveToLocalStorage();
        updateDisplay();
    } else {
        alert("Stack kosong!");
    }
}

function redoChange() {
    if (redoStack.length > 0) {
        const change = redoStack.pop();
        stack.push(change);
        alert("Redo perubahan: " + change);
        saveToLocalStorage();
        updateDisplay();
    } else {
        alert("Tidak ada perubahan untuk redo!");
    }
}

function peekChange() {
    if (stack.length > 0) {
        alert("Perubahan terakhir: " + stack[stack.length - 1]);
    } else {
        alert("Stack kosong!");
    }
}

function updateDisplay() {
    const stackDisplay = document.getElementById("stackDisplay");
    stackDisplay.innerHTML = "<h3>Riwayat Undo (Stack):</h3><ul>" +
        stack.map(change => `<li>${change}</li>`).reverse().join("") +
        "</ul>";

    const historyDisplay = document.getElementById("historyDisplay");
    historyDisplay.innerHTML = "<h3>Semua Data yang Pernah Dimasukkan:</h3><ul>" +
        history.map(change => `<li>${change}</li>`).join("") +
        "</ul>";
}

window.onload = loadFromLocalStorage;
