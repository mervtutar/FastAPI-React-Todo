from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
from models import Todo, Base
from pydantic import BaseModel

Base.metadata.create_all(bind=engine) # models dosyasındaki tüm tabloları veritabanında oluşturur

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db(): # veri tabanına bağlanmak için
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


@app.get("/todos") # bütün todo ları listeleyeceğimiz fonksiyon
def read_todos(db = Depends(get_db)):
    todos = db.query(Todo).all() # database den tüm verileri getir
    return todos

class TodoCreate(BaseModel):
    title: str

@app.post("/todos")
def create_todo(new_todo: TodoCreate, db = Depends(get_db)):
    db_todo = Todo(title=new_todo.title)
    db.add(db_todo)
    db.commit()
    return {"message": "Successfully Added"}


