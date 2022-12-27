import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Bar',
  schema: schema.find(c => c.name === 'progress-bar')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'progress-bar-indeterminate')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
