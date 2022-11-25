import { action } from '@storybook/addon-actions';

import { AddForm } from './AddForm';

export default {
  title: 'Add Form',
  component: AddForm,
};

const callback = action('Button was pressed');

export const AddFormExample = () => {
  return <AddForm name="123" callback={callback} />;
};
