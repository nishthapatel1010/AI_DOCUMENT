from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException
from app.models.document import Document
from app.schemas.document import DocumentUpdate
from app.services.storage.local import LocalStorageService
from app.core.config import settings


class DocumentService:

    def __init__(self, db: Session):
        self.db = db
        self.storage = LocalStorageService()

    def upload_document(self, title: str, description: str, file: UploadFile):
        # 🔹 Validate file type (from ENV)
        if file.content_type not in settings.ALLOWED_FILE_TYPES:
            raise HTTPException(status_code=400, detail="Invalid file type")

        # 🔹 Validate file size (from ENV)
        content = file.file.read()

        if len(content) > settings.MAX_FILE_SIZE_MB * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail=f"File exceeds {settings.MAX_FILE_SIZE_MB}MB"
            )

        file.file.seek(0)

        # 🔹 Save file
        file_path, size_kb = self.storage.save_file(file)

        # 🔹 Save to DB
        document = Document(
            title=title,
            description=description,
            file_url=file_path,
            size_kb=size_kb
        )

        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)

        return document

    def get_all_documents(self):
        return self.db.query(Document).all()

    def get_document_by_id(self, doc_id: int):
        document = self.db.query(Document).filter(Document.id == doc_id).first()

        if not document:
            raise HTTPException(status_code=404, detail="Document not found")

        return document

    def update_document(self, doc_id: int, data: DocumentUpdate):
        document = self.get_document_by_id(doc_id)

        if data.title is not None:
            document.title = data.title

        if data.description is not None:
            document.description = data.description

        self.db.commit()
        self.db.refresh(document)

        return document