import React from 'react';
import { createBoard } from '@wixc3/react-board';
import InfoForm from '../../../../components/InfoForm';

export default createBoard({
    name: 'InfoForm',
    Board: () => <InfoForm />,
    environmentProps: {
        canvasHeight: 168,
        canvasWidth: 560,
        windowWidth: 672,
        windowHeight: 667
    }
});
