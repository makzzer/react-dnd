import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

const estadoInicial = [
  { id: 1, text: "hacer curso react" },
  { id: 2, text: "hacer curso boostrap" },
  { id: 3, text: "hacer curso nextjs" }
]

const App = () => {

  //el pinche useState se define con el nombre de la variable entre corchetes
  const [todos] = useState(estadoInicial)
  console.log(estadoInicial)

  return (

    < DragDropContext>
      <h1>Hola drag and drop</h1>
      <Droppable droppableId='todos'>
        {
          (Areadropeable) => (
            <ul ref={Areadropeable.innerRef}
              {...Areadropeable.droppableProps}>


              {todos.map((todo, index) => (
                <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                  {
                    (elementoDragueble) => (
                      <li
                        key={todo.id}
                        ref={elementoDragueble.innerRef}
                        {...elementoDragueble.dragHandleProps}
                        {...elementoDragueble.draggableProps}

                      >{todo.text}</li>
                    )

                  }

                </Draggable>
              ))}
              {/*lo siguiente lo agrego para que me meta un placeholder y no me borre el espacio de la tarea cuando la arrastro*/}
              {Areadropeable.placeholder}
            </ul>

          )
        }

      </Droppable>

    </DragDropContext>
  )
}

export default App;