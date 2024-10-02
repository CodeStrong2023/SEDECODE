from flask import Flask, render_template, request, redirect

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

if __name__ == '__main__':
    app.run(debug=True)
