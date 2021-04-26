from flask import jsonify

from daos.RequestsDAO import RequestsDAO
from daos.WorkdayDAO import WorkdayDAO
from daos.TimesheetDAO import TimesheetDAO
from daos.TasksDAO import TasksDAO
from datetime import date, timedelta, datetime

class RequestsHandler:

    def build_requests_attributes(self, rid, type, startdate, enddate, approve, eid, aid):
        result={};
        result['rid'] = rid
        result['type'] = type
        result['start_date'] = startdate
        result['end_date'] = enddate
        result['approve'] = approve
        result['eid'] = eid
        result['aid'] = aid

    def build_requests_dict(self, row):
        result={};
        result['rid'] = row[0]
        result['type'] = row[1]
        result['start_date'] = row[2]
        result['end_date'] = row[3]
        result['approve'] = row[4]
        result['eid'] = row[5]
        result['aid'] = row[6]
        return result

    def createRequest(self,uid, json):
        daystring = json['date']
        day = datetime.strptime(daystring, '%m/%d/%Y')
        week = timedelta(days=7)
        startdate = day
        enddate = startdate + week
        rdao = RequestsDAO()
        vacation = json['vacation']
        rid = rdao.createRequest(startdate, enddate, uid)





    def getRequests(self, uid):
        day = date.today()
        rdao = RequestsDAO()
        requests = rdao.getRequest(uid, day)
        rid = requests[0]
        type = requests[1]
        start_date = requests[2]
        end_date = requests[3]
        approve = requests[4]



