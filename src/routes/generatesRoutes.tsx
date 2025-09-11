import { componentMap } from "./componentsMap";

export function generateRoutes(config: any, routes: any = [], parentPath: string = "") {
  if (!routes) {
    routes = [];
  }

  // Handle navigation array structure from data1.json
  if (config && config.navigation && Array.isArray(config.navigation)) {
    config.navigation.forEach((navItem: any) => {
      generateRoutes(navItem, routes, parentPath);
    });
  }

  // Handle regular item with URL
  if (config && config.url) {
    console.log("Generating route for URL:", config.url, "Type:", config.type);

    // Determine component based on type field from data.json
    let component = componentMap.Default;

    if (config.type) {
      // Use type field from data.json if it exists
      component = componentMap[config.type] || componentMap.Default;
    } else {
      // Fallback to property-based logic if no type specified
      // Use PageLayout for top-level items with children
      if (config.children && Array.isArray(config.children) && config.children.length > 0) {
        component = componentMap.PageLayout;
      }
      // Use CustomPage for items with submenu
      else if (config.submenu && Array.isArray(config.submenu) && config.submenu.length > 0) {
        component = componentMap.CustomPage;
      }
      // Use SubPage for items with data or subItems
      else if ((config.data && Array.isArray(config.data)) || config.subItems) {
        component = componentMap.SubPage;
      }
      // Use CustomPage for items with item array
      else if (config.item && Array.isArray(config.item) && config.item.length > 0) {
        component = componentMap.CustomPage;
      }
      // Fallback to CustomPage for other items
      else {
        component = componentMap.CustomPage;
      }
    }

    routes.push({
      path: config.url,
      component: component,
      menuItem: config, // Pass the full menu item data
    });
  }

  // Handle children array (for both old and new data structures)
  if (config && config.children && Array.isArray(config.children)) {
    config.children.forEach((child: any) => generateRoutes(child, routes, config.url || parentPath));
  }

  if (config && config.submenu && Array.isArray(config.submenu)) {
    config.submenu.forEach((child: any) => generateRoutes(child, routes, config.url || parentPath));
  }

  if (config && config.item && Array.isArray(config.item)) {
    config.item.forEach((child: any) => generateRoutes(child, routes, config.url || parentPath));
  }

  if (
    config &&
    config.subItems?.TabMenu &&
    Array.isArray(config.subItems.TabMenu)
  ) {
    config.subItems.TabMenu.forEach((child: any) =>
      generateRoutes(child, routes, config.url || parentPath)
    );
  }

  return routes;
}
