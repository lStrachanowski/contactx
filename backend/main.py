from flask import Flask
from flask import request
import modules.credentials as credentials 

app = Flask(__name__)

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        username = request.args.get('username')
        password = request.args.get('password')
        print(username, password)
        one,two = credentials.return_credentials()
        print(one)
        print(two)
    else:
        print('post')
    return "test"


