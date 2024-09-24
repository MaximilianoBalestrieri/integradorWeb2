const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const path = require('path'); // no hace falta instalar
const translate = require('node-google-translate-skidz'); // npm install node-google-translate-skidz (librería para traducir)

// configurar express
const app = express();

// middleware globales (middle => mitad ware => softWARE)}
app.use(express.static(path.join(__dirname, 'public'))); // Configura en la carpeta public contenido estático(HTML, CSS, JS, imáges, audios...etc)
app.use(express.json()); // Nos permiten mandar un BODY cuando hagamos una solicitud POST (para traducir)
app.use(express.urlencoded({ extended: false })); //Nos permiten mandar un BODY cuando hagamos una solicitud POST (para traducir)
app.use(cors('*')); // Configura el CORS para todos los dominios (para poder hacer andar esta app en VERCEL)

// rutas
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

  // response.send(texto.toUpperCase());
  // response.json({ traduccion: texto.toUpperCase() });
});

/* app.get('/hola', (request, response) => {
  response.send('Hola mundo');
}); */

// poner el servidor a escuchar en el puerto 3005
app.listen(3005, () => {
  console.log(`Servidor corriendo en: http://localhost:${3005}`);
});
