# GET /api/users to list user fixtures

# `user1` should be used for the app, but others are also available for testing

```bash
$ curl --silent -H "X-Api-Key: API_KEY" https://plx-hiring-api.fly.dev/api/users | jq
{
  "data": [
    {
      "id": "160582fd-6943-465d-9c0e-3c137b82c345",
      "name": "User One",
      "email": "user1@example.com"
    },
    {
      "id": "c431b13c-e021-40f2-8517-65d9fae463b8",
      "name": "User Two",
      "email": "user2@example.com"
    },
    {
      "id": "98e3cf2b-ad84-466f-950d-aa878acaa185",
      "name": "User Three",
      "email": "user3@example.com"
    }
  ]
}
```

# POST /api/quotes to create a quote

# quotes are valid for 5 minutes

```bash
$ curl -X POST --silent -H "X-Api-Key: API_KEY" https://plx-hiring-api.fly.dev/api/quotes | jq
{
  "data": {
    "id": "b09f3fe7-5bd4-4ede-923a-0808125663e0",
    "created_at": "2023-12-27T22:49:13",
    "rate": "54.42",
    "from_currency": "usd",
    "to_currency": "php"
  }
}
```

# POST /api/orders to create an order tied to a quote

# The below "converts" 1 USD to 54.42 PHP

```bash
$ curl --silent -H "X-Api-Key: API_KEY" -H "Content-Type: application/json" --request POST --data '{"quote_id":"81755132-c7fd-44bf-9f62-5da802d15198","user_id":"160582fd-6943-465d-9c0e-3c137b82c345","from_amount":"1"}' https://plx-hiring-api.fly.dev/api/orders | jq
{
  "data": {
    "id": "beb330de-013a-4c42-b93a-20d984851057",
    "status": "pending",
    "quote_id": "81755132-c7fd-44bf-9f62-5da802d15198",
    "user_id": "160582fd-6943-465d-9c0e-3c137b82c345",
    "from_amount": "1"
  }
}
```

# Orders usually resolve within 5 - 10 seconds. Orders can either be "completed" or "failed"

# GET /api/users/USER_ID/orders to list all orders for a user

```bash
$ curl --silent -H "X-Api-Key: API_KEY" https://plx-hiring-api.fly.dev/api/users/160582fd-6943-465d-9c0e-3c137b82c345/orders | jq
{
  "data": [
    {
      "id": "e89ec679-77d9-455d-ac2b-d0cc3403a859",
      "status": "completed",
      "quote_id": "b09f3fe7-5bd4-4ede-923a-0808125663e0",
      "user_id": "160582fd-6943-465d-9c0e-3c137b82c345",
      "from_amount": "1"
    },
    {
      "id": "beb330de-013a-4c42-b93a-20d984851057",
      "status": "failed",
      "quote_id": "81755132-c7fd-44bf-9f62-5da802d15198",
      "user_id": "160582fd-6943-465d-9c0e-3c137b82c345",
      "from_amount": "1"
    }
  ]
}
```

# GET /api/orders/ORDER_ID to fetch a specific order

```bash
$ curl --silent -H "X-Api-Key: API_KEY" https://plx-hiring-api.fly.dev/api/orders/e89ec679-77d9-455d-ac2b-d0cc3403a859 | jq
{
  "data": {
    "id": "e89ec679-77d9-455d-ac2b-d0cc3403a859",
    "status": "completed",
    "quote_id": "b09f3fe7-5bd4-4ede-923a-0808125663e0",
    "user_id": "160582fd-6943-465d-9c0e-3c137b82c345",
    "from_amount": "1"
  }
}
```
