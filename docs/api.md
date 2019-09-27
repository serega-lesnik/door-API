[<<< Back to README file](../README.md)
## API Docs

### Table of Contents

- [Times](#times)
	- [All customers](#all-customers)

## Times

### All customers

Получение данных о всех сотрудниках за последнюю неделю:
```
http://192.168.19.113:3000/api/v1/times
```
Может принимать параметры:
```
startDate
endDate
```
Например:
```
http://192.168.19.113:3000/api/v1/times?startDate=2019-09-02&endDate=2019-09-15
```
Ответ предоставляется в формате **JSON**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```
```json
{
	"data": [
		...
		{
			"consumerNO": 40,
			"consumerName": "Чередниченко Сергей",
			"groupName": "Офис",
			"date": "2019-09-02",
			"startTime": "2019-09-02T07:02:56.000Z",
			"endTime": "2019-09-02T08:33:32.000Z",
            "deltaTime": "1:30:36"
		},
		...
	],
	"response": "OK"
}
```

[<<< Back to README file](../README.md)