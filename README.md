# Quiz-Whiz-App

## What is Quiz Whiz?

Quiz Whiz is a competitive multiplayer trivia game written in Typescript where players play up to 7 other players in various trivia categories.

## Technologies Used
Node

React

Express

PostgreSQL

Typescript

WebSocket

Axios

## Getting Started

### Configure Database
Create an Elephant SQL database with the following command
```js
CREATE TABLE "users" (
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"rating" integer NOT NULL DEFAULT '1000',
	CONSTRAINT "users_pk" PRIMARY KEY ("username")
) WITH (
  OIDS=FALSE
);
```

### Set Database and IP address

In the **root directory**, create a .env file with the property of DB_URL and the corresponding Elephant SQL URL:
```js
DB_URL=postgres://example:example.db.elephantsql.com:PORT/example
```

Additionally in /client/context/GlobalContext, set the state of IP to be the IP address of the hosting server:

```js
  const [rating, setRating] = useState<number>(1);
  const [username, setUsername] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  // INSERT IP ADDRESS HERE             ↓
  const [IP, setIP] = useState<string>('');
```
