import Image from 'next/image'
import logo from '../../asset/logo.png'
import quickSearch from "../quickSearchHeader";
import * as React from "react";



export default function Navbar({to, from, departure, returnDate, passengers, oneWay}) {
    const importedElement = React.createElement(quickSearch, {to,from,departure,returnDate,passengers, oneWay}, null);

    return (
        <div>
            <div>
                {importedElement}
            </div>
        </div>
    )
}