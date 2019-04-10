import { html, LitElement, css } from "lit-element";
import { isTiltOnly } from "./hass/cover-model";

class HuiCoverElement extends LitElement {
  constructor() {
    super();
    this._config = {};
  }

  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw Error("Invalid Configuration: 'entity' required");
    }

    if (config.tap_action) {
      throw Error("Invalid Configuration: 'tap_action' not allowed");
    }

    if (config.hold_action) {
      throw Error("Invalid Configuration: 'hold_action' not allowed");
    }

    this._config = config;
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        <hui-warning>Entity not found</hui-warning>
      `;
    }

    return html`
      <div class="content">
        ${isTiltOnly(stateObj)
          ? html`
              <ha-cover-tilt-controls
                .hass="${this.hass}"
                .stateObj="${stateObj}"
              ></ha-cover-tilt-controls>
            `
          : html`
              <ha-cover-controls
                .hass="${this.hass}"
                .stateObj="${stateObj}"
              ></ha-cover-controls>
            `}
        ${this._config.position_label && this._config.position_label.show
          ? html`
              <div class="position">
                ${this._computePosition(stateObj)}
              </div>
            `
          : html``}
      </div>
    `;
  }

  _computePosition(stateObj) {
    if (stateObj.attributes.current_position === undefined) {
      return "";
    }

    const position = stateObj.attributes.current_position;

    if (position === 0) {
      return this._config.position_label.closed_text
        ? this._config.position_label.closed_text
        : "closed";
    }
    if (position === 100) {
      return this._config.position_label.open_text
        ? this._config.position_label.open_text
        : "open";
    }
    return (
      position +
      "% " +
      (this._config.position_label.interim_text
        ? this._config.position_label.interim_text
        : "open")
    );
  }

  static get styles() {
    return css`
      @media (max-width: 400px) {
        .content {
          transform: scale(var(--narrow-scale-factor, 0.8));
          transform-origin: top;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .position {
        text-align: center;
        margin-top: var(--position-label-margin-top, -5px);
        color: var(--position-label-color);
        font-size: var(--position-label-font-size);
        font-weight: var(--position-label-font-weight);
      }
    `;
  }
}

customElements.define("cover-element", HuiCoverElement);
