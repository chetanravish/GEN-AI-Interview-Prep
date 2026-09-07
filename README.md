# AI Resume Builder 🚀

An AI-powered MERN application that helps users discover career ideas based on their target job domain and generate ATS-friendly resumes using the Gemini API.

> ⚠️ This project is currently under active development. New features are being added daily.

## ✨ Vision

Finding the right career path and creating a resume shouldn't be difficult.

This project aims to:

- Get AI-generated career/domain ideas based on a user's job interest.
- Generate professional ATS-friendly resumes.
- Provide a clean and responsive user experience.
- Secure user data with authentication.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt

**AI**
- Google Gemini API

## 🚧 Current Progress

| Feature | Status |
|----------|--------|
| User Authentication | ✅ Completed |
| Login / Register | ✅ Completed |
| JWT Protected Routes | ✅ Completed |
| MongoDB Integration | ✅ Completed |
| Responsive Auth UI | ✅ Completed |
| Gemini API Integration | 🟡 In Progress |
| Career Idea Generator | ⏳ Planned |
| ATS Resume Generator | ⏳ Planned |
| Resume PDF Export | ⏳ Planned |

## 📁 Project Structure

```text
client/
 ├── src/
 ├── components/
 ├── pages/
 └── ...

server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 └── ...
```

## ⚙️ Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Run the project

```bash
# Server
npm run dev

# Client
npm run dev
```

## 🎯 Roadmap

- [x] JWT Authentication
- [x] Protected Dashboard
- [ ] Gemini Career Suggestions
- [ ] AI ATS Resume Generation
- [ ] Resume Editing
- [ ] PDF Download
- [ ] Resume History
- [ ] Deployment

## 🤝 Contributing

The project is still in its early development stage. Contributions, suggestions, and feedback are always welcome.

## 📌 Status

**Building in public** — actively improving the project and pushing updates regularly.