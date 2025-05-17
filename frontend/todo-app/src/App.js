import { useEffect, useState } from "react";
import axios from "axios" // istek atmak için kullanılacak

function App() {

  const [value, setValue] = useState("") // value: Kullanıcının input'a girdiği metni tutar
  const[todos, setTodos] = useState([]) // todos: Tüm yapılacaklar listesini tutar

  // Yeni Todo Ekleme Fonksiyonu
  function handleNewTodo(){
    if (value === "") return;
    axios
    .post("http://127.0.0.1:8000/todos", {title:value}) // axios.post ile belirtilen URL'ye (http://127.0.0.1:8000/todos) bir POST isteği gönderir. İstek, title anahtarı ile value içeriğini gönderir.
    .then(()=> fetchTodos()) // İstek başarılı olursa, fetchTodos fonksiyonu çağrılır ve liste yenilenir.
  }


  // Todo Listesini Çekme Fonksiyonu
  function fetchTodos(){
    axios.get("http://127.0.0.1:8000/todos").then((res) => setTodos(res.data)) // axios.get ile belirtilen URL'den (API'den) yapılacaklar listesini çeker. Başarılı olduğunda, gelen veriyi (res.data) todos state'ine kaydeder.

  }

  function deleteTodo(id){

    if (!window.confirm("silmek istediginizden emin misiniz?")){
      return
    }

    axios
    .delete(`http://127.0.0.1:8000/todos/${id}`)
    .then(()=> fetchTodos())
  }

  function updateTodo(id, e){
    e.preventDefault()

    axios.put(`http://127.0.0.1:8000/todos/${id}`, {title: e.target[0].value})
    .then(() => fetchTodos())
  }


  // Başlangıçta Listeyi Çekme (useEffect)
  useEffect(()=> {
    fetchTodos() // Bileşen ilk kez yüklendiğinde ([] boş olduğundan) fetchTodos fonksiyonunu çağırır. Böylece uygulama açıldığında yapılacaklar listesi otomatik olarak gelir
  }, []) 


  // Kullanıcı metin kutusuna (<input>) yazdıkça, value state'i güncellenir. Kullanıcı "+Olustur" butonuna tıklarsa, handleNewTodo fonksiyonu çağrılır ve yeni todo eklenir.
  return (
    <div>
      <h1>My Todo App</h1>
      <label> Yeni Todo olustur</label>
      <input className="input-todo" type="text" onChange={(e) => setValue(e.target.value)}/>
      <button className="add-button" onClick={handleNewTodo}>+Olustur</button> 

      <div>
        <ul className="todo-list">
          {todos.map(todo => ( // todos adlı dizi üzerinde gezinir
            <li key={todo.id} className="todo-item">
              
              <form onSubmit={(e) => updateTodo(todo.id, e)}>
                <input defaultValue={todo.title}/>
                  <div>

                    <button type="submit" className="update-btn">
                      kaydet
                    </button>

                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                      sil
                    </button>


                  </div>


              </form>
          
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
