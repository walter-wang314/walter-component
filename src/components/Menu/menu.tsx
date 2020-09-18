import React, {
  FC,
  useState,
  createContext,
  CSSProperties,
  FunctionComponentElement,
} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';
import { render } from '@testing-library/react';

type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
  defaultIndex: string;
  className: string;
  mode?: MenuMode;
  style?: CSSProperties;
  onSelect?: (selectedIndex: string) => void;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

export const Menu: FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    defaultOpenSubMenus,
    children,
  } = props;
  const [activeMenuIndex, setActiveMenuIndex] = useState(defaultIndex);
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'munu-horizontal': mode === 'horizontal',
  });
  const handleMenuClick = (index: string) => {
    setActiveMenuIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: activeMenuIndex ? activeMenuIndex : '0',
    onSelect: handleMenuClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error('Only MenuItem and SubMenu can be the children of Menu');
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
