from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    id: int
    name: str
    age: int

users_list =[User(id=1,name="Diego",age=3),User(id=2,name="pepo",age=4)]

@router.get("/users")
async def users (): #para que el programa siga funcionando
    return users_list


# Path
@router.get("/user/{id}")
async def user(id: int): #para que el programa siga funcionando
    return search_user(id)

#Query

@router.get("/user/")  
async def user(id: int): #para que el programa siga funcionando
    return search_user(id)



@router.post("/user/", response_model= User,status_code=201 ) 
async def user(user: User):
    if type(search_user(user.id)) == User:
        raise HTTPException(status_code=404, detail="el usuairo ya existe")

    else:
        users_list.append(user)


@router.put("/user/")
async def user(user: User):
    found = False
    for index, sav in enumerate(users_list):
        if sav.id == user.id:
            users_list[index] = user
            found = True
    if not found:
        return {"error": "No hay usuario"} 
    

@router.delete("/user/{id}")
async def user(id: int): #para que el programa siga funcionando
    found = False
    for index, sav in enumerate(users_list):
        if sav.id == id:
            del users_list[index]
            found = True
    if not found:
        return {"error": "No hay usuario"} 

    
def search_user(id: int): #para que el programa siga funcionando
    users = filter(lambda user: user.id == id, users_list)
    try: 
        return list(users)[0]
    except:
        return {"error": "No hay usuario"} 