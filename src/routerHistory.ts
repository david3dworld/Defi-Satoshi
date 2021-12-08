import { createBrowserHistory, createHashHistory } from 'history'

// Manually create the history object so we can access outside the Router e.g. in modals
const history = createHashHistory()

export default history
