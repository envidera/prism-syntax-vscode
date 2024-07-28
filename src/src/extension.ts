import * as vscode from 'vscode';

/*  ----------------------------------------------------
    This TypeScript replaces the manual addition of token 
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

export function activate(context: vscode.ExtensionContext) {
    // Function to update token color rules
    function updateTokenColorCustomization() {
        const config = vscode.workspace.getConfiguration('prism');
        const invalidCharColor = config.get<string>('invalidCharacterColor') || '#ff0000';

        // Update token color rules
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

    // Update the color whenever the configuration changes
    const configurationChangeDisposable = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('prism.invalidCharacterColor')) {
            updateTokenColorCustomization();
        }
    });

    context.subscriptions.push(configurationChangeDisposable);

    // Update color upon extension activation
    updateTokenColorCustomization();
}

export function deactivate() { }
