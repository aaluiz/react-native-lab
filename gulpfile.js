/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');


function getModuleStatePath() {
  const current = path.dirname(__dirname);
  return `${current}/realm/src/services/ducks/modules/`;
}

function getImgPath() {
  const current = path.dirname(__dirname);
  return `${current}/realm/src/assets/img`;
}

function getImageFiles() {
  return fs.readdirSync(getImgPath());
}

function getJsonStatesFiles() {
  const files = fs.readdirSync(getModuleStatePath());
  return files.filter((x) => x.includes('.json'));
}

function getFilesFullPath() {
  const directoryPath = getModuleStatePath();
  const files = getJsonStatesFiles();
  const filesFullPath = [];

  files.forEach((item) => {
    filesFullPath.push(`${directoryPath}${item}`);
  });
  return filesFullPath;
}

function getConteFile(file) {
  const raw = fs.readFileSync(file);
  return JSON.parse(raw);
}

function getFieldNames(state) {
  return Object.getOwnPropertyNames(state);
}

function removeLastLine(result) {
  return result.substring(0, result.lastIndexOf('\n'));
}

function generateTypes(state, file) {
  const stateName = file.replace(/^.*[\\\\/]/, '').split('.').slice(0, -1).join('.');
  const fieldNames = getFieldNames(state);
  let result = '';
  fieldNames.forEach((name) => {
    result += ` SET_${name.toUpperCase()}: '${stateName}/SET_${name.toUpperCase()}', \n`;
  });
  result = removeLastLine(result);
  return result;
}

function generateInitialState(state) {
  const fieldNames = getFieldNames(state);
  let result = '';
  fieldNames.forEach((name) => {
    const field = name.replace(/_/g, '');
    result += `${field}: ${JSON.stringify(state[name])}, \n`;
  });
  return removeLastLine(result);
}

function generateReducer(state) {
  const fieldNames = getFieldNames(state);
  let result = '';
  fieldNames.forEach((name) => {
    const field = name.replace(/_/g, '');
    result += ` case Types.SET_${name.toUpperCase()}:\n
  return produce(state, (draft) => {\n
   draft.${field} = action.payload;\n
  });\n`;
  });
  return removeLastLine(result);
}

function capitalizeFirstLetter(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function generateCreator(state) {
  const fieldNames = getFieldNames(state);
  let result = '';
  fieldNames.forEach((name) => {
    const field = name.replace(/_/g, '');
    result += ` set${capitalizeFirstLetter(field)}: (data) => ({ type: Types.SET_${name.toUpperCase()}, payload: data }),  \n`;
  });
  return removeLastLine(result);
}


function generateDuckFileContent(file) {
  const stateRaw = getConteFile(file);

  const types = generateTypes(stateRaw, file);
  const initialState = generateInitialState(stateRaw);
  const reducer = generateReducer(stateRaw);
  const creators = generateCreator(stateRaw);

  const result = `
  /* eslint-disable no-param-reassign */
  import produce from 'immer';


  export const Types = {
${types}
  };

  const INITIAL_STATE = {
${initialState}
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      ${reducer}
      default:
        return state;
    }
  };

  export const Creators = {
    ${creators}
  };

  `;

  return result;
}

function generatImport() {
  const files = getImageFiles();
  let result = '';

  files.forEach((item) => {
    result += `import ${item.replace(/^.*[\\\\/]/, '').split('.').slice(0, -1).join('.')} from './img/${item}'; \n`;
  });

  result += 'export {';
  files.forEach((item) => {
    result += `${item.replace(/^.*[\\\\/]/, '').split('.').slice(0, -1).join('.')}, \n`;
  });
  result += '}';
  return result;
}

function generateMappinImageJs() {
  fs.writeFileSync('images.js', generatImport());
}

function generateDucks() {
  const genImagem = false;
  if (genImagem) {
    generateMappinImageJs();
  }
  const files = getFilesFullPath();
  console.log(files);
  console.log('Processando arquivos...');
  files.forEach((file) => {
    const fileJs = file.replace('json', 'js');
    if (fs.existsSync(fileJs)) {
      fs.unlinkSync(fileJs);
    }

    fs.writeFileSync(`${fileJs}`, generateDuckFileContent(file));
  });
  console.log('Arquivos modulos ducks gerados com sucess!');
}

function defaultTask(cb) {
  generateDucks();
  cb();
}

exports.default = defaultTask;
