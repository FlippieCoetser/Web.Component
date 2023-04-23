const importmap = {
  imports: {
    "@browser-modules/component.library":
      "./node_modules/@browser-modules/component.library/lib/*.js",
  },
};

const injectImportmap = (importmap) => {
  const element = document.createElement("script");
  element.type = "importmap";
  element.textContent = JSON.stringify(importmap);
  document.head.appendChild(element);
};

injectImportmap(importmap);
