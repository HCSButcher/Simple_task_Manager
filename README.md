# 🌐 Universal API Viewer (React + Axios + Vite)

A simple but powerful React application that lets you **fetch, search, and paginate** data from _any public API_.  
It automatically adapts to different API response structures — meaning you can switch API URLs freely, and it will still display cleanly!

live url =

## Screenshot

![alt text](<screenshot 1.png>)
![alt text](<screenshot 2.png>)

## 🚀 Features

✅ Fetch data from any public REST API  
✅ Universal search across all fields (deep text search)  
✅ Responsive pagination  
✅ Dark mode compatible  
✅ Error handling & loading states  
✅ Automatic reset when changing search queries  
✅ Works with complex objects (not just title/body)

---

## 🧱 Project Structure

📁 assignment/
├── 📁 src/
│ ├── components/
│ │ ├── ApiList.jsx
│ │ └── Button.jsx
│ ├── context/
│ ├── index.css
│ └── main.jsx
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/universal-api-viewer.git
cd universal-api-viewer
2️⃣ Install dependencies
Make sure you have Node.js ≥ 16 and npm or yarn installed.

bash
Copy code
npm install
If you see an error about missing autoprefixer, run:

bash
Copy code
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
3️⃣ Run the development server
bash
Copy code
npm run dev
Then open your browser at:
👉 http://localhost:5173

🧩 How to Change API Sources
Inside src/components/ApiList.jsx, locate this line:

js
Copy code
axios.get("https://api.sampleapis.com/futurama/episodes")
You can replace it with any open API, such as:

API Name	URL
JSONPlaceholder (posts)	https://jsonplaceholder.typicode.com/posts
Sample APIs (Coffee)	https://api.sampleapis.com/coffee/hot
Rick and Morty	https://rickandmortyapi.com/api/character
Futurama Episodes	https://api.sampleapis.com/futurama/episodes

Your app will automatically re-render, display, and search through that API’s data.

```
