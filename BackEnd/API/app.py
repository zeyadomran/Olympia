#API structure based on article at https://webdamn.com/create-restful-api-using-python-mysql/

"""
Programmer: Austin Shawaga
UCID: 30086103
CPSC 471 Winter 2022
University of Calgary

Python + Flask REST API for MySQL Database
"""

from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
