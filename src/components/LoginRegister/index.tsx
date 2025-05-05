import { LoginRegisterTypes } from './types'
import { Container, Form, Button, GoogleButton } from './styles'
import { useEffect, useState } from 'react';
import { auth, googleProvider } from '../../firebaseConfig'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
  onAuthStateChanged
} from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const LoginRegister = ({ setUserId }: LoginRegisterTypes) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Configuração inicial
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid)
    })
    return () => unsubscribe()
  }, [setUserId])

  // Função universal para login com Google
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUserId(result.user.uid)
      toast.success("Login realizado com sucesso!")
    } catch (error) {
      console.error("Erro:", error)
      toast.error("Falha no login com Google")
      
      // Fallback para mobile
      if (typeof window !== 'undefined' && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
        toast.info("Redirecionando para login...")
        window.location.assign(
          `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/handler`
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Adicione este useEffect para lidar com o resultado do redirect
  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          setUserId(result.user.uid)
        }
      } catch (error) {
        console.error("Erro no redirect result:", error)
      }
    }
  
    handleAuthRedirect()
  }, [setUserId])

  // Função para fazer login do usuário
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
    } catch (error) {
      console.error("Erro ao fazer login: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para registrar o usuário
  const handleRegister = async () => {
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      setIsRegistering(false)
    } catch (error) {
      console.error("Erro ao registrar: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      {isRegistering ? (
        <Form>
          <h2>Criar Conta</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister} disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
          </Button>
          <GoogleButton 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
          >
            <FcGoogle size={20} />
            {isLoading ? 'Carregando...' : 'Continuar com Google'}
          </GoogleButton>
          <Button onClick={() => setIsRegistering(false)}>
            Já tem uma conta? Entrar
          </Button>
        </Form>
      ) : (
        <Form>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
          <GoogleButton 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
          >
            <FcGoogle size={20} />
            {isLoading ? 'Carregando...' : 'Continuar com Google'}
          </GoogleButton>
          <Button onClick={() => setIsRegistering(true)}>
            Criar conta
          </Button>
        </Form>
      )}
    </Container>
  )
}

/* import { LoginRegisterTypes } from './types'
import { Container, Form, Button } from './styles'
import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export const LoginRegister = ({ setUserId }: LoginRegisterTypes) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  // Função para fazer login do usuário
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
    } catch (error) {
      console.error("Erro ao fazer login: ", error)
    }
  }

  // Função para registrar o usuário
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      setIsRegistering(false)
    } catch (error) {
      console.error("Erro ao registrar: ", error)
    }
  }

  return (
    <Container>
      {isRegistering ? (
        <Form>
          <h2>Criar Conta</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister}>Registrar</Button>
          <Button onClick={() => setIsRegistering(false)}>Já tem uma conta? Entrar</Button>
        </Form>
      ) : (
        <Form>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Entrar</Button>
          <Button onClick={() => setIsRegistering(true)}>Criar conta</Button>
        </Form>
      )}
    </Container>
  )
} */