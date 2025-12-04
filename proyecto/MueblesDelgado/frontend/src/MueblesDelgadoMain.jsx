import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from './Router/AppRouter'
import { store } from './store'

export const MueblesDelgadoMain = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}