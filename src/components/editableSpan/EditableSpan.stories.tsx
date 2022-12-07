import { action } from '@storybook/addon-actions';

import { ProviderDecorator } from '../../stories/ProviderDecorator';

import { EditableSpan } from './EditableSpan';

export default {
  title: 'EditableSpan',
  component: EditableSpan,
  decorators: [ProviderDecorator],
};

const changeName = action('Name was changed to');

export const EditableSpanExample = () => {
  return <EditableSpan name="Click me" callback={changeName} />;
};
