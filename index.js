import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Handlebars from 'handlebars'
import prompts from 'prompts'
import {
  blue,
  green,
  red,
  reset,
  yellow
} from 'kolorist'
import { createRequire } from 'module'
import pnpm from '@pnpm/exec'

const require = createRequire(import.meta.url)
const { name: rootPkg } = require('../package.json')
const cwd = process.cwd()
let rootDir = cwd
// if (!cwd.includes(rootPkg)) {
//   console.error(cwd, rootDir, rootPkg)
//   throw new Error(`Please invoke this script under ${rootPkg.name} dir`)
// }
if (!cwd.endsWith(rootPkg)) {
  rootDir = cwd.split(rootPkg)[0] + rootPkg
}
const packageDir = rootDir + '/packages'

const PACKAGE_TYPE = [
  {
    name: 'React Component',
    value: 'react-component',
    color: blue,
  },
  {
    name: 'React App',
    value: 'react-app',
    color: yellow,
  },
]

const Params = {
  packageType: 'react-component',
  targetDir: null,
}

async function init() {
  let result = {}
  try {
    result = await prompts(
      [
        {
          type: 'select',
          name: "packageType",
          message: reset('Select a package type:'),
          initial: 0,
          choices: PACKAGE_TYPE.map(t => {
            return {
              title: t.color(t.name),
              value: t.value
            }
          }),
          onState: (state) => {
            Params.packageType = state.value
          }
        },
        {
          type: () => Params.packageType === 'react-component' ? 'text' : null,
          name: 'COMPONENT_NAME',
          initial: 'HelloWorld',
          message: reset('Component Name:'),
          validate: (dir) =>
            isValidReactComponentName(dir) || 'Invalid package.json name'
          ,
          onState: (state) => {
            Params.componentName = state.value
          }
        },
        {
          type: 'text',
          name: 'DESCRIPTION',
          initial: '',
          message: reset('Description:'),
          onState: (state) => {
            Params.name = state.value
          }
        },
        {
          type: () => Params.packageType === 'react-component' ? 'confirm' : null,
          name: "USE_ANTD",
          message: reset('Use Antd as component library?'),
          initial: false,
        },
        {
          type: () => Params.packageType === 'react-component' ? 'confirm' : null,
          name: "USE_STYLED_COMPONENTS",
          message: reset('Use styled-components?'),
          initial: false,
        },
        {
          type: () => Params.packageType !== 'react-component' ? 'text' : null,
          name: 'DeadEnd',
          initial: 'Exit...',
          message: reset('Not yet supported...'),
          onState: (state) => {
            process.exit(0)
          }
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (e) {
    console.error(e.message);
  }
  let { packageType } = result
  let currentRoot = path.resolve(fileURLToPath(import.meta.url), '..')
  let templateDir = `template-${packageType}`
  if (packageType === 'react-component') {
    let PACKAGE_NAME = camelToKebabCase(result.COMPONENT_NAME)
    let targetDir = `${packageDir}/${PACKAGE_NAME}`
    let variables = { ...result, PACKAGE_NAME }
    if (fs.existsSync(targetDir)) {
      throw new Error(`Package with name [${PACKAGE_NAME}] already exists, choose another name.`)
    }
    copy(templateDir, currentRoot, packageDir, variables)
    fs.renameSync(`${packageDir}/${templateDir}`, targetDir,)
    Params.targetDir = targetDir
    console.info(green(`${targetDir} created.`))
  }

  return console.info(green('Package Stub Generated Successfully.'))
}

async function post() {
  let result = {}
  try {
    result = await prompts([
      {
        type: 'confirm',
        name: "installDeps",
        message: reset('Install dependencies?'),
        initial: true,
      },
    ])
  } catch (e) {
    console.error(red(e.message))
  }
  if (result.installDeps) {
    await pnpm.default([`--filter=*${camelToKebabCase(Params.componentName)}`, 'install'], { cwd: Params.targetDir })
  }
}

init()
  .then(post)
  .catch((e) => {
    console.error(red(e))
  })


/** Helpers */
function isValidReactComponentName(componentName) {
  return /^[A-Z][a-zA-Z0-9]*$/.test(componentName)
}

function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^\-/, '')
}

function copy(file, from, to, variables) {
  let fullPath = `${from}/${file}`
  if (fs.statSync(fullPath).isDirectory()) {
    let files = fs.readdirSync(fullPath)
    for (let f of files) {
      copy(f, fullPath, `${to}/${file}`, variables)
    }
    return
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true })
  }
  if (file.endsWith('.t')) {
    let template = fs.readFileSync(`${from}/${file}`, 'utf8')
    let content = Handlebars.compile(template)(variables)
    fs.writeFileSync(`${to}/${file.replace(/\.t$/, '')}`, content)
  } else {
    fs.copyFileSync(`${from}/${file}`, `${to}/${file}`)
  }
}