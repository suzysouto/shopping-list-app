import { LoginRegisterTypes } from './types'
import { Container, Form, Button, GoogleButton } from './styles'
import { useEffect, useState } from 'react'
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

  // Monitorar auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid)
    })
    return () => unsubscribe()
  }, [setUserId])

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      setUserId(result.user.uid)
      setTimeout(() => {
        toast.success("Login com Google realizado com sucesso!", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
    } catch (error: any) {
      console.error("Erro:", error.code, error.message)
      setTimeout(() => {
        toast.error("Falha no login com Google" + error.message, {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)

      // Fallback para mobile
      if (typeof window !== 'undefined' && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
        setTimeout(() => {
          toast.info("Redirecionando para login...", {
            autoClose: 3000,
            closeOnClick: true,
            closeButton: false,
          })
        }, 10)
        window.location.assign(
          `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/handler`
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Redirect Google
  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) {
          setUserId(result.user.uid)
        }
      } catch (error: any) {
        console.error("Erro no redirect result:", error.code, error.message)
      }
    }
    handleAuthRedirect()
  }, [setUserId])

  // Login com email/senha
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      if (!email || !password) {
        setTimeout(() => {
        toast.error("Email e senha são obrigatórios!", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
        setIsLoading(false)
        return
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      setTimeout(() => {
        toast.success("Login realizado com sucesso!", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
    } catch (error: any) {
      console.error("Erro ao fazer login:", error.code, error.message)
      setTimeout(() => {
        toast.error("Erro: " + error.message, {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
    } finally {
      setIsLoading(false)
    }
  }

  // Registro de usuário
  const handleRegister = async () => {
    setIsLoading(true)
    try {
      if (!email || !password) {
        setTimeout(() => {
        toast.error("Email e senha são obrigatórios!", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setTimeout(() => {
        toast.error("A senha deve ter pelo menos 6 caracteres.", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
        setIsLoading(false)
        return
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      setTimeout(() => {
        toast.success("Conta criada com sucesso!", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
      setIsRegistering(false)
    } catch (error: any) {
      console.error("Erro ao registrar:", error.code, error.message)
      setTimeout(() => {
        toast.error("Erro: " + error.message, {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: false,
        })
      }, 10)
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
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
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
          <Button onClick={() => setIsRegistering(false)} disabled={isLoading}>
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
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
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
          <Button onClick={() => setIsRegistering(true)} disabled={isLoading}>
            Criar conta
          </Button>
        </Form>
      )}
    </Container>
  )
}
