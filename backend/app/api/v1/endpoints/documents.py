from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.document import DocumentOut, DocumentUpdate
from app.controllers.document_controller import DocumentController

router = APIRouter()


@router.post("/upload-document", response_model=DocumentOut)
def upload_document(
    title: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    return DocumentController.upload(db, title, description, file)


@router.get("/get-all-document", response_model=list[DocumentOut])
def get_all_documents(db: Session = Depends(get_db)):
    return DocumentController.get_all(db)


@router.get("/get-document-by-id/{doc_id}", response_model=DocumentOut)
def get_document(doc_id: int, db: Session = Depends(get_db)):
    return DocumentController.get_by_id(db, doc_id)


@router.patch("/update-document/{doc_id}", response_model=DocumentOut)
def update_document(
    doc_id: int,
    data: DocumentUpdate,
    db: Session = Depends(get_db)
):
    return DocumentController.update(db, doc_id, data)