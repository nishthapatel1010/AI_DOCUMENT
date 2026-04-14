from sqlalchemy.orm import Session
from fastapi import UploadFile
from app.services.document_service import DocumentService
from app.schemas.document import DocumentUpdate

class DocumentController:
    @staticmethod
    def upload(db: Session, title: str, description: str, file: UploadFile):
        service = DocumentService(db)
        return service.upload_document(title, description, file)    
    
    @staticmethod
    def get_all(db: Session):
        service = DocumentService(db)
        return service.get_all_documents()
    
    @staticmethod
    def get_by_id(db: Session, doc_id: int):
        service = DocumentService(db)
        return service.get_document_by_id(doc_id)
    
    @staticmethod
    def update(db: Session, doc_id: int, data: DocumentUpdate):
        service = DocumentService(db)
        return service.update_document(doc_id, data)