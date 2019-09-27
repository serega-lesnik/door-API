# DoorAPI

---
Этот проект представляет собой сервер ***node.js*** для предоставления доступа к данным об отметках времени на дверных замках киевского офиса *Larch Networks*.

---
## Links:
- [API Docs](docs/api.md)
---

## Getting started

### Installation:
```
npm install
```

### Started

Set are environment variables in the `.env` file in the root directory of project

To start the application, run:

```bash
npm start -p 3001
```

Optional parameters:
- `-p` <[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)> port number. **Default**: `3000`.

The server is running on `http://localhost:3001`.

## Environment variables

- `PATH_TO_DB_FILE` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> Path to MS Access database file. *Example:* **`d:\iCCard\iCCard.mdb`**


