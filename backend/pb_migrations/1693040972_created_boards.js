/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w1zvz09hpomvzrj",
    "created": "2023-08-26 09:09:32.469Z",
    "updated": "2023-08-26 09:09:32.469Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wd18gkuy",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gowzxcqv",
        "name": "wallpaper",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id = ''",
    "viewRule": "@request.auth.id = ''",
    "createRule": "@request.auth.id = ''",
    "updateRule": "@request.auth.id = ''",
    "deleteRule": "@request.auth.id = ''",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w1zvz09hpomvzrj");

  return dao.deleteCollection(collection);
})
