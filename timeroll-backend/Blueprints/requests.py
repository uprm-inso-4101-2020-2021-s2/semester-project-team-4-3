from flask import Blueprint, jsonify, request
import flask
import flask_praetorian
from app import guard
import config.app_config
from handlers.TimesheetHandler import TimesheetHandler
from daos.TimesheetDAO import TimesheetDAO
from datetime import date

requests = Blueprint('requests', __name__)

@requests.route('/', methods = ['POST', 'GET', 'PUT'])
@flask_praetorian.roles_accepted("employee", "admin")
def current_request():
    uid = flask_praetorian.current_user().uid

