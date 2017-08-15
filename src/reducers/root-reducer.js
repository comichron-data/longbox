export default function rootReducer(state, action) {
  if (!state) state = {value: 0};

  return {
    value: state.value + 1
  };
}
