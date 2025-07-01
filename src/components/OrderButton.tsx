import {Button} from "@mui/material";

export interface OrderButtonProps {
    groupName: string,
    color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning",
    variant?: "text" | "outlined" | "contained",
    OrderGroup?: OrderGroup,
}

export interface OrderGroup {
    name: string;
    keywords?: string[];
    orders?: Order[];
    options?: (OrderGroup)[];
    inherited?: Partial<Order>;
    doorstop?: boolean;
}

export interface Order {
    OrderType?: string;
    OrderCat?: string;
    Description?: string;
    Modifiers?: string;
    DxCode?: string;
    DxDescription?: string;
    Comment?: string;
    Units?: string;
    Priority?: string;
    AuthorizingProviderLogin?: string;
    StartDate?: string;
    ProductCode?: string;
    ProviderType?: string;
    ProviderDetail?: string;
    TocRefReason?: string;
    AddProblem?: boolean;
    Code?: string;
}

export default function OrderButton(props: OrderButtonProps) {
    return (
        <Button
            variant={props.variant}
            color={props.color}
        >
            {props.groupName}

        </Button>
    )
}