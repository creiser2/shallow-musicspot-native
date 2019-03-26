const defaultState = {
  counter: 0
}


export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case 'INCREASE_COUNT':
      return {
        counter: state.counter+1
      }
    case 'DECREASE_COUNT':
      return {
        counter: state.counter-1
      }
    default:
      return state
  }
}
