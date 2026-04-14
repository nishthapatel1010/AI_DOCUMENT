from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


# 🔹 Base schema (shared fields)
class DocumentBase(BaseModel):
    title: str
    description: Optional[str] = None


# 🔹 Used when creating document (via upload)
class DocumentCreate(DocumentBase):
    pass


# 🔹 Used for updating document
class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# 🔹 Internal schema (optional, useful for service layer)
class DocumentInDB(DocumentBase):
    file_url: str
    size_kb: Optional[int] = None


# 🔹 Response schema (what API returns)
class DocumentOut(DocumentBase):
    id: int
    file_url: str
    size_kb: Optional[int] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)