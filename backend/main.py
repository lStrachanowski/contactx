from flask import Flask
from flask import request
import modules.database as db
app = Flask(__name__)

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        username = request.args.get('username')
        password = request.args.get('password')
        user = db.User(name=username,password=password)
        # db.Operations.addUser(user)
        # db.Operations.getUserData(user)
        # db.Operations.deleteUser(user)
    else:
        print('post')
    return "test"


