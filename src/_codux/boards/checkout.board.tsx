import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Checkout',
    Board: () => <div></div>,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768
    }
});
