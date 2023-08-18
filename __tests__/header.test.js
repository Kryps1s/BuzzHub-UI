import { render, screen } from '@testing-library/react'
import { HeaderTabs } from '../app/components/Header'

describe('Header', () => {
  it('renders a Happening Today', () => {
    render(<HeaderTabs tabs={["Happening"]}  />)
 

    const happeningToday = screen.getByText(/Log In/i)
    expect(happeningToday).toBeInTheDocument()
 
  })
})