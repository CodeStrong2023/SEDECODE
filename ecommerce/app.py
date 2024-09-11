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

if __name__ == '__main__':
    app.run(debug=True)
