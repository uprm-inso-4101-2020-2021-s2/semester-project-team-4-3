from flask import Blueprint, jsonify, request
import flask
import flask_praetorian
from app import guard
import config.app_config

auth = Blueprint('auth', __name__)

@auth.route('/login', methods = ['POST'])
def login():

    req = flask.request.get_json(force = True)
    username = req.get('username', None)
    password = req.get('password', None)
    uaccount = guard.authenticate(username, password)
    ret = {'access_token':guard.encode_jwt_token(uaccount)}
    return ret, 200


@auth.route('/')
def home():
    print("smh")
    return {"Hello": "World"}, 200

