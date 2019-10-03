[<<< Back to README file](../README.md)
## API Docs

### Table of Contents

- [Times](#times)
	- [All customers](#all-customers)

## Times

### All customers

Получение данных о всех сотрудниках за последнюю неделю:
```bash
curl http://192.168.19.113:3000/api/v1/times
```
Может принимать параметры:
- `startDate` <[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)>
- `endDate` <[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)>

Например:
```bash
curl http://192.168.19.113:3000/api/v1/times?startDate=2019-09-30&endDate=2019-10-04
```
Ответ предоставляется в формате **JSON**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```
```json
{
	"data": {
		"dates": [
			"2019-09-30",
			"2019-10-01",
			"2019-10-02",
			"2019-10-03",
			"2019-10-04"
		],
		"users": [
			...
			{
				"consumerNO": 40,
				"consumerName": "Чередниченко Сергей",
				"groupName": "Офис",
				"2019-09-30": {
					"startTime": "2019-09-30T09:31:12.000Z",
					"endTime": "2019-09-30T14:22:57.000Z",
					"deltaTime": "4:51:45"
				},
				"2019-10-01": {
					"startTime": "2019-10-01T09:40:02.000Z",
					"endTime": "2019-10-01T15:31:51.000Z",
					"deltaTime": "5:51:49"
				},
				"2019-10-02": {},
				"2019-10-03": {
					"startTime": "2019-10-03T09:00:00.000Z",
					"endTime": "2019-10-03T18:00:00.000Z",
					"deltaTime": "9:0:0"
				},
				"2019-10-04": {}
			},
			...
		]
	},
	"errors": null,
	"success": true
}
```

Если в параметрах запроса переданы некорректные данные:
```
HTTP/1.1 400 Bad Request
Content-Type: application/json; charset=utf-8
```
```json
{
	"data": null,
	"errors": [
		{
			"startDate": "startDate must be before or the same to the endDate"
		}
	],
	"success": false
}
```

При верных параметрах запроса может возникнуть внутренняя ошибка сервера, вызывающая исключение:
```
HTTP/1.1 204 No Content
Content-Type: application/json; charset=utf-8
```

[<<< Back to README file](../README.md)