import { waitForElement } from "../../scripts/waitForElement.js";

const Indicator = {
	updatePos: async (btnPos) => {
		var indicator = document.querySelector('.activeIndicator')

		indicator.style.top = `${btnPos.y}px`
		indicator.style.left = `${btnPos.x - 4}px`
	},
	autoUpdatePos: async() => {
		Indicator.updatePos(document.querySelector('[class*="pagedsettings_Active_"]').getBoundingClientRect())
	}
}

async function initJQuery() {
	return new Promise((resolve, reject) => {
		document.head.appendChild(Object.assign(document.createElement('script'), { 
			type: 'text/javascript', 
			src: 'https://code.jquery.com/jquery-3.6.0.min.js',
			onload: () => resolve()
		}))
	})
}

/* When the persona status changes, update it on the settings header */
async function registerPersonaMessages() {
    function updateState(status, col) {
        $('#accountStatus').text(status).css({
            color: col
        })
    }
    window.opener.SteamClient.Messaging.RegisterForMessages("PersonaState", (e, type, n) => {
        if (type == "PersonaUpdate") {
            let event = JSON.parse(n)

            switch (event) {
                case 0: { updateState('Offline', '#6B6B6B'); break; }
                case 1: { updateState('Online', '#5ABCE9'); break; }
                case 7: { updateState('Invisible', '#6B6B6B'); break; }
                case 3: { updateState('Away', '#4C91AC'); break; }
            }
        }
    })
}

async function removeDeveloperTab() {
	$('[class*="pagedsettings_PagedSettingsDialog_PageListItem"] [class*="pagedsettings_PageListItem_Title_"]').each(function() {
		if ($(this).text() === 'Developer') {
			$(this).parent('div').remove();
		}
	});
}

async function initAccountDetails() {
    // SteamClient.Browser.OpenDevTools()

    waitForElement('[class*="pagedsettings_PagedSettingsDialog_PageListColumn_"]').then(async (_, element) => {
        const container = $('[class*="pagedsettings_PagedSettingsDialog_Title_"]')
        container.text('') // remove Steam Settings Header

        registerPersonaMessages()
		removeDeveloperTab()
        //ping steam and ask for current persona
        window.opener.SteamClient.Messaging.PostMessage("PersonaState", "RequestPersonaState", "{}")

		var account_info_container = $('<div>', {
			id: 'accountContainer',
			css: { display: 'flex', alignItems: 'center', padding: '11px', borderRadius: '6px', marginLeft: '-18px', marginRight: '-9px', }
		})
		.hover(
			() => $(account_info_container).css({ background: '#2D2D2D' }),
			() => $(account_info_container).css({ background: 'initial' }) 
		).append(
			$('<img>', {
				css: { width: '60px', borderRadius: '50px', marginRight: '10px' }
			})
		).append(
			$('<div>', {
				id: 'accountDetails',
				css: { textTransform: 'none', color: 'white', fontWeight: 'normal' }
			}).append(
				$('<div>', {
					id: 'accountPersona', text: '...',
					css: { fontSize: '14px' }
				})
			).append(
				$('<div>', {
					id: 'accountStatus', text: 'Offline',
					css: { fontSize: '12px' }
				})
			)
		);
		container.append(account_info_container)

        window.opener.SteamClient.User.GetLoginUsers().then(user => {
			$('#accountPersona').text(user[0].personaName)
			$('#accountContainer img').attr({ 
				src: user[0].avatarUrl, alt: user[0].personaName
			})
			//Indicator.autoUpdatePos()
		})
    })
};

const init = {
	settings: () => {
		SteamClient.Window.SetMinSize(1050, 820)

		initJQuery().then(() => {
			initAccountDetails()

			//allow skinning of the dropDown feilds, paste in console
			//document.querySelector('.gamepaddialog_FieldChildrenInner_3N47t').addEventListener('click', () => setTimeout(() => {debugger;}, 1000))

			const sidebar = $('[class*="pagedsettings_PagedSettingsDialog_PageList_"]')

			sidebar.append($('<div>', {
				class: 'activeIndicator',
				css: {
					top: '153px', 
					left: '12px'
				}
			}));
			$('[class*="pagedsettings_PagedSettingsDialog_PageListItem_"]').each(function(index, button) {
				$(button).on('click', () => {
					Indicator.updatePos($(button)[0].getBoundingClientRect());
				});
			});
			sidebar[0].addEventListener('scroll', (event) => Indicator.autoUpdatePos())	
		})
	},
	properties: () => {
		initJQuery().then(() => {
			const sidebar = $('[class*="pagedsettings_PagedSettingsDialog_PageList_"]')

			sidebar.append($('<div>', {
				class: 'activeIndicator',
				css: {
					top: '81px', 
					left: '12px'
				}
			}));
			$('[class*="pagedsettings_PagedSettingsDialog_PageListItem_"]').each(function(index, button) {
				$(button).on('click', () => {
					Indicator.updatePos($(button)[0].getBoundingClientRect());
				});
			});
			sidebar[0].addEventListener('scroll', (event) => Indicator.autoUpdatePos())	
		})
	}
}

async function renderer() {

	function importFile(relativePath) {
		const scriptUrl = new URL(import.meta.url);
		const basePath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/'));

		document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: `${basePath}/${relativePath}` }));
	}

	waitForElement('[class*="settings_DesktopPopup_"]').then(({matchedElements}) => {
		importFile('./settings/Settings.css')

		init.settings()
	});
	waitForElement('[class*="appproperties_AppProperties_"]').then(({matchedElements}) => {
		importFile('./properties/Properties.css')

		init.properties()
	});
}

//init settings renderer
renderer()