const taskData = JSON.parse(
    `[{
    "id": 0,
    "key": 0,
    "Monday":{
      "date":"2020-02-01",
      "vacation":"false",
      "wid":1,
      "tasks":[{
        "end_time": "16:00",
        "note":"",
        "start_time":"8:00",
        "worktype":"SECRT"
        },
        {
          "end_time": "17:00",
          "note":"",
          "start_time":"20:00",
          "worktype":"LAB"
        }
      ]
    },
    "Tuesday":{
      "date":"2020-02-02",
      "vacation":"false",
      "wid":1,
      "tasks":[{
        "end_time": "7:00",
        "note":"",
        "start_time":"12:00",
        "worktype":"LAB"
        },
        {
          "end_time": "13:00",
          "note":"",
          "start_time":"14:00",
          "worktype":"TEST"
        }
      ]
    },
    "Wednesday":{
      "date":"2020-02-03",
      "vacation":"false",
      "wid":1,
      "tasks":[{
        "end_time": "7:00",
        "note":"",
        "start_time":"12:00",
        "worktype":"LAB"
        },
        {
          "end_time": "13:00",
          "note":"",
          "start_time":"14:00",
          "worktype":"TEST"
        }
      ]
    },
    "Thursday":{
      "date":"2020-02-04",
      "vacation":"false",
      "wid":1,
      "tasks":[{
        "end_time": "7:00",
        "note":"",
        "start_time":"12:00",
        "worktype":"LAB"
        },
        {
          "end_time": "13:00",
          "note":"",
          "start_time":"14:00",
          "worktype":"TEST"
        }
      ]
    },
    "Friday":{
      "date":"2020-02-05",
      "vacation":"false",
      "wid":1,
      "tasks":[{
        "end_time": "7:00",
        "note":"",
        "start_time":"12:00",
        "worktype":"LAB"
        },
        {
          "end_time": "13:00",
          "note":"",
          "start_time":"14:00",
          "worktype":"TEST"
        }
      ]
    },
    "Saturday":{
      "date":"2020-02-06",
      "vacation":"false",
      "wid":1,
      "tasks":[{
        "end_time": "7:00",
        "note":"",
        "start_time":"12:00",
        "worktype":"LAB"
        },
        {
          "end_time": "13:00",
          "note":"",
          "start_time":"14:00",
          "worktype":"TEST"
        }
      ]
    }
  }]`,
);

const taskData2 = JSON.parse(
    `[{
    "Task": "LAB",
    "Monday": {
      "end_time": "17:00",
      "note":"",
      "start_time":"20:00",
      "date":"2020-02-01"
    },
    "Tuesday": {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-02"
      },
    "Wednesday": {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-03"
      },
    "Thursday" : {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-04"
      },
    "Friday" : {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-05"
      },
    "Saturday": {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-05"
      }},
      {
    "Task": "LAB",
    "Monday": {
      "end_time": "17:00",
      "note":"",
      "start_time":"20:00",
      "date":"2020-02-01"
    },
    "Tuesday": {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-02"
      },
    "Wednesday": {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-03"
      },
    "Thursday" : {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-04"
      },
    "Friday" : {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-05"
      },
    "Saturday": {
      "end_time": "7:00",
      "note":"",
      "start_time":"12:00",
      "date":"2020-02-05"
      }}]`,
);

const taskData3 = JSON.parse(
    `[{
      "id": 0,
      "key": 0,
    "Task": "LAB",
    "Monday": "8",
    "Tuesday": "8",
    "Wednesday":"5",
    "Thursday" : "6",
    "Friday" : "5",
    "Saturday": "4" 
    },
    {
      "id": 1,
      "key": 1,
    "Task": "SECRT",
    "Monday": "5",
    "Tuesday": "6",
    "Wednesday": "3",
    "Thursday" : "3",
    "Friday" : "2",
    "Saturday": "1"}
  ]`,
);

const sortOption = {};
class fakeData {
    constructor(size) {
        this.size = size || 10;
        this.datas = [];
        this.sortKey = null;
        this.sortDir = null;
    }
    dataModel(index) {
        return taskData2[index];
    }
    getExtendedTaskData() {
        return taskData2;
    }

    getObjectAt(index) {
        if (index < 0 || index > this.size) {
            return undefined;
        }
        if (this.datas[index] === undefined) {
            this.datas[index] = this.dataModel(index);
        }
        console.log(this.datas[index]);
        return this.datas[index];
    }
    getAll() {
        if (this.datas.length < this.size) {
            for (let i = 0; i < this.size; i++) {
                this.getObjectAt(i);
            }
        }
        //console.log(taskData2)
        return this.datas.slice();
    }

    getSize() {
        return this.size;
    }



}
export default fakeData;