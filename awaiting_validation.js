function saveDraft() {
    Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function (e) {
        return e.matches('[aria-label="Case Note"]')
    })[0].focus()
    document.execCommand('insertText', false, ' ')
}

var g_my_note = `<p><strong>Date:</strong>&nbsp;01/03/2023</p>\n<p><strong>Speakeasy ID:</strong></p>\n<p><strong>Substatus:</strong> NI - Awaiting Validation</p>\n<p><strong>Reason/Comments</strong>: Need to check for new conversions</p>\n<p><strong>On Call:</strong> Configuramos as conversões otimizadas na conversão de envio de formulário. O procedimento foi feito utilizando o GTM.</p>\n<p dir="auto"><strong>Screenshots:</strong></p>`
document.querySelector('[aria-label="Case Note"]').innerHTML = g_my_note
saveDraft()
