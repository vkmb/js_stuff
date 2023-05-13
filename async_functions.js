setTimeout(
    (args) => {
        console.log(args);
    },
    5000,
    "Run timeout"
);

console.log("Run Main");
let num = 1;
let interval = setInterval(
    () => {
        console.log(num++);
        if (num > 10){
            console.log("clearing " + interval);
            clearInterval(interval);
        }
    },
    2000
    )

// All async functions are provided via web apis and js doesn't have any async except for fetch.