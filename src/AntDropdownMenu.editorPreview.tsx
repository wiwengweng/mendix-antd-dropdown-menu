import { Component, ReactNode, createElement } from "react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AntDropdownMenuPreviewProps } from "../typings/AntDropdownMenuProps";

export class preview extends Component<AntDropdownMenuPreviewProps> {
    render(): ReactNode {
        // return <HelloWorldSample sampleText={""} />;
        if (this.props.renderType === "dropdown") {
            return (
                <Dropdown
                    placement={this.props.placement}
                    destroyPopupOnHide={this.props.destroyPopupOnHide}
                    arrow={this.props.arrow}
                    autoFocus={this.props.autoFocus}
                    className={this.props.class}
                    trigger={[this.props.trigger]}
                >
                    <Space>
                        {this.props.label}
                        <DownOutlined />
                    </Space>
                </Dropdown>
            );
        } else if (this.props.renderType === "dropdownButton") {
            return (
                <Dropdown.Button
                    placement={this.props.placement}
                    destroyPopupOnHide={this.props.destroyPopupOnHide}
                    arrow={this.props.arrow}
                    autoFocus={this.props.autoFocus}
                    className={this.props.class}
                    trigger={[this.props.trigger]}
                    icon={<DownOutlined />}
                >
                    <Space>{this.props.label}</Space>
                </Dropdown.Button>
            );
        }
    }
}

export function getPreviewCss(): string {
    return require("./ui/AntDropdownMenu.css");
}
