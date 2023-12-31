/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.mts
var main_exports = {};
__export(main_exports, {
  default: () => ChangeCasePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// node_modules/.pnpm/change-case@5.0.2/node_modules/change-case/dist/index.js
function noCase(input, options) {
  return split(input, options).map(lowerFactory(options == null ? void 0 : options.locale)).join(" ");
}
var SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
var SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
var SPLIT_NUMBER_LOWER_RE = /(\d)(\p{Ll})/gu;
var SPLIT_LETTER_NUMBER_RE = /(\p{L})(\d)/gu;
var DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
var SPLIT_REPLACE_VALUE = "$1\0$2";
function split(input, options = {}) {
  let result = input.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
  if (options.separateNumbers) {
    result = result.replace(SPLIT_NUMBER_LOWER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_LETTER_NUMBER_RE, SPLIT_REPLACE_VALUE);
  }
  result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
  let start = 0;
  let end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  if (start === end)
    return [];
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split(/\0/g);
}
function camelCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  const upper = upperFactory(options == null ? void 0 : options.locale);
  const transform = pascalCaseTransformFactory(lower, upper);
  return split(input, options).map((word, index) => {
    if (index === 0)
      return lower(word);
    return transform(word, index);
  }).join("");
}
function pascalCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  const upper = upperFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(pascalCaseTransformFactory(lower, upper)).join("");
}
function pascalSnakeCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  const upper = upperFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(capitalCaseTransformFactory(lower, upper)).join("_");
}
function capitalCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  const upper = upperFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(capitalCaseTransformFactory(lower, upper)).join(" ");
}
function constantCase(input, options) {
  const upper = upperFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(upper).join("_");
}
function dotCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(lower).join(".");
}
function kebabCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(lower).join("-");
}
function pathCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(lower).join("/");
}
function sentenceCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  const upper = upperFactory(options == null ? void 0 : options.locale);
  const transform = capitalCaseTransformFactory(lower, upper);
  return split(input, options).map((word, index) => {
    if (index === 0)
      return transform(word);
    return lower(word);
  }).join(" ");
}
function snakeCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(lower).join("_");
}
function trainCase(input, options) {
  const lower = lowerFactory(options == null ? void 0 : options.locale);
  const upper = upperFactory(options == null ? void 0 : options.locale);
  return split(input, options).map(capitalCaseTransformFactory(lower, upper)).join("-");
}
function lowerFactory(locale) {
  return locale === false ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
}
function upperFactory(locale) {
  return locale === false ? (input) => input.toUpperCase() : (input) => input.toLocaleUpperCase(locale);
}
function capitalCaseTransformFactory(lower, upper) {
  return (word) => `${upper(word[0])}${lower(word.slice(1))}`;
}
function pascalCaseTransformFactory(lower, upper) {
  return (word, index) => {
    const char0 = word[0];
    const initial = index > 0 && char0 >= "0" && char0 <= "9" ? "_" + char0 : upper(char0);
    return initial + lower(word.slice(1));
  };
}

// src/commands.mts
var wrap = (id, fn) => ({
  id,
  name: fn(id + " case", { locale: false }),
  fn
});
var commands = [
  wrap("lower", (s, o) => s.toLocaleLowerCase((o == null ? void 0 : o.locale) || void 0)),
  wrap("upper", (s, o) => s.toLocaleUpperCase((o == null ? void 0 : o.locale) || void 0)),
  wrap("camel", camelCase),
  wrap("capital", capitalCase),
  wrap("constant", constantCase),
  wrap("dot", dotCase),
  wrap("kebab", kebabCase),
  wrap("no", noCase),
  wrap("pascal", pascalCase),
  wrap("pascalSnake", pascalSnakeCase),
  wrap("path", pathCase),
  wrap("sentence", sentenceCase),
  wrap("snake", snakeCase),
  wrap("train", trainCase)
];

// src/language.mts
var OBSIDIAN_LANG;
try {
  OBSIDIAN_LANG = self.localStorage.getItem("language");
} catch (e) {
}
var getLang = () => {
  let lang = OBSIDIAN_LANG;
  try {
    lang || (lang = self.navigator.language);
  } catch (e) {
  }
  return lang || void 0;
};

// src/main.mts
var normalizeSelection = ({
  anchor,
  head
}) => anchor.line < head.line ? [anchor, head] : anchor.line > head.line ? [head, anchor] : anchor.ch < head.ch ? [anchor, head] : [head, anchor];
var replaceAllSelections = (editor, fn) => {
  if (editor.somethingSelected()) {
    const locale = getLang();
    editor.transaction({
      changes: editor.listSelections().map((selection) => {
        const [from, to] = normalizeSelection(selection);
        const str = editor.getRange(from, to).normalize();
        return { from, to, text: fn(str, { locale }) };
      })
    });
  }
};
var SelectCaseModal = class extends import_obsidian.FuzzySuggestModal {
  constructor(app, editor) {
    super(app);
    this._editor = editor;
  }
  getItems() {
    return commands;
  }
  getItemText(cmd) {
    return cmd.name;
  }
  onChooseItem(cmd) {
    replaceAllSelections(this._editor, cmd.fn);
  }
};
var ChangeCasePlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.addCommand({
      id: "select",
      name: "Select from list",
      icon: "case-sensitive",
      editorCallback: (editor) => {
        const modal = new SelectCaseModal(this.app, editor);
        modal.setPlaceholder("Choose a format for the selection");
        modal.open();
      }
    });
    for (const { id, name, fn } of commands) {
      this.addCommand({
        id,
        name,
        icon: "case-sensitive",
        editorCallback: (editor) => {
          replaceAllSelections(editor, fn);
        }
      });
    }
  }
};
