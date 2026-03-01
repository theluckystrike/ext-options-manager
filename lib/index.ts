/**
 * ext-options-manager - Options page manager for Chrome extensions
 */

export interface OptionField {
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

export interface OptionsConfig {
  fields: OptionField[];
  storageKey: string;
  onChange?: (values: Record<string, any>) => void;
}

export class OptionsManager {
  private config: OptionsConfig;
  private form: HTMLFormElement | null = null;

  constructor(config: OptionsConfig) {
    this.config = config;
  }

  /**
   * Generate HTML for the options form
   */
  renderForm(): string {
    const fields = this.config.fields.map(field => this.renderField(field)).join('\n');
    
    return `
      <form id="options-form">
        ${fields}
        <button type="submit">Save</button>
        <button type="button" id="reset-btn">Reset to Defaults</button>
      </form>
    `;
  }

  private renderField(field: OptionField): string {
    const required = field.validation?.required ? 'required' : '';
    
    switch (field.type) {
      case 'checkbox':
        return `
          <div class="field-group">
            <label>
              <input type="checkbox" name="${field.id}" ${field.defaultValue ? 'checked' : ''}>
              ${field.label}
            </label>
            ${field.description ? `<p class="description">${field.description}</p>` : ''}
          </div>
        `;
        
      case 'select':
        const options = field.options?.map(o => 
          `<option value="${o.value}" ${o.value === field.defaultValue ? 'selected' : ''}>${o.label}</option>`
        ).join('');
        return `
          <div class="field-group">
            <label for="${field.id}">${field.label}</label>
            <select name="${field.id}" id="${field.id}">
              ${options}
            </select>
            ${field.description ? `<p class="description">${field.description}</p>` : ''}
          </div>
        `;
        
      case 'textarea':
        return `
          <div class="field-group">
            <label for="${field.id}">${field.label}</label>
            <textarea name="${field.id}" id="${field.id}" ${required}>${field.defaultValue || ''}</textarea>
            ${field.description ? `<p class="description">${field.description}</p>` : ''}
          </div>
        `;
        
      default:
        return `
          <div class="field-group">
            <label for="${field.id}">${field.label}</label>
            <input type="${field.type}" name="${field.id}" id="${field.id}" 
                   value="${field.defaultValue || ''}" ${required}>
            ${field.description ? `<p class="description">${field.description}</p>` : ''}
          </div>
        `;
    }
  }

  /**
   * Initialize form handlers
   */
  async init(formId: string = 'options-form'): Promise<void> {
    this.form = document.getElementById(formId) as HTMLFormElement;
    if (!this.form) return;
    
    // Load saved values
    const saved = await this.load();
    Object.entries(saved).forEach(([key, value]) => {
      const input = this.form?.querySelector(`[name="${key}"]`) as HTMLInputElement;
      if (input) {
        if (input.type === 'checkbox') {
          input.checked = Boolean(value);
        } else {
          input.value = String(value);
        }
      }
    });
    
    // Save on submit
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(this.form!);
      const values: Record<string, any> = {};
      formData.forEach((value, key) => {
        const input = this.form?.querySelector(`[name="${key}"]`) as HTMLInputElement;
        values[key] = input?.type === 'checkbox' ? input.checked : value;
      });
      await this.save(values);
      this.config.onChange?.(values);
    });
    
    // Reset button
    document.getElementById('reset-btn')?.addEventListener('click', async () => {
      const defaults: Record<string, any> = {};
      this.config.fields.forEach(f => defaults[f.id] = f.defaultValue);
      await this.save(defaults);
      location.reload();
    });
  }

  async load(): Promise<Record<string, any>> {
    return new Promise(resolve => {
      chrome.storage.sync.get(this.config.storageKey, result => {
        resolve(result[this.config.storageKey] || {});
      });
    });
  }

  async save(values: Record<string, any>): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.sync.set({ [this.config.storageKey]: values }, resolve);
    });
  }
}

export default OptionsManager;
