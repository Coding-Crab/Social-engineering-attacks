const exportButton = document.getElementById('export-button');
exportButton.addEventListener('click', exportToFile);

const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ';', ':', '\'', '"', ',', '.', '<', '>', '/', '?'];
const history = [];


function exportToFile() {
  let content = '';
  const questions = ['question1', 'question2', 'question3', 'question4', 'question5'];
  
  // Add the user's answers to each question to the content string
  for (let i = 0; i < questions.length; i++) {
    const question = document.getElementById(questions[i]).value;
    content += `Question ${i+1}: ${question}\n`;
  }

  // Add the history of generated words to the content string
  if (history.length > 0) {
    content += '\nHistory:\n';
    for (let i = 0; i < history.length; i++) {
      content += `${history[i]}\n`;
    }
  }

  // Create a new Blob with the content and a type of "text/plain"
  const blob = new Blob([content], {type: 'text/plain'});
  
  // Create a URL for the Blob and create a link element to download it
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'social-engineering-attacks.txt';

  // Dispatch a click event to download the file and revoke the URL
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function generateWord() {
  const question1 = document.getElementById('question1').value;
  const question2 = document.getElementById('question2').value;
  const question3 = document.getElementById('question3').value;
  const question4 = document.getElementById('question4').value;
  const question5 = document.getElementById('question5').value;
  const randomNumber = Math.floor(Math.random() * 1000);

  let word = '';
  const strArray = [question1, question2, question3, question4, question5];
  const randomIndex = Math.floor(Math.random() * strArray.length);
  const randomStr = strArray[randomIndex];

  for (let i = 0; i < randomStr.length; i++) {
    word += randomStr[i];
    if (i == Math.floor(randomStr.length / 2)) {
      word += randomNumber;
    }
  }

  for (let i = 0; i < 3; i++) {
    const randomSymbolIndex = Math.floor(Math.random() * symbols.length);
    const randomSymbol = symbols[randomSymbolIndex];
    const randomCharIndex = Math.floor(Math.random() * word.length);
    word = word.substring(0, randomCharIndex) + randomSymbol + word.substring(randomCharIndex);
  }

  const outputElement = document.getElementById('output');
  outputElement.innerHTML = word;

  const historyElement = document.getElementById('history');
  const historyItem = document.createElement('div');
  historyItem.classList.add('history-item');

  const historyText = document.createElement('span');
  historyText.innerText = word;
  historyItem.appendChild(historyText);

  const copyButton = document.createElement('button');
  copyButton.innerText = 'Copy';
  copyButton.addEventListener('click', function() {
    copyToClipboard(word);
  });
  historyItem.appendChild(copyButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function() {
    history.splice(history.indexOf(word), 1);
    historyElement.removeChild(historyItem);
  });
  historyItem.appendChild(deleteButton);

  historyElement.appendChild(historyItem);
  history.push(word);
}

function copyToClipboard(text) {
  const tempElement = document.createElement('textarea');
  tempElement.value = text;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);
}

function clearHistory() {
  const historyElement = document.getElementById('history');
  while (historyElement.firstChild) {
    historyElement.removeChild(historyElement.firstChild);
  }
  history.length = 0;
}
