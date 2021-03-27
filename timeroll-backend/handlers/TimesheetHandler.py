from flask import jsonify
from daos.WorkdayDAO import WorkdayDAO
from daos.TimesheetDAO import TimesheetDAO
from daos.TasksDAO import TasksDAO
from datetime import date, timedelta, datetime

class TimesheetHandler:

    def build_timesheet_attributes(self, tid, startdate, enddate, eid):
        result={};
        result['tid'] = tid
        result['start_date'] = startdate
        result['end_date'] = enddate
        result['eid'] = eid

    def build_workday_attributes(self, wid, date, vacation, tid):
        result={};
        result['wid'] = wid
        result['date'] = date
        result['vacation'] = vacation
        result['tid'] = tid

    def build_worktask_attributes(self, wtid, worktype, hoursworked, wid):
        result={};
        result['wtid'] = wtid
        result['work_type'] = worktype
        result['hours_worked'] = str(hoursworked)
        result['wid'] = wid

    def build_timesheet_dict(self,row):
        result = {}
        result['tid'] = row [0]
        result['start_date'] = row[1]
        result['end_date'] = row[2]
        result['eid'] = row[3]
        return result

    def build_workday_dict(self,row):
        result = {}
        result['wid'] = row[0]
        result['date'] = row[1]
        result['vacation'] = row[2]
        return result

    def build_worktask_dict(self,row):
        result = {}
        result['wtid'] = row[0]
        result['work_type'] = row[1]
        result['hours_worked'] = str(row[2])
        return result

    def getTimesheet(self, uid):
        day = date.today()
        tdao = TasksDAO()
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()
        timesheet = tsdao.getTimesheet(uid,day)
        tid = timesheet[0]
        startdate = timesheet[1]
        enddate = timesheet[2]

        workdays = []
        tsdictionary = {}
        i=0;
        weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        workdaylist = wdao.getWorkDays(tid,startdate,enddate)
        for row in workdaylist:
            workdays.append(row[0])
            key = weekdays[i]
            i = i+1
            wdictionary = self.build_workday_dict(row)
            tsdictionary[key] = wdictionary

        j=0
        for entry in workdaylist:
            tasklist = []
            entry = weekdays[j]
            tasks = tdao.getWorkTasks(tsdictionary[entry]['wid'])

            for item in tasks:
                task = self.build_worktask_dict(item)
                tasklist.append(task)

            tsdictionary[entry]["tasks"] = tasklist


        return tsdictionary

    def getTimesheetByDate(self, uid, udate):
        day = udate
        tdao = TasksDAO()
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()
        timesheet = tsdao.getTimesheet(uid, day)
        tid = timesheet[0]
        startdate = timesheet[1]
        enddate = timesheet[2]

        workdays = []
        tsdictionary = {}
        i = 0;
        weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        workdaylist = wdao.getWorkDays(tid, startdate, enddate)
        for row in workdaylist:
            workdays.append(row[0])
            key = weekdays[i]
            i = i + 1
            wdictionary = self.build_workday_dict(row)
            tsdictionary[key] = wdictionary

        j = 0
        for entry in workdaylist:
            tasklist = []
            entry = weekdays[j]
            j+=1
            tasks = tdao.getWorkTasks(tsdictionary[entry]['wid'])

            for item in tasks:
                task = self.build_worktask_dict(item)
                tasklist.append(task)

            tsdictionary[entry]["tasks"] = tasklist

        return tsdictionary

    def createTimesheet(self,uid,json):
        daystring = json['date']
        day = datetime.strptime(daystring, '%m/%d/%Y')
        week = timedelta(days=7)
        startdate = day
        enddate = startdate + week
        tdao = TasksDAO()
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()
        vacation = json['vacation']
        tid = tsdao.createTimesheet(startdate,enddate,uid)
        wid = wdao.createWorkday(day,vacation, tid)
        tasks = json['tasks']

        for entry in tasks:
            worktype = entry['worktype']
            hours_worked = datetime.strptime(entry['end_time'], '%H:%M')-datetime.strptime(entry['start_time'], '%H:%M')
            print(hours_worked)
            tdao.createWorkTask(worktype,hours_worked,wid)

        result = self.build_timesheet_attributes(tid,startdate,enddate,uid)
        return jsonify(timesheet=result), 201


    def getTimesheetID(self,uid, day):
        tsdao = TimesheetDAO()
        tid = tsdao.getTimesheetID(uid, day)
        return tid

    def addWorkday(self, uid, json):

        tdao = TasksDAO()
        wdao = WorkdayDAO()
        day = json['date']
        tid = self.getTimesheetID(uid, day)
        vacation = json['vacation']
        wid = wdao.createWorkday(day, vacation, tid)
        tasks = json['tasks']
        idcount = 0

        for entry in tasks:
            worktype = entry['worktype']
            hours_worked = datetime.strptime(entry['end_time'], '%H:%M')-datetime.strptime(entry['start_time'], '%H:%M')
            tid = tdao.createWorkTask(worktype,hours_worked,wid)
            idcount += 1

        return jsonify(tasks_created = idcount)
