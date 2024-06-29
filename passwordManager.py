from flask import Flask, request, jsonify
from sql_connection import get_sql_connection

app = Flask(__name__)

def get_all_passwords(connection):
    cursor = connection.cursor()
    query = (
        "SELECT pass_id, platform, platform_id, password FROM passwords"
    )
    cursor.execute(query)
    response = []
    for (pass_id, platform, platform_id, password) in cursor:
        response.append({
            'pass_id': pass_id,
            'platform': platform,
            'platform_id': platform_id,
            'password': password
        })
    return response

def insert_new_password(connection, password):
    cursor = connection.cursor()
    query = ("INSERT INTO passwords "
             "(platform, platform_id, password)"
             "VALUES (%s, %s, %s)")
    data = (password['platform'], password['platform_id'], password['password'])
    cursor.execute(query, data)
    connection.commit()
    return cursor.lastrowid

def delete_password(connection, pass_id):
    cursor = connection.cursor()
    query = ("DELETE FROM passwords where pass_id=" + str(pass_id))
    cursor.execute(query)
    connection.commit()

    return cursor.lastrowid



if __name__ == '__main__':
    app.run(debug=True)