import React from 'react'

const TodoList = () => {
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Task</th>
        <th>Job</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      
      <tr >
        <td>Cy Ganderton</td>
        <td>now</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default TodoList