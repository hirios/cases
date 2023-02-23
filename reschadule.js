function saveDraft() {
    Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function (e) {
        return e.matches('[aria-label="Case Note"]')
    })[0].focus()
    document.execCommand('insertText', false, ' ')
}

var g_my_note = `'<p><strong>Date:</strong>&nbsp;01/03/2023</p>\n<p><strong>Speakeasy:</strong></p>\n<p><strong>Substatus:</strong>&nbsp;AS - Reschedule 1</p>\n<p><strong>Reason/Comments:</strong>&nbsp;Customer requested rescheduling</p>\n<p><strong>On call:</strong>&nbsp;Cliente solicitou o reagendamento da consultoria</p>\n<p dir="auto"><strong>Screenshot:</strong></p><p dir="auto"><strong><br></strong></p>'`
document.querySelector('[aria-label="Case Note"]').innerHTML = g_my_note
saveDraft()
