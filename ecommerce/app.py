from flask import Flask, render_template, request, redirect, jsonify
import psycopg2
import os
from dotenv import load_dotenv


# Cargar las variables del archivo .env
load_dotenv()

app = Flask(__name__)

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

@app.route('/admin/login')
def admin_login():
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

#Genero la conexión a la Base de Datos
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
    # Conexión a la base de datos
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
