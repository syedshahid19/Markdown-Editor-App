# Real-Time Markdown Editor

## Overview
A real-time Markdown editor built using Node.js and React. This editor allows users to type Markdown syntax, convert it to HTML in real-time, and display the rendered HTML in a live preview pane.

## Features

### Markdown Editor Interface
- A text input area for writing Markdown.
- Built using React with Tailwind CSS for styling.

### Live Preview
- As users type Markdown, the converted HTML is displayed in real-time.

### Syntax Highlighting
- Implemented syntax highlighting for better readability.

### Backend Markdown Processing
- Uses WebSockets to convert Markdown to HTML and send it back to the client.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Socket.io-client
- **Backend:** Node.js, Express, Socket.io, Marked

## **Setting Up and Running the Application Locally**

### **1. Clone the Repository**
Open a terminal or command prompt and run the following command:
```bash
git clone https://github.com/syedshahid19/Markdown-Editor-App.git
```

### **2. Open the Project in VS Code**
- Open **VS Code** and click on **"Open Folder"** from the left panel.
- Navigate to the directory where the repository was cloned and select the folder.

### **3. Install Dependencies**
Install the necessary dependencies for both the frontend and backend using the terminal.

**Note:** Replace `C:\Users\User` with your actual system path.

- **Frontend:**
  ```bash
  cd C:\Users\User\Markdown-Editor-App\markdown-editor-frontend
  npm install
  ```
- **Backend:**
  ```bash
  cd C:\Users\User\Markdown-Editor-App\markdown-editor-frontend\Markdown-Editor-Backend
  npm install
  ```

### **4. Configure Environment Variables**
Create a `.env` file inside the **backend** folder (`Markdown-Editor-Backend`) and add the following configuration:
```env
PORT = 4000  # Specify the desired port
```

### **5. Update Localhost Configuration**
Modify the necessary files to replace the deployment link with `localhost` for local development.

- **Backend:**
  - In `index.js`, update the CORS policy by replacing the deployment link with:
    ```js
    http://localhost:3000
    ```
  - In `/websocket/index.js`, update the CORS policy by replacing the deployment link with:
    ```js
    http://localhost:3000
    ```

- **Frontend:**
  - In `/src/customHook/useWebsocket.js`, replace the deployment link with:
    ```js
    http://localhost:4000
    ```

### **6. Start the Application**
Execute the following command to launch the application:
```bash
npm start
```

## Usage
- Open the application in your browser.
- Type Markdown in the editor.
- See the real-time HTML preview on the right side.

