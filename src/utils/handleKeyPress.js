function handleKeyPress(event, fn) {
  event.target.style.height = "inherit";
  event.target.style.height = `${event.target.scrollHeight}px`;
  if (event.keyCode === 13 && event.shiftKey === false) {
    event.preventDefault();
    fn(event);
  }
}

export default handleKeyPress;
