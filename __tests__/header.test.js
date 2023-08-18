import { render, screen } from '@testing-library/react'
import { HeaderTabs } from '../app/components/Header'

describe('Header', () => {
  it('renders Log In', () => {
    render(<HeaderTabs tabs={["Happening"]}  />)
    const logIn = screen.getByText(/Log In/i)
    expect(logIn).toBeInTheDocument()
 
  })
})