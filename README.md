# ext-options-manager

Build Chrome extension options pages with ease.

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
