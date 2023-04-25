import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { TypeFormControl, TypeFormControlController } from '../controllers/type-form-control.controller.js';

export interface FormControl extends TypeFormControl {} // eslint-disable-line @typescript-eslint/no-empty-interface

export class FormControl extends LitElement {
  @property({ type: String }) value: string | number | FormData | File = null;

  @property({ type: Boolean, reflect: true }) disabled: boolean;

  @property({ type: Boolean, reflect: true }) required: boolean;

  @property({ type: Boolean, reflect: true }) readonly?: boolean;

  @property({ type: Boolean, reflect: true }) multiple: boolean;

  @property({ type: String, reflect: true }) autocomplete: string;

  @property({ type: String, reflect: true }) type: string;

  @property({ type: String, reflect: true }) name: string;

  @property({ type: String }) pattern: string;

  @property({ type: String }) placeholder: string;

  @property({ type: Number }) minLength: number;

  @property({ type: Number }) maxLength: number;

  @property({ type: Number }) min: number;

  @property({ type: Number }) max: number;

  @property({ type: Number }) size: number = null;

  get valueAsNumber() {
    return parseFloat(this.value as string);
  }

  set valueAsNumber(value: number) {
    this.value = `${value}`;
  }

  static formAssociated = true;

  protected typeFormControlController = new TypeFormControlController<FormControl>(this);

  protected get composedLabel() {
    return Array.from(this._internals.labels)
      .reduce((prev, label) => `${prev} ${label.textContent}`, '')
      .trim();
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'presentation';
  }

  #setValue(e: any, config = { valueType: 'string' }) {
    this.value = config.valueType === 'number' ? e.target.valueAsNumber : e.target.value;
  }

  protected onChange(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.#setValue(e, config);
    this.typeFormControlController.dispatchChange(e);
  }

  protected onInput(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.#setValue(e, config);
    this.typeFormControlController.dispatchInput(e);
  }
}
