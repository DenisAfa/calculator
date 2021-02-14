let numbers = document.querySelectorAll(".number");
let operations = document.querySelectorAll(".operator");
let clearBtns = document.querySelectorAll(".clear-btn");
let decimalBtl = document.querySelector("#decimal");
let display = document.querySelector("#display");
let minus = document.querySelector("#minus")
let MemoryCurrentNumber = "0";
let MemoryNewNumber = false;
let MemoryPendingOperation = "";


for (let i=0; i<numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener("click", function(e){
        numberPress(e.target.textContent);
    });
};

for (let i=0; i<operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener("click", function(e){
        operation(e.target.textContent);
    })
};

for (let i=0; i<clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener("click", function(e) {
        clear(e.srcElement.id);
    })
};

minus.addEventListener("click", numberMinus);

decimalBtl.addEventListener("click", decimal);


function numberPress(num) {
    if (MemoryNewNumber) {
        display.value = num;
        MemoryNewNumber = false;
    } else {
        if (display.value === "0") {
            display.value = num;
        } else {
            display.value += num;
        }
    }
};

function operation(op) {
    let localOperationMemory = display.value;
    if (MemoryPendingOperation === "√") {
        if (localOperationMemory <= 0) {
            display.value = "Error";
            MemoryPendingOperation = op;
        } else {
            MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
            display.value = +MemoryCurrentNumber.toFixed(10);
            MemoryPendingOperation = op;
        }
    } else if (MemoryNewNumber && MemoryPendingOperation !=="=") {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === "+") {
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === "-") {
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === "*") {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === "/") {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === "xn" || MemoryPendingOperation === "n" ) {
            MemoryCurrentNumber **= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        }

    display.value = +MemoryCurrentNumber.toFixed(10);
    MemoryPendingOperation = op;
    
}
};

function decimal() {
    let localDecimalMemory = display.value;
    if (MemoryNewNumber) {
        localDecimalMemory = "0.";
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf(".") === -1) {
            localDecimalMemory += ".";
        }
    }

    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === "ce") {
        display.value = "0";
        MemoryNewNumber = true;
    } else if (id === "c") {
        display.value = "0";
        MemoryNewNumber = true;
        MemoryCurrentNumber = "0";
        MemoryPendingOperation = "";
    }
};

function numberMinus() {
    display.value = -display.value;
};



