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
  const [todos, setTodos] = useState(estadoInicial)


  const handleDragEnd = resultado => {

    /*primer caso de borde, por si sacan el draggable para afuera del area del drop*/
    if (resultado.destination === null) return;

    /*console.log(resultado)*/
    const startIndex = resultado.source.index;
    const finalIndex = resultado.destination.index;
    console.log(startIndex, finalIndex)

    /*creo una copia de los todos para usar el split operator */
    const nuevosTodosDnD = [...todos]
    console.log(nuevosTodosDnD)
    //lo siguiente con splice me esta eliminando del array el elemento que yo selecciono para el drag, por eso lo guardo
    //poniendo [elementosSeleccionadodnd] hago el destructuring de un array, asi me devuelve el objeto y no el array
    const [elementoSeleccionadodnd] = nuevosTodosDnD.splice(startIndex, 1)
    //con este print veo que me retorna un array
    console.log(elementoSeleccionadodnd)

    //vuelvo a insertar el elemento en el array que copie
    nuevosTodosDnD.splice(finalIndex, 0, elementoSeleccionadodnd)

    //seteo los todos con el nuevo orden de los arrays acomodados
    setTodos(nuevosTodosDnD)






    //setTodos(nuevosTodosDnD)


  }

  /*metodo para que no se me copien los elementos que muevo con el drag and drop, sino me repite elementos en la lista*/
  const noCopiarElementosOnDrag = (evento) => {
    evento.preventDefault();
  }

  return (

    < DragDropContext onDragEnd={handleDragEnd} >
      <h1>Hola drag and drop</h1>
      <Droppable droppableId='todos' >
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