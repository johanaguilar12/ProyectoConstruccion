import { Provider } from "react-redux"
import { AppRouter } from './Router/AppRouter'
import { store } from './store'

export const MueblesDelgadoMain = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
