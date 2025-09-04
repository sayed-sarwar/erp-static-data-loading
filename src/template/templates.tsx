import React, { useState, useEffect } from "react";

const TemplateMatching = (props: any) => {
  const { template, ...restProps } = props;
  const [TemplateComponent, setTemplateComponent] =
    useState<React.FC<any> | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      switch (template) {
        case "templateone":
          const { default: TemplateOne } = await import("./templateone");
          setTemplateComponent(() => TemplateOne);
          break;
        case "templatetwo":
          const { default: TemplateTwo } = await import("./templatetwo");
          setTemplateComponent(() => TemplateTwo);
          break;
        case "templatecustom":
          const { default: TemplateCustom } = await import("./templatecustom");
          setTemplateComponent(() => TemplateCustom);
          break;
        default:
          setTemplateComponent(() => () => <div>No template found</div>);
      }
    };

    loadTemplate();
  }, [template]);

  if (!TemplateComponent) {
    return <div>Loading...</div>;
  }

  return <TemplateComponent {...restProps} />;
};

export default TemplateMatching;
