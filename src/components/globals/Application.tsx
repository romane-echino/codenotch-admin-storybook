import React, { PropsWithChildren } from 'react';
import { Route } from "react-router-dom";


import { IApplicationThemeProps, IChildrenInheritedProps, IUserInfoProps } from '../../../codenotch/codenotch';
import { ApplicationNavigation } from '../../abstract/ApplicationNavigation';
import { ApplicationHeader } from '../../abstract/ApplicationHeader';
import { applyTint } from '../../utils/ColorPaletteUtils';

export interface IApplicationProps extends IApplicationThemeProps, IUserInfoProps, IChildrenInheritedProps<IApplicationInheritedProps>, PropsWithChildren {
  LogoUrl?: string;
  LogoDarkUrl?: string;
  LogoIcon?: string;
  Tint?: string;
}

interface IApplicationInheritedProps {
  Menu: string;
  ParentPage: string;
  Title?: string;
  Icon?: string;
  Route?: string;

}

interface IApplicationState {
  pages: IAppPage[];
  menu: IAppMenu[];

  sideBarToggle: boolean;
}

interface IAppPage {
  props: any;
}

export interface IAppMenu {
  Name?: string;
  Items: IAppMenuItem[];
}

export interface IAppMenuItem {
  Name: string;
  Icon?: string;
  Route?: string;
  Children?: IAppMenuItem[];
}


export class Application extends React.Component<IApplicationProps, IApplicationState> {

  constructor(props: IApplicationProps) {
    super(props);

    this.state = {
      pages: [],
      menu: [],
      sideBarToggle: false
    }
  }

  componentDidMount(): void {
    const links = document.head.getElementsByTagName('link');
    for (let i = links.length - 1; i >= 0; i--) {
      const link = links[i];
      if (link.rel === 'stylesheet') {
        document.head.removeChild(link);
      }
    }
    
    // Apply the tint to the body element
    applyTint(this.props.Tint ?? '#465fff');

    this.processNavigation(this.props);
  }


  processNavigation(props: IApplicationProps) {
    const menu: IAppMenu[] = [];
    const childrenProps = props.childrenProps as IApplicationInheritedProps[] ?? [];

    // First, group by Menu
    const menuGroups: { [key: string]: IApplicationInheritedProps[] } = {};

    childrenProps.forEach(prop => {
      const menuKey = prop.Menu || 'Default';

      if (!menuGroups[menuKey]) {
        menuGroups[menuKey] = [];
      }

      menuGroups[menuKey].push(prop);
    });

    // Process each menu group
    Object.entries(menuGroups).forEach(([menuName, items]) => {
      // Separate top-level items and child items
      const topLevelItems: IApplicationInheritedProps[] = [];
      const childItems: IApplicationInheritedProps[] = [];

      items.forEach(item => {
        // If ParentPage starts with '/', it's a route, otherwise it might be a parent reference
        if (!item.ParentPage || item.ParentPage === '/') {
          topLevelItems.push(item);
        } else {
          childItems.push(item);
        }
      });

      // Create menu items from top-level items
      const menuItems: IAppMenuItem[] = topLevelItems.map(item => ({
        Name: item.Title || item.ParentPage,
        Icon: item.Icon,
        Route: item.Route,
        Children: undefined // Will populate with children later
      }));

      // Add child items to their parents
      childItems.forEach(childItem => {
        // Find the parent item based on ParentPage matching Route
        for (const menuItem of menuItems) {
          if (menuItem.Route && childItem.ParentPage === menuItem.Route) {
            if (!menuItem.Children) {
              menuItem.Children = [];
            }

            menuItem.Children.push({
              Name: childItem.Title || childItem.ParentPage,
              Icon: childItem.Icon,
              Route: childItem.Route
            });
            break;
          }
        }
      });

      // Add this menu group to the menu
      menu.push({
        Name: menuName !== 'Default' ? menuName : undefined,
        Items: menuItems
      });
    });

    this.setState({
      menu: menu
    });
  }


  getPages() {
    const childrenProps: IApplicationInheritedProps[] = this.props.childrenProps as IApplicationInheritedProps[] ?? [];

    return childrenProps.map((child, index) => {
      const routePath = (child.ParentPage ?? '') + child.Route;
      //@ts-expect-error // We know children is an array of React elements
      const props = this.props.children![index].props
      props.children.props = {
        ...child,
        ...props.children.props
      }

      return (
        <Route key={index} path={routePath}>
          {/*React.cloneElement(this.props.children![index], {...props})*/}
          {/* @ts-expect-error // We know children is an array of React elements */}
          {this.props.children![index]}
        </Route>
      )
    });
  }

  render() {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">

        {/* Left navigation panel */}
        <ApplicationNavigation
          {...this.props}
          Menu={this.state.menu}
          SideBarToggle={this.state.sideBarToggle} />


        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          <div className={`fixed z-9 h-screen w-full bg-gray-900/50 ${this.state.sideBarToggle ? 'block lg:hidden' : 'hidden'}`} ></div>

          <main>
            <ApplicationHeader
              {...this.props}
              SideBarToggle={this.state.sideBarToggle}
              OnSideBarToggle={() => this.setState({ sideBarToggle: !this.state.sideBarToggle })} />

            {this.state.sideBarToggle && <div>Salut!</div>}

            {/* Main content area */}
            {this.getPages()}
          </main>

        </div>
      </div>
    )
  }

}