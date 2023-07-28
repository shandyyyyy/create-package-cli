import { ComponentStory, ComponentMeta } from '@storybook/react'
import { {{ COMPONENT_NAME }} } from './index'

export default {
  title: 'Common/{{ COMPONENT_NAME }}',
  component: {{ COMPONENT_NAME }},
  argTypes: {
  },
} as ComponentMeta<typeof {{ COMPONENT_NAME }}>

const Template: ComponentStory<typeof {{ COMPONENT_NAME }}> = (args) => <{{ COMPONENT_NAME }} {...args } />

export const Example = Template.bind({})
Example.args = {
  name: 'John Smith',
}
