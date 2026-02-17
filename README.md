# Influencer Hub
### AI-Powered Content Planning Platform for Social Media Creators

Influencer Hub is a cloud-based SaaS web application designed to help influencers and content creators plan, generate, and manage their social media content efficiently.  
The platform integrates Gemini AI for intelligent content generation, Firebase for backend services, Zustand for state management, and Vercel for scalable deployment.

---

## 📌 Problem Statement

Influencers often struggle to generate fresh content ideas, maintain consistent posting schedules, and effectively organize their content strategies. These challenges reduce engagement, productivity, and long-term growth.

---

## 💡 Solution

Influencer Hub provides an AI-driven dashboard that:

- Generates engaging captions and relevant hashtags
- Creates structured 7-day and 30-day content calendars
- Organizes content plans in a centralized dashboard
- Securely stores user data in the cloud
- Enables seamless authentication via Google Login

The platform reduces manual effort and ensures consistent, structured content planning.

---

## 🚀 Core Features

- AI-based Content Idea Generation
- Automated Caption & Hashtag Creation
- 30-Day Structured Content Calendar
- Cloud-based Storage (Firestore)
- Google Authentication (Firebase Auth)
- Global State Management (Zustand)
- Modern Responsive UI (Tailwind CSS)
- Secure Server-side AI API Routes
- CI/CD Deployment via Vercel

---

## 🏗 System Architecture

User (Browser)  
→ Next.js Frontend (Vercel Hosted)  
→ Firebase Authentication  
→ Firestore Database  
→ Gemini API (AI Processing)  
→ Dashboard Display  

---

## 🛠 Technology Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Zustand (Lightweight Global State Management)

### Backend (BaaS)
- Firebase Authentication
- Firestore Database

### AI Engine
- Gemini API

### Deployment
- Vercel (CI/CD with GitHub Integration)

---

## 📂 Project Structure

app/
├── analytics/
├── api/
│ ├── gemini/route.js
│ └── profile/route.js
├── components/
│ ├── gemini/
│ ├── Navbar.js
│ └── Footer.js
├── planner/page.js
├── login/page.js
├── signup/page.js
├── form/page.js
├── lib/firebase.js
├── layout.js
├── page.js
└── globals.css



The project follows a modular structure using the Next.js App Router for scalability and maintainability.

---

## 🔄 AI Workflow

1. User inputs niche, target audience, and posting goals.
2. Frontend sends request to a secure API route.
3. Gemini API processes and generates:
   - Content ideas
   - Captions
   - Hashtags
   - 30-day content schedule
4. Generated data is stored in Firestore.
5. Dashboard retrieves and displays the structured plan.

---

## ⚙️ Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/influencer-hub.git
cd content-planner


### 2. Clone Repository

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

GEMINI_API_KEY=

### 3. Run Development Server
npm run dev


---

## 🚀 Deployment

The application is deployed on **Vercel**, ensuring fast global delivery, automatic builds, and seamless CI/CD integration.

### Deployment Process

1. Push the latest code to the GitHub repository.
2. Import the repository into Vercel.
3. Configure required environment variables in the Vercel dashboard.
4. Trigger deployment.

Once configured, every push to the `main` branch automatically initiates a new production deployment.

---

## 📈 Future Enhancements

The platform can be further enhanced with the following features:

- Performance analytics dashboard for tracking content effectiveness
- Multi-platform content optimization (Instagram, YouTube, LinkedIn, etc.)
- AI-based trend analysis and recommendation engine
- Scheduled publishing integration for automated posting

---

