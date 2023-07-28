{
  "name": "{{ PACKAGE_NAME }}",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "type": "module",
  "scripts": {
    "build": "rm -rf dist && tsc -p tsconfig.build.json",
    "test": "jest",
    "test:watch": "jest --watchAll",
    "test:coverage": "jest --coverage",
    "lint": "eslint ./src",
    "lint:fix": "eslint ./src --fix"
  },
  "keywords": [],
  "author": "{{Author}}",
  "license": "ISC",
  "peerDependencies": {
    {{#if USE_ANTD}}
    "antd": "^5",
    {{/if}}
    {{#if USE_STYLED_COMPONENTS}}
    "styled-components": "^5",
    {{/if}}
    "react": "^17.0.0 || ^18.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.18.10",
    "@babel/preset-env": "^7.18.10",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6",
    "@faker-js/faker": "^7.4.0",
    "@testing-library/react": "^13.3.0",
    "@types/jest": "^28.1.7",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.9",
    {{#if USE_ANTD}}
    "antd": "^5",
    {{/if}}
    "babel-jest": "^29.2.2",
    "eslint-plugin-modules-newlines": "^0.0.7",
    "eslint-plugin-unused-imports": "^2.0.0",
    "isolate-react": "^2.3.0",
    "jest": "^29.2.2",
    "jest-environment-jsdom": "^29.2.2",
    "jest-expect-message": "^1.1.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-test-renderer": "^18.2.0",
    {{#if USE_STYLED_COMPONENTS}}
    "styled-components": "^5",
    {{/if}}
    "typescript": "^4.8.2"
  }
}