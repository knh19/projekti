
import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import eventService from './services/events'
import loginService from './services/login'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #050505;
    color: white;
    font-family: Arial, sans-serif;
  }

  button, input {
    font: inherit;
  }
`

const Page = styled.div`
  max-width: 1150px;
  margin: auto;
  padding: 0 25px 40px;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #1e293b;

  h2 {
    margin: 0;
    color: white;
  }

  span {
    color: #3b82f6;
  }

  button {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    margin-left: 15px;
  }
`

const Hero = styled.section`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 80px 0 50px;

  > div {
    flex: 1;
  }

  h1 {
    font-size: clamp(38px, 5vw, 60px);
    font-weight: 500;
    margin: 10px 0;
  }

  h1 span {
    color: #3b82f6;
  }

  p {
    color: #94a3b8;
    line-height: 1.7;
  }

  img {
    width: 100%;
    border-radius: 12px;
    max-height: 330px;
    object-fit: cover;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    padding: 40px 0 30px;
  }
`

const Content = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`

const Box = styled.div`
  background: #0d1424;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 12px;

  h3 {
    margin: 5px 0 10px;
  }

  p {
    color: #94a3b8;
    font-size: 14px;
  }
`

const Button = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 11px 16px;
  cursor: pointer;
  margin: 5px 5px 5px 0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Form = styled.form`
  input {
    width: 100%;
    box-sizing: border-box;
    background: #080e1b;
    color: white;
    border: 1px solid #263247;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 12px;
  }

  button {
    width: 100%;
  }
`

const App = () => {
  const [events, setEvents] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [register, setRegister] = useState(false)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    eventService.getAll()
      .then(data => setEvents(data))
      .catch(() => setMessage('Tapahtumien haku epäonnistui'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      if (register) {
        await loginService.register(username, password, name)
        setRegister(false)
        setPassword('')
        setMessage('Käyttäjä luotu! Kirjaudu sisään.')
      } else {
        const loggedUser = await loginService.login(username, password)
        setUser(loggedUser)
        setPassword('')
        setMessage('')
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
        'Kirjautuminen tai rekisteröityminen epäonnistui'
      )
    }
  }

  const handleRegister = async (id) => {
    if (!user) {
      setMessage('Kirjaudu ensin sisään')
      return
    }

    setBusy(true)
    setMessage('')

    try {
      await eventService.register(id, user.token)
      setMessage('Ilmoittautuminen onnistui!')
    } catch (error) {
      setMessage(error.response?.data?.error || 'Ilmoittautuminen epäonnistui')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id) => {
    if (!user?.isAdmin) return
    if (!window.confirm('Poistetaanko tapahtuma?')) return

    setBusy(true)

    try {
      await eventService.remove(id, user.token)
      setEvents(events.filter(event => event.id !== id))
      setMessage('Tapahtuma poistettu')
    } catch (error) {
      setMessage(error.response?.data?.error || 'Poisto epäonnistui')
    } finally {
      setBusy(false)
    }
  }

  const logout = () => {
    setUser(null)
    setMessage('')
  }

  return (
    <>
      <GlobalStyle />
      <Page>
        <Nav>
          <h2>Events </h2>

          <div>
            <button onClick={() =>
              document.getElementById('events').scrollIntoView()
            }>
              Tapahtumat
            </button>

            {user ? (
              <button onClick={logout}>Kirjaudu ulos</button>
            ) : (
              <button onClick={() =>
                document.getElementById('login').scrollIntoView()
              }>
                Kirjaudu
              </button>
            )}
          </div>
        </Nav>

        <Hero>
          <div>
            <small style={{ color: '#3b82f6' }}>
              PIENIÄ HETKIÄ, ISOJA KOHTAAMISIA
            </small>

            <h1>
              Hyviä hetkiä.<br />
              <span>Yhdessä.</span>
            </h1>

            <p>
              Löydä tapahtuma, joka tuo ihmiset yhteen.
              Tule sellaisena kuin olet – lähde yhtä
              kokemusta rikkaampana.
            </p>

            <Button onClick={() =>
              document.getElementById('events').scrollIntoView()
            }>
              Löydä oma tapahtumasi ↓
            </Button>
          </div>

          
        </Hero>

        <Content>
          <section id="events">
            <h2>Tulevat tapahtumat ({events.length})</h2>

            {events.map(event => (
              <Box key={event.id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>
                  {new Date(event.date).toLocaleString('fi-FI')}
                </p>
                <p>{event.location}</p>

                <Button
                  disabled={!user || busy}
                  onClick={() => handleRegister(event.id)}
                >
                  {user ? 'Ilmoittaudu' : 'Kirjaudu ilmoittautuaksesi'}
                </Button>

                {user?.isAdmin && (
                  <Button
                    disabled={busy}
                    onClick={() => handleDelete(event.id)}
                    style={{ background: '#dc2626' }}
                  >
                    Poista
                  </Button>
                )}
              </Box>
            ))}

            {events.length === 0 && <p>Ei tapahtumia.</p>}
          </section>

          <aside id="login">
            <Box>
              {user ? (
                <>
                  <h2>Hei, {user.name}!</h2>
                  <p>
                    {user.isAdmin
                      ? 'Olet ylläpitäjä'
                      : 'Voit ilmoittautua tapahtumiin'}
                  </p>
                  <Button onClick={logout}>Kirjaudu ulos</Button>
                </>
              ) : (
                <>
                  <h2>
                    {register ? 'Luo käyttäjä' : 'Kirjaudu sisään'}
                  </h2>

                  <p>Hyvät kohtaamiset alkavat sinusta.</p>

                  <Form onSubmit={handleSubmit}>
                    {register && (
                      <input
                        placeholder="Nimi"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    )}

                    <input
                      placeholder="Käyttäjänimi"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      minLength={register ? 3 : undefined}
                      required
                    />

                    <input
                      type="password"
                      placeholder="Salasana"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      minLength={register ? 8 : undefined}
                      required
                    />

                    <Button type="submit">
                      {register ? 'Rekisteröidy' : 'Kirjaudu sisään'}
                    </Button>
                  </Form>

                  <Button onClick={() => {
                    setRegister(!register)
                    setMessage('')
                  }}>
                    {register ? 'Takaisin' : 'Luo käyttäjä'}
                  </Button>
                </>
              )}
            </Box>
          </aside>
        </Content>

        {message && <p role="status">{message}</p>}
      </Page>
    </>
  )
}

export default App
