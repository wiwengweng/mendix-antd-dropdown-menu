import { Component, ReactNode, createElement } from "react";
import { Dropdown, Space, MenuProps } from "antd";
// import type { MenuProps } from "antd";
import { StaticMenuType, AntDropdownMenuContainerProps } from "../typings/AntDropdownMenuProps";
import "./ui/AntDropdownMenu.css";
import { DownOutlined } from "@ant-design/icons";

export class AntDropdownMenu extends Component<AntDropdownMenuContainerProps> {
    render(): ReactNode {
        const items: MenuProps["items"] = [];
        if (this.props.menuType === "static") {
            this.props.staticMenu.forEach((item: StaticMenuType) => {
                // 组装static Menu
                items.push({
                    key: item.menuKey,
                    label: item.menuLable,
                    danger: item.menuDanger,
                    onClick: item.menuAction?.execute
                });
            });
        } else if (this.props.menuType === "dynamic" && this.props.dynamicMenu?.status === "available") {
            // 组装dynami menu
            const handleMenuClick: MenuProps["onClick"] = e => {
                this.props.menuHelper?.setValue(e.key);
                if (this.props.dynamicMenuAction?.canExecute) {
                    this.props.dynamicMenuAction?.execute();
                }
            };

            this.props.dynamicMenu.items?.forEach(item => {
                if (this.props.menuKey !== undefined && this.props.menuKey?.get(item).value !== undefined) {
                    items.push({
                        key: this.props.menuKey.get(item).value!,
                        label: this.props.menuLabel?.get(item).value,
                        danger: this.props.menuDanger?.get(item).value,
                        disabled: this.props.menuDisabled?.get(item).value,
                        onClick: handleMenuClick
                    });
                }
            });
        }

        if (this.props.renderType === "dropdown") {
            return (
                <Dropdown
                    menu={{ items }}
                    placement={this.props.placement}
                    destroyPopupOnHide={this.props.destroyPopupOnHide}
                    arrow={this.props.arrow}
                    autoFocus={this.props.autoFocus}
                    // disabled={this.props.}
                    className={this.props.class}
                    overlayStyle={this.props.style}
                    trigger={[this.props.trigger]}
                >
                    <a onClick={e => e.preventDefault()}>
                        <Space>
                            {this.props.label}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            );
        }
        if (this.props.renderType === "dropdownButton") {
            // 处理button click事件
            const onclick = (): void => {
                // console.log(`button onclick`);
                if (this.props.buttonClick?.canExecute) {
                    this.props.buttonClick?.execute();
                }
            };
            // 支持自定义icon,搭配IconFont使用
            // const IconFont = createFromIconfontCN({
            //   scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
            // });
            //   const icon = ()=>{
            //   if (this.props.icon === 'default' || !this.props.icon) {
            //     return DownOutlined
            //   } else {
            //     return  <IconFont type={this.props.icon}/>
            //     }
            // };
            // console.log('render dropdown muenu button');
            return (
                <Dropdown.Button
                    menu={{ items }}
                    placement={this.props.placement}
                    destroyPopupOnHide={this.props.destroyPopupOnHide}
                    arrow={this.props.arrow}
                    autoFocus={this.props.autoFocus}
                    className={this.props.class}
                    overlayStyle={this.props.style}
                    trigger={[this.props.trigger]}
                    // loading={loadings[1]}
                    // icon={ <IconFont type={this.props.icon}/>}
                    icon={<DownOutlined />}
                    size={this.props.size}
                    type={this.props.buttonType}
                    danger={this.props.danger}
                    onClick={onclick}
                >
                    <Space>{this.props.label}</Space>
                </Dropdown.Button>
            );
        }
    }
}
