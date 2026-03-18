
import { CVData } from "@/types/cv";

/**
 * Simple template renderer that handles basic object access, arrays (each), and conditionals (if).
 * Matches user request for {{placeholder}} style.
 */
export function renderTemplate(template: string, data: CVData): string {
  let rendered = template;

  // 1. Handle basic object access: {{personalInfo.fullName}}, {{summary}}, etc.
  rendered = rendered.replace(/\{\{([\w.]+)\}\}/g, (match, path) => {
    const value = getNestedValue(data, path);
    return value !== undefined ? String(value) : "";
  });

  // 2. Handle simple #if blocks
  rendered = rendered.replace(/\{\{#if ([\w.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, path, content) => {
    const value = getNestedValue(data, path);
    return !!value ? renderTemplate(content, data) : "";
  });

  // 3. Handle simple #each blocks
  // Note: This is a simplified version that assumes #each target is an array in data
  rendered = rendered.replace(/\{\{#each ([\w.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, path, content) => {
    const list = getNestedValue(data, path);
    if (!Array.isArray(list)) return "";

    return list.map((item, index) => {
      let itemContent = content;
      
      // Handle {{this}} for primitive arrays
      if (typeof item !== 'object') {
        itemContent = itemContent.replace(/\{\{this\}\}/g, String(item));
      } else {
        // Handle object item fields
        itemContent = itemContent.replace(/\{\{([\w.]+)\}\}/g, (m, fieldPath) => {
          const val = getNestedValue(item, fieldPath);
          return val !== undefined ? String(val) : "";
        });
      }

      // Handle @last helper
      itemContent = itemContent.replace(/\{\{#unless @last\}\}([\s\S]*?)\{\{\/unless\}\}/g, (m, c) => {
        return index < list.length - 1 ? c : "";
      });

      return itemContent;
    }).join("");
  });

  return rendered;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
