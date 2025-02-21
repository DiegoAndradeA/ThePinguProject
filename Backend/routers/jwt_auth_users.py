from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 1
SECRET = "PEPO"

router = APIRouter()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

crypt = CryptContext(schemes=["bcrypt"])

class User(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserDB(User):
    password: str

users_db = {
    "mouredev": {
        "username": "mouredev",
    "full_name": "Diego Andrade",
    "email": "diegoandrade@uc.cl",
    "disabled": False,
    "password": "$2a$12$eO/GmfumH87azmyWce5wS.3VM3DRXGqiPrzFMEUon/jiYJuTgtwsm"
    },
    "mouredev2": {
        "username": "diegodev2",
    "full_name": "Diego Andrade2",
    "email": "diegoandrade2@uc.cl",
    "disabled": True,
    "password": "654321"
    }
}

def search_user_db(username: str):
    if username in users_db:
        return UserDB(**users_db[username])
    
def search_user(username: str):
    if username in users_db:
        return User(**users_db[username])
    
async def auth_user(token: str = Depends(oauth2)):
    exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="credenciales de autenticacion invalidas",
            headers ={"WWW-Authenticate":"Bearer"})


    try:
        username = jwt.decode(token, SECRET, algorithms=[ALGORITHM]).get("sub")
        if username is None:
            raise exception


    except JWTError:
        raise exception

    return search_user(username)
    
async def current_user(user: User = Depends(auth_user)):
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario inactivo",
            headers ={"WWW-Authenticate":"Bearer"})
    return user

@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):

    user_db = users_db.get(form.username)
    if not user_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="el usuario no existe")

    user =search_user_db(form.username)

    
    if not crypt.verify(form.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña no es correcta")
    
    
    
    expire =  datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_DURATION)

    access_token = {"sub":user.username,"exp": expire}

    return {"access_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM) , "token_type":"bearer"}


@router.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user