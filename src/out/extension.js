const vscode = require('vscode');

/*  ----------------------------------------------------
    This js replaces the manual addition of token 
    configuration in 'settings.json'

    It uses the custom "invalid.character.prism" scope
    in prism.tmLanguage.json > invalid-character
    ----------------------------------------------------

    before:

    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "invalid.character.prism",
                "settings": {
                    "foreground": "#ff0000",
                    "fontStyle": "bold underline"
                }
            }
        ]
    }

    after:

    "prism.invalidCharacterColor": "#ff0000",
*/

function activate(context) {
    //Function to update token color rules
    function updateTokenColorCustomization() {
        const config = vscode.workspace.getConfiguration('prism');
        const invalidCharColor = config.get('invalidCharacterColor') || '#ff0000';

        //Update token color rules
        const tokenColorCustomizations = {
            "textMateRules": [
                {
                    "scope": "invalid.character.prism",
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
        if (event.affectsConfiguration('prism.invalidCharacterColor')) {
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
