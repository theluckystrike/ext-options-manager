# ext-options-manager

[![npm version](https://img.shields.io/npm/v/ext-options-manager)](https://npmjs.com/package/ext-options-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI Status](https://github.com/theluckystrike/ext-options-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/ext-options-manager/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/ext-options-manager?style=social)](https://github.com/theluckystrike/ext-options-manager)

> Build Chrome extension options pages with ease.

Part of the [Zovo](https://zovo.one) family of privacy-first Chrome extensions and developer tools.

## Overview

`ext-options-manager` is a comprehensive library for building beautiful, functional options pages for Chrome extensions. It provides form generation, validation, storage integration, and more.

## Features

- ✅ **Form Generation** - Automatic form from schema
- ✅ **Validation** - Built-in validation rules
- ✅ **Storage Integration** - Chrome storage sync
- ✅ **TypeScript Support** - Fully typed for better developer experience
- ✅ **MV3 Compatible** - Works with Manifest V3 extensions
- ✅ **Responsive Design** - Mobile-friendly layouts
- ✅ **Privacy-First** - No data collection, all local

## Installation

### From npm

```bash
npm install ext-options-manager
```

### From Source

```bash
# Clone the repository
git clone https://github.com/theluckystrike/ext-options-manager.git
cd ext-options-manager

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Basic Usage

```typescript
import { OptionsManager } from 'ext-options-manager';

const options = new OptionsManager({
  storageKey: 'settings',
  fields: [
    { id: 'theme', type: 'select', label: 'Theme', 
      options: [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }],
      defaultValue: 'light' },
    { id: 'notifications', type: 'checkbox', label: 'Enable notifications', defaultValue: true },
    { id: 'apiKey', type: 'text', label: 'API Key', validation: { required: true } }
  ]
});

// In your options.html
document.getElementById('app').innerHTML = options.renderForm();
options.init();
```

### With Custom Styling

```typescript
const options = new OptionsManager({
  storageKey: 'settings',
  fields: [...],
  theme: 'dark',
  onSave: (values) => {
    console.log('Settings saved:', values);
  }
});
```

## Field Types

| Type | Description |
|------|-------------|
| `text` | Text input |
| `textarea` | Multi-line text |
| `number` | Number input |
| `checkbox` | Boolean toggle |
| `select` | Dropdown selection |
| `radio` | Radio button group |
| `color` | Color picker |
| `range` | Slider input |

## API Reference

### OptionsManager

| Method | Description |
|--------|-------------|
| `renderForm()` | Render the form HTML |
| `init()` | Initialize form handlers |
| `getValues()` | Get current form values |
| `setValues(values)` | Set form values |
| `reset()` | Reset to defaults |
| `validate()` | Validate form |

## Related Packages

This package is part of the Zovo extension options ecosystem:

- [ext-options-page](https://github.com/theluckystrike/ext-options-page) - Options page wrapper
- [ext-options-page-ui](https://github.com/theluckystrike/ext-options-page-ui) - UI components for options
- [ext-settings-manager](https://github.com/theluckystrike/ext-settings-manager) - Settings management

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/options-improvement`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/options-improvement`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/ext-options-manager.git
cd ext-options-manager

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [zovo-extension-template](https://github.com/theluckystrike/zovo-extension-template) - Boilerplate for building privacy-first Chrome extensions
- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - Comprehensive TypeScript type definitions for browser extensions
- [zovo-permissions-scanner](https://github.com/theluckystrike/zovo-permissions-scanner) - Privacy scanner for Chrome extensions
- [zovo-indexer](https://github.com/theluckystrike/zovo-indexer) - Indexing service for Zovo extensions

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT - [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
