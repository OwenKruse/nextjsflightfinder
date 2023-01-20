import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Checkout from '../../../../pages/checkout';

export default createBoard({
    name: 'Checkout',
    Board: () => <Checkout />
});
