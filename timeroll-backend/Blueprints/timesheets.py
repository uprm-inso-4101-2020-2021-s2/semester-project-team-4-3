from flask import Blueprint, jsonify, request
import flask
import flask_praetorian
from app import guard
import config.app_config
from handlers.TimesheetHandler import TimesheetHandler
from daos.TimesheetDAO import TimesheetDAO
from datetime import date

timesheets = Blueprint('timesheets', __name__)

@timesheets.route('/', methods = ['POST', 'GET', 'PUT'])        #defines route and REST Methods
@flask_praetorian.roles_accepted("employee", "admin")           #defines which roles can use this route
def current_timesheet():
    uid = flask_praetorian.current_user().uid                   #determines the current user

    if request.method == 'GET':                                 #actions to perform is request is GET
        req = request.json
        if req:
            day = req['date']                     #date for the desired timesheet. Ensure name is the same in the front end or vice versa
            if day:
                return TimesheetHandler().getTimesheetByDate(uid,day)
            else:
                return jsonify(Error = "Date parameter is either not included or not valid"), 400
        else:
            return TimesheetHandler().getTimesheet(uid)

    elif request.method == 'POST':                                  #Adds a workday given a workday object via json (including nested work tasks within it.)
        req = flask.request.get_json(force=True)                    #If the timesheet which the workday belongs to does not exist, creates the needed timesheet.
        if not TimesheetDAO().getTimesheet(uid, req['date']):
            TimesheetHandler().createTimesheet(uid, req)
            return "Timesheet Created", 200
        else:
            return TimesheetHandler().addWorkday(uid, req)          #Adds received workday and worktask objects to the timesheet which exists.

    elif request.method == 'PUT':                                   #PENDING IMPLEMENTATION: Updates the worktasks within a given work day
        req = flask.request.get_json(force=True)
        if not req or request.args:
            return jsonify(Error = "No argument received."), 400

    else:
        return jsonify(Error = "Method not allowed."), 405

@timesheets.route('/<int:uid>', methods = ['POST', 'GET', 'PUT'])        #Allows admins to get the complete timesheet (including workdays and worktasks) of a given employee's timesheet. Can include a json request which includes a date object.
@flask_praetorian.roles_accepted("admin")           #limits the route to admins only
def employeetimesheet(uid):

    if request.method == 'GET':                                 #actions to perform if request is GET
        req = request.json                              #Checks for existence of a json object containing a date parameter
        if req:
            day = req['date']                     #date for the desired timesheet. Ensure name is the same in the front end or vice versa
            if day:
                return TimesheetHandler().getTimesheetByDate(uid,day)   #Gets the timesheet of the given employee for the given date.
            else:
                return jsonify(Error = "Date parameter is either not included or not valid"), 400
        else:
            return TimesheetHandler().getTimesheet(uid)         #Gets the timesheet of the given employee for the current date.


    elif request.method == 'PUT':                       #Pending implementation: Allows an admin to update a user's timesheet
        req = flask.request.get_json(force=True)
        if not req or request.args:
            return jsonify(Error = "No argument received."), 400

    else:
        return jsonify(Error = "Method not allowed."), 405
