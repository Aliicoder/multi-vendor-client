import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter ,Route,Routes} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/index.ts'
import Contexts from './Context/Contexts.tsx'

const App = lazy(()=>import('./App.tsx'))

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Provider store={store}>
      <Contexts>
        <Suspense fallback={null}>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Suspense>
      </Contexts>
      </Provider>
    </BrowserRouter>,
)
