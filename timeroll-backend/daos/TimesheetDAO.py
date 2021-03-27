import psycopg2
import config.dbconfig

class TimesheetDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s host = 'localhost' password=%s" % (
            config.dbconfig.database_config['dbname'],
            config.dbconfig.database_config['user'],
            config.dbconfig.database_config['passwd'])
        self.conn = psycopg2.connect(connection_url)

    def getTimesheet(self,uid, day):
        cursor = self.conn.cursor()
        query = "select tid, start_date, end_date from timesheet where eid = %s and %s between start_date and end_date;"
        cursor.execute(query,(uid, day,))
        result = cursor.fetchone()
        return result

    def getTimesheetID(self,uid, day):
        cursor = self.conn.cursor()
        query = "select tid from timesheet where eid = %s and %s between start_date and end_date;"
        cursor.execute(query,(uid, day,))
        result = cursor.fetchone()
        return result

    def createTimesheet(self, startdate, enddate, uid):
        cursor = self.conn.cursor()
        query = "insert into timesheet(start_date,end_date, eid) values (%s, %s, %s) returning tid;"
        cursor.execute(query, (startdate,enddate,uid,))
        tid = cursor.fetchone()
        self.conn.commit()
        return tid