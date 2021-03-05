

class TasksDAO:
    def getWorkTasks(self, wid):
        tasks = []
        if wid == 0:
            tasks.append([0, "Cash Register", 2, "Slow Day",0])
            tasks.append([1, "Document Management", 6, "Slow Day", 0])
        if wid == 1:
            tasks.append([2, "Lab Work", 8, "Busy Day", 1])
        if wid == 2:
            tasks.append([3, "Document Management", 2, "Low Staff", 2])
            tasks.append([4, "Cash Register", 4, "Low Staff", 2])
            tasks.append([5, "Lab Work", 2, "Low Staff", 2])
        if wid == 3:
            tasks.append([6, "Training", 8, "New System Training", 3])
        if wid == 4:
            tasks.append([7, "Warehouse management", 8, "Sorted new shipment arrivals", 4])
        if wid == 5:
            tasks.append([8, "Document Management", 2, "Slow Day", 5])
            tasks.append([9, "Lab Work", 6, "Regular Day", 5])
        if wid == 6:
            tasks.append([10, "Clerical Work", 3, "Counted Daily Earnings", 6])
            tasks.append([11, "Cleaned Offices", 3, "Slow Day", 6])
            tasks.append([12, "Business Meeting", 2, "Slow Day", 6])
        if wid == 7:
            tasks.append([13, "Created promo materials", 4, "Assisted Marketing", 7])
            tasks.append([14, "Helped Create web app", 4, "Helped Engineering", 7])
        if wid == 8:
            tasks.append([15, "Trained new employees", 8, "Onboarding Day", 8])
        if wid == 9:
            tasks.append([16, "Document Management", 8, "Slow Day", 9])
        if wid == 10:
            tasks.append([17, "Cash Register", 3, "Regular Day", 10])
            tasks.append([18, "Lab Work", 5, "Regular Day", 10])
        if wid == 11:
            tasks.append([19, "Office Spring Party", 1, "Given free", 11])
            tasks.append([20, "Lab Work", 3, "Busy Day", 11])
            tasks.append([21, "Cash Register", 3, "Busy Day", 11])
            tasks.append([22, "Document Management", 1, "Busy Day", 11])
        return tasks