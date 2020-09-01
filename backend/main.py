from flask import Flask,Response
from json import dumps
from flask import request
import modules.database as db
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        username = request.args.get('username')
        password = request.args.get('password')
        # user = db.User(name=username,password=password)
        # db.Operations.addUser(user)
        # db.Operations.getUserData(user)
        # db.Operations.deleteUser(user)
    else:
        print('post')
    return "test"

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        user = db.User(name = data['user_name'] , password = data['password'], email = data['email'] )
        db.Operations.addUser(user)
        return Response(dumps({
            'registred':'201'
        }), mimetype='text/json')
    else:
        print("GET")
        return "test"