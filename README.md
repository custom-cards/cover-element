# Cover Element

An element that shows cover/blinds control [Home Assistant](https://github.com/home-assistant/home-assistant) [picture-elements](https://www.home-assistant.io/lovelace/picture-elements/) card with dynamic toggle capability.

![Preview Image](https://github.com/yosilevy/cover-element/blob/master/docs/Cover-main.JPG?raw=true)

## Using the card

#### Card options
| Name | Type | Default | Since | Description |
|------|------|---------|-------|-------------|
| type | string | **required** | v0.1 | `custom:cover-element`
| entity | string | **required** | v0.1 | Cover entity to control.

#### Position_label object
| Name | Type | Default | Since | Description |
|------|------|---------|-------|-------------|
| show | boolean | false | v0.1 | Show the current position of the cover.
| open_text | string | open | v0.1 | Sets the text to show when cover is fully open.
| closed_text | string | closed | v0.1 | Sets the text to show when cover is fully closed.
| interim_text | string | open | v0.1 | Sets the text to show when cover is partially open.

### Example usage

<img src="https://github.com/yosilevy/cover-element/blob/master/docs/Cover-main.JPG?raw=true" width="400px" alt="Example" />

```yaml
- type: picture-elements
  image: /local/LivingRoom.jpg
  elements:
    - type: 'custom:cover-element'
      entity: cover.livingroom_terrace_shutter
      position_label:
        show: true
        open_text: open
        closed_text: closed
        interim_text: open
      style:
        top: 40%
        height: 15%
        background-color: 'rgba(255, 255, 255, 0.6)'
        width: 23%
        border-radius: 10px
        border-color: blue
        left: 53%
```

## Install

### Simple install

1. Download and copy `cover-element-bundle.js` from the [latest release](https://github.com/yosilevy/cover-element/releases/latest) into your `config/www` directory.

2. Add a reference to `cover-element-bundle.js` in lovelace.

  ```yaml
  resources:
    - url: /local/cover-element-bundle.js?v=0.1.0
      type: module
  ```
To do this, go to Configure UI -> Raw Config Editor and paste this under resources or use [YAML Mode](https://www.home-assistant.io/lovelace/yaml-mode/) (not recommended))

### CLI install

1. Move into your `config/www` directory

2. Grab `cover-element-bundle.js`

  ```console
  $ wget https://github.com/yosilevy/cover-element/releases/download/v0.1.0/cover-element-bundle.js
  ```

3. Add a reference to `cover-element-bundle.js` inside your `ui-lovelace.yaml`.

  ```yaml
  resources:
    - url: /local/cover-element-bundle.js?v=0.1.0
      type: module
  ```

### *(Optional)* Add to custom updater

1. Make sure you have the [custom_updater](https://github.com/custom-components/custom_updater) component installed and working.

2. Add a new reference under `card_urls` in your `custom_updater` configuration in `configuration.yaml`.
//todo: implement tracker
  ```yaml
  custom_updater:
    card_urls:
      - https://raw.githubusercontent.com/yosilevy/cover-element/master/tracker.json
  ```

## Updating
1. Find your `cover-element-bundle.js` file in `config/www` or wherever you ended up storing it.

2. Replace the local file with the latest one attached in the [latest release](https://github.com/yosilev/cover-element/releases/latest).

3. Add the new version number to the end of the cards reference url in your `ui-lovelace.yaml` like below.

  ```yaml
  resources:
    - url: /local/cover-element-bundle.js?v=0.1.0
      type: module
  ```

*You may need to empty the browsers cache if you have problems loading the updated card.*

## Getting errors?
Make sure you have `javascript_version: latest` in your `configuration.yaml` under `frontend:`.

Make sure you have the latest version of `cover-element-bundle.js`.

If you have issues after updating the card, try clearing your browsers cache or restart Home Assistant.

If you get "Custom element doesn't exist: cover-element" or running older browsers try replacing `type: module` with `type: js` in your resource reference, like below.

```yaml
resources:
  - url: ...
    type: js
```

## License
This project is under the Apache 2.0 license.
