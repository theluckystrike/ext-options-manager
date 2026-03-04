# ext-options-manager

[![npm version](https://img.shields.io/npm/v/ext-options-manager)](https://npmjs.com/package/ext-options-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/ext-options-manager?style=social)](https://github.com/theluckystrike/ext-options-manager)

> Build Chrome extension options pages from a schema -- form generation, validation, and chrome.storage sync included.

Part of the [Zovo](https://zovo.one) developer tools family.

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

## See Also

### Related Zovo Repositories

- [webext-options-page](https://github.com/theluckystrike/webext-options-page) - Pre-built options page template
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper
- [ext-popup-framework](https://github.com/theluckystrike/ext-popup-framework) - Popup UI framework for browser extensions
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Production-ready Chrome extension starter

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built by [Zovo](https://zovo.one)
