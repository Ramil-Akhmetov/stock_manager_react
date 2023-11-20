const interfaceConst = 'interface';

export const componentTemplate = (componentName, layer) => {
  if (layer === 'pages') {
    return `import { memo } from 'react';
import { Page } from '@/widgets/Page';

function ${componentName}() {
  return (
    <Page>
      <div />
    </Page>
  );
}

export default memo(${componentName});
`;
  }
  return `import { memo } from 'react';

${interfaceConst} ${componentName}Props {}

const ${componentName} = memo((props: ${componentName}Props) => {
  const {} = props;

  return (
    <div>
      <div />
    </div>
  );
});

export default ${componentName};
`;
};
