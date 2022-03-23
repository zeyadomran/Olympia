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
import jwt
import bcrypt

secret = "!!1234OlympiaGymDatabase!5678!"
salt = b'$2b$12$bHop6pQFFJBG86NnXZUg4.'


@app.route('/employee/login',methods=['POST'])
def elogin():

    try:
        _json = request.json
        _id = _json['eId']
        _pw = _json['password']
    except:
        return authenticationError()

    if(type(_id) != int or type(_pw) != str):
        return authenticationError()

    if _id and _pw and request.method == 'POST':
        #hash
        pb = str.encode(_pw)
        h1 = bcrypt.hashpw(pb, salt) #No random salt used for simplification
        h = h1.decode()

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT eId,branchId,email,phoneNum,dob,firstName,lastName,sex,eType FROM employee WHERE eId={_id} AND passwordHash="{h}";')
            if(result <= 0):
                return authenticationError()
            else: #found
                emp = cursor.fetchone()

                m = {"eId": _id,"eType":emp["eType"]}

                j = jwt.encode(m, secret, algorithm="HS256")

                print("Made EJWT with id:",_id,"and Type:",emp["eType"]) #debugging purposes

                response = jsonify(emp)
                response.status_code = 200

                #set cookie
                response.set_cookie("EJWT", j, max_age=604800) #cookie expires in a week

                return response
        except Exception as e:
            print("ERROR:",e)
        finally:
            cursor.close()
            conn.close()
    else:
        return authenticationError()


@app.route('/client/login',methods=['POST'])
def clogin():

    try:
        _json = request.json
        _id = _json['clientId']
        _pw = _json['password']
    except:
        return authenticationError()

    if(type(_id) != int or type(_pw) != str):
        return authenticationError()

    if _id and _pw and request.method == 'POST':
        #hash
        pb = str.encode(_pw)
        h1 = bcrypt.hashpw(pb, salt) #No random salt used for simplification
        h = h1.decode()

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT clientId,email,phoneNum,dob,firstName,lastName,sex,memberType,price,startDate,endDate FROM client WHERE clientId={_id} AND passwordHash="{h}";')
            if(result <= 0):
                return authenticationError()
            else: #found
                cli = cursor.fetchone()

                m = {"clientId": _id}

                j = jwt.encode(m, secret, algorithm="HS256")

                print("Made CJWT with id:",_id) #debugging purposes

                response = jsonify(cli)
                response.status_code = 200

                #set cookie
                response.set_cookie("CJWT", j, max_age=604800) #cookie expires in a week

                return response
        except Exception as e:
            print("ERROR:",e)
        finally:
            cursor.close()
            conn.close()
    else:
        return authenticationError()


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


def authenticationError():
    message = {
        'status': 400,
        'message': 'Authentication Error',
    }
    respone = jsonify(message)
    respone.status_code = 400
    return respone


#Launches the app
if __name__ == "__main__":
    app.run(host = "localhost", port=5000)
