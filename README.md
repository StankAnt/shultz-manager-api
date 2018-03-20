# Shultz API

---

## Purpose

This document provides a guildlines for Shultz API.

---

## API Reference

### Definition

| Route        | HTTP Medthod | URL Params | Success Response | Error Response      | Description         |
| ------------ | ------------ | ---------- | ---------------- | ------------------- | ------------------- |
| init/        | POST         | n/a        | `CREATED: 201`   | `BAD_REQUEST: 400`  | Creates a new user  |
| shultz/      | POST         | n/a        | `CREATED: 201`   | `BAD_REQUEST: 400`  | Takes a shultz      |
| shultz-list/ | get          | n/a        | `OK: 200`        | `UNAUTHORIZED: 401` | Gives a shultz list |

---

### Detailed Information

* **Sign up**

  * _URL_: `/init/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      name: String;
    }
    ```
  * _Success Response_:
  * _Code_: `201`
  * _Content_:

```javascript
{
  _id: String;
  name: String;
}
```

* _Error Response:_
* _Code:_ `400`
* _Content_: `Error Message`

* **Shultz**

  * _URL_: `/shultz/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      userId: String;
    }
    ```
  * _Success Response_:
  * _Code_: `201`
  * _Content_: None
  * _Error Response:_
  * _Code:_ `400`
  * _Content_: `Error Message`

* **Shultz List**
  * _URL_: `/shultz-list/`
  * _Method_: `GET`
  * _URL Params_: None
  * _Success Response_:
  * _Code_: `200`
  * _Content_:
    ```javascript
    {
        [
            {
                _id: String;
                user: String;
            },
            ...
        ]
    }
    ```
  * _Error Response:_
  * _Code:_ `500`
  * _Content_: `Error Message`
