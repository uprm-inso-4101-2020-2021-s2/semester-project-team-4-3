import psycopg2
import config.dbconfig

class PaystubDAO:

    # def __init__(self):             #Initiate database connection
    #     connection_url = "dbname=%s user=%s host = '%s' password=%s port = %s" % (
    #         config.dbconfig.database_config['dbname'],
    #         config.dbconfig.database_config['user'],
    #         config.dbconfig.database_config['host'],
    #         config.dbconfig.database_config['passwd'],
    #         config.dbconfig.database_config['port'])
    #     self.conn = psycopg2.connect(connection_url)

    def __init__(self, db):
        self.db = db

    def create_paystub(self, start_date, end_date, net_pay, gross_pay,
                                 total_deductions, total_benefits, total_hours, user):
        cursor = self.db.cursor()
        query = ''
        cursor.execute(query, (start_date, end_date, net_pay, gross_pay,
                                 total_deductions, total_benefits, total_hours, user))

        id = cursor.fetchone()[0]

        self.db.commit()

        return id

