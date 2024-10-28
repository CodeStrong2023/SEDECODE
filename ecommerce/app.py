from flask import Flask, render_template, request, redirect, jsonify
import psycopg2
import os
from dotenv import load_dotenv
import mercadopago

# Cargar las variables del archivo .env.
load_dotenv()

sdk = mercadopago.SDK('TEST-8984584947035732-110809-57e9bd7292f56485fa88e609da2c205b-444290765')




app = Flask(__name__)

@app.route('/create_preference', methods=['POST'])
def create_preference():
    print('Entré a /create_preference')
    
    # Obtenemos directamente los datos enviados en el JSON.
    cart_item = request.json  # Ya que el objeto está directamente en el body.
    
    # Creamos el item para la preferencia de pago.
    item = {
        'title': cart_item.get('description'),   # Asumimos que 'description' siempre está presente
        'unit_price': float(cart_item.get('price')),  # Convertimos a float
        'quantity': int(cart_item.get('quantity'))    # Convertimos a int
    }
    
    # Datos de la preferencia de pago.
    preference_data = {
        'items': [item],  # Envolvemos el item en una lista porque MercadoPago espera una lista de items
        'back_urls': {
            'success': 'http://localhost:5000/success',
            'failure': 'http://localhost:5000/failure',
            'pending': 'http://localhost:5000/pending'
        },
        'auto_return': 'approved'
    }

    # Llamada al SDK de MercadoPago para crear la preferencia.
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response['response']

    # Devolvemos el ID de la preferencia al frontend.
    return jsonify({
        'id': preference['id']
    })

@app.route('/')
def index():
    return render_template('website/index.html')

@app.route('/about')
def about():
    return render_template('website/about.html')

@app.route('/contact')
def contact_us():
    return render_template('website/contact_us.html')

@app.route('/admin')
def admin_index():
    return render_template('admin/index.html')

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        # Obtener los datos enviados por el cliente
        client_mail = request.json.get('client_mail')
        client_password = request.json.get('client_password')
        
        # Aquí iría tu lógica de autenticación.
        # Por ejemplo, verificar en la base de datos si el usuario y la contraseña son correctos.
        # Conexión a la base de datos.
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            print(f'Buscando usuario: {client_mail} con contraseña: {client_password}')

            cur.execute('SELECT client_mail, client_password FROM dim_client_laboratorio WHERE client_mail = %s AND client_password = %s',
		(client_mail, client_password))
        # Si la autenticación es exitosa, redirigir o devolver un mensaje.
            result = cur.fetchone()  # Obtener el resultado.

            if result:
                # Si se encuentra un resultado, la autenticación es exitosa.
                return jsonify({'message': 'Login exitoso'}), 200
            else:
                # Si no se encuentra el usuario o la contraseña es incorrecta.
                return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401
        except Exception as e:
            # Manejo de errores, devolver mensaje de error.
            return jsonify({'error': str(e)}), 500
        
        finally:
            # Cerrar el cursor y la conexión.
            cur.close()
            conn.close()

    # Si la solicitud es GET, solo renderiza el formulario de login.
    return render_template('admin/login.html')

@app.route('/admin/products')
def products():
    return render_template('admin/products.html')

@app.route('/admin/products/send', methods=['POST'])
def admin_products_send():
    _name = request.form['txtNombre']
    _file = request.files['txtImagen']
    print(_name)
    print(_file)
    return redirect('/admin/products')

#Genero la conexión a la Base de Datos.
@app.route('/test_db_connection')
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('HOST'),
        database=os.getenv('DATABASE'),
        user=os.getenv('POSTGRESQL_USER'),
        password=os.getenv('PASSWORD')
    )
    return conn

@app.route('/productos', methods=['GET'])
def get_products():
    """
    Obtiene una lista de productos de la base de datos y la devuelve en formato JSON.

    Retorna:
        - JSON con una lista de productos, cada uno con:
            - product_name (str): Nombre del producto.
            - product_price (float): Precio del producto.
            - product_url (str): URL de la imagen del producto.
        - En caso de error, devuelve un mensaje de error.
    """   
    # Conexión a la base de datos.
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT product_name, product_price, product_url FROM dim_product")
        products = cur.fetchall()

        products_list = []
        for product in products:
            product_dict = {
                'product_name': product[0],
                'product_price': product[1],
                'product_url': product[2]
            }
            products_list.append(product_dict)
        return jsonify(products_list)
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
    finally:
        cur.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
