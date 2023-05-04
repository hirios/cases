var emailList = [
    '-',
    'NRP - SO - IN Not Reachable ',
    'New - Confirmation Email',
    'AS - Work in Progress',
    'AS - Reschedule 1',
    'AS - Acceptable Reschedule',
    'AS - Agent Reschedule',
    'NI - Awaiting Inputs',
    'NI - In Consult',
    'NI - Awaiting Validation',
    'NI - Attempted Contact',
    'NI - Other',
    'IN - Infeasible',
    'IN - Not Reachable',
    'IN - Not Interested',
    'IN - Not Ready',
    'IN - Out of Scope - Rerouted to Internal Team',
    'IN - Out of Scope - Unable to Transfer',
    'IN - Out of Scope - Email to Seller',
    'IN - Other',
    'SO - Verified',
    'SO - Verified No Recent Conversion',
    'SO - Unverified',
    'SO - Verification Not Needed',
  ];
  
  var hotkeystr = [
    '-',
    'ts no res',
    'ts as new',
    '-',
    'ts as resched1',
    'ts as reschedok',
    'ts as reschedok',
    'ts ni ai',
    'ts ni ic',
    'ts ni av',
    'ts ni ac',
    'ts ni oth',
    'ts in inf',
    'ts in nrch',
    'ts in ni',
    'ts in nrdy',
    'ts in oost',
    'ts in oosu',
    'ts in oos seller',
    'ts in oth',
    'ts so verif',
    'ts so verif nrc',
    'ts so unv',
    'ts so vnn',
  ];

var verboseCase = true

function getSubstatus() {
    let lastCase = Array.from(document.querySelectorAll('case-message-view')).pop()
    let allBolds = Array.from(lastCase.querySelector('div[class^="message-body-panel"]').querySelectorAll('b'))
    let elementSubstatus = allBolds.filter(function(bold) {
        return bold.innerText.includes('Substatus:')
    })
    let fullSubstatus = elementSubstatus[0].parentElement.innerText.split('Substatus:').pop().trim()
    return hotkeystr[emailList.indexOf(fullSubstatus)]
}

function print(string) {
    if (verboseCase) {
        console.log('%c ' + string, 'background: #185244; color: #ffffff; font-weight:bold;');
    }
}

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
            await sleep(1000)
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

setLanguage('Portuguese (Brazil)').then(() => {
    sendTemplate(getSubstatus())
})
