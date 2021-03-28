import psycopg2
import config.dbconfig


class TasksDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s host = '%s' password=%s port = %s"  % (
            config.dbconfig.database_config['dbname'],
            config.dbconfig.database_config['user'],
            config.dbconfig.database_config['host'],
            config.dbconfig.database_config['passwd'],
            config.dbconfig.database_config['port'])
        self.conn = psycopg2.connect(connection_url)

    def getWorkTasks(self, wid):
        cursor = self.conn.cursor()
        query = "select wtid, work_type, hours_worked from worktasks where wid = %s;"
        cursor.execute(query, (wid,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def createWorkTask(self,work_type, hours_worked, wid):
        cursor = self.conn.cursor()
        query = "insert into worktasks(work_type, hours_worked, wid) values(%s, %s, %s) returning wtid;"
        cursor.execute(query, (work_type,hours_worked,wid))
        wtid = cursor.fetchone()
        self.conn.commit()
        return wtid