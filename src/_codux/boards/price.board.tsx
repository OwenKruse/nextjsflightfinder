import React from 'react'
import { createBoard } from '@wixc3/react-board';
import Price from '../../../components/Price';

export default createBoard({
    name: 'price',
    Board: () => <div>
        <Price />
    </div>,
    environmentProps: {
        canvasHeight: 247,
        windowWidth: 1024,
        windowHeight: 768,
        canvasWidth: 194
    }
});
