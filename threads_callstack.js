// Observe gobal callstack
// js engines are single threaded with async web apis, micro & macro queues , event loops and call stack(global execution stack)
// everything is first loaded into the memory heap and global execution stack is created for the window and then the functions are executed.

function log_first(){
    console.log("first...");
}

function log_second(){
    console.log("second...");
}

function log_third(){
    console.log("third...");
}

log_first();
log_second();
log_third();

function log_first(){
    console.log("first...");
    log_second();
}

function log_second(){
    console.log("second...");
    log_third();
}

function log_third(){
    console.log("third...");
}

log_first();