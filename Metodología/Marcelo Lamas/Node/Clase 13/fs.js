const fs = requiere('fs');

function leer(ruta, cb){
    fs.readFile(ruta, (err,data) => {
        cb(data.toString());
    })
}

leer(${__dirname}/archivo.txt, console.log);

function escribir(rutam contenido, cb) {
    fs.writeFile(ruta, contenido, function (err){
        ir (err) {
            console.log('No se ha podido escribir', err);
        } else {
            console.log('Se  ha escrito correctamente');
        }
    })
}

escribir(${__dirname}/archivo1.txt, 'Soy un nuevo archivo', console.log);