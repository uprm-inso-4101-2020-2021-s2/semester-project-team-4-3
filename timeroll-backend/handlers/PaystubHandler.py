from flask import jsonify
from datetime import date, timedelta, datetime

class PaystubHandler:

    def __init__(self, pid, start_date, end_date, net_pay, gross_pay,
                                 total_deductions, total_benefits, total_hours, user):

        self.pid = pid
        self.start_date = start_date
        self.end_date = end_date
        self.net_pay = net_pay
        self.gross_pay = gross_pay
        self.total_deductions = total_deductions
        self.total_benefits = total_benefits
        self.total_hours = total_hours
        self.user = user

    def dict(self):
        return self.__dict__


    def create_paystub(self, start_date, end_date, net_pay, gross_pay,
                                 total_deductions, total_benefits, total_hours, user):
        return self.dao.create_paystub( start_date, end_date, net_pay, gross_pay,
                                 total_deductions, total_benefits, total_hours, user)


    def get_paystub(self):
        pass
    def get_net_pay(self):
        pass
    def get_gross_pay(self):
        pass
    def get_total_deductions(self):
        pass


