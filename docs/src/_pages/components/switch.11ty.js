import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Switch',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
  schema: schema.find(c => c.name === 'switch')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical-group' )}

${getExample(data.schema, 'vertical-inline-group')}

${getExample(data.schema, 'horizontal-group')}

${getExample(data.schema, 'horizontal-inline-group')}

${getExample(data.schema, 'compact-group')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
