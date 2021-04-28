function onOpen (e) {
  SpreadsheetApp.getUi()
    .createMenu('Calculadora de Financiamento')
    .addItem('Abrir calculadora', 'showSidebar')
    .addToUi();
}

function showSidebar () {
  const htmlSidebar = HtmlService.createHtmlOutputFromFile('htmlSidebar').setTitle('Calculadora de Financiamento');
  SpreadsheetApp.getUi().showSidebar(htmlSidebar);
}


