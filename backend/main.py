from flask import Flask
import json 
from flask import request
import modules.database as db
from flask_cors import CORS
from flask import jsonify
from flask import make_response
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
                    data = {"token":token, "expiration": expiration}
                    return  jsonify([data])
                else:
                    return make_response(jsonify({'error': 'Something went wrong with connecting to database'}), 400)
            else:
                return make_response(jsonify({'error': 'Wrong password'}), 400)
        else:
            return make_response(jsonify({'error': 'No such user.'}), 400)
 

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
            return make_response(jsonify({'error': 'User registred'}), 201)
        else:
            return make_response(jsonify({'error': 'User exist'}), 201)
    else:
        print("GET")
        return "test"


@app.route('/dashboard', methods=['POST','GET'])
def dashboard():
    data = request.get_json()
    token = data['token'] 
    print(token)
    if request.method == 'POST':
        data = [{"vorname": 'Lukasz',
        "name": 'Strach',
        "contact_id": 1,
        "user_id": 'abc1',
        "company": 'Pol Transport and Forwarding sp. z o.o. sp. k',
        "address": 'ul. Bla bla 4 , 40-400 Katowice',
        "email": 'a@a.pl',
        "phone": 323523254,
        "mobile": 609900999995,
        "fax": 222222222,
        "other": 'Senior Executive at this company',
        "group": 'Work',
        "edit": False},
        {
        "vorname": 'Olga',
        "name": 'Borys',
        "contact_id": 3,
        "user_id": 'abc3',
        "company": '',
        "address": 'Jesionowa 9/3a , 40-500 Zabrze',
        "email": 'olga@wp.pl',
        "phone": '',
        "mobile": 6060619191919,
        "fax": '',
        "other": '',
        "group": 'Private',
        "edit": False}]
        
        
        if db.checkTokenInBase(token):
            return json.dumps(data)
        else:
            return 'no token ?'

