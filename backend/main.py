from flask import Flask
app = Flask(__name__)

@app.route('/')
def main_route():
    return 'main_route'

@app.route('/dashboard')
def dashboard():
    return 'dashboard'

@app.route('/user/<id>/details')
def user_details(id):
    return id

@app.route('user/<id>/details/notes')
def user_notes():
    return id

@app.route('/add')
def add_user():
    return 'add'

@app.route('/edit/<id>')
def edit_user(id):
    return 'edit'

@app.route('/settings')
def settings():
    return 'settings'



