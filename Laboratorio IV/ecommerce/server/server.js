const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const path = require("path")
const { Client } = require('pg') // Funcion que me permite conectarme a la bd


const connectionData = {
	user: 'sedecode',
	host: 'localhost',
	database: 'sedecode',
	password: 'sedecode',
	port: 5432,
  }
  const client = new Client(connectionData)

  client.connect()

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "TEST-8984584947035732-110809-57e9bd7292f56485fa88e609da2c205b-444290765",
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

app.get("/login", function (req, res) {
    PathFile = path.join(__dirname, "..", "client", "media", "login.html")
    console.log(PathFile)
	res.sendFile(PathFile);
});

app.get("/", function (req, res) {
    PathFile = path.join(__dirname, "..", "client", "media", "index.html")
    console.log(PathFile)
	res.sendFile(PathFile);
});
app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080",
			"failure": "http://localhost:8080",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});


// Nueva ruta para traer datos de dim_product
app.get('/api/productos', async (req, res) => {
	try {
	  const result = await client.query('SELECT * FROM public.dim_product_laboratorio');
	  res.status(200).json(result.rows); // Enviamos los datos obtenidos en formato JSON
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: 'Error al consultar los productos' });
	}
  });
  

// Nueva ruta para autenticar y verificar el acceso de un usuario
app.post('/api/user', async (req, res) => {
	try {
	  const { client_name, client_password } = req.body;
  
	  // Verificamos si se recibieron los parámetros
	  if (!client_name || !client_password) {
		return res.status(400).json({ error: 'Faltan parámetros: client_name o client_password' });
	  }
  
	  // Consulta a la base de datos para verificar las credenciales
	  const result = await client.query(
		'SELECT client_name, client_password FROM public.dim_client_laboratorio WHERE client_name = $1 AND client_password = $2',
		[client_name, client_password]
	  );
  
	  // Si existe un registro con esas credenciales
	  if (result.rows.length > 0) {
		return res.status(200).json({ message: 'Acceso autorizado' });
	  } else {
		return res.status(401).json({ error: 'Credenciales incorrectas' });
	  }
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: 'Error al consultar el usuario' });
	}
  });

  
app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});

