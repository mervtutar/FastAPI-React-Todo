# 📝 FastAPI + React Todo App (Dockerized)

A simple, full-stack Todo application with:
- ⚡ **Backend:** FastAPI (Python)
- 💻 **Frontend:** React (JavaScript)
- 🐳 **Easy development & deployment using Docker Compose**

<img src="https://github.com/user-attachments/assets/33f01ccd-acdf-41a3-a806-dd6f04319c66" width="400"/>

---

## ✨ Features

- ➕ Add, ✏️ update, 🗑️ delete, and 📃 list todos
- 📦 Minimal and clear full-stack example
- 🛠️ Docker Compose for seamless setup of both backend and frontend
- 💾 Uses SQLite for quick development (easy to swap for another DB)

---

## ▶️ How to Run

Follow these steps to run the project locally using Docker:

1. **Clone the Repository** 🌀

    ```bash
    git clone https://github.com/mervtutar/FastAPI-React-Todo.git
    cd FastAPI-React-Todo
    ```

2. **Build and Start the Application** 🔨

    ```bash
    docker-compose up --build
    ```

    - 🛠️ This command will build both the backend (FastAPI) and frontend (React) Docker images and start them as containers.
    - ⏳ The first build may take a few minutes.

3. **Access the Application** 🌐

    - **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser to see the React Todo app.
    - **Backend:**  
      - Open [http://localhost:8000/docs](http://localhost:8000/docs) for FastAPI interactive API documentation (Swagger UI).
      - API root: [http://localhost:8000](http://localhost:8000)

4. **Stop the Application** 🛑

    - Press `CTRL + C` in the terminal running Docker Compose.
    - Or, in a separate terminal, run:
      ```bash
      docker-compose down
      ```
    - This will stop and remove the running containers.

---

## 🛠️ Manual Run (Without Docker)

If you want to run the backend or frontend manually (without Docker):
Backend (FastAPI):
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend (React):**
```bash
cd frontend/todo-app
npm install
npm start
```


