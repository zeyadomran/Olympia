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
        return badRequest()

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
            result = cursor.execute(f'SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee WHERE eId={_id} AND passwordHash="{h}";')
            if(result <= 0):
                return authenticationError()
            else: #found
                emp = cursor.fetchone()

                m = {"eId": _id,"eType":emp["eType"], "loggedIn" : True}

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


@app.route('/employee/logout',methods=['POST'])
def elogout():

    if request.method == 'POST':

        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            j = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        if(j["loggedIn"] == False):
            return authenticationError()

        message = {"loggedIn" : False}
        j2 = jwt.encode(message, secret, algorithm="HS256")

        m = { "logoutSuccess" : True}

        response = jsonify(m)
        response.status_code = 200

        #set cookie
        response.set_cookie("EJWT", j2, max_age=1) #cookie expires in 1 second

        return response

    else:
        return not_found()


@app.route('/employee/signup',methods=['POST'])
def eSignup():

    if request.method == 'POST':

        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            j = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee has permission or not
        if(j["loggedIn"] == False or j["eType"] != "Admin"):
            return authenticationError()

        #Permissions are granted

        #Gets required attributes from JSON body
        try:
            _json = request.json
            _branch = _json["branchId"]
            _email = _json['email']
            _phone = _json['phoneNum']
            _dob = _json['dob']
            _fName = _json["firstName"]
            _lName = _json["lastName"]
            _sex = _json["sex"]
            _eT = _json["eType"]
            _pw = _json["password"]
        except:
            return badRequest()

        #We have all the attributes

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)


            #hash
            pb = str.encode(_pw)
            h1 = bcrypt.hashpw(pb, salt) #No random salt used for simplification
            h = h1.decode()

            sqlQuery = "INSERT INTO employee(branchId,email,phoneNum,dob,firstName,lastName,sex,eType, passwordHash) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s);"
            bindData = (_branch,_email, _phone, _dob,_fName,_lName,_sex,_eT,h)

            cursor.execute(sqlQuery, bindData)
            conn.commit()

            result = cursor.execute('SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee WHERE eId = LAST_INSERT_ID();')



            if(result <= 0):
                print("SQL ERROR - No Return")
                return serverError()


            r = cursor.fetchone()

            response = jsonify(r)
            response.status_code = 200
            return response

        except:
            return badRequest()
        finally:
            conn.close()
            cursor.close()



    else:
        return not_found()




@app.route('/client/login',methods=['POST'])
def clogin():

    try:
        _json = request.json
        _id = _json['clientId']
        _pw = _json['password']
    except:
        return badRequest()

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
            result = cursor.execute(f'SELECT clientId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,memberType,price,DATE_FORMAT(startDate,"%Y-%m-%d") as startDate,DATE_FORMAT(endDate,"%Y-%m-%d") as endDate FROM client WHERE clientId={_id} AND passwordHash="{h}";')
            if(result <= 0):
                return authenticationError()
            else: #found
                cli = cursor.fetchone()

                m = {"clientId": _id, "loggedIn" : True}

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

@app.route('/client/logout',methods=['POST'])
def clogout():

    if request.method == 'POST':

        cjwt = request.cookies.get("CJWT",None)

        if(cjwt == None):
            return authenticationError()

        try:
            j = jwt.decode(cjwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid cjwt was given
        if(j["loggedIn"] == False):
            return authenticationError()

        message = {"loggedIn" : False}
        j2 = jwt.encode(message, secret, algorithm="HS256")

        m = { "logoutSuccess" : True}

        response = jsonify(m)
        response.status_code = 200

        #set cookie
        response.set_cookie("CJWT", j2, max_age=1) #cookie expires in 1 second

        return response


    else:
        return not_found()

@app.route('/client/signup',methods=['POST'])
def cSignup():

    if request.method == 'POST':

        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            j = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee has permission or not
        if(j["loggedIn"] == False or j["eType"] != "Admin"):
            return authenticationError()

        #Permissions are granted

        #Gets required attributes from JSON body
        try:
            _json = request.json
            _email = _json['email']
            _phone = _json['phoneNum']
            _dob = _json['dob']
            _fName = _json["firstName"]
            _lName = _json["lastName"]
            _sex = _json["sex"]
            _mT = _json["memberType"]
            _price = _json["price"]
            assert(type(_price) == float)
            _startDate = _json["startDate"]
            _endDate = _json["endDate"]
            _pw = _json["password"]
        except:
            return badRequest()

        #We have all the attributes

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            #hash
            pb = str.encode(_pw)
            h1 = bcrypt.hashpw(pb, salt) #No random salt used for simplification
            h = h1.decode()

            sqlQuery = "INSERT INTO client(email,phoneNum,dob,firstName,lastName,sex,memberType,price,startDate,endDate, passwordHash) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
            bindData = (_email, _phone, _dob,_fName,_lName,_sex,_mT,_price,_startDate,_endDate,h)

            cursor.execute(sqlQuery, bindData)
            conn.commit()

            result = cursor.execute('SELECT clientId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,memberType,price,DATE_FORMAT(startDate,"%Y-%m-%d") as startDate,DATE_FORMAT(endDate,"%Y-%m-%d") as endDate FROM client WHERE LAST_INSERT_ID() = clientId;')

            if(result <= 0):
                return serverError()


            r = cursor.fetchone()

            response = jsonify(r)
            response.status_code = 200
            return response

        except:
            return badRequest()
        finally:
            conn.close()
            cursor.close()



    else:
        return not_found()



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

def serverError():
    message = {
        'status': 500,
        'message': "Something Bad happened and I don't know what",
    }
    respone = jsonify(message)
    respone.status_code = 500
    return respone

def authenticationError():
    message = {
        'status': 400,
        'message': 'Authentication Error',
    }
    respone = jsonify(message)
    respone.status_code = 400
    return respone


def badRequest():
    message = {
        'status': 400,
        'message': 'Bad Request',
    }
    respone = jsonify(message)
    respone.status_code = 400
    return respone


#Launches the app
if __name__ == "__main__":
    app.run(host = "localhost", port=5000)
