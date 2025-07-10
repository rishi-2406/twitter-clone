# 🐦 Twitter Clone (MERN Stack)

A full-featured Twitter-like social media app built with the **MERN** stack (MongoDB, Express, React, Node.js).  
Includes authentication, posting, following, notifications, and a beautiful UI with Tailwind CSS and DaisyUI.

**Live Demo:**  
[https://twitter-clone-u04k.onrender.com/](https://twitter-clone-u04k.onrender.com/)

---

## ✨ Features

- 🔐 **Authentication** (Sign up, Login, JWT-based sessions)
- 📝 **Post Tweets** (with optional images)
- ❤️ **Like, Comment, and Bookmark Posts**
- 🔁 **Repost (Retweet)**
- 👥 **Follow/Unfollow Users**
- 🛎️ **Notifications**
- 🏠 **Personalized Home Feed**
- 🔍 **Profile Pages**
- 🌙 **Modern UI** with Tailwind CSS & DaisyUI
- ⚡ **React Query** for fast, cached data fetching
- 🍞 **Toast Notifications** with react-hot-toast

---

## 🛠️ Tech Stack

### Frontend
- [React 19](https://react.dev/) (Vite)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-icons](https://react-icons.github.io/react-icons/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) for authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- [Cloudinary](https://cloudinary.com/) for image uploads
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [CORS](https://www.npmjs.com/package/cors)

---

## 📁 Project Structure

```
twitterclone/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/twitterclone.git
cd twitterclone
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # Or create your own .env file
npm run dev            # Starts backend with nodemon
```

**`.env` example:**
```
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📝 Scripts

### Backend

- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend with node

### Frontend

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## 📦 Deployment

- **Frontend:** Build with `npm run build` and deploy the `dist` folder.
- **Backend:** Deploy to any Node.js hosting (Render, Heroku, etc.).
- **Environment Variables:** Set your secrets in your deployment platform.

---

## 📚 API Endpoints

| Method | Endpoint                | Description           |
|--------|------------------------ |----------------------|
| POST   | `/api/auth/signup`      | Register a new user  |
| POST   | `/api/auth/login`       | Login                |
| POST   | `/api/auth/logout`      | Logout               |
| GET    | `/api/auth/me`          | Get current user     |
| GET    | `/api/user/profile/:username` | Get user profile |
| POST   | `/api/user/follow/:id`  | Follow/unfollow user |
| POST   | `/api/user/update/`     | Update profile       |
| POST   | `/api/posts/create`     | Create a post        |
| DELETE | `/api/posts/delete/:id` | Delete a post        |
| POST   | `/api/posts/like/:id`   | Like/unlike a post   |
| POST   | `/api/posts/comment/:id`| Comment on a post    |
| GET    | `/api/posts/all`        | Get all posts        |
| GET    | `/api/posts/following`  | Get posts from followed users |
| GET    | `/api/posts/user/:username` | Get posts by user |
| GET    | `/api/notification/`    | Get notifications    |
| DELETE | `/api/notification/`    | Delete notification  |

---

## 📌 Usage Notes

- **Backend cold starts:** The Render backend may take up to 30 seconds to wake up after inactivity.
- **MongoDB:** You need your own MongoDB URI for local development.
- **Image uploads:** Uses Cloudinary for storing images.
- **Rate limiting:** Not implemented, but recommended for production.

---

## 🤝 Contributing

PRs are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

---

**Happy Tweeting!**

---

> _Inspired by Twitter. This project is for educational purposes only._
