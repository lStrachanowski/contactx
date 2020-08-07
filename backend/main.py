from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        username = request.args.get('username')
        password = request.args.get('password')
        print(username, password)
    else:
        print('post')
    return "test"


