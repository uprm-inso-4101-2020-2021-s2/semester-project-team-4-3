from flask import Blueprint, jsonify, request
import flask
import flask_praetorian
from app import guard
import config.app_config
from handlers.TimesheetHandler import TimesheetHandler
from daos.TimesheetDAO import TimesheetDAO
from datetime import date

timesheets = Blueprint('timesheets', __name__)

@timesheets.route('/', methods = ['POST', 'GET', 'PUT'])
@flask_praetorian.roles_accepted("employee", "admin")
def current_timesheet():
    uid = flask_praetorian.current_user().uid

    if request.method == 'GET':
        req = request.json
        if req:
            day = req['date']                     #date for the desired timesheet. Ensure name is the same in the front end or vice versa
            if day:
                return TimesheetHandler().getTimesheetByDate(uid,day)
            else:
                return jsonify(Error = "Date parameter is either not included or not valid"), 400
        else:
            return TimesheetHandler().getTimesheet(uid)

    elif request.method == 'POST':
        req = flask.request.get_json(force=True)
        if not TimesheetDAO().getTimesheet(uid, req['date']):
            TimesheetHandler().createTimesheet(uid, req)
            return "Timesheet Created", 200
        else:
            return TimesheetHandler().addWorkday(uid, req)

    elif request.method == 'PUT':
        req = flask.request.get_json(force=True)
        if not req or request.args:
            return jsonify(Error = "No argument received."), 400

    else:
        return jsonify(Error = "Method not allowed."), 405


@timesheets.route('/')
def home():
    print("smh")
    return {"Hello": "World"}, 200