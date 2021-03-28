import os
import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import flask_cors
import flask_praetorian
import config.app_config

db = SQLAlchemy()                       #initialize SQLAlchemy
guard = flask_praetorian.Praetorian()   #initialize flask praetorian
cors = flask_cors.CORS()                #initialize CORS

def create_app():
    app = flask.Flask(__name__)
    app.debug = True                    #Change for deployment

    app.config['SQLALCHEMY_DATABASE_URI'] = config.app_config.configs['db_string']          #set databaase connection string
    app.config['SECRET_KEY'] = config.app_config.configs['secret_key']                      #Set encryption secret key
    app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}                                       #JWT Lifespan
    app.config['JWT_REFRESH_LIFESPAN'] = {'days' : 30}

    from daos.UserModel import uaccount                                                     #Import the user model

    guard.init_app(app,uaccount)                                                            #Provide user model to praetorian
    db.init_app(app)                                                                        #initiate db connection
    cors.init_app(app)

    with app.app_context():                                                                 #Creates an admin account if it doesn't exist right now. Parameters can be modified for different instances. Remove for production
       if db.session.query(uaccount).filter_by(email='pepe.r@site.com').count() < 2:
           db.session.add(uaccount(
               email = 'pepe.r@site.com',
               password = guard.hash_password('password123'),
               first_name = 'Pepe',
               last_name = 'Rodriguez',
               phone_number = '939-269-8952',
               salary = '15',
               vacation_days = 15,
               sick_days = 8,
               username = 'PepeR',
               role = 'employee',
           ))
           db.session.commit()


    from Blueprints.auth import auth as auth_blueprint           #Imports all the blueprints. Routes are stored in the blueprints to prevent large route file
    from Blueprints.timesheets import timesheets as timesheet_blueprint

    app.register_blueprint(auth_blueprint)
    app.register_blueprint(timesheet_blueprint, url_prefix='/timesheet')

    return app
