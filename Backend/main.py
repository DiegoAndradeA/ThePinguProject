from fastapi import FastAPI
from routers import users_db
from routers import products, basic_auth_users, jwt_auth_users
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(products.router)
app.include_router(users_db.router)
app.include_router(jwt_auth_users.router)
app.include_router(basic_auth_users.router)
app.mount("/static",StaticFiles(directory="static"),name="static")


#Levantar el server 
# uvicorn main:app --reload 

# Configura CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite solicitudes desde cualquier origen (puedes especificar una lista de dominios aquí)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.get("/")
async def root(): #para que el programa siga funcionando
    return "hola pingu"
 


# Documentacion con swagger: http://ruta/docs
# Documentacion con Redocly: http://ruta/redoc

 