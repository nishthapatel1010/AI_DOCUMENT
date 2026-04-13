from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.router import api_router
from app.db.session import engine, Base
from app.models import document # Needed so Base knows about the models

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Create database tables (For Demo Purposes)
Base.metadata.create_all(bind=engine)

# Include main router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME} API!",
        "docs": "/docs"
    }
