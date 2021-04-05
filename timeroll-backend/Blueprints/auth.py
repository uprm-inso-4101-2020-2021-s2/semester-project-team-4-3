from flask import Blueprint, jsonify, request
import flask
import flask_praetorian
from app import guard, db
from daos.UserModel import uaccount                                                     #Import the user model
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

@auth.route('/create_account', methods = ['POST'])      #Creates a new account for either an employee or an admin. This operation can only be done by admins of the system.
@flask_praetorian.roles_required("admin")
def createAccount():

    req = flask.request.get_json()

    if not req:
        return jsonify(Error = "No JSON received."),400

    try:
        username = req['username']
    except:
        return jsonify(Error="JSON Parameter Error: There is no username key in the received JSON Object."),400
    try:
        password = req['password']
    except:
        return jsonify(Error="JSON Parameter Error: There is no password key in the received JSON Object."),400
    try:
        first_name = req['First_Name']
    except:
        return jsonify(Error="JSON Parameter Error: There is no First_Name key in the received JSON Object."),400
    try:
        last_name = req['Last_Name']
    except:
        return jsonify(Error="JSON Parameter Error: There is no Last_Name key in the received JSON Object."),400
    try:
        phone_number = req['Phone_Number']
    except:
        return jsonify(Error="JSON Parameter Error: There is no phone_number key in the received JSON Object."),400
    try:
        email = req['email']
    except:
        return jsonify(Error="JSON Parameter Error: There is no email key in the received JSON Object."),400
    try:
        salary = req['salary']
    except:
        return jsonify(Error="JSON Parameter Error: There is no salary key in the received JSON Object."),400
    try:
        vacation_days = req['vacation_days']
    except:
        return jsonify(Error="JSON Parameter Error: There is no vacation_days key in the received JSON Object."),400
    try:
        sick_days = req['sick_days']
    except:
        return jsonify(Error="JSON Parameter Error: There is no sick_days key in the received JSON Object."),400
    try:
        role = req['role']
    except:
        return jsonify(Error="JSON Parameter Error: There is no role key in the received JSON Object."),400
    db.session.add(uaccount(
        first_name=first_name,
        last_name=last_name,
        phone_number=phone_number,
        email = email,
        username = username,
        password = guard.hash_password(password),
        salary = salary,
        vacation_days = vacation_days,
        sick_days = sick_days,
        role = role
        ))

    db.session.commit()

    rstring = "User " + username + " created successfully."

    return jsonify(Success = rstring),200


@auth.route('/profile', methods=['GET','PUT'])  # Gets the user's own profile. If put, allows the user to change their email, password, or phone number.
@flask_praetorian.roles_accepted("admin", "customer")
def getProfile():

    uid = flask_praetorian.current_user().uid

    account = uaccount.query.filter_by(uid = uid)

    if not account:
        return jsonify(Error = "No user account found with the given user id."),404

    if request.method == 'GET':
        profile = {}
        profile['First_Name'] = account.first_name
        profile['Last_Name'] = account.last_name
        profile['phone_number'] = account.phone_number
        profile['email'] = account.email
        profile['salary'] = account.salary
        profile['vacation_days'] = account.vacation_days
        profile['sick_days'] = account.sick_days

        return jsonify(Success=profile), 200

    if request.method == 'PUT':
        req = flask.request.get_json(force=True)
        if not req:
            return jsonify(Error="No JSON received."),400

        try:
            phone_number = req['Phone_Number']
        except:
            return jsonify(Error="JSON Parameter Error: There is no phone_number key in the received JSON Object."),400
        try:
            email = req['email']
        except:
            return jsonify(Error="JSON Parameter Error: There is no email key in the received JSON Object."),400

        try:
            password = req['password']
        except:
            return jsonify(Error="JSON Parameter Error: There is no password key in the received JSON Object."),400

        if phone_number:
            account.phone_number = phone_number

        if email:
            account.email = email

        if password:
            account.password = guard.hash_password(password)

        return jsonify(Success = "Parameters Updated Successfully"),200





@auth.route('/profile/<int:uid>', methods=['GET'])  # Gets a specific user's profile. If put, allows an admin to update any parameters in the account.
@flask_praetorian.roles_accepted("admin")
def getProfile(uid):

    account = uaccount.query.filter_by(uid = uid)

    if not account:
        return jsonify(Error = "No user account found with the given user id.")

    if request.method == 'GET':
        profile = {}
        profile['First_Name'] = account.first_name
        profile['Last_Name'] = account.last_name
        profile['phone_number'] = account.phone_number
        profile['email'] = account.email
        profile['salary'] = account.salary
        profile['vacation_days'] = account.vacation_days
        profile['sick_days'] = account.sick_days

        return jsonify(Success=profile), 200

    if request.method == 'PUT':

        req = flask.request.get_json(force=True)
        if not req:
            return jsonify(Error="No JSON received."), 400

        try:
            first_name = req['First_Name']
        except:
            return jsonify(Error="JSON Parameter Error: There is no First_Name key in the received JSON Object."), 400

        try:
            last_name = req['Last_Name']
        except:
            return jsonify(Error="JSON Parameter Error: There is no Last_Name key in the received JSON Object."), 400

        try:
            phone_number = req['Phone_Number']
        except:
            return jsonify(Error="JSON Parameter Error: There is no phone_number key in the received JSON Object."), 400

        try:
            email = req['email']
        except:
            return jsonify(Error="JSON Parameter Error: There is no email key in the received JSON Object."), 400

        try:
            salary = req['salary']
        except:
            return jsonify(Error="JSON Parameter Error: There is no salary key in the received JSON Object."), 400

        try:
            vacation_days = req['vacation_days']
        except:
            return jsonify(Error="JSON Parameter Error: There is no vacation_days key in the received JSON Object."), 400

        try:
            sick_days = req['sick_days']
        except:
            return jsonify(Error="JSON Parameter Error: There is no sick_days key in the received JSON Object."), 400

        try:
            password = req['password']
        except:
            return jsonify(Error="JSON Parameter Error: There is no password key in the received JSON Object."),400

        if first_name:
            account.first_name = first_name

        if last_name:
            account.last_name = last_name

        if phone_number:
            account.phone_number = phone_number

        if email:
            account.email = email

        if salary:
            account.salary = salary

        if vacation_days:
            account.vacation_days = vacation_days

        if sick_days:
            account.sick_days = sick_days

        if password:
            account.password = guard.hash_password(password)

        return jsonify(Success="Parameters Updated Successfully"), 200

    else:
        return jsonify(Error = "Method not allowed."),405

