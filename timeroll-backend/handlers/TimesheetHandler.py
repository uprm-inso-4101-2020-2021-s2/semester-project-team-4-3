from flask import jsonify
from daos.WorkdayDAO import WorkdayDAO
from daos.TimesheetDAO import TimesheetDAO
from daos.TasksDAO import TasksDAO
from datetime import date, timedelta, datetime

class TimesheetHandler:

    def build_timesheet_attributes(self, tid, startdate, enddate, eid):             #constructs a timesheet json dictionary given its attributes.
        result={};
        result['tid'] = tid
        result['start_date'] = startdate
        result['end_date'] = enddate
        result['eid'] = eid
        return result

    def build_workday_attributes(self, wid, date, vacation, tid):                   #constructs a workday json dictionary given the object's attributes
        result={};
        result['wid'] = wid
        result['date'] = date
        result['vacation'] = vacation
        result['tid'] = tid
        return result

    def build_worktask_attributes(self, wtid, worktype, hoursworked, wid):          #constructs a worktask json dictionary given the object's attributes.
        result={};
        result['wtid'] = wtid
        result['work_type'] = worktype
        result['hours_worked'] = str(hoursworked)
        result['wid'] = wid
        return result

    def build_timesheet_dict(self,row):                                             #constructs a given timesheet object into a json dictionary.
        result = {}
        result['tid'] = row [0]
        result['start_date'] = row[1]
        result['end_date'] = row[2]
        result['eid'] = row[3]
        return result

    def build_workday_dict(self,row):                                               #constructs a given workday object into a json dictionary.
        result = {}
        result['wid'] = row[0]
        result['date'] = row[1]
        result['vacation'] = row[2]
        return result

    def build_worktask_dict(self,row):                                              #constructs a given worktask object into a json dictionary.
        result = {}
        result['wtid'] = row[0]
        result['work_type'] = row[1]
        result['hours_worked'] = str(row[2])
        return result

    def getTimesheet(self, uid):                                                    #Gets the timesheet of the current week given the timesheet owner's id.
        day = date.today()
        tdao = TasksDAO()
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()
        timesheet = tsdao.getTimesheet(uid,day)

        if not timesheet:
            jsonify(Error = "No timesheet found for the given user.")

        tid = timesheet[0]
        startdate = timesheet[1]
        enddate = timesheet[2]

        workdays = []
        tsdictionary = {}
        i=0;
        weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        workdaylist = wdao.getWorkDays(tid,startdate,enddate)

        if not workdaylist:
            return jsonify(Error = "No workdays found in the given timesheet.")

        for row in workdaylist:
            workdays.append(row[0])
            key = weekdays[i]
            i = i+1
            wdictionary = self.build_workday_dict(row)
            tsdictionary[key] = wdictionary

        j=0

        for entry in workdaylist:
            tasklist = []
            j +=1
            entry = weekdays[j]
            tasks = tdao.getWorkTasks(tsdictionary[entry]['wid'])

            for item in tasks:
                task = self.build_worktask_dict(item)
                tasklist.append(task)

            tsdictionary[entry]["tasks"] = tasklist

        return tsdictionary

    def getTimesheetByDate(self, uid, udate):   #Gets a timesheet given a user id and the specific date for the timesheet.
        day = udate
        tdao = TasksDAO()                       #Create instances of Data Access Objects
        wdao = WorkdayDAO()
        tsdao = TimesheetDAO()
        timesheet = tsdao.getTimesheet(uid, day)        #returns row (a list object) with timesheet parameters
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

    def createTimesheet(self,uid,json):     #Creates a timesheet given a json with workday and worktasts objets.
        daystring = json['date']

        if not daystring:
            return jsonify(Error = "Daystring not present in the provided JSON.")

        day = datetime.strptime(daystring, '%Y-%m-%d')  #converts date string to datetime object
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

        if not tid:
            return jsonify(Error = "No timesheet found for the given user and date.")

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
