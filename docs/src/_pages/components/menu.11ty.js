import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Menu',
  schema: schema.find(c => c.name === 'menu')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
