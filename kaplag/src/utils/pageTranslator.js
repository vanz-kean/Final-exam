// Page translation utility - translates text nodes in the DOM
// This can be used to translate the entire page without modifying components

import { translations } from '../context/TranslationContext.jsx';

/**
 * Translates all text nodes in the document body
 * @param {string} targetLang - Target language ('tl' for Tagalog, 'en' for English)
 */
export const translatePage = (targetLang) => {
  if (targetLang === 'en') {
    // For English, we'd need to store original texts - for now just reload
    window.location.reload();
    return;
  }

  const dict = translations;
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip script, style, and hidden elements
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, noscript, [data-no-translate]')) {
          return NodeFilter.FILTER_REJECT;
        }
        // Skip empty or whitespace-only text nodes
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        // Skip nodes that are already translated (have data-original attribute)
        if (parent.hasAttribute('data-original')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node);
    node = walker.nextNode();
  }

  textNodes.forEach(textNode => {
    const originalText = textNode.textContent.trim();
    if (!originalText) return;

    // Find translation
    const translated = dict[originalText];
    if (translated && translated !== originalText) {
      // Store original for potential revert
      textNode.parentElement.setAttribute('data-original', originalText);
      textNode.textContent = textNode.textContent.replace(originalText, translated);
    }
  });
};

/**
 * Reverts page to original English
 */
export const revertPage = () => {
  const elements = document.querySelectorAll('[data-original]');
  elements.forEach(el => {
    const original = el.getAttribute('data-original');
    if (original) {
      // Find the text node and revert
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        null
      );
      let node = walker.nextNode();
      while (node) {
        if (node.textContent.includes(el.getAttribute('data-translated') || '')) {
          node.textContent = node.textContent.replace(
            el.getAttribute('data-translated') || '',
            original
          );
        }
        node = walker.nextNode();
      }
      el.removeAttribute('data-original');
      el.removeAttribute('data-translated');
    }
  });
};

/**
 * Translates specific element and its children
 * @param {HTMLElement} element - Root element to translate
 * @param {string} targetLang - Target language
 */
export const translateElement = (element, targetLang) => {
  if (targetLang === 'en') {
    revertElement(element);
    return;
  }

  const dict = translations;
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, noscript, [data-no-translate]')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.hasAttribute('data-original')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node);
    node = walker.nextNode();
  }

  textNodes.forEach(textNode => {
    const originalText = textNode.textContent.trim();
    if (!originalText) return;

    const translated = dict[originalText];
    if (translated && translated !== originalText) {
      textNode.parentElement.setAttribute('data-original', originalText);
      textNode.parentElement.setAttribute('data-translated', translated);
      textNode.textContent = textNode.textContent.replace(originalText, translated);
    }
  });
};

/**
 * Reverts a specific element to original
 * @param {HTMLElement} element - Root element to revert
 */
export const revertElement = (element) => {
  const elements = element.querySelectorAll('[data-original]');
  elements.forEach(el => {
    const original = el.getAttribute('data-original');
    const translated = el.getAttribute('data-translated');
    if (original && translated) {
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        null
      );
      let node = walker.nextNode();
      while (node) {
        if (node.textContent.includes(translated)) {
          node.textContent = node.textContent.replace(translated, original);
        }
        node = walker.nextNode();
      }
    }
    el.removeAttribute('data-original');
    el.removeAttribute('data-translated');
  });
};

/**
 * Auto-translate on language change - can be called from a React effect
 * @param {string} language - Current language
 * @param {HTMLElement} rootElement - Root element to translate (default: document.body)
 */
export const autoTranslate = (language, rootElement = document.body) => {
  if (language === 'tl') {
    translateElement(rootElement, 'tl');
  } else {
    revertElement(rootElement);
  }
};

export default {
  translatePage,
  revertPage,
  translateElement,
  revertElement,
  autoTranslate,
};