import { Canvas, Meta } from '@storybook/blocks';

import * as stories from './index.stories';

<Meta of={stories} />

# {{ COMPONENT_NAME }} component

Describe your component here.

## Usage

- Describe the usage 

```tsx
import { {{ COMPONENT_NAME }} } from '@exp-builder/{{ PACKAGE_NAME }}'

  // ...
  <{{ COMPONENT_NAME }} {...args } />
```

## Demo

<Canvas of={stories.Example} />