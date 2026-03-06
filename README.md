# ext-options-manager

Schema-driven options page manager for Chrome extensions. Define your fields, get a form with save, reset, and chrome.storage.sync persistence out of the box.

INSTALL

```bash
npm install ext-options-manager
```

USAGE

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

document.getElementById('app')!.innerHTML = options.renderForm();
options.init();
```

The generated form includes Save and Reset to Defaults buttons. Saved values persist to chrome.storage.sync under the key you provide.

SUPPORTED FIELD TYPES

text, textarea, checkbox, select, number, color

Each field accepts an optional description string shown below the input, an optional defaultValue, and optional validation constraints (required, min, max, pattern).

Select fields take an options array of { value, label } objects.

API

OptionsManager(config)

Creates a new manager instance. The config object takes three properties.

- fields (OptionField[]) -- array of field definitions
- storageKey (string) -- the key used in chrome.storage.sync to store all settings
- onChange (function, optional) -- callback fired after settings are saved, receives the full values object

renderForm() returns string

Generates the complete HTML for the options form including Save and Reset to Defaults buttons. Inject the returned string into your options page DOM.

init(formId?) returns Promise<void>

Attaches submit and reset event handlers to the form and loads any previously saved values into the inputs. The formId parameter defaults to "options-form".

load() returns Promise<Record<string, any>>

Reads the current settings object from chrome.storage.sync.

save(values) returns Promise<void>

Writes the given values object to chrome.storage.sync under the configured storageKey.

OPTION FIELD SHAPE

```typescript
interface OptionField {
  id: string;
  type: 'text' | 'textarea' | 'checkbox' | 'select' | 'number' | 'color';
  label: string;
  description?: string;
  defaultValue?: any;
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
}
```

LICENSE

MIT

---

Built at [zovo.one](https://zovo.one)
