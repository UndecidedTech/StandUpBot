import React from 'react'
import { Feed, Checkbox } from "semantic-ui-react"

function TaskItem({ todo }) {
  return (
    <Feed>
      <Feed.Content>
        <Feed.Summary>
          <Checkbox label={todo.label}/>
        </Feed.Summary>
      </Feed.Content>
    </Feed>
  )
}

export default TaskItem
