![Axenra Logo](https://raw.githubusercontent.com/PrashantJaybhaye/Axenra/main/public/raw1.png)

#

[![Next.js](https://img.shields.io/badge/Next.js-111827?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) 
[![React](https://img.shields.io/badge/React-0D1117?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) 
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) 
[![Inngest](https://img.shields.io/badge/Inngest-1F2937?style=for-the-badge&logo=inngest&logoColor=white)](https://www.inngest.com/) 
[![Clerk](https://img.shields.io/badge/Clerk-3B82F6?style=for-the-badge&logo=clerk&logoColor=white)](https://www.clerk.dev/) 
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) 
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)




## 📖 Overview

**Axenra** is a modern web application powered by **Next.js**, **React**, and **Tailwind CSS**. It delivers a seamless user experience with robust authentication, API integrations, and dynamic routing — all optimized for mobile and desktop devices.


## ✨ Key Features

* 🔐 **Authentication & Authorization** via Clerk
* 🧭 **Dynamic Routing** with Next.js App Router
* 🔄 **API Integration** using Inngest and Supabase
* 📱 **Responsive UI** built with Tailwind CSS
* 📡 **Custom Hooks & Utilities** for modular functionality

## 🛠️ Tech Stack

| Layer        | Tools & Libraries                   |
| ------------ | ----------------------------------- |
| **Frontend** | React, Next.js, Tailwind CSS        |
| **Backend**  | Node.js, Inngest, Supabase          |
| **Database** | Supabase                            |
| **Auth**     | Clerk                               |
| **APIs**     | Inngest Functions, Brave Search API |
| **Other**    | Axios for HTTP requests             |


## ⚙️ Getting Started

To run Axenra locally:

```bash
1. Clone the repository
git clone https://github.com/PrashantJaybhaye/Axenra.git

2. Navigate to project directory
cd Axenra

3. Install dependencies
npm install  # or yarn install

4. Start the development server
npm run dev  # or yarn dev
```


## 🧭 Usage

Once the development server is running, open your browser and go to:

```
http://localhost:3000
```

You can:

* Sign in/sign up via Clerk
* Explore the discovery feed
* Search content with Brave API
* Access your saved library

## 🛠 Configuration

Set up your environment variables as required. Refer to:

```bash
next.config.mjs
```

Make sure to include all API keys (Clerk, Supabase, Inngest, Brave API) in a `.env.local` file.

## 🧩 Project Structure

```
Directory structure:
└── prashantjaybhaye-axenra/
    ├── README.md
    ├── components.json
    ├── jsconfig.json
    ├── middleware.js
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── Provider.jsx
    │   ├── (auth)/
    │   │   ├── sign-in/
    │   │   │   └── [[...sign-in]]/
    │   │   │       └── page.jsx
    │   │   └── sign-up/
    │   │       └── [[...sign-up]]/
    │   │           └── page.jsx
    │   ├── (routes)/
    │   │   ├── discover/
    │   │   │   ├── page.jsx
    │   │   │   └── _components/
    │   │   │       └── NewsCard.jsx
    │   │   ├── library/
    │   │   │   └── page.jsx
    │   │   └── search/
    │   │       └── [libId]/
    │   │           ├── page.jsx
    │   │           └── _components/
    │   │               ├── AnswerDisplay.jsx
    │   │               ├── DisplayResult.jsx
    │   │               ├── DisplaySummary.jsx
    │   │               ├── Header.jsx
    │   │               ├── ImageListTab.jsx
    │   │               ├── SourceList.jsx
    │   │               └── SourceListTab.jsx
    │   ├── _components/
    │   │   ├── AppSidebar.jsx
    │   │   └── ChatBoxInput.jsx
    │   └── api/
    │       ├── brave-search-api/
    │       │   └── route.jsx
    │       ├── get-inngest-status/
    │       │   └── route.js
    │       ├── inngest/
    │       │   └── route.js
    │       └── llm-model/
    │           └── route.js
    ├── components/
    │   └── ui/
    │       ├── button.jsx
    │       ├── dropdown-menu.jsx
    │       ├── input.jsx
    │       ├── separator.jsx
    │       ├── sheet.jsx
    │       ├── sidebar.jsx
    │       ├── skeleton.jsx
    │       ├── tabs.jsx
    │       └── tooltip.jsx
    ├── context/
    │   └── UserDetailContext.jsx
    ├── hooks/
    │   └── use-mobile.js
    ├── inngest/
    │   ├── client.js
    │   └── functions.js
    ├── lib/
    │   └── utils.js
    ├── public/
    └── services/
        ├── Shared.jsx
        └── Supabase.jsx
        
```

## 🐾Project blueprint Structure
The project structure is as follows:
* `app`: Application code, including routes and components
* `components`: Reusable UI components
* `context`: Context API for state management
* `hooks`: Custom React hooks
* `inngest`: Inngest API integration
* `lib`: Utility functions and libraries
* `middleware`: Middleware functions for authentication and authorization
* `public`: Public assets, including images and fonts
* `services`: External services, including Supabase and Clerk


## 📜 License
This project is licensed under the [MIT License](./LICENSE).
