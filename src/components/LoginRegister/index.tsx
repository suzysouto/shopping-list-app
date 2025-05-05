import { LoginRegisterTypes } from './types'
import { Container, Form, Button, GoogleButton } from './styles'
import { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Função otimizada para detecção de mobile
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(userAgent)
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
    
    setIsMobile(
      !(isIOS && isSafari) && // Exceção para iOS Safari
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    )
  }, [])

  return isMobile
}

export const LoginRegister = ({ setUserId }: LoginRegisterTypes) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isMobileDevice = useDeviceDetection()

  // Configuração inicial e listener de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid)
    })

    // Verifica resultado de redirecionamento
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) setUserId(result.user.uid)
      } catch (error) {
        console.error("Erro no redirect:", error)
      }
    }
    checkRedirect()

    return () => unsubscribe()
  }, [setUserId])

  // Função dedicada para mobile
  const handleMobileLogin = async () => {
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider())
      
      // Fallback para verificar se o redirecionamento completou
      setTimeout(async () => {
        if (!auth.currentUser) {
          try {
            const result = await getRedirectResult(auth)
            if (!result?.user) throw new Error("Redirecionamento não completado")
          } catch (error) {
            console.error("Erro no fallback:", error)
            toast.error("Por favor, tente novamente")
          }
        }
      }, 2000)
    } catch (error) {
      console.error("Erro no redirect mobile:", error)
      throw error
    }
  }

  // Função principal unificada
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      if (isMobileDevice) {
        await handleMobileLogin()
      } else {
        const result = await signInWithPopup(auth, new GoogleAuthProvider())
        setUserId(result.user.uid)
      }
    } catch (error) {
      console.error("Erro no login:", error)
      toast.error(isMobileDevice 
        ? "Falha no redirecionamento. Tente novamente." 
        : "Falha no popup. Tente novamente ou use outro método.")
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
          <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
            <FcGoogle size={20} />
            {isLoading ? 'Carregando...' : 'Registrar com Google'}
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
            {isLoading ? 'Carregando...' : (
              isMobileDevice ? 'Continuar com Google' : 'Entrar com Google'
            )}
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