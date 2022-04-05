import React from "react";

import imageUrl from '../assets/brand/logo.png';

const AppLogo = ({style}) => {
    return (
        <img src={imageUrl} alt="Logo" style={style} />
    );
}

export default AppLogo;