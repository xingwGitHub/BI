import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;

const renderMenuItem =
    ({ key, title, icon, link, ...props }) =>
        <Menu.Item
            key={key || link}
            {...props}
        >
            <Link to={link || key}>
                {icon && <Icon type={icon} />}
                <span className="nav-text">{title}</span>
            </Link>
        </Menu.Item>;
const renderSubSubMenu =
     ({ key, title, icon, link, children, ...props }) =>
                <Menu.SubMenu
                    key={key || link}
                    title={
                        <span>
                        {icon && <Icon type={icon} />}
                <span className="nav-text">{title}</span>
                    </span>
                }
                    {...props}
                >
                    {children && children.map(item => renderMenuItem(item))}
                </Menu.SubMenu>;
const renderSubMenu =
    ({ key, title, icon, link, sub, ...props }) =>
        <Menu.SubMenu
            key={key || link}
            title={
                <span>
                    {icon && <Icon type={icon} />}
                    <span className="nav-text">{title}</span>
                </span>
            }
            {...props}
        >
            {sub && sub.map(item => item.children && item.children.length ? renderSubSubMenu(item) : renderMenuItem(item))}
        </Menu.SubMenu>;

export default ({ menus, ...props }) => <Menu {...props}>
    {menus && menus.map(
        item => item.sub && item.sub.length ?
            renderSubMenu(item) : renderMenuItem(item)
    )}
</Menu>;
