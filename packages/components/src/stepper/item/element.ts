import { html, LitElement, PropertyValues } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import {
  anchorSlotStyles,
  attachInternals,
  baseStyles,
  interactionClick,
  interactionSelect,
  stateDisabled,
  stateSelected,
  typeAnchor
} from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

const statusIcon = {
  undefined: 'info',
  accent: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error'
};

/**
 * @element bp-stepper-item
 * @since 1.0.0
 * @slot - item content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --cursor
 * @cssprop --border-width
 * @cssprop --padding
 * @cssprop --status-color
 * @part icon
 * @part badge
 */
@typeAnchor<BpStepperItem>()
@stateSelected<BpStepperItem>()
@stateDisabled<BpStepperItem>()
@interactionSelect<BpStepperItem>()
@interactionClick<BpStepperItem>()
export class BpStepperItem extends LitElement {
  /** determine the visual status state */
  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  /** selected visual state */
  @property({ type: Boolean }) selected = false;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** makes the element not mutable, meaning the user can not interact with button */
  @property({ type: Boolean, reflect: true }) readonly: boolean;

  /** @private */
  @state() _layout: 'horizontal' | 'vertical' = 'horizontal';

  /** @private */
  @state() _index: number;

  static styles = [baseStyles, anchorSlotStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot name="badge">
          ${this.status
            ? html`<bp-icon
                part="icon"
                type="solid"
                .status=${this.status}
                .shape=${statusIcon[this.status]}
                size="sm"></bp-icon>`
            : html`<bp-badge part="badge">${this._index}</bp-badge>`}
        </slot>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'listitem';
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this._internals.states.delete(`--layout-${props.get('_layout')}`);
    this._internals.states.add(`--layout-${this._layout}`);
  }
}
