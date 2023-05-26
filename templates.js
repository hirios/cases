async function setLanguage(language) {
    print('[+] Setando linguagem...');
    let outFocus = document.querySelector('[aria-label="Locale"]').dispatchEvent(new Event('focus', { bubbles: true }));
    if (outFocus) {
        print('[+] Case Languge setado focus')
        print('[+] Aguardando opções de linguagens');
        await waitForElemente('[aria-label="Locale"] material-select-dropdown-item ~ material-select-dropdown-item').then(async () => {
            let option = Array.from(document.querySelectorAll('material-select-dropdown-item')).find(e => e.innerHTML.includes(language));
            if (option) {
                option.click();
                await sleep(1000).then(function () {
                    if (document.querySelector('[aria-label="Locale"]').value === language) {
                        print('[+] Linguagem setada com sucesso')
                    }
                    else {
                        print('[-] Error ao setar linguagem')
                        throw new Error('[-] Error ao setar linguagem');
                    }
                })
            }
        })
    };
}

async function sendTemplate(hotKay) {
    let menu = document.querySelector('[role="menu"]') || document.querySelector('[aria-label="Create a write card"]')
    menu.dispatchEvent(new Event('focus', { 'bubbles': true }))

    // Aguara o botão de criar email aparecer e faz o clique
    await waitForElemente('[aria-label="Create new email"]').then(async (botaoEmail) => {
        botaoEmail.click()

        // Remove trechos do email padrão
    }).then(async () => {
        await waitForElemente('compose-card-content-wrapper #email-body-content').then(async (email) => {
            await sleep(500)
            email.innerText = '';
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
                await waitForElemente('dynamic-component[class*="dynamic-item"]:nth-child(1)').then(async (matchCR) => {
                    matchCR.click()
                })
            })
        })
    })

}
