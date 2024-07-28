const vscode = require('vscode');

/*  ----------------------------------------------------
    This js replaces the manual addition of token 
    configuration in 'settings.json'

    It uses the custom "invalid.character.prixm" scope
    in prixm.tmLanguage.json > invalid-character
    ----------------------------------------------------

    before:

    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "invalid.character.prixm",
                "settings": {
                    "foreground": "#ff0000",
                    "fontStyle": "bold underline"
                }
            }
        ]
    }

    after:

    "prixm.invalidCharacterColor": "#ff0000",
*/

function activate(context) {
    //Function to update token color rules
    function updateTokenColorCustomization() {
        const config = vscode.workspace.getConfiguration('prixm');
        const invalidCharColor = config.get('invalidCharacterColor') || '#ff0000';

        //Update token color rules
        const tokenColorCustomizations = {
            "textMateRules": [
                {
                    "scope": "invalid.character.prixm",
                    "settings": {
                        "foreground": invalidCharColor,
                        "fontStyle": "bold"
                    }
                }
            ]
        };

        vscode.workspace.getConfiguration('editor').update('tokenColorCustomizations', tokenColorCustomizations, vscode.ConfigurationTarget.Global);
    }


    //Update the color whenever the configuration changes
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('prixm.invalidCharacterColor')) {
            updateTokenColorCustomization();
        }
    });


    //Update color upon extension activation
    updateTokenColorCustomization();
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
