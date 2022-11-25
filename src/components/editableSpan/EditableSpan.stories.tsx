import { action } from '@storybook/addon-actions';

import { EditableSpan } from './EditableSpan';

export default {
  title: 'EditableSpan',
  component: EditableSpan,
};

const changeName = action('Name was changed to');

export const EditableSpanExample = () => {
  return <EditableSpan name="Editable Span" callback={changeName} />;
};
