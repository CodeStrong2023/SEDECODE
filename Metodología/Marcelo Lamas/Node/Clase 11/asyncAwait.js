//La palabra async no es necesaria
async function hola(nombre){
    return new Promise(function (resolve, reject) {
        setTimeout( function() {
            console.log('Hola '+nombre);
            resolve(nombre);

        }, 1000);
    });
}

async function hablar(nombre){
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('bla bla');
            resolve(nombre);
        }, 1000);
});
}

async function adios(nombre){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            console.log('Adios '+nombre);
            resolve();
        }, 1000);

    });
}

async function main(){
    Let nombre = await hola('Ariel');
    await hablar();
    await hablar();
    await hablar();
    await adios(nombre);
}