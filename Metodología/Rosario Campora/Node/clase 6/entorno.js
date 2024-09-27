let nombre = process.env.nombre;

console.log('hola '+ nombre);

let web = process.env.web || 'No tengo web';
console.log('mi web '+ web);