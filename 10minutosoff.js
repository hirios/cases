// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists

function waitForElemente(selector) {
    return new Promise(resolve=>{
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations=>{
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        }
        );

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    );
}

function g_Appointment() {
    let dateTime = Array.from(document.querySelectorAll('cuf-form-field')).filter(function(e) {
        return e.innerText.includes('Time')
    })[0].innerText.split('\n')[1]
    dateTime = new Date(dateTime)
    let date = dateTime.toLocaleDateString()
    let time = dateTime.toLocaleTimeString().split(':').slice(0, 2).join(':')
    return `${date} às ${time}`
}

function returnName() {
    document.querySelector('img[class*="photo"]').click()
    setTimeout(function() {
        g_agent_name = document.querySelector("profile-details > div > div.name").innerText
    }, 300)
    return g_agent_name
}

function returnPhone() {
    if (document.querySelector('[aria-label="View hidden phone number"]') && document.querySelector('[aria-label="View hidden phone number"]').click()) {}
    setTimeout(function() {
        g_phoneNumber = document.querySelector('[debugid="pii-phone-value"]').innerText.replace(' ', '')
    }, 1000)
    return g_phoneNumber
}

function returnTemplate() {
    return `<p dir="auto"><em>Tenha em atenção que, de acordo com a Política de Privacidade da Google, todas as capturas de ecrã e links abaixo/acima são apenas para uso interno. Não as partilhe/encaminhe externamente.</em></p><div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block" dir="auto"><p dir="ltr"><br></p><p dir="auto">Olá <span style="font-weight: bold;">${g_client_name}<br></span></p> <p dir="auto" style="font-weight: normal;">Aqui é <span style="font-weight: bold;">${g_agent_name}</span> da equipe de Soluções Técnicas do Google. Tentei ligar no seguinte número: <span style="font-weight: bold;">${g_phoneNumber}</span>, sem sucesso, teria outro número para que eu possa entrar em contato?&nbsp;<br><br>Sua consultoria estava marcada para hoje, com o objetivo de lhe auxiliar a implementar a seguinte tarefa:<br></p> <div class="" dir="auto" style=""><b>${g_tasks}</b><br></div> <p dir="auto" style=""><br>Em seu site:&nbsp;<a href="${g_website}" target="_blank" class="ignore-globals" style="color: rgb(26, 115, 232); text-decoration-line: none;"><b>${g_website}</b></a><br><br> </p> <p dir="auto" style="font-weight: normal;">Tentarei ligar novamente dentro de 10 minutos, caso prefira, você pode acessar o link da nossa reunião:<span style="font-weight: bold;"> </span><span style="font-weight: bold;">&lt;&lt;Link do Meet&gt;&gt;<br><br></span></p> <p dir="auto" style="font-weight: normal;"><br>Atenciosamente,</p> <div dir="ltr" align="left" style="font-weight: normal;"> <table style="border: none; border-collapse: collapse; line-height: normal;"> <colgroup> <col width="348"> </colgroup> <tbody> <tr style="height:15pt"> <td style="vertical-align:top;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.345;margin-top:0pt;margin-bottom:0pt;"><span style="font-size: 10pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span> </p> <div dir="ltr" style="margin-left:1.5pt;" align="left"> <table style="border:none;border-collapse:collapse;"> <colgroup> <col width="79"> <col width="199"> </colgroup> <tbody> <tr style="height:45pt"> <td style="border-right:solid #d5d5d5 0.75pt;vertical-align:middle;padding:0pt 15pt 0pt 0pt;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.3800000000000001;margin-top:0pt;margin-bottom:0pt;"> <a href="https://www.youtube.com/watch?v=HcjR6ZngQcw"><span style="font-size: 12pt; font-family: &quot;Times New Roman&quot;; color: rgb(0, 0, 0); background-color: transparent; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;"><span style="border:none;display:inline-block;overflow:hidden;width:59px;height:60px;"><img src="https://lh6.googleusercontent.com/s9W_iuqDskGYArSoaWmMk5I28zFZCCvnETFlD-3jYTxZ4tYWULEFafgmS3FgrTWM4kd2qNv6C8iXxxu4qPH8zEPRfS9VUfSsdjDU8tge9Get8XDma9p6noph2-gW9VEg2VJJ2EvmBEvpe6LE9vHzm1NskYZv_P8kPCSkKRY_X_4fg1qpt0JCyCnyvXTiYw" width="59" height="60" style="margin-left:0px;margin-top:0px;"></span></span></a> </p> </td> <td style="border-left:solid #d5d5d5 0.75pt;vertical-align:top;padding:0pt 0pt 0pt 15pt;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.7999999999999998;margin-top:0pt;margin-bottom:0pt;"> <span style="font-size: 9pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); background-color: transparent; font-style: italic; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">&nbsp;</span> </p> <div dir="ltr" style="margin-left:0pt;" align="left"> <table style="border:none;border-collapse:collapse;"> <colgroup> <col width="177"> </colgroup> <tbody> <tr style="height:13pt"> <td style="vertical-align:top;padding:0pt 0pt 4pt 0pt;overflow:hidden;overflow-wrap:break-word;"> <p dir="ltr" style="line-height:1.3800000000000001;margin-top:0pt;margin-bottom:0pt;"> <span style="font-size: 9pt; font-family: &quot;Google Sans&quot;, sans-serif; color: rgb(0, 0, 0); font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;">Equipe de Soluções Técnicas do Google</span></p> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div><br> </td> </tr> </tbody> </table> </div> <p dir="auto" style=""><span style="font-style: italic;">Código de referência – <b>${g_id_case}</b></span></p> <p dir="ltr" style="font-weight: normal;"><span style="font-style: italic;">Não remova o código de referência para que possamos responder mais rapidamente. Obrigado,</span></p> <p dir="ltr" style="font-weight: normal;"><span style="font-style: italic;">&nbsp;</span></p> <p dir="auto" style="font-weight: normal;"><span style="font-weight: bold; font-style: italic;">Termos</span><span style="font-style: italic;">: ao responder a esta mensagem, você autoriza o especialista em implementação do Google a fornecer orientações quanto à instalação do&nbsp;</span><b>${g_tasks}&nbsp;</b><span style="font-style: italic;">no seu site e/ou campanha e/ou conta do Google Analytics, conforme necessário. Você confirma e reconhece que todas as alterações sugeridas e/ou implementadas pelo Google devem ser realizadas por sua conta e risco. O Google não garante nem promete resultados decorrentes da implementação dessas alterações. Além disso, o Google não será responsável por eventuais efeitos dessas mudanças, o que inclui, sem limitação, qualquer aumento nos gastos relacionados às campanhas do Google Ads, pelos quais você terá total responsabilidade. Você também concorda em validar se o site continua funcionando conforme o esperado.</span></p> <p dir="auto" style="font-weight: normal;"><span style="font-weight: bold; font-style: italic;">Observação</span><span style="font-style: italic;">: recomendamos que você faça o backup completo do seu site antes de realizar alterações. Além disso, você NÃO deve compartilhar as credenciais do site comigo ou com outras pessoas do Google. Por fim, fazer alterações no seu website / conta enquanto trabalhamos na solicitação pode causar a perda de algumas alterações / configurações. Aconselhamos que você não faça alterações no seu site / conta até a conclusão das implementações recomendadas.</span></p> </div>`
}

// Adiciona o email do cliente como destinatário
function setCustumerEmail() {
    document.querySelector('span[class*="button-text"]').click()
    setTimeout(function() {
        Array.from(document.querySelectorAll('span[class*="label"]')).filter(function(e) {
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
    waitForElemente('[buttoncontent][class*="address"]').then((elm)=>{
        console.log('[+] techincal')
        elm.click()
    }
    );

    waitForElemente('[id="email-address-id--technical-solutions@google.com"]').then((elm)=>{
        console.log('[+] techincal 2')
        elm.click()
    }
    );
}

// Retorna o conteúdo do email a ser editado
function myCase() {
    return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).pop()
}

// Salva a edição realizada
function saveDraft() {
    Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function(e) {
        return e.matches('[aria-label="Email body"]')
    })[0].focus()
    document.execCommand('insertText', false, ' ')
}

document.querySelector('[debug-id="dock-item-home"]').click()
var g_agent_name = returnName()
var g_phoneNumber = returnPhone()
var g_id_case = document.querySelector('[src="https://pulse-tracker.corp.google.com/tracking_script.js"]').getAttribute('data-case-id')
var g_client_name = document.querySelector('title').innerText.split(' ')[1]
var g_website = Array.from(document.querySelectorAll('[href*="google"][target="_blank"]'))[0].innerText
//var g_website = Array.from(document.querySelectorAll('cuf-form-field')).filter(function (e) { return e.innerText.includes('Website') })[0].innerText.split('\n')[1]
var g_appointment = g_Appointment()
var g_tasks = Array.from(document.querySelectorAll('cuf-form-field')).filter(function(e) {
    return e.innerText.includes('Tasks')
})[0].innerText.split('\n').slice(1,3).join(', ')

setCustumerEmail()
setTimeout(function() {
    emailInMenu()
    setTimeout(function() {
        var g_template = returnTemplate()
        technicalSolutions()
        console.log(g_agent_name)
        myCase().innerHTML = g_template
        saveDraft()
    }, 1500)
}, 500)
