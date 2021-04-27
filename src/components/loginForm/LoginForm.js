import React from 'react'
import loginService from '../../services/login'
import teamService from '../../services/teams'
import storage from '../../utils/storage'
import Notification from '../notification/Notification'
import {
  Input,
  ContainerLogin,
  WrapLogin,
  WrapInput,
  WrapButton,
  FormLogin,
  FormTitle,
  TextCenter,
  Link,
  Button,
} from './loginForm-styles'

const LoginForm = ({ setUser }) => {
  const [teamName, setTeamName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [notification, setNotification] = React.useState(null)
  const [isLogin, setIsLogin] = React.useState(true)

  const validEmailRegex = RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  )

  const validateForm = () => {
    let isValid = true
    if (teamName.length <= 3) {
      setNotification({
        type: 'error',
        message: 'Team Name must be at least 3 characters',
      })
      isValid = false
    }
    if (!isLogin && !validEmailRegex.test(email)) {
      setNotification({
        type: 'error',
        message: 'invalid email address',
      })
      isValid = false
    }
    if (password.length < 8) {
      setNotification({
        type: 'error',
        message: 'password too short',
      })

      isValid = false
    }

    setTimeout(() => {
      setNotification(null)
    }, 5000)

    return isValid
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    try {
      const team = await loginService.login({ teamName, password })
      setUser(team)
      storage.saveUser(team)
    } catch (exception) {
      setNotification({ type: 'error', message: 'Wrong credentials' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    if (!validateForm()) return
    try {
      await teamService.register({ teamName, email, password })
      const team = await loginService.login({ teamName, password })
      storage.saveUser(team)
      setUser(team)
    } catch (exception) {
      setNotification({ type: 'error', message: 'Wrong credentials' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (!isLogin) {
    return (
      <ContainerLogin>
        <Notification notification={notification} />
        <WrapLogin>
          <FormLogin onSubmit={handleRegister}>
            <FormTitle>Creat New Account</FormTitle>
            <WrapInput>
              <Input
                type="text"
                placeholder="team name"
                value={teamName}
                name="teamName"
                onChange={({ target }) => setTeamName(target.value)}
              />
            </WrapInput>
            <WrapInput>
              <Input
                style={{ borderTop: 'none' }}
                type="email"
                placeholder="email"
                value={email}
                name="email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </WrapInput>
            <WrapInput>
              <Input
                style={{ borderTop: 'none' }}
                type="password"
                value={password}
                name="password"
                placeholder="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </WrapInput>
            <WrapButton>
              <Button type="submit">Register</Button>
            </WrapButton>
            <TextCenter style={{ paddingTop: '45px' }}>
              Whant to log-in?{' '}
              <Link onClick={() => setIsLogin(!isLogin)}>Login</Link>
            </TextCenter>
          </FormLogin>
        </WrapLogin>
      </ContainerLogin>
    )
  }
  return (
    <ContainerLogin>
      <Notification notification={notification} />
      <WrapLogin>
        <FormLogin onSubmit={handleLogin}>
          <FormTitle>Account Login</FormTitle>
          <WrapInput>
            <Input
              type="text"
              placeholder="team name"
              value={teamName}
              name="teamName"
              onChange={({ target }) => setTeamName(target.value)}
            />
          </WrapInput>
          <WrapInput>
            <Input
              style={{ borderTop: 'none' }}
              type="password"
              value={password}
              name="password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </WrapInput>
          <WrapButton>
            <Button type="submit">login</Button>
          </WrapButton>
          <TextCenter style={{ paddingTop: '45px' }}>
            Not Register yet?{' '}
            <Link onClick={() => setIsLogin(!isLogin)}>Register</Link>
          </TextCenter>
        </FormLogin>
      </WrapLogin>
    </ContainerLogin>
  )
}

export default LoginForm
