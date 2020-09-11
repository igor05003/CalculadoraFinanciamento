/**
* MIT License
*
* Copyright (c) 2020 Igor Costa Carvalho Campos Silva
* Calculadora de financiamento para Google Planilhas
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

function calculadora (v, n, r) {
  r=r/100
  r=Number(r.toFixed(2))
  
  let saldo=[]
  let juros=[0]
  let amortizacao=[0]
  let soma_juros=0
  
  let p= v*(1+r)**n*r/((1+r)**n-1)
  
  p= Number(p.toFixed(2))
  
  saldo[0]=v
  
  for (let i=1; i < n; i++){
    juros[i]=saldo[i-1]*r
    juros[i]=Number(juros[i].toFixed(2))
    
    amortizacao[i]=p-juros[i]
    saldo[i]=saldo[i-1]-amortizacao[i]
    soma_juros= soma_juros+ juros[i]
  }
  
  amortizacao[n]=saldo[n-1]
  saldo[n]=0
  juros[n]=saldo[n-1]*r
  juros[n]=Number(juros[n].toFixed(2))
  
  
  
  const planilha= SpreadsheetApp.getActiveSheet()
  
  planilha.getDataRange().clearContent()
  planilha.getRange("A1:E1").setValues([
    ["Período", "Parcela", "Amortização", "Juros", "Saldo"]
  ])
  
  let tabela=[]
  
  for (let i=0; i<= n; i++){
    tabela[i]=[
      i, p, amortizacao[i], juros[i], saldo[i]
    ]
  }
  tabela[0][1]=0
  
  
  planilha.getRange(2, 1, n+1, 5).setValues(tabela)

  planilha.getRange("G1:H1").setValues([
    ["Total de juros", soma_juros]
  ])
}
