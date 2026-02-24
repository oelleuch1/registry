import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initCard } from './components/card/initCard.ts'
import { registry } from './registry'

createRoot(document.getElementById('root')!).render(
  <App />
)


window.onload = () => {
  registry.register('.card', initCard)

  registry.start();
}

window.onbeforeunload = () => {
  registry.stop()
}
