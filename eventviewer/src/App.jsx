import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import eventService from './services/events'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #080808;
  }
`

const Page = styled.div`
  background: #080808;
  color: white;
  min-height: 100vh;
  padding: 30px;
  font-family: Arial;
  box-sizing: border-box;
`

const Title = styled.h1`
  color: #3b82f6;
`

const Event = styled.div`
  background: #111827;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
`

const App = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    eventService.getAll().then(data => {
      setEvents(data) 
      console.log('jotain')
    })
  }, [])

  return (
    <>
      <GlobalStyle />
      <Page>
        <Title>Tapahtumat</Title>

        {events.map(event => (
          <Event key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleString('fi-FI')}</p>
            <p>{event.location}</p>
          </Event>
        ))}
      </Page>
    </>
  )
}

export default App