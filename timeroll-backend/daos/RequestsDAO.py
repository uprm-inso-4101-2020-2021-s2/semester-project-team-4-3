import psycopg2
import config.dbconfig


class RequestsDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s host = 'localhost' password=%s" % (
            config.dbconfig.database_config['dbname'],
            config.dbconfig.database_config['user'],
            config.dbconfig.database_config['passwd'])
        self.conn = psycopg2.connect(connection_url)

    def getRequest(self, rid, day):
        cursor = self.conn.cursor()
        query = "select rid, start_date, end_date from request where eid = %s and %s between start_date and end_date;"
        cursor.execute(query, (rid, day,))
        result = cursor.fetchone()
        return result

    def getRequestID(self, rid, day):
        cursor = self.conn.cursor()
        query = "select rid from request where eid = %s and %s between start_date and end_date;"
        cursor.execute(query, (rid, day,))
        result = cursor.fetchone()
        return result

    def createRequest(self, startdate, enddate, uid):
        cursor = self.conn.cursor()
        query = "insert into request(start_date,end_date, eid) values (%s, %s, %s) returning rid;"
        cursor.execute(query, (startdate, enddate, uid,))
        rid = cursor.fetchone()
        self.conn.commit()
        return rid
