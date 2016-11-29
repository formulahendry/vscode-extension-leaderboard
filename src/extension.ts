'use strict';
import * as vscode from 'vscode';
import { ExtensionContentProvider } from './extensionContentProvider'
import { AppInsightsClient } from './appInsightsClient'

export function activate(context: vscode.ExtensionContext) {

    let extensionContentProvider = new ExtensionContentProvider();
    let previewUri: vscode.Uri = vscode.Uri.parse('extension-leaderboard://authority/show-extension-leaderboard');
    let registration = vscode.workspace.registerTextDocumentContentProvider('extension-leaderboard', extensionContentProvider)

    let disposable = vscode.commands.registerCommand('extension-leaderboard.showExtensionLeaderboard', () => {
        extensionContentProvider.update(previewUri);
        vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.One, 'Extension Leaderboard').then((success) => {
            AppInsightsClient.sendEvent('show', { Result: 'Success' });
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
            AppInsightsClient.sendEvent('show', { Result: 'Fail' });
        });
    });

    context.subscriptions.push(disposable, registration);
}

export function deactivate() {
}