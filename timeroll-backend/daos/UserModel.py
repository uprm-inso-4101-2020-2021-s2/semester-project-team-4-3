from app import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

class uaccount(db.Model):

    __tablename__ = 'uaccount'

    uid = db.Column(db.Integer, primary_key = True)                 #Establishes connection between local params and db params
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(40))
    phone_number = db.Column(db.String(15), unique=True)
    email = db.Column(db.String(60), unique=True)
    salary = db.Column(db.Float)
    vacation_days = db.Column(db.Integer)
    sick_days = db.Column(db.Integer)
    username = db.Column(db.String(25), unique = True)
    password = db.Column(db.String)
    role = db.Column(db.String(15))

    @property
    def rolenames(self):                                            #Defines rolenames method, necessary for praetorian
        try:
            return self.role.split(',')
        except Exception:
            return []
                                #Class methods are for Praetorian's functionalities
    @classmethod                                                    #lookup user by email
    def lookup(cls, username):
        return cls.query.filter_by(username = username).one_or_none()

    @classmethod
    def identify(cls,uid):                                          #identify user by uid
        return cls.query.get(uid);

    @property
    def identity(self):                                             #return self Identity
        return self.uid