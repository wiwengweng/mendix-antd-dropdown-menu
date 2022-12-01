import { AntDropdownMenuPreviewProps } from "../typings/AntDropdownMenuProps";
import { hidePropertiesIn, hidePropertyIn } from "@mendix/pluggable-widgets-tools";

type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string;
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(_values: AntDropdownMenuPreviewProps, defaultProperties: Properties): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */
    if (_values.renderType === "dropdown") {
        hidePropertiesIn(defaultProperties, _values, ["danger", "size", "buttonType", "buttonClick", "menuDanger", "menuDisabled"]);
    }
    if (_values.menuType === "dynamic") {
        hidePropertyIn(defaultProperties, _values, "staticMenu");
    }
    if (_values.menuType === "static") {
        hidePropertiesIn(defaultProperties, _values, [
            "dynamicMenu",
            "menuKey",
            "menuLabel",
            "menuHelper",
            "dynamicMenuAction"
        ]);
    }
    // if (_values.loading === false) {
    //     hidePropertyIn(defaultProperties, _values, "loadingDelay")
    // }
    return defaultProperties;
}

export function check(_values: AntDropdownMenuPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    /* Example
    if (values.myProperty !== "custom") {
        errors.push({
            property: `myProperty`,
            message: `The value of 'myProperty' is different of 'custom'.`,
            url: "https://github.com/myrepo/mywidget"
        });
    }
    */
    return errors;
}

export function getPreview(_isDarkMode: boolean): PreviewProps {
    // Customize your pluggable widget appearance for Studio Pro.
    const dropdownSvgImage = `<svg t="1669535770832" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2669" width="200" height="200"><path d="M216.128 338.112a32 32 0 0 0-45.248 45.312l320 320a32 32 0 0 0 45.248 0l320-320a32 32 0 0 0-45.248-45.312L513.536 635.52 216.128 338.112z" p-id="2670"></path></svg>`;

    const dropdownInputPreview: PreviewProps = {
        type: "RowLayout",
        columnSize: "grow",
        padding: 5,
        borders: true,
        borderWidth: 1,
        borderRadius: 5,
        children: [
            {
                type: "Container",
                grow: 1,
                children: [
                    {
                        type: "Text",
                        fontSize: 11,
                        content: "Drop down menu"
                    }
                ]
            },
            {
                type: "Image",
                document: dropdownSvgImage,
                grow: 0,
                height: 24
            }
        ]
    };
    // if (values.renderType === "dropdown") {
    return {
        type: "Container",
        children: [dropdownInputPreview]
    };
    // }
    // else {

    //     const customFooterPreview: PreviewProps = {
    //         type: "Container",
    //         borders: true,
    //         borderWidth: 1,
    //         children: [
    //             {
    //                 type: "DropZone",
    //                 property: values.icon,
    //                 placeholder: "Drop your custom footer of picker pannel here"
    //             }
    //         ]
    //     };
    //     return {
    //         type: "Container",
    //         children: [dropdownInputPreview, customFooterPreview]
    //     };
    // }
}
