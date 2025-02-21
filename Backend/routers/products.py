from fastapi import APIRouter

router = APIRouter(prefix="/products",
                   tags = ["products"],
                   responses ={404: {"message": "no encontrado"}})

products_list = ["producto 1","producto 2","producto 3", "producto 4"]

@router.get("/")
async def products(): #para que el programa siga funcionando
    return products_list

@router.get("/{id}")
async def products(id: int): #para que el programa siga funcionando
    return products_list[id]