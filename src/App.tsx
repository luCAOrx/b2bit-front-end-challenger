import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"
import { useAuth } from "./hooks/use-auth"
import { AuthProvider } from "./contexts/auth/auth-provider"

function InnerApp() {
  const auth = useAuth()

  return (
    <RouterProvider
      router={router}
      context={{ auth }}
      key={auth.user?.id || "guest"}
    />
  )
}

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

export default App
