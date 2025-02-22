from fastapi import APIRouter, HTTPException, status
from db.models.user import User
from db.client import db_client
from db.schemas.user import user_schema, users_schema

router = APIRouter(prefix="/userdb",
                   tags = ["userdb"],
                   responses ={status.HTTP_404_NOT_FOUND: {"message": "no encontrado"}})



@router.get("/", response_model=list[User])
async def users (): #para que el programa siga funcionando
    return users_schema(db_client.users.find())


# Path
@router.get("/{id}")
async def user(id: int): #para que el programa siga funcionando
    return search_user(id)

#Query


@router.get("/")  
async def user(id: int): #para que el programa siga funcionando
    return "pe"


@router.post("/", response_model= User,status_code=status.HTTP_201_CREATED) 
async def user(user: User):
    if type(search_user_by_email(user.email)) == User:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="el usuairo ya existe")

    user_dict = dict(user)
    del user_dict["id"]

    id = db_client.users.insert_one(user_dict).inserted_id

    new_user = user_schema(db_client.users.find_one({"_id": id}))

    return User(**new_user)


# @router.put("/")
# async def user(user: User):
#     found = False
#     for index, sav in enumerate(users_list):
#         if sav.id == user.id:
#             users_list[index] = user
#             found = True
#     if not found:
#         return {"error": "No hay usuario"} 
    

# @router.delete("/{id}")
# async def user(id: int): #para que el programa siga funcionando
#     found = False
#     for index, sav in enumerate(users_list):
#         if sav.id == id:
#             del users_list[index]
#             found = True
#     if not found:
#         return {"error": "No hay usuario"} 

    
def search_user_by_email(email: str): #para que el programa siga funcionando
    try: 
        user = user_schema(db_client.users.find_one({"email": email}))
        return User(**user)
    except:
        return {"error": "No hay usuario"} 
    

def search_user(id : int): #para que el programa siga funcionando
    return ""