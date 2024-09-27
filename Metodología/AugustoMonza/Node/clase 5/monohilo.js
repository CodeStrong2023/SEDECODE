console.log('Hola a toda la cohorte!!');

var i = 0;

setInterval(function(){
    console.log(i);
    i++;

    //Forzamos un error con lo siguiente:
    //if(i==5){
    //    console.log('Error');
    //    var a = 3 + z;
    //}
}, 1000);
console.log('segunda instruccion');