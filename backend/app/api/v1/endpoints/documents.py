from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentOut

router = APIRouter()

@router.get("/", response_model=List[DocumentOut])
def list_documents(db: Session = Depends(get_db)):
    """
    List all documents in the system.
    """
    documents = db.query(Document).all()
    return documents

@router.post("/", response_model=DocumentOut, status_code=201)
def create_document(doc_in: DocumentCreate, db: Session = Depends(get_db)):
    """
    Register a new document metadata.
    """
    new_doc = Document(
        title=doc_in.title,
        description=doc_in.description,
        file_url=doc_in.file_url,
        size_kb=doc_in.size_kb
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc

@router.get("/{document_id}", response_model=DocumentOut)
def get_document(document_id: int, db: Session = Depends(get_db)):
    """
    Get detailed information for a specific document.
    """
    doc = db.query(Document).filter(Document.id == document_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc
