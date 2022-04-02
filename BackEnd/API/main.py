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
import datetime

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




#Employee by ID
@app.route('/employee/<int:id>',methods=['GET','DELETE','PATCH'])
def EmpByID(id):

        if(request.method == 'GET'):
            #Permissions: Either valid EJWT matching the id requested or Admin EJWT
            ejwt = request.cookies.get("EJWT",None)

            if(ejwt == None):
                return authenticationError()

            try:
                ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
            except:
                return authenticationError()

            #a valid ejwt was given
            #checks whether this employee is loggedIn and whether it has appropriate Permissions
            if(ej["loggedIn"] == False or (ej["eId"] != id and ej["eType"] != "Admin")):
                return authenticationError()


            #Permissions are granted

            try:
                    conn = mysql.connect()
                    cursor = conn.cursor(pymysql.cursors.DictCursor)
                    result = cursor.execute(f'SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee WHERE eId = {id};')

                    if (result <= 0):
                            print("EMPTY EMPTY") #This occurs when response comes back empty
                            return not_found()
                    else:
                            empReturn = cursor.fetchone()
                            response = jsonify(empReturn)
                            response.status_code = 200
                            return response

            except Exception as e:
                    print(e)
            finally:
                    cursor.close()
                    conn.close()

        elif (request.method == 'DELETE'): #Delete Employee by id
            #Permissions: ADMIN
            ejwt = request.cookies.get("EJWT",None)

            if(ejwt == None):
                return authenticationError()

            try:
                ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
            except:
                return authenticationError()

            #a valid ejwt was given
            #checks whether this employee is loggedIn and if they are Admin
            if(ej["loggedIn"] == False or ej["eType"] != "Admin" or ej['eId'] == id):
                return authenticationError()


            #Permissions are granted

            try:
                    conn = mysql.connect()
                    cursor = conn.cursor(pymysql.cursors.DictCursor)

                    #Deletes any assocation to preserve integrity
                    cursor.execute(f'DELETE FROM instructs WHERE eId = {id};')

                    cursor.execute(f'DELETE FROM manages WHERE eId = {id};')

                    conn.commit()

                    #Deletes Employee
                    cursor.execute(f'DELETE FROM employee WHERE eId = {id};')
                    conn.commit()

                    m = {'deleteSuccess' : True}
                    response = jsonify(m)
                    response.status_code = 200
                    return response

            except Exception as e:
                    print(e)
                    m = {'deleteSuccess' : False}
                    response = jsonify(m)
                    response.status_code = 200
                    return response
            finally:
                    cursor.close()
                    conn.close()
        else: #PATCH update some Values of Employee
                #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
                ejwt = request.cookies.get("EJWT",None)

                if(ejwt == None):
                    return authenticationError()

                try:
                    ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
                except:
                    return authenticationError()

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(ej["loggedIn"] == False or (ej['eType'] != "Admin" and ej['eId'] != id)):
                    return authenticationError()



                #Permissions are granted


                #Ensures a JSON body was passed
                try:
                    _json = request.json
                except:
                    return badRequest()


                #Tries to get all possible update values (cannot update id)

                d = dict() #dictionary to be later used with SQL Key = attr Value = update

                if('branchId' in _json):
                    d['branchId'] = _json['branchId']
                if('email' in _json):
                    d['email'] = _json['email']
                if('phoneNum' in _json):
                    d['phoneNum'] = _json['phoneNum']
                if('dob' in _json):
                    d['dob'] = _json['dob']
                if('firstName' in _json):
                    d['firstName'] = _json['firstName']
                if('lastName' in _json):
                    d['lastName'] = _json['lastName']
                if('sex' in _json):
                    d['sex'] = _json['sex']
                if('eType' in _json):
                    d['eType'] = _json['eType']
                if('password' in _json):
                    #hash
                    pb = str.encode(_json['password'])
                    h1 = bcrypt.hashpw(pb, salt) #No random salt used for simplification
                    h = h1.decode()
                    d['passwordHash'] = h

                #No relevent values were passed
                if(len(d) == 0):
                    return badRequest()

                #Now that we have all values, arrange sqlQuery



                query = "UPDATE employee SET " #start of query

                for k in d:
                    if(type(d[k]) == str):
                        query = query + k + ' = "' + d[k] + '", '
                    else:
                        query = query + k + ' = ' + str(d[k]) + ', '

                query = query[0:-2] #Removes last comma and space

                query = query + f' WHERE eId = {id};'

                try:
                        conn = mysql.connect()
                        cursor = conn.cursor(pymysql.cursors.DictCursor)

                        #Updates Client
                        cursor.execute(query)
                        conn.commit()

                        #Fetches update client
                        result = cursor.execute(f'SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee WHERE eId = {id};')

                        if (result <= 0):
                                print("EMPTY EMPTY") #This occurs when response comes back empty
                                return not_found()
                        else:
                                empReturn = cursor.fetchone()
                                response = jsonify(empReturn)
                                response.status_code = 200
                                return response

                except Exception as e:
                        print(e)

                finally:
                        cursor.close()
                        conn.close()

#Get all employees
@app.route('/employee',methods=['GET'])
def getAllEmps():

        #Permissions: Admin EJWT
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn and whether it has appropriate Permissions
        if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
            return authenticationError()


        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute('SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee;')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        empReturn = cursor.fetchall()
                        response = jsonify(empReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()


#Get employee off of EJWT
@app.route('/employee/me',methods=['GET'])
def getEmpEJWT():

        #Permissions: Either valid EJWT matching the id requested or Admin EJWT
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False):
            return authenticationError()


        #Permissions are granted

        id = ej["eId"] #Gets eId from EJWT

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute(f'SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee WHERE eId = {id};')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        empReturn = cursor.fetchone()
                        response = jsonify(empReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()


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

#Client by ID
@app.route('/client/<int:id>',methods=['GET','DELETE','PATCH'])
def clientByID(id):
    if(request.method == 'GET'): #GET client by ID
            #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
            ejwt = request.cookies.get("EJWT",None)
            cjwt = request.cookies.get("CJWT",None)

            eFlag = False
            cFlag = False

            if(ejwt == None and cjwt == None):
                return authenticationError()

            if(ejwt != None):
                eFlag = True
                try:
                    ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
                except:
                    eFlag = False

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(ej["loggedIn"] == False):
                    eFlag = False

            elif (eFlag == False and cjwt != None):
                cFlag = True
                try:
                    cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
                except:
                    cFlag = False

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(cj["loggedIn"] == False or cj["clientId"] != id):
                    eFlag = False
            else:
                return authenticationError()

            if(cFlag == False and eFlag == False):
                return authenticationError()

            #Permissions are granted

            try:
                    conn = mysql.connect()
                    cursor = conn.cursor(pymysql.cursors.DictCursor)
                    result = cursor.execute(f'SELECT clientId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,memberType,price,DATE_FORMAT(startDate,"%Y-%m-%d") as startDate,DATE_FORMAT(endDate,"%Y-%m-%d") as endDate FROM client WHERE clientId = {id};')

                    if (result <= 0):
                            print("EMPTY EMPTY") #This occurs when response comes back empty
                            return not_found()
                    else:
                            clientReturn = cursor.fetchone()
                            response = jsonify(clientReturn)
                            response.status_code = 200
                            return response

            except Exception as e:
                    print(e)
            finally:
                    cursor.close()
                    conn.close()


    elif (request.method == 'DELETE'): #Delete Client by id
            #Permissions: ADMIN
            ejwt = request.cookies.get("EJWT",None)

            if(ejwt == None):
                return authenticationError()

            try:
                ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
            except:
                return authenticationError()

            #a valid ejwt was given
            #checks whether this employee is loggedIn and if they are Admin
            if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
                return authenticationError()


            #Permissions are granted
            try:
                    conn = mysql.connect()
                    cursor = conn.cursor(pymysql.cursors.DictCursor)

                    #Deletes any bookings/reports to preserve integrity
                    cursor.execute(f'DELETE FROM service_books WHERE clientId = {id};')

                    cursor.execute(f'DELETE FROM time_books WHERE clientId = {id};')

                    cursor.execute(f'DELETE FROM reports WHERE clientId = {id};')
                    conn.commit()

                    #Deletes Client
                    cursor.execute(f'DELETE FROM client WHERE clientId = {id};')
                    conn.commit()

                    m = {'deleteSuccess' : True}
                    response = jsonify(m)
                    response.status_code = 200
                    return response

            except Exception as e:
                    print(e)
                    m = {'deleteSuccess' : False}
                    response = jsonify(m)
                    response.status_code = 200
                    return response
            finally:
                    cursor.close()
                    conn.close()

    else: #PATCH update some Values of Client
            #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
            ejwt = request.cookies.get("EJWT",None)
            cjwt = request.cookies.get("CJWT",None)

            eFlag = False
            cFlag = False

            if(ejwt == None and cjwt == None):
                return authenticationError()

            if(ejwt != None):
                eFlag = True
                try:
                    ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
                except:
                    eFlag = False

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(ej["loggedIn"] == False):
                    eFlag = False

            elif (eFlag == False and cjwt != None):
                cFlag = True
                try:
                    cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
                except:
                    cFlag = False

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(cj["loggedIn"] == False or cj["clientId"] != id):
                    eFlag = False
            else:
                return authenticationError()

            if(cFlag == False and eFlag == False):
                return authenticationError()

            #Permissions are granted


            #Ensures a JSON body was passed
            try:
                _json = request.json
            except:
                return badRequest()


            #Tries to get all possible update values (cannot update id)

            d = dict() #dictionary to be later used with SQL Key = attr Value = update


            if('email' in _json):
                d['email'] = _json['email']
            if('phoneNum' in _json):
                d['phoneNum'] = _json['phoneNum']
            if('dob' in _json):
                d['dob'] = _json['dob']
            if('firstName' in _json):
                d['firstName'] = _json['firstName']
            if('lastName' in _json):
                d['lastName'] = _json['lastName']
            if('sex' in _json):
                d['sex'] = _json['sex']
            if('memberType' in _json):
                d['memberType'] = _json['memberType']
            if('price' in _json):
                d['price'] = _json['price']
            if('startDate' in _json):
                d['startDate'] = _json['startDate']
            if('endDate' in _json):
                d['endDate'] = _json['endDate']
            if('password' in _json):
                #hash
                pb = str.encode(_json['password'])
                h1 = bcrypt.hashpw(pb, salt) #No random salt used for simplification
                h = h1.decode()
                d['passwordHash'] = h

            #No relevent values were passed
            if(len(d) == 0):
                return badRequest()

            #Now that we have all values, arrange sqlQuery



            query = "UPDATE client SET " #start of query

            for k in d:
                if(type(d[k]) == str):
                    query = query + k + ' = "' + d[k] + '", '
                else:
                    query = query + k + ' = ' + str(d[k]) + ', '

            query = query[0:-2] #Removes last comma and space

            query = query + f' WHERE clientId = {id};'

            try:
                    conn = mysql.connect()
                    cursor = conn.cursor(pymysql.cursors.DictCursor)

                    #Updates Client
                    cursor.execute(query)
                    conn.commit()

                    #Fetches update client
                    result = cursor.execute(f'SELECT clientId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,memberType,price,DATE_FORMAT(startDate,"%Y-%m-%d") as startDate,DATE_FORMAT(endDate,"%Y-%m-%d") as endDate FROM client WHERE clientId = {id};')

                    if (result <= 0):
                            print("EMPTY EMPTY") #This occurs when response comes back empty
                            return not_found()
                    else:
                            clientReturn = cursor.fetchone()
                            response = jsonify(clientReturn)
                            response.status_code = 200
                            return response

            except Exception as e:
                    print(e)

            finally:
                    cursor.close()
                    conn.close()


#Get all clients
@app.route('/client',methods=['GET'])
def getAllClients():

        #Permissions: Either any valid EJWT
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False):
            return authenticationError()


        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute('SELECT clientId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,memberType,price,DATE_FORMAT(startDate,"%Y-%m-%d") as startDate,DATE_FORMAT(endDate,"%Y-%m-%d") as endDate FROM client;')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        clientReturn = cursor.fetchall()
                        response = jsonify(clientReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()


#Get client by CJWT
@app.route('/client/me',methods=['GET'])
def getClientCJWT():

        #Permissions: Either valid EJWT matching the id requested or Admin EJWT
        cjwt = request.cookies.get("CJWT",None)

        if(cjwt == None):
            return authenticationError()

        try:
            cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(cj["loggedIn"] == False):
            return authenticationError()


        #Permissions are granted

        id = cj["clientId"] #Gets eId from EJWT

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute(f'SELECT clientId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,memberType,price,DATE_FORMAT(startDate,"%Y-%m-%d") as startDate,DATE_FORMAT(endDate,"%Y-%m-%d") as endDate FROM client WHERE clientId = {id};')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        clientReturn = cursor.fetchone()
                        response = jsonify(clientReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()










#Get all managers of a specific branch
@app.route('/branches/<int:bId>/managers',methods=['GET'])
def getAllManagersOfBranch(bId):

        #Permissions: Either any valid EJWT
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn and if they are Admin
        if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
            return authenticationError()


        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute(f'SELECT E.eId,E.branchId,E.email,E.phoneNum,DATE_FORMAT(E.dob,"%Y-%m-%d") as dob,E.firstName,E.lastName,E.sex,E.eType FROM employee AS E, manages AS M WHERE M.branchId = {bId} AND M.eId = E.eId;')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        managerReturn = cursor.fetchall()
                        response = jsonify(managerReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()


#Get all trainers of a specific branch
@app.route('/branches/<int:bId>/trainers',methods=['GET'])
def getAllTrainersOfBranch(bId):

        #Permissions: Either any valid EJWT
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn and if they are Admin
        if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
            return authenticationError()


        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute(f'SELECT eId,branchId,email,phoneNum,DATE_FORMAT(dob,"%Y-%m-%d") as dob,firstName,lastName,sex,eType FROM employee WHERE eType = "Trainer" AND branchId = {bId};')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        managerReturn = cursor.fetchall()
                        response = jsonify(managerReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()


#Get all gym branches or add a gymBranch
@app.route('/branches',methods=['GET','POST'])
def getAllBranches():

    if(request.method == 'GET'):
        #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
        ejwt = request.cookies.get("EJWT",None)
        cjwt = request.cookies.get("CJWT",None)

        eFlag = False
        cFlag = False

        if(ejwt == None and cjwt == None):
            return authenticationError()

        if(ejwt != None):
            eFlag = True
            try:
                ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
            except:
                eFlag = False

            #a valid ejwt was given
            #checks whether this employee is loggedIn
            if(ej["loggedIn"] == False):
                eFlag = False

        elif (eFlag == False and cjwt != None):
            cFlag = True
            try:
                cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
            except:
                cFlag = False

            #a valid ejwt was given
            #checks whether this employee is loggedIn
            if(cj["loggedIn"] == False):
                eFlag = False
        else:
            return authenticationError()

        if(cFlag == False and eFlag == False):
            return authenticationError()

        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute('SELECT * FROM Gym_Branch;')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        branchesReturn = cursor.fetchall()
                        response = jsonify(branchesReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()



    else: #POST
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
            _name = _json['bName']
            _addr = _json['bAddress']
            _capacity = _json['timeSlotCapacity']
        except:
            return badRequest()

        #We have all the attributes

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            sqlQuery = "INSERT INTO Gym_Branch(bName,bAddress,timeSlotCapacity) VALUES(%s,%s,%s);"
            bindData = (_name, _addr, _capacity)

            cursor.execute(sqlQuery, bindData)
            conn.commit()

            result = cursor.execute('SELECT * FROM Gym_Branch WHERE LAST_INSERT_ID() = branchId;')

            if(result <= 0):
                return serverError()

            r = cursor.fetchone()
            bId = r["branchId"]

            #Adds two storage types
            cursor.execute(f'insert into gym_storage values ({bId},"Floor");')
            cursor.execute(f'insert into gym_storage values ({bId},"Storage");')
            conn.commit()

            response = jsonify(r)
            response.status_code = 200
            return response

        except:
            return badRequest()
        finally:
            conn.close()
            cursor.close()




#gymBranch by id
@app.route('/branches/<int:bId>',methods=['GET','DELETE','PATCH'])
def BranchbyID(bId):

    if (request.method == 'GET'): #Get branch by ID
        #Permissions: Either any valid EJWT or CJWT
        ejwt = request.cookies.get("EJWT",None)
        cjwt = request.cookies.get("CJWT",None)

        eFlag = False
        cFlag = False

        if(ejwt == None and cjwt == None):
            return authenticationError()

        if(ejwt != None):
            eFlag = True
            try:
                ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
            except:
                eFlag = False

            #a valid ejwt was given
            #checks whether this employee is loggedIn
            if(ej["loggedIn"] == False):
                eFlag = False

        elif (eFlag == False and cjwt != None):
            cFlag = True
            try:
                cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
            except:
                cFlag = False

            #a valid ejwt was given
            #checks whether this employee is loggedIn
            if(cj["loggedIn"] == False):
                eFlag = False
        else:
            return authenticationError()

        if(cFlag == False and eFlag == False):
            return authenticationError()

        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute(f'SELECT * FROM Gym_Branch WHERE branchId = {bId};')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        branchReturn = cursor.fetchone()
                        response = jsonify(branchReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()


    elif(request.method == 'DELETE'): #Delete branch by id
        #Permissions: ADMIN
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn and if they are Admin
        if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
            return authenticationError()


        #Permissions are granted
        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)

                #Deletes any assocation to preserve integrity
                cursor.execute(f'DELETE FROM time_books WHERE branchId = {bId};')
                cursor.execute(f'DELETE FROM time_slot WHERE branchId = {bId};')
                cursor.execute(f'DELETE FROM day_schedule WHERE branchId = {bId};')


                cursor.execute(f'DELETE FROM service_books WHERE branchId = {bId};')
                cursor.execute(f'DELETE FROM service WHERE branchId = {bId};')


                cursor.execute(f'DELETE FROM manages WHERE branchId = {bId};')
                cursor.execute(f'DELETE FROM instructs WHERE branchId = {bId};')

                cursor.execute(f'UPDATE employee SET branchId = NULL WHERE branchId = {bId};')
                cursor.execute(f'UPDATE equipment SET branchId = NULL, storageType = NULL WHERE branchId = {bId};')

                conn.commit()

                cursor.execute(f'DELETE FROM gym_storage WHERE branchId = {bId};')
                conn.commit()

                #Deletes Branch
                cursor.execute(f'DELETE FROM gym_branch WHERE branchId = {bId};')
                conn.commit()

                m = {'deleteSuccess' : True}
                response = jsonify(m)
                response.status_code = 200
                return response

        except Exception as e:
                print(e)
                m = {'deleteSuccess' : False}
                response = jsonify(m)
                response.status_code = 200
                return response
        finally:
                cursor.close()
                conn.close()

    else: #PATCH update some Values of Branch
        #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
        ejwt = request.cookies.get("EJWT",None)

        if(ejwt == None):
            return authenticationError()

        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            return authenticationError()

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False or ej['eType'] != "Admin"):
            return authenticationError()



        #Permissions are granted


        #Ensures a JSON body was passed
        try:
            _json = request.json
        except:
            return badRequest()


        #Tries to get all possible update values (cannot update id)

        d = dict() #dictionary to be later used with SQL Key = attr Value = update

        if('bName' in _json):
            d['bName'] = _json['bName']
        if('bAddress' in _json):
            d['bAddress'] = _json['bAddress']
        if('timeSlotCapacity' in _json):
            d['timeSlotCapacity'] = _json['timeSlotCapacity']

        #No relevent values were passed
        if(len(d) == 0):
            return badRequest()

        #Now that we have all values, arrange sqlQuery


        query = "UPDATE gym_branch SET " #start of query

        for k in d:
            if(type(d[k]) == str):
                query = query + k + ' = "' + d[k] + '", '
            else:
                query = query + k + ' = ' + str(d[k]) + ', '

        query = query[0:-2] #Removes last comma and space

        query = query + f' WHERE branchId = {bId};'

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)

                #Updates Client
                cursor.execute(query)
                conn.commit()

                #Fetches update client
                result = cursor.execute(f'SELECT * FROM gym_branch WHERE branchId = {bId};')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        empReturn = cursor.fetchone()
                        response = jsonify(empReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)

        finally:
                cursor.close()
                conn.close()



#Get all Equipment From Branch
@app.route('/branches/<int:id>/equipment',methods=['GET','POST'])
def getAllEquipFromBranch(id):

        if(request.method == 'GET'):
            #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
            ejwt = request.cookies.get("EJWT",None)
            cjwt = request.cookies.get("CJWT",None)

            eFlag = False
            cFlag = False

            if(ejwt == None and cjwt == None):
                return authenticationError()

            if(ejwt != None):
                eFlag = True
                try:
                    ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
                except:
                    eFlag = False

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(ej["loggedIn"] == False):
                    eFlag = False

            elif (eFlag == False and cjwt != None):
                cFlag = True
                try:
                    cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
                except:
                    cFlag = False

                #a valid ejwt was given
                #checks whether this employee is loggedIn
                if(cj["loggedIn"] == False):
                    eFlag = False
            else:
                return authenticationError()

            if(cFlag == False and eFlag == False):
                return authenticationError()

            #Permissions are granted

            try:
                    conn = mysql.connect()
                    cursor = conn.cursor(pymysql.cursors.DictCursor)
                    result = cursor.execute(f'SELECT eId,eName,repairStatus,DATE_FORMAT(purchaseDate,"%Y-%m-%d") as purchaseDate,branchId,storageType FROM equipment WHERE branchId = {id};')

                    if (result <= 0):
                            print("EMPTY EMPTY") #This occurs when response comes back empty
                            return not_found()
                    else:
                            equipReturn = cursor.fetchall()
                            response = jsonify(equipReturn)
                            response.status_code = 200
                            return response

            except Exception as e:
                    print(e)
            finally:
                    cursor.close()
                    conn.close()


        else: #POST
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
                _name = _json['eName']
                _rps = _json['repairStatus']
                _date = _json['purchaseDate']
                _storageType = _json['storageType']
                _bId = id #from endpoint
            except:
                return badRequest()

            #We have all the attributes
            if(_rps != "F" or _rps != "B"):
                return badRequest()

            if(_storageType != "Floor" or _storageType != "Storage"):
                return badRequest()

            try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)

                sqlQuery = 'INSERT INTO equipment (eName,repairStatus,purchaseDate,branchId,storageType) values (%s,%s,%s,%s,%s);'
                bindData = (_name, _rps, _date,_bId,_storageType)

                cursor.execute(sqlQuery, bindData)
                conn.commit()

                result = cursor.execute('SELECT eId,eName,repairStatus,DATE_FORMAT(purchaseDate,"%Y-%m-%d") as purchaseDate,branchId,storageType FROM equipment WHERE LAST_INSERT_ID() = eId;')

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


#Get/Delete single Equipment
@app.route('/equipment/<int:eId>',methods=['GET','DELETE'])
def getEquipDeleteEquip(eId):

    if(request.method == 'GET'):
        #Permissions: Either any valid EJWT or CJWT with an ID matching the client being requested
        ejwt = request.cookies.get("EJWT",None)
        cjwt = request.cookies.get("CJWT",None)

        eFlag = False
        cFlag = False

        if(ejwt == None and cjwt == None):
            return authenticationError()

        if(ejwt != None):
            eFlag = True
            try:
                ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
            except:
                eFlag = False

            #a valid ejwt was given
            #checks whether this employee is loggedIn
            if(ej["loggedIn"] == False):
                eFlag = False

        elif (eFlag == False and cjwt != None):
            cFlag = True
            try:
                cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
            except:
                cFlag = False

            #a valid ejwt was given
            #checks whether this employee is loggedIn
            if(cj["loggedIn"] == False):
                eFlag = False
        else:
            return authenticationError()

        if(cFlag == False and eFlag == False):
            return authenticationError()

        #Permissions are granted

        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                result = cursor.execute(f'SELECT eId,eName,repairStatus,DATE_FORMAT(purchaseDate,"%Y-%m-%d") as purchaseDate,branchId,storageType FROM equipment WHERE eId = {eId};')

                if (result <= 0):
                        print("EMPTY EMPTY") #This occurs when response comes back empty
                        return not_found()
                else:
                        equipReturn = cursor.fetchone()
                        response = jsonify(equipReturn)
                        response.status_code = 200
                        return response

        except Exception as e:
                print(e)
        finally:
                cursor.close()
                conn.close()
    else: #DELETE
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
        try:
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)

                #To preserve integrity, delete all reports where equipment is mentioned
                cursor.execute(f'DELETE FROM reports WHERE eId = {eId};')
                conn.commit()

                #Delete equipment
                cursor.execute(f'DELETE FROM equipment WHERE eId = {eId};')
                conn.commit()

                m = {"deleteSuccess" : True}
                response = jsonify(m)
                response.status_code = 200
                return response

        except Exception as e:
                print(e)
                m = {"deleteSuccess" : False}
                response = jsonify(m)
                response.status_code = 200
                return response
        finally:
                cursor.close()
                conn.close()


#Move single Equipment from Floor to storage
@app.route('/equipment/<int:eId>/move',methods=['PUT'])
def moveEquipment(eId):
    ejwt = request.cookies.get("EJWT",None)

    if(ejwt == None):
        return authenticationError()

    try:
        j = jwt.decode(ejwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee has permission or not
    if(j["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted
    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            result = cursor.execute(f'SELECT storageType FROM equipment WHERE eId = {eId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()

            equipReturn = cursor.fetchone() #Gets storageType
            newType = ""
            if(equipReturn['storageType'] == "Storage"):
                newType = "Floor"
            else:
                newType = "Storage"

            cursor.execute(f'UPDATE equipment SET storageType = "{newType}" WHERE eId = {eId};')
            conn.commit()

            m = {"switchSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response




    except Exception as e:
            print(e)
            m = {"switchSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
    finally:
            cursor.close()
            conn.close()



#Client Reports Equip or Deletes a report
@app.route('/equipment/<int:eId>/report',methods=['POST','DELETE'])
def reportEquipment(eId):
    cjwt = request.cookies.get("CJWT",None)

    if(cjwt == None):
        return authenticationError()

    try:
        cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(cj["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted

    cId = cj["clientId"] #Gets client Id

    if(request.method == 'POST'): #Add report

        #Gets required attributes from JSON body
        try:
            _json = request.json
            _issue = _json['issue']
        except:
            return badRequest()


        #We have all the attributes


        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)


            today = str(datetime.date.today().strftime('%Y-%m-%d')) #Gets current day YYYY-MM-DD

            cursor.execute(f'insert into reports (eId,clientId,issue,dateOfReport,curStatus) values ({eId},{cId},"{_issue}","{today}",true);')
            conn.commit()

            m = {"reportSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"reportSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()

    else: #Delete Report
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'DELETE FROM reports WHERE eId = {eId} AND clientId = {cId};')
            conn.commit()

            m = {"deleteReportSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"deleteReportSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()



#employee Switches the status of a report
@app.route('/equipment/<int:eId>/report/<int:cId>/switch',methods=['PUT'])
def switchReport(eId,cId):

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
    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            result = cursor.execute(f'SELECT curStatus FROM reports WHERE eId = {eId} AND clientId = {cId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()

            reportReturn = cursor.fetchone() #Gets storageType

            newStat = False

            if(reportReturn['curStatus'] == False):
                newStat = True

            cursor.execute(f'UPDATE reports SET curStatus = {newStat} WHERE eId = {eId} AND clientId = {cId};')
            conn.commit()

            m = {"switchReportSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


    except Exception as e:
            print(e)
            m = {"switchReportSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
    finally:
            cursor.close()
            conn.close()

#Get all reports from a branch
@app.route('/branches/<int:bId>/equipment/reports',methods=['GET'])
def getReportsFromBranch(bId):
    #Permissions: Either any valid EJWT or CJWT
    ejwt = request.cookies.get("EJWT",None)
    cjwt = request.cookies.get("CJWT",None)

    eFlag = False
    cFlag = False

    if(ejwt == None and cjwt == None):
        return authenticationError()

    if(ejwt != None):
        eFlag = True
        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            eFlag = False

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False):
            eFlag = False

    elif (eFlag == False and cjwt != None):
        cFlag = True
        try:
            cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
        except:
            cFlag = False

        #a valid ejwt was given
        #checks whether this client is loggedIn
        if(cj["loggedIn"] == False):
            eFlag = False
    else:
        return authenticationError()

    if(cFlag == False and eFlag == False):
        return authenticationError()

    #Permissions are granted

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT r.eId,r.clientId,DATE_FORMAT(r.dateOfReport,"%Y-%m-%d") as dateOfReport,r.issue,r.curStatus FROM reports as r, equipment as e WHERE e.eId = r.eId AND e.branchId = {bId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    reportReturn = cursor.fetchall()
                    response = jsonify(reportReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()

#Get All Equipment Reports From Logged in Client
@app.route('/client/equipment/reports',methods=['GET'])
def getReportsFromClient():
    cjwt = request.cookies.get("CJWT",None)

    if(cjwt == None):
        return authenticationError()

    try:
        cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(cj["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted

    cId = cj["clientId"] #Gets client Id

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT r.eId,r.clientId,DATE_FORMAT(r.dateOfReport,"%Y-%m-%d") as dateOfReport,r.issue,r.curStatus FROM reports as r WHERE clientId = {cId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    reportReturn = cursor.fetchall()
                    response = jsonify(reportReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()




#Get all bookings within a week from a branch
@app.route('/branches/<int:bId>/getBookings',methods=['GET'])
def getWeekBookingsFromBranch(bId):
    #Permissions: Either any valid EJWT or CJWT
    ejwt = request.cookies.get("EJWT",None)
    cjwt = request.cookies.get("CJWT",None)

    eFlag = False
    cFlag = False

    if(ejwt == None and cjwt == None):
        return authenticationError()

    if(ejwt != None):
        eFlag = True
        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            eFlag = False

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False):
            eFlag = False

    elif (eFlag == False and cjwt != None):
        cFlag = True
        try:
            cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
        except:
            cFlag = False

        #a valid ejwt was given
        #checks whether this client is loggedIn
        if(cj["loggedIn"] == False):
            eFlag = False
    else:
        return authenticationError()

    if(cFlag == False and eFlag == False):
        return authenticationError()

    #Permissions are granted

    try:
            #Gets YYYY-MM-DD of today and the date seven days from today
            t = datetime.date.today()
            today = str(t.strftime('%Y-%m-%d')) #Gets current day YYYY-MM-DD
            sevenDays = str((t + datetime.timedelta(days=7)).strftime('%Y-%m-%d')) #Gets current day YYYY-MM-DD



            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            result = cursor.execute(f'SELECT branchId,DATE_FORMAT(dateOfBooking,"%Y-%m-%d") as dateOfBooking,TIME_FORMAT(timeOfBooking, "%H:%i") as timeOfBooking FROM time_slot WHERE branchId = {bId} AND dateOfBooking >= "{today}" AND dateOfBooking < "{sevenDays}";')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()

            slots = cursor.fetchall() # all timeslots in the next 7 days

            cursor.execute(f'SELECT DATE_FORMAT(dateOfBooking,"%Y-%m-%d") as dateOfBooking, TIME_FORMAT(timeOfBooking, "%H:%i") as timeOfBooking, COUNT(*) as count FROM time_books WHERE branchId = {bId} AND dateOfBooking >= "{today}" AND dateOfBooking < "{sevenDays}" GROUP BY dateOfBooking,timeOfBooking;')

            booked = cursor.fetchall() # How many each of those time slots has filled


            bd = dict()
            for c in booked:
                if(not c["dateOfBooking"] in bd):
                    bd[c["dateOfBooking"]] = dict()

                bd[c["dateOfBooking"]][c["timeOfBooking"]] = c["count"]

            cursor.execute(f'SELECT timeSlotCapacity FROM Gym_Branch WHERE branchId = {bId};')

            capD = cursor.fetchone() # the capacity of each timeSlot from the gym branch
            cap = capD['timeSlotCapacity']


            d = dict() #key = date, value = [(timeSlot,spacesLeft)]
            for timeSlot in slots:
                date = timeSlot["dateOfBooking"]
                time = timeSlot["timeOfBooking"]

                if(not date in d):
                    d[date] = list()

                if(not date in bd):
                    d[date].append((time,cap))
                elif(time in bd[date]):
                    d[date].append((timeSlot["timeOfBooking"],cap - bd[date][time])) #appends (timeSlot,numLeft) to dateDictionary
                else:
                    d[date].append((timeSlot["timeOfBooking"],cap)) #appends (timeSlot,numLeft) to dateDictionary



            r = list()
            for k in d:
                d2 = dict()
                d2["date"] = k
                d2["capacity"] = cap
                d2["timeSlots"] = d[k]
                r.append(d2)

            response = jsonify(r)
            response.status_code = 200
            return response


    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()


#Client books or unbooks a timeSlot
@app.route('/branches/<int:bId>/bookTimeSlot',methods=['POST','DELETE'])
def bookTimeSlot(bId):
    cjwt = request.cookies.get("CJWT",None)

    if(cjwt == None):
        return authenticationError()

    try:
        cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(cj["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted

    cId = cj["clientId"] #Gets client Id

    #Gets required attributes from JSON body
    try:
        _json = request.json
        _date = _json['date']
        _time = _json['time']
    except:
        return badRequest()


    #We have all the attributes

    if(request.method == 'POST'): #Book Timeslot

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'SELECT timeSlotCapacity FROM Gym_Branch WHERE branchId = {bId};')

            capD = cursor.fetchone() # the capacity of the timeSlot from the gym branch
            cap = capD['timeSlotCapacity']

            result = cursor.execute(f'SELECT COUNT(*) as count FROM time_books WHERE branchId = {bId} AND dateOfBooking = "{_date}" AND timeOfBooking = "{_time}" GROUP BY dateOfBooking,timeOfBooking;')

            if(result <= 0): #No one has booked the timeSlot
                c = 0
            else: #Get number of people who have booked
                c = cursor.fetchone()['count']

            #Ensures booking does not exceed capacity
            if(c+1 > cap):
                m = {"bookingSuccess" : False}
                response = jsonify(m)
                response.status_code = 200
                return response

            #Books
            cursor.execute(f'insert into time_books (clientId,branchId,dateOfBooking,timeOfBooking) values ({cId},{bId},"{_date}","{_time}");')
            conn.commit()

            m = {"bookingSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"bookingSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()

    else: #DELETE: unbook timeSlot
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'DELETE FROM time_books WHERE clientId = {cId} AND dateOfBooking = "{_date}" AND timeOfBooking = "{_time}" AND branchId = {bId};')
            conn.commit()

            m = {"unBookingSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"unBookingSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()

#Employee Adds or Removes Timeslot
@app.route('/branches/<int:bId>/addTimeSlot',methods=['POST','DELETE'])
def addRemoveTimeSlot(bId):
    ejwt = request.cookies.get("EJWT",None)

    if(ejwt == None):
        return authenticationError()

    try:
        ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
        return authenticationError()

    #Permissions are granted

    #Gets required attributes from JSON body
    try:
        _json = request.json
        _date = _json['date']
        _time = _json['time']
    except:
        return badRequest()


    #We have all the attributes

    if(request.method == 'POST'): #Add Timeslot

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)


            result = cursor.execute(f'SELECT * FROM day_schedule WHERE branchId = {bId} AND dateOfBooking = "{_date}";')

            if(result == 0): #No day_schedule exits
                cursor.execute(f'INSERT INTO day_schedule (branchId,dateOfBooking) values ({bId},"{_date}");')
                conn.commit()

            cursor.execute(f'INSERT INTO time_slot (branchId,dateOfBooking,timeOfBooking) values ({bId},"{_date}","{_time}");')
            conn.commit()



            m = {"addingSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"addingSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()

    else: #DELETE timeSlot
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            #To preserve integrity, deletes bookings associated with timeslot
            cursor.execute(f'DELETE FROM time_books WHERE branchId = {bId} AND dateOfBooking = "{_date}" AND timeOfBooking = "{_time}";')
            conn.commit()

            cursor.execute(f'DELETE FROM time_slot WHERE branchId = {bId} AND dateOfBooking = "{_date}" AND timeOfBooking = "{_time}";')
            conn.commit()

            m = {"removalSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"removalSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()


#Get all bookings that the CJWT has booked from that gymBranch
@app.route('/branches/<int:bId>/getBooked',methods=['GET'])
def getClientBookingsFromBranch(bId):
    cjwt = request.cookies.get("CJWT",None)

    if(cjwt == None):
        return authenticationError()

    try:
        cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(cj["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted

    cId = cj["clientId"] #Gets client Id

    try:

            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            result = cursor.execute(f'SELECT DATE_FORMAT(dateOfBooking,"%Y-%m-%d") as dateOfBooking,TIME_FORMAT(timeOfBooking, "%H:%i") as timeOfBooking FROM time_books WHERE branchId = {bId} AND clientId = {cId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()

            bookings = cursor.fetchall()

            response = jsonify(bookings)
            response.status_code = 200
            return response


    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()


#Get all Services From Branch
@app.route('/branches/<int:bId>/getServices',methods=['GET'])
def getAllServicesFromBranch(bId):

    #Permissions: Either any valid EJWT or CJWT
    ejwt = request.cookies.get("EJWT",None)
    cjwt = request.cookies.get("CJWT",None)

    eFlag = False
    cFlag = False

    if(ejwt == None and cjwt == None):
        return authenticationError()

    if(ejwt != None):
        eFlag = True
        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            eFlag = False

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False):
            eFlag = False

    elif (eFlag == False and cjwt != None):
        cFlag = True
        try:
            cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
        except:
            cFlag = False

        #a valid ejwt was given
        #checks whether this client is loggedIn
        if(cj["loggedIn"] == False):
            eFlag = False
    else:
        return authenticationError()

    if(cFlag == False and eFlag == False):
        return authenticationError()

    #Permissions are granted

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT serviceId,branchId,serviceName,TIME_FORMAT(timeOfService, "%H:%i") as timeOfService,TIME_FORMAT(timeEnds, "%H:%i") as timeEnds,daysOfService,capacity,description FROM service WHERE branchId = {bId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    equipReturn = cursor.fetchall()
                    response = jsonify(equipReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()


#Get Service From Branch
@app.route('/branches/<int:bId>/getServices/<int:sId>',methods=['GET'])
def getAServiceFromBranch(bId,sId):

    #Permissions: Either any valid EJWT or CJWT
    ejwt = request.cookies.get("EJWT",None)
    cjwt = request.cookies.get("CJWT",None)

    eFlag = False
    cFlag = False

    if(ejwt == None and cjwt == None):
        return authenticationError()

    if(ejwt != None):
        eFlag = True
        try:
            ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
        except:
            eFlag = False

        #a valid ejwt was given
        #checks whether this employee is loggedIn
        if(ej["loggedIn"] == False):
            eFlag = False

    elif (eFlag == False and cjwt != None):
        cFlag = True
        try:
            cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
        except:
            cFlag = False

        #a valid ejwt was given
        #checks whether this client is loggedIn
        if(cj["loggedIn"] == False):
            eFlag = False
    else:
        return authenticationError()

    if(cFlag == False and eFlag == False):
        return authenticationError()

    #Permissions are granted

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT serviceId,branchId,serviceName,TIME_FORMAT(timeOfService, "%H:%i") as timeOfService,TIME_FORMAT(timeEnds, "%H:%i") as timeEnds,daysOfService,capacity,description FROM service WHERE branchId = {bId} AND serviceId = {sId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    equipReturn = cursor.fetchone()
                    response = jsonify(equipReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()

#Add Service to Branch
@app.route('/branches/<int:bId>/addService',methods=['POST'])
def AddAServiceToBranch(bId):

    ejwt = request.cookies.get("EJWT",None)

    if(ejwt == None):
        return authenticationError()

    try:
        ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
        return authenticationError()

    #Permissions are granted

    #Gets required attributes from JSON body
    try:
        _json = request.json
        _name = _json['serviceName']
        _time = _json['timeOfService']
        _endTime = _json['timeEnds']
        _days = _json['daysOfService']
        _cap = _json['capacity']
        _desc = _json['description']
    except:
        return badRequest()


    #We have all the attributes



    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(f'INSERT INTO service (branchId,serviceName,timeOfService,timeEnds,daysOfService,capacity,description) values ({bId},"{_name}","{_time}","{_endTime}","{_days}",{_cap},"{_desc}");')
            conn.commit()

            result = cursor.execute(f'SELECT serviceId,branchId,serviceName,TIME_FORMAT(timeOfService, "%H:%i") as timeOfService,TIME_FORMAT(timeEnds, "%H:%i") as timeEnds,daysOfService,capacity,description FROM service WHERE branchId = {bId} AND serviceId = LAST_INSERT_ID();')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    servReturn = cursor.fetchone()
                    response = jsonify(servReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()

#Remove a Service from a Branch
@app.route('/branches/<int:bId>/removeService/<int:sId>',methods=['DELETE'])
def RemoveServiceFromBranch(bId,sId):

    ejwt = request.cookies.get("EJWT",None)

    if(ejwt == None):
        return authenticationError()

    try:
        ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
        return authenticationError()

    #Permissions are granted

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            #Deletes any bookings to preserve integrity
            cursor.execute(f'DELETE FROM service_books WHERE branchId = {bId} AND serviceId = {sId};')
            conn.commit()

            cursor.execute(f'DELETE FROM service WHERE branchId = {bId} AND serviceId = {sId};')
            conn.commit()


            m = {'removalSuccess' : True}
            response = jsonify(m)
            response.status_code = 200
            return response

    except Exception as e:
            print(e)
            m = {'removalSuccess' : False}
            response = jsonify(m)
            response.status_code = 200
            return response
    finally:
            cursor.close()
            conn.close()

#Update a Service from a Branch
@app.route('/branches/<int:bId>/updateService/<int:sId>',methods=['PATCH'])
def UpdateServiceInBranch(bId,sId):

    ejwt = request.cookies.get("EJWT",None)

    if(ejwt == None):
        return authenticationError()

    try:
        ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
        return authenticationError()

    #Permissions are granted


    #Ensures a JSON body was passed
    try:
        _json = request.json
    except:
        return badRequest()


    #Tries to get all possible update values (cannot update id)

    d = dict() #dictionary to be later used with SQL Key = attr Value = update

    if('serviceName' in _json):
        d['serviceName'] = _json['serviceName']
    if('timeOfService' in _json):
        d['timeOfService'] = _json['timeOfService']
    if('daysOfService' in _json):
        d['daysOfService'] = _json['daysOfService']
    if('capacity' in _json):
        d['capacity'] = _json['capacity']
    if('description' in _json):
        d['description'] = _json['description']
    if('timeEnds' in _json):
        d['timeEnds'] = _json['timeEnds']

    #No relevent values were passed
    if(len(d) == 0):
        return badRequest()

    #Now that we have all values, arrange sqlQuery



    query = "UPDATE service SET " #start of query

    for k in d:
        if(type(d[k]) == str):
            query = query + k + ' = "' + d[k] + '", '
        else:
            query = query + k + ' = ' + str(d[k]) + ', '

    query = query[0:-2] #Removes last comma and space

    query = query + f' WHERE branchId = {bId} AND serviceId = {sId};'

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            #Updates Service
            cursor.execute(query)
            conn.commit()

            #Fetches update client
            result = cursor.execute(f'SELECT serviceId,branchId,serviceName,TIME_FORMAT(timeOfService, "%H:%i") as timeOfService,TIME_FORMAT(timeEnds, "%H:%i") as timeEnds,daysOfService,capacity,description FROM service WHERE branchId = {bId} AND serviceId = {sId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    serviceReturn = cursor.fetchone()
                    response = jsonify(serviceReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)

    finally:
            cursor.close()
            conn.close()


#Get all services that the CJWT has booked from that gymBranch
@app.route('/branches/<int:bId>/getServicesBooked',methods=['GET'])
def getClientServiceBookingsFromBranch(bId):
    cjwt = request.cookies.get("CJWT",None)

    if(cjwt == None):
        return authenticationError()

    try:
        cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(cj["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted

    cId = cj["clientId"] #Gets client Id

    try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            result = cursor.execute(f'SELECT branchId,serviceId,clientId,DATE_FORMAT(dateOfBooking,"%Y-%m-%d") as dateOfBooking FROM service_books WHERE branchId = {bId} AND clientId = {cId};')

            if (result <= 0):
                    print("EMPTY EMPTY") #This occurs when response comes back empty
                    return not_found()
            else:
                    equipReturn = cursor.fetchall()
                    response = jsonify(equipReturn)
                    response.status_code = 200
                    return response

    except Exception as e:
            print(e)
    finally:
            cursor.close()
            conn.close()


#Client books or unbooks a service
@app.route('/branches/<int:bId>/bookService/<int:sId>',methods=['POST','DELETE'])
def bookService(bId,sId):
    cjwt = request.cookies.get("CJWT",None)

    if(cjwt == None):
        return authenticationError()

    try:
        cj = jwt.decode(cjwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(cj["loggedIn"] == False):
        return authenticationError()

    #Permissions are granted

    cId = cj["clientId"] #Gets client Id

    #Gets required attributes from JSON body
    try:
        _json = request.json
        _date = _json['date']
    except:
        return badRequest()


    #We have all the attributes

    if(request.method == 'POST'): #Book Service

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'SELECT capacity FROM service WHERE serviceId = {sId} AND branchId = {bId};')

            capD = cursor.fetchone() # the capacity of the service
            cap = capD['capacity']

            result = cursor.execute(f'SELECT COUNT(*) as count FROM service_books WHERE serviceId = {sId} AND dateOfBooking = "{_date}" AND branchId = {bId} GROUP BY dateOfBooking;')

            if(result <= 0): #No one has booked the service on this date
                c = 0
            else: #Get number of people who have booked
                c = cursor.fetchone()['count']

            #Ensures booking does not exceed capacity
            if(c+1 > cap):
                m = {"bookingSuccess" : False}
                response = jsonify(m)
                response.status_code = 200
                return response

            #Books
            cursor.execute(f'insert into service_books (clientId,branchId,dateOfBooking,serviceId) values ({cId},{bId},"{_date}",{sId});')
            conn.commit()

            m = {"bookingSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"bookingSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()

    else: #DELETE: unbook service
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'DELETE FROM service_books WHERE clientId = {cId} AND dateOfBooking = "{_date}" AND serviceId = {cId} AND branchId = {bId};')
            conn.commit()

            m = {"unBookingSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"unBookingSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()



#Add or Remove Instructs relationship
@app.route('/branches/<int:bId>/instructs',methods=['POST','DELETE'])
def addRemoveInstructs(bId):
    ejwt = request.cookies.get("EJWT",None)

    if(ejwt == None):
        return authenticationError()

    try:
        ej = jwt.decode(ejwt, secret, algorithms=["HS256"])
    except:
        return authenticationError()

    #a valid ejwt was given
    #checks whether this employee is loggedIn
    if(ej["loggedIn"] == False or ej["eType"] != "Admin"):
        return authenticationError()

    #Permissions are granted

    #Gets required attributes from JSON body
    try:
        _json = request.json
        _eId = _json['eId']
        _sId = _json['sId']
    except:
        return badRequest()


    #We have all the attributes


    if(request.method == 'POST'): #Add instructs relationship

        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'insert into instructs (eId,serviceId,branchId) values ({_eId},{_sId},{bId});')
            conn.commit()

            m = {"addSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"addSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
        finally:
            cursor.close()
            conn.close()

    else: #Delete Report
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)

            cursor.execute(f'DELETE FROM instructs WHERE eId = {_eId} AND serviceId = {_sId} AND branchId = {bId};')
            conn.commit()

            m = {"deleteSuccess" : True}
            response = jsonify(m)
            response.status_code = 200
            return response


        except Exception as e:
            print(e)
            m = {"deleteSuccess" : False}
            response = jsonify(m)
            response.status_code = 200
            return response
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
