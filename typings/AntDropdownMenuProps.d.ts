/**
 * This file was generated from AntDropdownMenu.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export type RenderTypeEnum = "dropdown" | "dropdownButton";

export type MenuTypeEnum = "dynamic" | "static";

export interface StaticMenuType {
    menuKey: string;
    menuLable: string;
    menuAction?: ActionValue;
    menuDanger: boolean;
}

export type SizeEnum = "small" | "middle" | "large";

export type ButtonTypeEnum = "default" | "primary" | "dashed" | "ghost" | "link" | "text";

export type PlacementEnum = "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight";

export type TriggerEnum = "click" | "hover";

export interface StaticMenuPreviewType {
    menuKey: string;
    menuLable: string;
    menuAction: {} | null;
    menuDanger: boolean;
}

export interface AntDropdownMenuContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    label: string;
    renderType: RenderTypeEnum;
    menuType: MenuTypeEnum;
    staticMenu: StaticMenuType[];
    dynamicMenu?: ListValue;
    menuKey?: ListAttributeValue<string>;
    menuLabel?: ListAttributeValue<string>;
    menuDanger?: ListAttributeValue<boolean>;
    menuDisabled?: ListAttributeValue<boolean>;
    menuHelper?: EditableValue<string>;
    dynamicMenuAction?: ActionValue;
    danger: boolean;
    size: SizeEnum;
    buttonType: ButtonTypeEnum;
    buttonClick?: ActionValue;
    placement: PlacementEnum;
    arrow: boolean;
    autoFocus: boolean;
    destroyPopupOnHide: boolean;
    trigger: TriggerEnum;
}

export interface AntDropdownMenuPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    label: string;
    renderType: RenderTypeEnum;
    menuType: MenuTypeEnum;
    staticMenu: StaticMenuPreviewType[];
    dynamicMenu: {} | { type: string } | null;
    menuKey: string;
    menuLabel: string;
    menuDanger: string;
    menuDisabled: string;
    menuHelper: string;
    dynamicMenuAction: {} | null;
    danger: boolean;
    size: SizeEnum;
    buttonType: ButtonTypeEnum;
    buttonClick: {} | null;
    placement: PlacementEnum;
    arrow: boolean;
    autoFocus: boolean;
    destroyPopupOnHide: boolean;
    trigger: TriggerEnum;
}
