# Shultz API

---

## Purpose

This document provides a guildlines for Shultz API.

---

## API Reference

### Definition

| Route        | HTTP Medthod | URL Params | Success Response | Error Response                                    | Description         |
| ------------ | ------------ | ---------- | ---------------- | ------------------------------------------------- | ------------------- |
| init/        | POST         | n/a        | `CREATED: 201`   | `BAD_REQUEST: 400`                                | Creates a new user  |
| signin/      | POST         | n/a        | `OK: 200`        | `UNAUTHORIZED: 401`                               | Sign In             |
| shultz/      | POST         | n/a        | `CREATED: 201`   | `BAD_REQUEST: 400`, `UNAUTHORIZED: 401`           | Takes a shultz      |
| shultz-list/ | GET          | n/a        | `OK: 200`        | `INTERNAL_SERVER_ERROR: 500`, `UNAUTHORIZED: 401` | Gives a shultz list |

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
      password: String; /*min lenght 8 symbols, at least one digit*/
      pushToken: String;
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
      name: String;
      password: String; /*min lenght 8 symbols, at least one digit*/
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
    {
      power: Number;
      location: {
        latitude: Number;
        longiude: Number;
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
  * _Method_: `GET`
  * _URL Params_: None
  * _Data Params_:
    ```javascript
    {
      filter: {
        offset: Number;
        limit: Number;
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
    {
        [
            {
                _id: String;
                user: String;
                power: Date;
                date: Date;
                location: {
                    latitude: Number;
                    longiude: Number;
                }
            },
            ...
        ]
    }
    ```
  * _Error Response:_
  * _Code:_ `500`
  * _Content_: `Error Message`
  * _Code:_ `401`
  * _Content_: `Unauthorized`

---
