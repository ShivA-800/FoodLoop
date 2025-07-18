# 🥗 FoodLoop – Closing the Loop on Food Waste

**FoodLoop** is a lightweight web platform that connects food donors (like restaurants, events, or individuals) with nearby volunteers who can redistribute excess food to those in need. Built with React, Vite, and Tailwind CSS, it aims to minimize food waste and support communities through quick and simple coordination.

---

## 🚀 Elevator Pitch
A real-time food-sharing platform that enables anyone to donate surplus food and volunteers to claim and deliver it, helping reduce waste efficiently.

---

## 💡 Inspiration

In a world where millions go hungry and tons of food go to waste daily, we wanted to build a simple, decentralized system that empowers people to make a difference — without needing a large backend or complex logistics.

---

## 🛠️ What It Does

- Allows users to post excess food listings with location and expiration time
- Volunteers can discover nearby food posts via an interactive map
- Enables claiming and confirming food pickups
- Supports a multi-role experience: donor and volunteer
- No backend required — leverages browser localStorage for state

---

## 🔨 How We Built It

- **Frontend**: React (with TypeScript) + Vite
- **UI**: Tailwind CSS and Lucide Icons
- **State Management**: React Context API
- **Routing**: React Router
- **Other Tools**: React Dropzone, React Toast, localStorage
- **No backend**, fully client-side hosted

---

## 🚧 Challenges We Ran Into

- **State Synchronization**: Creating real-time updates across different user roles using only localStorage and React state.
- **Complex User Flows**: Designing a smooth flow from posting → claiming → confirming food while preserving data integrity.
- **Responsive Design**: Making the map interface mobile-friendly without losing functionality.
- **Performance Optimization**: Managing large food post lists with fast filtering and rendering.
- **User Experience**: Balancing simplicity with essential features for volunteers and donors.
- **Error Handling**: Robust checks for edge cases in the food claiming and timing process.

---

## 🏆 Accomplishments We're Proud Of

- Built a full-fledged, interactive app without a backend
- Seamless user experience for multiple roles
- Polished mobile-friendly UI
- Encouraged social impact through tech

---

## 📚 What We Learned

- Advanced React state management without external libraries
- How to structure scalable multi-role flows in frontend-only apps
- Handling complex logic in purely client-side environments
- UX decisions for social good platforms

---

## 🔮 What's Next for FoodLoop

- Backend integration with Firebase or Supabase for persistence
- Authentication and user profiles
- Push notifications for claimed/expired posts
- NGO integration and real-time dashboards
- Mobile app version using React Native or Expo

---

## 📦 Setup Instructions
### 🔁 Clone the Repository

```bash
git clone https://github.com/yourusername/foodloop.git
cd foodloop/project 
```

---
### Developed By
Shiva Kumar Radharapu
BTech Cybersecurity | MERN Developer | AI/ML Enthusiast

---
### Live Site
https://remarkable-kitsune-fea5d4.netlify.app/
