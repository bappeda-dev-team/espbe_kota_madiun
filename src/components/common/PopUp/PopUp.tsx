"use client"
import React from "react";

interface popup {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const PopUp: React.FC<popup> = ({isOpen, onClose, children}) => {
    if(!isOpen){
        return null;
    } else {

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-8 z-10">
                {children}
            </div>
        </div>
    );
    }
}

export default PopUp;