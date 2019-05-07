import { HassUtils } from "./hass/hass-utils";
import { isTiltOnly } from "./hass/cover-model";

class HuiCoverElement extends HassUtils.LitElement {
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
      return HassUtils.LitHtml``;
    }

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return HassUtils.LitHtml`
        <hui-warning>Entity not found</hui-warning>
      `;
    }

    return HassUtils.LitHtml`
      <div class="content">
        ${
          isTiltOnly(stateObj)
            ? HassUtils.LitHtml`
              <ha-cover-tilt-controls
                .hass="${this.hass}"
                .stateObj="${stateObj}"
              ></ha-cover-tilt-controls>
            `
            : HassUtils.LitHtml`
              <ha-cover-controls
                .hass="${this.hass}"
                .stateObj="${stateObj}"
              ></ha-cover-controls>
            `
        }
        ${
          this._config.position_label && this._config.position_label.show
            ? HassUtils.LitHtml`
              <div class="position">
                ${this._computePosition(stateObj)}
              </div>
            `
            : HassUtils.LitHtml``
        }
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
    return HassUtils.LitCSS`
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
