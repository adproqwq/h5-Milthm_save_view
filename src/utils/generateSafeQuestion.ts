export default (question: string, options: string[], id: string): HTMLDivElement => {
  const div = document.createElement('div');

  const questionDiv = document.createElement('div');

  const span = document.createElement('span');
  span.textContent = question;

  questionDiv.append(span);

  const optionsDiv = document.createElement('div');

  const radioGroup = document.createElement('mdui-radio-group');
  radioGroup.id = id;

  options.forEach(value => {
    const radio = document.createElement('mdui-radio');
    radio.value = value;
    radio.textContent = value;
    radioGroup.append(radio);
  });

  optionsDiv.append(radioGroup);

  div.append(questionDiv, optionsDiv);

  return div;
};