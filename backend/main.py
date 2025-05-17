from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from models import Todo, Base
from pydantic import BaseModel

Base.metadata.create_all(bind=engine) # models dosyasındaki tüm tabloları veritabanında oluşturur

app = FastAPI()

# API ye kimlerin istek atabileceğini belirtiyoruz
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'], # herkesi kabul et
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# veri tabanına bağlanmak için
def get_db(): 
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Hello World"}

'''@app.get("/hi")
def say_hi():
    return {"message": "Hi"}'''

# getirmek için
@app.get("/todos") # bütün todo ları listeleyeceğimiz fonksiyon
def read_todos(db = Depends(get_db)):
    todos = db.query(Todo).all() # database den tüm verileri getir
    return todos

class TodoCreate(BaseModel):
    title: str

@app.post("/todos") # oluşturmak için
def create_todo(new_todo: TodoCreate, db = Depends(get_db)):
    db_todo = Todo(title=new_todo.title)
    db.add(db_todo)
    db.commit()
    return {"message": "Successfully Added"}

class TodoUpdate(BaseModel):
    title : str

# update için
@app.put("/todos/{todo_id}")
def update_todo(
    todo_id: int,
    request_data: TodoUpdate,
    db = Depends(get_db)

):
    todo_item = db.query(Todo).filter(Todo.id == todo_id).first()

    if not todo_item:
        raise HTTPException(status_code=404, detail="todo bulunamadi")

    todo_item.title = request_data.title

    db.add(todo_item)

    db.add(todo_item)
    db.commit()

    return {"message": "Successfully updated"}


@app.delete("/todos/{todo_id}")
def delete_todo(
    todo_id: int,
    db = Depends(get_db)
):
    todo_item = db.query(Todo).filter(Todo.id == todo_id).first()

    if not todo_item:
        raise HTTPException(status_code=404, detail="todo bulunamadi")

    db.delete(todo_item)
    db.commit()

    return {"message": "Successfully deleted"}