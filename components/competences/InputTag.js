import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../pages/api/api";
import TagList from "./TagList";

const cStyle = {
    position: "relative",
    display: "inline-block",
    width: "300px",
    border: "1px solid lightblue",
    overflow: "auto"
};
const iStyle = {
    display: "inline-block",
    fontSize: "0.9em",
    margin: "5px",
    width: "90%",
    border: "0"
};

function InputTag({ defaultTags, onAddTag, onDeleteTag, placeHolder }) {


    const onKeyUp = e => {
        //console.log(e.key);
        if (e.key === "," || e.key === "Enter") {
            let input = e.target.value.trim().split(",");

            if (input.length === 0 || input[0] === "") return alert("Veuillez saisir une compétence");
            onAddTag(input);
            e.target.value = "";
        }
    };

    const _onDeleteTag = tag => {
        onDeleteTag(tag);
    };

    return (
        <div style={cStyle}>
            <TagList tags={defaultTags} onDeleteTag={_onDeleteTag} />
            <input
                style={iStyle}
                onKeyUp={e => onKeyUp(e)}
                type="text"
                placeholder={placeHolder}
            />
        </div>
    );
}

export default InputTag;
export async function getServerSideProps({ req }) {

    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

    if (user_cookie.me) {

        const user = jwt_decode(JSON.stringify(user_cookie))
        let data = []

        return {
            props: {
                data
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth/login?dest=consultant/boiteaoutils",
        },
        props: { message: "redirect" },
    }
}
