import { Button } from '@nextui-org/react';

interface CustomButtonProps {
    title: string;
    colorProp?: 'success' | 'danger' | 'primary';
    classProp?: string;
    onPressProp?: () => void;
    variantProp?: 'bordered' | 'flat';
}

export default function CustomButton({title, colorProp, classProp, variantProp, onPressProp}: CustomButtonProps) {

    return (
        <Button
            className={classProp}
            color={colorProp}
            variant={variantProp}
            onPress={onPressProp}
        >
            {title}
        </Button>

    )
}
