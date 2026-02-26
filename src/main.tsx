import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initCard } from './components/card/initCard.ts'
import { runMutationObserverExamples } from './mutationObserver.ts'

createRoot(document.getElementById('root')!).render(
  <App />
)

window.onload = () => {
  initCard();
  runMutationObserverExamples();
}
