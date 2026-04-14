import shutil
import uuid
from pathlib import Path
from fastapi import UploadFile
from app.core.config import settings


class LocalStorageService:
    def __init__(self):
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.upload_dir.mkdir(parents=True, exist_ok=True)

    def save_file(self, file: UploadFile) -> tuple[str, int]:
        """
        Saves a file to the local filesystem.
        Returns the file path and size in KB.
        """

        #  Ensure directory exists
        self.upload_dir.mkdir(parents=True, exist_ok=True)

        #  Extract extension safely
        ext = file.filename.split(".")[-1] if "." in file.filename else ""

        # Generate unique filename
        unique_filename = f"{uuid.uuid4()}.{ext}" if ext else str(uuid.uuid4())

        file_path = self.upload_dir / unique_filename

        #  Reset pointer (VERY IMPORTANT)
        file.file.seek(0)

        #  Save file
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        #  Calculate size
        size_bytes = file_path.stat().st_size
        size_kb = size_bytes // 1024
        
        # Return the URL path, not the local filesystem path
        return f"/uploads/{file.filename}", size_kb