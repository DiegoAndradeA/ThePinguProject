from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")


class User(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserDB(User):
    password: str

users_db = {
    "mouredev": {
        "username": "diegodev",
    "full_name": "Diego Andrade",
    "email": "diegoandrade@uc.cl",
    "disabled": False,
    "password": "123456"
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
    
async def current_user(token: str = Depends(oauth2)):
    user = search_user(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="credenciales de autenticacion invalidas",
            headers ={"WWW-Authenticate":"Bearer"})
    if user.disabled:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuario inactivo",
            headers ={"WWW-Authenticate":"Bearer"})
    return user
    
@router.post("/login2")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)
    if not user_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="el usuario no existe")

    user =search_user_db(form.username)
    if not form.password == user.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Contraseña no es correcta")

    return {"access_token": user.username, "token_type":"bearer"}

@router.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user 