function saveDraft() {
    Array.from(document.querySelectorAll('[contenteditable="true"]')).filter(function (e) {
        return e.matches('[aria-label="Case Note"]')
    })[0].focus()
    document.execCommand('insertText', false, ' ')
}

var g_my_note = `<p><strong>Date:</strong>&nbsp;01/03/2023</p><p><strong>Substatus:</strong>&nbsp;SO - Verified</p><p><strong>Speakeasy:</strong></p><p><strong>Reason/Comments:</strong>&nbsp;New conversions were recorded. |||||&nbsp; There are tags that still have the status "no recent conversion"</p><p><strong>On call:</strong></p><p><strong>Tags Implemented:</strong>&nbsp;Ads Enhanced Conversions</p><p dir="auto">\n\n\n\n\n\n</p><p dir="auto"><strong>Screenshots:</strong></p>`
document.querySelector('[aria-label="Case Note"]').innerHTML = g_my_note
saveDraft()
