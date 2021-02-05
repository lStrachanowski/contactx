from flask import Flask
import json 
from flask import request
import modules.database as db
from flask_cors import CORS , cross_origin
from flask import jsonify
from flask import make_response
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        email = request.args.get('email')
        password = request.args.get('password')
        user = db.User(email=email,password=password)
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
                    return  jsonify([data]),200
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
            return make_response(jsonify({'success': 'User registred'}), 200)
        else:
            return make_response(jsonify({'error': 'User exist'}), 400)
    else:
        print("GET")
        return "test"


@app.route('/dashboard', methods=['POST','GET'])
def dashboard():
    data = request.get_json()
    token = data['token'] 
    if request.method == 'POST':
        contactsData = db.getUserContacts(token)
        if db.checkTokenInBase(token):
            return contactsData
        else:
            return 'no token ?'

@app.route('/groups', methods=['POST','GET'])
def groups():
    data = request.get_json()
    token = data['token'] 
    if request.method == 'POST':
        groups = db.getUserGroups(token)
        if db.checkTokenInBase(token):
            return groups
        else:
            return 'no token ?'

@app.route('/tokentime', methods=['POST','GET'])
def tokentime():
    if request.method == 'POST':
        data = request.get_json()
        token = data['token'] 
        check = db.checkTokenInBase(token,time=True)
        return json.dumps({"validity": check })
    

@app.route('/addcontact', methods=['POST','GET'])
def addcontact():
    if request.method == 'POST':
        data = request.get_json()['form_value']
        name = data['name']
        vorname = data['vorname']
        company = data['company']
        address = data['address']
        email = data['email']
        phone = data['phone']
        mobile = data['mobile']
        fax = data['fax']
        other = data['other']
        group = data['group_select']
        edit = False
        contact = db.Contact(name=name, vorname=vorname, company=company, address=address, email=email, phone=phone,
        mobile=mobile, fax=fax, other=other, group=group, edit = edit )
        db.ContactsOperations.addContact(contact, request.get_json()['token'])
        return json.dumps(data)
    else:
        print("GET")
        return "test"


@app.route('/deletecontact', methods=['POST','GET'])
def deletecontact():
    if request.method == 'POST':
        data = request.get_json()
        # contact_id = data['contactId']
        # print(int(contact_id), data['token'])
        db.deleteContact(data['token'],int(data['contactId']))
        return make_response(jsonify({'success': 'Contact deleted'}), 200)
    else:
        print("GET")
        return "test"

