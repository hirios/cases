function saveDraft() {
    Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function (e) {
        return e.matches('[aria-label="Case Note"]')
    })[0].focus()
    document.execCommand('insertText', false, ' ')
}

var g_my_note = `<p><strong>Date:</strong>&nbsp;01/03/2023</p><p><strong>Speakeasy ID:</strong></p><p><strong>Substatus:</strong>&nbsp;IN - Not Reachable</p><p><strong>Reason/Comments</strong>: NRP</p><p><strong>On Call:</strong>&nbsp;Fiz duas tentativas de contato por ligação, enviei o email com o link da meet, aguardei 10 minutos e tentei outro contato por ligação, porém, não obtive retorno.</p><p>\n\n\n\n\n</p><p dir="auto"><strong>Screenshots:</strong></p>`
document.querySelector('[aria-label="Case Note"]').innerHTML = g_my_note
saveDraft()
