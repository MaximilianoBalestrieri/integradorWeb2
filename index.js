const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const translate = require('node-google-translate-skidz'); 


const app = express();


app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cors('*')); 


// una ruta de tipo POST para traducir
app.post('/traducir', async (request, response) => {
  const titulo = request.body.titulo;
  const dinastia = request.body.dinastia;
  const cultura = request.body.cultura;
  const fecha = request.body.fecha;

  const tituloTraducido = await translate(
    {
      text: titulo,
      source: 'en',
      target: 'es',
    },
    function (result) {
      return result;
    }
  );

  const dinastiaTraducida = await translate(
    {
      text: dinastia,
      source: 'en',
      target: 'es',
    },
    function (result) {
      return result;
    }
  );

  const culturaTraducida = await translate(
    {
      text: cultura,
      source: 'en',
      target: 'es',
    },
    function (result) {
      return result;
    }
  );
  const fechaTraducida = await translate(
    {
      text: fecha,
      source: 'en',
      target: 'es',
    },
    function (result) {
      return result;
    }
  );

  response.json({
    tituloTraducido: tituloTraducido.sentences[0].trans,
    dinastiaTraducida: dinastiaTraducida.sentences[0].trans,
    culturaTraducida: culturaTraducida.sentences[0].trans,
    fechaTraducida: fechaTraducida.sentences[0].trans,
  });

});


/* poner el servidor a escuchar en el puerto 3005*/
//app.listen(3005, () => {
  //console.log(`Servidor corriendo en: http://localhost:${3005}`);
  app.listen('/traducir', () => {
  
  console.log(`Servidor corriendo en: http://localhost:${3005}`);
});
