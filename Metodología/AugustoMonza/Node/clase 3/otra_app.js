console.log('inicio del programa');
setTimeout(() => {
    console.log('primer timeout del programa');
}, 3000);

setTimeout(() => {
    console.log('segundo timeout del programa');
}, 0);

setTimeout(() => {
    console.log('tercer timeout del programa');
}, 0);

console.log('fin del programa');