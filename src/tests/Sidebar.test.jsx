import { render, screen } from '@testing-library/react'
import { QuestionTag } from '../components/Sidebar/components/QuestionTag/QuestionTag.jsx'

test('Should render colors tag and time', () => {
  render(<QuestionTag guess="#fff" correctOption="#000" time={2} />)

  expect(screen.getByTestId('guess')).toHaveTextContent('#fff')
  expect(screen.getByTestId('correct-option')).toHaveTextContent('#000')
  expect(screen.getByTestId('time')).toMatch(/\d+/g)
})
