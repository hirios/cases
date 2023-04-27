async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function waitForElemente(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
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

async function sendTemplate(hotKay) {
    let menu = document.querySelector('[role="menu"]') || document.querySelector('[aria-label="Create a write card"]')
    menu.dispatchEvent(new Event('focus', { 'bubbles': true }))

    // Aguara o botão de criar email aparecer e faz o clique
    await waitForElemente('[aria-label="Create new email"]').then(async (botaoEmail) => {
        botaoEmail.click()

    // Remove trechos do email padrão
    }).then(async () => {
        await waitForElemente('#email-body-content').then(async () => {
            await sleep(500)
            const email = document.querySelectorAll('#email-body-content');
            email[email.length - 1].innerText = '';
        })

    // Depois de clicado aguarda o botão do CR aparecer e clica nele
    }).then(async () => {
        await waitForElemente('[aria-label="Insert canned response"][role="button"][animated="true"][aria-disabled="false"]').then(async (botaoCR) => {
            botaoCR.click()

        }).then(async () => {
            await waitForElemente('search-panel[debug-id="search-panel"] input').then(async (searchElement) => {
                searchElement.click()

            }).then(async () => {
                await waitForElemente('search-panel input[aria-owns]').then(async (searchInput) => {
                    searchInput.value = hotKay
                    document.execCommand('insertText', false, ' ')                    
                })
                
            }).then(async () => {
                await waitForElemente('dynamic-component[class*="dynamic-item"]').then(async (matchCR) => {
                    matchCR.click()
                })
            })
        })
    })

}

sendTemplate('ts as new')
