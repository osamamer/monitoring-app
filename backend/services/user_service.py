from sqlalchemy.orm import Session
from models.user import User
from schemas.user_schemas import UserCreate
from services.auth_service import get_password_hash, verify_password
from typing import Optional


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate) -> User:
    if get_user_by_username(db, user.username):
        raise ValueError(f"Username '{user.username}' already exists")

    if get_user_by_email(db, user.email):
        raise ValueError(f"Email '{user.email}' already exists")

    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=get_password_hash(user.password),
        full_name=user.full_name,
        is_active=True,
        is_superuser=False
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    user = get_user_by_username(db, username)

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    if not user.is_active:
        return None

    return user