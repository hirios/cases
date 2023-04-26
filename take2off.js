function g_Appointment() {
  let dateTime = Array.from(document.querySelectorAll('cuf-form-field')).filter(function (e) { return e.innerText.includes('Time') })[0].innerText.split('\n')[1]
  dateTime = new Date(dateTime)
  let date = dateTime.toLocaleDateString()
  let time = dateTime.toLocaleTimeString().split(':').slice(0, 2).join(':')
  return `${date} às ${time}`
}

document.querySelector('[debug-id="dock-item-home"]').click()
var g_id_case = document.querySelector('[src="https://pulse-tracker.corp.google.com/tracking_script.js"]').getAttribute('data-case-id')
var g_client_name = document.querySelector('title').innerText.split(' ')[1]
var g_tasks = Array.from(document.querySelectorAll('cuf-form-field')).filter(function (e) { return e.innerText.includes('Tasks') })[0].innerText.replace('Tasks\n', '').split('\n').join(', ')
var g_website = Array.from(document.querySelectorAll('cuf-form-field')).filter(function (e) { return e.innerText.includes('Website') })[0].innerText.split('\n')[1]

// Adiciona o email do cliente como destinatário
function setCustumerEmail() {
  document.querySelector('span[class*="button-text"]').click()
  setTimeout(function () {
    Array.from(document.querySelectorAll('span[class*="label"]')).filter(function (e) {
      return e.innerText === 'Customer'
    })[0].click()
  }, 500)
}

function emailInMenu() {
    let menu = document.querySelector('[role="menu"]') || document.querySelector('[aria-label="Create a write card"]')
    menu.dispatchEvent(new Event('focus', { 'bubbles': true }))
    setTimeout(function() {
      document.querySelector('[aria-label="Create new email"]').click()
    }, 500)
}

// Altera o email para o email do Techincal Solutions
function technicalSolutions() {
  document.querySelector('[buttoncontent][class*="address"]').click()
  setTimeout(function() {
    document.querySelector('[id="email-address-id--technical-solutions@google.com"]').click()
  }, 500)
}

// Retorna o conteúdo do email a ser editado
function myCase() {
  return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).pop()
}

// Salva a edição realizada
function saveDraft() {
  Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function (e) {
    return e.matches('[aria-label="Email body"]')
  })[0].focus()
  document.execCommand('insertText', false, ' ')
}

setCustumerEmail()
setTimeout(function() {
  setTimeout(function () {
    var g_appointment = g_Appointment()
    var g_template = `<p dir="auto"><em>Tenha em atenção que, de acordo com a Política de Privacidade da Google, todas as capturas de ecrã e links abaixo/acima são apenas para uso interno. Não as partilhe/encaminhe externamente.</em></p><div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block" dir="auto"><p dir="ltr"><br></p><p dir="auto">Oi <span style="font-weight:bold"><span class=fi">${g_client_name}</span></span>,</p><p dir="auto">Muito obrigado por agendar uma consultoria com o Time de Soluções Técnicas do Google. O seu Representante do Google solicitou esta chamada em seu nome e te auxiliaremos no caso <span style="font-weight:bold"><span class=fi">${g_id_case}</span></span> para o website <span style="font-weight:bold"><span class=fi">${g_website}</span></span>.</p><p dir="auto">O agente do time de Soluções Técnicas irá entrar em contato na data/horário agendado: <span style="font-weight:bold"><span class=fi">${g_appointment}</span></span>.&nbsp;</p><p dir="auto">Por favor, verifique a sua caixa de entrada e acesse o convite no seu calendário. Siga as instruções específicas nele e confirme a sua participação. Para se preparar para a nossa chamada, por favor, revise a lista de tarefas <a href="https://support.google.com/google-ads/answer/11605860?hl=pt-BR" style="color:rgb(26,115,232)" target="_blank">vinculada aqui </a>e complete as solicitações.</p><p dir="ltr">Se tiver qualquer dúvida antes da chamada ou se quiser adicionar outros participantes à reunião, basta nos informar respondendo a esta mensagem ou entrando em contato com o Representante do Google. Estamos animados para trabalhar com você!</p><br><p dir="auto">Muito obrigado!</p><div dir="ltr" align="left"><table style="border:none;border-collapse:collapse;line-height:normal"><colgroup><col width="361"></colgroup><tbody><tr style="height:151.75pt"><td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br><div dir="ltr" style="margin-left:0pt" align="left"><table style="border:none;border-collapse:collapse"><colgroup><col width="82"><col width="197"></colgroup><tbody><tr style="height:67.5pt"><td style="border-right:solid #d5d5d5 0.75pt;vertical-align:middle;padding:0pt 15pt 0pt 0pt;overflow:hidden"><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial;color:rgb(0,0,0);vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:59px;height:59px"><img src="https://lh3.googleusercontent.com/y6QudS2DJDVsUlt-v6ncpiUKx9DbLrX9Y9kSCmhcnnHjMIFSLjXgX2l5KCP9TZ89o3TM22bi6kyNi6d7lVWEyqvMfsgEDS3Al2O9xpWKStOCy1Li5y-Ht58_1T8iX7dy5uUBvAQgf19njRB27eBGEIuPuv9hSkEKupeEe8vxhAt9yddmXrconSRRgvGxgVo" width="59" height="59" style="margin-left:0px;margin-top:0px"></span></span></p></td><td style="border-left:solid #d5d5d5 0.75pt;vertical-align:top;padding:0pt 0pt 0pt 15pt;overflow:hidden"><br><div dir="ltr" style="margin-left:0pt" align="left"><table style="border:none;border-collapse:collapse"><colgroup><col width="138"></colgroup><tbody><tr style="height:40.5pt"><td colspan="2" style="vertical-align:top;padding:0pt 0pt 4pt 0pt;overflow:hidden"><p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:9pt;font-family:&quot;Google Sans&quot;,sans-serif;color:rgb(56,58,53);vertical-align:baseline;white-space:pre-wrap">Equipe de Soluções Técnicas do Google</span></p></td></tr></tbody></table></div><br></td></tr></tbody></table></div><br><p dir="auto" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:8pt;color:rgb(0,0,0);font-style:italic;vertical-align:baseline;white-space:pre-wrap">Não remova o código de referência para que possamos responder mais rapidamente. Obrigado.</span></p><br></td></tr></tbody></table></div><p dir="ltr"><span style="font-weight:bold;font-style:italic">Termos</span><span style="font-style:italic">: ao responder a esta mensagem, você autoriza o especialista em implementação do Google a fornecer orientações quanto à instalação do Offline Conversion Tracking no seu site e/ou campanha e/ou conta do Google Analytics, conforme necessário. Você confirma e reconhece que todas as alterações sugeridas e/ou implementadas pelo Google devem ser realizadas por sua conta e risco. O Google não garante nem promete resultados decorrentes da implementação dessas alterações. Além disso, o Google não será responsável por eventuais efeitos dessas mudanças, o que inclui, sem limitação, qualquer aumento nos gastos relacionados às campanhas do Google Ads, pelos quais você terá total responsabilidade. Você também concorda em validar se o site continua funcionando conforme o esperado.</span></p><br><p dir="auto"><span style="font-weight:bold;font-style:italic">Observação</span><span style="font-style:italic">: recomendamos que você faça o backup completo do seu site antes de realizar alterações. Além disso, você NÃO deve compartilhar as credenciais do site comigo ou com outras pessoas do Google. Por fim, fazer alterações no seu website / conta enquanto trabalhamos na solicitação pode causar a perda de algumas alterações / configurações. Aconselhamos que você não faça alterações no seu site / conta até a conclusão das implementações recomendadas.</span></p></div>`
    emailInMenu()
    setTimeout(function () {
      technicalSolutions()
      myCase().innerHTML = g_template
      saveDraft()
    }, 1500)
  }, 500)
}, 500)
