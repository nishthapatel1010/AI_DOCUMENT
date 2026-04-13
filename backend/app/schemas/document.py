from typing import Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict

# Base schema for shared fields
class DocumentBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_url: str
    size_kb: Optional[int] = None

# Schema for creating a document
class DocumentCreate(DocumentBase):
    pass

# Schema for returning a document (Response)
class DocumentOut(DocumentBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
