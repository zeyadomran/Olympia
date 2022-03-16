#API structure based on article at https://webdamn.com/create-restful-api-using-python-mysql/

"""
Programmer: Austin Shawaga
UCID: 30086103
CPSC 471 Winter 2022
University of Calgary

Python + Flask REST API for MySQL Database
"""


import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request


@app.route('/CLIENT')
def getClients():
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute("SELECT * FROM CLIENT;")
            print("Result:",result)

            #If nothing was returned send back a 404
            if (result <= 0):
                print("No Results") #This occurs when response comes back empty
                return not_found()
            else: #Something was found
                empRows = cursor.fetchall()
                respone = jsonify(empRows)
                respone.status_code = 200
                return respone

        except Exception as e:
            print(e)
            serverError()
        finally:
            cursor.close()
            conn.close()


#Occurs when request cannot be satisfied
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone


#Used when exceptions are encountered
def serverError():
    message = {
        'status': 500,
        'message': 'Internal Server Error',
    }
    respone = jsonify(message)
    respone.status_code = 500
    return respone

#Launches the app
if __name__ == "__main__":
    app.run(host = "localhost", port=5000)
