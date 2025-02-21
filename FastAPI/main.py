from fastapi import FastAPI
from routers import products, users, basic_auth_users, jwt_auth_users
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.include_router(products.router)
app.include_router(users.router)
app.include_router(jwt_auth_users.router)
app.include_router(basic_auth_users.router)
app.mount("/static",StaticFiles(directory="static"),name="static")


#Levantar el server 
# uvicorn main:app --reload 

@app.get("/")
async def root(): #para que el programa siga funcionando
    return "hola pingu"
 


# Documentacion con swagger: http://ruta/docs
# Documentacion con Redocly: http://ruta/redoc

 