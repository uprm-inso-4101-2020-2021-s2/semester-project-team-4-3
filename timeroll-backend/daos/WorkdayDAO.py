import psycopg2
import config.dbconfig

class WorkdayDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s host = '%s' password=%s port = %s" % (
            config.dbconfig.database_config['dbname'],
            config.dbconfig.database_config['user'],
            config.dbconfig.database_config['host'],
            config.dbconfig.database_config['passwd'],
            config.dbconfig.database_config['port'])
        self.conn = psycopg2.connect(connection_url)



    def getWorkDays(self, tid, startdate, enddate):
        cursor = self.conn.cursor()
        query = "select wid, wdate, vacation, tid from workday where tid = %s and wdate between %s and %s order by wdate;"
        cursor.execute(query, (tid, startdate, enddate))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def createWorkday(self, date, vacation, tid):
        cursor = self.conn.cursor()
        query = "insert into workday(wdate, vacation, tid) values (%s, %s, %s) returning wid;"
        cursor.execute(query, (date, vacation, tid,))
        wid = cursor.fetchone()
        self.conn.commit()
        return wid


