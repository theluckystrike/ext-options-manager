# ext-options-manager

> Build Chrome extension options pages from a schema -- form generation, validation, and chrome.storage sync included.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Install

```bash
npm install ext-options-manager
```

## Usage

```typescript
import { OptionsManager } from 'ext-options-manager';

const options = new OptionsManager({
  storageKey: 'settings',
  fields: [
    {
      id: 'theme',
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      defaultValue: 'light',
    },
    {
      id: 'notifications',
      type: 'checkbox',
      label: 'Enable notifications',
      defaultValue: true,
    },
    {
      id: 'apiKey',
      type: 'text',
      label: 'API Key',
      description: 'Your personal API key',
      validation: { required: true },
    },
    {
      id: 'maxResults',
      type: 'number',
      label: 'Max results',
      defaultValue: 10,
      validation: { min: 1, max: 100 },
    },
  ],
  onChange: (values) => {
    console.log('Settings saved:', values);
  },
});

// In your options page script:
document.getElementById('app')!.innerHTML = options.renderForm();
options.init();
```

The generated form includes a **Save** button and a **Reset to Defaults** button. Saved values are persisted to `chrome.storage.sync` under the key you specify.

## API

### `OptionsManager`

**Constructor**: `new OptionsManager(config)`

`config` fields:

| Property | Type | Description |
|----------|------|-------------|
| `storageKey` | `string` | Key used in `chrome.storage.sync` to store all settings. |
| `fields` | `OptionField[]` | Array of field definitions (see below). |
| `onChange` | `(values) => void` | Optional callback fired after settings are saved. |

**Methods**:

| Method | Returns | Description |
|--------|---------|-------------|
| `renderForm()` | `string` | Generate the full HTML for the options form (includes Save and Reset buttons). |
| `init(formId?)` | `Promise<void>` | Attach event handlers and load saved values into the form. `formId` defaults to `'options-form'`. |
| `load()` | `Promise<Record<string, any>>` | Load the current settings from `chrome.storage.sync`. |
| `save(values)` | `Promise<void>` | Write settings to `chrome.storage.sync`. |

### `OptionField`

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique field identifier (used as the form element `name`). |
| `type` | `'text'` \| `'textarea'` \| `'checkbox'` \| `'select'` \| `'number'` \| `'color'` | Input type to render. |
| `label` | `string` | Human-readable label shown next to the input. |
| `description` | `string?` | Optional help text displayed below the field. |
| `defaultValue` | `any?` | Default value used on reset and for initial state. |
| `options` | `{ value, label }[]?` | Choices for `select` fields. |
| `validation` | `{ required?, min?, max?, pattern? }?` | Optional validation constraints. |

## License

MIT
