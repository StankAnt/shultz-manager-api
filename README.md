# Shultz API

---

## Purpose

This document provides a guildlines for Shultz API.

---

## API Reference

### Definition

| Route                 | HTTP Medthod | URL Params | Success Response | Error Response                                                                       | Description                   |
| --------------------- | ------------ | ---------- | ---------------- | ------------------------------------------------------------------------------------ | ----------------------------- |
| init/                 | POST         | n/a        | `CREATED: 201`   | `BAD_REQUEST: 400`                                                                   | Creates a new user            |
| signin/               | POST         | n/a        | `OK: 200`        | `UNAUTHORIZED: 401`                                                                  | Sign In                       |
| shultz/               | POST         | n/a        | `CREATED: 201`   | `BAD_REQUEST: 400`, `UNAUTHORIZED: 401`                                              | Takes a shultz                |
| shultz-list/          | POST         | n/a        | `OK: 200`        | `INTERNAL_SERVER_ERROR: 500`, `UNAUTHORIZED: 401`, `BAD_REQUEST: 400`                | Gives a shultz list           |
| shultz-list-bycenter/ | POST         | n/a        | `OK: 200`        | `INTERNAL_SERVER_ERROR: 500`, `UNAUTHORIZED: 401`, `BAD_REQUEST: 400`                | Gives a shultz list by center |
| comment-user/         | POST         | n/a        | `OK: 200`        | `INTERNAL_SERVER_ERROR: 500`, `UNAUTHORIZED: 401`, `BAD_REQUEST: 400`, `LOCKED: 423` | Takes a comment about user    |
| comment-list/         | POST         | n/a        | `OK: 200`        | `INTERNAL_SERVER_ERROR: 500`, `UNAUTHORIZED: 401`, `BAD_REQUEST: 400`                | Gives a user comment list     |
| shultz-types/         | GET          | n/a        | `OK: 200`        | `INTERNAL_SERVER_ERROR: 500`, `UNAUTHORIZED: 401`                                    | Gives a shultz types          |

---

### Detailed Information

* **Sign up**

  * _URL_: `/init/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      name: String,
      password: String, /*min lenght 8 symbols, at least one digit*/
      pushToken: String
    }
    ```
  * _Success Response_:
  * _Code_: `201`
  * _Content_: None

* _Error Response:_
* _Code:_ `400`
* _Content_: `Error Message`

---

* **Sign in**

  * _URL_: `/signin/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      name: String,
      password: String, /*min lenght 8 symbols, at least one digit*/
      pushToken: String /*optional attribute (updates your push token)*/
    }
    ```
  * _Success Response_:
    ```javascript
    {
      token: String;
    }
    ```
  * _Code_: `200`
  * _Content_: None

* _Error Response:_
* _Code:_ `401`
* _Content_: `Error Message`

---

* **Shultz**

  * _URL_: `/shultz/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:

    ```javascript
    /*if user shultzed once*/
    {
      power: Number,
      location: {
        latitude: Number,
        longitude: Number
      },
      message: String /*optional*/
    }

    /*if array of shultzes*/
    [
      {
        power: Number,
        location: {
          latitude: Number,
          longitude: Number
        },
        message: String /*optional*/
      },
      ...
    ]
    ```

  * _Header Params_:
    ```javascript
    {
      auth: String; /*token*/
    }
    ```
  * _Success Response_:
  * _Code_: `201`
  * _Content_: None
  * _Error Response:_
  * _Code:_ `400`
  * _Content_: `Error Message`
  * _Code:_ `401`
  * _Content_: `Unauthorized`

---

* **Shultz List**
  * _URL_: `/shultz-list/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      filter: {
        offset: Number,
        limit: Number
      }
    }
    ```
  * _Header Params_:
    ```javascript
    {
      auth: String; /*token*/
    }
    ```
  * _Success Response_:
  * _Code_: `200`
  * _Content_:
    ```javascript
    [
        {
            _id: String,
            user: String,
            power: Date,
            date: Date,
            location: {
                latitude: Number,
                longitude: Number
            },
            message: String /*optional*/
        },
        ...
    ]
    ```
  * _Error Response:_
  * _Code:_ `500`
  * _Content_: `Error Message`
  * _Code:_ `401`
  * _Content_: `Unauthorized`

---

* **Shultz List By Center and Radius**
  * _URL_: `/shultz-list-bycenter/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      filter: {
        center: {
          latitude: Number,
          longitude: Number
        },
        radius: Number /* KM */
      }
    }
    ```
  * _Header Params_:
    ```javascript
    {
      auth: String; /*token*/
    }
    ```
  * _Success Response_:
  * _Code_: `200`
  * _Content_:
    ```javascript
    [
        {
            _id: String,
            user: String,
            power: Date,
            date: Date,
            location: {
                latitude: Number,
                longitude: Number,
            },
            message: String /*optional*/
        },
        ...
    ]
    ```
  * _Error Response:_
  * _Code:_ `500`
  * _Content_: `Error Message`
  * _Code:_ `401`
  * _Content_: `Unauthorized`

---

* **Shultz Types**

  * _URL_: `/shultz-types/`
  * _Method_: `GET`
  * _URL Params_: None
  * _Header Params_:
    ```javascript
    {
      auth: String; /*token*/
    }
    ```
  * _Success Response_:
  * _Code_: `200`
  * _Content_:
    ```javascript
    [
        {
            power: Number,
            name: String
        },
        ...
    ]
    ```
  * _Error Response:_
  * _Code:_ `500`
  * _Content_: `Internal server error`
  * _Code:_ `401`
  * _Content_: `Unauthorized`

  ---

* **Comment User**

  * _URL_: `/comment-user/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:

    ```javascript
    {
      _userId: String,
      rate: Number,
      message: String /*optional*/
    }
    ```

  * _Header Params_:
    ```javascript
    {
      auth: String; /*token*/
    }
    ```
  * _Success Response_:
  * _Code_: `201`
  * _Content_: None
  * _Error Response:_
  * _Code:_ `400`
  * _Content_: `Bad request`
  * _Code:_ `401`
  * _Content_: `Unauthorized`
  * _Code:_ `423`
  * _Content_: `Locked`
  * _Code:_ `500`
  * _Content_: `Intenal server error`

---

* **User comments List**

  * _URL_: `/comment-list/`
  * _Method_: `POST`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      filter: {
        offset: Number,
        limit: Number,
        _userId: String
      }
    }
    ```
  * _Header Params_:
    ```javascript
    {
      auth: String; /*token*/
    }
    ```
  * _Success Response_:
  * _Code_: `200`
  * _Content_:
    ```javascript
    [
        {
          _id: String,
          sender: {
            name: String,
            _id: String,
          },
          rate: Number,
          message: String /*optional*/
        },
        ...
    ]
    ```
  * _Error Response:_
  * _Code:_ `500`
  * _Content_: `Intenal server error`
  * _Code:_ `401`
  * _Content_: `Unauthorized`
  * _Code:_ `400`
  * _Content_: `Bad request`

  ---
