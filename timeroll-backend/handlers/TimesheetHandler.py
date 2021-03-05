from flask import jsonify
from daos.WorkdayDAO import WorkdayDAO
from daos.TimesheetDAO import TimesheetDAO
from daos.TasksDAO import TasksDAO
from datetime import date

class TimesheetHandler:
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
        #result['tid'] = row[3]
        return result

    def build_worktask_dict(self,row):
        result = {}
        result['wtid'] = row[0]
        result['worktype'] = row[1]
        result['hours'] = row[2]
        result['note'] = row[3]
        result['wid'] = row[4]
        return result

    def getTimesheet(self, eid):
        day = date.today()
        tdao = TasksDAO()
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()
        timesheet = tsdao.getTimesheet(eid,day)
        tid = timesheet[0]
        startdate = timesheet[1]
        enddate = timesheet[2]

        workdays = []
        tsdictionary = {}
        workdaylist = wdao.getWorkDays(tid,startdate,enddate)
        for row in workdaylist:
            workdays.append(row[0])
            key = "Workday " + str(row[0])
            wdictionary = self.build_workday_dict(row)
            tsdictionary[key] = wdictionary

        for entry in workdays:
            tasks = tdao.getWorkTasks(entry)
            for item in tasks:
                taskid = "Task "  + str(item[0])
                task = self.build_worktask_dict(item)
                tsdictionary["Workday " + str(entry)][taskid] = task


        print(tsdictionary)


        return jsonify(Timesheet = tsdictionary)

    def getTimesheetByDate(self, eid, udate):
        day = udate
        tdao = TasksDAO()
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()

        timesheet = tsdao.getTimesheet(eid, day)
        tid = timesheet[0]
        startdate = timesheet[1]
        enddate = timesheet[2]

        workdays = []
        tsdictionary = {}
        workdaylist = wdao.getWorkDays(tid, startdate, enddate)
        for row in workdaylist:
            workdays.append(row[0],row[1])
            tsdictionary.append(row[1])

        for wid, cdate in workdays:
            tasks = tdao.getWorkTasks(wid)
            for item in tasks:
                task = self.build_workday_dict(item)
                tsdictionary[cdate].append(task)

        return jsonify(Timesheet=tsdictionary)










