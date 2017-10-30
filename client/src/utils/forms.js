export function change(e) {
  const newState = Object.assign({}, this.state);
  newState.elements = this.state.elements.map(current => {
    if (current.name === e.target.name) {
      current.value = e.target.value;
      current.valid = current.validate(e.target.value);
    }

    return current;
  });

  this.setState(newState);
}

export function submit(e, action) {
  e.preventDefault();
  const filtered = this.state.elements.reduce((acc, curr, i) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});
  action(filtered);
}
