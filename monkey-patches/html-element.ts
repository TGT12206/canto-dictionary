export {};

declare global {
    interface HTMLElement {
        createEl<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string): HTMLElementTagNameMap[K];    
        createDiv(className?: string): HTMLDivElement;
        empty(): void;
    }
}

Object.defineProperty(HTMLElement.prototype, 'createEl', {
    value: function<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string): HTMLElementTagNameMap[K] {
        const el = document.createElement(tag);
        this.appendChild(el);
        if (cls !== undefined) el.className = cls;
        return el;
    },
    enumerable: false,
    writable: false,
    configurable: true
});
Object.defineProperty(HTMLElement.prototype, 'createDiv', {
    value: function(this: HTMLElement, className?: string): HTMLDivElement {
        const div = document.createElement('div');
        if (className !== undefined) div.className = className;
        this.appendChild(div);
        return div;
    },
    enumerable: false,
    writable: false,
    configurable: true
});
Object.defineProperty(HTMLElement.prototype, 'empty', {
    value: function(): void {
        this.replaceChildren();
    },
    enumerable: false,
    writable: false,
    configurable: true
});