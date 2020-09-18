import React, { FC, CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index,
  });
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  );
};

MenuItem.displayName = 'MenuItem';
export default MenuItem;
