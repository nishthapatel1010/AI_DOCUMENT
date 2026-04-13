# FastAPI Backend Architecture

This project is built using FastAPI with a clean, scalable folder architecture specifically designed for clear separation of concerns, easy configuration management, and robust database support via PostgreSQL.

## 📂 Project Structure

```text
backend/
├── app/
│   ├── main.py                     # The main entrypoint describing the FastAPI app instance
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── health.py       # (File 1) Specific route definitions (e.g., /health)
│   │   │   │   └── users.py        # (File 1) Specific route definitions (e.g., /users)
│   │   │   └── router.py           # (File 2) Main router aggregating all `endpoints`
│   ├── core/
│   │   └── config.py               # Central environment variable loader using pydantic-settings
│   ├── db/
│   │   └── session.py              # PostgreSQL database connection and session management
│   ├── models/                     # SQLAlchemy Models mapping to DB tables
│   ├── schemas/                    # Pydantic schemas for request/response validation
│   ├── services/                   # Business logic and external service integrations
├── .env                            # Environment variables (Database URL, Keys, etc.)
├── requirements.txt                # Python dependencies
└── README.md                       # Project documentation
```

## 🧑‍💻 Design Philosophy

### Clean Routing (The "2-File" Pattern)
We use a modular routing pattern to keep `main.py` clean:
1. **Endpoint Files (e.g., `api/v1/endpoints/users.py`)**: Responsible ONLY for defining the endpoints (`@router.get`) and returning data.
2. **Main Router (e.g., `api/v1/router.py`)**: Acts as a central hub. It imports all individual endpoint files and includes them together under unified prefixes. 
*`main.py` simply imports this main router once.*

### Configuration Management
All environment variables are declared in the `.env` file and loaded reliably through `app/core/config.py` using `pydantic-settings`. This makes your environment variables easily accessible anywhere in the project simply by `from app.core.config import settings`.

### PostgreSQL Database
The app uses SQLAlchemy configured to connect seamlessly to a PostgreSQL database. The session is managed cleanly in `app/db/session.py`.

## 🚀 Setup & Installation

**1. Create and Activate Virtual Environment**
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# venv\Scripts\activate   # On Windows
```

**2. Install Dependencies**
```bash
pip install -r requirements.txt
```

**3. Set up `.env` File**
Make sure `.env` is properly populated with your PostgreSQL `DATABASE_URL`. Example:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fastapi_db"
```

**4. Run Development Server**
```bash
uvicorn app.main:app --reload
```

## 📖 API Documentation (Swagger UI)
FastAPI automatically generates interactive API documentation.
Once you start the server, open your browser and navigate to:
**[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**
