from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from handlers.TimesheetHandler import TimesheetHandler
from datetime import datetime


@app.route('/')
def index():
    return 'Welcome to the TimeRoll App! Please log in'


@app.route('/home')
def home():
    return 'Welcome to your Home Page!'


@app.route('/timesheet', methods=['GET','POST','UPDATE'])
def manageTimesheet():
    eid = 0                             #Placeholder eid. Replace when accounts structure has been established
    day = request.form.get("day")
    if request.method == 'GET':
        if day:
             return TimesheetHandler().getTimesheetByDate(eid, day)
        else:
            return TimesheetHandler().getTimesheet(1)

    elif request.method == 'POST':
        return TimesheetHandler().insertValues(request.form.eid, request.form)

    elif request.method == 'UPDATE':
        return TimesheetHandler().updateValues(request.form.eid,request.form)

    else:
        return jsonify(Error="Method not allowed."),405



@app.route('/employee', methods=['GET','POST','UPDATE'])
def employee():
    return 'This is your employee page!'

@app.route('/employees/<int:eid>', methods=['GET','UPDATE'])
def employees():
    return 'This is the admin employee page'

@app.route('/paystubs', methods=['GET'])
def paystubs():
    return 'View your paystubs here!'

@app.route('/Requests/<int:eid>', methods=['GET','POST','UPDATE'])
def requests():
    return 'View pending requests here'

@app.route('/worktrends', methods=['GET'])
def worktrends():
    return 'See how your work has been these past few days'
@app.route('/worktrends/<int:eid>', methods = ['GET'])
def eworktrends():
    return 'Check employee work trends here'

@app.route('/profile', methods = ['GET','UPDATE'])
def profile():
    return 'Edit your profile here'