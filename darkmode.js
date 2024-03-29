escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
  createHTML: (to_escape) => to_escape
});

var CSS = `:root {
	--primary: #732AEB;
	--surface: #232223;
	--on-surface: #ece6f9;
	--menu-surface: #646169;
	--hairline: #8c8891;
	--on-surface-variant: #efe9f9;
	--on-surface-variant-agm: #e2d8f5;
	
	/* not in use, just here for colour reference for now */
	--main-link-color: #a9a8ee;
	--ds-link: #decefa;
	--ds-text-link-resting: #a9a8ee;
	--ds-text-highEmphasis: #decefa;
	--ds-text-subtlest: #efe9f9;
	--ds-text: #decefa;
	--ds-text-subtle: #e2d8f5;
	--ds-text-selected: #decefa;
	--ds-menu-seperator-color: #8c8891;
	--ds-background-input: #646169;
	--ds-surface-overlay: #646169;
	--ds-background-neutral: #732AEB;
	--ds-background-subtleNeutral-resting: #732AEB;
	--ds-background-neutral-hovered: #370080;
	--ds-background-neutral-subtle-hovered: #3b3b3b;
	--ds-background-selected: #646169;
	--ds-background-selected-hovered: #3b3b3b;
	--ds-border-focused: #732AEB;
	--ds-background-neutral-subtle: #232223;
	--ds-surface-raised: #646169;
	--overlay-border: 1px solid #dfe1e6;
	--border-radius: 3px;
	--ds-surface: #232223;
	--h1-text: #ece6f9;
	--menu-hover: #3b3b3b;
	--emphasis-button: #732AEB;
	--emphasis-button-hover: #6600EB;
	--emphasis-button-color: #FFF;
	--input-bg: #656266;
}
header {
	background-color: #141414 !important;
}
span[aria-label="Calendar"] * {
	color: var(--on-surface) !important;
}
svg, i, button *, ul *, div[role="menu"] * {
	color: var(--on-surface) !important;	
}
div[role="button"][aria-label="Create"] {
	background-color: var(--primary) !important;
}
div[role="button"][data-is-picker="true"] span:last-child {
	background-color: var(--primary) !important;
}
ul, div[role="menu"] {
	background-color: var(--menu-surface) !important;
}
div[role="row"] div[role="presentation"][data-dragsource-ignore="true"] div[aria-hidden="true"] div span {
	background-color: var(--primary) !important;
}
div[role="button"] span[data-is-pill="true"], button[aria-label="Respond Yes, joining virtually, selected"], button[aria-label="Respond Yes, selected"] {
	background-color: var(--primary) !important;
}
button[aria-label="Respond Maybe, selected"], a[aria-label][target="_blank"] {
	background-color: var(--primary) !important;
}
div[role="search"] label {
	background-color: var(--input-bg) !important;
	color: var(--ds-text) !important;
}

div[role="search"] input:placeholder {
	color: white !important;
}
div[data-text="Joining virtually"] ~ *, div[role="presentation"] > ul {
	background-color: transparent !important;
}`

var estilo = document.createElement('style')
estilo.type = 'text/css';
estilo.textContent = CSS
document.head.appendChild(estilo);


function replaceCaseId() {
  let textBody = document.querySelector('[data-show-working-location-actions="true"]').parentElement;
  if (textBody) {
    let caseId = document.querySelector('[data-show-working-location-actions="true"]').parentElement.innerText.match(/\d{1}-\d{13}/g).pop();
    let cases = `<a href="https://cases.connect.corp.google.com/#/case/${caseId}" target="_blank">${caseId}</a>`;
    if (!textBody.innerHTML.includes(cases)) {
      textBody.innerHTML = escapeHTMLPolicy.createHTML(textBody.innerHTML.replaceAll('Caso ' + caseId, 'Caso ' + cases));
    }
  }
}

setInterval(replaceCaseId, 500);


