const interfaceConst = 'interface';

export const componentTemplate = (
  componentName
) => `import { memo } from 'react';

${interfaceConst} ${componentName}Props {}

export const ${componentName} = memo((props: ${componentName}Props) => {
  const {} = props;

  return (
    <div>
      <div />
    </div>
  );
});
`;
