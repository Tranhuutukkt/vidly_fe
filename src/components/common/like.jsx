import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as RIcon from '@fortawesome/free-regular-svg-icons';
import * as SIcon from '@fortawesome/free-solid-svg-icons';

const Like = (props) => {
    let unlike = SIcon.faHeart;
    let liked = RIcon.faHeart;
    if (!props.liked)
        return (<FontAwesomeIcon onClick={props.onClick} style={{cursor:'pointer'}}  icon={liked} />);
    else
        return (<FontAwesomeIcon onClick={props.onClick} style={{cursor:'pointer'}} color='red' icon={unlike} />);
}

export default Like;