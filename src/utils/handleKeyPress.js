function handleKeyPress(event, fn) {
  if (event.keyCode === 13 && event.shiftKey === false) {
    event.preventDefault();
    fn(event);
  }
}

export default handleKeyPress;
