

class TimesheetDAO:
    def getTimesheet(self, eid, day):
        #Hardcoded value to test Handler and main
        #Final implementation will identify timesheet based on biweekly or weekly period
        timesheet = [0,"03/01/2021","03/14/2021",0]
        return timesheet