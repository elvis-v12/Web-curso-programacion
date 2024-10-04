let mysql=require("mysql");

let conexion=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webcursos'

});
conexion.connect(function(err){
    if(err) {
        throw err;

    }else{
        console.log("Conectado a la base de datos");
    }
});


/*
function mostrarDatos() {
    conexion.query("SELECT * FROM usuarios", function(err, filas) {
        if (err) {
            throw err;
        } else {
            console.log(filas);
        }
    });
}
mostrarDatos();*/
conexion.end();
