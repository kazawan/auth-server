# 自用学习服务器

## 注册的

body

```json
{
  "email": "123@abc.com",
  "username": "kazwan",
  "password": "123"
}
```

## 登陆的

body

```json
{
    "email":"123@abc.com",
    "password":"123"
}
```
返回
```json
{
    "code": 200,
    "message": "login success",
    "accessToken",
    "accessTokenExp": 1000 * 60 * 60,
    "refreshToken",
    "refreshTokenExp": 1000 * 60 * 60 * 24 * 7,`
}
```


## refreshToken
body
```json
{
    "refreshToken":"....."
}
```

返回

```json
{
    code: 200,
    message: "refresh token success",
    accessToken,
    accessTokenExp: 1000 * 60 * 60,
}
```






