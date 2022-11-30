import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AntDropdownMenuPreviewProps } from "../typings/AntDropdownMenuProps";

export class preview extends Component<AntDropdownMenuPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={""} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/AntDropdownMenu.css");
}
