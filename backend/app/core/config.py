from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    # App config
    PROJECT_NAME: str
    API_V1_STR: str
    PORT: int
    DATABASE_URL: str

    # File Upload Config
    ALLOWED_FILE_TYPES: List[str]
    MAX_FILE_SIZE_MB: int
    UPLOAD_DIR: str

    # Storage Config
    STORAGE_TYPE: str  # e.g., "local", "s3"
    

    model_config = SettingsConfigDict(
        env_file=".env", 
        case_sensitive=True, 
        extra="ignore"
    )

settings = Settings()
