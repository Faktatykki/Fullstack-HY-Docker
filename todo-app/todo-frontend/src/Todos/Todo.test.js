import React from 'react'
import { render } from '@testing-library/react'

import Todo from './Todo'

test('todo done is false', () => {
    const todo = {
        text: 'text',
        done: false
    }

    const comp = render(<Todo todo = { todo } onClickComplete={() => {}} onClickDelete={() => {}} />)
    expect(comp.container).toHaveTextContent(todo.text)
})