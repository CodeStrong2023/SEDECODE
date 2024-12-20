# Importación de módulos necesarios
from flask import Flask, render_template, request, redirect, jsonify
import psycopg2
import os
from dotenv import load_dotenv
import mercadopago

# Cargar las variables del archivo .env
load_dotenv()

# Inicializar el SDK de MercadoPago con una clave de prueba
sdk = mercadopago.SDK('TEST-8984584947035732-110809-57e9bd7292f56485fa88e609da2c205b-444290765')

# Crear una aplicación Flask
app = Flask(__name__)


# Ruta para crear una preferencia de pago
@app.route('/create_preference', methods=['POST'])
def create_preference():
    print('Entré a /create_preference')

    # Obtenemos directamente los datos enviados en el JSON
    cart_item = request.json  # Ya que el objeto está directamente en el body

    # Creamos el item para la preferencia de pago
    item = {
        'title': cart_item.get('description'),  # Asumimos que 'description' siempre está presente
        'unit_price': float(cart_item.get('price')),  # Convertimos a float
        'quantity': int(cart_item.get('quantity'))  # Convertimos a int
    }

    # Datos de la preferencia de pago
    preference_data = {
        'items': [item],  # Envolvemos el item en una lista porque MercadoPago espera una lista de items
        'back_urls': {
            'success': 'http://localhost:5000/success',
            'failure': 'http://localhost:5000/failure',
            'pending': 'http://localhost:5000/pending'
        },
        'auto_return': 'approved'  # Redirige automáticamente si el pago es exitoso
    }

    # Llamada al SDK de MercadoPago para crear la preferencia
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response['response']

    # Devolvemos el ID de la preferencia al frontend
    return jsonify({
        'id': preference['id']
    })


# Ruta de inicio que renderiza la página principal
@app.route('/')
def index():
    return render_template('website/index.html')


# Ruta de 'About Us' que renderiza la página correspondiente
@app.route('/about')
def about():
    return render_template('website/about.html')


# Ruta de 'Contact Us' que renderiza la página de contacto
@app.route('/contact')
def contact_us():
    return render_template('website/contact_us.html')


# Ruta de administración que renderiza la página de inicio del administrador
@app.route('/admin')
def admin_index():
    return render_template('admin/index.html')


# Ruta de inicio de sesión del administrador
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        # Obtener los datos enviados por el cliente
        client_mail = request.json.get('client_mail')
        client_password = request.json.get('client_password')

        # Aquí iría tu lógica de autenticación
        # Por ejemplo, verificar en la base de datos si el usuario y la contraseña son correctos
        # Conexión a la base de datos
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            print(f'Buscando usuario: {client_mail} con contraseña: {client_password}')

            cur.execute(
                'SELECT client_mail, client_password FROM dim_client_laboratorio WHERE client_mail = %s AND client_password = %s',
                (client_mail, client_password))
            # Si la autenticación es exitosa, redirigir o devolver un mensaje
            result = cur.fetchone()  # Obtener el resultado

            if result:
                # Si se encuentra un resultado, la autenticación es exitosa
                return jsonify({'message': 'Login exitoso'}), 200
            else:
                # Si no se encuentra el usuario o la contraseña es incorrecta
                return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401
        except Exception as e:
            # Manejo de errores, devolver mensaje de error
            return jsonify({'error': str(e)}), 500

        finally:
            # Cerrar el cursor y la conexión
            cur.close()
            conn.close()

    # Si la solicitud es GET, solo renderiza el formulario de login
    return render_template('admin/login.html')


# Ruta de productos que renderiza la página de productos
"""@app.route('/admin/products')
def products():
    return render_template('admin/products.html')"""


@app.route('/admin/products')
def products():
    conn = get_db_connection()
    cur = conn.cursor()
    productos = []
    try:
        cur.execute("SELECT sk_product, product_name, product_price, product_stock, product_url FROM dim_product")
        rows = cur.fetchall()
        for row in rows:
            producto = {
                'id': row[0],
                'nombre': row[1],
                'precio': row[2],
                'stock': row[3],
                'imagen': row[4]
            }
            productos.append(producto)
    except Exception as e:
        print(f"Error al recuperar productos: {e}")
    finally:
        cur.close()
        conn.close()

    return render_template('admin/products.html', productos=productos)


# Ruta para subir archivos de productos
"""@app.route('/admin/products/send', methods=['POST'])
def admin_products_send():
    _name = request.form['txtNombre']
    _file = request.files['txtImagen']
    print(_name)
    print(_file)
    return redirect('/admin/products')"""

"""@app.route('/admin/products/send', methods=['POST'])
def admin_products_send():
    _name = request.form['txtNombre']
    _imagen_url = request.form['txtImagen']  # Cambiado para leer la URL de la imagen como texto
    print(_name)
    print(_imagen_url)  # Imprimir la URL de la imagen
    # Aquí puedes agregar la lógica para guardar el nombre y la URL de la imagen en tu base de datos
    return redirect('/admin/products')"""


@app.route('/admin/products/send', methods=['POST'])
def admin_products_send():
    _name = request.form['txtNombre']
    _precio = request.form['txtPrecio']
    _stock = request.form['txtStock']  # Añadido campo para el stock
    _imagen_url = request.form['txtImagen']
    print(_name)
    print(_precio)
    print(_stock)
    print(_imagen_url)

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO dim_product (product_name, product_price, product_stock, product_url, updated_at) VALUES ("
            "%s, %s, %s, %s, NOW())",
            (_name, _precio, _stock, _imagen_url)  # Incluyendo el stock en la consulta
        )
        conn.commit()
    except Exception as e:
        print(f"Error al guardar en la base de datos: {e}")
    finally:
        cur.close()
        conn.close()

    return redirect('/admin/products')


# Genero la conexión a la Base de Datos
@app.route('/test_db_connection')
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('HOST'),
        database=os.getenv('DATABASE'),
        user=os.getenv('POSTGRESQL_USER'),
        password=os.getenv('PASSWORD'),
        port=os.getenv('PORT')
    )
    return conn


# Ruta para obtener una lista de productos en formato JSON
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
    # Conexión a la base de datos
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT product_name, product_price, product_url FROM dim_product")
        products = cur.fetchall()

        products_list = []
        for product in products:
            product_dict = {
                'id': product[0],  # Asigna sk_product como id
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


# Ruta para eliminar productos
@app.route('/productos/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM dim_product WHERE sk_product = %s", (product_id,))
        conn.commit()
        return jsonify({'message': 'Producto eliminado correctamente'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()
        conn.close()


# Inicia la aplicación en modo de depuración
if __name__ == '__main__':
    app.run(debug=True)
