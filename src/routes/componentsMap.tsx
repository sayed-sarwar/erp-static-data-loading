// componentsMap.ts

import Page from "../pages/page";
import SubPage from "../pages/subpage";

export const componentMap: Record<string, React.ComponentType<any>> = {
  Page,
  SubPage,
  Default: () => <div>Page not found</div>,
};
