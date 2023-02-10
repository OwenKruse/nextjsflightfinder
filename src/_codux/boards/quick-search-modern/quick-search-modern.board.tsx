import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { QuickSearchModern } from '../../../components/quick-search-modern/quick-search-modern';

export default createBoard({
    name: 'QuickSearchModern',
    Board: () => <QuickSearchModern />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
        canvasHeight: 215,
        canvasWidth: 596
    }
});
