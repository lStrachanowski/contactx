from flask import Flask,Response,jsonify
from json import dumps
from flask import request
import modules.database as db
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        email = request.args.get('email')
        password = request.args.get('password')
        user = db.User(email=email,password=password)
        # db.Operations.addUser(user)
        # db.Operations.getUserData(user)
        # db.Operations.deleteUser(user)
    if request.method == 'POST':
        data = request.get_json()
        email = data['email'] 
        password = data['password']
        user = db.User(email=email,password=password)
        if db.Operations.checkUser(user):
            if user.verify_password(user):
                token, expiration = db.generateToken(32)
                if db.Operations.updateUser(user, token, expiration):
                    return  jsonify({'token':token, 'expiration': expiration})
                else:
                    return Response(dumps({
                    'code':'400',
                    'message' : 'Something went wrong with connecting to database'
                    }), mimetype='text/json'),400
            else:
                return Response(dumps({
                'code':'400',
                'message' : 'Wrong password'
            }), mimetype='text/json'),400

        else:
            return Response(dumps({
                'code':'400',
                'message' : 'No such user.'
            }), mimetype='text/json'),400
 

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        name = data['user_name'] 
        password = data['password']
        email = data['email']
        user = db.User(name = name , password = password, email = email)
        if not db.Operations.checkUser(user):
            db.Operations.addUser(user)
            return Response(dumps({
                'message' : 'User registred',
                'code':'201'
            }), mimetype='text/json'),201
        else:
            return Response(dumps({
                'code':'400',
                'message' : 'User exist'
            }), mimetype='text/json'),400
            
    else:
        print("GET")
        return "test"

