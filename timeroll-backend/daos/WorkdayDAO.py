

class WorkdayDAO:
    def getWorkDays(self, tid, startdate, enddate):

        #very very hardcoded values for testing handler and main functionality
        #In final functionality, database output will be determined by identifying those workday periods that have the proper time sheet ID and are between the specified dates
        monday = [0, "03/01/2021", "false", 0]
        tuesday = [1, "03/02/2021", "false", 0]
        wednesday = [2, "03/03/2021", "false", 0]
        thursday = [3, "03/04/2021", "false", 0]
        friday = [4, "03/05/2021", "false", 0]
        saturday = [5, "03/06/2021", "false", 0]

        result = [monday,tuesday,wednesday,thursday,friday,saturday]

        return result


