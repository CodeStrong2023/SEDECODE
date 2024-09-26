from flask import Flask, render_template

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

if __name__ == '__main__':
    app.run(debug=True)
