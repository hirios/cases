console.clear()
var verboseCase = true

function print(string) {
  if (verboseCase) {
    if (string.startsWith('[+++]')) {
      console.log('%c ' + string, 'background: #48b073; color: #ffffff; font-weight:bold;');
    } else {
      console.log('%c ' + string, 'background: #ff247f; color: #ffffff; font-weight:bold;');
    }
  }
}

async function waitForElemente(selector, lastCard = false) {
  let element = document

  if (lastCard) {
    element = lastEmailCard()
  }

  return new Promise(resolve => {
    if (element.querySelector(selector)) {
      return resolve(element.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (element.querySelector(selector)) {
        resolve(element.querySelector(selector));
        observer.disconnect();
      }
    }
    );

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
  );
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setLanguage(language) {
  print('[+++] Setando linguagem...');

  let localeElement = document.querySelector('[aria-label="Locale"]')
  if (localeElement.value === 'Portuguese (Brazil)') {
    return
  }

  let outFocus = localeElement.dispatchEvent(new Event('focus', { bubbles: true }));
  if (outFocus) {
    print('[+++] Case Languge setado focus')
    print('[+++] Aguardando opções de linguagens');

    await waitForElemente('[aria-label="Locale"] material-select-dropdown-item ~ material-select-dropdown-item').then(async () => {
      let option = Array.from(document.querySelectorAll('material-select-dropdown-item')).find(e => e.innerHTML.includes(language));

      if (option) {
        option.click();
        // Remove focus on locale
        localeElement.dispatchEvent(new Event('blur', { bubbles: true }));
        document.querySelector('input').dispatchEvent(new Event('focus', { bubbles: true }));

        sleep(1000).then(function () {
          if (document.querySelector('[aria-label="Locale"]').value === language) {
            print('[+++] Linguagem setada com sucesso')
          }
          else {
            print('[---] Error ao setar linguagem')
            throw new Error('[---] Error ao setar linguagem');
          }
        })
      }
    })
  };
}

async function sendTemplate(hotKay) {
  let menu = document.querySelector('[aria-label="Create a write card"]')
  menu.dispatchEvent(new Event('focus', { 'bubbles': true }))

  // Aguarda o botão de criar email aparecer e faz o clique
  await waitForElemente('[aria-label="Create new email"]').then(async (botaoEmail) => {
    botaoEmail.click()

    // Remove trechos do email padrão
  }).then(async () => {
    await waitForElemente('#email-body-content', lastCard = true).then(async (email) => {
      await sleep(200)
      email.innerText = ''
      // email.innerText = '';
    })

    // Depois de clicado aguarda o botão do CR aparecer e clica nele
  }).then(async () => {
    await waitForElemente('[aria-label="Insert canned response"][role="button"][animated="true"][aria-disabled="false"]', lastCard = true).then(async (botaoCR) => {
      botaoCR.click()

    }).then(async () => {
      await waitForElemente('search-panel[debug-id="search-panel"] input', lastCard = false).then(async (searchElement) => {
        searchElement.click()

      }).then(async () => {
        await waitForElemente('search-panel input[aria-owns]', lastCard = false).then(async (searchInput) => {
          searchInput.value = hotKay
          document.execCommand('insertText', false, ' ')
        })

      }).then(async () => {
        await waitForElemente('dynamic-component[class*="dynamic-item"]:nth-child(1)', lastCard = false).then(async (matchCR) => {
          matchCR.click()
        })
      })
    })
  })
}

function g_Appointment() {
  try {
    let dateTime = Array.from(document.querySelectorAll('cuf-form-field')).filter(function (e) { return e.innerText.includes('Appointment Time') })[0].querySelector('[debug-id="html-value"]').innerText
    dateTime = new Date(dateTime)
    let date = dateTime.toLocaleDateString()
    let time = dateTime.toLocaleTimeString().split(':').slice(0, 2).join(':')
    return `${date} às ${time}`
  } catch (e) {
    print('[---] ' + e)
    return g_appointment
  }
}

function g_returnAgentName() {
  try {
    document.querySelector('img[class*="photo"]').click()
    setTimeout(function() {
        g_agent_name = document.querySelector("profile-details > div > div.name").innerText
    }, 300)
    return g_agent_name
  } catch(e) {
    return g_agent_name
  }
}

function g_getTasks() {
  try {
    let tasksElement = Array.from(document.querySelectorAll('cuf-form-field')).filter(function (e) { return e.innerText.includes('Tasks') })[0]
    let allTasks = Array.from(tasksElement.querySelectorAll('[debug-id="html-value"]')).map(x => x.innerText)
    return allTasks.join(', ')
  }
  catch (e) {
    print('[---] ' + e)
    return g_tasks
  }
}

function lastEmailCard() {
  return Array.from(document.querySelectorAll('compose-card-content-wrapper')).pop().parentElement.parentElement.parentElement
}

async function technicalSolutions() {
  await waitForElemente('[buttoncontent][class*="address"]', lastCard = true).then((from) => {
    from.click()
    waitForElemente('[id="email-address-id--technical-solutions@google.com"]', lastCard = false).then((solutions) => {
      solutions.click()
      print('[+++] TECHNICAL SOLUTIONS EMAIL SETADO')
    })
  })
}

async function setEmails(email_to, email_cc) {
  let button_show_CC_and_BCC = lastEmailCard().querySelector('[aria-label="Show CC and BCC fields"]')
  if (button_show_CC_and_BCC) { button_show_CC_and_BCC.click() }
  else { print('[---] BOTÃO SHOW CC / BCC NÃO DISPONÍVEL') }

  let buttons_remove_emails = lastEmailCard().querySelectorAll('[aria-label*="Remove"][aria-label*="user"]')
  if (buttons_remove_emails) { buttons_remove_emails.forEach((e) => e.click()) }
  else { print('[---] BOTÕES DE REMOVER ENDEREÇOS DE EMAIL PADRÃO NÃO DISPONÍVEL') }

  var emailsFields = lastEmailCard().querySelectorAll('email-address-input')
  var emailTo = emailsFields[0].querySelector('input')
  var emailCC = emailsFields[1].querySelector('input')

  emailTo.focus()
  emailTo.value = email_to
  document.execCommand('insertText', false, ' ')
  print('[+++] EMAIL TO --> ' + email_to)

  emailCC.focus()
  emailCC.value = email_cc
  document.execCommand('insertText', false, ' ')
  print('[+++] EMAIL CC --> ' + email_cc)
}

function myCase() {
  let my_case = Array.from(document.querySelectorAll('editor [id="email-body-content-top-content"]')).pop()
  return my_case.parentElement
}

function saveDraft() {
  print('[+++] SALVANDO RASCUNHO')
  Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function (e) {
    return e.matches('[aria-label="Email body"]')
  })[0].focus()
  document.execCommand('insertText', false, ' ')
}

var program = undefined
var program = Array.from(document.querySelectorAll('cuf-form-field sanitized-content')).filter((e) => { return e.innerText.includes('pka') }).pop()
if (program) {
  program.style.background = 'red'
}

// CLICA NO OVERVIEW
document.querySelector('[aria-controls="read-card-tab-panel-home"]').click()
var g_accountStrategist = ''
var g_clientEmail = ''
var g_appointment = '<span class="field">{HORARIO}</span>'
var g_tasks = '<span class="field">{TASKS}</span>'
var g_caseID = '<span class="field">{WEBSITE}</span>'
var g_clientName = '<span class="field">{NOME DO CLIENTE}</span>'
var g_website = '<span class="field">{SITE}</span>'
var g_clientPhone = '<span class="field">{TELEFONE}</span>'
var g_agent_name = '<span class="field">{NOME DO AGENTE}</span>'

var g_typeCase = document.querySelector('[debug-id="contact-reason-header"]').innerText

if (g_typeCase === 'Submitted internally') {
  var g_appointment = g_Appointment()
  var g_tasks = g_getTasks()
  var returnAgentName = g_returnAgentName()

  var g_caseID_teste = document.querySelector('[src="https://pulse-tracker.corp.google.com/tracking_script.js"]')
  var g_caseID = g_caseID_teste ? g_caseID_teste.getAttribute('data-case-id') : g_caseID

  var g_clientName = document.querySelector('title').innerText.split(' ')[1]

  var g_website_teste = document.querySelector('ng-template > [href*="https://www.google.com"], ng-template > [href*="http://www.google.com"]')
  var g_website = g_website_teste ? g_website_teste.innerText : g_website

  if (!program) {
    var g_accountStrategist = document.querySelector('internal-user-info div div[class*="email"]').innerText
  }

  // AGUARDA CLIENTE CLICAR NO OVERWIEW
  waitForElemente('[aria-label="Overview"].selected').then(async () => {
    print('[+++] TENTANDO CAPTURAR EMAIL E TELEFONE DO CLIENTE')

    try {
      g_clientEmail = document.querySelector('other-contacts [debug-id="details"] div[class*="email"]').innerText
    } catch (e) {
      print('[---] ' + e)
    }

    try {
      if (!g_clientEmail) {
        g_clientEmail = Array.from(document.querySelectorAll('home-card-content-wrapper pii-value')).filter((e) => { if (e.innerText.includes('@') && !e.innerText.includes('@google.com') && !e.innerText.includes('*')) { return e } }).pop().innerText
      }
    } catch (e) {
      print('[---] ' + e)
    }

    try {
      g_clientPhone = '+' + Array.from(document.querySelectorAll('cuf-form-field')).filter((e) => { return e.innerText.includes('Contact') }).filter((e) => { return !e.innerText.includes('Conversion Category') })[0].innerText.split('+')[1].replace(/[^\d]+/g, '')
    } catch (e) {
      print('[---] ' + e)
    }

    try {
      if (!g_clientPhone) {
        let contact = Array.from(document.querySelectorAll('cuf-form-field')).filter((e) => { return e.innerText.includes('Contact') })[0].innerText
        g_clientPhone = '+' + contact.slice(contact.search('55')).replace(/[^\d]+/g, '')
      }
    } catch (e) {
      print('[---] ' + e)
    }

  }).then(async () => {
    let menu = document.querySelector('[aria-label="Create a write card"]')
    menu.dispatchEvent(new Event('focus', { 'bubbles': true }))

    // Aguarda o botão de criar email aparecer e faz o clique
    await waitForElemente('[aria-label="Create new email"]').then(async (botaoEmail) => {
      botaoEmail.click()

    }).then(async () => {
      await waitForElemente('editor [id="email-body-content-top-content"] em').then(async () => {
        print('[+++] SETANDO EMAILS')

        await technicalSolutions()
        setEmails(g_clientEmail, g_accountStrategist)

      }).then(() => {
        print('[+++] ADICIONANDO TEMPLATE DO TAKE')
        myCase().innerHTML = template(type_email)

      }).then(() => {
        saveDraft()
      })
    })
  })

} else {
  setLanguage('Portuguese (Brazil)').then(() => {
    sendTemplate('ts as new dfa')
  })
}

function template(type_email) {
  if (type_email === 'takept') {
    return`<p dir="auto"><em>Tenha atenção que, de acordo com a Política de Privacidade da Google, todas as capturas de ecrã e links abaixo/acima são apenas para uso interno. Não as partilhe/encaminhe externamente.</em></p> <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block" dir="auto"> <p dir="ltr"><br></p> <p dir="auto">Oi <span style="font-weight:bold"><span class=fi">${g_clientName}</span></span>,</p> <p dir="auto">Muito obrigado por agendar uma consultoria com o Time de Soluções Técnicas do Google. O seu Representante do Google solicitou esta chamada em seu nome e te auxiliaremos no caso <span style="font-weight:bold"><span class=fi">${g_caseID}</span></span> para o website <span style="font-weight:bold"><span class=fi">${g_website}</span></span>.</p> <p dir="auto">O agente do time de Soluções Técnicas irá entrar em contato na data/horário agendado: <span style="font-weight:bold"><span class=fi">${g_appointment}</span></span>.&nbsp;</p> <p dir="auto">Por favor, verifique a sua caixa de entrada e acesse o convite no seu calendário. Siga as instruções específicas nele e confirme a sua participação. Para se preparar para a nossa chamada, por favor, revise a lista de tarefas <a href="https://support.google.com/google-ads/answer/11605860?hl=pt-BR" style="color:rgb(26,115,232)" target="_blank">vinculada aqui </a>e complete as solicitações.</p> <p dir="ltr">Se tiver qualquer dúvida antes da chamada ou se quiser adicionar outros participantes à reunião, basta nos informar respondendo a esta mensagem ou entrando em contato com o Representante do Google. Estamos animados para trabalhar com você!</p><br> <p dir="auto">Muito obrigado!</p> <div dir="ltr" align="left"> <table style="border:none;border-collapse:collapse;line-height:normal"> <colgroup> <col width="361"> </colgroup> <tbody> <tr style="height:151.75pt"> <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br> <div dir="ltr" style="margin-left:0pt" align="left"> <table style="border:none;border-collapse:collapse"> <colgroup> <col width="82"> <col width="197"> </colgroup> <tbody> <tr style="height:67.5pt"> <td style="border-right:solid #d5d5d5 0.75pt;vertical-align:middle;padding:0pt 15pt 0pt 0pt;overflow:hidden"> <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"> <span style="font-size:12pt;font-family:Arial;color:rgb(0,0,0);vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:59px;height:59px"><img src="https://lh3.googleusercontent.com/y6QudS2DJDVsUlt-v6ncpiUKx9DbLrX9Y9kSCmhcnnHjMIFSLjXgX2l5KCP9TZ89o3TM22bi6kyNi6d7lVWEyqvMfsgEDS3Al2O9xpWKStOCy1Li5y-Ht58_1T8iX7dy5uUBvAQgf19njRB27eBGEIuPuv9hSkEKupeEe8vxhAt9yddmXrconSRRgvGxgVo" width="59" height="59" style="margin-left:0px;margin-top:0px"></span></span></p> </td> <td style="border-left:solid #d5d5d5 0.75pt;vertical-align:top;padding:0pt 0pt 0pt 15pt;overflow:hidden"> <br> <div dir="ltr" style="margin-left:0pt" align="left"> <table style="border:none;border-collapse:collapse"> <colgroup> <col width="138"> </colgroup> <tbody> <tr style="height:40.5pt"> <td colspan="2" style="vertical-align:top;padding:0pt 0pt 4pt 0pt;overflow:hidden"> <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"> <span style="font-size:9pt;font-family:&quot;Google Sans&quot;,sans-serif;color:rgb(56,58,53);vertical-align:baseline;white-space:pre-wrap">Equipe de Soluções Técnicas do Google</span></p> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div><br> <p dir="auto" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"><span style="font-size:8pt;color:rgb(0,0,0);font-style:italic;vertical-align:baseline;white-space:pre-wrap">Não remova o código de referência para que possamos responder mais rapidamente. Obrigado.</span></p><br> </td> </tr> </tbody> </table> </div> <p dir="ltr"><span style="font-weight:bold;font-style:italic">Termos</span><span style="font-style:italic">: ao responder a esta mensagem, você autoriza o especialista em implementação do Google a fornecer orientações quanto à instalação do <b>${g_tasks}</b> no seu site e/ou campanha e/ou conta do Google Analytics, conforme necessário. Você confirma e reconhece que todas as alterações sugeridas e/ou implementadas pelo Google devem ser realizadas por sua conta e risco. O Google não garante nem promete resultados decorrentes da implementação dessas alterações. Além disso, o Google não será responsável por eventuais efeitos dessas mudanças, o que inclui, sem limitação, qualquer aumento nos gastos relacionados às campanhas do Google Ads, pelos quais você terá total responsabilidade. Você também concorda em validar se o site continua funcionando conforme o esperado.</span></p><br> <p dir="auto"><span style="font-weight:bold;font-style:italic">Observação</span><span style="font-style:italic">: recomendamos que você faça o backup completo do seu site antes de realizar alterações. Além disso, você NÃO deve compartilhar as credenciais do site comigo ou com outras pessoas do Google. Por fim, fazer alterações no seu website / conta enquanto trabalhamos na solicitação pode causar a perda de algumas alterações / configurações. Aconselhamos que você não faça alterações no seu site / conta até a conclusão das implementações recomendadas.</span></p></div>`
  } 

  if (type_email === 'takees') {
    return `<p dir="auto"><em>Tenga en cuenta que, de conformidad con la Política de Privacidad de Google, todas las capturas de pantalla y vínculos que se muestran a continuación o más arriba son solo para uso interno. No las comparta ni reenvíe a terceros.</em></p> <div id="email-body-content-top-content" style="font-style:normal;font-variant:normal;font-stretch:normal;font-size:13px;line-height:17px;font-family:Roboto,sans-serif;display:block" dir="auto"> <p dir="ltr" style="font-weight:normal"><br></p> <p dir="auto" style="font-weight:normal">Holla,&nbsp;<span style="font-weight:bold"><span>${g_clientName}</span></span>,</p> <p dir="auto"><span>Muchas gracias por programar una consulta con el equipo de soluciones técnicas de Google. Su representante de Google solicitó esta llamada en su nombre y lo ayudaremos con el caso&nbsp;<b>${g_caseID}</b></span>&nbsp;para el sitio web&nbsp;<span style="font-weight:bold"><span><a href="${g_website}" target="_blank">${g_website}</a></span></span>.<br><br></p> <p dir="auto" style="font-weight:normal">El agente del equipo de Soluciones técnicas se comunicará con usted en la fecha/hora programada: <span style="font-weight:bold"><span>${g_appointment}</span></span>.&nbsp;</p> <p dir="auto" style="font-weight:normal">Por favor revise su bandeja de entrada y acceda a la invitación en su calendario. Siga las instrucciones específicas allí contenidas y confirme su participación. Para prepararse para nuestra llamada, revise la lista de tareas pendientes&nbsp;<a href="https://support.google.com/google-ads/answer/11605860?hl=es" style="color:rgb(26,115,232)" target="_blank">vinculada aquí</a>&nbsp;y completar las solicitudes.</p> <p dir="auto" style="font-weight:normal">Si tiene alguna pregunta antes de la llamada o desea agregar más participantes a la reunión, simplemente háganoslo saber respondiendo a este mensaje o comunicándose con su representante de Google. ¡Estamos emocionados de trabajar con usted!</p><br> <div dir="auto" align="left" style="font-weight:normal"> <div id="tw-target-text-container"> <pre id="tw-target-text" dir="ltr" style="font-family:Roboto,sans-serif"><span lang="es">¡Muchas gracias!</span></pre> </div> <div id="tw-target-rmn-container"></div> <div> <div> <div><span> <div style="font-style:italic"></div> </span></div> </div> </div> <table style="border:none;border-collapse:collapse;line-height:normal"> <colgroup> <col width="361"> </colgroup> <tbody> <tr style="height:151.75pt"> <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><br> <div dir="auto" style="margin-left:0pt" align="left"> <table style="border:none;border-collapse:collapse"> <colgroup> <col width="82"> <col width="197"> </colgroup> <tbody> <tr style="height:67.5pt"> <td style="border-right:solid #d5d5d5 0.75pt;vertical-align:middle;padding:0pt 15pt 0pt 0pt;overflow:hidden"> <p dir="auto" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt"> <span style="font-size:12pt;font-family:Arial;color:rgb(0,0,0);vertical-align:baseline;white-space:pre-wrap"><span style="border:none;display:inline-block;overflow:hidden;width:59px;height:59px"><img src="https://lh3.googleusercontent.com/y6QudS2DJDVsUlt-v6ncpiUKx9DbLrX9Y9kSCmhcnnHjMIFSLjXgX2l5KCP9TZ89o3TM22bi6kyNi6d7lVWEyqvMfsgEDS3Al2O9xpWKStOCy1Li5y-Ht58_1T8iX7dy5uUBvAQgf19njRB27eBGEIuPuv9hSkEKupeEe8vxhAt9yddmXrconSRRgvGxgVo" width="59" height="59" style="margin-left:0px;margin-top:0px"></span></span> </p> </td> <td style="border-left:solid #d5d5d5 0.75pt;vertical-align:top;padding:0pt 0pt 0pt 15pt;overflow:hidden"> <br> <div dir="auto" style="margin-left:0pt" align="left"> </div>El equipo de Soluciones Tecnicas de Google<br> </td> </tr> </tbody> </table> </div><br> Código de referencia –&nbsp;<b style="font-style:italic;color:rgb(0,0,0);font-size:8pt">3-1298000034301</b><br> </td> </tr> </tbody> </table><span style="font-weight: bold; font-style: italic;">Condiciones:</span><span style="font-style: italic;">&nbsp;Al responder este mensaje, usted reconoce que, por el presente, autoriza a un especialista en implementación de Google a guiarlo a través del proceso de instalación de <b>${g_tasks}</b> en su sitio web, campaña o cuenta de Analytics, según sea necesario. Por el presente, usted acepta y reconoce que únicamente efectuará todos los cambios que sugiera y/o implemente Google por decisión propia y bajo su propia responsabilidad. Google no garantiza ni promete ningún tipo de resultado por implementar tales cambios. Asimismo, Google no se hace responsable de los efectos de dichos cambios, incluidos, entre otros, aumentos en la inversión relacionados con sus campañas de Google Ads, por los que usted será el único responsable. A su vez, usted acepta validar que su sitio web continúe funcionando de la forma deseada.</span> <p dir="auto"><span style="font-weight: bold; font-style: italic;">Nota:&nbsp;</span><span style="font-style: italic;">Le recomendamos que se asegure de crear una copia de seguridad completa de su sitio web antes de aplicar cualquier cambio. Por otra parte, NO debe compartir sus credenciales del sitio conmigo ni con ninguna otra persona de Google. Por último, si hace cambios en su sitio web o en su cuenta mientras trabajamos en su solicitud, es posible que pierda algunos de los cambios o parte de la configuración. Le sugerimos que se abstenga de realizar cambios en su sitio web o cuenta hasta que se hayan implementado los cambios recomendados.</span></p> <p dir="auto"><span style="font-style: italic;"></span></p> </div>`
  }

  
  if (type_email === '10minutospt') {
    return `<p dir="auto"><em>Tenha em atenção que, de acordo com a Política de Privacidade da Google, todas as capturas de ecrã e links abaixo/acima são apenas para uso interno. Não as partilhe/encaminhe externamente.</em></p> <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block" dir="auto"> <p dir="ltr"><br></p> <p dir="auto">Olá <span style="font-weight: bold;">${g_clientName}<br></span></p> <p dir="auto" style="font-weight: normal;">Aqui é <span style="font-weight: bold;">${g_agent_name}</span> da equipe de Soluções Técnicas do Google. Tentei ligar no seguinte número: <span style="font-weight: bold;">${g_clientPhone}</span>, sem sucesso, teria outro número para que eu possa entrar em contato?&nbsp;<br><br>Sua consultoria estava marcada para hoje, com o objetivo de lhe auxiliar a implementar a seguinte tarefa:<br></p> <div class="" dir="auto" style=""><b>${g_tasks}</b><br></div> <p dir="auto" style=""><br>Em seu site:&nbsp;<a href="${g_website}" target="_blank" class="ignore-globals" style="color: rgb(26, 115, 232); text-decoration-line: none;"><b>${g_website}</b></a><br><br> </p> <p dir="auto" style="font-weight: normal;">Tentarei ligar novamente dentro de 10 minutos, caso prefira, você pode acessar o link da nossa reunião:<span style="font-weight: bold;"> </span><span style="font-weight: bold;">&lt;&lt;Link do Meet&gt;&gt;<br><br></span></p> <p dir="auto" style="font-weight: normal;"><br>Atenciosamente,</p> <div dir="ltr" align="left" style="font-weight: normal;"> <table style="border: none; border-collapse: collapse; line-height: normal;"> <colgroup> <col width="348"> </colgroup> <tbody> <tr style="height:15pt"> <td style="vertical-align:top;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.345;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 10pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span> </p> <div dir="ltr" style="margin-left:1.5pt;" align="left"> <table style="border:none;border-collapse:collapse;"> <colgroup> <col width="79"> <col width="199"> </colgroup> <tbody> <tr style="height:45pt"> <td style="border-right:solid #d5d5d5 0.75pt;vertical-align:middle;padding:0pt 15pt 0pt 0pt;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.3800000000000001;margin-top:0pt;margin-bottom:0pt;"> <a href="https://www.youtube.com/watch?v=HcjR6ZngQcw"><span style="font-size: 12pt; font-family: &quot;Times New Roman&quot;; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;"><span style="border:none;display:inline-block;overflow:hidden;width:59px;height:60px;"><img src="https://lh6.googleusercontent.com/s9W_iuqDskGYArSoaWmMk5I28zFZCCvnETFlD-3jYTxZ4tYWULEFafgmS3FgrTWM4kd2qNv6C8iXxxu4qPH8zEPRfS9VUfSsdjDU8tge9Get8XDma9p6noph2-gW9VEg2VJJ2EvmBEvpe6LE9vHzm1NskYZv_P8kPCSkKRY_X_4fg1qpt0JCyCnyvXTiYw" width="59" height="60" style="margin-left:0px;margin-top:0px;"></span></span></a> </p> </td> <td style="border-left:solid #d5d5d5 0.75pt;vertical-align:top;padding:0pt 0pt 0pt 15pt;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.7999999999999998;margin-top:0pt;margin-bottom:0pt;"> <span style="font-size: 9pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span> </p> <div dir="ltr" style="margin-left:0pt;" align="left"> <table style="border:none;border-collapse:collapse;"> <colgroup> <col width="177"> </colgroup> <tbody> <tr style="height:13pt"> <td style="vertical-align:top;padding:0pt 0pt 4pt 0pt;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.3800000000000001;margin-top:0pt;margin-bottom:0pt;"> <span style="font-size: 9pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">Equipe de Soluções Técnicas do Google</span></p> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div> <p dir="auto" style=""><span style="font-style: italic;">Código de referência – <b>${g_caseID}</b></span></p> <p dir="ltr" style="font-weight: normal;"><span style="font-style: italic;">Não remova o código de referência para que possamos responder mais rapidamente. Obrigado,</span></p> <p dir="ltr" style="font-weight: normal;"><span style="font-style: italic;">&nbsp;</span></p> <p dir="auto" style="font-weight: normal;"><span style="font-weight: bold; font-style: italic;">Termos</span><span style="font-style: italic;">: ao responder a esta mensagem, você autoriza o especialista em implementação do Google a fornecer orientações quanto à instalação do&nbsp;</span><b>${g_tasks}&nbsp;</b><span style="font-style: italic;">no seu site e/ou campanha e/ou conta do Google Analytics, conforme necessário. Você confirma e reconhece que todas as alterações sugeridas e/ou implementadas pelo Google devem ser realizadas por sua conta e risco. O Google não garante nem promete resultados decorrentes da implementação dessas alterações. Além disso, o Google não será responsável por eventuais efeitos dessas mudanças, o que inclui, sem limitação, qualquer aumento nos gastos relacionados às campanhas do Google Ads, pelos quais você terá total responsabilidade. Você também concorda em validar se o site continua funcionando conforme o esperado.</span></p> <p dir="auto" style="font-weight: normal;"><span style="font-weight: bold; font-style: italic;">Observação</span><span style="font-style: italic;">: recomendamos que você faça o backup completo do seu site antes de realizar alterações. Além disso, você NÃO deve compartilhar as credenciais do site comigo ou com outras pessoas do Google. Por fim, fazer alterações no seu website / conta enquanto trabalhamos na solicitação pode causar a perda de algumas alterações / configurações. Aconselhamos que você não faça alterações no seu site / conta até a conclusão das implementações recomendadas.</span></p></div>`
  }

  if (type_email === '10minutoses') {
    return `<p dir="auto"><em>Tenga en cuenta que, de conformidad con la Política de Privacidad de Google, todas las capturas de pantalla y vínculos que se muestran a continuación o más arriba son solo para uso interno. No las comparta ni reenvíe a terceros.</em></p> <p dir="auto"><br></p> <p dir="auto">Hola,&nbsp;<b>${g_clientName}<br><br></b></p> <p dir="auto">Mi nombre es&nbsp;<b>${g_agent_name}</b>&nbsp;y soy del equipo de Soluciones&nbsp;Técnicas de Google. Intenté llamar al siguiente número:&nbsp;<span style="font-weight: bold;">${g_clientPhone},&nbsp;</span>sin éxito, ¿Tiene otro número para contactarlo?<br><br>Su consultoría estaba programada para hoy, con el objetivo de ayudarlo a implementar la siguiente tarea:</p> <p dir="auto"><b>${g_tasks}<br></b><br></p> <p dir="auto">En su sitio web:&nbsp;<a href="${g_website}" class="ignore-globals" style="color: rgb(26, 115, 232); text-decoration-line: none;"><b>${g_website}</b></a><br><br> </p> <p dir="auto">Intentaré llamarte nuevamente en 10 minutos, si lo prefieres, puedes acceder al vínculo a nuestra reunión:&nbsp;<span style="font-weight: bold;">&lt;&lt;Meet Link&gt;&gt;</span></p> <p dir="auto"><br><br>Gracias,</p> <div dir="auto" align="left"> <table style="border: none; border-collapse: collapse; line-height: normal;"> <colgroup> <col width="348"> </colgroup> <tbody> <tr style="height: 89.25pt;"> <td style="vertical-align: top; overflow: hidden; overflow-wrap: break-word;"> <p dir="auto" style="line-height: 1.345; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 10pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">&nbsp;</span> </p> <div dir="auto" align="left" style="margin-left: 0pt;"> <table style="border: none; border-collapse: collapse;"> <colgroup> <col width="81"> <col width="199"> </colgroup> <tbody> <tr style="height: 45pt;"> <td style="border-right: 0.75pt solid rgb(213, 213, 213); vertical-align: middle; padding: 0pt 15pt 0pt 0pt; overflow: hidden; overflow-wrap: break-word;"> <p dir="auto" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><a href="https://www.youtube.com/watch?v=HcjR6ZngQcw"><span style="font-size: 12pt; font-family: &quot;Times New Roman&quot;; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;"><span style="border: none; display: inline-block; overflow: hidden; width: 59px; height: 60px;"><img src="https://lh3.googleusercontent.com/O8KMg6Ks_akN9Y2zi_Iyd9AW_Dd6oJc5X1_G7UUz9Eho6hcIQEF5lExrLCu-eshVmLIYCl4qwFWhjXhQF7E7yPB6rZBre8Ho7BATNQTquggKpvHlvCb2z2XdAr6LcLOHhY2TzGDv7JvYBHijZa8AYSl6AtJPoVyjgKYposqahNsRyX01MTmdOEyBbA7s8g" width="59" height="60" style="margin-left: 0px; margin-top: 0px;"></span></span></a> </p> </td> <td style="border-left: 0.75pt solid rgb(213, 213, 213); vertical-align: top; padding: 0pt 0pt 0pt 15pt; overflow: hidden; overflow-wrap: break-word;"> <p dir="auto" style="line-height: 1.8; margin-top: 0pt; margin-bottom: 0pt;"> <span style="font-size: 9pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">&nbsp;</span> </p> <div dir="ltr" align="left" style="margin-left: 0pt;"> <table style="border: none; border-collapse: collapse;"> <colgroup> <col width="177"> </colgroup> <tbody> <tr style="height: 13pt;"> <td style="vertical-align: top; padding: 0pt 0pt 4pt; overflow: hidden; overflow-wrap: break-word;"> <p dir="auto" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"> <span style="font-size: 9pt; font-family: Arial; color: rgb(0, 0, 0); font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; vertical-align: baseline; white-space-collapse: preserve;">El equipo de Soluciones Tecnicas de Google</span> </p> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div> <p dir="auto"><span style="font-style: italic;">Código de referencia –&nbsp;<b>${g_caseID}</b></span></p><br> <p dir="auto"><span style="font-weight: bold; font-style: italic;">Condiciones:</span><span style="font-style: italic;">&nbsp;Al responder este mensaje, usted reconoce que, por el presente, autoriza a un especialista en implementación de Google a guiarlo a través del proceso de instalación de <b>${g_tasks}</b> en su sitio web, campaña o cuenta de Analytics, según sea necesario. Por el presente, usted acepta y reconoce que únicamente efectuará todos los cambios que sugiera y/o implemente Google por decisión propia y bajo su propia responsabilidad. Google no garantiza ni promete ningún tipo de resultado por implementar tales cambios. Asimismo, Google no se hace responsable de los efectos de dichos cambios, incluidos, entre otros, aumentos en la inversión relacionados con sus campañas de Google Ads, por los que usted será el único responsable. A su vez, usted acepta validar que su sitio web continúe funcionando de la forma deseada.</span></p> <p dir="auto"><span style="font-weight: bold; font-style: italic;">Nota:&nbsp;</span><span style="font-style: italic;">Le recomendamos que se asegure de crear una copia de seguridad completa de su sitio web antes de aplicar cualquier cambio. Por otra parte, NO debe compartir sus credenciales del sitio conmigo ni con ninguna otra persona de Google. Por último, si hace cambios en su sitio web o en su cuenta mientras trabajamos en su solicitud, es posible que pierda algunos de los cambios o parte de la configuración. Le sugerimos que se abstenga de realizar cambios en su sitio web o cuenta hasta que se hayan implementado los cambios recomendados.</span></p> </div>`
  }
}

