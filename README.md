# URL Shortener

### what is url shortener?
> Web app that produce a short url for any long url.

---

## Tool Used

| Particular           | Version |
| -------------------- | ------- |
| express              | 4.17.1  |
| mongoose             | 5.9.25  |
| bcrypt               | 5.0.0   |
| config               | 3.3.3   |
| jsonwebtoken         | 8.5.1   |
| moment               | 2.29.1  |
| redis                | 3.0.2   |

---

## How to start App

> Install dependencies to start the project.

```
npm install
```

> Start project by using command below

```
npm start
```

# REST API

The REST API to the example app is described below.

## Register user

### Request

`POST /api/users/register`

```
{
     "name": "mahdi",
     "email": "example@mail.com"
     "password": "xxxxx"
 }
```

## Login user

### Request

`POST /api/users/login`

```
{
     "email": "example@mail.com"
     "password": "xxxxx"
}
```

## Shortend url

### Request

`POST /api/urls/shorten`

```
{
     "longUrl": "http://www.example.com" 
}
```

## Redirect to long url

### Request

`GET /redirection/:shortUrl`

## Get report of views

### Request

`GET /api/report/:time/:shortUrl`

time can choose from {today, lastDay, lastWeek, lastMonth}
