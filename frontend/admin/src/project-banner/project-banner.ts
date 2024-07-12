import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js';
import { ConfigurationService } from '../service/configuration';
import { retroCompat, textColors, row } from '../styles'

@customElement('alfio-project-banner')
export class ProjectBanner extends LitElement {

    @property({ type: String, attribute: 'data-full-banner' })
    fullBanner?: 'true' | 'false';

    @property({ type: String, attribute: 'data-alfio-version' })
    alfioVersion?: string;

    static styles = [
        retroCompat,
        textColors,
        row,
        css` :host { --alfio-row-cols: 3 }`
    ];

    render() {
        const notFullBanner = () => html`
            <div>
               
            </div>
        `;

        const fullBanner = () => html`
            <div>
                
            </div>
        `;

        return html`${when(this.fullBanner === 'true', fullBanner, notFullBanner)}`;
    }

    async dismiss() {
        try {
            await ConfigurationService.update({ key: 'SHOW_PROJECT_BANNER', value: 'false' });
            this.fullBanner = 'false';
            window.location.reload();
        } catch (e) {
            console.log('error while updating...');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'alfio-project-banner': ProjectBanner
    }
}