# track-mate-backend
Back-end running node.js with express in track-mate

## [Please check the front-end too](https://github.com/eyadkobatte/track-mate-frontend)

### Routes - Room

### 1. Get all rooms

`GET /`

### 2. get rooms based on uid (Rooms a user can access)

`GET /u/:uid`

### 3. get rooms based on room id

`GET /r/:roomId`

### 4. Create new room

`POST /`

### 5. Add Permission in room

` PUT /:roomId`
```json
{
  "operation": "ADD",
  "...": "..."
}
```

### 6. Remove permission in room

`PUT /:roomId`
```json
{
  "operation": "REMOVE",
  "_id": "permissionId"
}
```

### 7. delete room

`DELETE /:roomId`

### 8. add note in room

`PUT /:roomId/note`
```json
{
  "operation": "ADD",
  "...": "..."
}
```

### 9. delete note in a room

`PUT /:roomId/note`
  ```json
{
  "operation": "REMOVE",
  "_id": "permissionId"
}
```

### 10. Add list in a room

`PUT /:roomId/list`
```json
{
  "operation": "ADD",
  "...": "..."
}
```

### 11. delete list in a room

`PUT /:roomId/list`
```json
{
  "opeartion": "REMOVE",
  "_id": "listId"
}
```

### 12. Add Item in list in room

`PUT /:roomId/list/:listId/item`
```json
{
  "operation": "ADD",
  "...": "..."
}
```

### 13. delete item in list in room

`PUT /:roomId/list/:listId/item`
```json
{
  "opeartion": "REMOVE",
  "_id": "itemId"
}
```

### 14. Add transaction in wallet enabled list
`PUT /:roomId/list/:listId/item/transaction`

