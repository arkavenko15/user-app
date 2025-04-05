A simple AngularJS (v1.x) single-page application (SPA) that allows users to be created, updated, deleted, and viewed. Includes custom form validation, local storage emulation, BEM CSS styling, and custom route guards with modals.

🚀 Features ✅ User List, View, Create, Edit

✅ Custom Form Validation (username, email, password, etc.)

✅ LocalStorage-based data emulation (no backend required)

✅ Custom Delete & Unsaved Changes Modals

✅ Client-side Routing (ngRoute)

✅ 403 & 404 fallback pages

✅ BEM-style CSS structure

✅ No frameworks used — pure HTML + CSS + AngularJS

🧠 Technologies AngularJS 1.7.9

HTML5

CSS3 (with BEM methodology)

JavaScript (ES5+)

ngRoute


⚙️ How to Run Install Live Server (Recommended)

Open the project folder in VS Code

Install the Live Server extension

Right-click index.html → Open with Live Server

OR just open index.html in any browser (Note: some routing features may not work due to CORS/file URL restrictions without a server)

👤 User Fields All fields are required:

Username (unique)

First Name

Last Name

Email (valid email address)

Password (min 8 characters, 1 letter + 1 number)

User Type (Admin or Driver)

💡 Custom Form Validation username: must be unique (checked manually via UserService)

password: validated via a custom directive (user-password-validator)

email: built-in email validation

Errors are shown in real-time and from "server" (emulated)

🧩 Custom Features 🛑 Unsaved Changes Guard: Warns with a custom modal if the user tries to navigate away from an edited form

🗑 Delete Confirmation: Custom modal for deleting users

🚫 403 / 404 Pages: Clean fallback views for unauthorized or missing pages