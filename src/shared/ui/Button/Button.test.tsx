import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('buttons', () => {
  test('Test render', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
  test('Test render2', () => {
    const { getByText } = render(<Button>TEST</Button>)

    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
})
