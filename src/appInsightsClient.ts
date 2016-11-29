'use strict';
import * as vscode from 'vscode';

const appInsights = require("applicationinsights");

export class AppInsightsClient {
    private static _client = appInsights.getClient('e376b493-d8bb-49b8-9af2-e55e2457f8f5');
    private static _enableAppInsights = vscode.workspace.getConfiguration('extension-leaderboard').get<boolean>('enableAppInsights');

    public static sendEvent(eventName: string, properties?: { [key: string]: string; }): void {
        if (this._enableAppInsights) {
            this._client.trackEvent(eventName, properties);
        }
    }
}