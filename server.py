from flask import Flask, request, jsonify,render_template
from sql_connection import get_sql_connection
import json

import passwordManager

app = Flask(__name__)

connection = get_sql_connection()

@app.route('/getPasswords', methods=['GET'])
def get_passwords():
    response = passwordManager.get_all_passwords(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertPassword', methods=['POST'])
def insert_password():
    request_payload = json.loads(request.form['data'])
    pass_id = passwordManager.insert_new_password(connection, request_payload)
    response = jsonify({
        'pass_id': pass_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deletePassword', methods=['POST'])
def delete_password():
    return_id = passwordManager.delete_password(connection, request.form['pass_id'])
    response = jsonify({
        'pass_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')

# Handle login request
@app.route('/login', methods=['POST'])
def login_post():
    username = request.form['username']
    password = request.form['password']

    # Check if the username and password match the preset credentials
    if username == 'admin' and password == 'password':
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'})


if __name__ == "__main__":
    print("Starting Python Flask Server For Password Manager")
    app.run(port=5000)