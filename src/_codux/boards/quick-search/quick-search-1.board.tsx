import React from 'react';
import { createBoard } from '@wixc3/react-board';
import QuickSearch from '../../../../components/quickSearch';

export default createBoard({
    name: 'QuickSearch 1',
    Board: () => <QuickSearch />
});
