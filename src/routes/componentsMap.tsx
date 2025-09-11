// componentsMap.ts

import Page from "../page/page";
import SubPage from "../page/subpage";

export const componentMap: Record<string, React.ComponentType<any>> = {
  Page,
  SubPage,
  Default: () => <div>Page not found</div>,
};
