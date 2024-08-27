# 📎 URL Shortener - By Lumiere Mondo

A simple and efficient URL shortener service built with Node.js, TypeScript, PostgreSQL, and Docker.

---

## 🛠️ Setup Guide

### 🐘 PostgreSQL Container Setup

The PostgreSQL database is containerized using Docker, ensuring easy setup and portability. This approach allows you to run the backend with minimal effort.

#### 🔄 To Start the Database:

1. **Start the Docker containers** by running:

   ```bash
   yarn docker:start:db
   ```

   This command will pull the necessary Docker images if they are not already available and start the required containers.

2. **Containers started**:
   - **PostgreSQL**: Accessible at port `5432`.
   - **Adminer**: A lightweight database management tool accessible at port `8080`. Use Adminer to view and manage your database tables.

   **Adminer Login Details**:
   - **Host**: `urlshortener-db`
   - **Username**: `urlshortener`
   - **Password**: `urlshortener`
   - **Database Name**: `urlshortener`

### 🗄️ PostgreSQL Database Setup

You need to manually create the `urls` table in PostgreSQL to store the shortened URLs.

Run the following SQL command to create the table:

```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url VARCHAR(255) NOT NULL,
  short_url VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> **Note:** Normally, Sequelize CLI would be used to initialize the database and create tables automatically. However, for this assessment, we're doing it manually.

### 🚀 Running the Service

Once the database is successfully set up:

- To run the service with **Nodemon** (watch mode), use:
  
  ```bash
  yarn dev
  ```

- To run the service in **normal mode** (without watching for changes), use:
  
  ```bash
  yarn start
  ```

The service will be available at port `5000`.

#### 🛑 Stopping the Service

After using the service, you can stop and remove all related Docker containers by running:

```bash
yarn docker:stop:db
```

## 📋 Usage

### 1. 📉 Shorten a URL

To shorten a new URL, make a `POST` request to:

```
POST http://localhost:5000/url
```

**Request Body:**

```json
{
  "url": "https://scholar.google.com/"
}
```

**Sample Response:**

```json
{
  "id": 3,
  "originalUrl": "https://www.youtube.com/",
  "shortUrl": "7JS350eh",
  "createdAt": "2024-08-26T17:54:44.436Z"
}
```

> If the URL has already been shortened, you will receive a response like:

```json
{
  "originalUrl": "https://scholar.google.com/",
  "shortUrl": "iOFoxfKE"
}
```

### 2. 🔍 Access a Shortened URL

To access the original URL from a shortened version, make a `GET` request to:

```
GET http://localhost:5000/url/{shortenedURL}
```

**Example**:

```
GET http://localhost:5000/url/iOFoxfKE
```

---

With this setup, you're ready to start shortening URLs quickly and efficiently!

---

### ✨ Additional Information

- **Environment Variables**: Ensure you have set up all necessary environment variables for database connections and server configuration.

```yml
# Backend
PORT=5000                 # The port on which your backend server will run
HOST=0.0.0.0              # The host for your server; 0.0.0.0 allows external access

# Database Configuration
DB_PORT=5432              # The port PostgreSQL is running on
DB_NAME=urlshortener      # The name of your PostgreSQL database
DB_HOST=urlshortener-db   # The hostname of your PostgreSQL service within Docker
DB_USERNAME=urlshortener  # The username for connecting to PostgreSQL
DB_PASSWORD=urlshortener  # The password for the PostgreSQL user
DB_DIALECT=postgres       # The dialect Sequelize should use (PostgreSQL in this case)

```
- **Error Handling**: The service includes basic error handling for invalid URLs and server issues.
- **Future Enhancements**: Potential improvements could include custom aliases, URL expiration, and analytics tracking for shortened URLs.

## Unit test 

To run unit tests execute `yarn test`

Feel free to contribute, raise issues, or suggest improvements. Happy URL shortening! 🚀