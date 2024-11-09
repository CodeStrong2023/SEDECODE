function hola(nombre, miCallBack){
    setTimeout(function() {
        console.log('Hola '+nombre);
        miCallBack(nombre);
    }, 1000);
}


function adios(nombre, otroCallBack) {
    setTimeout( function() {
        console.log('Adios',nombre);
        otroCallBack();

    }, 1000);
}

function adios(nombre){
    return new Promise((resolve, reject) => {
        setTimeout( function(){
            console.log('Adios '+nombre);
            reject('Hay un error');
        }, 1000);    
    
});
}


console.log('Iniciando el proceso... ');
hola('Ariel')
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then((nombre) => {
        console.log('Terminado el proceso');
    })

