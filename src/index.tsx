import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ReduxProvider } from "./redux/provider"
import { Toaster } from "sonner"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <ReduxProvider>
      <App />
      <Toaster richColors />
    </ReduxProvider>
  </BrowserRouter>
)
